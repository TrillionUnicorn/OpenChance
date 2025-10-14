<script lang="ts">
  import type { Challenge } from '$lib/types';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  interface Props {
    challenge: Challenge;
    onApply?: (challengeId: string) => void;
    showApplyButton?: boolean;
  }

  let {
    challenge,
    onApply,
    showApplyButton = true
  }: Props = $props();

  function formatReward(reward: Challenge['reward']): string {
    if (reward.type === 'fixed' && reward.amount) {
      return `$${(reward.amount / 1000).toFixed(0)}K`;
    } else if (reward.type === 'range' && reward.min && reward.max) {
      return `$${(reward.min / 1000).toFixed(0)}K - $${(reward.max / 1000).toFixed(0)}K`;
    } else if (reward.type === 'milestone' && reward.milestones) {
      const total = reward.milestones.reduce((sum, m) => sum + m.amount, 0);
      return `$${(total / 1000).toFixed(0)}K`;
    }
    return 'TBD';
  }

  function formatDeadline(deadline: Date): string {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Expired';
    if (days === 0) return 'Today';
    if (days === 1) return '1 day left';
    if (days < 30) return `${days} days left`;
    if (days < 60) return '1 month left';
    
    const months = Math.floor(days / 30);
    return `${months} months left`;
  }

  function getDifficultyColor(difficulty: Challenge['difficulty']): 'success' | 'warning' | 'danger' {
    switch (difficulty) {
      case 'beginner':
      case 'intermediate':
        return 'success';
      case 'advanced':
        return 'warning';
      case 'expert':
        return 'danger';
      default:
        return 'warning';
    }
  }

  function getCategoryIcon(category: Challenge['category']): string {
    const icons: Record<Challenge['category'], string> = {
      'sustainability': '🌱',
      'healthcare': '🏥',
      'smart-cities': '🏙️',
      'business-tech': '💼',
      'education': '🎓',
      'environment': '🌍',
      'social-impact': '🤝'
    };
    return icons[category] || '💡';
  }
</script>

<Card hover={true} class="h-full flex flex-col">
  <div class="flex items-start justify-between mb-4">
    <div class="flex items-center gap-2">
      <span class="text-2xl">{getCategoryIcon(challenge.category)}</span>
      <Badge variant="primary">{challenge.category.replace('-', ' ')}</Badge>
    </div>
    <Badge variant={getDifficultyColor(challenge.difficulty)}>
      {challenge.difficulty}
    </Badge>
  </div>

  <h3 class="text-xl font-bold mb-3 line-clamp-2 text-gray-900">
    {challenge.title}
  </h3>

  <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
    {challenge.description}
  </p>

  <div class="space-y-2 mb-4">
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-500 flex items-center gap-1">
        <span>💰</span>
        <span class="font-semibold">Reward:</span>
      </span>
      <span class="font-bold text-green-600">{formatReward(challenge.reward)}</span>
    </div>

    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-500 flex items-center gap-1">
        <span>👥</span>
        <span class="font-semibold">Applicants:</span>
      </span>
      <span class="font-medium text-gray-700">{challenge.applicants}</span>
    </div>

    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-500 flex items-center gap-1">
        <span>⏰</span>
        <span class="font-semibold">Deadline:</span>
      </span>
      <span class="font-medium text-gray-700">{formatDeadline(challenge.deadline)}</span>
    </div>

    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-500 flex items-center gap-1">
        <span>🏢</span>
        <span class="font-semibold">Organization:</span>
      </span>
      <span class="font-medium text-gray-700 truncate max-w-[150px]" title={challenge.organizationName}>
        {challenge.organizationName}
      </span>
    </div>
  </div>

  <div class="flex flex-wrap gap-1 mb-4">
    {#each challenge.tags.slice(0, 3) as tag}
      <Badge variant="outline" class="text-xs">{tag}</Badge>
    {/each}
    {#if challenge.tags.length > 3}
      <Badge variant="outline" class="text-xs">+{challenge.tags.length - 3}</Badge>
    {/if}
  </div>

  {#if showApplyButton}
    <div class="flex gap-2 mt-auto">
      <Button
        variant="primary"
        fullWidth={true}
        onclick={() => onApply?.(challenge.id)}
      >
        Apply Now
      </Button>
      <Button
        variant="outline"
        onclick={() => {/* Navigate to details */}}
      >
        Details
      </Button>
    </div>
  {/if}
</Card>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

