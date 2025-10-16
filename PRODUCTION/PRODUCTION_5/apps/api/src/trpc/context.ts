import { type Context } from 'hono';
import { verifyToken } from '@clerk/backend';
import { db } from '@openchance/db';
import { redis } from '../lib/redis';
import { meilisearch } from '../lib/meilisearch';

/**
 * Creates context for tRPC requests
 * Includes authenticated user, database, cache, and search clients
 */
export async function createContext({ req }: { req: Request }) {
  // Extract authorization header
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  let userId: string | null = null;
  let user: any = null;

  // Verify Clerk token if present
  if (token) {
    try {
      const verified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });
      
      userId = verified.sub;

      // Fetch user from database
      if (userId) {
        const dbUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.clerkId, userId),
        });
        
        user = dbUser || null;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Don't throw - allow unauthenticated requests for public routes
    }
  }

  return {
    userId,
    user,
    db,
    redis,
    meilisearch,
    req,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

