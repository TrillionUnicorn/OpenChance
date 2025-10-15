import { type Context, type Next } from 'hono';
import { redis } from '../lib/redis';

/**
 * Rate limiter middleware
 * Limits requests per IP address
 */
export async function rateLimiter(c: Context, next: Next) {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
  const key = `rate-limit:${ip}`;

  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');

  try {
    // Get current count
    const current = await redis.get(key);
    const count = current ? parseInt(current) : 0;

    if (count >= maxRequests) {
      return c.json(
        {
          success: false,
          error: {
            message: 'Too many requests, please try again later',
          },
        },
        429
      );
    }

    // Increment count
    if (count === 0) {
      await redis.setex(key, Math.floor(windowMs / 1000), '1');
    } else {
      await redis.incr(key);
    }

    // Add rate limit headers
    c.header('X-RateLimit-Limit', maxRequests.toString());
    c.header('X-RateLimit-Remaining', (maxRequests - count - 1).toString());

    await next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    // Don't block requests if Redis fails
    await next();
  }
}

