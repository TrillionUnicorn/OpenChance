<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';

  const challengeId = $page.params.id;
  
  let challenge: any = null;
  let loading = true;
  let submitting = false;
  let error = '';

  let coverLetter = '';
  let proposedSolution = '';
  let timeline = '';
  let portfolio: { name: string; url: string }[] = [{ name: '', url: '' }];

  onMount(async () => {
    try {
      challenge = await trpc.challenge.getById.query({ id: challengeId });
      loading = false;
    } catch (err: any) {
      error = 'Failed to load challenge';
      loading = false;
    }
  });

  function addPortfolioItem() {
    portfolio = [...portfolio, { name: '', url: '' }];
  }

  function removePortfolioItem(index: number) {
    portfolio = portfolio.filter((_, i) => i !== index);
  }

  async function handleSubmit() {
    submitting = true;
    error = '';

    try {
      if (!coverLetter || !proposedSolution) {
        throw new Error('Cover letter and proposed solution are required');
      }

      const filteredPortfolio = portfolio.filter(p => p.name && p.url);

      await trpc.application.submit.mutate({
        challengeId,
        coverLetter,
        proposedSolution,
        timeline: timeline || undefined,
        portfolio: filteredPortfolio.length > 0 ? filteredPortfolio : undefined,
      });

      goto(`/applications?success=true`);
    } catch (err: any) {
      error = err.message || 'Failed to submit application';
      submitting = false;
    }
  }
</script>

<svelte:head>
  <title>Apply to Challenge - OpenChance</title>
</svelte:head>

{#if loading}
  <div class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
{:else if challenge}
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <a href="/challenges/{challengeId}" class="text-sm text-gray-500 hover:text-gray-700">
        ← Back to challenge
      </a>
      <h1 class="mt-4 text-3xl font-bold text-gray-900">Apply to Challenge</h1>
      <p class="mt-2 text-gray-600">{challenge.title}</p>
    </div>

    {#if error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-sm text-red-800">{error}</p>
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div class="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter *
          </label>
          <textarea
            bind:value={coverLetter}
            required
            rows="6"
            placeholder="Introduce yourself and explain why you're the best fit for this challenge..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
          <p class="mt-1 text-sm text-gray-500">Tell the challenger about your background and experience</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Proposed Solution *
          </label>
          <textarea
            bind:value={proposedSolution}
            required
            rows="8"
            placeholder="Describe your approach to solving this challenge..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
          <p class="mt-1 text-sm text-gray-500">Explain your methodology and how you plan to deliver results</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Estimated Timeline
          </label>
          <input
            type="text"
            bind:value={timeline}
            placeholder="e.g., 2-3 weeks"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <p class="mt-1 text-sm text-gray-500">How long will it take you to complete this challenge?</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900">Portfolio / Previous Work</h2>
          <button
            type="button"
            on:click={addPortfolioItem}
            class="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            + Add Item
          </button>
        </div>

        {#each portfolio as item, i}
          <div class="grid grid-cols-2 gap-4">
            <input
              type="text"
              bind:value={portfolio[i].name}
              placeholder="Project name"
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <div class="flex gap-2">
              <input
                type="url"
                bind:value={portfolio[i].url}
                placeholder="https://..."
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {#if portfolio.length > 1}
                <button
                  type="button"
                  on:click={() => removePortfolioItem(i)}
                  class="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div class="text-sm text-blue-800">
            <p class="font-medium">Application Tips:</p>
            <ul class="mt-2 list-disc list-inside space-y-1">
              <li>Be specific about your approach and methodology</li>
              <li>Highlight relevant experience and skills</li>
              <li>Include links to similar work you've done</li>
              <li>Be realistic about timelines</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <a
          href="/challenges/{challengeId}"
          class="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={submitting}
          class="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  </div>
{:else}
  <div class="text-center py-12">
    <p class="text-gray-600">Challenge not found</p>
  </div>
{/if}

