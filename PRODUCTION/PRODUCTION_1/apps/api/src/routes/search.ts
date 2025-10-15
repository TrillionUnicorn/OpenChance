import { router, publicProcedure } from '../trpc/trpc';
import { z } from 'zod';

/**
 * Search Router
 * Handles full-text search with Meilisearch
 * TODO: Implement full search system
 */
export const searchRouter = router({
  // Placeholder - will implement next
  searchChallenges: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      return [];
    }),
});

