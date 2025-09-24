# 🛠️ OpenChance Development Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **pnpm** 8+
- **Git** for version control
- **VS Code** (recommended) with Svelte extension

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/TrillionUnicorn/OpenChance.git
cd OpenChance

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:5178
```

---

## 🏗️ Project Architecture

### Tech Stack
- **Frontend**: SvelteKit 2 + Svelte 5 (Runes)
- **Styling**: Tailwind CSS + shadcn-svelte
- **TypeScript**: Full type safety
- **Build Tool**: Vite 6
- **Testing**: Vitest + Playwright
- **AI Matching**: Custom recommendation algorithms
- **Collaboration**: Real-time WebSocket connections

### Folder Structure
```
OpenChance/
├── src/
│   ├── lib/
│   │   ├── components/          # Reusable UI components
│   │   ├── stores/             # Svelte stores (state management)
│   │   ├── utils/              # Utility functions
│   │   ├── matching/           # Challenge-solver matching algorithms
│   │   ├── collaboration/      # Real-time collaboration tools
│   │   └── types/              # TypeScript type definitions
│   ├── routes/                 # SvelteKit routes
│   ├── app.html               # HTML template
│   └── app.css                # Global styles
├── static/                    # Static assets
├── tests/                     # Test files
└── docs/                      # Documentation
```

---

## 🎯 Challenge System Implementation

### Challenge Management Engine
```typescript
// Example challenge system implementation
interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: DifficultyLevel;
  reward: RewardStructure;
  requirements: Requirements;
  deadline: Date;
  status: ChallengeStatus;
}

class ChallengeEngine {
  async createChallenge(challenge: CreateChallengeRequest): Promise<Challenge> {
    // Implementation details in /src/lib/challenges/engine.ts
    const validatedChallenge = await this.validateChallenge(challenge);
    const enrichedChallenge = await this.enrichWithAI(validatedChallenge);

    return this.saveChallenge(enrichedChallenge);
  }

  async matchSolvers(challengeId: string): Promise<SolverMatch[]> {
    const challenge = await this.getChallenge(challengeId);
    const potentialSolvers = await this.findPotentialSolvers(challenge);

    return this.rankSolversByFit(potentialSolvers, challenge);
  }
}
```

### Solver Matching Algorithm
```typescript
// Solver matching system
interface SolverProfile {
  id: string;
  expertise: ExpertiseArea[];
  experience: ExperienceLevel;
  successRate: number;
  availability: AvailabilitySchedule;
  preferredRewards: RewardRange;
  collaborationStyle: CollaborationPreference;
}

class SolverMatchingEngine {
  async findOptimalSolvers(
    challenge: Challenge,
    maxSolvers: number = 10
  ): Promise<SolverMatch[]> {
    // Advanced matching algorithm considering:
    // - Expertise alignment with challenge requirements
    // - Historical success rate in similar challenges
    // - Availability during challenge timeline
    // - Reward expectations vs challenge budget
    // - Collaboration compatibility for team challenges

    const candidates = await this.getCandidateSolvers(challenge);
    const scoredCandidates = candidates.map(solver => ({
      solver,
      score: this.calculateMatchScore(solver, challenge)
    }));

    return scoredCandidates
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSolvers);
  }

  private calculateMatchScore(solver: SolverProfile, challenge: Challenge): number {
    const expertiseScore = this.calculateExpertiseAlignment(solver.expertise, challenge.requirements);
    const experienceScore = this.calculateExperienceMatch(solver.experience, challenge.difficulty);
    const successScore = solver.successRate;
    const availabilityScore = this.calculateAvailabilityMatch(solver.availability, challenge.deadline);

    return (expertiseScore * 0.4) + (experienceScore * 0.2) + (successScore * 0.2) + (availabilityScore * 0.2);
  }
}
```

### Real-time Collaboration System
```typescript
// Collaboration tools for team challenges
interface CollaborationSession {
  challengeId: string;
  participants: Participant[];
  sharedWorkspace: WorkspaceState;
  communicationChannels: Channel[];
  progressTracking: ProgressMetrics;
}

class CollaborationEngine {
  private websocket: WebSocketManager;

  async createCollaborationSession(challengeId: string): Promise<CollaborationSession> {
    const session = await this.initializeSession(challengeId);

    // Set up real-time communication
    this.websocket.createRoom(session.id);

    // Initialize shared workspace
    await this.setupSharedWorkspace(session);

    return session;
  }

