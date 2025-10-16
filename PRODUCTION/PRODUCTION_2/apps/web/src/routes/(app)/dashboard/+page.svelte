<script lang="ts">
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { goto } from '$app/navigation';

  let user: any = null;
  let stats: any = null;
  let recentChallenges: any[] = [];
  let recentApplications: any[] = [];
  let loading = true;

  onMount(async () => {
    try {
      // Get user session
      const session = await trpc.auth.getSession.query();
      user = session.user;

      // Get user stats
      stats = await trpc.user.getStats.query();

      // Get recent challenges based on user type
      if (user.userType === 'challenger' || user.userType === 'both') {
        const challenges = await trpc.challenge.getAll.query({
          limit: 5,
          sortBy: 'newest',
        });
        recentChallenges = challenges.challenges;
      }

      // Get recent applications
      if (user.userType === 'solver' || user.userType === 'both') {
        recentApplications = await trpc.application.getMy.query({});
      }

      loading = false;
    } catch (error) {
      console.error('Dashboard error:', error);
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Dashboard - OpenChance</title>
</svelte:head>

{#if loading}
  <div class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
{:else if user}
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
      <h1 class="text-3xl font-bold">
        Welcome back, {user.firstName}! 👋
      </h1>
      <p class="mt-2 text-indigo-100">
        {#if user.userType === 'challenger'}
          Manage your challenges and find the best solvers
        {:else if user.userType === 'solver'}
          Discover new challenges and grow your portfolio
        {:else}
          Post challenges and solve problems to earn rewards
        {/if}
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#if user.userType === 'challenger' || user.userType === 'both'}
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Challenges Posted
                </dt>
                <dd class="text-2xl font-semibold text-gray-900">
                  {stats?.totalChallengesPosted || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      {/if}

      {#if user.userType === 'solver' || user.userType === 'both'}
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Challenges Solved
                </dt>
                <dd class="text-2xl font-semibold text-gray-900">
                  {stats?.totalChallengesSolved || 0}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Total Earnings
                </dt>
                <dd class="text-2xl font-semibold text-gray-900">
                  ${((stats?.totalEarnings || 0) / 100).toFixed(2)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      {/if}

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Reputation Score
              </dt>
              <dd class="text-2xl font-semibold text-gray-900">
                {stats?.reputationScore || 0}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#if user.userType === 'challenger' || user.userType === 'both'}
          <button
            on:click={() => goto('/challenges/create')}
            class="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Post New Challenge
          </button>
        {/if}

        <button
          on:click={() => goto('/challenges')}
          class="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Browse Challenges
        </button>

        <button
          on:click={() => goto('/messages')}
          class="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          View Messages
        </button>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#if user.userType === 'challenger' || user.userType === 'both'}
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Recent Challenges</h2>
          </div>
          <div class="divide-y divide-gray-200">
            {#if recentChallenges.length > 0}
              {#each recentChallenges.slice(0, 5) as challenge}
                <a
                  href="/challenges/{challenge.id}"
                  class="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {challenge.title}
                      </p>
                      <p class="text-sm text-gray-500">
                        {challenge.applicants} applicants
                      </p>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        {challenge.status === 'open' ? 'bg-green-100 text-green-800' :
                         challenge.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                         'bg-gray-100 text-gray-800'}">
                        {challenge.status}
                      </span>
                    </div>
                  </div>
                </a>
              {/each}
            {:else}
              <div class="px-6 py-8 text-center text-gray-500">
                <p>No challenges yet</p>
                <button
                  on:click={() => goto('/challenges/create')}
                  class="mt-2 text-indigo-600 hover:text-indigo-500"
                >
                  Create your first challenge
                </button>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      {#if user.userType === 'solver' || user.userType === 'both'}
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">My Applications</h2>
          </div>
          <div class="divide-y divide-gray-200">
            {#if recentApplications.length > 0}
              {#each recentApplications.slice(0, 5) as application}
                <a
                  href="/applications/{application.id}"
                  class="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {application.challenge.title}
                      </p>
                      <p class="text-sm text-gray-500">
                        Applied {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        {application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                         application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                         application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                         'bg-gray-100 text-gray-800'}">
                        {application.status}
                      </span>
                    </div>
                  </div>
                </a>
              {/each}
            {:else}
              <div class="px-6 py-8 text-center text-gray-500">
                <p>No applications yet</p>
                <button
                  on:click={() => goto('/challenges')}
                  class="mt-2 text-indigo-600 hover:text-indigo-500"
                >
                  Browse challenges
                </button>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

