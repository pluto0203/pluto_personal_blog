# Pluto AI

A modern personal blog about **AI, LLMs, software engineering, and build-in-public notes**, built with `Next.js` and prepared for **GitHub Pages CI/CD**.

## Stack

- `Next.js 15`
- `TypeScript`
- `Tailwind CSS v4`
- Static export via `next build`
- Deploy by `GitHub Actions` to `GitHub Pages`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to preview the site.

## Useful scripts

```bash
npm run dev        # start local dev server
npm run lint       # run ESLint
npm run typecheck  # run TypeScript checks
npm run build      # create static export in /out
npm run check      # lint + typecheck + build
npm run preview    # preview exported /out locally
npm run clean      # remove .next and out
```

## Content & routes

Main pages currently available:

- `/` — homepage
- `/blog` — all posts
- `/post/[slug]` — article detail
- `/archive` — archive view
- `/category/[cat]` — topic filter
- `/series` — grouped reading paths
- `/about` — author / blog info

Blog content now lives in `content/posts/*.mdx`.

### Add a new post

1. Copy `content/posts/_template.mdx`
2. Rename it to your slug, for example `my-first-rag-note.mdx`
3. Fill in the frontmatter and article body
4. Set `draft: false`
5. Commit and push to `main` → GitHub Actions will rebuild and deploy the site

## GitHub Pages CI/CD setup

The workflow is already included at `.github/workflows/deploy.yml`.

### 1. Push the repo to GitHub
Repository target:

```text
pluto0203/pluto_personal_blog
```

### 2. Enable GitHub Pages
In GitHub:

- Go to **Settings** → **Pages**
- Under **Build and deployment**, choose **GitHub Actions**

### 3. Ensure Actions permissions are enabled
In **Settings** → **Actions** → **General**:

- Allow workflows to run
- Set **Workflow permissions** to **Read and write permissions**

### 4. Deploy flow
Whenever you:

- push to `main` → CI runs + deploys to GitHub Pages
- open a PR to `main` → CI runs checks only, no deploy

### 5. Expected site URL
Once deployed, the site should be available at:

```text
https://pluto0203.github.io/pluto_personal_blog/
```

## Notes

- `next.config.ts` already handles `basePath` / `assetPrefix` automatically for GitHub Pages.
- The reference UI folder `neural-notes/` is excluded from lint/type-check so it does not block deployment.
- Before pushing, run:

```bash
npm run check
```

