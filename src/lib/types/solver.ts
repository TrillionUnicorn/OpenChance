export type ExpertiseArea = 
  | 'software-engineering'
  | 'data-science'
  | 'mechanical-engineering'
  | 'environmental-science'
  | 'healthcare'
  | 'business-strategy'
  | 'design'
  | 'marketing'
  | 'education'
  | 'research';

export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'expert';

export type CollaborationPreference = 'solo' | 'small-team' | 'large-team' | 'flexible';

export interface AvailabilitySchedule {
  hoursPerWeek: number;
  timezone: string;
  startDate?: Date;
  endDate?: Date;
}

export interface RewardRange {
  min: number;
  max: number;
  currency: string;
}

export interface SolverProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  expertise: ExpertiseArea[];
  experience: ExperienceLevel;
  successRate: number;
  completedChallenges: number;
  totalEarnings: number;
  availability: AvailabilitySchedule;
  preferredRewards: RewardRange;
  collaborationStyle: CollaborationPreference;
  skills: string[];
  portfolio: {
    title: string;
    description: string;
    url?: string;
    imageUrl?: string;
  }[];
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  joinedAt: Date;
  verified: boolean;
}

export interface SolverMatch {
  solver: SolverProfile;
  score: number;
  matchReasons: string[];
}

