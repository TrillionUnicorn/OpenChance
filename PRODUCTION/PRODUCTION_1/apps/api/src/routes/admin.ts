import { router, adminProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { users, challenges, applications, payments, reviews } from '@openchance/db';
import { eq, and, desc, sql, gte } from 'drizzle-orm';

/**
 * Admin Router
 * Handles admin operations and platform management
 */
export const adminRouter = router({
  /**
   * Get platform statistics
   */
  getStats: adminProcedure.query(async ({ ctx }) => {
    // Get total counts
    const [userCount] = await ctx.db.select({ count: sql<number>`count(*)` }).from(users);
    const [challengeCount] = await ctx.db.select({ count: sql<number>`count(*)` }).from(challenges);
    const [applicationCount] = await ctx.db.select({ count: sql<number>`count(*)` }).from(applications);
    const [paymentCount] = await ctx.db.select({ count: sql<number>`count(*)` }).from(payments);
    const [reviewCount] = await ctx.db.select({ count: sql<number>`count(*)` }).from(reviews);

    // Get revenue stats
    const [revenueStats] = await ctx.db
      .select({
        totalRevenue: sql<number>`SUM(${payments.platformFeeAmount})`,
        totalVolume: sql<number>`SUM(${payments.amount})`,
      })
      .from(payments)
      .where(eq(payments.status, 'succeeded'));

    // Get growth stats (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [newUsers] = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgo));

    const [newChallenges] = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(challenges)
      .where(gte(challenges.createdAt, thirtyDaysAgo));

    return {
      totalUsers: userCount.count,
      totalChallenges: challengeCount.count,
      totalApplications: applicationCount.count,
      totalPayments: paymentCount.count,
      totalReviews: reviewCount.count,
      totalRevenue: revenueStats.totalRevenue || 0,
      totalVolume: revenueStats.totalVolume || 0,
      newUsersLast30Days: newUsers.count,
      newChallengesLast30Days: newChallenges.count,
    };
  }),

  /**
   * Get all users with pagination
   */
  getAllUsers: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const allUsers = await ctx.db.query.users.findMany({
        limit: input.limit,
        offset: input.offset,
        orderBy: desc(users.createdAt),
      });

      const [{ count }] = await ctx.db.select({ count: sql<number>`count(*)` }).from(users);

      return {
        users: allUsers,
        total: count,
      };
    }),

  /**
   * Ban user
   */
  banUser: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        reason: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          deletedAt: new Date(),
          // Store ban reason in a metadata field if available
        })
        .where(eq(users.id, input.userId));

      console.log(`🚫 User banned: ${input.userId} - Reason: ${input.reason}`);

      return { success: true };
    }),

  /**
   * Unban user
   */
  unbanUser: adminProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          deletedAt: null,
        })
        .where(eq(users.id, input.userId));

      console.log(`✅ User unbanned: ${input.userId}`);

      return { success: true };
    }),

  /**
   * Moderate review
   */
  moderateReview: adminProcedure
    .input(
      z.object({
        reviewId: z.string(),
        status: z.enum(['approved', 'rejected', 'hidden']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(reviews)
        .set({
          moderationStatus: input.status,
          moderatedAt: new Date(),
        })
        .where(eq(reviews.id, input.reviewId));

      console.log(`⚖️ Review moderated: ${input.reviewId} - Status: ${input.status}`);

      return { success: true };
    }),

  /**
   * Get flagged reviews
   */
  getFlaggedReviews: adminProcedure.query(async ({ ctx }) => {
    const flaggedReviews = await ctx.db.query.reviews.findMany({
      where: eq(reviews.flagged, true),
      orderBy: desc(reviews.createdAt),
      with: {
        reviewer: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        reviewee: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });

    return flaggedReviews;
  }),

  /**
   * Get platform metrics for dashboard
   */
  getDashboardMetrics: adminProcedure.query(async ({ ctx }) => {
    // Active users (logged in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [activeUsers] = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(gte(users.lastLoginAt, sevenDaysAgo));

    // Open challenges
    const [openChallenges] = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(challenges)
      .where(eq(challenges.status, 'open'));

    // Pending applications
    const [pendingApplications] = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(applications)
      .where(eq(applications.status, 'pending'));

    // Revenue this month
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const [monthlyRevenue] = await ctx.db
      .select({
        revenue: sql<number>`SUM(${payments.platformFeeAmount})`,
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, firstDayOfMonth)
        )
      );

    return {
      activeUsers: activeUsers.count,
      openChallenges: openChallenges.count,
      pendingApplications: pendingApplications.count,
      monthlyRevenue: monthlyRevenue.revenue || 0,
    };
  }),
});

