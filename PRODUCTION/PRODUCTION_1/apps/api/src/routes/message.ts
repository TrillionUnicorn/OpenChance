import { router, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';

/**
 * Message Router
 * Handles real-time messaging between users
 * TODO: Implement full messaging system
 */
export const messageRouter = router({
  // Placeholder - will implement next
  getConversations: protectedProcedure.query(async ({ ctx }) => {
    return [];
  }),
});

