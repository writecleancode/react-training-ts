/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
	},
	resolve: {
		alias: {
			src: '/src',
			// assets: '/src/assets',
			// components: '/src/components',
			// helpers: '/src/helpers',
			// hooks: '/src/hooks',
			// mocks: '/src/mocks',
			// providers: '/src/providers',
			// store: '/src/store',
			// types: '/src/providers',
			// views: '/src/views',
		},
	},
});
