<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Card from '$lib/components/ui/Card.svelte';
  import { marketData, marketBreakdown, customerSegments } from '$lib/data/market';

  onMount(() => {
    gsap.from('.market-card', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  });

  function formatCurrency(value: number): string {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  }

  function formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
  }
</script>

<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Market Analysis</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        A massive, growing market with proven demand for innovative problem-solving solutions
      </p>
    </div>

    <!-- TAM SAM SOM -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <Card class="market-card text-center">
        <div class="text-5xl mb-4">🌍</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Total Addressable Market</h3>
        <div class="text-4xl font-bold text-primary mb-2">
          {formatCurrency(marketData.tam)}
        </div>
        <p class="text-sm text-gray-600">
          Global consulting + innovation management market
        </p>
      </Card>

      <Card class="market-card text-center">
        <div class="text-5xl mb-4">🎯</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Serviceable Addressable Market</h3>
        <div class="text-4xl font-bold text-secondary mb-2">
          {formatCurrency(marketData.sam)}
        </div>
        <p class="text-sm text-gray-600">
          Crowdsourcing & open innovation platforms
        </p>
      </Card>

      <Card class="market-card text-center">
        <div class="text-5xl mb-4">🚀</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Serviceable Obtainable Market</h3>
        <div class="text-4xl font-bold text-accent mb-2">
          {formatCurrency(marketData.som)}
        </div>
        <p class="text-sm text-gray-600">
          Realistic 3-year market capture (0.5% of SAM)
        </p>
      </Card>
    </div>

    <!-- Market Breakdown -->
    <div class="mb-16">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Market Breakdown & Growth</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="market-card">
          <h4 class="text-lg font-semibold text-gray-900 mb-3">Management Consulting</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Global Market:</span>
              <span class="font-semibold">{formatCurrency(marketBreakdown.consulting.global)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Annual Growth:</span>
              <span class="font-semibold text-green-600">{formatPercentage(marketBreakdown.consulting.growth)} CAGR</span>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-200">
              <p class="text-xs text-gray-500">{marketBreakdown.consulting.source}</p>
            </div>
          </div>
        </Card>

        <Card class="market-card">
          <h4 class="text-lg font-semibold text-gray-900 mb-3">Innovation Management</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">2024 Market:</span>
              <span class="font-semibold">{formatCurrency(marketBreakdown.innovation.global)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">2033 Projection:</span>
              <span class="font-semibold">{formatCurrency(marketBreakdown.innovation.projected2033)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Growth Rate:</span>
              <span class="font-semibold text-green-600">{formatPercentage(marketBreakdown.innovation.cagr)} CAGR</span>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-200">
              <p class="text-xs text-gray-500">{marketBreakdown.innovation.source}</p>
            </div>
          </div>
        </Card>

        <Card class="market-card">
          <h4 class="text-lg font-semibold text-gray-900 mb-3">R&D Spending</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Global R&D:</span>
              <span class="font-semibold">{formatCurrency(marketBreakdown.rd.global)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Annual Growth:</span>
              <span class="font-semibold text-green-600">{formatPercentage(marketBreakdown.rd.growth)}</span>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-200">
              <p class="text-xs text-gray-500">{marketBreakdown.rd.source}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Customer Segments -->
    <div>
      <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Target Customer Segments</h3>
      <div class="space-y-4">
        {#each customerSegments as segment}
          <Card class="market-card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">{segment.segment}</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600 block">Count:</span>
                    <span class="font-semibold">{segment.count.toLocaleString()}</span>
                  </div>
                  <div>
                    <span class="text-gray-600 block">Avg Spend:</span>
                    <span class="font-semibold">{formatCurrency(segment.avgSpend)}/yr</span>
                  </div>
                  <div>
                    <span class="text-gray-600 block">Total Market:</span>
                    <span class="font-semibold">{formatCurrency(segment.totalMarket)}</span>
                  </div>
                  <div>
                    <span class="text-gray-600 block">Target (3yr):</span>
                    <span class="font-semibold text-green-600">{formatPercentage(segment.penetrationTarget)}</span>
                  </div>
                </div>
              </div>
              <div class="text-center md:text-right">
                <div class="text-sm text-gray-600 mb-1">Revenue Potential</div>
                <div class="text-2xl font-bold text-primary">{formatCurrency(segment.revenue)}</div>
              </div>
            </div>
          </Card>
        {/each}
      </div>
    </div>

    <!-- Data Sources -->
    <div class="mt-12 p-6 bg-gray-50 rounded-xl">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">Data Sources & Methodology</h4>
      <div class="text-xs text-gray-600 space-y-1">
        <p>• <strong>Management Consulting:</strong> Custom Market Insights (2024), Maximize Market Research (2024)</p>
        <p>• <strong>Innovation Management:</strong> Straits Research - Innovation Management Market Report (2024)</p>
        <p>• <strong>R&D Spending:</strong> WIPO Global Innovation Index (2024)</p>
        <p>• <strong>Market Sizing:</strong> Bottom-up analysis based on customer segment data and industry benchmarks</p>
        <p>• <strong>Growth Projections:</strong> Conservative estimates based on historical CAGR and market trends</p>
      </div>
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
</style>

