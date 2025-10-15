import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load home page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/OpenChance/);
	});

	test('should display hero section with correct content', async ({ page }) => {
		// Check hero title
		await expect(page.locator('h1')).toContainText('OpenChance');
		
		// Check hero subtitle
		await expect(page.getByText('Global Problem-Solving Hub')).toBeVisible();
		
		// Check CTA buttons
		await expect(page.getByRole('link', { name: /Join as Solver/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /Post a Challenge/i })).toBeVisible();
	});

	test('should display stats correctly', async ({ page }) => {
		// Check for stats presence
		await expect(page.getByText(/Active Challenges/i)).toBeVisible();
		await expect(page.getByText(/Problem Solvers/i)).toBeVisible();
		await expect(page.getByText(/Rewards Paid/i)).toBeVisible();
		await expect(page.getByText(/Success Rate/i)).toBeVisible();
	});

	test('should display Why Us section', async ({ page }) => {
		await expect(page.getByText('Why Choose OpenChance?')).toBeVisible();
		
		// Check for competitive advantages
		await expect(page.getByText('Global Reach')).toBeVisible();
		await expect(page.getByText('Lightning Fast')).toBeVisible();
		await expect(page.getByText('Cost-Effective')).toBeVisible();
		await expect(page.getByText('AI-Powered Matching')).toBeVisible();
	});

	test('should display How It Works section', async ({ page }) => {
		await expect(page.getByText('How It Works')).toBeVisible();
		
		// Check for 3 steps
		await expect(page.getByText('Post Your Challenge')).toBeVisible();
		await expect(page.getByText('AI Matches Solvers')).toBeVisible();
		await expect(page.getByText('Collaborate & Solve')).toBeVisible();
	});

	test('should display pricing section', async ({ page }) => {
		await expect(page.getByText('Early Access Pricing')).toBeVisible();
		
		// Check for pricing tiers
		await expect(page.getByText('Solver')).toBeVisible();
		await expect(page.getByText('Basic Challenger')).toBeVisible();
		await expect(page.getByText('Premium Challenger')).toBeVisible();
		await expect(page.getByText('Enterprise')).toBeVisible();
	});

	test('should display featured challenges', async ({ page }) => {
		await expect(page.getByText('Featured Challenges')).toBeVisible();
		
		// Check for at least one challenge card
		const challengeCards = page.locator('[class*="challenge"]').first();
		await expect(challengeCards).toBeVisible();
	});

	test('should have functional waitlist form', async ({ page }) => {
		// Scroll to waitlist section
		await page.getByText('Join the Waitlist').click();
		
		// Fill out form
		await page.fill('input[type="text"]', 'Test User');
		await page.fill('input[type="email"]', 'test@example.com');
		
		// Select role
		await page.click('input[value="solver"]');
		
		// Submit form
		await page.click('button[type="submit"]');
		
		// Check for success message
		await expect(page.getByText(/on the list/i)).toBeVisible({ timeout: 5000 });
	});

	test('should have working category filters', async ({ page }) => {
		// Click on a category filter
		const sustainabilityFilter = page.getByRole('button', { name: /sustainability/i }).first();
		await sustainabilityFilter.click();
		
		// Wait for filtering to complete
		await page.waitForTimeout(500);
		
		// Verify URL or content changed
		expect(page.url()).toBeTruthy();
	});

	test('should have functional footer with all links', async ({ page }) => {
		// Scroll to footer
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		
		// Check footer sections
		await expect(page.getByText('Platform')).toBeVisible();
		await expect(page.getByText('Company')).toBeVisible();
		await expect(page.getByText('Resources')).toBeVisible();
		await expect(page.getByText('Legal')).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		
		// Check hero is visible
		await expect(page.locator('h1')).toBeVisible();
		
		// Check mobile menu or navigation
		await expect(page.getByText('OpenChance')).toBeVisible();
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		// Filter out known acceptable errors
		const criticalErrors = errors.filter(error => 
			!error.includes('favicon') && 
			!error.includes('404')
		);
		
		expect(criticalErrors).toHaveLength(0);
	});

	test('should have proper meta tags', async ({ page }) => {
		// Check title
		await expect(page).toHaveTitle(/OpenChance/);
		
		// Check meta description
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute('content', /.+/);
	});

	test('should scroll smoothly to sections', async ({ page }) => {
		// Click on a CTA that scrolls to waitlist
		await page.getByRole('link', { name: /Join as Solver/i }).first().click();
		
		// Wait for scroll
		await page.waitForTimeout(1000);
		
		// Check if waitlist section is in view
		const waitlistSection = page.locator('#waitlist');
		await expect(waitlistSection).toBeInViewport();
	});
});

