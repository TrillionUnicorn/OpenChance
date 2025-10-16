import { pgTable, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

/**
 * Users Table
 * Stores all user information for both challengers and solvers
 */
export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  // Authentication (Clerk integration)
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').unique().notNull(),
  emailVerified: boolean('email_verified').default(false),
  
  // Profile Information
  firstName: text('first_name'),
  lastName: text('last_name'),
  username: text('username').unique(),
  avatar: text('avatar'),
  bio: text('bio'),
  location: text('location'),
  website: text('website'),
  
  // User Type
  userType: text('user_type', { enum: ['challenger', 'solver', 'both'] }).notNull().default('solver'),
  
  // Solver-specific fields
  skills: jsonb('skills').$type<string[]>(),
  experience: text('experience'),
  hourlyRate: integer('hourly_rate'),
  availability: text('availability', { enum: ['full-time', 'part-time', 'contract', 'not-available'] }),
  
  // Challenger-specific fields
  company: text('company'),
  companySize: text('company_size'),
  industry: text('industry'),
  
  // Reputation & Stats
  reputationScore: integer('reputation_score').default(0),
  totalChallengesPosted: integer('total_challenges_posted').default(0),
  totalChallengesSolved: integer('total_challenges_solved').default(0),
  totalEarnings: integer('total_earnings').default(0), // in cents
  totalSpent: integer('total_spent').default(0), // in cents
  
  // Subscription
  subscriptionTier: text('subscription_tier', { 
    enum: ['free', 'solver-plus', 'challenger-basic', 'challenger-pro', 'challenger-enterprise'] 
  }).default('free'),
  subscriptionStatus: text('subscription_status', { 
    enum: ['active', 'cancelled', 'past_due', 'trialing'] 
  }),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  
  // Preferences
  emailNotifications: boolean('email_notifications').default(true),
  pushNotifications: boolean('push_notifications').default(true),
  marketingEmails: boolean('marketing_emails').default(false),
  
  // Metadata
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

/**
 * User Sessions Table
 * Tracks user sessions for analytics and security
 */
export const userSessions = pgTable('user_sessions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  sessionToken: text('session_token').unique().notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  device: text('device'),
  browser: text('browser'),
  os: text('os'),
  
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * User Portfolios Table
 * Stores solver portfolio items
 */
export const userPortfolios = pgTable('user_portfolios', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  title: text('title').notNull(),
  description: text('description'),
  url: text('url'),
  imageUrl: text('image_url'),
  tags: jsonb('tags').$type<string[]>(),
  
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * User Badges Table
 * Gamification: achievements and badges
 */
export const userBadges = pgTable('user_badges', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  badgeType: text('badge_type').notNull(), // e.g., 'first-challenge', 'top-solver', 'verified-pro'
  badgeName: text('badge_name').notNull(),
  badgeDescription: text('badge_description'),
  badgeIcon: text('badge_icon'),
  
  earnedAt: timestamp('earned_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type UserPortfolio = typeof userPortfolios.$inferSelect;
export type UserBadge = typeof userBadges.$inferSelect;

