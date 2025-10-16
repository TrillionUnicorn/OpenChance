export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BD9Bb7IC.js",app:"_app/immutable/entry/app.DXR8EhJY.js",imports:["_app/immutable/entry/start.BD9Bb7IC.js","_app/immutable/chunks/BXqRRRlR.js","_app/immutable/chunks/D9WMsPK0.js","_app/immutable/chunks/DJFIOxsX.js","_app/immutable/chunks/fqUioz91.js","_app/immutable/chunks/CqOvGpSk.js","_app/immutable/entry/app.DXR8EhJY.js","_app/immutable/chunks/DJFIOxsX.js","_app/immutable/chunks/fqUioz91.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/D9WMsPK0.js","_app/immutable/chunks/yg4WZn4e.js","_app/immutable/chunks/D_2o_LSl.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/challenges",
				pattern: /^\/challenges\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/challenges/[id]",
				pattern: /^\/challenges\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
