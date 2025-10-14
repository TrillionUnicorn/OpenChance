<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { gsap } from 'gsap';

  let heroRef: HTMLElement;
  let parallaxBg: HTMLElement;
  let scrollY = $state(0);

  onMount(() => {
    // GSAP animations for hero elements
    gsap.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out'
    });

    gsap.from('.hero-stats', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.9,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Parallax scroll effect
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const stats = [
    { number: '1,247', label: 'Active Challenges', icon: '🎯' },
    { number: '50K+', label: 'Problem Solvers', icon: '👥' },
    { number: '$50M+', label: 'Rewards Paid', icon: '💰' },
    { number: '94%', label: 'Success Rate', icon: '✅' }
  ];
</script>

<section bind:this={heroRef} class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Parallax Background -->
  <div 
    bind:this={parallaxBg}
    class="absolute inset-0 z-0"
    style="transform: translateY({scrollY * 0.5}px)"
  >
    <div class="absolute inset-0 gradient-primary opacity-90"></div>
    <!-- Animated background pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
      <div class="absolute top-40 right-40 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-20 left-1/3 w-80 h-80 bg-white rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>
    </div>
  </div>

  <!-- Content -->
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <div class="hero-title mb-6">
      <h1 class="text-5xl md:text-7xl font-bold text-white mb-4">
        🌍 OpenChance
      </h1>
      <div class="text-2xl md:text-4xl font-semibold text-white/90">
        Global Problem-Solving Hub
      </div>
    </div>

    <p class="hero-subtitle text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
      Connect brilliant minds with real-world challenges. From climate change to healthcare innovation, 
      we're solving the world's biggest problems through collective intelligence.
    </p>

    <div class="hero-cta flex flex-col sm:flex-row gap-4 justify-center mb-16">
      <Button variant="secondary" size="lg" href="#waitlist">
        Join as Solver
      </Button>
      <Button variant="outline" size="lg" href="#waitlist" class="bg-white/10 text-white border-white hover:bg-white hover:text-primary">
        Post a Challenge
      </Button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {#each stats as stat}
        <div class="hero-stats glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300">
          <div class="text-4xl mb-2">{stat.icon}</div>
          <div class="text-3xl md:text-4xl font-bold text-white mb-1">
            {stat.number}
          </div>
          <div class="text-sm md:text-base text-white/80">
            {stat.label}
          </div>
        </div>
      {/each}
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </div>
</section>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.05);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce {
    animation: bounce 2s ease-in-out infinite;
  }
</style>

