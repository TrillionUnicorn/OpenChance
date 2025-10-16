<script lang="ts">
  import { goto } from '$app/navigation';
  import { trpc } from '$lib/trpc/client';

  let loading = false;
  let error = '';

  // Form fields
  let title = '';
  let description = '';
  let category = 'technology';
  let difficulty = 'intermediate';
  let requirements: string[] = [''];
  let skills: string[] = [''];
  let deliverables: string[] = [''];
  let rewardType: 'fixed' | 'range' | 'milestone' = 'fixed';
  let rewardAmount = '';
  let rewardMin = '';
  let rewardMax = '';
  let deadline = '';
  let estimatedDuration = '';
  let visibility: 'public' | 'private' | 'invite-only' = 'public';
  let tags: string[] = [''];
  let status: 'draft' | 'open' = 'draft';

  function addField(arr: string[]) {
    arr.push('');
    arr = arr;
  }

  function removeField(arr: string[], index: number) {
    arr.splice(index, 1);
    arr = arr;
  }

  async function handleSubmit() {
    loading = true;
    error = '';

    try {
      // Validate
      if (!title || !description) {
        throw new Error('Title and description are required');
      }

      if (rewardType === 'fixed' && !rewardAmount) {
        throw new Error('Reward amount is required');
      }

      if (rewardType === 'range' && (!rewardMin || !rewardMax)) {
        throw new Error('Reward range is required');
      }

      // Filter empty values
      const filteredRequirements = requirements.filter(r => r.trim());
      const filteredSkills = skills.filter(s => s.trim());
      const filteredDeliverables = deliverables.filter(d => d.trim());
      const filteredTags = tags.filter(t => t.trim());

      // Create challenge
      const challenge = await trpc.challenge.create.mutate({
        title,
        description,
        category: category as any,
        difficulty: difficulty as any,
        requirements: filteredRequirements,
        skills: filteredSkills,
        deliverables: filteredDeliverables,
        rewardType,
        rewardAmount: rewardType === 'fixed' ? parseInt(rewardAmount) * 100 : undefined,
        rewardMin: rewardType === 'range' ? parseInt(rewardMin) * 100 : undefined,
        rewardMax: rewardType === 'range' ? parseInt(rewardMax) * 100 : undefined,
        deadline: deadline ? new Date(deadline) : undefined,
        estimatedDuration: estimatedDuration || undefined,
        visibility,
        tags: filteredTags,
        status,
      });

      // Redirect to challenge page
      goto(`/challenges/${challenge.id}`);
    } catch (err: any) {
      console.error('Create challenge error:', err);
      error = err.message || 'Failed to create challenge';
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Create Challenge - OpenChance</title>
</svelte:head>

<div class="max-w-4xl mx-auto space-y-6">
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Create New Challenge</h1>
    <p class="mt-2 text-gray-600">Post a challenge and find the best solvers</p>
  </div>

  {#if error}
    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-sm text-red-800">{error}</p>
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <!-- Basic Info -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 class="text-xl font-semibold text-gray-900">Basic Information</h2>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Challenge Title *
        </label>
        <input
          type="text"
          bind:value={title}
          required
          placeholder="e.g., Build a mobile app for sustainable transportation"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          bind:value={description}
          required
          rows="6"
          placeholder="Describe your challenge in detail..."
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select bind:value={category} class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
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
          <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
          <select bind:value={difficulty} class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Requirements -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 class="text-xl font-semibold text-gray-900">Requirements</h2>
      {#each requirements as requirement, i}
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={requirements[i]}
            placeholder="e.g., Must have experience with React"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {#if requirements.length > 1}
            <button type="button" on:click={() => removeField(requirements, i)} class="px-3 py-2 text-red-600 hover:text-red-700">
              Remove
            </button>
          {/if}
        </div>
      {/each}
      <button type="button" on:click={() => addField(requirements)} class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        + Add Requirement
      </button>
    </div>

    <!-- Skills -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 class="text-xl font-semibold text-gray-900">Required Skills</h2>
      {#each skills as skill, i}
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={skills[i]}
            placeholder="e.g., JavaScript, React, Node.js"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {#if skills.length > 1}
            <button type="button" on:click={() => removeField(skills, i)} class="px-3 py-2 text-red-600 hover:text-red-700">
              Remove
            </button>
          {/if}
        </div>
      {/each}
      <button type="button" on:click={() => addField(skills)} class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        + Add Skill
      </button>
    </div>

    <!-- Deliverables -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 class="text-xl font-semibold text-gray-900">Deliverables</h2>
      {#each deliverables as deliverable, i}
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={deliverables[i]}
            placeholder="e.g., Working prototype with source code"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {#if deliverables.length > 1}
            <button type="button" on:click={() => removeField(deliverables, i)} class="px-3 py-2 text-red-600 hover:text-red-700">
              Remove
            </button>
          {/if}
        </div>
      {/each}
      <button type="button" on:click={() => addField(deliverables)} class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        + Add Deliverable
      </button>
    </div>

    <!-- Reward -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 class="text-xl font-semibold text-gray-900">Reward</h2>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Reward Type *</label>
        <select bind:value={rewardType} class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option value="fixed">Fixed Amount</option>
          <option value="range">Range</option>
          <option value="milestone">Milestone-based</option>
        </select>
      </div>

      {#if rewardType === 'fixed'}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Amount ($) *</label>
          <input
            type="number"
            bind:value={rewardAmount}
            required
            min="1"
            placeholder="5000"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      {:else if rewardType === 'range'}
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Min ($) *</label>
            <input
              type="number"
              bind:value={rewardMin}
              required
              min="1"
              placeholder="3000"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Max ($) *</label>
            <input
              type="number"
              bind:value={rewardMax}
              required
              min="1"
              placeholder="7000"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      {/if}
    </div>

    <!-- Timeline -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 class="text-xl font-semibold text-gray-900">Timeline</h2>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
          <input
            type="date"
            bind:value={deadline}
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Duration</label>
          <input
            type="text"
            bind:value={estimatedDuration}
            placeholder="e.g., 2-3 months"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>

    <!-- Settings -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 class="text-xl font-semibold text-gray-900">Settings</h2>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
        <select bind:value={visibility} class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option value="public">Public - Anyone can see and apply</option>
          <option value="private">Private - Only you can see</option>
          <option value="invite-only">Invite Only - Only invited solvers</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select bind:value={status} class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option value="draft">Draft - Save for later</option>
          <option value="open">Open - Publish immediately</option>
        </select>
      </div>
    </div>

    <!-- Tags -->
    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 class="text-xl font-semibold text-gray-900">Tags</h2>
      {#each tags as tag, i}
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={tags[i]}
            placeholder="e.g., mobile, sustainability, innovation"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {#if tags.length > 1}
            <button type="button" on:click={() => removeField(tags, i)} class="px-3 py-2 text-red-600 hover:text-red-700">
              Remove
            </button>
          {/if}
        </div>
      {/each}
      <button type="button" on:click={() => addField(tags)} class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        + Add Tag
      </button>
    </div>

    <!-- Actions -->
    <div class="flex justify-end space-x-4">
      <a
        href="/challenges"
        class="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
      >
        Cancel
      </a>
      <button
        type="submit"
        disabled={loading}
        class="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Creating...' : status === 'draft' ? 'Save Draft' : 'Publish Challenge'}
      </button>
    </div>
  </form>
</div>

