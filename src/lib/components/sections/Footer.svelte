<script lang="ts">
  const currentYear = new Date().getFullYear();

  const navigation = {
    platform: [
      { name: 'Browse Challenges', href: '/product' },
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'Success Stories', href: '/#success-stories' }
    ],
    company: [
      { name: 'About Us', href: '/#about' },
      { name: 'Pitch Deck', href: '/pitch' },
      { name: 'Roadmap', href: '/roadmap' },
      { name: 'Contact', href: '/contact' }
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Community', href: '/community' },
      { name: 'Blog', href: '/blog' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'IP Protection', href: '/ip-protection' }
    ]
  };

  const social = [
    { name: 'GitHub', icon: '🐙', href: 'https://github.com/TrillionUnicorn/OpenChance' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/openchance' },
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/openchance' },
    { name: 'Discord', icon: '💬', href: 'https://discord.gg/openchance' }
  ];
</script>

<footer class="bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Main footer content -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
      <!-- Brand column -->
      <div class="lg:col-span-1">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-3xl">🌍</span>
          <span class="text-xl font-bold">OpenChance</span>
        </div>
        <p class="text-gray-400 text-sm mb-4">
          Solving the world's biggest challenges through collective intelligence.
        </p>
        <div class="flex gap-3">
          {#each social as item}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              class="text-2xl hover:scale-110 transition-transform"
              title={item.name}
            >
              {item.icon}
            </a>
          {/each}
        </div>
      </div>

      <!-- Navigation columns -->
      <div>
        <h3 class="font-semibold text-white mb-4">Platform</h3>
        <ul class="space-y-2">
          {#each navigation.platform as item}
            <li>
              <a href={item.href} class="text-gray-400 hover:text-white transition-colors text-sm">
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-white mb-4">Company</h3>
        <ul class="space-y-2">
          {#each navigation.company as item}
            <li>
              <a href={item.href} class="text-gray-400 hover:text-white transition-colors text-sm">
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-white mb-4">Resources</h3>
        <ul class="space-y-2">
          {#each navigation.resources as item}
            <li>
              <a href={item.href} class="text-gray-400 hover:text-white transition-colors text-sm">
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-white mb-4">Legal</h3>
        <ul class="space-y-2">
          {#each navigation.legal as item}
            <li>
              <a href={item.href} class="text-gray-400 hover:text-white transition-colors text-sm">
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-gray-800 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-gray-400 text-sm">
          © {currentYear} OpenChance. All rights reserved.
        </div>
        
        <div class="flex items-center gap-6 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <span>🔒</span>
            <span>Enterprise-Grade Security</span>
          </div>
          <div class="flex items-center gap-2">
            <span>✅</span>
            <span>GDPR Compliant</span>
          </div>
          <div class="flex items-center gap-2">
            <span>🌍</span>
            <span>Global Platform</span>
          </div>
        </div>
      </div>

      <div class="mt-6 text-center text-gray-500 text-xs">
        <p>Built with ❤️ by innovators, for innovators.</p>
        <p class="mt-1">
          Founder: <a href="https://hunterho07.github.io/Portfolio_1/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Hunter Ho</a>
        </p>
      </div>
    </div>
  </div>
</footer>

<style>
  :global(.text-primary) {
    color: #0ea5e9;
  }
</style>

