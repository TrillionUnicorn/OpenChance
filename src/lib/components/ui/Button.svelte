<script lang="ts">
  type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  type ButtonSize = 'sm' | 'md' | 'lg';

  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    onclick?: (e: MouseEvent) => void;
    class?: string;
    children?: any;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    href,
    type = 'button',
    onclick,
    class: className = '',
    children
  }: Props = $props();

  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = $derived(`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`);
</script>

{#if href}
  <a {href} class={classes} class:opacity-50={disabled} class:pointer-events-none={disabled}>
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    {@render children?.()}
  </a>
{:else}
  <button {type} {disabled} {onclick} class={classes} class:cursor-wait={loading}>
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    {@render children?.()}
  </button>
{/if}

<style>
  /* Custom color variables */
  :global(.bg-primary) {
    background-color: #0ea5e9;
  }
  
  :global(.bg-primary-dark) {
    background-color: #0284c7;
  }
  
  :global(.bg-secondary) {
    background-color: #3b82f6;
  }
  
  :global(.bg-secondary-dark) {
    background-color: #2563eb;
  }
  
  :global(.bg-danger) {
    background-color: #ef4444;
  }
  
  :global(.text-primary) {
    color: #0ea5e9;
  }
  
  :global(.border-primary) {
    border-color: #0ea5e9;
  }
  
  :global(.focus\:ring-primary:focus) {
    --tw-ring-color: #0ea5e9;
  }
  
  :global(.focus\:ring-secondary:focus) {
    --tw-ring-color: #3b82f6;
  }
  
  :global(.focus\:ring-danger:focus) {
    --tw-ring-color: #ef4444;
  }
</style>

