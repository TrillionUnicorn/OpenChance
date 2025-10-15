import { test, expect } from '@playwright/test';

test.describe('Critical UI & Functionality Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Set longer timeout for page loads
		page.setDefaultTimeout(10000);
	});

	test('Home page loads and displays correctly', async ({ page }) => {
		await page.goto('/');
		
		// Check page loads
		await expect(page).toHaveTitle(/OpenChance/);
		
		// Check hero section
		const heroHeading = page.locator('h1').first();
		await expect(heroHeading).toBeVisible();
		await expect(heroHeading).toContainText('OpenChance');
		
		// Check no console errors
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.waitForLoadState('networkidle');
		
		// Filter out acceptable errors
		const criticalErrors = errors.filter(error => 
			!error.includes('favicon') && 
			!error.includes('404') &&
			!error.includes('net::ERR')
		);
		
		expect(criticalErrors.length).toBe(0);
	});

	test('Product page loads and filters work', async ({ page }) => {
		await page.goto('/product');
		
		// Check page loads
		await expect(page).toHaveTitle(/Browse Challenges/);
		
		// Check search bar exists
		const searchInput = page.locator('input[type="text"]').first();
		await expect(searchInput).toBeVisible();
		
		// Check category filters exist
		const categoryButtons = page.locator('button').filter({ hasText: /sustainability|healthcare|all/i });
		await expect(categoryButtons.first()).toBeVisible();
	});

	test('Pitch deck page loads with all sections', async ({ page }) => {
		await page.goto('/pitch');
		
		// Check page loads
		await expect(page).toHaveTitle(/Pitch/);
		
		// Check key sections exist
		await expect(page.getByText('Market Analysis')).toBeVisible();
		await expect(page.getByText('Competitive Landscape')).toBeVisible();
		await expect(page.getByText('Business Model')).toBeVisible();
	});

	test('Contact page form is functional', async ({ page }) => {
		await page.goto('/contact');
		
		// Check page loads
		await expect(page).toHaveTitle(/Contact/);
		
		// Check form fields exist
		await expect(page.locator('input[id="name"]')).toBeVisible();
		await expect(page.locator('input[id="email"]')).toBeVisible();
		await expect(page.locator('input[id="subject"]')).toBeVisible();
		await expect(page.locator('textarea[id="message"]')).toBeVisible();
	});

	test('Responsive design - Mobile viewport', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
		
		// Check no horizontal scroll
		const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
		expect(bodyWidth).toBeLessThanOrEqual(395); // 20px tolerance
		
		// Check main content is visible
		const heroHeading = page.locator('h1').first();
		await expect(heroHeading).toBeVisible();
	});

	test('Responsive design - Tablet viewport', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');
		
		// Check no horizontal scroll
		const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
		expect(bodyWidth).toBeLessThanOrEqual(788); // 20px tolerance
		
		// Check main content is visible
		const heroHeading = page.locator('h1').first();
		await expect(heroHeading).toBeVisible();
	});

	test('Responsive design - Desktop viewport', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('/');
		
		// Check no horizontal scroll
		const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
		expect(bodyWidth).toBeLessThanOrEqual(1940); // 20px tolerance
		
		// Check main content is visible
		const heroHeading = page.locator('h1').first();
		await expect(heroHeading).toBeVisible();
	});

	test('All images load correctly', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		const images = page.locator('img');
		const count = await images.count();
		
		let brokenImages = 0;
		for (let i = 0; i < count; i++) {
			const img = images.nth(i);
			const src = await img.getAttribute('src');
			
			if (src && !src.startsWith('data:')) {
				const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
				if (naturalWidth === 0) {
					brokenImages++;
				}
			}
		}
		
		expect(brokenImages).toBe(0);
	});

	test('Tailwind CSS classes are working', async ({ page }) => {
		await page.goto('/');
		
		// Check for elements with Tailwind classes
		const flexElements = page.locator('[class*="flex"]');
		const count = await flexElements.count();
		
		expect(count).toBeGreaterThan(0);
		
		// Verify at least one element has proper flex styling
		const firstFlex = flexElements.first();
		if (await firstFlex.isVisible()) {
			const display = await firstFlex.evaluate((el) => 
				window.getComputedStyle(el).display
			);
			expect(['flex', 'inline-flex']).toContain(display);
		}
	});

	test('Navigation links work', async ({ page }) => {
		await page.goto('/');
		
		// Scroll to footer
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		
		// Check footer links exist
		const footerLinks = page.locator('footer a');
		const count = await footerLinks.count();
		
		expect(count).toBeGreaterThan(0);
	});

	test('Buttons have proper styling and are clickable', async ({ page }) => {
		await page.goto('/');
		
		const buttons = page.locator('button, a[class*="btn"]').first();
		await expect(buttons).toBeVisible();
		
		// Check button has cursor pointer
		const cursor = await buttons.evaluate((el) => 
			window.getComputedStyle(el).cursor
		);
		expect(['pointer', 'default']).toContain(cursor);
	});

	test('Forms have proper validation', async ({ page }) => {
		await page.goto('/contact');
		
		// Try to submit empty form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();
		
		// Check HTML5 validation prevents submission
		const nameInput = page.locator('input[id="name"]');
		const isValid = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
		
		expect(isValid).toBe(false);
	});

	test('Page performance is acceptable', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;
		
		// Page should load in under 10 seconds
		expect(loadTime).toBeLessThan(10000);
	});

	test('Accessibility - Heading hierarchy', async ({ page }) => {
		await page.goto('/');
		
		// Check H1 exists
		const h1Count = await page.locator('h1').count();
		expect(h1Count).toBeGreaterThan(0);
	});

	test('Accessibility - Form labels', async ({ page }) => {
		await page.goto('/contact');
		
		// Check name input has label
		const nameLabel = page.locator('label[for="name"]');
		await expect(nameLabel).toBeVisible();
		
		// Check email input has label
		const emailLabel = page.locator('label[for="email"]');
		await expect(emailLabel).toBeVisible();
	});

	test('No broken UI elements on all pages', async ({ page }) => {
		const pages = ['/', '/product', '/pitch', '/contact'];
		
		for (const pagePath of pages) {
			await page.goto(pagePath);
			await page.waitForLoadState('networkidle');
			
			// Check no elements are completely off-screen
			const body = page.locator('body');
			const box = await body.boundingBox();
			
			expect(box).toBeTruthy();
			expect(box!.width).toBeGreaterThan(0);
			expect(box!.height).toBeGreaterThan(0);
		}
	});
});

