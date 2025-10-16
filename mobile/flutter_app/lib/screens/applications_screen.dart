import 'package:flutter/material.dart';

class ApplicationsScreen extends StatefulWidget {
  const ApplicationsScreen({Key? key}) : super(key: key);

  @override
  State<ApplicationsScreen> createState() => _ApplicationsScreenState();
}

class _ApplicationsScreenState extends State<ApplicationsScreen> {
  int _selectedTabIndex = 0;

  final List<Map<String, dynamic>> activeApplications = [
    {
      'id': 1,
      'challengeTitle': 'Clean Water Access in Rural Areas',
      'status': 'In Review',
      'submittedDate': '3 days ago',
      'reward': '\$50,000',
    },
    {
      'id': 2,
      'challengeTitle': 'Urban Traffic Optimization',
      'status': 'Accepted',
      'submittedDate': '1 week ago',
      'reward': '\$75,000',
    },
  ];

  final List<Map<String, dynamic>> completedApplications = [
    {
      'id': 3,
      'challengeTitle': 'AI-Powered Learning Platform',
      'status': 'Completed',
      'submittedDate': '2 weeks ago',
      'reward': '\$25,000',
      'rating': 4.8,
    },
    {
      'id': 4,
      'challengeTitle': 'Sustainable Food Packaging',
      'status': 'Completed',
      'submittedDate': '1 month ago',
      'reward': '\$15,000',
      'rating': 4.5,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Applications'),
        backgroundColor: Colors.deepPurple,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Tab Bar
          Container(
            color: Colors.deepPurple,
            child: Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _selectedTabIndex = 0),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: _selectedTabIndex == 0
                                ? Colors.white
                                : Colors.transparent,
                            width: 3,
                          ),
                        ),
                      ),
                      child: Text(
                        'Active',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: _selectedTabIndex == 0
                              ? FontWeight.bold
                              : FontWeight.normal,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _selectedTabIndex = 1),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: _selectedTabIndex == 1
                                ? Colors.white
                                : Colors.transparent,
                            width: 3,
                          ),
                        ),
                      ),
                      child: Text(
                        'Completed',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: _selectedTabIndex == 1
                              ? FontWeight.bold
                              : FontWeight.normal,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Content
          Expanded(
            child: _selectedTabIndex == 0
                ? _buildActiveApplications()
                : _buildCompletedApplications(),
          ),
        ],
      ),
    );
  }

  Widget _buildActiveApplications() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: activeApplications.length,
      itemBuilder: (context, index) {
        final app = activeApplications[index];
        return _buildApplicationCard(app, isCompleted: false);
      },
    );
  }

  Widget _buildCompletedApplications() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: completedApplications.length,
      itemBuilder: (context, index) {
        final app = completedApplications[index];
        return _buildApplicationCard(app, isCompleted: true);
      },
    );
  }

  Widget _buildApplicationCard(
    Map<String, dynamic> app, {
    required bool isCompleted,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    app['challengeTitle'],
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: _getStatusColor(app['status']).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    app['status'],
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: _getStatusColor(app['status']),
                    ),
                  ),
                ),
              ],
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
                      app['reward'],
                      style: const TextStyle(
                        fontSize: 14,
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
                      'Submitted',
                      style: TextStyle(fontSize: 12, color: Colors.grey),
                    ),
                    Text(
                      app['submittedDate'],
                      style: const TextStyle(fontSize: 14),
                    ),
                  ],
                ),
              ],
            ),
            if (isCompleted && app['rating'] != null) ...[
              const SizedBox(height: 12),
              Row(
                children: [
                  const Text('Rating: '),
                  ...List.generate(
                    5,
                    (i) => Icon(
                      i < app['rating'].toInt() ? Icons.star : Icons.star_border,
                      size: 16,
                      color: Colors.amber,
                    ),
                  ),
                  Text(' ${app['rating']}'),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'In Review':
        return Colors.orange;
      case 'Accepted':
        return Colors.blue;
      case 'Completed':
        return Colors.green;
      case 'Rejected':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}

