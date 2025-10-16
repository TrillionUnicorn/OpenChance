import { initTRPC, TRPCError } from '@trpc/server';
import { type Context } from './context';
import superjson from 'superjson';

/**
 * Initialize tRPC with context
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error && error.cause.name === 'ZodError'
            ? error.cause
            : null,
      },
    };
  },
});

/**
 * Export reusable router and procedure helpers
 */
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected procedure - requires authentication
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId || !ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
      user: ctx.user,
    },
  });
});

/**
 * Admin procedure - requires admin role
 */
export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  // Check if user has admin role
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must be an admin to access this resource',
    });
  }

  return next({ ctx });
});

/**
 * Challenger procedure - requires challenger role
 */
export const challengerProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.userType !== 'challenger' && ctx.user.userType !== 'both') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must be a challenger to access this resource',
    });
  }

  return next({ ctx });
});

/**
 * Solver procedure - requires solver role
 */
export const solverProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.userType !== 'solver' && ctx.user.userType !== 'both') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must be a solver to access this resource',
    });
  }

  return next({ ctx });
});

