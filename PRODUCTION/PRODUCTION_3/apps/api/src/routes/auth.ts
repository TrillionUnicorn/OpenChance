import { router, publicProcedure, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { users } from '@openchance/db';
import { eq } from 'drizzle-orm';

/**
 * Authentication Router
 * Handles user registration, login, and session management
 */
export const authRouter = router({
  /**
   * Register a new user
   * Called after Clerk authentication to create user in our database
   */
  register: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        username: z.string().optional(),
        avatar: z.string().url().optional(),
        userType: z.enum(['challenger', 'solver', 'both']).default('solver'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user already exists
      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(users.clerkId, input.clerkId),
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });
      }

      // Create new user
      const [newUser] = await ctx.db
        .insert(users)
        .values({
          clerkId: input.clerkId,
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          username: input.username,
          avatar: input.avatar,
          userType: input.userType,
          emailVerified: true, // Clerk handles email verification
          reputationScore: 0,
          subscriptionTier: 'free',
        })
        .returning();

      // Log registration event
      console.log(`✅ New user registered: ${newUser.email} (${newUser.id})`);

      return {
        success: true,
        user: newUser,
      };
    }),

  /**
   * Get current user session
   */
  getSession: protectedProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.user,
      userId: ctx.userId,
    };
  }),

  /**
   * Update user's last login timestamp
   */
  updateLastLogin: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, ctx.user.id));

    return { success: true };
  }),

  /**
   * Sync user data from Clerk
   * Called when Clerk user data changes
   */
  syncUser: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        username: z.string().optional(),
        avatar: z.string().url().optional(),
        emailVerified: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(users.clerkId, input.clerkId),
      });

      if (!existingUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      // Update user data
      const [updatedUser] = await ctx.db
        .update(users)
        .set({
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          username: input.username,
          avatar: input.avatar,
          emailVerified: input.emailVerified,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser.id))
        .returning();

      console.log(`🔄 User synced: ${updatedUser.email} (${updatedUser.id})`);

      return {
        success: true,
        user: updatedUser,
      };
    }),

  /**
   * Delete user account
   */
  deleteAccount: protectedProcedure
    .input(
      z.object({
        confirmation: z.literal('DELETE_MY_ACCOUNT'),
      })
    )
    .mutation(async ({ ctx }) => {
      // Soft delete - set deletedAt timestamp
      await ctx.db
        .update(users)
        .set({
          deletedAt: new Date(),
          email: `deleted_${ctx.user.id}@deleted.com`, // Anonymize email
        })
        .where(eq(users.id, ctx.user.id));

      console.log(`🗑️ User account deleted: ${ctx.user.id}`);

      return { success: true };
    }),

  /**
   * Check if username is available
   */
  checkUsername: publicProcedure
    .input(
      z.object({
        username: z.string().min(3).max(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(users.username, input.username),
      });

      return {
        available: !existingUser,
      };
    }),

  /**
   * Check if email is available
   */
  checkEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      return {
        available: !existingUser,
      };
    }),
});

