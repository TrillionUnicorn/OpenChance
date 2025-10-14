export type ChallengeCategory = 
  | 'sustainability'
  | 'healthcare'
  | 'smart-cities'
  | 'business-tech'
  | 'education'
  | 'environment'
  | 'social-impact';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ChallengeStatus = 
  | 'draft'
  | 'open'
  | 'in-progress'
  | 'under-review'
  | 'completed'
  | 'cancelled';

export interface RewardStructure {
  type: 'fixed' | 'range' | 'milestone';
  amount?: number;
  min?: number;
  max?: number;
  currency: string;
  milestones?: {
    name: string;
    amount: number;
    description: string;
  }[];
}

export interface Requirements {
  skills: string[];
  experience?: string;
  deliverables: string[];
  constraints?: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: DifficultyLevel;
  reward: RewardStructure;
  requirements: Requirements;
  deadline: Date;
  status: ChallengeStatus;
  applicants: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  organizationName: string;
  tags: string[];
  featured?: boolean;
}

export interface CreateChallengeRequest {
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: DifficultyLevel;
  reward: RewardStructure;
  requirements: Requirements;
  deadline: Date;
  tags: string[];
}

