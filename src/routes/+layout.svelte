<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/challenges', label: 'Challenges' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<nav class="navbar">
		<div class="nav-container">
			<a href="/" class="logo">
				<span class="logo-icon">🌍</span>
				<span class="logo-text">OpenChance</span>
			</a>

			<button
				class="mobile-menu-btn"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Toggle mobile menu"
			>
				<span class="hamburger"></span>
			</button>

			<div class="nav-links {mobileMenuOpen ? 'mobile-open' : ''}">
				{#each navLinks as link}
					<a
						href={link.href}
						class="nav-link {$page.url.pathname === link.href ? 'active' : ''}"
						onclick={() => (mobileMenuOpen = false)}
					>
						{link.label}
					</a>
				{/each}
				<a href="/login" class="btn-nav">Sign In</a>
			</div>
		</div>
	</nav>

	<main>
		{@render children?.()}
	</main>

	<footer class="footer">
		<div class="footer-container">
			<div class="footer-grid">
				<div class="footer-section">
					<h3>OpenChance</h3>
					<p>Connecting the world's brightest minds with the biggest challenges.</p>
				</div>

				<div class="footer-section">
					<h4>Platform</h4>
					<a href="/challenges">Browse Challenges</a>
					<a href="/how-it-works">How It Works</a>
					<a href="/pricing">Pricing</a>
				</div>

				<div class="footer-section">
					<h4>Company</h4>
					<a href="/about">About Us</a>
					<a href="/contact">Contact</a>
					<a href="/careers">Careers</a>
				</div>

				<div class="footer-section">
					<h4>Legal</h4>
					<a href="/privacy">Privacy Policy</a>
					<a href="/terms">Terms of Service</a>
					<a href="/security">Security</a>
				</div>
			</div>

			<div class="footer-bottom">
				<p>&copy; 2025 OpenChance. All rights reserved.</p>
				<div class="social-links">
					<a href="https://twitter.com/openchance" target="_blank">Twitter</a>
					<a href="https://linkedin.com/company/openchance" target="_blank">LinkedIn</a>
					<a href="https://discord.gg/openchance" target="_blank">Discord</a>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.navbar {
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		position: sticky;
		top: 0;
		z-index: 100;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: white;
		font-size: 1.25rem;
		font-weight: 700;
	}

	.logo-icon {
		font-size: 1.5rem;
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 2px;
		background: white;
		position: relative;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 24px;
		height: 2px;
		background: white;
		left: 0;
	}

	.hamburger::before {
		top: -8px;
	}

	.hamburger::after {
		bottom: -8px;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-link {
		color: white;
		text-decoration: none;
		opacity: 0.9;
		transition: opacity 0.2s;
		font-weight: 500;
	}

	.nav-link:hover,
	.nav-link.active {
		opacity: 1;
	}

	.nav-link.active {
		border-bottom: 2px solid white;
		padding-bottom: 0.25rem;
	}

	.btn-nav {
		background: #10b981;
		color: white;
		padding: 0.5rem 1.5rem;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 600;
		transition: background 0.2s;
	}

	.btn-nav:hover {
		background: #059669;
	}

	main {
		flex: 1;
	}

	.footer {
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 3rem 0 1rem;
		margin-top: 4rem;
	}

	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.footer-section h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.footer-section h4 {
		font-size: 1rem;
		margin-bottom: 1rem;
		opacity: 0.9;
	}

	.footer-section p {
		opacity: 0.8;
		line-height: 1.6;
	}

	.footer-section a {
		display: block;
		color: white;
		text-decoration: none;
		opacity: 0.7;
		margin-bottom: 0.5rem;
		transition: opacity 0.2s;
	}

	.footer-section a:hover {
		opacity: 1;
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		opacity: 0.7;
	}

	.social-links {
		display: flex;
		gap: 1.5rem;
	}

	.social-links a {
		color: white;
		text-decoration: none;
		transition: opacity 0.2s;
	}

	.social-links a:hover {
		opacity: 0.7;
	}

	@media (max-width: 768px) {
		.mobile-menu-btn {
			display: block;
		}

		.nav-links {
			position: fixed;
			top: 60px;
			left: 0;
			right: 0;
			background: rgba(0, 0, 0, 0.95);
			backdrop-filter: blur(10px);
			flex-direction: column;
			padding: 2rem;
			gap: 1.5rem;
			transform: translateY(-100%);
			opacity: 0;
			transition: all 0.3s;
			pointer-events: none;
		}

		.nav-links.mobile-open {
			transform: translateY(0);
			opacity: 1;
			pointer-events: all;
		}

		.footer-grid {
			grid-template-columns: 1fr;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
	}
</style>
