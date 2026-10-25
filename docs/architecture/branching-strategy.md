# Repository Branching Strategy & Ecosystem

This repository is designed as a modular template ecosystem where developers can start with a clean foundation or adopt pre-built feature branches tailored for specific use cases.

---

## Branch Overview

```
                      ┌───────────────────────────┐
                      │          master           │  ◄── Stable production release
                      └─────────────┬─────────────┘
                                    │
                      ┌─────────────▼─────────────┐
                      │          staging          │  ◄── Base development & template hub
                      └───────┬───────────┬───────┘
                              │           │
         ┌────────────────────┘           └────────────────────┐
         ▼                                                     ▼
┌───────────────────────────┐                         ┌───────────────────────────┐
│        feature/seo        │                         │      feature/webapp       │
│  Build-Time Prerender &   │                         │  Authentication Flow &    │
│  SEO Optimization Engine  │                         │  Protected Route Guards   │
└───────────────────────────┘                         └───────────────────────────┘
```

---

## Branch Descriptions

### 1. `master`
- The default production branch.
- Contains the stable, minimal core template (React 18 + TypeScript + Tailwind CSS 3 + DaisyUI 4 + Vite + React Router).
- Maintained clean with minimal dependencies so you can build anything from scratch.

### 2. `staging`
- The primary development and integration branch.
- Contains the central documentation hub explaining all available features and guides.
- Any repository-wide enhancements and dependency upgrades are integrated here before releasing to `master`.

### 3. `feature/seo` (Standalone Feature Branch)
- **Goal**: Solves the Single Page Application (SPA) SEO and crawler indexability challenge.
- **Key Capabilities**:
  - Zero-server build-time prerendering (`vite build --ssr` + `scripts/prerender.js`).
  - Generates fully populated static HTML per route (`dist/`, `dist/about/`, `dist/profile/`).
  - Seamless hydration via `ReactDOM.hydrateRoot`.
  - Dynamic metadata hook (`useSEO`) for `<title>`, Open Graph, Twitter cards, canonical tags, and Schema.org JSON-LD.
  - Crawler access configuration in `robots.txt` specifically enabling modern AI bots (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
  - Auto-generated `sitemap.xml` and AI-oriented `llms.txt`.
  - Social sharing preview card at `public/og/og-image.jpg`.
  - Dedicated documentation and Architecture Decision Records (ADRs).

### 4. `feature/webapp` (Standalone Feature Branch)
- **Goal**: Turns the starter into a full-fledged web application with authentication and session management.
- **Key Capabilities**:
  - Modular mock authentication service in `src/services/mockAuth.ts` backed by `localStorage`.
  - Session expiration support (7 days with "Remember me", 24 hours standard).
  - Schema versioning (`AUTH_STORAGE_VERSION = 1`) to ensure data integrity across updates.
  - Auth pages: Sign In (`/login`), Registration (`/register`), and Password Reset (`/forgot-password`).
  - Route guard component (`ProtectedRoute`) that redirects unauthenticated users while remembering their target destination.
  - Auth-aware Navbar with interactive user avatar dropdown and sign out action.
  - Pre-seeded demo account: `demo@example.com` / `password123`.
  - Dedicated documentation, architecture flowcharts, and ADRs.

---

## How to Work with Feature Branches

### Option A: Use a Feature Branch as Your Project Starting Point
If you know your project requires SEO or Auth from day one:

```bash
# Clone the repository
git clone https://github.com/HellBus1/ts-react-tailwind-starter.git my-app
cd my-app

# Switch to the feature branch you need
git checkout feature/seo
# OR
git checkout feature/webapp

# Install dependencies and start developing
npm install
npm run dev
```

### Option B: Merge a Feature Branch into Your Existing Workspace
If you started from `staging` (or `master`) and want to incorporate the feature:

```bash
# Merge SEO prerender capabilities
git merge origin/feature/seo

# OR Merge Webapp Auth capabilities
git merge origin/feature/webapp
```

### Option C: Combining Both Features
Because both branches share the same foundational architecture, you can merge both branches sequentially into your custom project branch:

```bash
git checkout -b my-project staging
git merge origin/feature/seo
git merge origin/feature/webapp
```
*(Resolve any route merging preferences in `src/routes.tsx` and run `npm run build` to verify).*
