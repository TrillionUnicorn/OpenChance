<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { wsClient } from '$lib/websocket/client';
  import { writable } from 'svelte/store';

  let user = writable<any>(null);
  let loading = true;
  let mobileMenuOpen = false;
  let unreadMessages = writable(0);
  let unreadNotifications = writable(0);

  onMount(async () => {
    // Check authentication
    const token = localStorage.getItem('clerk-token');
    if (!token) {
      goto('/login');
      return;
    }

    try {
      // Get user session
      const session = await trpc.auth.getSession.query();
      user.set(session.user);

      // Connect WebSocket if not connected
      if (!$wsClient.connected) {
        wsClient.connect(token);
      }

      // Get unread counts
      const messageCount = await trpc.message.getUnreadCount.query();
      unreadMessages.set(messageCount.count);

      const notifCount = await trpc.notification.getUnreadCount.query();
      unreadNotifications.set(notifCount.count);

      // Subscribe to real-time updates
      wsClient.on('new-message', () => {
        unreadMessages.update(n => n + 1);
      });

      wsClient.on('new-notification', () => {
        unreadNotifications.update(n => n + 1);
      });

      loading = false;
    } catch (error) {
      console.error('Auth error:', error);
      localStorage.removeItem('clerk-token');
      goto('/login');
    }
  });

  async function handleSignOut() {
    localStorage.removeItem('clerk-token');
    wsClient.disconnect();
    goto('/');
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'home' },
    { name: 'Challenges', href: '/challenges', icon: 'briefcase' },
    { name: 'Applications', href: '/applications', icon: 'document' },
    { name: 'Messages', href: '/messages', icon: 'chat', badge: $unreadMessages },
    { name: 'Profile', href: '/profile', icon: 'user' },
  ];

  const adminNavigation = [
    { name: 'Admin', href: '/admin', icon: 'shield' },
  ];
</script>

{#if loading}
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
{:else}
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Desktop Nav -->
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a href="/dashboard" class="text-2xl font-bold text-indigo-600">
                OpenChance
              </a>
            </div>
            <div class="hidden sm:ml-8 sm:flex sm:space-x-8">
              {#each navigation as item}
                <a
                  href={item.href}
                  class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors
                    {$page.url.pathname.startsWith(item.href)
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
                >
                  {item.name}
                  {#if item.badge && item.badge > 0}
                    <span class="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {item.badge}
                    </span>
                  {/if}
                </a>
              {/each}
              {#if $user?.role === 'admin'}
                {#each adminNavigation as item}
                  <a
                    href={item.href}
                    class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors
                      {$page.url.pathname.startsWith(item.href)
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
                  >
                    {item.name}
                  </a>
                {/each}
              {/if}
            </div>
          </div>

          <!-- Right side -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <a
              href="/notifications"
              class="relative p-2 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {#if $unreadNotifications > 0}
                <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              {/if}
            </a>

            <!-- User Menu -->
            <div class="relative">
              <button
                type="button"
                class="flex items-center space-x-3 focus:outline-none"
                on:click={() => mobileMenuOpen = !mobileMenuOpen}
              >
                <img
                  class="h-8 w-8 rounded-full"
                  src={$user?.avatar || `https://ui-avatars.com/api/?name=${$user?.firstName}+${$user?.lastName}`}
                  alt={$user?.firstName}
                />
                <span class="hidden md:block text-sm font-medium text-gray-700">
                  {$user?.firstName} {$user?.lastName}
                </span>
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>

              {#if mobileMenuOpen}
                <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div class="py-1">
                    <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </a>
                    <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <button
                      on:click={handleSignOut}
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Mobile menu button -->
            <button
              type="button"
              class="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              on:click={() => mobileMenuOpen = !mobileMenuOpen}
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      {#if mobileMenuOpen}
        <div class="sm:hidden border-t border-gray-200">
          <div class="pt-2 pb-3 space-y-1">
            {#each navigation as item}
              <a
                href={item.href}
                class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium
                  {$page.url.pathname.startsWith(item.href)
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}"
              >
                {item.name}
                {#if item.badge && item.badge > 0}
                  <span class="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {item.badge}
                  </span>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-gray-500">
          © 2025 OpenChance. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
{/if}

<style>
  /* Click outside to close dropdown */
  :global(body) {
    overflow-x: hidden;
  }
</style>

