<script lang="ts">
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';

  let user: any = null;
  let loading = true;
  let saving = false;
  let success = '';
  let error = '';

  // Form fields
  let firstName = '';
  let lastName = '';
  let bio = '';
  let company = '';
  let website = '';
  let location = '';
  let skills: string[] = [''];

  onMount(async () => {
    try {
      const session = await trpc.auth.getSession.query();
      user = session.user;

      firstName = user.firstName || '';
      lastName = user.lastName || '';
      bio = user.bio || '';
      company = user.company || '';
      website = user.website || '';
      location = user.location || '';
      skills = user.skills || [''];

      loading = false;
    } catch (err) {
      error = 'Failed to load settings';
      loading = false;
    }
  });

  function addSkill() {
    skills = [...skills, ''];
  }

  function removeSkill(index: number) {
    skills = skills.filter((_, i) => i !== index);
  }

  async function handleSubmit() {
    saving = true;
    success = '';
    error = '';

    try {
      const filteredSkills = skills.filter(s => s.trim());

      await trpc.user.updateProfile.mutate({
        firstName,
        lastName,
        bio: bio || undefined,
        company: company || undefined,
        website: website || undefined,
        location: location || undefined,
        skills: filteredSkills.length > 0 ? filteredSkills : undefined,
      });

      success = 'Profile updated successfully!';
    } catch (err: any) {
      error = err.message || 'Failed to update profile';
    } finally {
      saving = false;
    }
  }
</script>

<svelte:head>
  <title>Settings - OpenChance</title>
</svelte:head>

{#if loading}
  <div class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
{:else}
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
      <p class="mt-2 text-gray-600">Manage your account settings and preferences</p>
    </div>

    {#if success}
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <p class="text-sm text-green-800">{success}</p>
      </div>
    {/if}

    {#if error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-sm text-red-800">{error}</p>
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <!-- Profile Information -->
      <div class="bg-white rounded-lg shadow p-6 space-y-6">
        <h2 class="text-xl font-semibold text-gray-900">Profile Information</h2>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              bind:value={firstName}
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              bind:value={lastName}
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            bind:value={bio}
            rows="4"
            placeholder="Tell us about yourself..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              bind:value={company}
              placeholder="Your company"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              bind:value={location}
              placeholder="City, Country"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            bind:value={website}
            placeholder="https://..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <!-- Skills -->
      <div class="bg-white rounded-lg shadow p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Skills</h2>
          <button
            type="button"
            on:click={addSkill}
            class="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            + Add Skill
          </button>
        </div>

        {#each skills as skill, i}
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={skills[i]}
              placeholder="e.g., JavaScript, React, Node.js"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {#if skills.length > 1}
              <button
                type="button"
                on:click={() => removeSkill(i)}
                class="px-3 py-2 text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4">
        <a
          href="/profile"
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
    </form>
  </div>
{/if}

