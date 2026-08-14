import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Production site URL. Used for canonical links, sitemap and social tags (SEO).
// Update this if you serve the docs from a custom domain.
const site = 'https://dotenv-run.pages.dev';

// https://astro.build/config
export default defineConfig({
	site,
	base: '/',
	integrations: [
		starlight({
			title: 'dotenv-run',
			description:
				'Load .env environment variables in Angular, Node.js, Vite, Webpack, Rollup and esbuild — with first-class monorepo support (Nx, Turborepo).',
			logo: {
				src: './public/favicon.svg',
				alt: 'dotenv-run',
			},
			favicon: '/favicon.svg',
			social: {
				github: 'https://github.com/chihab/dotenv-run',
			},
			// Extra <head> tags for SEO / social previews. Starlight already emits
			// the title, description, canonical URL and Open Graph title/description.
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'keywords',
						content:
							'angular environment variables, ngx-env, dotenv angular, .env angular, dotenv monorepo, nx environment variables, turborepo env, import.meta.env, process.env, dotenv cli, dotenv vite, dotenv webpack',
					},
				},
				{ tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
				{ tag: 'meta', attrs: { property: 'og:site_name', content: 'dotenv-run' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', link: '/' },
						{ label: 'Quick Start', link: '/getting-started/quick-start/' },
					],
				},
				{
					label: 'Popular',
					items: [
						{ label: 'Angular · @ngx-env/builder', link: '/integrations/angular/' },
						{ label: 'CLI · @dotenv-run/cli', link: '/integrations/cli/' },
						{ label: 'Core · @dotenv-run/core', link: '/integrations/core/' },
						{ label: 'Monorepo Setup ✨', link: '/getting-started/monorepo-setup/' },
					],
				},
				{
					label: 'Bundlers',
					items: [
						{ label: 'Vite', link: '/integrations/vite/' },
						{ label: 'Webpack', link: '/integrations/webpack/' },
						{ label: 'Rollup', link: '/integrations/rollup/' },
						{ label: 'esbuild', link: '/integrations/esbuild/' },
						{ label: 'Node.js', link: '/integrations/loader/' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: '.env files', link: '/getting-started/env-files/' },
						{ label: 'Command line', link: '/getting-started/command-line/' },
						{ label: 'Expand variables', link: '/getting-started/expand/' },
						{ label: 'Loading priorities', link: '/getting-started/loading-priorities/' },
					],
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
