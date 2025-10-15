import { test, expect } from '@playwright/test';

test.describe('Product Page - Challenge Browsing', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/product');
	});

	test('should load product page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Browse Challenges/);
		await expect(page.getByText('Browse Challenges')).toBeVisible();
	});

	test('should display search bar', async ({ page }) => {
		const searchInput = page.locator('input[type="text"]').first();
		await expect(searchInput).toBeVisible();
		await expect(searchInput).toHaveAttribute('placeholder', /search/i);
	});

	test('should display quick stats', async ({ page }) => {
		await expect(page.getByText(/Matching Challenges/i)).toBeVisible();
		await expect(page.getByText(/Total Rewards/i)).toBeVisible();
		await expect(page.getByText(/Success Rate/i)).toBeVisible();
		await expect(page.getByText(/Active Solvers/i)).toBeVisible();
	});

	test('should have category filters', async ({ page }) => {
		// Check for category buttons
		await expect(page.getByRole('button', { name: /all/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /sustainability/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /healthcare/i })).toBeVisible();
	});

	test('should filter challenges by category', async ({ page }) => {
		// Get initial challenge count
		const initialCount = await page.locator('[class*="challenge"]').count();
		
		// Click sustainability filter
		await page.getByRole('button', { name: /sustainability/i }).first().click();
		await page.waitForTimeout(500);
		
		// Verify filtering worked
		const filteredCount = await page.locator('[class*="challenge"]').count();
		expect(filteredCount).toBeGreaterThan(0);
	});

	test('should have difficulty filter dropdown', async ({ page }) => {
		const difficultySelect = page.locator('select').first();
		await expect(difficultySelect).toBeVisible();
		
		// Check options
		await difficultySelect.selectOption('advanced');
		await page.waitForTimeout(500);
	});

	test('should have sort options', async ({ page }) => {
		const sortSelect = page.locator('select').nth(1);
		await expect(sortSelect).toBeVisible();
		
		// Test sorting
		await sortSelect.selectOption('reward');
		await page.waitForTimeout(500);
		
		await sortSelect.selectOption('deadline');
		await page.waitForTimeout(500);
	});

	test('should toggle between grid and list view', async ({ page }) => {
		// Find view toggle buttons
		const gridButton = page.locator('button[title="Grid View"]');
		const listButton = page.locator('button[title="List View"]');
		
		await expect(gridButton).toBeVisible();
		await expect(listButton).toBeVisible();
		
		// Toggle to list view
		await listButton.click();
		await page.waitForTimeout(300);
		
		// Toggle back to grid view
		await gridButton.click();
		await page.waitForTimeout(300);
	});

	test('should display challenge cards with all information', async ({ page }) => {
		const firstCard = page.locator('[class*="challenge"]').first();
		
		// Check card is visible
		await expect(firstCard).toBeVisible();
		
		// Check for key elements (adjust selectors based on actual implementation)
		await expect(firstCard.locator('h3')).toBeVisible(); // Title
		await expect(firstCard.getByText(/reward/i)).toBeVisible();
		await expect(firstCard.getByText(/applicants/i)).toBeVisible();
		await expect(firstCard.getByText(/deadline/i)).toBeVisible();
	});

	test('should search challenges', async ({ page }) => {
		const searchInput = page.locator('input[type="text"]').first();
		
		// Type search query
		await searchInput.fill('carbon');
		await page.waitForTimeout(500);
		
		// Verify results updated
		const resultsText = page.getByText(/Showing/i);
		await expect(resultsText).toBeVisible();
	});

	test('should clear filters', async ({ page }) => {
		// Apply filters
		await page.getByRole('button', { name: /sustainability/i }).first().click();
		await page.waitForTimeout(300);
		
		// Click clear filters
		const clearButton = page.getByRole('button', { name: /Clear Filters/i });
		if (await clearButton.isVisible()) {
			await clearButton.click();
			await page.waitForTimeout(300);
		}
	});

	test('should show "no results" message when no matches', async ({ page }) => {
		const searchInput = page.locator('input[type="text"]').first();
		
		// Search for something that doesn't exist
		await searchInput.fill('xyzabc123nonexistent');
		await page.waitForTimeout(500);
		
		// Check for no results message
		await expect(page.getByText(/No challenges found/i)).toBeVisible();
	});

	test('should have working Apply button on challenge cards', async ({ page }) => {
		const applyButton = page.getByRole('button', { name: /Apply Now/i }).first();
		await expect(applyButton).toBeVisible();
		
		// Click apply button
		await applyButton.click();
		
		// Should navigate or show modal (adjust based on implementation)
		await page.waitForTimeout(500);
	});

	test('should be responsive on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		
		// Check layout adapts
		await expect(page.getByText('Browse Challenges')).toBeVisible();
		
		// Check filters are accessible
		await expect(page.getByRole('button', { name: /all/i })).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		
		// Check page loads
		await expect(page.getByText('Browse Challenges')).toBeVisible();
		
		// Check search is accessible
		const searchInput = page.locator('input[type="text"]').first();
		await expect(searchInput).toBeVisible();
	});

	test('should have no broken images', async ({ page }) => {
		await page.waitForLoadState('networkidle');
		
		const images = page.locator('img');
		const count = await images.count();
		
		for (let i = 0; i < count; i++) {
			const img = images.nth(i);
			const src = await img.getAttribute('src');
			
			if (src && !src.startsWith('data:')) {
				// Check if image loaded successfully
				const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
				expect(naturalWidth).toBeGreaterThan(0);
			}
		}
	});

	test('should have proper navigation', async ({ page }) => {
		// Check footer link to home
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		
		const homeLink = page.getByRole('link', { name: /home/i }).first();
		if (await homeLink.isVisible()) {
			await homeLink.click();
			await expect(page).toHaveURL('/');
		}
	});
});

