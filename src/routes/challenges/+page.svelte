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
			description: 'Design a cost-effective water purification system for remote communities.',
			tags: ['Water', 'Sustainability', 'Engineering']
		},
		{
			id: 2,
			title: 'AI-Powered Learning Platform',
			category: 'Education',
			reward: '$25,000',
			participants: 156,
			deadline: '45 days',
			difficulty: 'Medium',
			description: 'Create an adaptive learning system that personalizes education content.',
			tags: ['AI', 'Education', 'Software']
		},
		{
			id: 3,
			title: 'Sustainable Food Packaging',
			category: 'Sustainability',
			reward: '$15,000',
			participants: 89,
			deadline: '60 days',
			difficulty: 'Medium',
			description: 'Develop biodegradable packaging that keeps food fresh longer.',
			tags: ['Packaging', 'Sustainability', 'Materials']
		},
		{
			id: 4,
			title: 'Urban Traffic Optimization',
			category: 'Smart Cities',
			reward: '$75,000',
			participants: 312,
			deadline: '90 days',
			difficulty: 'High',
			description: 'Create an AI system to reduce traffic congestion in major cities.',
			tags: ['AI', 'Transportation', 'Urban Planning']
		},
		{
			id: 5,
			title: 'Telemedicine Platform for Rural Areas',
			category: 'Healthcare',
			reward: '$40,000',
			participants: 178,
			deadline: '60 days',
			difficulty: 'Medium',
			description: 'Build a platform connecting rural patients with healthcare professionals.',
			tags: ['Healthcare', 'Technology', 'Accessibility']
		},
		{
			id: 6,
			title: 'Renewable Energy Storage Solution',
			category: 'Energy',
			reward: '$100,000',
			participants: 445,
			deadline: '120 days',
			difficulty: 'High',
			description: 'Develop cost-effective energy storage for renewable sources.',
			tags: ['Energy', 'Innovation', 'Engineering']
		}
	];

	let selectedCategory = $state('all');
	let searchQuery = $state('');
	let sortBy = $state('newest');

	const categories = ['all', 'Environment', 'Education', 'Healthcare', 'Technology', 'Sustainability', 'Smart Cities', 'Energy'];

	$effect(() => {
		// Filter and sort logic would go here
		console.log('Filters changed:', { selectedCategory, searchQuery, sortBy });
	});
</script>

<svelte:head>
	<title>Browse Challenges - OpenChance</title>
</svelte:head>

<div class="challenges-page">
	<header class="page-header">
		<div class="container">
			<h1>Browse Challenges</h1>
			<p>Discover problems that match your expertise and make an impact</p>
		</div>
	</header>

	<div class="container">
		<div class="filters-section">
			<div class="search-bar">
				<input
					type="text"
					placeholder="Search challenges..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>

			<div class="filter-controls">
				<div class="category-filters">
					{#each categories as category}
						<button
							class="filter-btn {selectedCategory === category ? 'active' : ''}"
							onclick={() => (selectedCategory = category)}
						>
							{category === 'all' ? 'All Categories' : category}
						</button>
					{/each}
				</div>

				<div class="sort-controls">
					<label for="sort">Sort by:</label>
					<select id="sort" bind:value={sortBy} class="sort-select">
						<option value="newest">Newest First</option>
						<option value="reward">Highest Reward</option>
						<option value="deadline">Ending Soon</option>
						<option value="popular">Most Popular</option>
					</select>
				</div>
			</div>
		</div>

		<div class="results-info">
			<p>Showing {challenges.length} challenges</p>
		</div>

		<div class="challenges-grid">
			{#each challenges as challenge}
				<div class="challenge-card">
					<div class="challenge-header">
						<div class="challenge-category">{challenge.category}</div>
						<div class="challenge-difficulty {challenge.difficulty.toLowerCase()}">
							{challenge.difficulty}
						</div>
					</div>

					<h3 class="challenge-title">{challenge.title}</h3>
					<p class="challenge-description">{challenge.description}</p>

					<div class="challenge-tags">
						{#each challenge.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>

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
						<a href="/challenges/{challenge.id}" class="btn-primary">View Details</a>
						<button class="btn-secondary">Save</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="pagination">
			<button class="page-btn">Previous</button>
			<button class="page-btn active">1</button>
			<button class="page-btn">2</button>
			<button class="page-btn">3</button>
			<button class="page-btn">Next</button>
		</div>
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

	.challenges-page {
		min-height: 100vh;
		padding-bottom: 4rem;
	}

	.page-header {
		text-align: center;
		padding: 3rem 2rem 2rem;
	}

	.page-header h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.page-header p {
		font-size: 1.25rem;
		opacity: 0.9;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.filters-section {
		margin-bottom: 2rem;
	}

	.search-bar {
		margin-bottom: 1.5rem;
	}

	.search-input {
		width: 100%;
		padding: 1rem;
		border-radius: 0.75rem;
		border: none;
		font-size: 1rem;
		background: rgba(255, 255, 255, 0.9);
		color: #333;
	}

	.search-input::placeholder {
		color: #999;
	}

	.filter-controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.category-filters {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		flex: 1;
	}

	.filter-btn {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.875rem;
	}

	.filter-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.filter-btn.active {
		background: #60a5fa;
		border-color: #60a5fa;
	}

	.sort-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.sort-select {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.1);
		color: white;
		cursor: pointer;
	}

	.results-info {
		margin-bottom: 1.5rem;
		opacity: 0.9;
	}

	.challenges-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.challenge-card {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 1.5rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: transform 0.2s;
	}

	.challenge-card:hover {
		transform: translateY(-4px);
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

	.challenge-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.tag {
		background: rgba(255, 255, 255, 0.15);
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
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
		text-decoration: none;
		border: none;
	}

	.btn-primary {
		background: #10b981;
		color: white;
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

	.pagination {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}

	.page-btn {
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: white;
		cursor: pointer;
		transition: all 0.2s;
	}

	.page-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.page-btn.active {
		background: #60a5fa;
		border-color: #60a5fa;
	}

	@media (max-width: 768px) {
		.page-header h1 {
			font-size: 2rem;
		}

		.challenges-grid {
			grid-template-columns: 1fr;
		}

		.filter-controls {
			flex-direction: column;
			align-items: stretch;
		}

		.category-filters {
			justify-content: center;
		}
	}
</style>

