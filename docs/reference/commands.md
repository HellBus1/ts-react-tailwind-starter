# Command Line Reference

This reference covers the primary npm and git commands used across the template and its feature branches.

---

## Core Development Commands

| Command | Description |
|:--------|:------------|
| `npm run dev` | Starts the Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript and creates optimized production assets. |
| `npm run preview` | Serves the production build directory locally for testing. |
| `npm run lint` | Runs ESLint over TypeScript and React files with zero tolerance for warnings. |
| `npm run lint:fix` | Automatically fixes code style and rule violations where possible. |
| `npm run format` | Runs Prettier to format source code across `.ts`, `.tsx`, and `.css` files. |

---

## Feature Branch Git Commands

### Exploring Feature Branches
```bash
# Fetch all remote branches
git fetch origin

# Switch to the SEO prerendering feature
git checkout feature/seo

# Switch to the Webapp authentication feature
git checkout feature/webapp

# Return to the base staging branch
git checkout staging
```

### Merging Features into Your Application
```bash
# Create a fresh branch for your project
git checkout -b my-awesome-app staging

# Merge SEO features into your branch
git merge origin/feature/seo

# Merge Auth features into your branch
git merge origin/feature/webapp
```

---

## SEO Branch Prerender Commands (`feature/seo`)

When working on the `feature/seo` branch, the build process includes:

| Command | Script Action |
|:--------|:--------------|
| `npm run build:client` | Runs TypeScript check (`tsc -b`) and client Vite build to `dist/`. |
| `npm run build:ssr` | Bundles server entry (`src/entry-server.tsx`) to temporary `dist-ssr/`. |
| `npm run build:prerender` | Executes `scripts/prerender.js` to generate static HTML for all routes and sitemap. |
| `npm run build` | Runs all three steps in sequence for a complete production build. |
