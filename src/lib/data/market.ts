import type { MarketData, CompetitorData } from '$lib/types';

// Market sizing data with real sources
export const marketData: MarketData = {
  // TAM: Global management consulting + innovation management market
  // Source: Custom Market Insights (2024) - $510B consulting + Straits Research $9.22B innovation mgmt (2033 projection)
  tam: 520000000000, // $520 billion
  
  // SAM: Crowdsourcing, open innovation, and problem-solving platforms
  // Estimated 5% of consulting market actively seeking alternative solutions
  sam: 26000000000, // $26 billion
  
  // SOM: Realistic 3-year market capture (0.5% of SAM)
  som: 130000000, // $130 million
  
  source: 'Custom Market Insights (Management Consulting Market 2024), Straits Research (Innovation Management Market 2024)',
  year: 2024
};

// Detailed market breakdown
export const marketBreakdown = {
  consulting: {
    global: 510000000000, // $510B (Custom Market Insights 2024)
    growth: 0.0527, // 5.27% CAGR (Maximize Market Research)
    source: 'Custom Market Insights, Maximize Market Research 2024'
  },
  innovation: {
    global: 2350000000, // $2.35B in 2024 (Straits Research)
    projected2033: 9220000000, // $9.22B by 2033
    cagr: 0.16, // 16% CAGR
    source: 'Straits Research - Innovation Management Market 2024'
  },
  rd: {
    global: 2800000000000, // $2.8 trillion (WIPO Global Innovation Index 2024)
    growth: 0.045, // 4.5% annual growth
    source: 'WIPO Global Innovation Index 2024'
  }
};

// Target customer segments with realistic numbers
export const customerSegments = [
  {
    segment: 'Large Corporations (Fortune 500)',
    count: 500,
    avgSpend: 5000000, // $5M per year on external innovation
    totalMarket: 2500000000, // $2.5B
    penetrationTarget: 0.1, // 10% in 3 years
    revenue: 250000000 // $250M potential
  },
  {
    segment: 'Mid-Market Enterprises',
    count: 50000,
    avgSpend: 200000, // $200K per year
    totalMarket: 10000000000, // $10B
    penetrationTarget: 0.02, // 2% in 3 years
    revenue: 200000000 // $200M potential
  },
  {
    segment: 'Government Agencies',
    count: 10000,
    avgSpend: 500000, // $500K per year
    totalMarket: 5000000000, // $5B
    penetrationTarget: 0.05, // 5% in 3 years
    revenue: 250000000 // $250M potential
  },
  {
    segment: 'NGOs & Foundations',
    count: 100000,
    avgSpend: 50000, // $50K per year
    totalMarket: 5000000000, // $5B
    penetrationTarget: 0.03, // 3% in 3 years
    revenue: 150000000 // $150M potential
  },
  {
    segment: 'Research Institutions',
    count: 25000,
    avgSpend: 150000, // $150K per year
    totalMarket: 3750000000, // $3.75B
    penetrationTarget: 0.04, // 4% in 3 years
    revenue: 150000000 // $150M potential
  }
];

// Competitor analysis with real companies
export const competitors: CompetitorData[] = [
  {
    name: 'InnoCentive',
    description: 'Pioneer in open innovation and crowdsourcing, connecting organizations with global problem solvers since 2001.',
    strengths: [
      'Established brand and track record',
      'Large solver network (400K+)',
      'Enterprise relationships',
      'Proven challenge methodology'
    ],
    weaknesses: [
      'Outdated platform UX',
      'Limited AI-powered matching',
      'High platform fees (20-30%)',
      'Slow challenge resolution times',
      'Limited collaboration tools'
    ],
    marketShare: 15
  },
  {
    name: 'Kaggle (Google)',
    description: 'Data science and machine learning competition platform with 10M+ users, focused on AI/ML challenges.',
    strengths: [
      'Massive user base',
      'Google backing and resources',
      'Strong data science community',
      'Free for participants'
    ],
    weaknesses: [
      'Limited to data science/ML',
      'Not suitable for physical product challenges',
      'Minimal business problem-solving',
      'Competition-focused, not collaboration'
    ],
    marketShare: 25
  },
  {
    name: 'Topcoder',
    description: 'Crowdsourcing platform for software development, design, and data science with 1.5M+ members.',
    strengths: [
      'Large developer community',
      'Proven track record (20+ years)',
      'Enterprise clients',
      'Multiple challenge types'
    ],
    weaknesses: [
      'Tech-focused only',
      'Complex platform for newcomers',
      'Limited to digital solutions',
      'Aging technology stack'
    ],
    marketShare: 12
  },
  {
    name: 'HeroX',
    description: 'Crowdsourcing platform for innovation challenges, spinoff from XPRIZE Foundation.',
    strengths: [
      'XPRIZE methodology',
      'Diverse challenge types',
      'Good marketing and branding',
      'Social impact focus'
    ],
    weaknesses: [
      'Smaller solver network',
      'Limited AI capabilities',
      'Higher costs for challengers',
      'Less enterprise adoption'
    ],
    marketShare: 8
  },
  {
    name: 'Traditional Consulting Firms',
    description: 'McKinsey, BCG, Bain, Deloitte, and other management consulting firms.',
    strengths: [
      'Established relationships',
      'Deep industry expertise',
      'Full-service offerings',
      'Brand reputation'
    ],
    weaknesses: [
      'Extremely expensive ($500-2000/hour)',
      'Slow delivery (6-18 months)',
      'Limited innovation diversity',
      'Not crowdsourced',
      'High overhead costs'
    ],
    marketShare: 40
  }
];

// Growth projections based on market trends
export const growthProjections = {
  year1: {
    challenges: 1000,
    solvers: 10000,
    revenue: 420000, // $420K ARR
    rewardsDistributed: 100000
  },
  year2: {
    challenges: 10000,
    solvers: 50000,
    revenue: 7100000, // $7.1M ARR
    rewardsDistributed: 1000000
  },
  year3: {
    challenges: 50000,
    solvers: 250000,
    revenue: 59900000, // $59.9M ARR
    rewardsDistributed: 10000000
  },
  year5: {
    challenges: 500000,
    solvers: 2500000,
    revenue: 599000000, // $599M ARR
    rewardsDistributed: 100000000
  }
};

// Key metrics and assumptions
export const keyMetrics = {
  platformFee: 0.15, // 15% of challenge rewards
  avgChallengeReward: 50000, // $50K average
  solverRetention: 0.75, // 75% annual retention
  challengerRetention: 0.85, // 85% annual retention
  successRate: 0.94, // 94% challenge success rate
  avgTimeToSolution: 75, // 75 days average
  customerAcquisitionCost: 5000, // $5K CAC
  lifetimeValue: 50000 // $50K LTV (10:1 LTV:CAC ratio)
};

