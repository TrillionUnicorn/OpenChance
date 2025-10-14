import type { Challenge } from '$lib/types';

export const mockChallenges: Challenge[] = [
  {
    id: 'ch-001',
    title: 'Carbon Capture Innovation for Industrial Plants',
    description: 'Design a cost-effective carbon capture system that can be retrofitted to existing industrial facilities. The solution must capture at least 90% of CO2 emissions while maintaining operational efficiency. Focus on scalability and economic viability for mid-sized manufacturing plants.',
    category: 'sustainability',
    difficulty: 'expert',
    reward: {
      type: 'fixed',
      amount: 500000,
      currency: 'USD'
    },
    requirements: {
      skills: ['Chemical Engineering', 'Environmental Science', 'Process Design', 'Cost Analysis'],
      experience: 'Minimum 5 years in industrial engineering or environmental technology',
      deliverables: [
        'Detailed technical design and specifications',
        'Cost-benefit analysis',
        'Prototype or proof-of-concept',
        'Implementation roadmap',
        'Environmental impact assessment'
      ],
      constraints: [
        'Must work with existing infrastructure',
        'ROI within 5 years',
        'Comply with EPA regulations'
      ]
    },
    deadline: new Date('2025-12-31'),
    status: 'open',
    applicants: 47,
    views: 1234,
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-14'),
    organizationId: 'org-001',
    organizationName: 'Global Climate Solutions Inc.',
    tags: ['climate-tech', 'carbon-capture', 'sustainability', 'industrial'],
    featured: true
  },
  {
    id: 'ch-002',
    title: 'AI-Powered Telemedicine Platform for Rural Healthcare',
    description: 'Create an AI-assisted telemedicine platform that enables remote diagnosis and treatment in underserved rural areas. The system should work with limited internet connectivity and provide real-time translation for multiple languages. Include features for vital sign monitoring integration and prescription management.',
    category: 'healthcare',
    difficulty: 'advanced',
    reward: {
      type: 'range',
      min: 75000,
      max: 150000,
      currency: 'USD'
    },
    requirements: {
      skills: ['AI/ML', 'Healthcare IT', 'Mobile Development', 'UX Design', 'HIPAA Compliance'],
      experience: 'Experience in healthcare technology or telemedicine',
      deliverables: [
        'Functional web and mobile applications',
        'AI diagnostic assistance module',
        'Offline-capable architecture',
        'Security and compliance documentation',
        'User training materials'
      ],
      constraints: [
        'HIPAA compliant',
        'Works with 2G/3G networks',
        'Support for 10+ languages'
      ]
    },
    deadline: new Date('2025-09-30'),
    status: 'open',
    applicants: 89,
    views: 2156,
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-10-13'),
    organizationId: 'org-002',
    organizationName: 'HealthBridge Foundation',
    tags: ['healthcare', 'ai', 'telemedicine', 'rural-health', 'accessibility'],
    featured: true
  },
  {
    id: 'ch-003',
    title: 'Smart Traffic Management System for Urban Areas',
    description: 'Develop an intelligent traffic management system that uses real-time data from IoT sensors, cameras, and mobile devices to optimize traffic flow in congested urban areas. The solution should reduce average commute times by at least 20% and integrate with existing city infrastructure.',
    category: 'smart-cities',
    difficulty: 'advanced',
    reward: {
      type: 'milestone',
      currency: 'USD',
      milestones: [
        { name: 'Prototype & Simulation', amount: 50000, description: 'Working prototype with simulation results' },
        { name: 'Pilot Implementation', amount: 100000, description: 'Successful pilot in one district' },
        { name: 'Full Deployment', amount: 100000, description: 'City-wide deployment and 20% improvement' }
      ]
    },
    requirements: {
      skills: ['IoT', 'Data Analytics', 'Machine Learning', 'Urban Planning', 'Systems Integration'],
      experience: 'Smart city or transportation technology experience preferred',
      deliverables: [
        'System architecture and design',
        'IoT sensor integration plan',
        'Traffic prediction algorithms',
        'Real-time dashboard',
        'Implementation and maintenance guide'
      ],
      constraints: [
        'Compatible with existing city infrastructure',
        'Privacy-compliant data collection',
        'Scalable to 1M+ vehicles'
      ]
    },
    deadline: new Date('2026-03-31'),
    status: 'open',
    applicants: 34,
    views: 987,
    createdAt: new Date('2024-10-05'),
    updatedAt: new Date('2024-10-14'),
    organizationId: 'org-003',
    organizationName: 'Metro City Council',
    tags: ['smart-city', 'iot', 'traffic', 'urban-planning', 'ai'],
    featured: false
  },
  {
    id: 'ch-004',
    title: 'Blockchain-Based Supply Chain Transparency Platform',
    description: 'Build a blockchain-powered platform that provides end-to-end supply chain transparency for ethical sourcing. The system should track products from origin to consumer, verify certifications, and provide immutable audit trails. Focus on fashion and food industries initially.',
    category: 'business-tech',
    difficulty: 'advanced',
    reward: {
      type: 'fixed',
      amount: 120000,
      currency: 'USD'
    },
    requirements: {
      skills: ['Blockchain', 'Smart Contracts', 'Supply Chain Management', 'Web3', 'API Development'],
      experience: 'Blockchain development and supply chain experience',
      deliverables: [
        'Blockchain architecture design',
        'Smart contract implementation',
        'Web and mobile interfaces',
        'Integration APIs for existing systems',
        'Documentation and training materials'
      ],
      constraints: [
        'Support for multiple blockchain networks',
        'Low transaction costs',
        'User-friendly for non-technical users'
      ]
    },
    deadline: new Date('2025-11-30'),
    status: 'open',
    applicants: 56,
    views: 1543,
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-10-12'),
    organizationId: 'org-004',
    organizationName: 'Ethical Trade Alliance',
    tags: ['blockchain', 'supply-chain', 'transparency', 'web3', 'sustainability'],
    featured: false
  },
  {
    id: 'ch-005',
    title: 'Adaptive Learning Platform for STEM Education',
    description: 'Create an AI-powered adaptive learning platform that personalizes STEM education for K-12 students. The system should assess individual learning styles, pace, and knowledge gaps, then dynamically adjust content and teaching methods. Include gamification elements and progress tracking for parents and teachers.',
    category: 'education',
    difficulty: 'intermediate',
    reward: {
      type: 'range',
      min: 40000,
      max: 80000,
      currency: 'USD'
    },
    requirements: {
      skills: ['EdTech', 'AI/ML', 'Curriculum Design', 'Gamification', 'Learning Analytics'],
      experience: 'Education technology or instructional design background',
      deliverables: [
        'Adaptive learning algorithm',
        'Interactive learning modules for math and science',
        'Student assessment system',
        'Teacher and parent dashboards',
        'Pilot study results with 100+ students'
      ],
      constraints: [
        'COPPA compliant',
        'Accessible (WCAG 2.1 AA)',
        'Works on tablets and low-end devices'
      ]
    },
    deadline: new Date('2025-08-31'),
    status: 'open',
    applicants: 67,
    views: 1876,
    createdAt: new Date('2024-09-10'),
    updatedAt: new Date('2024-10-14'),
    organizationId: 'org-005',
    organizationName: 'Future Learners Foundation',
    tags: ['education', 'ai', 'edtech', 'stem', 'adaptive-learning'],
    featured: true
  },
  {
    id: 'ch-006',
    title: 'Biodegradable Packaging from Agricultural Waste',
    description: 'Develop a manufacturing process to create biodegradable packaging materials from agricultural waste (rice husks, corn stalks, etc.). The packaging must be cost-competitive with plastic, fully compostable within 90 days, and suitable for food contact. Provide scalable production methodology.',
    category: 'sustainability',
    difficulty: 'expert',
    reward: {
      type: 'fixed',
      amount: 200000,
      currency: 'USD'
    },
    requirements: {
      skills: ['Materials Science', 'Chemical Engineering', 'Manufacturing', 'Food Safety', 'Sustainability'],
      experience: 'Materials engineering or sustainable packaging experience',
      deliverables: [
        'Material formulation and specifications',
        'Manufacturing process design',
        'Cost analysis and pricing model',
        'Biodegradability testing results',
        'Food safety certifications',
        'Scalability roadmap'
      ],
      constraints: [
        'Cost within 20% of plastic alternatives',
        'FDA food contact approved',
        'Compostable within 90 days'
      ]
    },
    deadline: new Date('2026-01-31'),
    status: 'open',
    applicants: 23,
    views: 654,
    createdAt: new Date('2024-10-08'),
    updatedAt: new Date('2024-10-14'),
    organizationId: 'org-006',
    organizationName: 'EcoPackage Innovations',
    tags: ['sustainability', 'packaging', 'biodegradable', 'agriculture', 'circular-economy'],
    featured: false
  }
];

