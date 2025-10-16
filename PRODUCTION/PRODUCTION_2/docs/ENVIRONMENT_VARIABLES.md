# Environment Variables Documentation

Complete guide to all environment variables used in OpenChance.

---

## Backend API Variables

### Database
```bash
DATABASE_URL=postgresql://user:password@host:5432/openchance
# PostgreSQL connection string
# Format: postgresql://[user]:[password]@[host]:[port]/[database]
# Required: Yes
```

### Redis
```bash
REDIS_URL=redis://localhost:6379
# Redis connection string for caching and rate limiting
# Format: redis://[host]:[port]
# Required: Yes
```

### Meilisearch
```bash
MEILISEARCH_HOST=http://localhost:7700
# Meilisearch server URL
# Required: Yes

MEILISEARCH_API_KEY=masterKey
# Meilisearch API key
# Required: Yes
```

### Clerk Authentication
```bash
CLERK_SECRET_KEY=sk_test_xxxxx
# Clerk secret key for backend authentication
# Get from: https://dashboard.clerk.com
# Required: Yes

CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
# Clerk publishable key
# Get from: https://dashboard.clerk.com
# Required: Yes
```

### Stripe Payments
```bash
STRIPE_SECRET_KEY=sk_test_xxxxx
# Stripe secret key for payment processing
# Get from: https://dashboard.stripe.com
# Required: Yes

STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
# Stripe publishable key
# Get from: https://dashboard.stripe.com
# Required: Yes

STRIPE_WEBHOOK_SECRET=whsec_xxxxx
# Stripe webhook signing secret
# Get from: https://dashboard.stripe.com/webhooks
# Required: Yes (for production)
```

### Application Settings
```bash
NODE_ENV=development
# Environment: development | production | test
# Default: development

PORT=3001
# API server port
# Default: 3001

API_URL=http://localhost:3001
# Full API URL (used for webhooks, etc.)
# Default: http://localhost:3001
```

---

## Frontend Web Variables

### API Connection
```bash
VITE_API_URL=http://localhost:3001
# Backend API URL
# Required: Yes

VITE_WS_URL=ws://localhost:3001
# WebSocket server URL
# Required: Yes
```

### Authentication
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
# Clerk publishable key for frontend
# Get from: https://dashboard.clerk.com
# Required: Yes
```

### Payments
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
# Stripe publishable key for frontend
# Get from: https://dashboard.stripe.com
# Required: Yes
```

---

## Optional Variables

### Monitoring & Analytics

```bash
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
# Sentry error tracking
# Get from: https://sentry.io
# Required: No

POSTHOG_API_KEY=phc_xxxxx
# PostHog analytics
# Get from: https://posthog.com
# Required: No

AXIOM_TOKEN=xaat-xxxxx
# Axiom logging
# Get from: https://axiom.co
# Required: No
```

### Email (Future)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
# Email configuration for notifications
# Required: No (not implemented yet)
```

---

## Production Configuration

### Minimum Required for Production

**Backend:**
```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
MEILISEARCH_HOST=https://...
MEILISEARCH_API_KEY=...
CLERK_SECRET_KEY=sk_live_...
CLERK_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NODE_ENV=production
```

**Frontend:**
```bash
VITE_API_URL=https://api.openchance.com
VITE_WS_URL=wss://api.openchance.com
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## Docker Environment

When using Docker Compose, create a `.env` file in the root:

```bash
# PostgreSQL
POSTGRES_USER=openchance
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=openchance

# Redis
REDIS_PASSWORD=your-redis-password

# Meilisearch
MEILISEARCH_MASTER_KEY=your-master-key

# Application
DATABASE_URL=postgresql://openchance:your-secure-password@postgres:5432/openchance
REDIS_URL=redis://:your-redis-password@redis:6379
MEILISEARCH_HOST=http://meilisearch:7700
MEILISEARCH_API_KEY=your-master-key

# External Services
CLERK_SECRET_KEY=sk_live_...
CLERK_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# URLs
API_URL=https://api.openchance.com
WEB_URL=https://openchance.com
```

---

## Security Best Practices

1. **Never commit `.env` files to git**
   - Use `.env.example` as template
   - Add `.env` to `.gitignore`

2. **Use different keys for development and production**
   - Test keys: `sk_test_`, `pk_test_`
   - Live keys: `sk_live_`, `pk_live_`

3. **Rotate secrets regularly**
   - Change passwords every 90 days
   - Rotate API keys quarterly

4. **Use environment-specific values**
   - Development: localhost URLs
   - Production: HTTPS URLs

5. **Validate all environment variables on startup**
   - Check required variables exist
   - Validate format and values

---

## Troubleshooting

### "Environment variable not found"
- Check `.env` file exists
- Verify variable name spelling
- Restart development server

### "Invalid API key"
- Verify key is correct
- Check if using test vs live key
- Regenerate key if needed

### "Connection refused"
- Check service is running
- Verify URL and port
- Check firewall settings

---

**Last Updated:** October 15, 2025

