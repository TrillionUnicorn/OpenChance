import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/contact');
	});

	test('should load contact page', async ({ page }) => {
		await expect(page).toHaveTitle(/Contact/);
		await expect(page.getByText('Get in Touch')).toBeVisible();
	});

	test('should display contact form', async ({ page }) => {
		await expect(page.getByLabel(/name/i)).toBeVisible();
		await expect(page.getByLabel(/email/i)).toBeVisible();
		await expect(page.getByLabel(/subject/i)).toBeVisible();
		await expect(page.getByLabel(/message/i)).toBeVisible();
	});

	test('should display contact information', async ({ page }) => {
		await expect(page.getByText('Contact Information')).toBeVisible();
		await expect(page.getByText(/email/i)).toBeVisible();
	});

	test('should display response time information', async ({ page }) => {
		await expect(page.getByText('Response Time')).toBeVisible();
	});

	test('should display office hours', async ({ page }) => {
		await expect(page.getByText('Office Hours')).toBeVisible();
	});

	test('should validate email format', async ({ page }) => {
		// Fill form with invalid email
		await page.fill('input[id="name"]', 'Test User');
		await page.fill('input[id="email"]', 'invalid-email');
		await page.fill('input[id="subject"]', 'Test Subject');
		await page.fill('textarea[id="message"]', 'Test message content');
		
		// Submit form
		await page.click('button[type="submit"]');
		
		// Check for error message
		await expect(page.getByText(/valid email/i)).toBeVisible({ timeout: 3000 });
	});

	test('should submit contact form successfully', async ({ page }) => {
		// Fill form with valid data
		await page.fill('input[id="name"]', 'Test User');
		await page.fill('input[id="email"]', 'test@example.com');
		await page.fill('input[id="subject"]', 'Test Subject');
		await page.fill('textarea[id="message"]', 'This is a test message with enough content to pass validation.');
		
		// Submit form
		await page.click('button[type="submit"]');
		
		// Check for success message
		await expect(page.getByText(/Message Sent/i)).toBeVisible({ timeout: 5000 });
	});

	test('should require all fields', async ({ page }) => {
		// Try to submit empty form
		await page.click('button[type="submit"]');
		
		// HTML5 validation should prevent submission
		const nameInput = page.locator('input[id="name"]');
		const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
		expect(isInvalid).toBeTruthy();
	});

	test('should have social media links', async ({ page }) => {
		// Check for social links in contact info
		const links = page.locator('a[target="_blank"]');
		const count = await links.count();
		expect(count).toBeGreaterThan(0);
	});

	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		
		await expect(page.getByText('Get in Touch')).toBeVisible();
		await expect(page.getByLabel(/name/i)).toBeVisible();
	});

	test('should be responsive on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		
		await expect(page.getByText('Get in Touch')).toBeVisible();
		await expect(page.getByLabel(/email/i)).toBeVisible();
	});
});

