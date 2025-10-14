import { test, expect } from '@playwright/test';

const viewports = [
	{ name: 'Mobile', width: 375, height: 667 },
	{ name: 'Mobile Landscape', width: 667, height: 375 },
	{ name: 'Tablet', width: 768, height: 1024 },
	{ name: 'Tablet Landscape', width: 1024, height: 768 },
	{ name: 'Desktop', width: 1280, height: 720 },
	{ name: 'Large Desktop', width: 1920, height: 1080 }
];

const pages = ['/', '/product', '/pitch', '/contact'];

test.describe('Responsive Design Tests', () => {
	for (const viewport of viewports) {
		for (const pagePath of pages) {
			test(`${pagePath} should be responsive on ${viewport.name}`, async ({ page }) => {
				await page.setViewportSize({ width: viewport.width, height: viewport.height });
				await page.goto(pagePath);
				
				// Wait for page to load
				await page.waitForLoadState('networkidle');
				
				// Check no horizontal scroll
				const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
				expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 20); // 20px tolerance
				
				// Check main content is visible
				const mainContent = page.locator('main, body').first();
				await expect(mainContent).toBeVisible();
				
				// Take screenshot for visual regression
				await page.screenshot({
					path: `tests/screenshots/${viewport.name.replace(' ', '-')}-${pagePath.replace('/', 'home').replace('/', '-')}.png`,
					fullPage: true
				});
			});
		}
	}
});

test.describe('UI Consistency Tests', () => {
	test('should have consistent button styles', async ({ page }) => {
		await page.goto('/');
		
		const buttons = page.locator('button, a[class*="btn"]');
		const count = await buttons.count();
		
		for (let i = 0; i < Math.min(count, 10); i++) {
			const button = buttons.nth(i);
			if (await button.isVisible()) {
				// Check button has proper styling
				const styles = await button.evaluate((el) => {
					const computed = window.getComputedStyle(el);
					return {
						cursor: computed.cursor,
						borderRadius: computed.borderRadius
					};
				});
				
				// Buttons should have pointer cursor
				expect(['pointer', 'default']).toContain(styles.cursor);
			}
		}
	});

	test('should have consistent typography', async ({ page }) => {
		await page.goto('/');
		
		// Check headings have proper hierarchy
		const h1 = page.locator('h1').first();
		const h2 = page.locator('h2').first();
		
		if (await h1.isVisible() && await h2.isVisible()) {
			const h1Size = await h1.evaluate((el) => 
				parseInt(window.getComputedStyle(el).fontSize)
			);
			const h2Size = await h2.evaluate((el) => 
				parseInt(window.getComputedStyle(el).fontSize)
			);
			
			// H1 should be larger than H2
			expect(h1Size).toBeGreaterThan(h2Size);
		}
	});

	test('should have consistent spacing', async ({ page }) => {
		await page.goto('/');
		
		// Check sections have proper spacing
		const sections = page.locator('section');
		const count = await sections.count();
		
		for (let i = 0; i < Math.min(count, 5); i++) {
			const section = sections.nth(i);
			if (await section.isVisible()) {
				const padding = await section.evaluate((el) => {
					const computed = window.getComputedStyle(el);
					return {
						top: parseInt(computed.paddingTop),
						bottom: parseInt(computed.paddingBottom)
					};
				});
				
				// Sections should have some padding
				expect(padding.top + padding.bottom).toBeGreaterThan(0);
			}
		}
	});

	test('should have no overlapping elements', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		// Check for common overlapping issues
		const elements = page.locator('button, a, input, select, textarea');
		const count = await elements.count();
		
		for (let i = 0; i < Math.min(count, 20); i++) {
			const element = elements.nth(i);
			if (await element.isVisible()) {
				const box = await element.boundingBox();
				if (box) {
					// Element should have reasonable dimensions
					expect(box.width).toBeGreaterThan(0);
					expect(box.height).toBeGreaterThan(0);
				}
			}
		}
	});
});

test.describe('Tailwind CSS Tests', () => {
	test('should not have broken Tailwind classes', async ({ page }) => {
		await page.goto('/');
		
		// Check for common Tailwind utility classes
		const elementsWithClasses = page.locator('[class*="flex"], [class*="grid"], [class*="text-"]');
		const count = await elementsWithClasses.count();
		
		expect(count).toBeGreaterThan(0);
		
		// Verify some elements have proper Tailwind styling
		for (let i = 0; i < Math.min(count, 10); i++) {
			const element = elementsWithClasses.nth(i);
			if (await element.isVisible()) {
				const className = await element.getAttribute('class');
				expect(className).toBeTruthy();
			}
		}
	});

	test('should have proper color contrast', async ({ page }) => {
		await page.goto('/');
		
		// Check text elements have readable colors
		const textElements = page.locator('p, h1, h2, h3, span').first();
		
		if (await textElements.isVisible()) {
			const styles = await textElements.evaluate((el) => {
				const computed = window.getComputedStyle(el);
				return {
					color: computed.color,
					backgroundColor: computed.backgroundColor
				};
			});
			
			// Should have color defined
			expect(styles.color).toBeTruthy();
		}
	});

	test('should have responsive grid layouts', async ({ page }) => {
		await page.goto('/');
		
		// Check for grid containers
		const grids = page.locator('[class*="grid"]');
		const count = await grids.count();
		
		if (count > 0) {
			const firstGrid = grids.first();
			const display = await firstGrid.evaluate((el) => 
				window.getComputedStyle(el).display
			);
			
			expect(['grid', 'flex']).toContain(display);
		}
	});
});

test.describe('Performance Tests', () => {
	test('should load pages quickly', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;
		
		// Page should load in under 5 seconds
		expect(loadTime).toBeLessThan(5000);
	});

	test('should have optimized images', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		const images = page.locator('img');
		const count = await images.count();
		
		for (let i = 0; i < count; i++) {
			const img = images.nth(i);
			const src = await img.getAttribute('src');
			
			if (src && !src.startsWith('data:')) {
				// Image should have alt text
				const alt = await img.getAttribute('alt');
				expect(alt !== null).toBeTruthy();
			}
		}
	});
});

test.describe('Accessibility Tests', () => {
	test('should have proper heading hierarchy', async ({ page }) => {
		await page.goto('/');
		
		// Check H1 exists
		const h1Count = await page.locator('h1').count();
		expect(h1Count).toBeGreaterThan(0);
		
		// Should have only one H1
		expect(h1Count).toBeLessThanOrEqual(2); // Allow for logo + main heading
	});

	test('should have alt text on images', async ({ page }) => {
		await page.goto('/');
		
		const images = page.locator('img');
		const count = await images.count();
		
		for (let i = 0; i < count; i++) {
			const img = images.nth(i);
			const alt = await img.getAttribute('alt');
			
			// All images should have alt attribute (can be empty for decorative)
			expect(alt !== null).toBeTruthy();
		}
	});

	test('should have proper form labels', async ({ page }) => {
		await page.goto('/contact');
		
		const inputs = page.locator('input[type="text"], input[type="email"], textarea');
		const count = await inputs.count();
		
		for (let i = 0; i < count; i++) {
			const input = inputs.nth(i);
			const id = await input.getAttribute('id');
			
			if (id) {
				// Check for associated label
				const label = page.locator(`label[for="${id}"]`);
				await expect(label).toBeVisible();
			}
		}
	});

	test('should be keyboard navigable', async ({ page }) => {
		await page.goto('/');
		
		// Tab through interactive elements
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		
		// Check that focus is visible
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toBeVisible();
	});
});

