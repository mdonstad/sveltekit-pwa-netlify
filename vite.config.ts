import { svelteTesting } from '@testing-library/svelte/vite';
//import process from 'node:process'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
export default defineConfig({
	plugins: [sveltekit(),
		SvelteKitPWA({
			 injectRegister: false,
			srcDir: './src',
			mode: 'development',
			scope: '/',
			base: '/',
			registerType:"prompt",
			//selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			pwaAssets: {
			  config: true,
			},
			manifest: {
				id:'svelte-starter',
				short_name: 'SvelteKit PWA Starter',
				name: 'SvelteKit PWA',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#9236A4',
				background_color: '#ffffff',
				display_override:["window-controls-overlay"],
				screenshots: [
					{
					"src": "./avgjoe.svg",
					"sizes": "487x587",
					"type": "application/svg+xml",
					"form_factor": "wide",
					"label": "Application"
					}
  				]
			  },
			  injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
			  },
			  workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
			  },
			  devOptions: {
				enabled: false,
				suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
				type: 'module',
				navigateFallback: '/',
			  },
			//strategies: 'injectManifest',
			//filename: 'sw.ts', 
		})
	],
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	},
	preview: {
		port: 4174,
	},
});
