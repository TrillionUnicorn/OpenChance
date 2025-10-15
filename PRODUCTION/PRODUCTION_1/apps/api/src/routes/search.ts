import { router, publicProcedure } from '../trpc/trpc';
import { z } from 'zod';

/**
 * Search Router
 * Handles full-text search with Meilisearch
 */
export const searchRouter = router({
  /**
   * Search challenges
   */
  searchChallenges: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        category: z.string().optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
        minReward: z.number().optional(),
        maxReward: z.number().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, category, difficulty, minReward, maxReward, limit, offset } = input;

      // Build filter
      const filters: string[] = [];

      if (category) {
        filters.push(`category = "${category}"`);
      }

      if (difficulty) {
        filters.push(`difficulty = "${difficulty}"`);
      }

      if (minReward) {
        filters.push(`rewardAmount >= ${minReward}`);
      }

      if (maxReward) {
        filters.push(`rewardAmount <= ${maxReward}`);
      }

      // Search in Meilisearch
      const results = await ctx.meilisearch.index('challenges').search(query, {
        filter: filters.length > 0 ? filters.join(' AND ') : undefined,
        limit,
        offset,
        attributesToHighlight: ['title', 'description'],
      });

      return {
        hits: results.hits,
        total: results.estimatedTotalHits,
        processingTimeMs: results.processingTimeMs,
      };
    }),

  /**
   * Search users
   */
  searchUsers: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        userType: z.enum(['challenger', 'solver', 'both']).optional(),
        skills: z.array(z.string()).optional(),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, userType, skills, limit } = input;

      // Build filter
      const filters: string[] = [];

      if (userType) {
        filters.push(`userType = "${userType}"`);
      }

      if (skills && skills.length > 0) {
        const skillFilters = skills.map(skill => `skills = "${skill}"`).join(' OR ');
        filters.push(`(${skillFilters})`);
      }

      // Search in Meilisearch
      const results = await ctx.meilisearch.index('users').search(query, {
        filter: filters.length > 0 ? filters.join(' AND ') : undefined,
        limit,
        attributesToHighlight: ['firstName', 'lastName', 'username', 'bio'],
      });

      return {
        hits: results.hits,
        total: results.estimatedTotalHits,
      };
    }),

  /**
   * Autocomplete suggestions
   */
  autocomplete: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        type: z.enum(['challenges', 'users', 'skills']).default('challenges'),
        limit: z.number().min(1).max(10).default(5),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, type, limit } = input;

      const results = await ctx.meilisearch.index(type).search(query, {
        limit,
        attributesToRetrieve: type === 'challenges' ? ['id', 'title'] : ['id', 'firstName', 'lastName', 'username'],
      });

      return results.hits;
    }),

  /**
   * Get search suggestions
   */
  getSuggestions: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      // Get popular searches from Redis
      const popularSearches = await ctx.redis.zrevrange('popular-searches', 0, 9);

      // Get related searches
      const relatedSearches = await ctx.redis.smembers(`related:${input.query.toLowerCase()}`);

      return {
        popular: popularSearches,
        related: relatedSearches,
      };
    }),

  /**
   * Track search query (for analytics)
   */
  trackSearch: publicProcedure
    .input(
      z.object({
        query: z.string(),
        resultCount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Increment search count in Redis
      await ctx.redis.zincrby('popular-searches', 1, input.query.toLowerCase());

      // Set expiry for popular searches (30 days)
      await ctx.redis.expire('popular-searches', 30 * 24 * 60 * 60);

      return { success: true };
    }),
});

