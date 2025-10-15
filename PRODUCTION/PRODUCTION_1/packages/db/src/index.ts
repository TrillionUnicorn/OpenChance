import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Import all schemas
export * from './schema/users';
export * from './schema/challenges';
export * from './schema/applications';
export * from './schema/messages';
export * from './schema/payments';
export * from './schema/reviews';
export * from './schema/notifications';

// Database connection
const connectionString = process.env.DATABASE_URL || '';

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create postgres client
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create drizzle instance
export const db = drizzle(client);

// Export client for migrations
export { client };

