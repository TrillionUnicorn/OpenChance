<script lang="ts">
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';

  let user: any = null;
  let stats: any = null;
  let portfolio: any[] = [];
  let reviews: any[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const session = await trpc.auth.getSession.query();
      user = session.user;

      stats = await trpc.user.getStats.query();
      portfolio = await trpc.user.getPortfolio.query();
      
      const reviewsData = await trpc.review.getReviews.query({
        userId: user.id,
      });
      reviews = reviewsData.reviews;

      loading = false;
    } catch (error) {
      console.error('Error loading profile:', error);
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>My Profile - OpenChance</title>
</svelte:head>

{#if loading}
  <div class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
{:else if user}
  <div class="space-y-6">
    <!-- Profile Header -->
    <div class="bg-white rounded-lg shadow p-8">
      <div class="flex items-start space-x-6">
        <img
          class="h-24 w-24 rounded-full"
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=200`}
          alt={user.firstName}
        />
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h1>
          <p class="mt-1 text-gray-600">@{user.username}</p>
          {#if user.bio}
            <p class="mt-4 text-gray-700">{user.bio}</p>
          {/if}

          <div class="mt-4 flex items-center space-x-6">
            <div>
              <span class="text-2xl font-bold text-indigo-600">{stats?.reputationScore || 0}</span>
              <span class="text-sm text-gray-500 ml-1">Reputation</span>
            </div>
            <div>
              <span class="text-2xl font-bold text-gray-900">{stats?.totalChallengesSolved || 0}</span>
              <span class="text-sm text-gray-500 ml-1">Solved</span>
            </div>
            <div>
              <span class="text-2xl font-bold text-gray-900">${((stats?.totalEarnings || 0) / 100).toFixed(0)}</span>
              <span class="text-sm text-gray-500 ml-1">Earned</span>
            </div>
          </div>

          <div class="mt-6">
            <a
              href="/settings"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Edit Profile
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills -->
    {#if user.skills && user.skills.length > 0}
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
        <div class="flex flex-wrap gap-2">
          {#each user.skills as skill}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {skill}
            </span>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Portfolio -->
    {#if portfolio.length > 0}
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Portfolio</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each portfolio as item}
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-medium text-gray-900">{item.title}</h3>
              <p class="mt-1 text-sm text-gray-600">{item.description}</p>
              {#if item.url}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  View Project →
                </a>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Reviews -->
    {#if reviews.length > 0}
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
        <div class="space-y-4">
          {#each reviews as review}
            <div class="border-b border-gray-200 pb-4 last:border-0">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <img
                    class="h-8 w-8 rounded-full"
                    src={review.reviewer.avatar}
                    alt={review.reviewer.firstName}
                  />
                  <span class="text-sm font-medium text-gray-900">
                    {review.reviewer.firstName} {review.reviewer.lastName}
                  </span>
                </div>
                <div class="flex items-center">
                  {#each Array(5) as _, i}
                    <svg
                      class="h-5 w-5 {i < review.rating ? 'text-yellow-400' : 'text-gray-300'}"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  {/each}
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-700">{review.comment}</p>
              <p class="mt-1 text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/if}

