import { pgTable, text, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { challenges } from './challenges';

/**
 * Applications Table
 * Stores solver applications to challenges
 */
export const applications = pgTable('applications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  // References
  challengeId: text('challenge_id')
    .references(() => challenges.id, { onDelete: 'cascade' })
    .notNull(),
  
  solverId: text('solver_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Application Details
  proposal: text('proposal').notNull(),
  estimatedTimeline: text('estimated_timeline'),
  proposedBudget: integer('proposed_budget'), // in cents
  
  // Portfolio & Experience
  relevantExperience: text('relevant_experience'),
  portfolioLinks: jsonb('portfolio_links').$type<string[]>(),
  attachments: jsonb('attachments').$type<{
    name: string;
    url: string;
    size: number;
    type: string;
  }[]>(),
  
  // Status
  status: text('status', {
    enum: ['pending', 'under-review', 'shortlisted', 'accepted', 'rejected', 'withdrawn']
  }).default('pending').notNull(),
  
  // AI Matching Score
  aiMatchScore: integer('ai_match_score'),
  aiMatchReason: text('ai_match_reason'),
  
  // Challenger Actions
  viewedByChallenger: boolean('viewed_by_challenger').default(false),
  viewedAt: timestamp('viewed_at'),
  
  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  acceptedAt: timestamp('accepted_at'),
  rejectedAt: timestamp('rejected_at'),
  withdrawnAt: timestamp('withdrawn_at'),
});

/**
 * Application Messages Table
 * Messages between challenger and solver during application process
 */
export const applicationMessages = pgTable('application_messages', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  applicationId: text('application_id')
    .references(() => applications.id, { onDelete: 'cascade' })
    .notNull(),
  
  senderId: text('sender_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  message: text('message').notNull(),
  
  attachments: jsonb('attachments').$type<{
    name: string;
    url: string;
    size: number;
    type: string;
  }[]>(),
  
  read: boolean('read').default(false),
  readAt: timestamp('read_at'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
export type ApplicationMessage = typeof applicationMessages.$inferSelect;

