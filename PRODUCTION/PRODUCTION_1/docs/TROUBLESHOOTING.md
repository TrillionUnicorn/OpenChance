# Troubleshooting Guide

Common issues and solutions for OpenChance.

---

## Installation Issues

### npm install fails

**Problem:** Dependencies fail to install

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Node version mismatch

**Problem:** "Unsupported engine" error

**Solution:**
```bash
# Check Node version
node --version

# Should be >= 20.0.0
# Install correct version using nvm
nvm install 20
nvm use 20
```

---

## Database Issues

### Connection failed

**Problem:** Cannot connect to PostgreSQL

**Solutions:**

1. **Check DATABASE_URL:**
```bash
echo $DATABASE_URL
# Should be: postgresql://user:password@host:5432/database
```

2. **Verify PostgreSQL is running:**
```bash
# Using Docker
docker-compose ps

# Or check service
pg_isready -h localhost -p 5432
```

3. **Test connection:**
```bash
psql $DATABASE_URL
```

### Migration fails

**Problem:** Database migration errors

**Solutions:**

1. **Reset database:**
```bash
npm run db:reset
```

2. **Check migration files:**
```bash
ls packages/db/migrations/
```

3. **Manual migration:**
```bash
cd packages/db
npm run migrate
```

---

## Redis Issues

### Redis connection failed

**Problem:** Cannot connect to Redis

**Solutions:**

1. **Check Redis is running:**
```bash
redis-cli ping
# Should return: PONG
```

2. **Verify REDIS_URL:**
```bash
echo $REDIS_URL
# Should be: redis://localhost:6379
```

3. **Start Redis:**
```bash
# Using Docker
docker-compose up -d redis

# Or locally
redis-server
```

---

## API Issues

### API not starting

**Problem:** API server fails to start

**Solutions:**

1. **Check port availability:**
```bash
lsof -i :3001
# Kill process if port is in use
kill -9 <PID>
```

2. **Check environment variables:**
```bash
cat .env
# Verify all required variables are set
```

3. **Check logs:**
```bash
cd apps/api
npm run dev
# Look for error messages
```

### tRPC errors

**Problem:** tRPC endpoint errors

**Solutions:**

1. **Verify API is running:**
```bash
curl http://localhost:3001/health
```

2. **Check CORS settings:**
```typescript
// apps/api/src/index.ts
cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
})
```

3. **Clear cache:**
```bash
# Clear Redis cache
redis-cli FLUSHALL
```

---

## Frontend Issues

### Frontend not loading

**Problem:** Web app doesn't load

**Solutions:**

1. **Check if dev server is running:**
```bash
cd apps/web
npm run dev
```

2. **Verify API connection:**
```bash
# Check VITE_API_URL in .env
echo $VITE_API_URL
```

3. **Clear build cache:**
```bash
rm -rf apps/web/.svelte-kit
npm run dev
```

### WebSocket not connecting

**Problem:** Real-time features not working

**Solutions:**

1. **Check WebSocket URL:**
```bash
echo $VITE_WS_URL
# Should be: ws://localhost:3001
```

2. **Verify WebSocket server:**
```bash
# Check API logs for WebSocket initialization
```

3. **Check firewall:**
```bash
# Ensure port 3001 is open
```

---

## Authentication Issues

### Clerk authentication fails

**Problem:** Cannot log in

**Solutions:**

1. **Verify Clerk keys:**
```bash
echo $CLERK_SECRET_KEY
echo $CLERK_PUBLISHABLE_KEY
```

2. **Check Clerk dashboard:**
- Verify application is active
- Check allowed domains
- Verify redirect URLs

3. **Clear cookies:**
```bash
# Clear browser cookies and try again
```

---

## Payment Issues

### Stripe integration fails

**Problem:** Payment processing errors

**Solutions:**

1. **Verify Stripe keys:**
```bash
echo $STRIPE_SECRET_KEY
echo $STRIPE_PUBLISHABLE_KEY
```

2. **Check Stripe dashboard:**
- Verify API keys are correct
- Check webhook configuration
- Verify test mode vs live mode

3. **Test webhook:**
```bash
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

---

## Docker Issues

### Docker build fails

**Problem:** Docker image build errors

**Solutions:**

1. **Clear Docker cache:**
```bash
docker system prune -a
```

2. **Rebuild images:**
```bash
docker-compose -f docker-compose.prod.yml build --no-cache
```

3. **Check Dockerfile:**
```bash
# Verify Dockerfile syntax
docker build -t test -f apps/api/Dockerfile .
```

### Container won't start

**Problem:** Docker container fails to start

**Solutions:**

1. **Check logs:**
```bash
docker-compose -f docker-compose.prod.yml logs api
```

2. **Verify environment variables:**
```bash
docker-compose -f docker-compose.prod.yml config
```

3. **Check health:**
```bash
docker-compose -f docker-compose.prod.yml ps
```

---

## Performance Issues

### Slow API responses

**Problem:** API is slow

**Solutions:**

1. **Check database queries:**
```bash
# Enable query logging
# Check for N+1 queries
```

2. **Verify Redis caching:**
```bash
redis-cli INFO stats
```

3. **Check database indexes:**
```bash
# Verify indexes are created
npm run db:studio
```

### High memory usage

**Problem:** Application uses too much memory

**Solutions:**

1. **Check for memory leaks:**
```bash
node --inspect apps/api/dist/index.js
```

2. **Limit connection pool:**
```typescript
// Adjust pool size in database config
```

3. **Monitor resources:**
```bash
docker stats
```

---

## Common Error Messages

### "EADDRINUSE: address already in use"

**Solution:**
```bash
# Find and kill process using the port
lsof -i :3001
kill -9 <PID>
```

### "Cannot find module"

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### "Database connection timeout"

**Solution:**
```bash
# Increase timeout in database config
# Check network connectivity
# Verify database is running
```

---

## Getting Help

If you can't resolve the issue:

1. **Check logs:**
```bash
# API logs
cd apps/api && npm run dev

# Docker logs
docker-compose logs -f
```

2. **Search issues:**
- GitHub Issues: https://github.com/TrillionUnicorn/OpenChance/issues

3. **Contact support:**
- Email: support@openchance.com
- Discord: [Join our server]

---

**Last Updated:** October 15, 2025

