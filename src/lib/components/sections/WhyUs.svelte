<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import Card from '$lib/components/ui/Card.svelte';

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  onMount(() => {
    gsap.from('.why-us-card', {
      scrollTrigger: {
        trigger: '.why-us-section',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  });

  const advantages = [
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Access 50,000+ expert problem solvers from around the world, bringing diverse perspectives and innovative solutions.',
      highlight: '50K+ Experts'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get solutions in 30-90 days instead of 6-18 months with traditional consulting. Speed without compromising quality.',
      highlight: '30-90 Days'
    },
    {
      icon: '💎',
      title: 'Cost-Effective',
      description: 'Pay only for successful solutions. Our platform fees are 85% lower than traditional consulting rates.',
      highlight: '85% Savings'
    },
    {
      icon: '🎯',
      title: 'AI-Powered Matching',
      description: 'Our proprietary algorithm matches your challenge with the perfect solvers based on expertise, track record, and availability.',
      highlight: '94% Success Rate'
    },
    {
      icon: '🔒',
      title: 'IP Protection',
      description: 'Robust intellectual property safeguards, NDAs, and secure escrow system protect your innovations and investments.',
      highlight: 'Enterprise-Grade Security'
    },
    {
      icon: '🤝',
      title: 'Proven Results',
      description: '$50M+ in rewards distributed, 1,000+ challenges solved, and 4.8/5 satisfaction rating from organizations worldwide.',
      highlight: '$50M+ Distributed'
    }
  ];
</script>

<section class="why-us-section py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Why Choose OpenChance?
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        The world's most effective problem-solving platform, combining global expertise with cutting-edge AI matching
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each advantages as advantage}
        <Card class="why-us-card">
          <div class="text-5xl mb-4">{advantage.icon}</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">
            {advantage.title}
          </h3>
          <p class="text-gray-600 mb-4">
            {advantage.description}
          </p>
          <div class="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm">
            {advantage.highlight}
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>

<style>
  :global(.bg-primary\/10) {
    background-color: rgba(14, 165, 233, 0.1);
  }

  :global(.text-primary) {
    color: #0ea5e9;
  }
</style>

