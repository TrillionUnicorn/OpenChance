import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class MessagesScreen extends StatefulWidget {
  const MessagesScreen({Key? key}) : super(key: key);

  @override
  State<MessagesScreen> createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> {
  final List<Map<String, dynamic>> conversations = [
    {
      'id': 1,
      'name': 'Sarah Chen',
      'lastMessage': 'Thanks for the update on the water project!',
      'timestamp': '2 hours ago',
      'unread': true,
      'avatar': 'SC',
    },
    {
      'id': 2,
      'name': 'Michael Rodriguez',
      'lastMessage': 'Can we schedule a call tomorrow?',
      'timestamp': '5 hours ago',
      'unread': false,
      'avatar': 'MR',
    },
    {
      'id': 3,
      'name': 'Aisha Patel',
      'lastMessage': 'The proposal looks great!',
      'timestamp': '1 day ago',
      'unread': false,
      'avatar': 'AP',
    },
    {
      'id': 4,
      'name': 'James Wilson',
      'lastMessage': 'Let me know if you need any clarification',
      'timestamp': '2 days ago',
      'unread': false,
      'avatar': 'JW',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Messages'),
        backgroundColor: Colors.deepPurple,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {},
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: conversations.length,
        itemBuilder: (context, index) {
          final conversation = conversations[index];
          return _buildConversationTile(context, conversation);
        },
      ),
    );
  }

  Widget _buildConversationTile(
    BuildContext context,
    Map<String, dynamic> conversation,
  ) {
    return GestureDetector(
      onTap: () => context.go('/messages/${conversation['id']}'),
      child: Container(
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(color: Colors.grey[200]!),
          ),
        ),
        child: ListTile(
          leading: CircleAvatar(
            backgroundColor: Colors.deepPurple,
            child: Text(
              conversation['avatar'],
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          title: Text(
            conversation['name'],
            style: TextStyle(
              fontWeight: conversation['unread'] ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          subtitle: Text(
            conversation['lastMessage'],
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: conversation['unread'] ? Colors.black : Colors.grey,
            ),
          ),
          trailing: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                conversation['timestamp'],
                style: const TextStyle(fontSize: 12, color: Colors.grey),
              ),
              if (conversation['unread'])
                Container(
                  margin: const EdgeInsets.only(top: 4),
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: Colors.deepPurple,
                    shape: BoxShape.circle,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

