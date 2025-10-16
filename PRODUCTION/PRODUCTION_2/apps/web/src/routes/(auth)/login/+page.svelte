<script lang="ts">
  import { goto } from '$app/navigation';
  import { SignIn } from '@clerk/sveltekit';
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { wsClient } from '$lib/websocket/client';

  let loading = false;
  let error = '';

  onMount(() => {
    // Check if already logged in
    const token = localStorage.getItem('clerk-token');
    if (token) {
      goto('/dashboard');
    }
  });

  async function handleSignInSuccess(event: CustomEvent) {
    loading = true;
    error = '';

    try {
      const { session } = event.detail;
      const token = await session.getToken();

      // Store token
      localStorage.setItem('clerk-token', token);

      // Register/sync user in our database
      const user = await trpc.auth.register.mutate({
        clerkId: session.userId,
        email: session.user.primaryEmailAddress?.emailAddress || '',
        firstName: session.user.firstName || '',
        lastName: session.user.lastName || '',
        username: session.user.username || '',
        avatar: session.user.imageUrl || '',
      });

      // Update last login
      await trpc.auth.updateLastLogin.mutate();

      // Connect WebSocket
      wsClient.connect(token);

      // Redirect to dashboard
      goto('/dashboard');
    } catch (err: any) {
      console.error('Sign in error:', err);
      error = err.message || 'Failed to sign in. Please try again.';
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Sign In - OpenChance</title>
  <meta name="description" content="Sign in to your OpenChance account" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <!-- Header -->
    <div class="text-center">
      <a href="/" class="inline-block">
        <h1 class="text-4xl font-bold text-indigo-600">OpenChance</h1>
      </a>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        Welcome back
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Sign in to your account to continue
      </p>
    </div>

    <!-- Error Message -->
    {#if error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-800">{error}</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Clerk Sign In Component -->
    <div class="bg-white rounded-lg shadow-xl p-8">
      {#if loading}
        <div class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      {:else}
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/register"
          afterSignInUrl="/dashboard"
          on:success={handleSignInSuccess}
        />
      {/if}
    </div>

    <!-- Footer Links -->
    <div class="text-center">
      <p class="text-sm text-gray-600">
        Don't have an account?
        <a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </a>
      </p>
      <p class="mt-2 text-sm text-gray-600">
        <a href="/" class="font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to home
        </a>
      </p>
    </div>

    <!-- Features -->
    <div class="mt-8 grid grid-cols-3 gap-4">
      <div class="text-center">
        <div class="text-2xl mb-2">🚀</div>
        <p class="text-xs text-gray-600">Launch Challenges</p>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-2">💡</div>
        <p class="text-xs text-gray-600">Solve Problems</p>
      </div>
      <div class="text-center">
        <div class="text-2xl mb-2">💰</div>
        <p class="text-xs text-gray-600">Earn Rewards</p>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.cl-rootBox) {
    width: 100%;
  }
  
  :global(.cl-card) {
    box-shadow: none !important;
    border: none !important;
  }
</style>

