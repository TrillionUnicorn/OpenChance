<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { competitors } from '$lib/data/market';

  onMount(() => {
    gsap.from('.competitor-card', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  });
</script>

<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Competitive Landscape</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        How OpenChance stands out in the problem-solving and innovation market
      </p>
    </div>

    <!-- Competitive Advantages Summary -->
    <div class="mb-12 bg-white rounded-xl p-8 shadow-lg">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Our Competitive Advantages</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-4xl mb-2">🤖</div>
          <h4 class="font-semibold text-gray-900 mb-1">AI-Powered Matching</h4>
          <p class="text-sm text-gray-600">Proprietary algorithm with 94% success rate</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-2">⚡</div>
          <h4 class="font-semibold text-gray-900 mb-1">3x Faster</h4>
          <p class="text-sm text-gray-600">30-90 days vs 6-18 months traditional</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-2">💰</div>
          <h4 class="font-semibold text-gray-900 mb-1">85% Cost Savings</h4>
          <p class="text-sm text-gray-600">Compared to traditional consulting</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-2">🌍</div>
          <h4 class="font-semibold text-gray-900 mb-1">Global Network</h4>
          <p class="text-sm text-gray-600">50K+ solvers across all industries</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-2">🔒</div>
          <h4 class="font-semibold text-gray-900 mb-1">Enterprise Security</h4>
          <p class="text-sm text-gray-600">Advanced IP protection & compliance</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-2">🤝</div>
          <h4 class="font-semibold text-gray-900 mb-1">Collaboration Tools</h4>
          <p class="text-sm text-gray-600">Real-time workspace for team challenges</p>
        </div>
      </div>
    </div>

    <!-- Competitor Comparison -->
    <div class="space-y-6">
      {#each competitors as competitor}
        <Card class="competitor-card">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Competitor Info -->
            <div class="flex-1">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">{competitor.name}</h3>
                  <p class="text-gray-600">{competitor.description}</p>
                </div>
                {#if competitor.marketShare}
                  <Badge variant="primary" class="ml-4">
                    {competitor.marketShare}% Market Share
                  </Badge>
                {/if}
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Strengths -->
                <div>
                  <h4 class="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Strengths
                  </h4>
                  <ul class="space-y-2">
                    {#each competitor.strengths as strength}
                      <li class="text-sm text-gray-700 flex items-start gap-2">
                        <span class="text-green-500 mt-0.5">•</span>
                        <span>{strength}</span>
                      </li>
                    {/each}
                  </ul>
                </div>

                <!-- Weaknesses -->
                <div>
                  <h4 class="font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Weaknesses
                  </h4>
                  <ul class="space-y-2">
                    {#each competitor.weaknesses as weakness}
                      <li class="text-sm text-gray-700 flex items-start gap-2">
                        <span class="text-red-500 mt-0.5">•</span>
                        <span>{weakness}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      {/each}
    </div>

    <!-- Comparison Table -->
    <div class="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
              <th class="px-6 py-4 text-center text-sm font-semibold text-primary">OpenChance</th>
              <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900">InnoCentive</th>
              <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900">Kaggle</th>
              <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900">Consulting Firms</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 text-sm text-gray-900">Global Reach</td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600 font-semibold">✓ 50K+ experts</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600">✓ 400K+</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600">✓ 10M+</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-yellow-600">⚠ Limited</span>
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="px-6 py-4 text-sm text-gray-900">Time to Solution</td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600 font-semibold">✓ 30-90 days</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-yellow-600">⚠ 3-6 months</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600">✓ 1-3 months</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-red-600">✗ 6-18 months</span>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 text-sm text-gray-900">Cost Efficiency</td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600 font-semibold">✓ 15% fee</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-yellow-600">⚠ 20-30% fee</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600">✓ Free/Low</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-red-600">✗ $500-2K/hr</span>
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="px-6 py-4 text-sm text-gray-900">AI Matching</td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600 font-semibold">✓ Advanced</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-yellow-600">⚠ Basic</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-yellow-600">⚠ Limited</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-red-600">✗ Manual</span>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 text-sm text-gray-900">Challenge Types</td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600 font-semibold">✓ All types</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600">✓ Diverse</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-yellow-600">⚠ Data/ML only</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600">✓ All types</span>
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="px-6 py-4 text-sm text-gray-900">Collaboration Tools</td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600 font-semibold">✓ Real-time</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-yellow-600">⚠ Basic</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-yellow-600">⚠ Forums</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-600">✓ Full service</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.text-primary) {
    color: #0ea5e9;
  }
</style>

