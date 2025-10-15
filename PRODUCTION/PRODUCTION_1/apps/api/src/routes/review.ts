import { router, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';

/**
 * Review Router
 * Handles reviews and ratings
 * TODO: Implement full review system
 */
export const reviewRouter = router({
  // Placeholder - will implement next
  getReviews: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return [];
    }),
});

