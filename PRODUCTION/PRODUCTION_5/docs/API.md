# API Documentation

## Overview

OpenChance uses tRPC for type-safe API communication. All endpoints are automatically typed and validated.

**Base URL:** `http://localhost:3001/trpc`  
**Protocol:** HTTP/HTTPS  
**Format:** JSON

---

## Authentication

All protected endpoints require authentication via Clerk.

**Headers:**
```
Authorization: Bearer <clerk_session_token>
```

---

## API Routers

### 1. Auth Router (`auth`)

#### `auth.register`
Register a new user.

**Input:**
```typescript
{
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  userType: 'challenger' | 'solver' | 'both';
  bio?: string;
  company?: string;
  skills?: string[];
}
```

**Output:**
```typescript
{
  id: string;
  email: string;
  username: string;
  // ... user fields
}
```

#### `auth.getSession`
Get current user session.

**Output:**
```typescript
{
  user: User;
  session: Session;
}
```

---

### 2. Challenge Router (`challenge`)

#### `challenge.create`
Create a new challenge.

**Input:**
```typescript
{
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rewardType: 'fixed' | 'range' | 'equity';
  rewardAmount?: number;
  rewardMin?: number;
  rewardMax?: number;
  requirements?: string[];
  skills?: string[];
  deliverables?: string[];
  tags?: string[];
}
```

#### `challenge.list`
List challenges with filters.

**Input:**
```typescript
{
  page?: number;
  limit?: number;
  category?: string;
  difficulty?: string;
  status?: string;
  search?: string;
}
```

**Output:**
```typescript
{
  challenges: Challenge[];
  total: number;
  page: number;
  totalPages: number;
}
```

#### `challenge.getById`
Get challenge by ID.

**Input:**
```typescript
{
  id: string;
}
```

**Output:**
```typescript
Challenge
```

---

### 3. Application Router (`application`)

#### `application.submit`
Submit application to challenge.

**Input:**
```typescript
{
  challengeId: string;
  coverLetter: string;
  proposedSolution: string;
  timeline: string;
  proposedBudget?: number;
}
```

#### `application.list`
List user's applications.

**Input:**
```typescript
{
  status?: 'pending' | 'accepted' | 'rejected';
  page?: number;
  limit?: number;
}
```

---

### 4. Message Router (`message`)

#### `message.send`
Send a message.

**Input:**
```typescript
{
  conversationId: string;
  content: string;
}
```

#### `message.getConversations`
Get user's conversations.

**Output:**
```typescript
Conversation[]
```

#### `message.getMessages`
Get messages in conversation.

**Input:**
```typescript
{
  conversationId: string;
  limit?: number;
}
```

---

### 5. Payment Router (`payment`)

#### `payment.createIntent`
Create Stripe payment intent.

**Input:**
```typescript
{
  challengeId: string;
  amount: number;
}
```

**Output:**
```typescript
{
  clientSecret: string;
  paymentIntentId: string;
}
```

#### `payment.confirmPayment`
Confirm payment and hold in escrow.

**Input:**
```typescript
{
  paymentIntentId: string;
}
```

---

### 6. Review Router (`review`)

#### `review.submit`
Submit a review.

**Input:**
```typescript
{
  revieweeId: string;
  challengeId: string;
  rating: number; // 1-5
  comment: string;
}
```

#### `review.getReviews`
Get reviews for a user.

**Input:**
```typescript
{
  userId: string;
  page?: number;
  limit?: number;
}
```

---

### 7. Notification Router (`notification`)

#### `notification.list`
List user notifications.

**Input:**
```typescript
{
  unreadOnly?: boolean;
  limit?: number;
}
```

#### `notification.markAsRead`
Mark notification as read.

**Input:**
```typescript
{
  notificationId: string;
}
```

---

### 8. Search Router (`search`)

#### `search.challenges`
Search challenges using Meilisearch.

**Input:**
```typescript
{
  query: string;
  filters?: {
    category?: string;
    difficulty?: string;
  };
  limit?: number;
}
```

#### `search.autocomplete`
Get search suggestions.

**Input:**
```typescript
{
  query: string;
  limit?: number;
}
```

---

### 9. Admin Router (`admin`)

#### `admin.getStats`
Get platform statistics.

**Output:**
```typescript
{
  totalUsers: number;
  totalChallenges: number;
  totalRevenue: number;
  // ... more stats
}
```

#### `admin.moderateReview`
Moderate a flagged review.

**Input:**
```typescript
{
  reviewId: string;
  status: 'approved' | 'rejected' | 'hidden';
}
```

---

## Error Handling

All errors follow this format:

```typescript
{
  code: string;
  message: string;
  details?: any;
}
```

**Common Error Codes:**
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `BAD_REQUEST` - Invalid input
- `INTERNAL_SERVER_ERROR` - Server error

---

## Rate Limiting

- **Default:** 100 requests per 15 minutes
- **Authenticated:** 1000 requests per 15 minutes
- **Admin:** Unlimited

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1634567890
```

---

## WebSocket Events

**Connection:** `ws://localhost:3001`

**Events:**
- `new-message` - New message received
- `typing` - User is typing
- `notification` - New notification
- `challenge-update` - Challenge status changed

---

## Examples

### Using tRPC Client (TypeScript)

```typescript
import { trpc } from './lib/trpc';

// Create challenge
const challenge = await trpc.challenge.create.mutate({
  title: 'Build a Mobile App',
  description: 'Need a mobile app...',
  category: 'technology',
  difficulty: 'intermediate',
  rewardType: 'fixed',
  rewardAmount: 500000,
});

// List challenges
const { challenges } = await trpc.challenge.list.query({
  page: 1,
  limit: 10,
  category: 'technology',
});

// Send message
await trpc.message.send.mutate({
  conversationId: 'conv_123',
  content: 'Hello!',
});
```

---

For more details, see the [tRPC documentation](https://trpc.io/).

