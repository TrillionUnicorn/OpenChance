import { pgTable, text, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

/**
 * Challenges Table
 * Stores all challenges posted by challengers
 */
export const challenges = pgTable('challenges', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  // Challenger Information
  challengerId: text('challenger_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Challenge Details
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category', {
    enum: [
      'technology',
      'design',
      'business',
      'marketing',
      'sustainability',
      'healthcare',
      'education',
      'smart-cities',
      'other'
    ]
  }).notNull(),
  
  difficulty: text('difficulty', {
    enum: ['beginner', 'intermediate', 'advanced', 'expert']
  }).notNull(),
  
  // Requirements
  requirements: jsonb('requirements').$type<string[]>().notNull(),
  skills: jsonb('skills').$type<string[]>(),
  deliverables: jsonb('deliverables').$type<string[]>(),
  
  // Reward
  rewardType: text('reward_type', {
    enum: ['fixed', 'range', 'milestone']
  }).notNull(),
  rewardAmount: integer('reward_amount'), // in cents, for fixed
  rewardMin: integer('reward_min'), // in cents, for range
  rewardMax: integer('reward_max'), // in cents, for range
  milestones: jsonb('milestones').$type<{
    name: string;
    amount: number;
    description: string;
  }[]>(),
  
  // Timeline
  deadline: timestamp('deadline'),
  estimatedDuration: text('estimated_duration'), // e.g., "2 weeks", "1 month"
  
  // Status
  status: text('status', {
    enum: ['draft', 'open', 'in-progress', 'in-review', 'completed', 'cancelled']
  }).default('draft').notNull(),
  
  // Visibility
  visibility: text('visibility', {
    enum: ['public', 'private', 'invite-only']
  }).default('public').notNull(),
  
  // Attachments
  attachments: jsonb('attachments').$type<{
    name: string;
    url: string;
    size: number;
    type: string;
  }[]>(),
  
  // Stats
  views: integer('views').default(0),
  applicants: integer('applicants').default(0),
  featured: boolean('featured').default(false),
  
  // AI Matching
  aiMatchingEnabled: boolean('ai_matching_enabled').default(true),
  aiMatchingScore: integer('ai_matching_score'),
  
  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  publishedAt: timestamp('published_at'),
  completedAt: timestamp('completed_at'),
  cancelledAt: timestamp('cancelled_at'),
});

/**
 * Challenge Tags Table
 * Many-to-many relationship for challenge tags
 */
export const challengeTags = pgTable('challenge_tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  challengeId: text('challenge_id')
    .references(() => challenges.id, { onDelete: 'cascade' })
    .notNull(),
  
  tag: text('tag').notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Challenge Views Table
 * Tracks who viewed which challenges
 */
export const challengeViews = pgTable('challenge_views', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  challengeId: text('challenge_id')
    .references(() => challenges.id, { onDelete: 'cascade' })
    .notNull(),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' }),
  
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  
  viewedAt: timestamp('viewed_at').defaultNow().notNull(),
});

/**
 * Challenge Bookmarks Table
 * Users can bookmark challenges
 */
export const challengeBookmarks = pgTable('challenge_bookmarks', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  challengeId: text('challenge_id')
    .references(() => challenges.id, { onDelete: 'cascade' })
    .notNull(),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Challenge = typeof challenges.$inferSelect;
export type NewChallenge = typeof challenges.$inferInsert;
export type ChallengeTag = typeof challengeTags.$inferSelect;
export type ChallengeView = typeof challengeViews.$inferSelect;
export type ChallengeBookmark = typeof challengeBookmarks.$inferSelect;

