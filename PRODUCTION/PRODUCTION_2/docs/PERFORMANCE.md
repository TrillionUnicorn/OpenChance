# Performance Optimization Guide

Guide to optimizing OpenChance for maximum performance.

---

## Performance Targets

- **API Response Time:** < 200ms (p95)
- **Page Load Time:** < 2s (p95)
- **Time to Interactive:** < 3s
- **Database Queries:** < 50ms (p95)
- **WebSocket Latency:** < 100ms

---

## Database Optimization

### 1. Indexing

**Implemented Indexes:**
```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_clerk_id ON users(clerk_id);

-- Challenges
CREATE INDEX idx_challenges_status ON challenges(status);
CREATE INDEX idx_challenges_category ON challenges(category);
CREATE INDEX idx_challenges_created_at ON challenges(created_at);

-- Applications
CREATE INDEX idx_applications_challenge_id ON applications(challenge_id);
CREATE INDEX idx_applications_solver_id ON applications(solver_id);
CREATE INDEX idx_applications_status ON applications(status);
```

### 2. Query Optimization

**Use SELECT specific columns:**
```typescript
// ❌ Bad
const users = await db.select().from(users);

// ✅ Good
const users = await db
  .select({
    id: users.id,
    email: users.email,
    firstName: users.firstName,
  })
  .from(users);
```

**Use pagination:**
```typescript
// ✅ Always paginate
const challenges = await db
  .select()
  .from(challenges)
  .limit(20)
  .offset(page * 20);
```

**Avoid N+1 queries:**
```typescript
// ❌ Bad - N+1 query
for (const challenge of challenges) {
  const applications = await db
    .select()
    .from(applications)
    .where(eq(applications.challengeId, challenge.id));
}

// ✅ Good - Single query with join
const challengesWithApplications = await db
  .select()
  .from(challenges)
  .leftJoin(applications, eq(challenges.id, applications.challengeId));
```

### 3. Connection Pooling

**Already configured:**
```typescript
// packages/db/index.ts
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

---

## Caching Strategy

### 1. Redis Caching

**Cache frequently accessed data:**
```typescript
// Cache user data
const cacheKey = `user:${userId}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const user = await db.query.users.findFirst({
  where: eq(users.id, userId),
});

await redis.setex(cacheKey, 3600, JSON.stringify(user)); // 1 hour
return user;
```

**Cache patterns:**
- User profiles: 1 hour
- Challenge lists: 5 minutes
- Search results: 10 minutes
- Static content: 24 hours

### 2. HTTP Caching

**Set cache headers:**
```typescript
// Static assets
res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

// API responses
res.setHeader('Cache-Control', 'private, max-age=300'); // 5 minutes
```

---

## API Optimization

### 1. Response Compression

**Already enabled:**
```typescript
// apps/api/src/index.ts
app.use(compress());
```

### 2. Rate Limiting

**Prevents abuse:**
```typescript
// apps/api/src/middleware/rate-limiter.ts
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
});
```

### 3. Batch Requests

**Use tRPC batching:**
```typescript
// Frontend automatically batches requests
const [user, challenges, notifications] = await Promise.all([
  trpc.user.getProfile.query(),
  trpc.challenge.list.query(),
  trpc.notification.list.query(),
]);
```

---

## Frontend Optimization

### 1. Code Splitting

**Lazy load routes:**
```typescript
// Automatic with SvelteKit
const ChallengeDetail = () => import('./routes/challenges/[id]/+page.svelte');
```

### 2. Image Optimization

**Use optimized images:**
```html
<!-- Use WebP format -->
<img src="/images/hero.webp" alt="Hero" loading="lazy" />

<!-- Responsive images -->
<img
  srcset="
    /images/hero-320.webp 320w,
    /images/hero-640.webp 640w,
    /images/hero-1280.webp 1280w
  "
  sizes="(max-width: 640px) 320px, (max-width: 1280px) 640px, 1280px"
  src="/images/hero-1280.webp"
  alt="Hero"
/>
```

### 3. Bundle Size

**Monitor bundle size:**
```bash
npm run build
# Check .svelte-kit/output/client/_app/immutable/
```

**Optimize imports:**
```typescript
// ❌ Bad - imports entire library
import _ from 'lodash';

// ✅ Good - imports only what's needed
import debounce from 'lodash/debounce';
```

---

## WebSocket Optimization

### 1. Connection Management

**Reuse connections:**
```typescript
// Single WebSocket connection per client
const ws = new WebSocket(WS_URL);

// Reconnect on disconnect
ws.onclose = () => {
  setTimeout(() => connect(), 1000);
};
```

### 2. Message Batching

**Batch updates:**
```typescript
// Batch typing indicators
const debouncedTyping = debounce(() => {
  ws.send(JSON.stringify({ type: 'typing', conversationId }));
}, 300);
```

---

## Search Optimization

### 1. Meilisearch Configuration

**Optimized settings:**
```typescript
await meili.index('challenges').updateSettings({
  searchableAttributes: ['title', 'description', 'tags'],
  filterableAttributes: ['category', 'difficulty', 'status'],
  sortableAttributes: ['createdAt', 'rewardAmount'],
  rankingRules: [
    'words',
    'typo',
    'proximity',
    'attribute',
    'sort',
    'exactness',
  ],
});
```

### 2. Search Debouncing

**Debounce search input:**
```typescript
const debouncedSearch = debounce(async (query) => {
  const results = await trpc.search.challenges.query({ query });
  setResults(results);
}, 300);
```

---

## Monitoring

### 1. Performance Metrics

**Track key metrics:**
- API response times
- Database query times
- Cache hit rates
- Error rates
- User engagement

### 2. Tools

**Recommended tools:**
- **Sentry:** Error tracking
- **PostHog:** Analytics
- **Axiom:** Logging
- **Grafana:** Metrics visualization

---

## Performance Checklist

### Backend
- [x] Database indexes created
- [x] Connection pooling configured
- [x] Redis caching implemented
- [x] Rate limiting enabled
- [x] Response compression enabled
- [x] Query optimization
- [x] N+1 queries eliminated

### Frontend
- [x] Code splitting enabled
- [x] Lazy loading implemented
- [x] Images optimized
- [x] Bundle size monitored
- [x] HTTP caching configured
- [x] Service worker (future)

### Infrastructure
- [x] CDN for static assets (future)
- [x] Load balancing (future)
- [x] Auto-scaling (future)
- [x] Database read replicas (future)

---

## Benchmarking

### API Benchmarks
```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:3001/health

# Using autocannon
npx autocannon -c 10 -d 10 http://localhost:3001/trpc/challenge.list
```

### Database Benchmarks
```sql
-- Explain query plan
EXPLAIN ANALYZE
SELECT * FROM challenges
WHERE status = 'open'
ORDER BY created_at DESC
LIMIT 20;
```

---

## Common Performance Issues

### Slow Database Queries
- Add missing indexes
- Optimize query structure
- Use pagination
- Cache results

### High Memory Usage
- Limit result set size
- Use streaming for large data
- Clear unused cache
- Monitor connection pool

### Slow Page Loads
- Optimize images
- Reduce bundle size
- Enable compression
- Use CDN

---

**Last Updated:** October 15, 2025

