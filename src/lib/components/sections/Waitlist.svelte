<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Button from '$lib/components/ui/Button.svelte';

  let email = $state('');
  let name = $state('');
  let role = $state<'solver' | 'challenger' | 'both'>('solver');
  let submitted = $state(false);
  let loading = $state(false);
  let error = $state('');

  onMount(() => {
    gsap.from('.waitlist-form', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    });
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = '';
    loading = true;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error = 'Please enter a valid email address';
      loading = false;
      return;
    }

    // Simulate API call (replace with actual backend integration)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo purposes
      const waitlistData = {
        email,
        name,
        role,
        timestamp: new Date().toISOString()
      };
      
      const existingData = localStorage.getItem('waitlist') || '[]';
      const waitlist = JSON.parse(existingData);
      waitlist.push(waitlistData);
      localStorage.setItem('waitlist', JSON.stringify(waitlist));
      
      submitted = true;
      
      // Reset form
      email = '';
      name = '';
      role = 'solver';
      
      // Show success animation
      gsap.from('.success-message', {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
      
      // Reset after 5 seconds
      setTimeout(() => {
        submitted = false;
      }, 5000);
      
    } catch (err) {
      error = 'Something went wrong. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<section id="waitlist" class="py-20 bg-gradient-to-br from-primary to-secondary">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
        Join the Waitlist
      </h2>
      <p class="text-xl text-white/90 max-w-2xl mx-auto">
        Be among the first to access the world's largest problem-solving community. 
        Early members get exclusive benefits and founder pricing.
      </p>
    </div>

    {#if !submitted}
      <form onsubmit={handleSubmit} class="waitlist-form bg-white rounded-2xl p-8 shadow-2xl">
        <div class="space-y-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              bind:value={name}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>

          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              I'm interested in:
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label class="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all {role === 'solver' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
                <input
                  type="radio"
                  name="role"
                  value="solver"
                  bind:group={role}
                  class="sr-only"
                />
                <div class="text-center">
                  <div class="text-2xl mb-1">🧠</div>
                  <div class="font-semibold text-gray-900">Solving</div>
                  <div class="text-xs text-gray-600">Earn rewards</div>
                </div>
              </label>

              <label class="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all {role === 'challenger' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
                <input
                  type="radio"
                  name="role"
                  value="challenger"
                  bind:group={role}
                  class="sr-only"
                />
                <div class="text-center">
                  <div class="text-2xl mb-1">🎯</div>
                  <div class="font-semibold text-gray-900">Posting</div>
                  <div class="text-xs text-gray-600">Get solutions</div>
                </div>
              </label>

              <label class="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all {role === 'both' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
                <input
                  type="radio"
                  name="role"
                  value="both"
                  bind:group={role}
                  class="sr-only"
                />
                <div class="text-center">
                  <div class="text-2xl mb-1">🤝</div>
                  <div class="font-semibold text-gray-900">Both</div>
                  <div class="text-xs text-gray-600">Full access</div>
                </div>
              </label>
            </div>
          </div>

          {#if error}
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          {/if}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth={true}
            loading={loading}
          >
            {loading ? 'Joining...' : 'Join Waitlist'}
          </Button>

          <p class="text-xs text-gray-600 text-center">
            By joining, you agree to receive updates about OpenChance. Unsubscribe anytime.
          </p>
        </div>
      </form>
    {:else}
      <div class="success-message bg-white rounded-2xl p-12 shadow-2xl text-center">
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-3xl font-bold text-gray-900 mb-4">
          You're on the list!
        </h3>
        <p class="text-lg text-gray-600 mb-6">
          Thank you for joining! We'll send you an email with next steps and exclusive early access details.
        </p>
        <div class="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Confirmation email sent</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Early access reserved</span>
          </div>
        </div>
      </div>
    {/if}

    <!-- Social proof -->
    <div class="mt-12 text-center text-white/90">
      <p class="text-lg font-semibold mb-2">Join 10,000+ innovators already on the waitlist</p>
      <div class="flex items-center justify-center gap-8 text-sm">
        <div>🌍 50+ Countries</div>
        <div>🏢 500+ Organizations</div>
        <div>🚀 Growing Daily</div>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.focus\:ring-primary:focus) {
    --tw-ring-color: #0ea5e9;
  }
  
  :global(.border-primary) {
    border-color: #0ea5e9;
  }
  
  :global(.bg-primary\/5) {
    background-color: rgba(14, 165, 233, 0.05);
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>

