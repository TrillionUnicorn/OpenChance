export * from './challenge';
export * from './solver';

export interface WaitlistEntry {
  email: string;
  name?: string;
  role?: 'solver' | 'challenger' | 'both';
  interests?: string[];
  createdAt: Date;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface MarketData {
  tam: number;
  sam: number;
  som: number;
  source: string;
  year: number;
}

export interface CompetitorData {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  marketShare?: number;
}

