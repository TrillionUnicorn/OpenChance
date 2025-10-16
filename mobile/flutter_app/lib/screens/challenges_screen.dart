import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ChallengesScreen extends StatefulWidget {
  const ChallengesScreen({Key? key}) : super(key: key);

  @override
  State<ChallengesScreen> createState() => _ChallengesScreenState();
}

class _ChallengesScreenState extends State<ChallengesScreen> {
  String _selectedCategory = 'all';
  String _sortBy = 'newest';

  final List<String> categories = [
    'all',
    'Environment',
    'Education',
    'Healthcare',
    'Technology',
    'Sustainability',
  ];

  final List<Map<String, dynamic>> challenges = [
    {
      'id': 1,
      'title': 'Clean Water Access in Rural Areas',
      'category': 'Environment',
      'reward': '\$50,000',
      'participants': 234,
      'difficulty': 'High',
    },
    {
      'id': 2,
      'title': 'AI-Powered Learning Platform',
      'category': 'Education',
      'reward': '\$25,000',
      'participants': 156,
      'difficulty': 'Medium',
    },
    {
      'id': 3,
      'title': 'Sustainable Food Packaging',
      'category': 'Sustainability',
      'reward': '\$15,000',
      'participants': 89,
      'difficulty': 'Medium',
    },
    {
      'id': 4,
      'title': 'Urban Traffic Optimization',
      'category': 'Technology',
      'reward': '\$75,000',
      'participants': 312,
      'difficulty': 'High',
    },
    {
      'id': 5,
      'title': 'Telemedicine Platform for Rural Areas',
      'category': 'Healthcare',
      'reward': '\$40,000',
      'participants': 178,
      'difficulty': 'Medium',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Browse Challenges'),
        backgroundColor: Colors.deepPurple,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search challenges...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                filled: true,
                fillColor: Colors.grey[100],
              ),
            ),
          ),

          // Category Filter
          SizedBox(
            height: 50,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final category = categories[index];
                final isSelected = _selectedCategory == category;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(
                      category == 'all' ? 'All' : category,
                    ),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() => _selectedCategory = category);
                    },
                    backgroundColor: Colors.grey[200],
                    selectedColor: Colors.deepPurple,
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : Colors.black,
                    ),
                  ),
                );
              },
            ),
          ),

          const SizedBox(height: 16),

          // Sort Dropdown
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Showing ${challenges.length} challenges',
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                ),
                DropdownButton<String>(
                  value: _sortBy,
                  items: const [
                    DropdownMenuItem(value: 'newest', child: Text('Newest')),
                    DropdownMenuItem(value: 'reward', child: Text('Highest Reward')),
                    DropdownMenuItem(value: 'deadline', child: Text('Ending Soon')),
                    DropdownMenuItem(value: 'popular', child: Text('Most Popular')),
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      setState(() => _sortBy = value);
                    }
                  },
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Challenge List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: challenges.length,
              itemBuilder: (context, index) {
                final challenge = challenges[index];
                return _buildChallengeCard(context, challenge);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChallengeCard(BuildContext context, Map<String, dynamic> challenge) {
    return GestureDetector(
      onTap: () => context.go('/challenges/${challenge['id']}'),
      child: Card(
        margin: const EdgeInsets.only(bottom: 12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Chip(
                    label: Text(challenge['category']),
                    backgroundColor: Colors.deepPurple.withOpacity(0.1),
                    labelStyle: const TextStyle(fontSize: 12),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: challenge['difficulty'] == 'High'
                          ? Colors.red.withOpacity(0.1)
                          : Colors.orange.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      challenge['difficulty'],
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: challenge['difficulty'] == 'High'
                            ? Colors.red
                            : Colors.orange,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                challenge['title'],
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Reward',
                        style: TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                      Text(
                        challenge['reward'],
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.green,
                        ),
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      const Text(
                        'Participants',
                        style: TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                      Text(
                        '${challenge['participants']}',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => context.go('/challenges/${challenge['id']}'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                  ),
                  child: const Text('View Details'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

