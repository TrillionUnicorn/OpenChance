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
		client: {start:"_app/immutable/entry/start.CFIhO9Ar.js",app:"_app/immutable/entry/app.B1ogT0NS.js",imports:["_app/immutable/entry/start.CFIhO9Ar.js","_app/immutable/chunks/DupU3PjZ.js","_app/immutable/chunks/BeJnPwHp.js","_app/immutable/chunks/DTJK7tYi.js","_app/immutable/chunks/CwShZhVV.js","_app/immutable/chunks/BersJEMe.js","_app/immutable/entry/app.B1ogT0NS.js","_app/immutable/chunks/DTJK7tYi.js","_app/immutable/chunks/CwShZhVV.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BeJnPwHp.js","_app/immutable/chunks/BersJEMe.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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
