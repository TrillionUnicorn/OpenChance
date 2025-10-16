import { router, publicProcedure, protectedProcedure, challengerProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { challenges, challengeTags, challengeViews, challengeBookmarks } from '@openchance/db';
import { eq, and, isNull, desc, asc, sql, or, like, inArray } from 'drizzle-orm';

/**
 * Challenge Router
 * Handles challenge CRUD operations, search, and filtering
 */
export const challengeRouter = router({
  /**
   * Create a new challenge
   */
  create: challengerProcedure
    .input(
      z.object({
        title: z.string().min(10).max(200),
        description: z.string().min(50).max(5000),
        category: z.enum([
          'technology',
          'design',
          'business',
          'marketing',
          'sustainability',
          'healthcare',
          'education',
          'smart-cities',
          'other',
        ]),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
        requirements: z.array(z.string()).min(1),
        skills: z.array(z.string()).optional(),
        deliverables: z.array(z.string()).optional(),
        rewardType: z.enum(['fixed', 'range', 'milestone']),
        rewardAmount: z.number().int().positive().optional(),
        rewardMin: z.number().int().positive().optional(),
        rewardMax: z.number().int().positive().optional(),
        milestones: z
          .array(
            z.object({
              name: z.string(),
              amount: z.number().int().positive(),
              description: z.string(),
            })
          )
          .optional(),
        deadline: z.date().optional(),
        estimatedDuration: z.string().optional(),
        visibility: z.enum(['public', 'private', 'invite-only']).default('public'),
        attachments: z
          .array(
            z.object({
              name: z.string(),
              url: z.string().url(),
              size: z.number(),
              type: z.string(),
            })
          )
          .optional(),
        tags: z.array(z.string()).optional(),
        status: z.enum(['draft', 'open']).default('draft'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { tags, ...challengeData } = input;

      // Create challenge
      const [challenge] = await ctx.db
        .insert(challenges)
        .values({
          ...challengeData,
          challengerId: ctx.user.id,
          publishedAt: input.status === 'open' ? new Date() : null,
        })
        .returning();

      // Add tags if provided
      if (tags && tags.length > 0) {
        await ctx.db.insert(challengeTags).values(
          tags.map((tag) => ({
            challengeId: challenge.id,
            tag: tag.toLowerCase(),
          }))
        );
      }

      // Index in Meilisearch for search
      if (input.status === 'open') {
        await ctx.meilisearch.index('challenges').addDocuments([
          {
            id: challenge.id,
            title: challenge.title,
            description: challenge.description,
            category: challenge.category,
            difficulty: challenge.difficulty,
            tags: tags || [],
          },
        ]);
      }

      console.log(`✨ Challenge created: ${challenge.title} (${challenge.id})`);

      return challenge;
    }),

  /**
   * Get all challenges with filtering and pagination
   */
  getAll: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
        status: z.enum(['draft', 'open', 'in-progress', 'in-review', 'completed', 'cancelled']).optional(),
        minReward: z.number().optional(),
        maxReward: z.number().optional(),
        sortBy: z.enum(['newest', 'reward', 'deadline', 'popular']).default('newest'),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const { category, difficulty, status, minReward, maxReward, sortBy, limit, offset } = input;

      // Build where conditions
      const conditions = [eq(challenges.visibility, 'public')];

      if (category) {
        conditions.push(eq(challenges.category, category as any));
      }

      if (difficulty) {
        conditions.push(eq(challenges.difficulty, difficulty));
      }

      if (status) {
        conditions.push(eq(challenges.status, status));
      } else {
        // Default to only open challenges
        conditions.push(eq(challenges.status, 'open'));
      }

      if (minReward) {
        conditions.push(sql`${challenges.rewardAmount} >= ${minReward}`);
      }

      if (maxReward) {
        conditions.push(sql`${challenges.rewardAmount} <= ${maxReward}`);
      }

      // Build order by
      let orderBy;
      switch (sortBy) {
        case 'reward':
          orderBy = desc(challenges.rewardAmount);
          break;
        case 'deadline':
          orderBy = asc(challenges.deadline);
          break;
        case 'popular':
          orderBy = desc(challenges.views);
          break;
        case 'newest':
        default:
          orderBy = desc(challenges.createdAt);
      }

      // Query challenges
      const results = await ctx.db.query.challenges.findMany({
        where: and(...conditions),
        orderBy,
        limit,
        offset,
        with: {
          challenger: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
              reputationScore: true,
            },
          },
        },
      });

      // Get total count
      const [{ count }] = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(challenges)
        .where(and(...conditions));

      return {
        challenges: results,
        total: count,
        hasMore: offset + limit < count,
      };
    }),

  /**
   * Get challenge by ID
   */
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const challenge = await ctx.db.query.challenges.findFirst({
        where: eq(challenges.id, input.id),
        with: {
          challenger: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
              reputationScore: true,
              company: true,
            },
          },
        },
      });

      if (!challenge) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found',
        });
      }

      // Increment view count
      await ctx.db
        .update(challenges)
        .set({ views: sql`${challenges.views} + 1` })
        .where(eq(challenges.id, input.id));

      // Track view
      if (ctx.userId) {
        await ctx.db.insert(challengeViews).values({
          challengeId: input.id,
          userId: ctx.userId,
        });
      }

      // Get tags
      const tags = await ctx.db.query.challengeTags.findMany({
        where: eq(challengeTags.challengeId, input.id),
      });

      return {
        ...challenge,
        tags: tags.map((t) => t.tag),
      };
    }),

  /**
   * Update challenge
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(10).max(200).optional(),
        description: z.string().min(50).max(5000).optional(),
        category: z
          .enum([
            'technology',
            'design',
            'business',
            'marketing',
            'sustainability',
            'healthcare',
            'education',
            'smart-cities',
            'other',
          ])
          .optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
        requirements: z.array(z.string()).optional(),
        skills: z.array(z.string()).optional(),
        deliverables: z.array(z.string()).optional(),
        deadline: z.date().optional(),
        estimatedDuration: z.string().optional(),
        status: z.enum(['draft', 'open', 'in-progress', 'in-review', 'completed', 'cancelled']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;

      // Verify ownership
      const challenge = await ctx.db.query.challenges.findFirst({
        where: eq(challenges.id, id),
      });

      if (!challenge) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found',
        });
      }

      if (challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update your own challenges',
        });
      }

      // Can't update if challenge has applications and is not in draft
      if (challenge.status !== 'draft' && challenge.applicants > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot update challenge with existing applications',
        });
      }

      const [updated] = await ctx.db
        .update(challenges)
        .set({
          ...updates,
          updatedAt: new Date(),
          publishedAt: updates.status === 'open' && !challenge.publishedAt ? new Date() : challenge.publishedAt,
        })
        .where(eq(challenges.id, id))
        .returning();

      console.log(`✏️ Challenge updated: ${updated.title} (${updated.id})`);

      return updated;
    }),

  /**
   * Delete challenge
   */
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const challenge = await ctx.db.query.challenges.findFirst({
        where: eq(challenges.id, input.id),
      });

      if (!challenge) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found',
        });
      }

      if (challenge.challengerId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own challenges',
        });
      }

      // Can't delete if challenge has applications
      if (challenge.applicants > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot delete challenge with existing applications',
        });
      }

      await ctx.db.delete(challenges).where(eq(challenges.id, input.id));

      console.log(`🗑️ Challenge deleted: ${input.id}`);

      return { success: true };
    }),

  /**
   * Bookmark challenge
   */
  bookmark: protectedProcedure
    .input(
      z.object({
        challengeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if already bookmarked
      const existing = await ctx.db.query.challengeBookmarks.findFirst({
        where: and(eq(challengeBookmarks.challengeId, input.challengeId), eq(challengeBookmarks.userId, ctx.user.id)),
      });

      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Challenge already bookmarked',
        });
      }

      await ctx.db.insert(challengeBookmarks).values({
        challengeId: input.challengeId,
        userId: ctx.user.id,
      });

      return { success: true };
    }),

  /**
   * Remove bookmark
   */
  removeBookmark: protectedProcedure
    .input(
      z.object({
        challengeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(challengeBookmarks)
        .where(and(eq(challengeBookmarks.challengeId, input.challengeId), eq(challengeBookmarks.userId, ctx.user.id)));

      return { success: true };
    }),

  /**
   * Get user's bookmarked challenges
   */
  getBookmarked: protectedProcedure.query(async ({ ctx }) => {
    const bookmarks = await ctx.db.query.challengeBookmarks.findMany({
      where: eq(challengeBookmarks.userId, ctx.user.id),
      with: {
        challenge: {
          with: {
            challenger: {
              columns: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return bookmarks.map((b) => b.challenge);
  }),
});

