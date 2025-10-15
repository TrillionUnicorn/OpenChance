import { router, protectedProcedure, challengerProcedure, solverProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { applications, applicationMessages, challenges } from '@openchance/db';
import { eq, and, desc, sql } from 'drizzle-orm';

/**
 * Application Router
 * Handles solver applications to challenges
 */
export const applicationRouter = router({
  /**
   * Submit application to a challenge
   */
  submit: solverProcedure
    .input(
      z.object({
        challengeId: z.string(),
        proposal: z.string().min(100).max(2000),
        estimatedTimeline: z.string().optional(),
        proposedBudget: z.number().int().positive().optional(),
        relevantExperience: z.string().max(1000).optional(),
        portfolioLinks: z.array(z.string().url()).optional(),
        attachments: z
          .array(
            z.object({
              name: z.string(),
              url: z.string().url(),
              size: z.number(),
              type: z.string(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if challenge exists and is open
      const challenge = await ctx.db.query.challenges.findFirst({
        where: eq(challenges.id, input.challengeId),
      });

      if (!challenge) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found',
        });
      }

      if (challenge.status !== 'open') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Challenge is not accepting applications',
        });
      }

      // Can't apply to own challenge
      if (challenge.challengerId === ctx.user.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You cannot apply to your own challenge',
        });
      }

      // Check if already applied
      const existing = await ctx.db.query.applications.findFirst({
        where: and(eq(applications.challengeId, input.challengeId), eq(applications.solverId, ctx.user.id)),
      });

      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'You have already applied to this challenge',
        });
      }

      // Create application
      const [application] = await ctx.db
        .insert(applications)
        .values({
          challengeId: input.challengeId,
          solverId: ctx.user.id,
          proposal: input.proposal,
          estimatedTimeline: input.estimatedTimeline,
          proposedBudget: input.proposedBudget,
          relevantExperience: input.relevantExperience,
          portfolioLinks: input.portfolioLinks,
          attachments: input.attachments,
          status: 'pending',
        })
        .returning();

      // Increment applicants count
      await ctx.db
        .update(challenges)
        .set({ applicants: sql`${challenges.applicants} + 1` })
        .where(eq(challenges.id, input.challengeId));

      // TODO: Send notification to challenger

      console.log(`📝 Application submitted: ${application.id} for challenge ${input.challengeId}`);

      return application;
    }),

  /**
   * Get applications for a challenge (challenger only)
   */
  getForChallenge: challengerProcedure
    .input(
      z.object({
        challengeId: z.string(),
        status: z.enum(['pending', 'under-review', 'shortlisted', 'accepted', 'rejected', 'withdrawn']).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Verify ownership
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
          message: 'You can only view applications for your own challenges',
        });
      }

      // Build where conditions
      const conditions = [eq(applications.challengeId, input.challengeId)];

      if (input.status) {
        conditions.push(eq(applications.status, input.status));
      }

      const results = await ctx.db.query.applications.findMany({
        where: and(...conditions),
        orderBy: desc(applications.createdAt),
        with: {
          solver: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
              reputationScore: true,
              skills: true,
              experience: true,
              hourlyRate: true,
            },
          },
        },
      });

      return results;
    }),

  /**
   * Get solver's applications
   */
  getMy: solverProcedure
    .input(
      z.object({
        status: z.enum(['pending', 'under-review', 'shortlisted', 'accepted', 'rejected', 'withdrawn']).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(applications.solverId, ctx.user.id)];

      if (input.status) {
        conditions.push(eq(applications.status, input.status));
      }

      const results = await ctx.db.query.applications.findMany({
        where: and(...conditions),
        orderBy: desc(applications.createdAt),
        with: {
          challenge: {
            with: {
              challenger: {
                columns: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  username: true,
                  avatar: true,
                  company: true,
                },
              },
            },
          },
        },
      });

      return results;
    }),

  /**
   * Get application by ID
   */
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.id, input.id),
        with: {
          solver: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
              reputationScore: true,
              skills: true,
              experience: true,
            },
          },
          challenge: {
            with: {
              challenger: {
                columns: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  username: true,
                  avatar: true,
                  company: true,
                },
              },
            },
          },
        },
      });

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Application not found',
        });
      }

      // Verify access (solver or challenger)
      const challenge = application.challenge;
      if (application.solverId !== ctx.user.id && challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have access to this application',
        });
      }

      // Mark as viewed by challenger
      if (challenge.challengerId === ctx.user.id && !application.viewedByChallenger) {
        await ctx.db
          .update(applications)
          .set({
            viewedByChallenger: true,
            viewedAt: new Date(),
          })
          .where(eq(applications.id, input.id));
      }

      return application;
    }),

  /**
   * Update application status (challenger only)
   */
  updateStatus: challengerProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['under-review', 'shortlisted', 'accepted', 'rejected']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.id, input.id),
        with: {
          challenge: true,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Application not found',
        });
      }

      // Verify ownership
      if (application.challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update applications for your own challenges',
        });
      }

      const [updated] = await ctx.db
        .update(applications)
        .set({
          status: input.status,
          updatedAt: new Date(),
          acceptedAt: input.status === 'accepted' ? new Date() : null,
          rejectedAt: input.status === 'rejected' ? new Date() : null,
        })
        .where(eq(applications.id, input.id))
        .returning();

      // If accepted, update challenge status
      if (input.status === 'accepted') {
        await ctx.db
          .update(challenges)
          .set({ status: 'in-progress' })
          .where(eq(challenges.id, application.challengeId));
      }

      // TODO: Send notification to solver

      console.log(`✅ Application ${input.status}: ${input.id}`);

      return updated;
    }),

  /**
   * Withdraw application (solver only)
   */
  withdraw: solverProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.id, input.id),
      });

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Application not found',
        });
      }

      // Verify ownership
      if (application.solverId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only withdraw your own applications',
        });
      }

      // Can't withdraw if already accepted
      if (application.status === 'accepted') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot withdraw accepted application',
        });
      }

      const [updated] = await ctx.db
        .update(applications)
        .set({
          status: 'withdrawn',
          withdrawnAt: new Date(),
        })
        .where(eq(applications.id, input.id))
        .returning();

      // Decrement applicants count
      await ctx.db
        .update(challenges)
        .set({ applicants: sql`${challenges.applicants} - 1` })
        .where(eq(challenges.id, application.challengeId));

      console.log(`🚫 Application withdrawn: ${input.id}`);

      return updated;
    }),

  /**
   * Send message on application
   */
  sendMessage: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        message: z.string().min(1).max(1000),
        attachments: z
          .array(
            z.object({
              name: z.string(),
              url: z.string().url(),
              size: z.number(),
              type: z.string(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.id, input.applicationId),
        with: {
          challenge: true,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Application not found',
        });
      }

      // Verify access
      if (application.solverId !== ctx.user.id && application.challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have access to this application',
        });
      }

      const [message] = await ctx.db
        .insert(applicationMessages)
        .values({
          applicationId: input.applicationId,
          senderId: ctx.user.id,
          message: input.message,
          attachments: input.attachments,
        })
        .returning();

      // TODO: Send notification to other party

      return message;
    }),

  /**
   * Get messages for application
   */
  getMessages: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const application = await ctx.db.query.applications.findFirst({
        where: eq(applications.id, input.applicationId),
        with: {
          challenge: true,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Application not found',
        });
      }

      // Verify access
      if (application.solverId !== ctx.user.id && application.challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have access to this application',
        });
      }

      const messages = await ctx.db.query.applicationMessages.findMany({
        where: eq(applicationMessages.applicationId, input.applicationId),
        orderBy: desc(applicationMessages.createdAt),
        with: {
          sender: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
            },
          },
        },
      });

      // Mark messages as read
      await ctx.db
        .update(applicationMessages)
        .set({ read: true, readAt: new Date() })
        .where(and(eq(applicationMessages.applicationId, input.applicationId), eq(applicationMessages.read, false)));

      return messages;
    }),
});

