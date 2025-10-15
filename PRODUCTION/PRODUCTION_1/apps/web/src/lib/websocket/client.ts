import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

interface WebSocketMessage {
  type: string;
  payload: any;
}

type MessageHandler = (message: WebSocketMessage) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageHandlers: Map<string, Set<MessageHandler>> = new Map();
  
  public connected: Writable<boolean> = writable(false);
  public onlineUsers: Writable<Set<string>> = writable(new Set());

  /**
   * Connect to WebSocket server
   */
  connect(token: string) {
    if (!browser) return;

    const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:3001'}/ws?token=${token}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('✅ WebSocket connected');
      this.connected.set(true);
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('❌ WebSocket disconnected');
      this.connected.set(false);
      this.attemptReconnect(token);
    };
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.connected.set(false);
    }
  }

  /**
   * Send message to server
   */
  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  /**
   * Subscribe to message type
   */
  on(type: string, handler: MessageHandler) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)!.add(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(type);
      if (handlers) {
        handlers.delete(handler);
      }
    };
  }

  /**
   * Handle incoming message
   */
  private handleMessage(message: WebSocketMessage) {
    const { type, payload } = message;

    // Handle built-in message types
    switch (type) {
      case 'connected':
        console.log('WebSocket connected:', payload);
        break;

      case 'user-online':
        this.onlineUsers.update((users) => {
          users.add(payload.userId);
          return users;
        });
        break;

      case 'user-offline':
        this.onlineUsers.update((users) => {
          users.delete(payload.userId);
          return users;
        });
        break;
    }

    // Call registered handlers
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.forEach((handler) => handler(message));
    }
  }

  /**
   * Attempt to reconnect
   */
  private attemptReconnect(token: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      
      console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect(token);
      }, delay);
    } else {
      console.error('Max reconnect attempts reached');
    }
  }

  /**
   * Send typing indicator
   */
  startTyping(conversationId: string, recipientId: string) {
    this.send('typing-start', { conversationId, recipientId });
  }

  /**
   * Stop typing indicator
   */
  stopTyping(conversationId: string, recipientId: string) {
    this.send('typing-stop', { conversationId, recipientId });
  }

  /**
   * Notify message sent
   */
  notifyMessageSent(recipientId: string, message: any) {
    this.send('message-sent', { recipientId, message });
  }
}

// Export singleton instance
export const wsClient = new WebSocketClient();

