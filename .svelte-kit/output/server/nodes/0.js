

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CLd4Iyn5.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DTJK7tYi.js","_app/immutable/chunks/BersJEMe.js"];
export const stylesheets = [];
export const fonts = [];
