import { MeiliSearch } from 'meilisearch';

/**
 * Meilisearch client for full-text search
 */
export const meilisearch = new MeiliSearch({
  host: process.env.MEILI_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILI_MASTER_KEY || 'openchance_dev_master_key',
});

/**
 * Initialize search indexes
 */
export async function initializeSearchIndexes() {
  try {
    // Create challenges index
    const challengesIndex = meilisearch.index('challenges');
    
    await challengesIndex.updateSettings({
      searchableAttributes: ['title', 'description', 'category', 'tags'],
      filterableAttributes: ['category', 'difficulty', 'status'],
      sortableAttributes: ['createdAt', 'rewardAmount', 'deadline', 'views'],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness',
      ],
    });

    console.log('✅ Meilisearch indexes initialized');
  } catch (error) {
    console.error('❌ Meilisearch initialization error:', error);
  }
}

// Initialize on startup
initializeSearchIndexes();

export default meilisearch;

