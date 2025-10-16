<script lang="ts">
	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let submitted = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		// In a real app, this would send to an API
		console.log('Form submitted:', formData);
		submitted = true;
		setTimeout(() => {
			submitted = false;
			formData = { name: '', email: '', subject: '', message: '' };
		}, 3000);
	}
</script>

<svelte:head>
	<title>Contact Us - OpenChance</title>
</svelte:head>

<div class="contact-page">
	<div class="container">
		<header class="page-header">
			<h1>Get in Touch</h1>
			<p>Have questions? We'd love to hear from you.</p>
		</header>

		<div class="content-grid">
			<div class="contact-form-section">
				<h2>Send us a Message</h2>

				{#if submitted}
					<div class="success-message">
						<div class="success-icon">✓</div>
						<h3>Message Sent!</h3>
						<p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="contact-form">
						<div class="form-group">
							<label for="name">Name</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								required
								placeholder="Your name"
							/>
						</div>

						<div class="form-group">
							<label for="email">Email</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								required
								placeholder="your@email.com"
							/>
						</div>

						<div class="form-group">
							<label for="subject">Subject</label>
							<select id="subject" bind:value={formData.subject} required>
								<option value="">Select a subject</option>
								<option value="general">General Inquiry</option>
								<option value="support">Technical Support</option>
								<option value="partnership">Partnership Opportunity</option>
								<option value="feedback">Feedback</option>
								<option value="other">Other</option>
							</select>
						</div>

						<div class="form-group">
							<label for="message">Message</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								placeholder="Tell us how we can help..."
								rows="6"
							></textarea>
						</div>

						<button type="submit" class="btn-primary btn-large">Send Message</button>
					</form>
				{/if}
			</div>

			<div class="contact-info-section">
				<div class="info-card">
					<h3>Contact Information</h3>

					<div class="info-item">
						<div class="info-icon">📧</div>
						<div class="info-content">
							<div class="info-label">Email</div>
							<a href="mailto:hello@openchance.com">hello@openchance.com</a>
						</div>
					</div>

					<div class="info-item">
						<div class="info-icon">💬</div>
						<div class="info-content">
							<div class="info-label">Discord</div>
							<a href="https://discord.gg/openchance" target="_blank">Join our community</a>
						</div>
					</div>

					<div class="info-item">
						<div class="info-icon">🐦</div>
						<div class="info-content">
							<div class="info-label">Twitter</div>
							<a href="https://twitter.com/openchance" target="_blank">@OpenChance</a>
						</div>
					</div>

					<div class="info-item">
						<div class="info-icon">💼</div>
						<div class="info-content">
							<div class="info-label">LinkedIn</div>
							<a href="https://linkedin.com/company/openchance" target="_blank">OpenChance</a>
						</div>
					</div>
				</div>

				<div class="info-card">
					<h3>Office Hours</h3>
					<p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
					<p>Saturday - Sunday: Closed</p>
					<p class="note">We typically respond within 24 hours during business days.</p>
				</div>

				<div class="info-card">
					<h3>Frequently Asked Questions</h3>
					<div class="faq-list">
						<a href="/faq#getting-started" class="faq-link">How do I get started?</a>
						<a href="/faq#payments" class="faq-link">How do payments work?</a>
						<a href="/faq#security" class="faq-link">Is my data secure?</a>
						<a href="/faq" class="faq-link">View all FAQs →</a>
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

	.contact-page {
		min-height: 100vh;
		padding: 2rem 0 4rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-header h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.page-header p {
		font-size: 1.25rem;
		opacity: 0.9;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 2rem;
	}

	.contact-form-section {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		padding: 2rem;
	}

	.contact-form-section h2 {
		font-size: 1.75rem;
		margin-bottom: 1.5rem;
	}

	.success-message {
		text-align: center;
		padding: 3rem 2rem;
	}

	.success-icon {
		width: 80px;
		height: 80px;
		background: #10b981;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		margin: 0 auto 1.5rem;
	}

	.success-message h3 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.success-message p {
		opacity: 0.9;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 600;
		font-size: 0.875rem;
	}

	input,
	select,
	textarea {
		padding: 0.75rem;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 1rem;
		font-family: inherit;
	}

	input::placeholder,
	textarea::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: #60a5fa;
		background: rgba(255, 255, 255, 0.15);
	}

	select {
		cursor: pointer;
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	.btn-primary {
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
		background: #10b981;
		color: white;
		font-size: 1rem;
	}

	.btn-primary:hover {
		background: #059669;
	}

	.btn-large {
		padding: 1rem 2rem;
		font-size: 1.125rem;
	}

	.contact-info-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		padding: 1.5rem;
	}

	.info-card h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.info-item {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.info-icon {
		font-size: 1.5rem;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		flex-shrink: 0;
	}

	.info-content {
		flex: 1;
	}

	.info-label {
		font-size: 0.875rem;
		opacity: 0.8;
		margin-bottom: 0.25rem;
	}

	.info-content a {
		color: #60a5fa;
		text-decoration: none;
		transition: color 0.2s;
	}

	.info-content a:hover {
		color: #93c5fd;
	}

	.info-card p {
		margin-bottom: 0.5rem;
		opacity: 0.9;
	}

	.note {
		font-size: 0.875rem;
		opacity: 0.7;
		margin-top: 1rem;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.faq-link {
		color: white;
		text-decoration: none;
		padding: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
		transition: background 0.2s;
	}

	.faq-link:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	@media (max-width: 968px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.page-header h1 {
			font-size: 2rem;
		}
	}
</style>

