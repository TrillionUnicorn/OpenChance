<script lang="ts">
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { goto } from '$app/navigation';

  let stats: any = null;
  let metrics: any = null;
  let flaggedReviews: any[] = [];
  let loading = true;
  let user: any = null;

  onMount(async () => {
    try {
      const session = await trpc.auth.getSession.query();
      user = session.user;

      if (user.role !== 'admin') {
        goto('/dashboard');
        return;
      }

      stats = await trpc.admin.getStats.query();
      metrics = await trpc.admin.getDashboardMetrics.query();
      flaggedReviews = await trpc.admin.getFlaggedReviews.query();

      loading = false;
    } catch (error) {
      console.error('Error loading admin data:', error);
      loading = false;
    }
  });

  async function handleModerateReview(reviewId: string, status: 'approved' | 'rejected' | 'hidden') {
    try {
      await trpc.admin.moderateReview.mutate({ reviewId, status });
      flaggedReviews = flaggedReviews.filter(r => r.id !== reviewId);
    } catch (error) {
      console.error('Error moderating review:', error);
    }
  }
</script>

<svelte:head>
  <title>Admin Dashboard - OpenChance</title>
</svelte:head>

{#if loading}
  <div class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
{:else if user?.role === 'admin'}
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <p class="mt-2 text-gray-600">Platform management and moderation</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-500">Total Users</p>
            <p class="text-2xl font-semibold text-gray-900">{stats?.totalUsers || 0}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-500">Total Challenges</p>
            <p class="text-2xl font-semibold text-gray-900">{stats?.totalChallenges || 0}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-500">Total Revenue</p>
            <p class="text-2xl font-semibold text-gray-900">${((stats?.totalRevenue || 0) / 100).toFixed(0)}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-5">
            <p class="text-sm font-medium text-gray-500">Active Users</p>
            <p class="text-2xl font-semibold text-gray-900">{metrics?.activeUsers || 0}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Platform Stats</h2>
        <dl class="space-y-4">
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Open Challenges</dt>
            <dd class="text-sm font-medium text-gray-900">{metrics?.openChallenges || 0}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Pending Applications</dt>
            <dd class="text-sm font-medium text-gray-900">{metrics?.pendingApplications || 0}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Monthly Revenue</dt>
            <dd class="text-sm font-medium text-gray-900">${((metrics?.monthlyRevenue || 0) / 100).toFixed(0)}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">New Users (30d)</dt>
            <dd class="text-sm font-medium text-gray-900">{stats?.newUsersLast30Days || 0}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">New Challenges (30d)</dt>
            <dd class="text-sm font-medium text-gray-900">{stats?.newChallengesLast30Days || 0}</dd>
          </div>
        </dl>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div class="space-y-3">
          <a
            href="/admin/users"
            class="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">Manage Users</span>
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          <a
            href="/admin/challenges"
            class="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">Moderate Challenges</span>
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          <a
            href="/admin/reports"
            class="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">View Reports</span>
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Flagged Reviews -->
    {#if flaggedReviews.length > 0}
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Flagged Reviews ({flaggedReviews.length})</h2>
        <div class="space-y-4">
          {#each flaggedReviews as review}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-gray-900">
                      {review.reviewer.firstName} {review.reviewer.lastName}
                    </span>
                    <span class="text-sm text-gray-500">→</span>
                    <span class="text-sm font-medium text-gray-900">
                      {review.reviewee.firstName} {review.reviewee.lastName}
                    </span>
                  </div>
                  <p class="mt-2 text-sm text-gray-700">{review.comment}</p>
                  <p class="mt-1 text-xs text-gray-500">Reason: {review.flagReason}</p>
                </div>
                <div class="ml-4 flex space-x-2">
                  <button
                    on:click={() => handleModerateReview(review.id, 'approved')}
                    class="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    on:click={() => handleModerateReview(review.id, 'hidden')}
                    class="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Hide
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{:else}
  <div class="text-center py-12">
    <p class="text-gray-600">Access denied. Admin only.</p>
  </div>
{/if}

