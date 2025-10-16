<script lang="ts">
  import { goto } from '$app/navigation';
  import { SignUp } from '@clerk/sveltekit';
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { wsClient } from '$lib/websocket/client';

  let loading = false;
  let error = '';
  let selectedUserType: 'challenger' | 'solver' | 'both' = 'solver';

  onMount(() => {
    // Check if already logged in
    const token = localStorage.getItem('clerk-token');
    if (token) {
      goto('/dashboard');
    }
  });

  async function handleSignUpSuccess(event: CustomEvent) {
    loading = true;
    error = '';

    try {
      const { session } = event.detail;
      const token = await session.getToken();

      // Store token
      localStorage.setItem('clerk-token', token);

      // Register user in our database with selected user type
      const user = await trpc.auth.register.mutate({
        clerkId: session.userId,
        email: session.user.primaryEmailAddress?.emailAddress || '',
        firstName: session.user.firstName || '',
        lastName: session.user.lastName || '',
        username: session.user.username || '',
        avatar: session.user.imageUrl || '',
        userType: selectedUserType,
      });

      // Connect WebSocket
      wsClient.connect(token);

      // Redirect to onboarding or dashboard
      goto('/onboarding');
    } catch (err: any) {
      console.error('Sign up error:', err);
      error = err.message || 'Failed to create account. Please try again.';
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Sign Up - OpenChance</title>
  <meta name="description" content="Create your OpenChance account" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <!-- Header -->
    <div class="text-center">
      <a href="/" class="inline-block">
        <h1 class="text-4xl font-bold text-indigo-600">OpenChance</h1>
      </a>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Join thousands of innovators and problem solvers
      </p>
    </div>

    <!-- User Type Selection -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">I want to:</h3>
      <div class="space-y-3">
        <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-indigo-500 {selectedUserType === 'challenger' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}">
          <input
            type="radio"
            name="userType"
            value="challenger"
            bind:group={selectedUserType}
            class="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <div class="ml-3">
            <div class="text-sm font-medium text-gray-900">Post Challenges</div>
            <div class="text-sm text-gray-500">I have problems that need solving</div>
          </div>
        </label>

        <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-indigo-500 {selectedUserType === 'solver' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}">
          <input
            type="radio"
            name="userType"
            value="solver"
            bind:group={selectedUserType}
            class="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <div class="ml-3">
            <div class="text-sm font-medium text-gray-900">Solve Challenges</div>
            <div class="text-sm text-gray-500">I want to solve problems and earn rewards</div>
          </div>
        </label>

        <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-indigo-500 {selectedUserType === 'both' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}">
          <input
            type="radio"
            name="userType"
            value="both"
            bind:group={selectedUserType}
            class="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <div class="ml-3">
            <div class="text-sm font-medium text-gray-900">Both</div>
            <div class="text-sm text-gray-500">I want to post and solve challenges</div>
          </div>
        </label>
      </div>
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

    <!-- Clerk Sign Up Component -->
    <div class="bg-white rounded-lg shadow-xl p-8">
      {#if loading}
        <div class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      {:else}
        <SignUp
          routing="path"
          path="/register"
          signInUrl="/login"
          afterSignUpUrl="/onboarding"
          on:success={handleSignUpSuccess}
        />
      {/if}
    </div>

    <!-- Footer Links -->
    <div class="text-center">
      <p class="text-sm text-gray-600">
        Already have an account?
        <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </a>
      </p>
      <p class="mt-2 text-sm text-gray-600">
        <a href="/" class="font-medium text-indigo-600 hover:text-indigo-500">
          ← Back to home
        </a>
      </p>
    </div>

    <!-- Trust Indicators -->
    <div class="mt-8 text-center">
      <p class="text-xs text-gray-500 mb-4">Trusted by innovators worldwide</p>
      <div class="flex justify-center items-center space-x-6 text-gray-400">
        <div class="flex items-center">
          <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-xs">Secure</span>
        </div>
        <div class="flex items-center">
          <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
          </svg>
          <span class="text-xs">Escrow Protected</span>
        </div>
        <div class="flex items-center">
          <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span class="text-xs">Community Verified</span>
        </div>
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

