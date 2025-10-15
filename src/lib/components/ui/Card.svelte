<script lang="ts">
  interface Props {
    class?: string;
    hover?: boolean;
    glass?: boolean;
    children?: any;
  }

  let {
    class: className = '',
    hover = false,
    glass = false,
    children
  }: Props = $props();

  const baseClasses = 'rounded-xl p-6 transition-all duration-300';
  const glassClasses = glass ? 'glass-effect' : 'bg-white shadow-md';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';
  
  const classes = $derived(`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`);
</script>

<div class={classes}>
  {@render children?.()}
</div>

