import { db } from './index';
import { users, challenges, applications } from './schema';

/**
 * Database Seed Script
 * Populates the database with sample data for development and testing
 */

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data (optional - comment out for production)
    console.log('Clearing existing data...');
    await db.delete(applications);
    await db.delete(challenges);
    await db.delete(users);

    // Seed users
    console.log('Seeding users...');
    const sampleUsers = await db.insert(users).values([
      {
        clerkId: 'user_sample_1',
        email: 'challenger@example.com',
        username: 'challenger_demo',
        firstName: 'John',
        lastName: 'Challenger',
        userType: 'challenger',
        bio: 'Experienced entrepreneur looking for innovative solutions',
        company: 'Tech Innovations Inc',
        avatar: 'https://ui-avatars.com/api/?name=John+Challenger',
      },
      {
        clerkId: 'user_sample_2',
        email: 'solver@example.com',
        username: 'solver_demo',
        firstName: 'Jane',
        lastName: 'Solver',
        userType: 'solver',
        bio: 'Full-stack developer passionate about solving real-world problems',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
        avatar: 'https://ui-avatars.com/api/?name=Jane+Solver',
      },
      {
        clerkId: 'user_sample_3',
        email: 'admin@example.com',
        username: 'admin_demo',
        firstName: 'Admin',
        lastName: 'User',
        userType: 'both',
        role: 'admin',
        bio: 'Platform administrator',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User',
      },
    ]).returning();

    console.log(`✅ Created ${sampleUsers.length} users`);

    // Seed challenges
    console.log('Seeding challenges...');
    const sampleChallenges = await db.insert(challenges).values([
      {
        challengerId: sampleUsers[0].id,
        title: 'Build a Mobile App for Sustainable Transportation',
        description: 'We need a mobile application that helps users find and share eco-friendly transportation options in their city.',
        category: 'technology',
        difficulty: 'intermediate',
        rewardType: 'fixed',
        rewardAmount: 500000, // $5,000
        status: 'open',
        requirements: [
          'Experience with React Native or Flutter',
          'Knowledge of mapping APIs',
          'Understanding of sustainable transportation',
        ],
        skills: ['React Native', 'Mobile Development', 'API Integration'],
        deliverables: [
          'Working mobile app (iOS and Android)',
          'Source code with documentation',
          'User guide',
        ],
        tags: ['mobile', 'sustainability', 'transportation'],
        visibility: 'public',
      },
      {
        challengerId: sampleUsers[0].id,
        title: 'Design a Brand Identity for Green Energy Startup',
        description: 'Looking for a creative designer to develop a complete brand identity including logo, color palette, and brand guidelines.',
        category: 'design',
        difficulty: 'beginner',
        rewardType: 'fixed',
        rewardAmount: 200000, // $2,000
        status: 'open',
        requirements: [
          'Portfolio of previous brand work',
          'Understanding of green energy sector',
        ],
        skills: ['Graphic Design', 'Branding', 'Adobe Creative Suite'],
        deliverables: [
          'Logo design (multiple formats)',
          'Brand guidelines document',
          'Color palette and typography',
        ],
        tags: ['design', 'branding', 'green-energy'],
        visibility: 'public',
      },
      {
        challengerId: sampleUsers[0].id,
        title: 'Develop AI-Powered Customer Support Chatbot',
        description: 'Need an intelligent chatbot that can handle customer inquiries and provide automated support.',
        category: 'technology',
        difficulty: 'advanced',
        rewardType: 'range',
        rewardMin: 800000, // $8,000
        rewardMax: 1200000, // $12,000
        status: 'open',
        requirements: [
          'Experience with NLP and AI',
          'Knowledge of chatbot frameworks',
          'Previous chatbot projects',
        ],
        skills: ['Python', 'Machine Learning', 'NLP', 'API Development'],
        deliverables: [
          'Trained chatbot model',
          'Integration with existing systems',
          'Documentation and training materials',
        ],
        tags: ['ai', 'chatbot', 'automation'],
        visibility: 'public',
      },
    ]).returning();

    console.log(`✅ Created ${sampleChallenges.length} challenges`);

    // Seed applications
    console.log('Seeding applications...');
    const sampleApplications = await db.insert(applications).values([
      {
        challengeId: sampleChallenges[0].id,
        solverId: sampleUsers[1].id,
        coverLetter: 'I am excited to apply for this challenge. With 5 years of experience in mobile development and a passion for sustainability, I believe I can deliver an excellent solution.',
        proposedSolution: 'I propose building the app using React Native for cross-platform compatibility. The app will integrate with Google Maps API and include features for carpooling, bike-sharing, and public transit routing.',
        timeline: '6-8 weeks',
        status: 'pending',
      },
    ]).returning();

    console.log(`✅ Created ${sampleApplications.length} applications`);

    console.log('🎉 Database seed completed successfully!');
    console.log('\nSample credentials:');
    console.log('Challenger: challenger@example.com');
    console.log('Solver: solver@example.com');
    console.log('Admin: admin@example.com');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seed
seed()
  .then(() => {
    console.log('✅ Seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });

