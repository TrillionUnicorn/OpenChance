<script lang="ts">
	const challenges = [
		{
			id: 1,
			title: 'Clean Water Access in Rural Areas',
			category: 'Environment',
			reward: '$50,000',
			participants: 234,
			deadline: '30 days',
			difficulty: 'High',
			description: 'Design a cost-effective water purification system for remote communities.'
		},
		{
			id: 2,
			title: 'AI-Powered Learning Platform',
			category: 'Education',
			reward: '$25,000',
			participants: 156,
			deadline: '45 days',
			difficulty: 'Medium',
			description: 'Create an adaptive learning system that personalizes education content.'
		},
		{
			id: 3,
			title: 'Sustainable Food Packaging',
			category: 'Sustainability',
			reward: '$15,000',
			participants: 89,
			deadline: '60 days',
			difficulty: 'Medium',
			description: 'Develop biodegradable packaging that keeps food fresh longer.'
		}
	];

	let selectedCategory = $state('all');
	const categories = ['all', 'Environment', 'Education', 'Healthcare', 'Technology', 'Sustainability'];
</script>

<svelte:head>
	<title>OpenChance - Global Problem-Solving Hub</title>
</svelte:head>

<div class="platform">
	<header class="hero">
		<h1>🌍 OpenChance</h1>
		<p>Global Problem-Solving & Collaboration Platform</p>
		<div class="hero-stats">
			<div class="stat">
				<div class="stat-number">1,247</div>
				<div class="stat-label">Active Challenges</div>
			</div>
			<div class="stat">
				<div class="stat-number">15,892</div>
				<div class="stat-label">Problem Solvers</div>
			</div>
			<div class="stat">
				<div class="stat-number">$2.3M</div>
				<div class="stat-label">Total Rewards</div>
			</div>
		</div>
	</header>

	<div class="filters">
		<h2>Browse Challenges</h2>
		<div class="category-filters">
			{#each categories as category}
				<button
					class="filter-btn {selectedCategory === category ? 'active' : ''}"
					onclick={() => selectedCategory = category}
				>
					{category === 'all' ? 'All Categories' : category}
				</button>
			{/each}
		</div>
	</div>

	<div class="challenges-grid">
		{#each challenges as challenge}
			<div class="challenge-card">
				<div class="challenge-header">
					<div class="challenge-category">{challenge.category}</div>
					<div class="challenge-difficulty {challenge.difficulty.toLowerCase()}">{challenge.difficulty}</div>
				</div>

				<h3 class="challenge-title">{challenge.title}</h3>
				<p class="challenge-description">{challenge.description}</p>

				<div class="challenge-stats">
					<div class="stat-item">
						<span class="stat-icon">💰</span>
						<span class="stat-text">{challenge.reward}</span>
					</div>
					<div class="stat-item">
						<span class="stat-icon">👥</span>
						<span class="stat-text">{challenge.participants} participants</span>
					</div>
					<div class="stat-item">
						<span class="stat-icon">⏰</span>
						<span class="stat-text">{challenge.deadline} left</span>
					</div>
				</div>

				<div class="challenge-actions">
					<button class="btn-primary">Join Challenge</button>
					<button class="btn-secondary">Learn More</button>
				</div>
			</div>
		{/each}
	</div>

	<div class="cta-section">
		<h2>Have a Problem to Solve?</h2>
		<p>Post your challenge and connect with innovators worldwide</p>
		<button class="btn-cta">Create Challenge</button>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		min-height: 100vh;
	}

	.platform {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 3rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}

	.hero p {
		font-size: 1.25rem;
		margin-bottom: 2rem;
		opacity: 0.9;
	}

	.hero-stats {
		display: flex;
		justify-content: center;
		gap: 3rem;
	}

	.stat {
		text-align: center;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: 700;
		color: #60a5fa;
	}

	.stat-label {
		font-size: 0.875rem;
		opacity: 0.8;
	}

	.filters {
		margin-bottom: 2rem;
	}

	.filters h2 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	.category-filters {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.filter-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.filter-btn.active {
		background: #60a5fa;
		border-color: #60a5fa;
	}

	.challenges-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.challenge-card {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 1.5rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.challenge-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.challenge-category {
		background: rgba(96, 165, 250, 0.3);
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.challenge-difficulty {
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.challenge-difficulty.high {
		background: #ef4444;
	}

	.challenge-difficulty.medium {
		background: #f59e0b;
	}

	.challenge-difficulty.low {
		background: #10b981;
	}

	.challenge-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.challenge-description {
		opacity: 0.9;
		line-height: 1.5;
		margin-bottom: 1rem;
	}

	.challenge-stats {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.stat-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
	}

	.stat-icon {
		font-size: 1rem;
	}

	.challenge-actions {
		display: flex;
		gap: 0.75rem;
	}

	.btn-primary,
	.btn-secondary {
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		flex: 1;
		text-align: center;
	}

	.btn-primary {
		background: #10b981;
		color: white;
		border: none;
	}

	.btn-primary:hover {
		background: #059669;
	}

	.btn-secondary {
		background: transparent;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.cta-section {
		text-align: center;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 3rem 2rem;
	}

	.cta-section h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.cta-section p {
		font-size: 1.125rem;
		opacity: 0.9;
		margin-bottom: 2rem;
	}

	.btn-cta {
		background: #3b82f6;
		color: white;
		border: none;
		padding: 1rem 2rem;
		font-size: 1.125rem;
		font-weight: 600;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn-cta:hover {
		background: #2563eb;
	}

	@media (max-width: 768px) {
		.hero-stats {
			flex-direction: column;
			gap: 1rem;
		}

		.challenges-grid {
			grid-template-columns: 1fr;
		}

		.challenge-actions {
			flex-direction: column;
		}
	}
</style>
