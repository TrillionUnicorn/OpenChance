import { test, expect } from '@playwright/test';

test.describe('Pitch Deck Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pitch');
	});

	test('should load pitch deck page', async ({ page }) => {
		await expect(page).toHaveTitle(/Pitch Deck/);
		await expect(page.getByText('OpenChance')).toBeVisible();
	});

	test('should display key metrics in hero', async ({ page }) => {
		await expect(page.getByText(/Total Addressable Market/i)).toBeVisible();
		await expect(page.getByText(/Serviceable Market/i)).toBeVisible();
		await expect(page.getByText(/Success Rate/i)).toBeVisible();
		await expect(page.getByText(/LTV:CAC Ratio/i)).toBeVisible();
	});

	test('should display problem statement', async ({ page }) => {
		await expect(page.getByText('The Problem')).toBeVisible();
		await expect(page.getByText(/Organizations struggle/i)).toBeVisible();
	});

	test('should display solution section', async ({ page }) => {
		await expect(page.getByText('Our Solution')).toBeVisible();
		await expect(page.getByText('Global Network')).toBeVisible();
		await expect(page.getByText('AI-Powered Matching')).toBeVisible();
		await expect(page.getByText('Fast & Cost-Effective')).toBeVisible();
	});

	test('should display market analysis', async ({ page }) => {
		await expect(page.getByText('Market Analysis')).toBeVisible();
		
		// Check TAM/SAM/SOM
		await expect(page.getByText(/Total Addressable Market/i)).toBeVisible();
		await expect(page.getByText(/Serviceable Addressable Market/i)).toBeVisible();
		await expect(page.getByText(/Serviceable Obtainable Market/i)).toBeVisible();
	});

	test('should display competitive analysis', async ({ page }) => {
		await expect(page.getByText('Competitive Landscape')).toBeVisible();
		
		// Check for competitors
		await expect(page.getByText('InnoCentive')).toBeVisible();
		await expect(page.getByText('Kaggle')).toBeVisible();
		await expect(page.getByText('Topcoder')).toBeVisible();
	});

	test('should display business model', async ({ page }) => {
		await expect(page.getByText('Business Model & Revenue')).toBeVisible();
		
		// Check revenue streams
		await expect(page.getByText('Platform Fees')).toBeVisible();
		await expect(page.getByText('Premium Services')).toBeVisible();
	});

	test('should display growth projections', async ({ page }) => {
		await expect(page.getByText('Growth Projections')).toBeVisible();
		
		// Check for year projections
		await expect(page.getByText(/Year 1/i)).toBeVisible();
		await expect(page.getByText(/Year 2/i)).toBeVisible();
	});

	test('should display roadmap', async ({ page }) => {
		await expect(page.getByText('Roadmap & Milestones')).toBeVisible();
	});

	test('should display team section', async ({ page }) => {
		await expect(page.getByText('The Team')).toBeVisible();
		await expect(page.getByText('Hunter Ho')).toBeVisible();
	});

	test('should have CTA buttons', async ({ page }) => {
		await expect(page.getByRole('link', { name: /View Full Deck/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
	});

	test('should have data sources cited', async ({ page }) => {
		// Scroll to find sources
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
		
		// Check for source citations
		const pageContent = await page.content();
		expect(pageContent).toContain('Custom Market Insights');
	});

	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		
		await expect(page.getByText('OpenChance')).toBeVisible();
		await expect(page.getByText('Market Analysis')).toBeVisible();
	});
});

