import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@openchance/api';
import superjson from 'superjson';
import { browser } from '$app/environment';

/**
 * Get authentication token from Clerk
 */
function getAuthToken(): string | null {
  if (!browser) return null;
  
  // Get token from Clerk session
  const token = localStorage.getItem('clerk-token');
  return token;
}

/**
 * tRPC client for browser
 */
export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/trpc`,
      headers() {
        const token = getAuthToken();
        return {
          authorization: token ? `Bearer ${token}` : '',
        };
      },
    }),
  ],
});

/**
 * Create tRPC client with custom token
 */
export function createTRPCClient(token?: string) {
  return createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/trpc`,
        headers() {
          return {
            authorization: token ? `Bearer ${token}` : '',
          };
        },
      }),
    ],
  });
}

