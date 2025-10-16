# 🚀 OpenChance PRODUCTION_1 - Modern Stack

**Stack:** SvelteKit 2 + Bun + PostgreSQL + tRPC  
**Architecture:** Monorepo with Turborepo  
**Status:** In Active Development

---

## 📋 OVERVIEW

This is PRODUCTION_1 - the modern, cutting-edge implementation of OpenChance using the latest technologies for maximum performance and developer experience.

**Key Technologies:**
- **Frontend:** SvelteKit 2, Tailwind CSS 3, TypeScript
- **Backend:** Bun, Hono, tRPC
- **Database:** PostgreSQL 16, Drizzle ORM
- **Cache:** Redis
- **Search:** Meilisearch
- **Auth:** Clerk
- **Payments:** Stripe
- **Email:** Resend (or MailHog for local dev)

---

## 🚀 QUICK START

### Prerequisites

- **Bun:** >= 1.0.0 ([Install Bun](https://bun.sh))
- **Docker:** >= 20.10.0 ([Install Docker](https://docs.docker.com/get-docker/))
- **Docker Compose:** >= 2.0.0 (included with Docker Desktop)

### Installation (5 minutes)

1. **Clone and navigate:**
   ```bash
   git clone https://github.com/TrillionUnicorn/OpenChance.git
   cd OpenChance/PRODUCTION/PRODUCTION_1
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   ```
   
   For local development, the default values work out of the box!  
   (Optional: Add API keys for Clerk, Stripe, etc. for full features)

4. **Start services:**
   ```bash
   docker-compose up -d
   ```

5. **Run migrations:**
   ```bash
   bun run db:migrate
   ```

6. **Start development:**
   ```bash
   bun run dev
   ```

7. **Open application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - MailHog (Email): http://localhost:8025
   - Drizzle Studio: `bun run db:studio`

---

## ✅ VERIFY INSTALLATION

### Check Services
```bash
docker-compose ps
```
All services should show "Up" status.

### Check Database
```bash
bun run db:studio
```
Opens Drizzle Studio at http://localhost:4983

### Check Application
Open http://localhost:3000 - you should see the homepage without errors.

---

## 📁 PROJECT STRUCTURE

```
PRODUCTION_1/
├── apps/
│   ├── web/                    # SvelteKit frontend
│   │   ├── src/
│   │   │   ├── routes/         # Pages
│   │   │   ├── lib/
│   │   │   │   ├── components/ # UI components
│   │   │   │   ├── stores/     # State management
│   │   │   │   └── trpc/       # tRPC client
│   │   │   └── app.html
│   │   └── package.json
│   │
│   └── api/                    # Bun + Hono backend
│       ├── src/
│       │   ├── routes/         # tRPC routers
│       │   ├── services/       # Business logic
│       │   ├── middleware/     # Middleware
│       │   └── index.ts        # Entry point
│       └── package.json
│
├── packages/
│   ├── db/                     # Database (Drizzle ORM)
│   │   ├── src/
│   │   │   ├── schema/         # Database schemas
│   │   │   ├── migrations/     # SQL migrations
│   │   │   └── index.ts
│   │   └── drizzle.config.ts
│   ├── ui/                     # Shared UI components
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utilities
│
├── docker-compose.yml          # Local services
├── .env.example                # Environment template
├── turbo.json                  # Turborepo config
└── README.md                   # This file
```

---

## 🛠️ DEVELOPMENT

### Available Scripts

**Root Level:**
- `bun run dev` - Start all apps in development
- `bun run build` - Build all apps
- `bun run test` - Run all tests
- `bun run lint` - Lint all code
- `bun run format` - Format code
- `bun run clean` - Clean build artifacts

**Database:**
- `bun run db:generate` - Generate migrations
- `bun run db:migrate` - Run migrations
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:seed` - Seed test data

### Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Run tests: `bun run test`
4. Commit: `git commit -m "feat: description"`
5. Push: `git push origin feature/name`
6. Create Pull Request

---

## 🧪 TESTING

```bash
# All tests
bun run test

# Unit tests
bun run test:unit

# Integration tests
bun run test:integration

# E2E tests
bun run test:e2e

# Coverage
bun run test:coverage
```

---

## 🔧 TROUBLESHOOTING

### Database Connection Issues

**Problem:** Can't connect to PostgreSQL

**Solution:**
```bash
# Check Docker
docker ps

# Check PostgreSQL
docker-compose ps postgres

# Restart
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Port Already in Use

**Problem:** Port 3000, 3001, 5432 in use

**Solution:**
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in .env
```

### Bun Not Found

**Problem:** Bun commands not working

**Solution:**
```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Add to PATH
export PATH="$HOME/.bun/bin:$PATH"

# Restart terminal
```

### Migration Errors

**Problem:** Database migration fails

**Solution:**
```bash
# Reset database
docker-compose down -v

# Start fresh
docker-compose up -d

# Run migrations
bun run db:migrate
```

---

## 📚 FEATURES

### Implemented ✅
- [x] Database schema (15+ tables)
- [x] Docker Compose setup
- [x] Environment configuration
- [x] Project structure

### In Progress 🔄
- [ ] Authentication (Clerk)
- [ ] User management
- [ ] Challenge CRUD
- [ ] Application system
- [ ] Messaging
- [ ] Payments
- [ ] Reviews
- [ ] Notifications

### Planned 📋
- [ ] AI matching
- [ ] Real-time features
- [ ] File uploads
- [ ] Search (Meilisearch)
- [ ] Email system
- [ ] Admin panel

---

## 🤝 CONTRIBUTING

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a Pull Request

---

## 📄 LICENSE

MIT License - see [LICENSE](../../LICENSE)

---

## 📞 SUPPORT

- **Issues:** [GitHub Issues](https://github.com/TrillionUnicorn/OpenChance/issues)
- **Email:** hello@openchance.com
- **Documentation:** [Full Docs](./docs/)

---

**Created By:** CTO Partner  
**Last Updated:** October 15, 2025  
**Version:** 1.0.0-alpha  
**Status:** Active Development

