import { router, protectedProcedure, challengerProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { payments, milestones, invoices, payouts, challenges, users } from '@openchance/db';
import { eq, and, desc, sql } from 'drizzle-orm';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

/**
 * Payment Router
 * Handles Stripe payments, escrow, and payouts
 */
export const paymentRouter = router({
  /**
   * Create payment intent for challenge
   */
  createPaymentIntent: challengerProcedure
    .input(
      z.object({
        challengeId: z.string(),
        amount: z.number().int().positive(),
        currency: z.string().default('usd'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify challenge ownership
      const challenge = await ctx.db.query.challenges.findFirst({
        where: eq(challenges.id, input.challengeId),
      });

      if (!challenge) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found',
        });
      }

      if (challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only create payments for your own challenges',
        });
      }

      // Calculate platform fee (10% for basic tier)
      const platformFeePercentage = ctx.user.subscriptionTier === 'challenger-pro' ? 7 :
                                   ctx.user.subscriptionTier === 'challenger-enterprise' ? 5 : 10;
      const platformFeeAmount = Math.floor(input.amount * (platformFeePercentage / 100));

      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: input.amount,
        currency: input.currency,
        metadata: {
          challengeId: input.challengeId,
          challengerId: ctx.user.id,
          platformFeePercentage: platformFeePercentage.toString(),
        },
        application_fee_amount: platformFeeAmount,
      });

      // Create payment record
      const [payment] = await ctx.db
        .insert(payments)
        .values({
          challengeId: input.challengeId,
          payerId: ctx.user.id,
          amount: input.amount,
          currency: input.currency,
          paymentType: 'challenge-payment',
          stripePaymentIntentId: paymentIntent.id,
          status: 'pending',
          platformFeeAmount,
          platformFeePercentage,
          escrowStatus: 'held',
        })
        .returning();

      console.log(`💳 Payment intent created: ${payment.id} (${input.amount / 100} ${input.currency})`);

      return {
        paymentId: payment.id,
        clientSecret: paymentIntent.client_secret,
        amount: input.amount,
        platformFee: platformFeeAmount,
      };
    }),

  /**
   * Confirm payment (called after Stripe confirmation)
   */
  confirmPayment: protectedProcedure
    .input(
      z.object({
        paymentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const payment = await ctx.db.query.payments.findFirst({
        where: eq(payments.id, input.paymentId),
      });

      if (!payment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment not found',
        });
      }

      // Verify Stripe payment intent
      if (payment.stripePaymentIntentId) {
        const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);

        if (paymentIntent.status === 'succeeded') {
          // Update payment status
          await ctx.db
            .update(payments)
            .set({
              status: 'succeeded',
              succeededAt: new Date(),
              stripeChargeId: paymentIntent.latest_charge as string,
            })
            .where(eq(payments.id, input.paymentId));

          console.log(`✅ Payment confirmed: ${input.paymentId}`);

          return { success: true, status: 'succeeded' };
        }
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Payment not confirmed',
      });
    }),

  /**
   * Release escrow to solver
   */
  releaseEscrow: challengerProcedure
    .input(
      z.object({
        paymentId: z.string(),
        solverId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const payment = await ctx.db.query.payments.findFirst({
        where: eq(payments.id, input.paymentId),
        with: {
          challenge: true,
        },
      });

      if (!payment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment not found',
        });
      }

      // Verify ownership
      if (payment.challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only release escrow for your own challenges',
        });
      }

      // Verify payment is in escrow
      if (payment.escrowStatus !== 'held') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Payment is not in escrow',
        });
      }

      // Calculate payout amount (subtract platform fee)
      const payoutAmount = payment.amount - (payment.platformFeeAmount || 0);

      // Create payout to solver
      const [payout] = await ctx.db
        .insert(payouts)
        .values({
          userId: input.solverId,
          amount: payoutAmount,
          currency: payment.currency,
          status: 'pending',
        })
        .returning();

      // Update payment
      await ctx.db
        .update(payments)
        .set({
          payeeId: input.solverId,
          escrowStatus: 'released',
          escrowReleasedAt: new Date(),
        })
        .where(eq(payments.id, input.paymentId));

      // Update user earnings
      await ctx.db
        .update(users)
        .set({
          totalEarnings: sql`${users.totalEarnings} + ${payoutAmount}`,
        })
        .where(eq(users.id, input.solverId));

      console.log(`💰 Escrow released: ${input.paymentId} → ${input.solverId} (${payoutAmount / 100})`);

      return { success: true, payoutId: payout.id };
    }),

  /**
   * Get payment history
   */
  getPaymentHistory: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const userPayments = await ctx.db.query.payments.findMany({
        where: or(
          eq(payments.payerId, ctx.user.id),
          eq(payments.payeeId, ctx.user.id)
        ),
        orderBy: desc(payments.createdAt),
        limit: input.limit,
        offset: input.offset,
        with: {
          challenge: {
            columns: {
              id: true,
              title: true,
            },
          },
          payer: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
            },
          },
          payee: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
            },
          },
        },
      });

      return userPayments;
    }),

  /**
   * Create milestone payment
   */
  createMilestone: challengerProcedure
    .input(
      z.object({
        challengeId: z.string(),
        name: z.string(),
        description: z.string(),
        amount: z.number().int().positive(),
        order: z.number().int(),
        dueDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const challenge = await ctx.db.query.challenges.findFirst({
        where: eq(challenges.id, input.challengeId),
      });

      if (!challenge || challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only create milestones for your own challenges',
        });
      }

      const [milestone] = await ctx.db
        .insert(milestones)
        .values({
          challengeId: input.challengeId,
          name: input.name,
          description: input.description,
          amount: input.amount,
          order: input.order,
          dueDate: input.dueDate,
          status: 'pending',
        })
        .returning();

      console.log(`🎯 Milestone created: ${milestone.name} (${milestone.id})`);

      return milestone;
    }),

  /**
   * Get milestones for challenge
   */
  getMilestones: protectedProcedure
    .input(
      z.object({
        challengeId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const challengeMilestones = await ctx.db.query.milestones.findMany({
        where: eq(milestones.challengeId, input.challengeId),
        orderBy: (milestones, { asc }) => [asc(milestones.order)],
      });

      return challengeMilestones;
    }),

  /**
   * Submit milestone deliverable
   */
  submitMilestone: protectedProcedure
    .input(
      z.object({
        milestoneId: z.string(),
        deliverables: z.array(
          z.object({
            name: z.string(),
            url: z.string().url(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const milestone = await ctx.db.query.milestones.findFirst({
        where: eq(milestones.id, input.milestoneId),
        with: {
          challenge: true,
        },
      });

      if (!milestone) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Milestone not found',
        });
      }

      // Update milestone
      await ctx.db
        .update(milestones)
        .set({
          status: 'submitted',
          deliverables: input.deliverables.map((d) => ({
            ...d,
            submittedAt: new Date().toISOString(),
          })),
          submittedAt: new Date(),
        })
        .where(eq(milestones.id, input.milestoneId));

      console.log(`📤 Milestone submitted: ${input.milestoneId}`);

      return { success: true };
    }),

  /**
   * Approve milestone
   */
  approveMilestone: challengerProcedure
    .input(
      z.object({
        milestoneId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const milestone = await ctx.db.query.milestones.findFirst({
        where: eq(milestones.id, input.milestoneId),
        with: {
          challenge: true,
        },
      });

      if (!milestone) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Milestone not found',
        });
      }

      // Verify ownership
      if (milestone.challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only approve milestones for your own challenges',
        });
      }

      // Update milestone
      await ctx.db
        .update(milestones)
        .set({
          status: 'approved',
          approvedAt: new Date(),
        })
        .where(eq(milestones.id, input.milestoneId));

      // TODO: Trigger payment for this milestone

      console.log(`✅ Milestone approved: ${input.milestoneId}`);

      return { success: true };
    }),

  /**
   * Process refund
   */
  processRefund: challengerProcedure
    .input(
      z.object({
        paymentId: z.string(),
        reason: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const payment = await ctx.db.query.payments.findFirst({
        where: eq(payments.id, input.paymentId),
      });

      if (!payment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Payment not found',
        });
      }

      // Verify ownership
      if (payment.payerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only refund your own payments',
        });
      }

      // Can't refund if escrow already released
      if (payment.escrowStatus === 'released') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot refund payment after escrow release',
        });
      }

      // Process Stripe refund
      if (payment.stripeChargeId) {
        const refund = await stripe.refunds.create({
          charge: payment.stripeChargeId,
          reason: 'requested_by_customer',
        });

        // Update payment
        await ctx.db
          .update(payments)
          .set({
            status: 'refunded',
            stripeRefundId: refund.id,
            refundedAt: new Date(),
            escrowStatus: 'refunded',
          })
          .where(eq(payments.id, input.paymentId));

        console.log(`💸 Refund processed: ${input.paymentId}`);

        return { success: true, refundId: refund.id };
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Payment cannot be refunded',
      });
    }),
});

