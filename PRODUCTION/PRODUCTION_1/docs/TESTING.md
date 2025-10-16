# Testing Guide

Comprehensive guide to testing OpenChance.

---

## Overview

OpenChance uses a multi-layered testing approach:
- **Unit Tests:** Test individual functions and components
- **Integration Tests:** Test API endpoints and database operations
- **E2E Tests:** Test complete user flows

---

## Test Stack

- **Vitest:** Unit and integration testing
- **Playwright:** End-to-end testing
- **Testing Library:** Component testing (future)

---

## Running Tests

### All Tests
```bash
npm run test
```

### Unit Tests Only
```bash
npm run test:api
```

### E2E Tests
```bash
npm run test:e2e
```

### With Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test -- --watch
```

### UI Mode
```bash
npm run test:e2e:ui
```

---

## Unit Tests

### Location
```
apps/api/src/__tests__/
```

### Example Test
```typescript
import { describe, it, expect } from 'vitest';
import { authRouter } from '../routes/auth';

describe('Auth Router', () => {
  it('should register a new user', async () => {
    // Arrange
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      userType: 'solver',
    };

    // Act
    const result = await authRouter.register(userData);

    // Assert
    expect(result).toBeDefined();
    expect(result.email).toBe(userData.email);
  });
});
```

### Writing Unit Tests

1. **Test file naming:** `*.test.ts`
2. **One test file per module**
3. **Use descriptive test names**
4. **Follow AAA pattern:** Arrange, Act, Assert

---

## Integration Tests

### Testing API Endpoints

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { db } from '@openchance/db';

describe('Challenge API', () => {
  beforeAll(async () => {
    // Setup test database
    await db.migrate.latest();
  });

  afterAll(async () => {
    // Cleanup
    await db.destroy();
  });

  it('should create a challenge', async () => {
    const challenge = await trpc.challenge.create.mutate({
      title: 'Test Challenge',
      description: 'Test description',
      category: 'technology',
      difficulty: 'intermediate',
      rewardType: 'fixed',
      rewardAmount: 100000,
    });

    expect(challenge).toBeDefined();
    expect(challenge.title).toBe('Test Challenge');
  });
});
```

---

## E2E Tests

### Location
```
apps/web/tests/e2e/
```

### Example E2E Test
```typescript
import { test, expect } from '@playwright/test';

test.describe('Challenge Flow', () => {
  test('should create and view a challenge', async ({ page }) => {
    // Navigate to create page
    await page.goto('/challenges/create');

    // Fill form
    await page.fill('[name="title"]', 'Test Challenge');
    await page.fill('[name="description"]', 'Test description');
    await page.selectOption('[name="category"]', 'technology');

    // Submit
    await page.click('button[type="submit"]');

    // Verify redirect
    await expect(page).toHaveURL(/\/challenges\/[a-z0-9-]+/);

    // Verify content
    await expect(page.locator('h1')).toContainText('Test Challenge');
  });
});
```

### Writing E2E Tests

1. **Test user flows, not implementation**
2. **Use data-testid for stable selectors**
3. **Test happy path and error cases**
4. **Keep tests independent**

---

## Test Coverage

### Target Coverage
- **Overall:** 80%+
- **Critical paths:** 90%+
- **Utilities:** 100%

### Viewing Coverage
```bash
npm run test:coverage
open coverage/index.html
```

---

## Mocking

### Mocking External Services

```typescript
import { vi } from 'vitest';

// Mock Stripe
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    paymentIntents: {
      create: vi.fn().mockResolvedValue({
        id: 'pi_test',
        client_secret: 'secret',
      }),
    },
  })),
}));

// Mock Clerk
vi.mock('@clerk/backend', () => ({
  clerkClient: {
    users: {
      getUser: vi.fn().mockResolvedValue({
        id: 'user_test',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      }),
    },
  },
}));
```

---

## Database Testing

### Test Database Setup

```typescript
import { beforeEach, afterEach } from 'vitest';
import { db } from '@openchance/db';

beforeEach(async () => {
  // Run migrations
  await db.migrate.latest();
  
  // Seed test data
  await db.seed.run();
});

afterEach(async () => {
  // Rollback migrations
  await db.migrate.rollback();
});
```

---

## Best Practices

### 1. Test Isolation
- Each test should be independent
- Clean up after tests
- Don't rely on test order

### 2. Test Data
- Use factories for test data
- Don't use production data
- Clean up test data

### 3. Assertions
- One assertion per test (when possible)
- Use specific assertions
- Test both success and failure

### 4. Performance
- Keep tests fast
- Use parallel execution
- Mock slow operations

### 5. Maintenance
- Keep tests simple
- Update tests with code
- Remove obsolete tests

---

## CI/CD Integration

Tests run automatically on:
- Every push
- Every pull request
- Before deployment

### GitHub Actions
```yaml
- name: Run tests
  run: npm run test

- name: Run E2E tests
  run: npm run test:e2e

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

---

## Debugging Tests

### Debug Single Test
```bash
npm run test -- --reporter=verbose challenge.test.ts
```

### Debug E2E Test
```bash
npm run test:e2e -- --debug
```

### VS Code Debugging
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test", "--", "--run"],
  "console": "integratedTerminal"
}
```

---

## Common Issues

### "Cannot find module"
- Check import paths
- Verify tsconfig paths
- Restart test runner

### "Database connection failed"
- Check DATABASE_URL
- Verify database is running
- Check migrations

### "Timeout exceeded"
- Increase timeout
- Check for infinite loops
- Mock slow operations

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Last Updated:** October 15, 2025

