# Architecture Documentation

Complete architecture overview of OpenChance platform.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (SvelteKit)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │  Stores  │  │  Utils   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │ tRPC + WebSocket
┌────────────────────┴────────────────────────────────────────┐
│                      Backend API (Hono)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  tRPC    │  │WebSocket │  │Middleware│  │  Routes  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──────┐ ┌──▼────┐ ┌────▼─────┐
│  PostgreSQL  │ │ Redis │ │Meilisearch│
└──────────────┘ └───────┘ └──────────┘
```

---

## Technology Stack

### Frontend
- **Framework:** SvelteKit 2.0
- **Language:** TypeScript 5.3
- **Styling:** Tailwind CSS 3.3
- **API Client:** tRPC Client
- **Auth:** Clerk SvelteKit
- **Build Tool:** Vite 5.0

### Backend
- **Runtime:** Bun 1.0
- **Framework:** Hono 3.12
- **API:** tRPC 10.45
- **Language:** TypeScript 5.3
- **WebSocket:** ws 8.16

### Database & Storage
- **Primary DB:** PostgreSQL 15
- **ORM:** Drizzle ORM
- **Cache:** Redis 7
- **Search:** Meilisearch 1.5
- **File Storage:** AWS S3 (future)

### External Services
- **Auth:** Clerk
- **Payments:** Stripe
- **Email:** Resend (future)
- **AI:** OpenAI (future)

### DevOps
- **Testing:** Vitest + Playwright
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
- **Deployment:** Docker Compose

---

## Project Structure

```
PRODUCTION_1/
├── apps/
│   ├── api/                    # Backend API
│   │   ├── src/
│   │   │   ├── routes/         # tRPC routers
│   │   │   ├── middleware/     # Express middleware
│   │   │   ├── websocket/      # WebSocket server
│   │   │   └── index.ts        # Entry point
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── web/                    # Frontend SvelteKit
│       ├── src/
│       │   ├── routes/         # Pages & layouts
│       │   ├── lib/            # Utilities & clients
│       │   ├── app.html        # HTML template
│       │   └── app.css         # Global styles
│       ├── static/             # Static assets
│       ├── Dockerfile
│       └── package.json
│
├── packages/
│   ├── db/                     # Database package
│   │   ├── schema/             # Drizzle schema
│   │   ├── migrations/         # DB migrations
│   │   └── index.ts
│   │
│   ├── types/                  # Shared TypeScript types
│   │   └── index.ts
│   │
│   └── utils/                  # Shared utilities
│       └── index.ts
│
├── scripts/
│   ├── deploy.sh               # Deployment script
│   └── backup.sh               # Backup script
│
├── docs/                       # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── ENVIRONMENT_VARIABLES.md
│   ├── PERFORMANCE.md
│   ├── TESTING.md
│   └── TROUBLESHOOTING.md
│
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
│
├── docker-compose.yml          # Development
├── docker-compose.prod.yml     # Production
├── package.json                # Root package
└── README.md
```

---

## Data Flow

### 1. User Request Flow

```
User → Frontend → tRPC Client → Backend API → Database
                                      ↓
                                   Response
                                      ↓
User ← Frontend ← tRPC Client ← Backend API
```

### 2. Real-time Message Flow

```
User A → WebSocket Client → WebSocket Server → Redis Pub/Sub
                                                     ↓
User B ← WebSocket Client ← WebSocket Server ← Redis Pub/Sub
```

### 3. Payment Flow

```
User → Frontend → Stripe Checkout → Stripe API
                                         ↓
                                    Webhook
                                         ↓
Backend API → Update DB → Release Escrow → Payout
```

---

## API Architecture

### tRPC Routers

1. **Auth Router** - Authentication & registration
2. **User Router** - User management
3. **Challenge Router** - Challenge CRUD
4. **Application Router** - Application management
5. **Message Router** - Messaging system
6. **Payment Router** - Payment processing
7. **Review Router** - Review system
8. **Notification Router** - Notifications
9. **Search Router** - Search functionality
10. **Admin Router** - Admin operations

### Middleware Stack

```
Request
  ↓
CORS Middleware
  ↓
Rate Limiter
  ↓
Authentication
  ↓
Error Handler
  ↓
tRPC Handler
  ↓
Response
```

---

## Database Schema

### Core Tables

- **users** - User accounts
- **challenges** - Challenge posts
- **applications** - Challenge applications
- **messages** - Direct messages
- **payments** - Payment records
- **reviews** - User reviews
- **notifications** - User notifications

### Relationships

```
users (1) ─── (N) challenges
users (1) ─── (N) applications
users (1) ─── (N) messages
challenges (1) ─── (N) applications
challenges (1) ─── (1) payments
```

---

## Security Architecture

### Authentication
- Clerk handles user authentication
- JWT tokens for API requests
- Session management

### Authorization
- Role-based access control (RBAC)
- Resource-level permissions
- API endpoint protection

### Data Protection
- HTTPS encryption in transit
- Database encryption at rest
- Environment variable protection
- Input validation (Zod)
- SQL injection prevention (Drizzle ORM)
- XSS prevention
- CSRF protection

---

## Caching Strategy

### Redis Cache Layers

1. **User Data** - 1 hour TTL
2. **Challenge Lists** - 5 minutes TTL
3. **Search Results** - 10 minutes TTL
4. **Static Content** - 24 hours TTL

### Cache Invalidation

- On data update
- On user action
- Time-based expiration

---

## Scalability

### Horizontal Scaling

- Multiple API instances behind load balancer
- Redis for session storage
- WebSocket clustering with Redis adapter

### Database Scaling

- Read replicas for read-heavy operations
- Connection pooling
- Database indexing
- Query optimization

### CDN

- Static assets served via CDN
- Image optimization
- Edge caching

---

## Monitoring & Logging

### Metrics
- API response times
- Database query times
- Cache hit rates
- Error rates
- User engagement

### Tools
- **Sentry** - Error tracking
- **PostHog** - Analytics
- **Axiom** - Logging
- **Grafana** - Metrics visualization

---

## Deployment Architecture

### Development
```
Local Machine
  ↓
Docker Compose
  ├── PostgreSQL
  ├── Redis
  ├── Meilisearch
  ├── API
  └── Web
```

### Production
```
Load Balancer
  ↓
API Instances (N)
  ↓
Database Cluster
  ├── Primary
  └── Replicas (N)
```

---

## Future Enhancements

### Phase 2
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI-powered matching
- [ ] Video calls
- [ ] Multi-language support

### Phase 3
- [ ] Blockchain integration
- [ ] NFT rewards
- [ ] DAO governance
- [ ] Decentralized storage

---

**Last Updated:** October 15, 2025

