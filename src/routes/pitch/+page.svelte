<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import MarketAnalysis from '$lib/components/pitch/MarketAnalysis.svelte';
  import CompetitiveAnalysis from '$lib/components/pitch/CompetitiveAnalysis.svelte';
  import BusinessModel from '$lib/components/pitch/BusinessModel.svelte';
  import Footer from '$lib/components/sections/Footer.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';

  onMount(() => {
    gsap.from('.pitch-hero', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    });
  });
</script>

<svelte:head>
  <title>Pitch Deck | OpenChance - Investor Presentation</title>
  <meta name="description" content="OpenChance investor pitch deck. Market analysis, competitive landscape, business model, and growth projections for the world's largest problem-solving platform." />
</svelte:head>

<!-- Hero Section -->
<div class="pitch-hero bg-gradient-to-br from-primary to-secondary text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <div class="text-6xl mb-6">🌍</div>
      <h1 class="text-5xl md:text-7xl font-bold mb-6">
        OpenChance
      </h1>
      <p class="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
        The World's Largest Problem-Solving Community
      </p>
      <p class="text-xl text-white/80 max-w-3xl mx-auto mb-8">
        Connecting brilliant minds with real-world challenges to solve the world's biggest problems through collective intelligence
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button variant="secondary" size="lg" href="#market">
          View Full Deck
        </Button>
        <Button variant="outline" size="lg" href="/contact" class="bg-white/10 text-white border-white hover:bg-white hover:text-primary">
          Contact Us
        </Button>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div class="glass-effect rounded-xl p-6">
          <div class="text-4xl font-bold mb-1">$520B</div>
          <div class="text-sm text-white/80">Total Addressable Market</div>
        </div>
        <div class="glass-effect rounded-xl p-6">
          <div class="text-4xl font-bold mb-1">$26B</div>
          <div class="text-sm text-white/80">Serviceable Market</div>
        </div>
        <div class="glass-effect rounded-xl p-6">
          <div class="text-4xl font-bold mb-1">94%</div>
          <div class="text-sm text-white/80">Success Rate</div>
        </div>
        <div class="glass-effect rounded-xl p-6">
          <div class="text-4xl font-bold mb-1">10:1</div>
          <div class="text-sm text-white/80">LTV:CAC Ratio</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Problem Statement -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">The Problem</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Organizations struggle to solve complex problems with limited internal resources
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="text-center">
        <div class="text-5xl mb-4">🏢</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">89%</h3>
        <p class="text-gray-600">Organizations can't solve complex problems internally</p>
      </Card>

      <Card class="text-center">
        <div class="text-5xl mb-4">💰</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">$100B+</h3>
        <p class="text-gray-600">Spent annually on consulting with limited success</p>
      </Card>

      <Card class="text-center">
        <div class="text-5xl mb-4">⏰</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">6-18 Months</h3>
        <p class="text-gray-600">Traditional problem-solving timeline</p>
      </Card>

      <Card class="text-center">
        <div class="text-5xl mb-4">🔄</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">73%</h3>
        <p class="text-gray-600">Innovations come from outside the industry</p>
      </Card>
    </div>
  </div>
</section>

<!-- Solution -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Solution</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        A global marketplace connecting challenges with the world's brightest problem solvers
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card>
        <div class="text-5xl mb-4">🌐</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Global Network</h3>
        <p class="text-gray-600 mb-4">
          Access 50,000+ expert solvers across all industries and disciplines, bringing diverse perspectives to every challenge.
        </p>
        <ul class="space-y-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Verified expertise and track records</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Cross-industry innovation</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Global reach, local expertise</span>
          </li>
        </ul>
      </Card>

      <Card>
        <div class="text-5xl mb-4">🤖</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
        <p class="text-gray-600 mb-4">
          Proprietary algorithm matches challenges with optimal solvers based on expertise, success rate, and availability.
        </p>
        <ul class="space-y-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>94% challenge success rate</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Intelligent team formation</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Continuous learning & improvement</span>
          </li>
        </ul>
      </Card>

      <Card>
        <div class="text-5xl mb-4">⚡</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Fast & Cost-Effective</h3>
        <p class="text-gray-600 mb-4">
          Get solutions in 30-90 days at 85% lower cost than traditional consulting, with pay-for-success model.
        </p>
        <ul class="space-y-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>3x faster than traditional methods</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Pay only for successful solutions</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Transparent pricing & escrow</span>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</section>

<!-- Market Analysis -->
<div id="market">
  <MarketAnalysis />
</div>

<!-- Competitive Analysis -->
<CompetitiveAnalysis />

<!-- Business Model -->
<BusinessModel />

<!-- Roadmap -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Roadmap & Milestones</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Our path to becoming the world's leading problem-solving platform
      </p>
    </div>

    <div class="space-y-8">
      {#each [
        { phase: 'Q4 2024 - Q1 2025', title: 'Foundation & Community', goals: ['Launch production platform', '1,000+ active challenges', '10,000+ problem solvers', '$420K ARR target'] },
        { phase: 'Q2 2025', title: 'Intelligence & Scale', goals: ['Advanced AI matching', '10,000+ challenges', '50,000+ solvers', '$7.1M ARR target'] },
        { phase: 'Q3 2025', title: 'Enterprise & Innovation', goals: ['Enterprise solutions', '50,000+ challenges', '250,000+ solvers', '$59.9M ARR target'] },
        { phase: 'Q4 2025+', title: 'Global Impact & Leadership', goals: ['Market leadership', '500,000+ challenges', '2.5M+ solvers', '$599M ARR target'] }
      ] as milestone}
        <Card class="flex flex-col md:flex-row gap-6">
          <div class="md:w-48 flex-shrink-0">
            <div class="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-center">
              {milestone.phase}
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
              {#each milestone.goals as goal}
                <li class="flex items-start gap-2 text-gray-700">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{goal}</span>
                </li>
              {/each}
            </ul>
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>

<!-- Team -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">The Team</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Experienced innovators building the future of problem-solving
      </p>
    </div>

    <div class="max-w-2xl mx-auto">
      <Card class="text-center">
        <div class="text-6xl mb-4">👨‍💻</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Hunter Ho</h3>
        <p class="text-lg text-primary font-semibold mb-4">Founder & CEO</p>
        <p class="text-gray-600 mb-6">
          Former innovation consultant with 50+ successful projects and 8+ years connecting problems with solutions. 
          Passionate about democratizing access to global expertise and solving the world's biggest challenges.
        </p>
        <div class="flex justify-center gap-4">
          <a href="https://github.com/HunterHo07" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-primary">
            GitHub
          </a>
          <a href="https://hunterho07.github.io/Portfolio_1/" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-primary">
            Portfolio
          </a>
          <a href="https://linkedin.com/in/hunterho" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-primary">
            LinkedIn
          </a>
        </div>
      </Card>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-16 bg-gradient-to-br from-primary to-secondary text-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl font-bold mb-4">Ready to Join Us?</h2>
    <p class="text-xl text-white/90 mb-8">
      Let's solve the world's biggest challenges together
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button variant="secondary" size="lg" href="/contact">
        Contact for Investment
      </Button>
      <Button variant="outline" size="lg" href="/#waitlist" class="bg-white/10 text-white border-white hover:bg-white hover:text-primary">
        Join the Platform
      </Button>
    </div>
  </div>
</section>

<Footer />

<style>
  :global(.bg-primary) {
    background-color: #0ea5e9;
  }
  
  :global(.text-primary) {
    color: #0ea5e9;
  }
  
  :global(.hover\:text-primary:hover) {
    color: #0ea5e9;
  }
</style>

