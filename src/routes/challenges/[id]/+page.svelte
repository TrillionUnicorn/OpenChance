<script lang="ts">
	import { page } from '$app/stores';

	const challenge = {
		id: 1,
		title: 'Clean Water Access in Rural Areas',
		category: 'Environment',
		reward: '$50,000',
		participants: 234,
		deadline: '30 days',
		difficulty: 'High',
		description:
			'Design a cost-effective water purification system for remote communities without access to clean water infrastructure.',
		fullDescription: `
			We are seeking innovative solutions to provide clean, safe drinking water to rural communities 
			in developing regions. The solution must be:
			
			- Cost-effective (under $100 per household)
			- Easy to maintain with minimal training
			- Sustainable and environmentally friendly
			- Scalable to serve communities of 100-1000 people
			- Able to purify water from various sources (rivers, wells, rainwater)
		`,
		requirements: [
			'Detailed technical specifications',
			'Cost breakdown and ROI analysis',
			'Implementation plan',
			'Maintenance guidelines',
			'Environmental impact assessment'
		],
		deliverables: [
			'Working prototype or detailed design',
			'Technical documentation',
			'Implementation roadmap',
			'Cost analysis',
			'Pilot test results (if available)'
		],
		tags: ['Water', 'Sustainability', 'Engineering', 'Social Impact'],
		postedBy: {
			name: 'Global Water Initiative',
			avatar: 'https://via.placeholder.com/50/667eea/ffffff?text=GWI',
			rating: 4.8,
			challengesPosted: 12
		},
		timeline: {
			posted: '2 days ago',
			deadline: 'March 15, 2025',
			daysLeft: 30
		}
	};

	const topSolvers = [
		{
			name: 'Sarah Chen',
			avatar: 'https://via.placeholder.com/40/10b981/ffffff?text=SC',
			expertise: 'Water Engineering',
			rating: 4.9,
			solved: 23
		},
		{
			name: 'Michael Rodriguez',
			avatar: 'https://via.placeholder.com/40/3b82f6/ffffff?text=MR',
			expertise: 'Sustainable Design',
			rating: 4.8,
			solved: 18
		},
		{
			name: 'Aisha Patel',
			avatar: 'https://via.placeholder.com/40/f59e0b/ffffff?text=AP',
			expertise: 'Environmental Science',
			rating: 4.7,
			solved: 15
		}
	];
</script>

<svelte:head>
	<title>{challenge.title} - OpenChance</title>
</svelte:head>

