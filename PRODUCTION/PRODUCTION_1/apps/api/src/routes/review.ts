import { router, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { reviews, reviewResponses, challenges, users } from '@openchance/db';
import { eq, and, desc, sql } from 'drizzle-orm';

/**
 * Review Router
 * Handles reviews and ratings between challengers and solvers
 */
export const reviewRouter = router({
  /**
   * Submit a review
   */
  submitReview: protectedProcedure
    .input(
      z.object({
        challengeId: z.string(),
        revieweeId: z.string(),
        reviewType: z.enum(['challenger-to-solver', 'solver-to-challenger']),
        rating: z.number().int().min(1).max(5),
        title: z.string().min(5).max(100).optional(),
        comment: z.string().min(10).max(1000),
        communicationRating: z.number().int().min(1).max(5).optional(),
        qualityRating: z.number().int().min(1).max(5).optional(),
        timelinessRating: z.number().int().min(1).max(5).optional(),
        professionalismRating: z.number().int().min(1).max(5).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify challenge exists and user participated
      const challenge = await ctx.db.query.challenges.findFirst({
        where: eq(challenges.id, input.challengeId),
      });

      if (!challenge) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found',
        });
      }

      // Verify user can review (must be challenger or accepted solver)
      const canReview =
        (input.reviewType === 'challenger-to-solver' && challenge.challengerId === ctx.user.id) ||
        (input.reviewType === 'solver-to-challenger' && challenge.challengerId === input.revieweeId);

      if (!canReview) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You cannot review this user for this challenge',
        });
      }

      // Check if already reviewed
      const existing = await ctx.db.query.reviews.findFirst({
        where: and(
          eq(reviews.challengeId, input.challengeId),
          eq(reviews.reviewerId, ctx.user.id),
          eq(reviews.revieweeId, input.revieweeId)
        ),
      });

      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'You have already reviewed this user for this challenge',
        });
      }

      // Create review
      const [review] = await ctx.db
        .insert(reviews)
        .values({
          challengeId: input.challengeId,
          reviewerId: ctx.user.id,
          revieweeId: input.revieweeId,
          reviewType: input.reviewType,
          rating: input.rating,
          title: input.title,
          comment: input.comment,
          communicationRating: input.communicationRating,
          qualityRating: input.qualityRating,
          timelinessRating: input.timelinessRating,
          professionalismRating: input.professionalismRating,
          moderationStatus: 'pending',
        })
        .returning();

      // Update reviewee's reputation score
      const allReviews = await ctx.db.query.reviews.findMany({
        where: eq(reviews.revieweeId, input.revieweeId),
      });

      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      const reputationScore = Math.round(avgRating * 20); // Convert 1-5 to 0-100

      await ctx.db
        .update(users)
        .set({ reputationScore })
        .where(eq(users.id, input.revieweeId));

      console.log(`⭐ Review submitted: ${review.id} (${input.rating}/5)`);

      return review;
    }),

  /**
   * Get reviews for a user
   */
  getReviews: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const userReviews = await ctx.db.query.reviews.findMany({
        where: and(
          eq(reviews.revieweeId, input.userId),
          eq(reviews.moderationStatus, 'approved'),
          eq(reviews.public, true)
        ),
        orderBy: desc(reviews.createdAt),
        limit: input.limit,
        offset: input.offset,
        with: {
          reviewer: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
            },
          },
          challenge: {
            columns: {
              id: true,
              title: true,
            },
          },
        },
      });

      // Get average ratings
      const [stats] = await ctx.db
        .select({
          avgRating: sql<number>`AVG(${reviews.rating})`,
          avgCommunication: sql<number>`AVG(${reviews.communicationRating})`,
          avgQuality: sql<number>`AVG(${reviews.qualityRating})`,
          avgTimeliness: sql<number>`AVG(${reviews.timelinessRating})`,
          avgProfessionalism: sql<number>`AVG(${reviews.professionalismRating})`,
          totalReviews: sql<number>`COUNT(*)`,
        })
        .from(reviews)
        .where(
          and(
            eq(reviews.revieweeId, input.userId),
            eq(reviews.moderationStatus, 'approved')
          )
        );

      return {
        reviews: userReviews,
        stats,
      };
    }),

  /**
   * Respond to a review
   */
  respondToReview: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        response: z.string().min(10).max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.db.query.reviews.findFirst({
        where: eq(reviews.id, input.reviewId),
      });

      if (!review) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Review not found',
        });
      }

      // Only reviewee can respond
      if (review.revieweeId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only respond to reviews about you',
        });
      }

      const [response] = await ctx.db
        .insert(reviewResponses)
        .values({
          reviewId: input.reviewId,
          userId: ctx.user.id,
          response: input.response,
        })
        .returning();

      console.log(`💬 Review response added: ${response.id}`);

      return response;
    }),

  /**
   * Flag a review
   */
  flagReview: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        reason: z.string().min(10).max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(reviews)
        .set({
          flagged: true,
          flagReason: input.reason,
        })
        .where(eq(reviews.id, input.reviewId));

      console.log(`🚩 Review flagged: ${input.reviewId}`);

      return { success: true };
    }),
});

