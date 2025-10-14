<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Card from '$lib/components/ui/Card.svelte';
  import { growthProjections, keyMetrics } from '$lib/data/market';

  onMount(() => {
    gsap.from('.business-card', {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    });
  });

  function formatCurrency(value: number): string {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  }
</script>

<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Business Model & Revenue</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Multiple revenue streams with strong unit economics and scalability
      </p>
    </div>

    <!-- Revenue Streams -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <Card class="business-card text-center">
        <div class="text-4xl mb-3">💰</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Platform Fees</h3>
        <div class="text-3xl font-bold text-primary mb-2">15%</div>
        <p class="text-sm text-gray-600">Of challenge rewards</p>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="text-xs text-gray-500">Primary Revenue</div>
        </div>
      </Card>

      <Card class="business-card text-center">
        <div class="text-4xl mb-3">⭐</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Premium Services</h3>
        <div class="text-3xl font-bold text-secondary mb-2">$99-2.9K</div>
        <p class="text-sm text-gray-600">Per month subscription</p>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="text-xs text-gray-500">Recurring Revenue</div>
        </div>
      </Card>

      <Card class="business-card text-center">
        <div class="text-4xl mb-3">🏢</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Enterprise Solutions</h3>
        <div class="text-3xl font-bold text-accent mb-2">Custom</div>
        <p class="text-sm text-gray-600">White-label & integrations</p>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="text-xs text-gray-500">High-Value Contracts</div>
        </div>
      </Card>

      <Card class="business-card text-center">
        <div class="text-4xl mb-3">🎓</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Training & Certification</h3>
        <div class="text-3xl font-bold text-success mb-2">$49</div>
        <p class="text-sm text-gray-600">Per month per user</p>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="text-xs text-gray-500">Solver Development</div>
        </div>
      </Card>
    </div>

    <!-- Growth Projections -->
    <div class="mb-16">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Growth Projections</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each Object.entries(growthProjections) as [year, data]}
          <Card class="business-card">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              {year === 'year1' ? 'Year 1' : year === 'year2' ? 'Year 2' : year === 'year3' ? 'Year 3' : 'Year 5'}
            </h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Challenges:</span>
                <span class="font-semibold">{data.challenges.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Solvers:</span>
                <span class="font-semibold">{data.solvers.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Revenue:</span>
                <span class="font-semibold text-green-600">{formatCurrency(data.revenue)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Rewards:</span>
                <span class="font-semibold">{formatCurrency(data.rewardsDistributed)}</span>
              </div>
            </div>
          </Card>
        {/each}
      </div>
    </div>

    <!-- Unit Economics -->
    <div class="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Unit Economics</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-1">Platform Fee</div>
          <div class="text-2xl font-bold text-gray-900">{(keyMetrics.platformFee * 100).toFixed(0)}%</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-1">Avg Challenge Reward</div>
          <div class="text-2xl font-bold text-gray-900">{formatCurrency(keyMetrics.avgChallengeReward)}</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-1">Success Rate</div>
          <div class="text-2xl font-bold text-green-600">{(keyMetrics.successRate * 100).toFixed(0)}%</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-1">Avg Time to Solution</div>
          <div class="text-2xl font-bold text-gray-900">{keyMetrics.avgTimeToSolution} days</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-1">Solver Retention</div>
          <div class="text-2xl font-bold text-gray-900">{(keyMetrics.solverRetention * 100).toFixed(0)}%</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-1">Challenger Retention</div>
          <div class="text-2xl font-bold text-gray-900">{(keyMetrics.challengerRetention * 100).toFixed(0)}%</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-1">CAC</div>
          <div class="text-2xl font-bold text-gray-900">{formatCurrency(keyMetrics.customerAcquisitionCost)}</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-1">LTV</div>
          <div class="text-2xl font-bold text-green-600">{formatCurrency(keyMetrics.lifetimeValue)}</div>
        </div>
      </div>
      <div class="mt-6 text-center">
        <div class="inline-block bg-white rounded-lg px-6 py-3 shadow-md">
          <span class="text-sm text-gray-600">LTV:CAC Ratio: </span>
          <span class="text-2xl font-bold text-green-600">
            {(keyMetrics.lifetimeValue / keyMetrics.customerAcquisitionCost).toFixed(1)}:1
          </span>
          <span class="text-sm text-gray-600 ml-2">(Excellent)</span>
        </div>
      </div>
    </div>

    <!-- Revenue Model Explanation -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card class="business-card">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">For Solvers (Always Free)</h4>
        <ul class="space-y-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>No platform fees - keep 100% of rewards</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Free access to all challenges</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Free collaboration tools</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✓</span>
            <span>Optional paid training & certification</span>
          </li>
        </ul>
      </Card>

      <Card class="business-card">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">For Challengers</h4>
        <ul class="space-y-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-primary mt-0.5">•</span>
            <span>15% platform fee on successful solutions</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary mt-0.5">•</span>
            <span>Monthly subscriptions for unlimited posting</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary mt-0.5">•</span>
            <span>Premium features: priority matching, analytics</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary mt-0.5">•</span>
            <span>Enterprise: custom pricing & white-label</span>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</section>

<style>
  :global(.text-primary) {
    color: #0ea5e9;
  }
  
  :global(.text-secondary) {
    color: #3b82f6;
  }
  
  :global(.text-accent) {
    color: #06b6d4;
  }
  
  :global(.text-success) {
    color: #10b981;
  }
  
  :global(.from-primary\/5) {
    --tw-gradient-from: rgba(14, 165, 233, 0.05);
  }
  
  :global(.to-secondary\/5) {
    --tw-gradient-to: rgba(59, 130, 246, 0.05);
  }
</style>

