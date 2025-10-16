import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { challenges } from './challenges';

/**
 * Reviews Table
 * Stores reviews from both challengers and solvers
 */
export const reviews = pgTable('reviews', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  // References
  challengeId: text('challenge_id')
    .references(() => challenges.id, { onDelete: 'cascade' })
    .notNull(),
  
  reviewerId: text('reviewer_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  revieweeId: text('reviewee_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Review Type
  reviewType: text('review_type', {
    enum: ['challenger-to-solver', 'solver-to-challenger']
  }).notNull(),
  
  // Rating (1-5 stars)
  rating: integer('rating').notNull(), // 1-5
  
  // Review Content
  title: text('title'),
  comment: text('comment'),
  
  // Detailed Ratings
  communicationRating: integer('communication_rating'), // 1-5
  qualityRating: integer('quality_rating'), // 1-5
  timelinessRating: integer('timeliness_rating'), // 1-5
  professionalismRating: integer('professionalism_rating'), // 1-5
  
  // Moderation
  flagged: boolean('flagged').default(false),
  flagReason: text('flag_reason'),
  moderationStatus: text('moderation_status', {
    enum: ['pending', 'approved', 'rejected', 'hidden']
  }).default('pending'),
  
  // Visibility
  public: boolean('public').default(true),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  moderatedAt: timestamp('moderated_at'),
});

/**
 * Review Responses Table
 * Allows reviewees to respond to reviews
 */
export const reviewResponses = pgTable('review_responses', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  reviewId: text('review_id')
    .references(() => reviews.id, { onDelete: 'cascade' })
    .notNull(),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  response: text('response').notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type ReviewResponse = typeof reviewResponses.$inferSelect;

