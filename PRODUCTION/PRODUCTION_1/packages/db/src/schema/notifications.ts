import { pgTable, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

/**
 * Notifications Table
 * Stores all user notifications
 */
export const notifications = pgTable('notifications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Notification Type
  type: text('type', {
    enum: [
      'challenge-new-application',
      'challenge-application-accepted',
      'challenge-application-rejected',
      'challenge-completed',
      'message-new',
      'payment-received',
      'payment-sent',
      'review-received',
      'milestone-approved',
      'milestone-rejected',
      'system-announcement',
      'other'
    ]
  }).notNull(),
  
  // Content
  title: text('title').notNull(),
  message: text('message').notNull(),
  
  // Action
  actionUrl: text('action_url'),
  actionText: text('action_text'),
  
  // Related Entities
  relatedEntityType: text('related_entity_type'), // e.g., 'challenge', 'application', 'payment'
  relatedEntityId: text('related_entity_id'),
  
  // Metadata
  metadata: jsonb('metadata'),
  
  // Status
  read: boolean('read').default(false),
  readAt: timestamp('read_at'),
  
  // Delivery
  emailSent: boolean('email_sent').default(false),
  emailSentAt: timestamp('email_sent_at'),
  pushSent: boolean('push_sent').default(false),
  pushSentAt: timestamp('push_sent_at'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Notification Preferences Table
 * User preferences for notifications
 */
export const notificationPreferences = pgTable('notification_preferences', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  
  // Email Preferences
  emailNewApplication: boolean('email_new_application').default(true),
  emailApplicationAccepted: boolean('email_application_accepted').default(true),
  emailApplicationRejected: boolean('email_application_rejected').default(true),
  emailNewMessage: boolean('email_new_message').default(true),
  emailPaymentReceived: boolean('email_payment_received').default(true),
  emailReviewReceived: boolean('email_review_received').default(true),
  emailMarketingUpdates: boolean('email_marketing_updates').default(false),
  
  // Push Preferences
  pushNewApplication: boolean('push_new_application').default(true),
  pushApplicationAccepted: boolean('push_application_accepted').default(true),
  pushNewMessage: boolean('push_new_message').default(true),
  pushPaymentReceived: boolean('push_payment_received').default(true),
  
  // Frequency
  emailDigestFrequency: text('email_digest_frequency', {
    enum: ['immediate', 'daily', 'weekly', 'never']
  }).default('immediate'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type NotificationPreferences = typeof notificationPreferences.$inferSelect;

