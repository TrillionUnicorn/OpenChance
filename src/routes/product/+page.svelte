<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import ChallengeCard from '$lib/components/features/ChallengeCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Footer from '$lib/components/sections/Footer.svelte';
  import { mockChallenges } from '$lib/data/challenges';
  import type { Challenge, ChallengeCategory, DifficultyLevel } from '$lib/types';

  let searchQuery = $state('');
  let selectedCategory = $state<ChallengeCategory | 'all'>('all');
  let selectedDifficulty = $state<DifficultyLevel | 'all'>('all');
  let sortBy = $state<'newest' | 'reward' | 'deadline' | 'popular'>('newest');
  let viewMode = $state<'grid' | 'list'>('grid');

  const categories: Array<ChallengeCategory | 'all'> = [
    'all',
    'sustainability',
    'healthcare',
    'smart-cities',
    'business-tech',
    'education',
    'environment',
    'social-impact'
  ];

  const difficulties: Array<DifficultyLevel | 'all'> = ['all', 'beginner', 'intermediate', 'advanced', 'expert'];

  const filteredAndSortedChallenges = $derived(() => {
    let filtered = mockChallenges;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === selectedDifficulty);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'reward':
          const aReward = a.reward.amount || a.reward.max || 0;
          const bReward = b.reward.amount || b.reward.max || 0;
          return bReward - aReward;
        case 'deadline':
          return a.deadline.getTime() - b.deadline.getTime();
        case 'popular':
          return b.applicants - a.applicants;
        default:
          return 0;
      }
    });

    return sorted;
  });

  onMount(() => {
    gsap.from('.product-header', {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.filters-section', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    });
  });

  function handleApply(challengeId: string) {
    console.log('Applying to challenge:', challengeId);
    // In production, navigate to challenge detail page or open application modal
    alert(`Application feature coming soon! Challenge ID: ${challengeId}`);
  }

  function getCategoryIcon(category: ChallengeCategory | 'all'): string {
    const icons: Record<ChallengeCategory | 'all', string> = {
      'all': '🌐',
      'sustainability': '🌱',
      'healthcare': '🏥',
      'smart-cities': '🏙️',
      'business-tech': '💼',
      'education': '🎓',
      'environment': '🌍',
      'social-impact': '🤝'
    };
    return icons[category] || '💡';
  }
</script>

<svelte:head>
  <title>Browse Challenges | OpenChance</title>
  <meta name="description" content="Explore 1,000+ active challenges across sustainability, healthcare, technology, and more. Earn rewards from $1K to $1M+ by solving real-world problems." />
</svelte:head>

<!-- Header -->
<div class="product-header bg-gradient-to-br from-primary to-secondary text-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">
        Browse Challenges
      </h1>
      <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
        Discover {mockChallenges.length}+ real-world problems waiting to be solved
      </p>
    </div>

    <!-- Search Bar -->
    <div class="max-w-2xl mx-auto">
      <div class="relative">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search challenges by title, description, or tags..."
          class="w-full px-6 py-4 pr-12 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
        />
        <svg class="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
      <div class="glass-effect rounded-lg p-4 text-center">
        <div class="text-2xl font-bold">{filteredAndSortedChallenges().length}</div>
        <div class="text-sm text-white/80">Matching Challenges</div>
      </div>
      <div class="glass-effect rounded-lg p-4 text-center">
        <div class="text-2xl font-bold">$50M+</div>
        <div class="text-sm text-white/80">Total Rewards</div>
      </div>
      <div class="glass-effect rounded-lg p-4 text-center">
        <div class="text-2xl font-bold">94%</div>
        <div class="text-sm text-white/80">Success Rate</div>
      </div>
      <div class="glass-effect rounded-lg p-4 text-center">
        <div class="text-2xl font-bold">50K+</div>
        <div class="text-sm text-white/80">Active Solvers</div>
      </div>
    </div>
  </div>
</div>

<!-- Main Content -->
<div class="bg-gray-50 min-h-screen py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Filters Section -->
    <div class="filters-section bg-white rounded-xl shadow-md p-6 mb-8">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Category Filter -->
        <div class="flex-1">
          <div class="block text-sm font-semibold text-gray-700 mb-2" role="heading" aria-level="3">Category</div>
          <div class="flex flex-wrap gap-2" role="group" aria-label="Category filters">
            {#each categories as category}
              <button
                onclick={() => selectedCategory = category}
                class="px-3 py-1.5 rounded-full text-sm font-medium transition-all {selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                aria-pressed={selectedCategory === category}
              >
                {getCategoryIcon(category)} {category === 'all' ? 'All' : category.replace('-', ' ')}
              </button>
            {/each}
          </div>
        </div>

        <!-- Difficulty Filter -->
        <div class="w-full lg:w-48">
          <label for="difficulty-select" class="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
          <select
            id="difficulty-select"
            bind:value={selectedDifficulty}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {#each difficulties as difficulty}
              <option value={difficulty}>
                {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            {/each}
          </select>
        </div>

        <!-- Sort By -->
        <div class="w-full lg:w-48">
          <label for="sort-select" class="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
          <select
            id="sort-select"
            bind:value={sortBy}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="reward">Highest Reward</option>
            <option value="deadline">Deadline Soon</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        <!-- View Mode -->
        <div class="w-full lg:w-auto flex items-end gap-2">
          <button
            onclick={() => viewMode = 'grid'}
            class="p-2 rounded-lg {viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            title="Grid View"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
          <button
            onclick={() => viewMode = 'list'}
            class="p-2 rounded-lg {viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            title="List View"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div class="mb-6 flex items-center justify-between">
      <p class="text-gray-600">
        Showing <span class="font-semibold text-gray-900">{filteredAndSortedChallenges().length}</span> challenges
      </p>
      {#if searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all'}
        <button
          onclick={() => {
            searchQuery = '';
            selectedCategory = 'all';
            selectedDifficulty = 'all';
          }}
          class="text-primary hover:text-primary-dark font-medium text-sm"
        >
          Clear Filters
        </button>
      {/if}
    </div>

    <!-- Challenges Grid/List -->
    {#if filteredAndSortedChallenges().length > 0}
      <div class="{viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}">
        {#each filteredAndSortedChallenges() as challenge (challenge.id)}
          <ChallengeCard {challenge} onApply={handleApply} />
        {/each}
      </div>
    {:else}
      <div class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No challenges found</h3>
        <p class="text-gray-600 mb-6">Try adjusting your filters or search query</p>
        <Button
          variant="primary"
          onclick={() => {
            searchQuery = '';
            selectedCategory = 'all';
            selectedDifficulty = 'all';
          }}
        >
          Clear All Filters
        </Button>
      </div>
    {/if}
  </div>
</div>

<Footer />

<style>
  :global(.bg-primary) {
    background-color: #0ea5e9;
  }
  
  :global(.text-primary) {
    color: #0ea5e9;
  }
  
  :global(.text-primary-dark) {
    color: #0284c7;
  }
  
  :global(.focus\:ring-primary:focus) {
    --tw-ring-color: #0ea5e9;
  }
</style>

