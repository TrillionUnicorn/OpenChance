<script lang="ts">
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { goto } from '$app/navigation';

  let challenges: any[] = [];
  let loading = true;
  let total = 0;
  let hasMore = false;

  // Filters
  let category = '';
  let difficulty = '';
  let minReward = '';
  let maxReward = '';
  let sortBy: 'newest' | 'reward' | 'deadline' | 'popular' = 'newest';
  let limit = 20;
  let offset = 0;

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'smart-cities', label: 'Smart Cities' },
    { value: 'other', label: 'Other' },
  ];

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
  ];

  async function loadChallenges() {
    loading = true;
    try {
      const result = await trpc.challenge.getAll.query({
        category: category || undefined,
        difficulty: difficulty as any || undefined,
        minReward: minReward ? parseInt(minReward) * 100 : undefined,
        maxReward: maxReward ? parseInt(maxReward) * 100 : undefined,
        sortBy,
        limit,
        offset,
      });

      challenges = result.challenges;
      total = result.total;
      hasMore = result.hasMore;
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      loading = false;
    }
  }

  function handleFilterChange() {
    offset = 0;
    loadChallenges();
  }

  function loadMore() {
    offset += limit;
    loadChallenges();
  }

  onMount(() => {
    loadChallenges();
  });
</script>

<svelte:head>
  <title>Browse Challenges - OpenChance</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Browse Challenges</h1>
      <p class="mt-2 text-gray-600">
        Discover opportunities to solve problems and earn rewards
      </p>
    </div>
    <a
      href="/challenges/create"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
    >
      <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Post Challenge
    </a>
  </div>

  <!-- Filters -->
  <div class="bg-white rounded-lg shadow p-6">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          bind:value={category}
          on:change={handleFilterChange}
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {#each categories as cat}
            <option value={cat.value}>{cat.label}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
        <select
          bind:value={difficulty}
          on:change={handleFilterChange}
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {#each difficulties as diff}
            <option value={diff.value}>{diff.label}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Min Reward ($)</label>
        <input
          type="number"
          bind:value={minReward}
          on:change={handleFilterChange}
          placeholder="0"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Max Reward ($)</label>
        <input
          type="number"
          bind:value={maxReward}
          on:change={handleFilterChange}
          placeholder="Any"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          bind:value={sortBy}
          on:change={handleFilterChange}
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="newest">Newest</option>
          <option value="reward">Highest Reward</option>
          <option value="deadline">Deadline</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Results Count -->
  <div class="flex justify-between items-center">
    <p class="text-sm text-gray-700">
      Showing <span class="font-medium">{challenges.length}</span> of <span class="font-medium">{total}</span> challenges
    </p>
  </div>

  <!-- Challenge List -->
  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  {:else if challenges.length > 0}
    <div class="grid grid-cols-1 gap-6">
      {#each challenges as challenge}
        <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <a href="/challenges/{challenge.id}" class="group">
                  <h3 class="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {challenge.title}
                  </h3>
                </a>
                <p class="mt-2 text-gray-600 line-clamp-2">
                  {challenge.description}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {challenge.category}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {challenge.difficulty}
                  </span>
                  {#if challenge.deadline}
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                    </span>
                  {/if}
                </div>

                <div class="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                  <div class="flex items-center">
                    <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {challenge.applicants} applicants
                  </div>
                  <div class="flex items-center">
                    <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {challenge.views} views
                  </div>
                  <div class="flex items-center">
                    <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Posted {new Date(challenge.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div class="ml-6 flex flex-col items-end">
                <div class="text-2xl font-bold text-indigo-600">
                  ${(challenge.rewardAmount / 100).toLocaleString()}
                </div>
                <div class="text-sm text-gray-500">Reward</div>
                <a
                  href="/challenges/{challenge.id}"
                  class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Load More -->
    {#if hasMore}
      <div class="flex justify-center">
        <button
          on:click={loadMore}
          class="px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Load More
        </button>
      </div>
    {/if}
  {:else}
    <div class="bg-white rounded-lg shadow p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No challenges found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your filters or check back later.</p>
      <div class="mt-6">
        <a
          href="/challenges/create"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Post the first challenge
        </a>
      </div>
    </div>
  {/if}
</div>

