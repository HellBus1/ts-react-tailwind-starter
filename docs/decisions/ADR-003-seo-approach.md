# ADR-003: Client-Side useSEO Hook with Build-Time Tag Replacement

## Status
Accepted

## Date
2026-09-27

## Context
A modern web application requires dynamic document metadata management:
- Updating page title and meta description during client-side route transitions.
- Injecting canonical URLs, Open Graph tags, and Twitter Cards for social sharing.
- Delivering valid Schema.org structured data (JSON-LD) for rich search snippets and LLM extraction.
- Ensuring zero hydration mismatches between static prerendered HTML and client React state.

## Decision
Create a lightweight, zero-dependency custom hook `useSEO` in `src/hooks/useSEO.ts` combined with regex-based tag substitution during the build-time prerender step (`scripts/prerender.js`).

1. **At Build Time**: `scripts/prerender.js` replaces static metadata placeholders in the HTML shell with route-specific tags, canonical links, and JSON-LD schema blocks.
2. **At Runtime**: When users navigate client-side, `useSEO` dynamically updates `document.title`, existing meta tags, canonical link attributes, and replaces the `#dynamic-seo-schema` script element.
3. **Hydration Safety**: `useSEO` executes inside React's `useEffect`, ensuring no DOM manipulation happens during initial hydration, completely preventing SSR hydration warning mismatches.

## Alternatives Considered

### 1. `react-helmet` or `react-helmet-async`
- **Pros**: Established library in the React ecosystem.
- **Cons**: Adds extra bundle weight, requires React Context wrappers, has maintenance and React 18 compatibility caveats, and still requires server-side string extraction logic to inject into HTML during prerendering.
- **Rejected**: A tailored 70-line TypeScript hook with native DOM manipulation provides cleaner separation and zero external dependencies.

### 2. Hardcoded Static Meta Tags in `index.html`
- **Pros**: Simple to set up.
- **Cons**: Every page shares identical titles, descriptions, and canonical tags, causing search engine penalties for duplicate metadata across routes.
- **Rejected**: Fails core SEO requirements.

## Consequences
- **Positive**: Zero external library dependencies or vulnerabilities.
- **Positive**: Full TypeScript typings for SEO properties and Schema.org structures.
- **Positive**: Flawless compatibility with React 18 concurrent mode and `hydrateRoot`.
- **Positive**: Dynamic schema injection enables rich results for articles, products, organizations, and software applications.
