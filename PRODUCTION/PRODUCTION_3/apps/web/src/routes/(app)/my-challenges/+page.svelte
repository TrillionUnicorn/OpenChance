<script lang="ts">
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { goto } from '$app/navigation';

  let challenges: any[] = [];
  let loading = true;
  let filter: 'all' | 'draft' | 'open' | 'in-progress' | 'completed' = 'all';

  async function loadChallenges() {
    loading = true;
    try {
      const result = await trpc.challenge.getAll.query({
        status: filter === 'all' ? undefined : filter as any,
        limit: 100,
      });
      challenges = result.challenges;
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      loading = false;
    }
  }

  function handleFilterChange() {
    loadChallenges();
  }

  onMount(() => {
    loadChallenges();
  });

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    open: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'in-review': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
  };
</script>

<svelte:head>
  <title>My Challenges - OpenChance</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">My Challenges</h1>
      <p class="mt-2 text-gray-600">Manage all your posted challenges</p>
    </div>
    <a
      href="/challenges/create"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
      <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      New Challenge
    </a>
  </div>

  <!-- Filters -->
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex space-x-2">
      <button
        on:click={() => { filter = 'all'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        All
      </button>
      <button
        on:click={() => { filter = 'draft'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {filter === 'draft' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        Drafts
      </button>
      <button
        on:click={() => { filter = 'open'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {filter === 'open' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        Open
      </button>
      <button
        on:click={() => { filter = 'in-progress'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {filter === 'in-progress' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        In Progress
      </button>
      <button
        on:click={() => { filter = 'completed'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        Completed
      </button>
    </div>
  </div>

  <!-- Challenges List -->
  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  {:else if challenges.length > 0}
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Challenge
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicants
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reward
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each challenges as challenge}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div>
                    <a href="/challenges/{challenge.id}" class="text-sm font-medium text-gray-900 hover:text-indigo-600">
                      {challenge.title}
                    </a>
                    <div class="text-sm text-gray-500">
                      {challenge.category}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {statusColors[challenge.status]}">
                  {challenge.status}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {challenge.applicants}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${(challenge.rewardAmount / 100).toLocaleString()}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(challenge.createdAt).toLocaleDateString()}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <a href="/challenges/{challenge.id}" class="text-indigo-600 hover:text-indigo-900">
                  View
                </a>
                <a href="/challenges/{challenge.id}/edit" class="text-gray-600 hover:text-gray-900">
                  Edit
                </a>
                {#if challenge.applicants > 0}
                  <a href="/challenges/{challenge.id}/applications" class="text-green-600 hover:text-green-900">
                    Applications ({challenge.applicants})
                  </a>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="bg-white rounded-lg shadow p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No challenges</h3>
      <p class="mt-1 text-sm text-gray-500">
        {filter === 'all' ? "You haven't posted any challenges yet." : `No ${filter} challenges found.`}
      </p>
      <div class="mt-6">
        <a
          href="/challenges/create"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create your first challenge
        </a>
      </div>
    </div>
  {/if}
</div>

