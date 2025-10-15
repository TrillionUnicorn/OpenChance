<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  onMount(() => {
    gsap.from('.step-card', {
      scrollTrigger: {
        trigger: '.how-it-works-section',
        start: 'top 70%',
      },
      opacity: 0,
      x: -50,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.step-connector', {
      scrollTrigger: {
        trigger: '.how-it-works-section',
        start: 'top 70%',
      },
      scaleX: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    });
  });

  const steps = [
    {
      number: '01',
      title: 'Post Your Challenge',
      description: 'Define your problem, set requirements, and establish rewards. Our AI helps optimize your challenge description for maximum solver engagement.',
      icon: '📝',
      details: [
        'Detailed problem description',
        'Set budget and timeline',
        'Define success criteria',
        'AI-powered optimization'
      ]
    },
    {
      number: '02',
      title: 'AI Matches Solvers',
      description: 'Our proprietary algorithm analyzes your challenge and matches it with the most qualified solvers based on expertise, track record, and availability.',
      icon: '🤖',
      details: [
        'Intelligent solver matching',
        'Expertise verification',
        'Success rate analysis',
        'Team formation (if needed)'
      ]
    },
    {
      number: '03',
      title: 'Collaborate & Solve',
      description: 'Solvers work on your challenge using our collaboration tools. Track progress, provide feedback, and iterate until you have the perfect solution.',
      icon: '🚀',
      details: [
        'Real-time collaboration',
        'Progress tracking',
        'Milestone reviews',
        'Secure communication'
      ]
    }
  ];
</script>

<section class="how-it-works-section py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        How It Works
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        From problem to solution in three simple steps
      </p>
    </div>

    <div class="relative">
      <!-- Desktop connector line -->
      <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 step-connector" style="transform-origin: left;"></div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
        {#each steps as step, index}
          <div class="step-card">
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-100">
              <!-- Step number badge -->
              <div class="flex items-center justify-between mb-6">
                <div class="text-6xl font-bold text-primary/20">
                  {step.number}
                </div>
                <div class="text-5xl">
                  {step.icon}
                </div>
              </div>

              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>

              <p class="text-gray-600 mb-6">
                {step.description}
              </p>

              <ul class="space-y-2">
                {#each step.details as detail}
                  <li class="flex items-start gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{detail}</span>
                  </li>
                {/each}
              </ul>
            </div>

            <!-- Mobile connector arrow -->
            {#if index < steps.length - 1}
              <div class="lg:hidden flex justify-center my-6">
                <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center mt-16">
      <a 
        href="#waitlist"
        class="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Get Started Now
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </a>
    </div>
  </div>
</section>

<style>
  :global(.bg-primary) {
    background-color: #0ea5e9;
  }
  
  :global(.bg-primary-dark) {
    background-color: #0284c7;
  }
  
  :global(.text-primary) {
    color: #0ea5e9;
  }
  
  :global(.text-primary\/20) {
    color: rgba(14, 165, 233, 0.2);
  }
  
  :global(.border-primary) {
    border-color: #0ea5e9;
  }
  
  :global(.from-primary) {
    --tw-gradient-from: #0ea5e9;
  }
  
  :global(.via-secondary) {
    --tw-gradient-via: #3b82f6;
  }
  
  :global(.to-accent) {
    --tw-gradient-to: #06b6d4;
  }
</style>

