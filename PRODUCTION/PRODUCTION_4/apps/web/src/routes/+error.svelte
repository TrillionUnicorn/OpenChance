<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Error - OpenChance</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div class="max-w-md w-full text-center">
    <div class="mb-8">
      <h1 class="text-6xl font-bold text-indigo-600 mb-4">
        {$page.status || 500}
      </h1>
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">
        {$page.status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
      </h2>
      <p class="text-gray-600">
        {$page.error?.message || 'An unexpected error occurred'}
      </p>
    </div>

    <div class="space-y-4">
      <a
        href="/"
        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        Go Home
      </a>
      
      <button
        on:click={() => window.history.back()}
        class="block w-full px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
</div>

