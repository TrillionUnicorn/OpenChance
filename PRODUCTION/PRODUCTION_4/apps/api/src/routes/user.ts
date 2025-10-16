import { router, publicProcedure, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { users, userPortfolios, userBadges } from '@openchance/db';
import { eq, and, isNull } from 'drizzle-orm';

/**
 * User Router
 * Handles user profiles, portfolios, and preferences
 */
export const userRouter = router({
  /**
   * Get user profile by ID
   */
  getProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: and(
          eq(users.id, input.userId),
          isNull(users.deletedAt)
        ),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      // Don't expose sensitive data
      const { clerkId, stripeCustomerId, stripeSubscriptionId, ...publicProfile } = user;

      return publicProfile;
    }),

  /**
   * Get current user's full profile
   */
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),

  /**
   * Update user profile
   */
  updateProfile: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1).max(50).optional(),
        lastName: z.string().min(1).max(50).optional(),
        username: z.string().min(3).max(30).optional(),
        bio: z.string().max(500).optional(),
        location: z.string().max(100).optional(),
        website: z.string().url().optional(),
        skills: z.array(z.string()).optional(),
        experience: z.string().optional(),
        hourlyRate: z.number().int().positive().optional(),
        availability: z.enum(['full-time', 'part-time', 'contract', 'not-available']).optional(),
        company: z.string().max(100).optional(),
        companySize: z.string().optional(),
        industry: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // If username is being updated, check availability
      if (input.username) {
        const existingUser = await ctx.db.query.users.findFirst({
          where: and(
            eq(users.username, input.username),
            // Not the current user
            eq(users.id, ctx.user.id)
          ),
        });

        if (existingUser && existingUser.id !== ctx.user.id) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Username already taken',
          });
        }
      }

      const [updatedUser] = await ctx.db
        .update(users)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(users.id, ctx.user.id))
        .returning();

      console.log(`✏️ Profile updated: ${updatedUser.email} (${updatedUser.id})`);

      return updatedUser;
    }),

  /**
   * Update user preferences
   */
  updatePreferences: protectedProcedure
    .input(
      z.object({
        emailNotifications: z.boolean().optional(),
        pushNotifications: z.boolean().optional(),
        marketingEmails: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [updatedUser] = await ctx.db
        .update(users)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(users.id, ctx.user.id))
        .returning();

      return updatedUser;
    }),

  /**
   * Get user statistics
   */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    return {
      totalChallengesPosted: ctx.user.totalChallengesPosted,
      totalChallengesSolved: ctx.user.totalChallengesSolved,
      totalEarnings: ctx.user.totalEarnings,
      totalSpent: ctx.user.totalSpent,
      reputationScore: ctx.user.reputationScore,
    };
  }),

  /**
   * Add portfolio item
   */
  addPortfolio: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        url: z.string().url().optional(),
        imageUrl: z.string().url().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [portfolio] = await ctx.db
        .insert(userPortfolios)
        .values({
          userId: ctx.user.id,
          ...input,
        })
        .returning();

      console.log(`📁 Portfolio added: ${portfolio.title} (${portfolio.id})`);

      return portfolio;
    }),

  /**
   * Get user's portfolio items
   */
  getPortfolio: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const portfolios = await ctx.db.query.userPortfolios.findMany({
        where: eq(userPortfolios.userId, input.userId),
        orderBy: (portfolios, { desc }) => [desc(portfolios.featured), desc(portfolios.order)],
      });

      return portfolios;
    }),

  /**
   * Update portfolio item
   */
  updatePortfolio: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(100).optional(),
        description: z.string().max(500).optional(),
        url: z.string().url().optional(),
        imageUrl: z.string().url().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().optional(),
        order: z.number().int().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;

      // Verify ownership
      const portfolio = await ctx.db.query.userPortfolios.findFirst({
        where: eq(userPortfolios.id, id),
      });

      if (!portfolio || portfolio.userId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update your own portfolio items',
        });
      }

      const [updated] = await ctx.db
        .update(userPortfolios)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(eq(userPortfolios.id, id))
        .returning();

      return updated;
    }),

  /**
   * Delete portfolio item
   */
  deletePortfolio: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const portfolio = await ctx.db.query.userPortfolios.findFirst({
        where: eq(userPortfolios.id, input.id),
      });

      if (!portfolio || portfolio.userId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own portfolio items',
        });
      }

      await ctx.db.delete(userPortfolios).where(eq(userPortfolios.id, input.id));

      console.log(`🗑️ Portfolio deleted: ${input.id}`);

      return { success: true };
    }),

  /**
   * Get user's badges
   */
  getBadges: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const badges = await ctx.db.query.userBadges.findMany({
        where: eq(userBadges.userId, input.userId),
        orderBy: (badges, { desc }) => [desc(badges.earnedAt)],
      });

      return badges;
    }),
});

