import type { Snippet } from 'svelte';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';
type PortalContext = SvelteMap<string, SvelteSet<Snippet>>;
export declare const usePortalContext: () => PortalContext;
export {};
