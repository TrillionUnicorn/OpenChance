<script lang="ts">
	const team = [
		{
			name: 'Hunter Ho',
			role: 'Founder & CEO',
			bio: 'Former innovation consultant with 50+ successful projects',
			image: 'https://via.placeholder.com/150/667eea/ffffff?text=HH'
		}
	];

	const stats = [
		{ label: 'Active Challenges', value: '1,247' },
		{ label: 'Problem Solvers', value: '15,892' },
		{ label: 'Total Rewards', value: '$2.3M' },
		{ label: 'Success Rate', value: '94%' }
	];
</script>

<svelte:head>
	<title>About Us - OpenChance</title>
</svelte:head>

<div class="about-page">
	<section class="hero">
		<h1>About OpenChance</h1>
		<p class="subtitle">Connecting the world's brightest minds with the biggest challenges</p>
	</section>

	<section class="mission">
		<div class="container">
			<h2>Our Mission</h2>
			<p class="large-text">
				We believe that every problem has a solution, and every solution has a solver. OpenChance
				bridges the gap between organizations facing complex challenges and the global community of
				innovators ready to solve them.
			</p>
		</div>
	</section>

	<section class="stats-section">
		<div class="container">
			<div class="stats-grid">
				{#each stats as stat}
					<div class="stat-card">
						<div class="stat-value">{stat.value}</div>
						<div class="stat-label">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="story">
		<div class="container">
			<h2>Our Story</h2>
			<p>
				OpenChance was born from a simple observation: the world's most pressing problems often go
				unsolved not because solutions don't exist, but because the right people never connect.
			</p>
			<p>
				Traditional consulting is expensive, slow, and limited to a small network. Academic research
				is thorough but often disconnected from real-world implementation. Internal R&D teams are
				constrained by organizational boundaries.
			</p>
			<p>
				We created OpenChance to break down these barriers. By building a global marketplace for
				problem-solving, we enable organizations to tap into unlimited expertise while giving
				innovators the opportunity to make a real impact.
			</p>
		</div>
	</section>

	<section class="team">
		<div class="container">
			<h2>Meet Our Team</h2>
			<div class="team-grid">
				{#each team as member}
					<div class="team-card">
						<img src={member.image} alt={member.name} />
						<h3>{member.name}</h3>
						<p class="role">{member.role}</p>
						<p class="bio">{member.bio}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="values">
		<div class="container">
			<h2>Our Values</h2>
			<div class="values-grid">
				<div class="value-card">
					<div class="icon">🌍</div>
					<h3>Global Impact</h3>
					<p>We believe in solving problems that matter, at scale.</p>
				</div>
				<div class="value-card">
					<div class="icon">🤝</div>
					<h3>Collaboration</h3>
					<p>The best solutions come from diverse perspectives working together.</p>
				</div>
				<div class="value-card">
					<div class="icon">💡</div>
					<h3>Innovation</h3>
					<p>We encourage bold thinking and unconventional approaches.</p>
				</div>
				<div class="value-card">
					<div class="icon">⚖️</div>
					<h3>Fairness</h3>
					<p>Merit-based rewards and transparent evaluation for all.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="cta">
		<div class="container">
			<h2>Join Our Mission</h2>
			<p>Be part of the global problem-solving revolution</p>
			<div class="cta-buttons">
				<a href="/challenges" class="btn-primary">Browse Challenges</a>
				<a href="/contact" class="btn-secondary">Get in Touch</a>
			</div>
		</div>
	</section>
</div>

<style>
	.about-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.hero {
		text-align: center;
		padding: 4rem 2rem 2rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.25rem;
		opacity: 0.9;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	section {
		padding: 4rem 0;
	}

	h2 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.large-text {
		font-size: 1.25rem;
		line-height: 1.8;
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.stat-card {
		background: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 1rem;
		text-align: center;
		backdrop-filter: blur(10px);
	}

	.stat-value {
		font-size: 2.5rem;
		font-weight: 700;
		color: #60a5fa;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1rem;
		opacity: 0.9;
	}

	.story p {
		font-size: 1.125rem;
		line-height: 1.8;
		margin-bottom: 1.5rem;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.team-card {
		background: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 1rem;
		text-align: center;
		backdrop-filter: blur(10px);
	}

	.team-card img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		margin-bottom: 1rem;
	}

	.team-card h3 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.role {
		color: #60a5fa;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.bio {
		opacity: 0.9;
		line-height: 1.6;
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.value-card {
		background: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 1rem;
		text-align: center;
		backdrop-filter: blur(10px);
	}

	.icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.value-card h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.value-card p {
		opacity: 0.9;
		line-height: 1.6;
	}

	.cta {
		text-align: center;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
	}

	.cta h2 {
		margin-bottom: 1rem;
	}

	.cta p {
		font-size: 1.25rem;
		margin-bottom: 2rem;
		opacity: 0.9;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-primary,
	.btn-secondary {
		padding: 1rem 2rem;
		border-radius: 0.75rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s;
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
		border: 2px solid white;
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 2rem;
		}

		.stats-grid,
		.team-grid,
		.values-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

