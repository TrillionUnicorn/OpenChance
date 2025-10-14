<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import WhyUs from '$lib/components/sections/WhyUs.svelte';
	import HowItWorks from '$lib/components/sections/HowItWorks.svelte';
	import Pricing from '$lib/components/sections/Pricing.svelte';
	import Waitlist from '$lib/components/sections/Waitlist.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import ChallengeCard from '$lib/components/features/ChallengeCard.svelte';
	import { mockChallenges } from '$lib/data/challenges';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let selectedCategory = $state<string>('all');
	const categories = ['all', 'sustainability', 'healthcare', 'smart-cities', 'business-tech', 'education', 'environment', 'social-impact'];

	const filteredChallenges = $derived(
		selectedCategory === 'all'
			? mockChallenges.slice(0, 6)
			: mockChallenges.filter(c => c.category === selectedCategory).slice(0, 6)
	);

	onMount(() => {
		gsap.from('.challenges-section', {
			opacity: 0,
			y: 30,
			duration: 1,
			ease: 'power3.out'
		});
	});

	function handleApply(challengeId: string) {
		// Navigate to challenge details or show apply modal
		console.log('Applying to challenge:', challengeId);
		// In production, this would navigate to /product/[challengeId] or open a modal
		window.location.href = '#waitlist';
	}
</script>

<svelte:head>
	<title>OpenChance - Global Problem-Solving Hub | Connect Challenges with Solutions</title>
	<meta name="description" content="The world's largest problem-solving community. Connect brilliant minds with real-world challenges. From climate change to healthcare innovation, solve problems through collective intelligence." />
	<meta name="keywords" content="problem solving, innovation, crowdsourcing, challenges, solutions, global community" />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- Why Us Section -->
<WhyUs />

<!-- How It Works Section -->
<HowItWorks />

<!-- Featured Challenges Section -->
<section class="challenges-section py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
				Featured Challenges
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Explore real-world problems waiting to be solved. Earn rewards from $1K to $1M+
			</p>
		</div>

		<!-- Category Filters -->
		<div class="flex flex-wrap justify-center gap-3 mb-12">
			{#each categories as category}
				<button
					onclick={() => selectedCategory = category}
					class="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 {selectedCategory === category
						? 'bg-primary text-white shadow-lg'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
				>
					{category === 'all' ? 'All Categories' : category.replace('-', ' ')}
				</button>
			{/each}
		</div>

		<!-- Challenges Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
			{#each filteredChallenges as challenge (challenge.id)}
				<ChallengeCard {challenge} onApply={handleApply} />
			{/each}
		</div>

		<!-- View All CTA -->
		<div class="text-center">
			<a
				href="/product"
				class="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-200 shadow-lg hover:shadow-xl"
			>
				View All {mockChallenges.length}+ Challenges
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<Pricing />

<!-- Waitlist Section -->
<Waitlist />

<!-- Footer -->
<Footer />

<style>
	:global(.bg-primary) {
		background-color: #0ea5e9;
	}

	:global(.bg-primary-dark) {
		background-color: #0284c7;
	}

	:global(.hover\:bg-primary-dark:hover) {
		background-color: #0284c7;
	}
</style>
