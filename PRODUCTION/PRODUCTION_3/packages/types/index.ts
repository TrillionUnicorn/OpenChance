/**
 * Shared TypeScript types for OpenChance
 */

// User Types
export type UserType = 'challenger' | 'solver' | 'both';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  role: UserRole;
  avatar?: string;
  bio?: string;
  company?: string;
  website?: string;
  location?: string;
  skills?: string[];
  reputationScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// Challenge Types
export type ChallengeCategory = 'technology' | 'design' | 'marketing' | 'business' | 'other';
export type ChallengeDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ChallengeStatus = 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
export type RewardType = 'fixed' | 'range' | 'equity' | 'negotiable';
export type Visibility = 'public' | 'private' | 'unlisted';

export interface Challenge {
  id: string;
  challengerId: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  status: ChallengeStatus;
  rewardType: RewardType;
  rewardAmount?: number;
  rewardMin?: number;
  rewardMax?: number;
  requirements?: string[];
  skills?: string[];
  deliverables?: string[];
  tags?: string[];
  visibility: Visibility;
  viewCount: number;
  applicationCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Application Types
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export interface Application {
  id: string;
  challengeId: string;
  solverId: string;
  coverLetter: string;
  proposedSolution: string;
  timeline: string;
  proposedBudget?: number;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participant1Id: string;
  participant2Id: string;
  challengeId?: string;
  lastMessageAt?: Date;
  createdAt: Date;
}

// Payment Types
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  challengeId: string;
  payerId: string;
  payeeId: string;
  amount: number;
  platformFee: number;
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  challengeId: string;
  rating: number;
  comment: string;
  flagged: boolean;
  flagReason?: string;
  createdAt: Date;
}

// Notification Types
export type NotificationType = 
  | 'application_received'
  | 'application_accepted'
  | 'application_rejected'
  | 'message_received'
  | 'payment_received'
  | 'review_received'
  | 'challenge_completed';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// WebSocket Event Types
export type WebSocketEventType = 
  | 'new-message'
  | 'typing'
  | 'notification'
  | 'challenge-update'
  | 'application-update';

export interface WebSocketEvent {
  type: WebSocketEventType;
  payload: any;
  timestamp: Date;
}

