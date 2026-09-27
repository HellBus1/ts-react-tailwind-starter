# React 18 + TypeScript + Tailwind CSS Starter Template

<div align="center">

[![React Version](https://img.shields.io/github/package-json/dependency-version/HellBus1/ts-react-tailwind-starter/react?style=flat)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12+-5AD8E6?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

### 📚 Documentation Navigation

[Quick Start](#quick-start) • [Features](#features) • [SEO Guide](docs/guides/seo-setup.md) • [Prerendering Guide](docs/guides/prerender-setup.md) • [useSEO API](docs/reference/hooks-seo.md) • [SEO Config](docs/reference/seo-config.md) • [Build Scripts](docs/reference/scripts.md) • [Architecture Decisions (ADRs)](docs/decisions/)

</div>

---

## Description

A production-ready starter template designed to combine modern developer velocity with maximum search engine visibility. Built with React 18, TypeScript, Tailwind CSS, DaisyUI, Vite SWC, React Router 7, and a zero-dependency **build-time static HTML prerender pipeline**.

Unlike traditional Single Page Applications that return an empty HTML shell, this template pre-renders static HTML for every route at build time. Search engine crawlers, social media preview scrapers, and AI agents receive full HTML content and Schema.org metadata instantly without requiring a Node.js server in production.

---

## Features

- ⚡ **Vite + React SWC**: Sub-second cold starts and instant Hot Module Replacement.
- 🔍 **Build-Time Prerendering**: Pre-renders static HTML per route, eliminates hydration mismatches with `hydrateRoot`, and generates dynamic sitemaps.
- 🏷️ **Dynamic SEO & Social Sharing**: Custom `useSEO` hook for page titles, Open Graph cards, Twitter cards, canonical tags, and JSON-LD schema injection.
- 🤖 **AI-Search Engine Friendly**: Configured `robots.txt` granting access to GPTBot, ClaudeBot, PerplexityBot, and Google-Extended, plus a structured `llms.txt`.
- 🔋 **Styling & Components**: Utility-first [Tailwind CSS](https://tailwindcss.com/) paired with accessible [DaisyUI](https://daisyui.com/) themes.
- 📟 **Declarative Routing**: [React Router 7](https://reactrouter.com/) with nested layout support.
- 🛡️ **Code Quality**: Strict TypeScript, [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), and [lint-staged](https://github.com/lint-staged/lint-staged).

---

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/HellBus1/ts-react-tailwind-starter.git
cd ts-react-tailwind-starter
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Build for production (with prerendering)
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
| `npm run dev` | Start Vite dev server with Hot Module Replacement |
| `npm run build` | Full production build: client bundle + SSR bundle + prerendering |
| `npm run build:client` | TypeScript typecheck and Vite client bundle |
| `npm run build:ssr` | Bundle server entry point for prerendering |
| `npm run build:prerender` | Execute prerender script, write static HTML per route, and output sitemap |
| `npm run preview` | Locally serve the generated static `dist/` build |
| `npm run lint` | Run ESLint with zero-warning threshold |
| `npm run lint:fix` | Automatically resolve fixable ESLint issues |
| `npm run format` | Format code using Prettier |

---

## Documentation

Comprehensive guides following the [Diátaxis](https://diataxis.fr/) framework are available in [`docs/`](docs/):

- **Guides**:
  - [SEO Setup & Customization Guide](docs/guides/seo-setup.md)
  - [Build-Time Prerendering & Route Extension Guide](docs/guides/prerender-setup.md)
- **Reference**:
  - [useSEO Hook API Reference](docs/reference/hooks-seo.md)
  - [SEO Constants & Config Reference](docs/reference/seo-config.md)
  - [Build & Dev Scripts Reference](docs/reference/scripts.md)
- **Architecture Decisions (ADRs)**:
  - [ADR-001: Build-Time Prerendering Strategy](docs/decisions/ADR-001-prerender.md)
  - [ADR-003: Client-Side useSEO Hook with Build-Time Tag Replacement](docs/decisions/ADR-003-seo-approach.md)

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

Want to support future updates and high-quality open-source templates?

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/syubban)