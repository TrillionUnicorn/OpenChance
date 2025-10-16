import { type Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

/**
 * Global error handler middleware
 * Catches all errors and returns consistent error responses
 */
export function errorHandler(err: Error, c: Context) {
  console.error('❌ Error:', err);

  // Handle HTTP exceptions
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: {
          message: err.message,
          status: err.status,
        },
      },
      err.status
    );
  }

  // Handle validation errors
  if (err.name === 'ZodError') {
    return c.json(
      {
        success: false,
        error: {
          message: 'Validation error',
          details: err,
        },
      },
      400
    );
  }

  // Handle database errors
  if (err.message.includes('duplicate key') || err.message.includes('unique constraint')) {
    return c.json(
      {
        success: false,
        error: {
          message: 'Resource already exists',
        },
      },
      409
    );
  }

  // Default error response
  return c.json(
    {
      success: false,
      error: {
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
      },
    },
    500
  );
}

