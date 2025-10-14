<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Footer from '$lib/components/sections/Footer.svelte';

  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  let submitted = $state(false);
  let loading = $state(false);
  let error = $state('');

  onMount(() => {
    gsap.from('.contact-content', {
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

    // Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error = 'Please enter a valid email address';
      loading = false;
      return;
    }

    if (message.length < 10) {
      error = 'Please provide a more detailed message';
      loading = false;
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo
      const contactData = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      };
      
      const existingData = localStorage.getItem('contacts') || '[]';
      const contacts = JSON.parse(existingData);
      contacts.push(contactData);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      
      submitted = true;
      
      // Reset form
      name = '';
      email = '';
      subject = '';
      message = '';
      
      // Show success animation
      gsap.from('.success-message', {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
      
    } catch (err) {
      error = 'Something went wrong. Please try again.';
    } finally {
      loading = false;
    }
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hello@openchance.com',
      link: 'mailto:hello@openchance.com'
    },
    {
      icon: '💬',
      title: 'Discord',
      value: 'Join our community',
      link: 'https://discord.gg/openchance'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'OpenChance',
      link: 'https://linkedin.com/company/openchance'
    },
    {
      icon: '🐦',
      title: 'Twitter',
      value: '@OpenChance',
      link: 'https://twitter.com/openchance'
    }
  ];
</script>

<svelte:head>
  <title>Contact Us | OpenChance</title>
  <meta name="description" content="Get in touch with OpenChance. Whether you're a problem solver, organization with challenges, or investor, we'd love to hear from you." />
</svelte:head>

<!-- Hero -->
<div class="bg-gradient-to-br from-primary to-secondary text-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-6xl font-bold mb-4">
      Get in Touch
    </h1>
    <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
      Have questions? Want to partner? We'd love to hear from you.
    </p>
  </div>
</div>

<!-- Main Content -->
<div class="bg-gray-50 py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <Card class="contact-content">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
          
          {#if !submitted}
            <form onsubmit={handleSubmit} class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
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

                <div>
                  <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
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
              </div>

              <div>
                <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  bind:value={subject}
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  bind:value={message}
                  required
                  rows="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
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
                {loading ? 'Sending...' : 'Send Message'}
              </Button>

              <p class="text-xs text-gray-600 text-center">
                We typically respond within 24 hours during business days.
              </p>
            </form>
          {:else}
            <div class="success-message text-center py-12">
              <div class="text-6xl mb-4">✅</div>
              <h3 class="text-3xl font-bold text-gray-900 mb-4">
                Message Sent!
              </h3>
              <p class="text-lg text-gray-600 mb-6">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <Button
                variant="primary"
                onclick={() => submitted = false}
              >
                Send Another Message
              </Button>
            </div>
          {/if}
        </Card>
      </div>

      <!-- Contact Info & Quick Links -->
      <div class="space-y-6">
        <!-- Contact Information -->
        <Card class="contact-content">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
          <div class="space-y-4">
            {#each contactInfo as info}
              <a
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : undefined}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="text-3xl">{info.icon}</div>
                <div>
                  <div class="font-semibold text-gray-900">{info.title}</div>
                  <div class="text-sm text-gray-600">{info.value}</div>
                </div>
              </a>
            {/each}
          </div>
        </Card>

        <!-- Response Time -->
        <Card class="contact-content bg-primary/5 border-2 border-primary/20">
          <h3 class="text-lg font-bold text-gray-900 mb-3">Response Time</h3>
          <div class="space-y-2 text-sm text-gray-700">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>General inquiries: 24 hours</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Partnership requests: 48 hours</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Investment inquiries: 48 hours</span>
            </div>
          </div>
        </Card>

        <!-- Office Hours -->
        <Card class="contact-content">
          <h3 class="text-lg font-bold text-gray-900 mb-3">Office Hours</h3>
          <div class="space-y-2 text-sm text-gray-700">
            <div class="flex justify-between">
              <span class="font-medium">Monday - Friday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Saturday:</span>
              <span>10:00 AM - 4:00 PM</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Sunday:</span>
              <span>Closed</span>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
              Timezone: UTC+8 (Singapore Time)
            </div>
          </div>
        </Card>

        <!-- Quick Links -->
        <Card class="contact-content">
          <h3 class="text-lg font-bold text-gray-900 mb-3">Quick Links</h3>
          <div class="space-y-2">
            <a href="/#waitlist" class="block text-primary hover:underline">Join Waitlist</a>
            <a href="/product" class="block text-primary hover:underline">Browse Challenges</a>
            <a href="/pitch" class="block text-primary hover:underline">Investor Deck</a>
            <a href="https://github.com/TrillionUnicorn/OpenChance" target="_blank" rel="noopener noreferrer" class="block text-primary hover:underline">GitHub Repository</a>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>

<Footer />

<style>
  :global(.focus\:ring-primary:focus) {
    --tw-ring-color: #0ea5e9;
  }
  
  :global(.text-primary) {
    color: #0ea5e9;
  }
  
  :global(.border-primary\/20) {
    border-color: rgba(14, 165, 233, 0.2);
  }
  
  :global(.bg-primary\/5) {
    background-color: rgba(14, 165, 233, 0.05);
  }
</style>

