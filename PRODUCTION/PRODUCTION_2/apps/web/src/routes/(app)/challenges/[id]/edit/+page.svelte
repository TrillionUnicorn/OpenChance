<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';

  const challengeId = $page.params.id;
  
  let loading = true;
  let saving = false;
  let error = '';
  let challenge: any = null;

  // Form fields
  let title = '';
  let description = '';
  let category = 'technology';
  let difficulty = 'intermediate';
  let requirements: string[] = [''];
  let skills: string[] = [''];
  let deliverables: string[] = [''];
  let deadline = '';
  let estimatedDuration = '';
  let status: 'draft' | 'open' | 'in-progress' | 'in-review' | 'completed' | 'cancelled' = 'draft';

  onMount(async () => {
    try {
      challenge = await trpc.challenge.getById.query({ id: challengeId });
      
      // Populate form
      title = challenge.title;
      description = challenge.description;
      category = challenge.category;
      difficulty = challenge.difficulty;
      requirements = challenge.requirements || [''];
      skills = challenge.skills || [''];
      deliverables = challenge.deliverables || [''];
      deadline = challenge.deadline ? new Date(challenge.deadline).toISOString().split('T')[0] : '';
      estimatedDuration = challenge.estimatedDuration || '';
      status = challenge.status;

      loading = false;
    } catch (err: any) {
      console.error('Load error:', err);
      error = 'Failed to load challenge';
      loading = false;
    }
  });

  function addField(arr: string[]) {
    arr.push('');
    arr = arr;
  }

  function removeField(arr: string[], index: number) {
    arr.splice(index, 1);
    arr = arr;
  }

  async function handleSubmit() {
    saving = true;
    error = '';

    try {
      const filteredRequirements = requirements.filter(r => r.trim());
      const filteredSkills = skills.filter(s => s.trim());
      const filteredDeliverables = deliverables.filter(d => d.trim());

      await trpc.challenge.update.mutate({
        id: challengeId,
        title,
        description,
        category: category as any,
        difficulty: difficulty as any,
        requirements: filteredRequirements,
        skills: filteredSkills,
        deliverables: filteredDeliverables,
        deadline: deadline ? new Date(deadline) : undefined,
        estimatedDuration: estimatedDuration || undefined,
        status,
      });

      goto(`/challenges/${challengeId}`);
    } catch (err: any) {
      console.error('Update error:', err);
      error = err.message || 'Failed to update challenge';
      saving = false;
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this challenge? This action cannot be undone.')) {
      return;
    }

    try {
      await trpc.challenge.delete.mutate({ id: challengeId });
      goto('/challenges');
    } catch (err: any) {
      console.error('Delete error:', err);
      error = err.message || 'Failed to delete challenge';
    }
  }
</script>

<svelte:head>
  <title>Edit Challenge - OpenChance</title>
</svelte:head>

{#if loading}
  <div class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
{:else}
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Edit Challenge</h1>
      <p class="mt-2 text-gray-600">Update your challenge details</p>
    </div>

    {#if error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-sm text-red-800">{error}</p>
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div class="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            bind:value={title}
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            bind:value={description}
            required
            rows="6"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select bind:value={category} class="w-full rounded-md border-gray-300 shadow-sm">
              <option value="technology">Technology</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="sustainability">Sustainability</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="smart-cities">Smart Cities</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select bind:value={difficulty} class="w-full rounded-md border-gray-300 shadow-sm">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 class="text-xl font-semibold">Requirements</h2>
        {#each requirements as requirement, i}
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={requirements[i]}
              class="flex-1 rounded-md border-gray-300 shadow-sm"
            />
            {#if requirements.length > 1}
              <button type="button" on:click={() => removeField(requirements, i)} class="px-3 py-2 text-red-600">
                Remove
              </button>
            {/if}
          </div>
        {/each}
        <button type="button" on:click={() => addField(requirements)} class="text-indigo-600 text-sm font-medium">
          + Add Requirement
        </button>
      </div>

      <div class="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 class="text-xl font-semibold">Skills</h2>
        {#each skills as skill, i}
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={skills[i]}
              class="flex-1 rounded-md border-gray-300 shadow-sm"
            />
            {#if skills.length > 1}
              <button type="button" on:click={() => removeField(skills, i)} class="px-3 py-2 text-red-600">
                Remove
              </button>
            {/if}
          </div>
        {/each}
        <button type="button" on:click={() => addField(skills)} class="text-indigo-600 text-sm font-medium">
          + Add Skill
        </button>
      </div>

      <div class="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 class="text-xl font-semibold">Deliverables</h2>
        {#each deliverables as deliverable, i}
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={deliverables[i]}
              class="flex-1 rounded-md border-gray-300 shadow-sm"
            />
            {#if deliverables.length > 1}
              <button type="button" on:click={() => removeField(deliverables, i)} class="px-3 py-2 text-red-600">
                Remove
              </button>
            {/if}
          </div>
        {/each}
        <button type="button" on:click={() => addField(deliverables)} class="text-indigo-600 text-sm font-medium">
          + Add Deliverable
        </button>
      </div>

      <div class="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 class="text-xl font-semibold">Timeline</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
            <input
              type="date"
              bind:value={deadline}
              class="w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Duration</label>
            <input
              type="text"
              bind:value={estimatedDuration}
              class="w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select bind:value={status} class="w-full rounded-md border-gray-300 shadow-sm">
          <option value="draft">Draft</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="in-review">In Review</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div class="flex justify-between">
        <button
          type="button"
          on:click={handleDelete}
          class="px-6 py-3 border border-red-300 text-base font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
        >
          Delete Challenge
        </button>
        <div class="flex space-x-4">
          <a
            href="/challenges/{challengeId}"
            class="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </a>
          <button
            type="submit"
            disabled={saving}
            class="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  </div>
{/if}

