import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://dotenv.run',
	base: '/',
	integrations: [
		starlight({
			title: 'dotenv.run',
			social: {
				github: 'https://github.com/chihab/dotenv-run',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', link: '/' },
						{ label: 'Quick Start', link: '/getting-started/quick-start/' },
						{ label: 'Variables', items: [{ label: '.env files', link: '/getting-started/env-files/' }, { label: 'expand', link: '/getting-started/expand/' }, { label: 'command line', link: '/getting-started/command-line/' }] },
						{ label: 'Loading Priorities', link: '/getting-started/loading-priorities/' },
						{ label: 'Monorepo Setup ✨', link: '/getting-started/monorepo-setup/' },
						// { label: 'Comparison', link: '/getting-started/comparison/' },
						// { label: 'About', link: '/getting-started/about/' },
					],
				},
				{
					label: 'Integrations',
					items: [
						{ label: 'CLI', link: '/integrations/cli/' },
						{ label: 'Node.js', link: '/integrations/loader/' },
						{ label: 'Rollup', link: '/integrations/rollup/' },
						{ label: 'Webpack', link: '/integrations/webpack/' },
						// { label: 'Vite', link: '/integrations/vite/' },
						// { label: 'Babel', link: '/integrations/webpack/' },
						// { label: 'Jest', link: '/integrations/jest/' },
						// { label: 'SWC', link: '/integrations/swc/' },
						// { label: 'ESBuild', link: '/integrations/esbuild/' },
						{ label: 'Core', link: '/integrations/core/' },
					],
				},
				// {
				// 	label: 'Recipes',
				// 	items: [
				// 		{ label: 'Nx', link: '/recipes/nx/' },
				// 		{ label: 'Turbo', link: '/recipes/turbo/' },
				// 		{ label: 'Docker', link: '/recipes/docker/' },
				// 		{ label: 'Next.js', link: '/recipes/next.js/' },
				// 		{ label: 'Angular', link: '/integrations/angular/' },
				// 	],
				// },
			],
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			],
		}),
	],
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
