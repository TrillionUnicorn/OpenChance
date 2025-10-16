<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { goto } from '$app/navigation';

  let challenge: any = null;
  let user: any = null;
  let loading = true;
  let isBookmarked = false;
  let showApplicationModal = false;

  const challengeId = $page.params.id;

  onMount(async () => {
    try {
      // Get user session
      const session = await trpc.auth.getSession.query();
      user = session.user;

      // Get challenge details
      challenge = await trpc.challenge.getById.query({ id: challengeId });

      // Check if bookmarked
      // TODO: Implement bookmark check

      loading = false;
    } catch (error) {
      console.error('Error loading challenge:', error);
      loading = false;
    }
  });

  async function handleBookmark() {
    try {
      if (isBookmarked) {
        await trpc.challenge.removeBookmark.mutate({ challengeId });
        isBookmarked = false;
      } else {
        await trpc.challenge.bookmark.mutate({ challengeId });
        isBookmarked = true;
      }
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  }

  function handleApply() {
    if (user.userType === 'challenger') {
      alert('Challengers cannot apply to challenges. Switch to solver mode.');
      return;
    }
    goto(`/challenges/${challengeId}/apply`);
  }
</script>

<svelte:head>
  <title>{challenge?.title || 'Challenge'} - OpenChance</title>
</svelte:head>

{#if loading}
  <div class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
{:else if challenge}
  <div class="space-y-6">
    <!-- Back Button -->
    <a href="/challenges" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
      <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to challenges
    </a>

    <!-- Challenge Header -->
    <div class="bg-white rounded-lg shadow-lg p-8">
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-gray-900">{challenge.title}</h1>
          
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {challenge.category}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {challenge.difficulty}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              {challenge.status === 'open' ? 'bg-green-100 text-green-800' :
               challenge.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
               'bg-gray-100 text-gray-800'}">
              {challenge.status}
            </span>
          </div>

          <div class="mt-6 flex items-center space-x-6 text-sm text-gray-500">
            <div class="flex items-center">
              <img
                class="h-10 w-10 rounded-full"
                src={challenge.challenger.avatar || `https://ui-avatars.com/api/?name=${challenge.challenger.firstName}+${challenge.challenger.lastName}`}
                alt={challenge.challenger.firstName}
              />
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">
                  {challenge.challenger.firstName} {challenge.challenger.lastName}
                </p>
                <p class="text-sm text-gray-500">
                  {challenge.challenger.company || 'Independent'}
                </p>
              </div>
            </div>

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

        <div class="ml-8 flex flex-col items-end space-y-4">
          <div class="text-center">
            <div class="text-4xl font-bold text-indigo-600">
              ${(challenge.rewardAmount / 100).toLocaleString()}
            </div>
            <div class="text-sm text-gray-500">Reward</div>
          </div>

          {#if challenge.status === 'open' && user.id !== challenge.challengerId}
            <button
              on:click={handleApply}
              class="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Apply Now
            </button>
          {/if}

          <button
            on:click={handleBookmark}
            class="w-full px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <svg class="h-5 w-5 mr-2 {isBookmarked ? 'fill-current text-yellow-500' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

          {#if user.id === challenge.challengerId}
            <a
              href="/challenges/{challengeId}/edit"
              class="w-full px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors text-center"
            >
              Edit Challenge
            </a>
          {/if}
        </div>
      </div>
    </div>

    <!-- Challenge Details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Description -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <div class="prose max-w-none text-gray-700">
            {challenge.description}
          </div>
        </div>

        <!-- Requirements -->
        {#if challenge.requirements && challenge.requirements.length > 0}
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <ul class="space-y-2">
              {#each challenge.requirements as requirement}
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-gray-700">{requirement}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Deliverables -->
        {#if challenge.deliverables && challenge.deliverables.length > 0}
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Deliverables</h2>
            <ul class="space-y-2">
              {#each challenge.deliverables as deliverable}
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-gray-700">{deliverable}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Skills -->
        {#if challenge.skills && challenge.skills.length > 0}
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
            <div class="flex flex-wrap gap-2">
              {#each challenge.skills as skill}
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {skill}
                </span>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Challenge Info -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Challenge Info</h2>
          <dl class="space-y-4">
            {#if challenge.deadline}
              <div>
                <dt class="text-sm font-medium text-gray-500">Deadline</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {new Date(challenge.deadline).toLocaleDateString()}
                </dd>
              </div>
            {/if}

            {#if challenge.estimatedDuration}
              <div>
                <dt class="text-sm font-medium text-gray-500">Estimated Duration</dt>
                <dd class="mt-1 text-sm text-gray-900">{challenge.estimatedDuration}</dd>
              </div>
            {/if}

            <div>
              <dt class="text-sm font-medium text-gray-500">Reward Type</dt>
              <dd class="mt-1 text-sm text-gray-900 capitalize">{challenge.rewardType}</dd>
            </div>

            <div>
              <dt class="text-sm font-medium text-gray-500">Status</dt>
              <dd class="mt-1">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  {challenge.status === 'open' ? 'bg-green-100 text-green-800' :
                   challenge.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                   'bg-gray-100 text-gray-800'}">
                  {challenge.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <!-- Tags -->
        {#if challenge.tags && challenge.tags.length > 0}
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
            <div class="flex flex-wrap gap-2">
              {#each challenge.tags as tag}
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  #{tag}
                </span>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <div class="text-center py-12">
    <h2 class="text-2xl font-bold text-gray-900">Challenge not found</h2>
    <p class="mt-2 text-gray-600">The challenge you're looking for doesn't exist.</p>
    <a href="/challenges" class="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
      Browse all challenges
    </a>
  </div>
{/if}

