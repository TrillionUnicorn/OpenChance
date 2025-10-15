import { router, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';

/**
 * Notification Router
 * Handles notifications and preferences
 * TODO: Implement full notification system
 */
export const notificationRouter = router({
  // Placeholder - will implement next
  getNotifications: protectedProcedure.query(async ({ ctx }) => {
    return [];
  }),
});

