# dotenv-run docs

The documentation site for [dotenv-run](https://github.com/chihab/dotenv-run),
built with [Astro Starlight](https://starlight.astro.build/).

## Local development

All commands are run from this `docs/` directory:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `pnpm install`    | Install dependencies                         |
| `pnpm dev`        | Start the local dev server at `localhost:4321` |
| `pnpm build`      | Build the production site to `./dist/`       |
| `pnpm preview`    | Preview the production build locally         |

Content lives in `src/content/docs/` — every `.md` / `.mdx` file becomes a page.
The sidebar and site-wide SEO metadata are configured in `astro.config.mjs`.

## Deployment (Cloudflare Pages)

The site is deployed to **Cloudflare Pages** by
[`.github/workflows/docs.yml`](../.github/workflows/docs.yml):

- **Push to `main`** → production deployment.
- **Pull request** → preview deployment, with the preview URL posted as a
  sticky comment on the PR.

### One-time setup

1. Create a Cloudflare Pages project named **`dotenv-run`** (Direct Upload —
   the GitHub workflow builds and uploads, so no build command is needed on
   Cloudflare's side):

   ```sh
   npx wrangler pages project create dotenv-run --production-branch main
   ```

2. Add two **repository secrets** (Settings → Secrets and variables → Actions):

   | Secret                 | Where to find it                                             |
   | :--------------------- | :---------------------------------------------------------- |
   | `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens (use the "Edit Cloudflare Workers"/Pages template, or a token with **Pages: Edit**). |
   | `CLOUDFLARE_ACCOUNT_ID`| Cloudflare dashboard → Workers & Pages → Account ID.        |

   Until both secrets are present the workflow safely no-ops (it will not fail
   PR checks).

3. The production URL is `https://dotenv-run.pages.dev`. If you attach a custom
   domain in Cloudflare, update the `site` constant in `astro.config.mjs` and
   the `Sitemap:` line in `public/robots.txt` so canonical URLs and the sitemap
   stay correct for SEO.
