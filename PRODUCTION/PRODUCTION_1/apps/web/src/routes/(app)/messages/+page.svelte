<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import { wsClient } from '$lib/websocket/client';

  let conversations: any[] = [];
  let selectedConversation: any = null;
  let messages: any[] = [];
  let newMessage = '';
  let loading = true;
  let sending = false;

  async function loadConversations() {
    try {
      conversations = await trpc.message.getConversations.query();
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      loading = false;
    }
  }

  async function selectConversation(conversation: any) {
    selectedConversation = conversation;
    try {
      messages = await trpc.message.getMessages.query({
        conversationId: conversation.id,
      });
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }

  async function sendMessage() {
    if (!newMessage.trim() || !selectedConversation) return;

    sending = true;
    try {
      const message = await trpc.message.sendMessage.mutate({
        conversationId: selectedConversation.id,
        content: newMessage,
      });

      messages = [...messages, message];
      newMessage = '';

      // Notify via WebSocket
      const recipientId = selectedConversation.participant1Id === message.senderId
        ? selectedConversation.participant2Id
        : selectedConversation.participant1Id;
      
      wsClient.notifyMessageSent(recipientId, message);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      sending = false;
    }
  }

  onMount(() => {
    loadConversations();

    // Subscribe to new messages
    const unsubscribe = wsClient.on('new-message', (msg) => {
      if (selectedConversation && msg.payload.conversationId === selectedConversation.id) {
        messages = [...messages, msg.payload];
      }
      loadConversations(); // Refresh conversation list
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<svelte:head>
  <title>Messages - OpenChance</title>
</svelte:head>

<div class="h-[calc(100vh-12rem)] flex bg-white rounded-lg shadow overflow-hidden">
  <!-- Conversations List -->
  <div class="w-1/3 border-r border-gray-200 overflow-y-auto">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">Messages</h2>
    </div>

    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    {:else if conversations.length > 0}
      <div class="divide-y divide-gray-200">
        {#each conversations as conversation}
          <button
            on:click={() => selectConversation(conversation)}
            class="w-full p-4 hover:bg-gray-50 transition-colors text-left {selectedConversation?.id === conversation.id ? 'bg-indigo-50' : ''}"
          >
            <div class="flex items-center space-x-3">
              <img
                class="h-10 w-10 rounded-full"
                src={conversation.participant1.avatar || conversation.participant2.avatar}
                alt="Avatar"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {conversation.participant1.firstName} {conversation.participant1.lastName}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {conversation.lastMessagePreview || 'No messages yet'}
                </p>
              </div>
              {#if conversation.unreadCount > 0}
                <span class="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-xs text-white">
                  {conversation.unreadCount}
                </span>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    {:else}
      <div class="p-8 text-center text-gray-500">
        <p>No conversations yet</p>
      </div>
    {/if}
  </div>

  <!-- Messages Area -->
  <div class="flex-1 flex flex-col">
    {#if selectedConversation}
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <img
            class="h-10 w-10 rounded-full"
            src={selectedConversation.participant1.avatar || selectedConversation.participant2.avatar}
            alt="Avatar"
          />
          <div>
            <p class="text-sm font-medium text-gray-900">
              {selectedConversation.participant1.firstName} {selectedConversation.participant1.lastName}
            </p>
            {#if selectedConversation.challenge}
              <p class="text-xs text-gray-500">
                Re: {selectedConversation.challenge.title}
              </p>
            {/if}
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        {#each messages as message}
          <div class="flex {message.senderId === selectedConversation.participant1Id ? 'justify-end' : 'justify-start'}">
            <div class="max-w-xs lg:max-w-md">
              <div class="rounded-lg p-3 {message.senderId === selectedConversation.participant1Id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'}">
                <p class="text-sm">{message.content}</p>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        {/each}
      </div>

      <!-- Input -->
      <div class="p-4 border-t border-gray-200">
        <form on:submit|preventDefault={sendMessage} class="flex space-x-2">
          <input
            type="text"
            bind:value={newMessage}
            placeholder="Type a message..."
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    {:else}
      <div class="flex-1 flex items-center justify-center text-gray-500">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p class="mt-2">Select a conversation to start messaging</p>
        </div>
      </div>
    {/if}
  </div>
</div>

