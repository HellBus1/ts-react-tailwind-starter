# React 18 + TypeScript + Tailwind CSS Starter Template

<div align="center">

[![React Version](https://img.shields.io/github/package-json/dependency-version/HellBus1/ts-react-tailwind-starter/react?style=flat)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12+-5AD8E6?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

### 📚 Documentation Navigation

[Quick Start](#quick-start) • [Feature Branches](#available-feature-branches) • [Getting Started](docs/guides/getting-started.md) • [SEO Guide](docs/guides/seo-feature-guide.md) • [Auth Guide](docs/guides/auth-feature-guide.md) • [Branching Strategy](docs/architecture/branching-strategy.md) • [Commands Reference](docs/reference/commands.md)

</div>

---

## Description

A modern, production-grade starter template designed for frontend developer velocity and scalable application architecture. Built with **React 18**, **TypeScript**, **Tailwind CSS**, **DaisyUI**, **Vite SWC**, and **React Router**.

This repository is maintained as a modular ecosystem: start with the minimal, clean core on `staging` / `master`, or adopt dedicated feature branches pre-configured for search engine optimization or full web application authentication.

---

## Available Feature Branches

In addition to the clean base template, this repository provides two production-ready standalone feature branches:

### 🚀 1. `feature/seo` — SEO Engine & Build-Time Prerendering
Solves Single Page Application (SPA) indexing by generating static HTML at build time without requiring server runtimes:
- **Build-Time Prerender**: Multi-stage Vite SSR pipeline (`scripts/prerender.js`) that produces static HTML per route in `dist/`.
- **Hydration Safe**: Zero-flicker hydration using `ReactDOM.hydrateRoot`.
- **Dynamic SEO Hook**: `useSEO` for per-page `<title>`, Open Graph, Twitter cards, canonical URLs, and Schema.org JSON-LD structured data.
- **AI-Search Ready**: `robots.txt` explicitly granting access to AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`) and a plain-text `llms.txt`.
- **Social Sharing**: Included high-resolution social share preview card (`public/og/og-image.jpg`).
- **How to use**:
  ```bash
  git checkout feature/seo
  # OR merge into your project: git merge origin/feature/seo
  ```
- 📖 [Read the full SEO Feature Guide](docs/guides/seo-feature-guide.md)

---

### 🔐 2. `feature/webapp` — Authentication & User Sessions
Equips the starter with a complete client-side authentication system and route protection:
- **Modular Auth Service**: LocalStorage authentication with session expiry (7 days for remember-me, 24 hours standard) and schema versioning.
- **Pre-Seeded Demo Account**: Sign in immediately with `demo@example.com` / `password123`.
- **Auth Views**: Complete Sign In (`/login`), Registration (`/register` with live password strength meter), and Password Recovery (`/forgot-password`).
- **Route Guard**: `<ProtectedRoute>` component that redirects unauthenticated users while preserving their intended destination.
- **Auth-Aware Navigation**: Header with user avatar dropdown, email/role display, profile navigation, and sign-out button.
- **Code-Splitting**: Auth routes are lazy-loaded with `React.lazy` to keep the main bundle lightweight.
- **How to use**:
  ```bash
  git checkout feature/webapp
  # OR merge into your project: git merge origin/feature/webapp
  ```
- 📖 [Read the full Auth Feature Guide](docs/guides/auth-feature-guide.md)

---

### 🌿 How to Combine Both Features
Want both SEO prerendering and the Authentication flow in your project? You can combine them into your custom project branch:

```bash
git checkout -b my-project staging
git merge origin/feature/seo
git merge origin/feature/webapp
```

---

## Core Features

- ⚡ **Vite + React SWC**: Sub-second cold start and instant Hot Module Replacement.
- 🎨 **Tailwind CSS + DaisyUI**: Utility-first styling with accessible, themed UI components out of the box.
- 📟 **Declarative Navigation**: Configured with [React Router](https://reactrouter.com/) for layout-based routing.
- 📊 **Code Formatting**: [Prettier](https://prettier.io/) integrated for consistent formatting across the team.
- 🗂️ **Strict Linting**: [ESLint](https://eslint.org/) configured with zero-warning threshold.
- 📮 **Automated Git Hooks**: [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged) format and lint changes automatically on every commit.

---

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/HellBus1/ts-react-tailwind-starter.git my-app
cd my-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

---

## Scripts & Commands

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start development server with Hot Module Replacement |
| `npm run build` | Compile TypeScript and bundle production assets |
| `npm run preview` | Locally serve the production `dist/` directory |
| `npm run lint` | Run ESLint across TypeScript and React files |
| `npm run lint:fix` | Automatically fix ESLint violations |
| `npm run format` | Format source code using Prettier |

---

## Documentation Index

Explore our comprehensive guides structured under the [Diátaxis](https://diataxis.fr/) framework in [`docs/`](docs/):

| Document | Category | Description |
|:---------|:---------|:------------|
| [Getting Started Guide](docs/guides/getting-started.md) | How-to | Step-by-step setup, directory structure, and development commands |
| [SEO Feature Guide](docs/guides/seo-feature-guide.md) | How-to | Prerender pipeline, `useSEO` hook, AI crawlers, and adoption steps |
| [Auth Feature Guide](docs/guides/auth-feature-guide.md) | How-to | Auth flow, protected routes, demo user, and backend migration |
| [Branching Strategy](docs/architecture/branching-strategy.md) | Architecture | Repository branch ecosystem, feature branch workflows, and merging |
| [Command Reference](docs/reference/commands.md) | Reference | Full reference of npm scripts and git feature commands |

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request from `staging` to `master`.

## Support

Want to support future updates and high-quality open-source templates?

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/syubban)