<div class="challenge-detail-page">
	<div class="container">
		<div class="breadcrumb">
			<a href="/challenges">← Back to Challenges</a>
		</div>

		<div class="challenge-header">
			<div class="header-main">
				<div class="category-badge">{challenge.category}</div>
				<h1>{challenge.title}</h1>
				<p class="short-description">{challenge.description}</p>

				<div class="meta-info">
					<div class="meta-item">
						<span class="icon">💰</span>
						<span class="label">Reward:</span>
						<span class="value">{challenge.reward}</span>
					</div>
					<div class="meta-item">
						<span class="icon">⏰</span>
						<span class="label">Deadline:</span>
						<span class="value">{challenge.timeline.deadline}</span>
					</div>
					<div class="meta-item">
						<span class="icon">👥</span>
						<span class="label">Participants:</span>
						<span class="value">{challenge.participants}</span>
					</div>
					<div class="meta-item">
						<span class="icon">📊</span>
						<span class="label">Difficulty:</span>
						<span class="value difficulty-{challenge.difficulty.toLowerCase()}"
							>{challenge.difficulty}</span
						>
					</div>
				</div>

				<div class="tags">
					{#each challenge.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			</div>

			<div class="header-actions">
				<button class="btn-primary btn-large">Apply Now</button>
				<button class="btn-secondary">Save Challenge</button>
				<button class="btn-secondary">Share</button>
			</div>
		</div>

		<div class="content-grid">
			<div class="main-content">
				<section class="section">
					<h2>Challenge Description</h2>
					<div class="description-content">
						{challenge.fullDescription}
					</div>
				</section>

				<section class="section">
					<h2>Requirements</h2>
					<ul class="requirements-list">
						{#each challenge.requirements as requirement}
							<li>{requirement}</li>
						{/each}
					</ul>
				</section>

				<section class="section">
					<h2>Deliverables</h2>
					<ul class="deliverables-list">
						{#each challenge.deliverables as deliverable}
							<li>{deliverable}</li>
						{/each}
					</ul>
				</section>

				<section class="section">
					<h2>Timeline</h2>
					<div class="timeline">
						<div class="timeline-item">
							<div class="timeline-dot"></div>
							<div class="timeline-content">
								<div class="timeline-title">Challenge Posted</div>
								<div class="timeline-date">{challenge.timeline.posted}</div>
							</div>
						</div>
						<div class="timeline-item">
							<div class="timeline-dot active"></div>
							<div class="timeline-content">
								<div class="timeline-title">Applications Open</div>
								<div class="timeline-date">Now</div>
							</div>
						</div>
						<div class="timeline-item">
							<div class="timeline-dot"></div>
							<div class="timeline-content">
								<div class="timeline-title">Deadline</div>
								<div class="timeline-date">{challenge.timeline.deadline}</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<div class="sidebar">
				<div class="card">
					<h3>Posted By</h3>
					<div class="poster-info">
						<img src={challenge.postedBy.avatar} alt={challenge.postedBy.name} />
						<div class="poster-details">
							<div class="poster-name">{challenge.postedBy.name}</div>
							<div class="poster-stats">
								<span>⭐ {challenge.postedBy.rating}</span>
								<span>📝 {challenge.postedBy.challengesPosted} challenges</span>
							</div>
						</div>
					</div>
					<button class="btn-secondary btn-full">View Profile</button>
				</div>

				<div class="card">
					<h3>Top Solvers Interested</h3>
					<div class="solvers-list">
						{#each topSolvers as solver}
							<div class="solver-item">
								<img src={solver.avatar} alt={solver.name} />
								<div class="solver-info">
									<div class="solver-name">{solver.name}</div>
									<div class="solver-expertise">{solver.expertise}</div>
									<div class="solver-stats">
										⭐ {solver.rating} • ✅ {solver.solved} solved
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="card">
					<h3>Similar Challenges</h3>
					<div class="similar-challenges">
						<a href="/challenges/2" class="similar-item">
							<div class="similar-title">AI-Powered Learning Platform</div>
							<div class="similar-reward">$25,000</div>
						</a>
						<a href="/challenges/4" class="similar-item">
							<div class="similar-title">Urban Traffic Optimization</div>
							<div class="similar-reward">$75,000</div>
						</a>
					</div>
				</div>
			</div>
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

	.challenge-detail-page {
		min-height: 100vh;
		padding: 2rem 0 4rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.breadcrumb {
		margin-bottom: 2rem;
	}

	.breadcrumb a {
		color: white;
		text-decoration: none;
		opacity: 0.9;
		transition: opacity 0.2s;
	}

	.breadcrumb a:hover {
		opacity: 1;
	}

	.challenge-header {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.category-badge {
		display: inline-block;
		background: rgba(96, 165, 250, 0.3);
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.short-description {
		font-size: 1.125rem;
		opacity: 0.9;
		margin-bottom: 2rem;
	}

	.meta-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.icon {
		font-size: 1.25rem;
	}

	.label {
		opacity: 0.8;
	}

	.value {
		font-weight: 600;
	}

	.difficulty-high {
		color: #ef4444;
	}

	.difficulty-medium {
		color: #f59e0b;
	}

	.difficulty-low {
		color: #10b981;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	.tag {
		background: rgba(255, 255, 255, 0.15);
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
	}

	.header-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.btn-primary,
	.btn-secondary {
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
	}

	.btn-large {
		padding: 1rem 2rem;
		font-size: 1.125rem;
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

	.btn-full {
		width: 100%;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 350px;
		gap: 2rem;
	}

	.section {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.section h2 {
		font-size: 1.75rem;
		margin-bottom: 1.5rem;
	}

	.description-content {
		line-height: 1.8;
		white-space: pre-line;
	}

	.requirements-list,
	.deliverables-list {
		list-style: none;
		padding: 0;
	}

	.requirements-list li,
	.deliverables-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-left: 1.5rem;
		position: relative;
	}

	.requirements-list li::before,
	.deliverables-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #10b981;
		font-weight: bold;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.timeline-item {
		display: flex;
		gap: 1rem;
	}

	.timeline-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		margin-top: 0.25rem;
		flex-shrink: 0;
	}

	.timeline-dot.active {
		background: #10b981;
		box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
	}

	.timeline-title {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.timeline-date {
		opacity: 0.8;
		font-size: 0.875rem;
	}

	.card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.card h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.poster-info {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.poster-info img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.poster-name {
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.poster-stats {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.875rem;
		opacity: 0.9;
	}

	.solvers-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.solver-item {
		display: flex;
		gap: 0.75rem;
	}

	.solver-item img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.solver-name {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.solver-expertise {
		font-size: 0.875rem;
		opacity: 0.8;
		margin-bottom: 0.25rem;
	}

	.solver-stats {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.similar-challenges {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.similar-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
		text-decoration: none;
		color: white;
		transition: background 0.2s;
	}

	.similar-item:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.similar-title {
		font-size: 0.875rem;
	}

	.similar-reward {
		font-weight: 600;
		color: #10b981;
	}

	@media (max-width: 968px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		h1 {
			font-size: 2rem;
		}

		.meta-info {
			grid-template-columns: 1fr;
		}
	}
</style>

