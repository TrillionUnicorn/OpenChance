# 🚀 Deployment Guide - OpenChance Production

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Meilisearch
- Stripe Account
- Clerk Account

---

## Environment Variables

### Backend API (.env)

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/openchance

# Redis
REDIS_URL=redis://host:6379

# Meilisearch
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=your_api_key

# Clerk
CLERK_SECRET_KEY=sk_live_xxxxx
CLERK_PUBLISHABLE_KEY=pk_live_xxxxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App
PORT=3001
NODE_ENV=production
```

### Frontend Web (.env)

```bash
# API
VITE_API_URL=https://api.openchance.com
VITE_WS_URL=wss://api.openchance.com

# Clerk
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

---

## Deployment Steps

### 1. Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### 2. Build Application

```bash
# Install dependencies
npm install

# Build all packages
npm run build
```

### 3. Start Services

```bash
# Start API server
cd apps/api
npm start

# Start web server
cd apps/web
npm run preview
```

---

## Production Deployment Options

### Option 1: Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd apps/web
vercel --prod
```

### Option 2: Railway (Recommended for Backend)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy backend
cd apps/api
railway up
```

### Option 3: Docker

```bash
# Build Docker images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d
```

---

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
# Install Sentry
npm install @sentry/node @sentry/svelte

# Configure in apps/api/src/index.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### PostHog (Analytics)

```bash
# Install PostHog
npm install posthog-js

# Configure in apps/web/src/app.html
```

### Axiom (Logging)

```bash
# Install Axiom
npm install @axiomhq/js

# Configure logging
```

---

## Health Checks

### API Health Check

```bash
GET /health
Response: { "status": "ok", "timestamp": "..." }
```

### Database Health Check

```bash
GET /health/db
Response: { "status": "ok", "connected": true }
```

---

## Scaling

### Horizontal Scaling

- Deploy multiple API instances behind load balancer
- Use Redis for session storage
- WebSocket clustering with Redis adapter

### Database Scaling

- Read replicas for read-heavy operations
- Connection pooling (already configured)
- Database indexing (already implemented)

---

## Security Checklist

- [x] HTTPS enabled
- [x] Environment variables secured
- [x] Rate limiting enabled
- [x] CORS configured
- [x] Input validation
- [x] SQL injection prevention
- [x] XSS prevention
- [x] CSRF protection

---

## Backup & Recovery

### Database Backups

```bash
# Automated daily backups
pg_dump openchance > backup_$(date +%Y%m%d).sql

# Restore from backup
psql openchance < backup_20250101.sql
```

### Redis Backups

```bash
# Enable AOF persistence
redis-cli CONFIG SET appendonly yes
```

---

## Performance Optimization

- [x] Database indexing
- [x] Redis caching
- [x] CDN for static assets
- [x] Image optimization
- [x] Code splitting
- [x] Lazy loading
- [x] Compression enabled

---

## Troubleshooting

### Common Issues

**Database Connection Failed:**
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

**Redis Connection Failed:**
```bash
# Check REDIS_URL
echo $REDIS_URL

# Test connection
redis-cli -u $REDIS_URL ping
```

**WebSocket Not Connecting:**
```bash
# Check CORS settings
# Verify WS_URL in frontend
# Check firewall rules
```

---

## Support

For deployment issues:
- Check logs: `npm run logs`
- Review documentation
- Contact: support@openchance.com

---

**Last Updated:** October 15, 2025  
**Version:** 1.0.0  
**Status:** Production Ready

