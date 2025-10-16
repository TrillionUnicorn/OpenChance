<script lang="ts">
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { page } from '$app/stores';

  let applications: any[] = [];
  let loading = true;
  let filter: 'all' | 'pending' | 'accepted' | 'rejected' = 'all';

  const success = $page.url.searchParams.get('success');

  async function loadApplications() {
    loading = true;
    try {
      applications = await trpc.application.getMy.query({
        status: filter === 'all' ? undefined : filter as any,
      });
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      loading = false;
    }
  }

  function handleFilterChange() {
    loadApplications();
  }

  onMount(() => {
    loadApplications();
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    withdrawn: 'bg-gray-100 text-gray-800',
  };
</script>

<svelte:head>
  <title>My Applications - OpenChance</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold text-gray-900">My Applications</h1>
    <p class="mt-2 text-gray-600">Track all your challenge applications</p>
  </div>

  {#if success}
    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
      <p class="text-sm text-green-800">✓ Application submitted successfully!</p>
    </div>
  {/if}

  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex space-x-2">
      <button
        on:click={() => { filter = 'all'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium {filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        All
      </button>
      <button
        on:click={() => { filter = 'pending'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium {filter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        Pending
      </button>
      <button
        on:click={() => { filter = 'accepted'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium {filter === 'accepted' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        Accepted
      </button>
      <button
        on:click={() => { filter = 'rejected'; handleFilterChange(); }}
        class="px-4 py-2 rounded-md text-sm font-medium {filter === 'rejected' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        Rejected
      </button>
    </div>
  </div>

  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  {:else if applications.length > 0}
    <div class="space-y-4">
      {#each applications as application}
        <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <a href="/challenges/{application.challenge.id}" class="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                {application.challenge.title}
              </a>
              <p class="mt-2 text-gray-600 line-clamp-2">
                {application.coverLetter}
              </p>

              <div class="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Applied {new Date(application.createdAt).toLocaleDateString()}
                </div>
                {#if application.timeline}
                  <div class="flex items-center">
                    <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {application.timeline}
                  </div>
                {/if}
              </div>
            </div>

            <div class="ml-6 flex flex-col items-end space-y-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium {statusColors[application.status]}">
                {application.status}
              </span>
              <a
                href="/applications/{application.id}"
                class="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View Details →
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="bg-white rounded-lg shadow p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No applications</h3>
      <p class="mt-1 text-sm text-gray-500">
        {filter === 'all' ? "You haven't applied to any challenges yet." : `No ${filter} applications found.`}
      </p>
      <div class="mt-6">
        <a
          href="/challenges"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Browse Challenges
        </a>
      </div>
    </div>
  {/if}
</div>

