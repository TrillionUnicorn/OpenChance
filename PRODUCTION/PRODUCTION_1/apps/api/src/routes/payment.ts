import { router, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';

/**
 * Payment Router
 * Handles Stripe payments, escrow, and payouts
 * TODO: Implement full payment system
 */
export const paymentRouter = router({
  // Placeholder - will implement next
  getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
    return [];
  }),
});

