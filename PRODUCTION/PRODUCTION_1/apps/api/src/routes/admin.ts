import { router, adminProcedure } from '../trpc/trpc';
import { z } from 'zod';

/**
 * Admin Router
 * Handles admin operations
 * TODO: Implement full admin system
 */
export const adminRouter = router({
  // Placeholder - will implement next
  getStats: adminProcedure.query(async ({ ctx }) => {
    return {
      totalUsers: 0,
      totalChallenges: 0,
      totalApplications: 0,
    };
  }),
});

