import { pgTable, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { challenges } from './challenges';

/**
 * Conversations Table
 * Stores conversation threads between users
 */
export const conversations = pgTable('conversations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  // Participants
  participant1Id: text('participant1_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  participant2Id: text('participant2_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Related Challenge (optional)
  challengeId: text('challenge_id')
    .references(() => challenges.id, { onDelete: 'set null' }),
  
  // Last Message Info
  lastMessageAt: timestamp('last_message_at'),
  lastMessagePreview: text('last_message_preview'),
  
  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Messages Table
 * Stores individual messages in conversations
 */
export const messages = pgTable('messages', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  conversationId: text('conversation_id')
    .references(() => conversations.id, { onDelete: 'cascade' })
    .notNull(),
  
  senderId: text('sender_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  receiverId: text('receiver_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Message Content
  content: text('content').notNull(),
  messageType: text('message_type', {
    enum: ['text', 'file', 'image', 'system']
  }).default('text').notNull(),
  
  // Attachments
  attachments: jsonb('attachments').$type<{
    name: string;
    url: string;
    size: number;
    type: string;
  }[]>(),
  
  // Read Status
  read: boolean('read').default(false),
  readAt: timestamp('read_at'),
  
  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

/**
 * Typing Indicators Table
 * Real-time typing indicators
 */
export const typingIndicators = pgTable('typing_indicators', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  
  conversationId: text('conversation_id')
    .references(() => conversations.id, { onDelete: 'cascade' })
    .notNull(),
  
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  
  isTyping: boolean('is_typing').default(false),
  
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type TypingIndicator = typeof typingIndicators.$inferSelect;

