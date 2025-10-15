import { router, protectedProcedure } from '../trpc/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { conversations, messages, typingIndicators } from '@openchance/db';
import { eq, and, or, desc, sql } from 'drizzle-orm';

/**
 * Message Router
 * Handles real-time messaging between users
 */
export const messageRouter = router({
  /**
   * Get all conversations for current user
   */
  getConversations: protectedProcedure.query(async ({ ctx }) => {
    const userConversations = await ctx.db.query.conversations.findMany({
      where: or(
        eq(conversations.participant1Id, ctx.user.id),
        eq(conversations.participant2Id, ctx.user.id)
      ),
      orderBy: desc(conversations.lastMessageAt),
      with: {
        participant1: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatar: true,
          },
        },
        participant2: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatar: true,
          },
        },
        challenge: {
          columns: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Get unread count for each conversation
    const conversationsWithUnread = await Promise.all(
      userConversations.map(async (conversation) => {
        const [{ count }] = await ctx.db
          .select({ count: sql<number>`count(*)` })
          .from(messages)
          .where(
            and(
              eq(messages.conversationId, conversation.id),
              eq(messages.receiverId, ctx.user.id),
              eq(messages.read, false)
            )
          );

        return {
          ...conversation,
          unreadCount: count,
        };
      })
    );

    return conversationsWithUnread;
  }),

  /**
   * Get or create conversation with another user
   */
  getOrCreateConversation: protectedProcedure
    .input(
      z.object({
        otherUserId: z.string(),
        challengeId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if conversation already exists
      const existing = await ctx.db.query.conversations.findFirst({
        where: or(
          and(
            eq(conversations.participant1Id, ctx.user.id),
            eq(conversations.participant2Id, input.otherUserId)
          ),
          and(
            eq(conversations.participant1Id, input.otherUserId),
            eq(conversations.participant2Id, ctx.user.id)
          )
        ),
      });

      if (existing) {
        return existing;
      }

      // Create new conversation
      const [conversation] = await ctx.db
        .insert(conversations)
        .values({
          participant1Id: ctx.user.id,
          participant2Id: input.otherUserId,
          challengeId: input.challengeId,
        })
        .returning();

      console.log(`💬 Conversation created: ${conversation.id}`);

      return conversation;
    }),

  /**
   * Get messages in a conversation
   */
  getMessages: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      // Verify access to conversation
      const conversation = await ctx.db.query.conversations.findFirst({
        where: eq(conversations.id, input.conversationId),
      });

      if (!conversation) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Conversation not found',
        });
      }

      if (
        conversation.participant1Id !== ctx.user.id &&
        conversation.participant2Id !== ctx.user.id
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have access to this conversation',
        });
      }

      // Get messages
      const conversationMessages = await ctx.db.query.messages.findMany({
        where: eq(messages.conversationId, input.conversationId),
        orderBy: desc(messages.createdAt),
        limit: input.limit,
        offset: input.offset,
        with: {
          sender: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatar: true,
            },
          },
        },
      });

      // Mark messages as read
      await ctx.db
        .update(messages)
        .set({ read: true, readAt: new Date() })
        .where(
          and(
            eq(messages.conversationId, input.conversationId),
            eq(messages.receiverId, ctx.user.id),
            eq(messages.read, false)
          )
        );

      return conversationMessages.reverse(); // Return in chronological order
    }),

  /**
   * Send a message
   */
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
        content: z.string().min(1).max(2000),
        messageType: z.enum(['text', 'file', 'image']).default('text'),
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify access to conversation
      const conversation = await ctx.db.query.conversations.findFirst({
        where: eq(conversations.id, input.conversationId),
      });

      if (!conversation) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Conversation not found',
        });
      }

      if (
        conversation.participant1Id !== ctx.user.id &&
        conversation.participant2Id !== ctx.user.id
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have access to this conversation',
        });
      }

      // Determine receiver
      const receiverId =
        conversation.participant1Id === ctx.user.id
          ? conversation.participant2Id
          : conversation.participant1Id;

      // Create message
      const [message] = await ctx.db
        .insert(messages)
        .values({
          conversationId: input.conversationId,
          senderId: ctx.user.id,
          receiverId,
          content: input.content,
          messageType: input.messageType,
          attachments: input.attachments,
        })
        .returning();

      // Update conversation last message
      await ctx.db
        .update(conversations)
        .set({
          lastMessageAt: new Date(),
          lastMessagePreview: input.content.substring(0, 100),
          updatedAt: new Date(),
        })
        .where(eq(conversations.id, input.conversationId));

      // TODO: Send real-time notification via WebSocket
      // TODO: Send email notification if user is offline

      console.log(`📨 Message sent: ${message.id}`);

      return message;
    }),

  /**
   * Mark messages as read
   */
  markAsRead: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(messages)
        .set({ read: true, readAt: new Date() })
        .where(
          and(
            eq(messages.conversationId, input.conversationId),
            eq(messages.receiverId, ctx.user.id),
            eq(messages.read, false)
          )
        );

      return { success: true };
    }),

  /**
   * Delete message
   */
  deleteMessage: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.db.query.messages.findFirst({
        where: eq(messages.id, input.messageId),
      });

      if (!message) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Message not found',
        });
      }

      // Only sender can delete
      if (message.senderId !== ctx.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own messages',
        });
      }

      // Soft delete
      await ctx.db
        .update(messages)
        .set({ deletedAt: new Date() })
        .where(eq(messages.id, input.messageId));

      return { success: true };
    }),

  /**
   * Set typing indicator
   */
  setTyping: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
        isTyping: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Upsert typing indicator
      const existing = await ctx.db.query.typingIndicators.findFirst({
        where: and(
          eq(typingIndicators.conversationId, input.conversationId),
          eq(typingIndicators.userId, ctx.user.id)
        ),
      });

      if (existing) {
        await ctx.db
          .update(typingIndicators)
          .set({
            isTyping: input.isTyping,
            updatedAt: new Date(),
          })
          .where(eq(typingIndicators.id, existing.id));
      } else {
        await ctx.db.insert(typingIndicators).values({
          conversationId: input.conversationId,
          userId: ctx.user.id,
          isTyping: input.isTyping,
        });
      }

      // TODO: Broadcast via WebSocket

      return { success: true };
    }),

  /**
   * Get typing indicators for conversation
   */
  getTypingIndicators: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const indicators = await ctx.db.query.typingIndicators.findMany({
        where: and(
          eq(typingIndicators.conversationId, input.conversationId),
          eq(typingIndicators.isTyping, true)
        ),
        with: {
          user: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      // Filter out current user
      return indicators.filter((i) => i.userId !== ctx.user.id);
    }),

  /**
   * Get unread count
   */
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const [{ count }] = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(
        and(
          eq(messages.receiverId, ctx.user.id),
          eq(messages.read, false)
        )
      );

    return { count };
  }),
});

