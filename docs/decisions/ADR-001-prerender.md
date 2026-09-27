# ADR-001: Build-Time Prerendering Strategy

## Status
Accepted

## Date
2026-09-27

## Context
Single Page Applications (SPAs) built with Vite and React provide superior developer experience and fast client navigation. However, standard SPAs deliver an empty `<div id="root"></div>` in raw HTML responses. This creates significant drawbacks:
- Web crawlers and social media preview scrapers (Twitter, LinkedIn, Discord) often do not execute client-side JavaScript.
- AI search crawlers (GPTBot, ClaudeBot, PerplexityBot) prioritize fast, statically extracted HTML content over heavyweight headless browser rendering.
- Initial paint metrics can suffer from client script bundle evaluation delays.

We needed a strategy to deliver complete HTML on initial request while maintaining the simplicity and low cost of static hosting (Vercel, GitHub Pages, Netlify, Cloudflare Pages, S3).

## Decision
Implement a zero-dependency **build-time static HTML prerender pipeline** using Vite's native SSR mode (`vite build --ssr`) and Node.js (`scripts/prerender.js`), paired with React 18 hydration (`ReactDOM.hydrateRoot`).

The pipeline:
1. Builds client bundle to `dist/`.
2. Compiles `src/entry-server.tsx` to `dist-ssr/`.
3. Iterates declared application routes, rendering each with `createMemoryRouter` and `ReactDOMServer.renderToString`.
4. Injects pre-rendered HTML, route-specific title, canonical links, social tags, and JSON-LD schema into individual static `index.html` files per route.
5. Emits an updated `sitemap.xml`.
6. Removes temporary `dist-ssr/` artifacts.

## Alternatives Considered

### 1. Full Runtime Server-Side Rendering (Next.js / Remix / Express)
- **Pros**: Dynamic SSR for arbitrary runtime URLs and real-time database content.
- **Cons**: Requires continuous server infrastructure, container management, higher hosting costs, cold starts, and complex deployment pipelines.
- **Rejected**: Overkill for a lightweight starter template intended to deploy anywhere as static files.

### 2. Client-Only SPA with `react-helmet-async`
- **Pros**: Zero build script complexity.
- **Cons**: Does not solve raw HTML scraping for social media bots and non-JS search crawlers. Initial HTML response remains empty.
- **Rejected**: Does not satisfy production SEO requirements.

### 3. Headless Browser Prerendering (Puppeteer / Prerender.io)
- **Pros**: Automates arbitrary JS execution.
- **Cons**: Slow build times, heavy Chromium dependencies in CI/CD, flaky process lifecycles.
- **Rejected**: Brittle in CI and significantly slows down developer deployments.

## Consequences
- **Positive**: Blazing fast static file delivery from any CDN or static hosting platform.
- **Positive**: 100% crawlable by both traditional search engines and modern AI indexers.
- **Positive**: Zero ongoing server maintenance costs.
- **Neutral**: When new static routes are introduced, their route metadata must be declared in `scripts/prerender.js`.
