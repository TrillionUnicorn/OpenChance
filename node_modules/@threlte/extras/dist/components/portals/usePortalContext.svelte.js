import { useThrelteUserContext } from '@threlte/core';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';
const createPortalContext = () => {
    return new SvelteMap();
};
export const usePortalContext = () => {
    return useThrelteUserContext('threlte-portals', createPortalContext());
};