  async joinCollaboration(sessionId: string, userId: string): Promise<void> {
    const session = await this.getSession(sessionId);

    // Add user to session
    session.participants.push({ userId, joinedAt: new Date() });

    // Notify other participants
    this.websocket.broadcast(sessionId, {
      type: 'user_joined',
      userId,
      timestamp: new Date()
    });
  }
}
```

---

## 🎨 UI/UX Development

### Design System (OpenChance Theme)
```css
:root {
  --primary: 14 165 233;       /* Sky 500 - Innovation & Opportunity */
  --secondary: 59 130 246;     /* Blue 500 - Trust & Collaboration */
  --accent: 6 182 212;         /* Cyan 500 - Creativity */
  --success: 34 197 94;        /* Emerald 500 - Success */
  --warning: 251 191 36;       /* Amber 500 - Attention */
}
```

### Component Guidelines
```svelte
<!-- Example: Challenge Card Component -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import type { Challenge } from '$lib/types/challenge';

  interface Props {
    challenge: Challenge;
    onApply?: (challengeId: string) => void;
    showApplyButton?: boolean;
  }

  let { challenge, onApply, showApplyButton = true }: Props = $props();

  function formatReward(reward: RewardStructure): string {
    if (reward.type === 'fixed') {
      return `$${reward.amount.toLocaleString()}`;
    } else {
      return `$${reward.min.toLocaleString()} - $${reward.max.toLocaleString()}`;
    }
  }
</script>

<Card class="challenge-card">
  <CardHeader>
    <div class="flex items-start justify-between">
      <CardTitle class="line-clamp-2">{challenge.title}</CardTitle>
      <Badge variant="secondary" class="ml-2">
        {formatReward(challenge.reward)}
      </Badge>
    </div>
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <Badge variant="outline">{challenge.category}</Badge>
      <Badge variant="outline">{challenge.difficulty}</Badge>
      <span>•</span>
      <span>{challenge.applicants} applicants</span>
    </div>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground line-clamp-3 mb-4">
      {challenge.description}
    </p>

    <div class="flex items-center justify-between">
      <div class="text-sm">
        <span class="font-medium">Deadline:</span>
        <span class="text-muted-foreground ml-1">
          {new Date(challenge.deadline).toLocaleDateString()}
        </span>
      </div>

      {#if showApplyButton && onApply}
        <button
          class="btn btn-primary btn-sm"
          on:click={() => onApply?.(challenge.id)}
        >
          Apply Now
        </button>
      {/if}
    </div>
  </CardContent>
</Card>
```

---

## 🧪 Testing Strategy

### Challenge System Testing
```bash
# Test challenge creation and management
npm run test:challenges

# Test solver matching algorithm
npm run test:matching

# Test collaboration features
npm run test:collaboration

# Performance testing
npm run test:performance
```

### Matching Algorithm Testing
```typescript
// Example matching algorithm testing
describe('Solver Matching Engine', () => {
  test('should match solvers based on expertise', async () => {
    const challenge = createTestChallenge({
      category: 'technology',
      requirements: ['JavaScript', 'React', 'Node.js'],
      difficulty: 'intermediate'
    });

    const matches = await matchingEngine.findOptimalSolvers(challenge);

    expect(matches).toHaveLength(10);
    expect(matches[0].score).toBeGreaterThan(0.8);
    expect(matches[0].solver.expertise).toContain('JavaScript');
  });

  test('should prioritize solvers with high success rates', async () => {
    const challenge = createTestChallenge({
      category: 'business',
      difficulty: 'advanced'
    });

    const matches = await matchingEngine.findOptimalSolvers(challenge);

    // Higher success rate solvers should be ranked higher
    expect(matches[0].solver.successRate).toBeGreaterThan(matches[9].solver.successRate);
  });
});
```

---

## 🔄 Development Workflow

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/collaboration-tools

# Make changes and commit
git add .
git commit -m "feat: implement real-time collaboration workspace"

# Push and create PR
git push origin feature/collaboration-tools
```

### Commit Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process or auxiliary tool changes

### Code Review Checklist
- [ ] **Matching Quality**: Ensure solver-challenge matches are relevant
- [ ] **Collaboration**: Real-time features work smoothly
- [ ] **Performance**: Optimize for large numbers of challenges and solvers
- [ ] **Testing**: Unit tests for matching and collaboration logic
- [ ] **Documentation**: Updated docs and comments
- [ ] **Type Safety**: Full TypeScript coverage
