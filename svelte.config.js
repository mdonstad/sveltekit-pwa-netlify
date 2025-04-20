import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter(),
		serviceWorker: {
			register: false,
		  },
		files: {
			serviceWorker: 'src/sw.ts', 
		  }
	 }
};

export default config;
