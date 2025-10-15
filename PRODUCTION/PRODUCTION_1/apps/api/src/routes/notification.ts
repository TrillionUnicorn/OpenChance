import { router, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc:parameter>
import { notifications, notificationPreferences } from '@openchance/db';
import { eq, and, desc, sql } from 'drizzle-orm';

/**
 * Notification Router
 * Handles in-app notifications and user preferences
 */
export const notificationRouter = router({
  /**
   * Get user's notifications
   */
  getNotifications: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        unreadOnly: z.boolean().default(false),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(notifications.userId, ctx.user.id)];

      if (input.unreadOnly) {
        conditions.push(eq(notifications.read, false));
      }

      const userNotifications = await ctx.db.query.notifications.findMany({
        where: and(...conditions),
        orderBy: desc(notifications.createdAt),
        limit: input.limit,
        offset: input.offset,
      });

      return userNotifications;
    }),

  /**
   * Get unread count
   */
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const [{ count }] = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, ctx.user.id),
          eq(notifications.read, false)
        )
      );

    return { count };
  }),

  /**
   * Mark notification as read
   */
  markAsRead: protectedProcedure
    .input(
      z.object({
        notificationId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(notifications)
        .set({
          read: true,
          readAt: new Date(),
        })
        .where(
          and(
            eq(notifications.id, input.notificationId),
            eq(notifications.userId, ctx.user.id)
          )
        );

      return { success: true };
    }),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db
      .update(notifications)
      .set({
        read: true,
        readAt: new Date(),
      })
      .where(
        and(
          eq(notifications.userId, ctx.user.id),
          eq(notifications.read, false)
        )
      );

    return { success: true };
  }),

  /**
   * Get notification preferences
   */
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    let prefs = await ctx.db.query.notificationPreferences.findFirst({
      where: eq(notificationPreferences.userId, ctx.user.id),
    });

    // Create default preferences if not exists
    if (!prefs) {
      [prefs] = await ctx.db
        .insert(notificationPreferences)
        .values({
          userId: ctx.user.id,
        })
        .returning();
    }

    return prefs;
  }),

  /**
   * Update notification preferences
   */
  updatePreferences: protectedProcedure
    .input(
      z.object({
        emailNewApplication: z.boolean().optional(),
        emailApplicationAccepted: z.boolean().optional(),
        emailApplicationRejected: z.boolean().optional(),
        emailNewMessage: z.boolean().optional(),
        emailPaymentReceived: z.boolean().optional(),
        emailReviewReceived: z.boolean().optional(),
        emailMarketingUpdates: z.boolean().optional(),
        pushNewApplication: z.boolean().optional(),
        pushApplicationAccepted: z.boolean().optional(),
        pushNewMessage: z.boolean().optional(),
        pushPaymentReceived: z.boolean().optional(),
        emailDigestFrequency: z.enum(['immediate', 'daily', 'weekly', 'never']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get or create preferences
      let prefs = await ctx.db.query.notificationPreferences.findFirst({
        where: eq(notificationPreferences.userId, ctx.user.id),
      });

      if (prefs) {
        // Update existing
        [prefs] = await ctx.db
          .update(notificationPreferences)
          .set({
            ...input,
            updatedAt: new Date(),
          })
          .where(eq(notificationPreferences.id, prefs.id))
          .returning();
      } else {
        // Create new
        [prefs] = await ctx.db
          .insert(notificationPreferences)
          .values({
            userId: ctx.user.id,
            ...input,
          })
          .returning();
      }

      console.log(`🔔 Notification preferences updated: ${ctx.user.id}`);

      return prefs;
    }),

  /**
   * Create notification (internal use)
   */
  createNotification: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        type: z.enum([
          'challenge-new-application',
          'challenge-application-accepted',
          'challenge-application-rejected',
          'challenge-completed',
          'message-new',
          'payment-received',
          'payment-sent',
          'review-received',
          'milestone-approved',
          'milestone-rejected',
          'system-announcement',
          'other',
        ]),
        title: z.string(),
        message: z.string(),
        actionUrl: z.string().optional(),
        actionText: z.string().optional(),
        relatedEntityType: z.string().optional(),
        relatedEntityId: z.string().optional(),
        metadata: z.any().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [notification] = await ctx.db
        .insert(notifications)
        .values(input)
        .returning();

      // TODO: Send email if user preferences allow
      // TODO: Send push notification if user preferences allow

      console.log(`🔔 Notification created: ${notification.id}`);

      return notification;
    }),
});

