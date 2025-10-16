import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/context';
import { errorHandler } from './middleware/error-handler';
import { rateLimiter } from './middleware/rate-limiter';
import { setupWebSocket } from './websocket';

// Initialize Hono app
const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
app.use('*', rateLimiter);

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// tRPC endpoint
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext,
    onError: ({ error, path }) => {
      console.error(`[tRPC Error] ${path}:`, error);
    },
  })
);

// Error handler (must be last)
app.onError(errorHandler);

// Start server
const port = parseInt(process.env.API_PORT || '3001');

const server = Bun.serve({
  port,
  fetch: app.fetch,
});

// Setup WebSocket server
setupWebSocket(server);

console.log(`🚀 API Server running on http://localhost:${port}`);
console.log(`📡 tRPC endpoint: http://localhost:${port}/trpc`);
console.log(`🔌 WebSocket server ready`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

export default app;
export type AppRouter = typeof appRouter;

