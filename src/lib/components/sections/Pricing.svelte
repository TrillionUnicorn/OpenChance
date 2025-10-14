<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  onMount(() => {
    gsap.from('.pricing-card', {
      scrollTrigger: {
        trigger: '.pricing-section',
        start: 'top 70%',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  });

  const plans = [
    {
      name: 'Solver',
      price: 'Free',
      period: 'Forever',
      description: 'For problem solvers looking to earn rewards',
      features: [
        'Browse unlimited challenges',
        'Apply to challenges',
        'Earn rewards up to $1M+',
        'Build your reputation',
        'Access collaboration tools',
        'Portfolio showcase',
        'Community support'
      ],
      cta: 'Join as Solver',
      popular: false,
      highlight: 'Always Free'
    },
    {
      name: 'Basic Challenger',
      price: '$499',
      originalPrice: '$999',
      period: 'per month',
      description: 'For organizations with occasional challenges',
      features: [
        'Post up to 5 challenges/month',
        'AI-powered solver matching',
        'Basic analytics dashboard',
        'Email support',
        '15% platform fee',
        'Standard IP protection',
        'Challenge templates'
      ],
      cta: 'Start Free Trial',
      popular: false,
      highlight: '50% Off First Year'
    },
    {
      name: 'Premium Challenger',
      price: '$1,499',
      originalPrice: '$2,999',
      period: 'per month',
      description: 'For organizations with ongoing innovation needs',
      features: [
        'Unlimited challenges',
        'Priority solver matching',
        'Advanced analytics & insights',
        'Dedicated success manager',
        '12% platform fee',
        'Enhanced IP protection',
        'Custom challenge workflows',
        'API access',
        '24/7 priority support'
      ],
      cta: 'Start Free Trial',
      popular: true,
      highlight: '50% Off First Year'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'Contact us',
      description: 'For large organizations with complex needs',
      features: [
        'Everything in Premium',
        'White-label solutions',
        'Custom integrations',
        'Private challenge network',
        'Negotiable platform fees',
        'Advanced security & compliance',
        'Dedicated infrastructure',
        'Custom SLAs',
        'On-site training'
      ],
      cta: 'Contact Sales',
      popular: false,
      highlight: 'Custom Pricing'
    }
  ];
</script>

<section class="pricing-section py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Early Access Pricing
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
        Limited-time founder pricing for early adopters
      </p>
      <div class="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
        🎉 50% Off First Year for Challengers
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each plans as plan}
        <div class="pricing-card relative">
          {#if plan.popular}
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
              Most Popular
            </div>
          {/if}
          
          <Card class="h-full flex flex-col {plan.popular ? 'border-2 border-primary shadow-xl' : ''}">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p class="text-gray-600 text-sm mb-4">
                {plan.description}
              </p>
              
              <div class="mb-2">
                {#if plan.originalPrice}
                  <span class="text-gray-400 line-through text-lg">
                    {plan.originalPrice}
                  </span>
                {/if}
              </div>
              
              <div class="flex items-baseline justify-center gap-1">
                <span class="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                {#if plan.period !== 'Contact us'}
                  <span class="text-gray-600">
                    /{plan.period}
                  </span>
                {/if}
              </div>
              
              <div class="mt-2 text-sm font-semibold text-primary">
                {plan.highlight}
              </div>
            </div>

            <ul class="space-y-3 mb-8 flex-grow">
              {#each plan.features as feature}
                <li class="flex items-start gap-2 text-sm text-gray-700">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{feature}</span>
                </li>
              {/each}
            </ul>

            <Button 
              variant={plan.popular ? 'primary' : 'outline'}
              fullWidth={true}
              href="#waitlist"
            >
              {plan.cta}
            </Button>
          </Card>
        </div>
      {/each}
    </div>

    <div class="mt-12 text-center text-gray-600">
      <p class="mb-2">All plans include our 94% success rate guarantee</p>
      <p class="text-sm">No hidden fees • Cancel anytime • 30-day money-back guarantee</p>
    </div>
  </div>
</section>

<style>
  :global(.border-primary) {
    border-color: #0ea5e9;
  }
  
  :global(.text-primary) {
    color: #0ea5e9;
  }
  
  :global(.from-primary) {
    --tw-gradient-from: #0ea5e9;
  }
  
  :global(.to-secondary) {
    --tw-gradient-to: #3b82f6;
  }
</style>

