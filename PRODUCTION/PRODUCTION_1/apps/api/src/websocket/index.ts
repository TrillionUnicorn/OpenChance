import { WebSocketServer, WebSocket } from 'ws';
import { verifyToken } from '@clerk/backend';
import { db } from '@openchance/db';
import { eq } from 'drizzle-orm';

interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
  isAlive?: boolean;
}

interface WebSocketMessage {
  type: string;
  payload: any;
}

// Store active connections
const connections = new Map<string, Set<AuthenticatedWebSocket>>();

/**
 * WebSocket server for real-time features
 * Handles real-time messaging, notifications, and presence
 */
export function setupWebSocket(server: any) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  // Heartbeat to detect broken connections
  const heartbeatInterval = setInterval(() => {
    wss.clients.forEach((ws: AuthenticatedWebSocket) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000); // 30 seconds

  wss.on('connection', async (ws: AuthenticatedWebSocket, req) => {
    ws.isAlive = true;

    ws.on('pong', () => {
      ws.isAlive = true;
    });

    // Extract token from query string
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (!token) {
      ws.close(1008, 'Authentication required');
      return;
    }

    try {
      // Verify Clerk token
      const verified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });

      const userId = verified.sub;

      // Get user from database
      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, userId),
      });

      if (!user) {
        ws.close(1008, 'User not found');
        return;
      }

      // Store user ID on WebSocket
      ws.userId = user.id;

      // Add to connections map
      if (!connections.has(user.id)) {
        connections.set(user.id, new Set());
      }
      connections.get(user.id)!.add(ws);

      console.log(`✅ WebSocket connected: ${user.id}`);

      // Send welcome message
      ws.send(
        JSON.stringify({
          type: 'connected',
          payload: {
            userId: user.id,
            timestamp: new Date().toISOString(),
          },
        })
      );

      // Broadcast online status
      broadcastToUser(user.id, {
        type: 'user-online',
        payload: { userId: user.id },
      });

      // Handle incoming messages
      ws.on('message', async (data) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString());
          await handleWebSocketMessage(ws, message);
        } catch (error) {
          console.error('WebSocket message error:', error);
          ws.send(
            JSON.stringify({
              type: 'error',
              payload: { message: 'Invalid message format' },
            })
          );
        }
      });

      // Handle disconnection
      ws.on('close', () => {
        if (ws.userId) {
          const userConnections = connections.get(ws.userId);
          if (userConnections) {
            userConnections.delete(ws);
            if (userConnections.size === 0) {
              connections.delete(ws.userId);
              // Broadcast offline status
              broadcastToUser(ws.userId, {
                type: 'user-offline',
                payload: { userId: ws.userId },
              });
            }
          }
          console.log(`❌ WebSocket disconnected: ${ws.userId}`);
        }
      });
    } catch (error) {
      console.error('WebSocket authentication error:', error);
      ws.close(1008, 'Authentication failed');
    }
  });

  wss.on('close', () => {
    clearInterval(heartbeatInterval);
  });

  console.log('🔌 WebSocket server initialized on /ws');
}

/**
 * Handle incoming WebSocket messages
 */
async function handleWebSocketMessage(
  ws: AuthenticatedWebSocket,
  message: WebSocketMessage
) {
  const { type, payload } = message;

  switch (type) {
    case 'ping':
      ws.send(JSON.stringify({ type: 'pong', payload: {} }));
      break;

    case 'typing-start':
      // Broadcast typing indicator
      if (payload.conversationId && payload.recipientId) {
        sendToUser(payload.recipientId, {
          type: 'typing-start',
          payload: {
            conversationId: payload.conversationId,
            userId: ws.userId,
          },
        });
      }
      break;

    case 'typing-stop':
      // Broadcast typing stopped
      if (payload.conversationId && payload.recipientId) {
        sendToUser(payload.recipientId, {
          type: 'typing-stop',
          payload: {
            conversationId: payload.conversationId,
            userId: ws.userId,
          },
        });
      }
      break;

    case 'message-sent':
      // Broadcast new message
      if (payload.recipientId) {
        sendToUser(payload.recipientId, {
          type: 'new-message',
          payload: payload.message,
        });
      }
      break;

    default:
      console.log(`Unknown WebSocket message type: ${type}`);
  }
}

/**
 * Send message to a specific user (all their connections)
 */
export function sendToUser(userId: string, message: WebSocketMessage) {
  const userConnections = connections.get(userId);
  if (userConnections) {
    const messageStr = JSON.stringify(message);
    userConnections.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(messageStr);
      }
    });
  }
}

/**
 * Broadcast message to all users except sender
 */
export function broadcastToUser(senderId: string, message: WebSocketMessage) {
  const messageStr = JSON.stringify(message);
  connections.forEach((userConnections, userId) => {
    if (userId !== senderId) {
      userConnections.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(messageStr);
        }
      });
    }
  });
}

/**
 * Check if user is online
 */
export function isUserOnline(userId: string): boolean {
  return connections.has(userId) && connections.get(userId)!.size > 0;
}

/**
 * Get online users count
 */
export function getOnlineUsersCount(): number {
  return connections.size;
}

