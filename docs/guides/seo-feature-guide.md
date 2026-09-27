# SEO Engine & Prerendering Feature Guide (`feature/seo`)

The `feature/seo` branch provides a full-stack SEO and build-time static HTML prerender pipeline. It turns your client-side React SPA into a lightning-fast, 100% crawlable website without requiring server runtimes (like Next.js or Node SSR servers).

---

## What `feature/seo` Adds

| Component | Path | Description |
|:----------|:-----|:------------|
| **Prerender Script** | `scripts/prerender.js` | Renders each route to static HTML, replaces meta tags, and generates dynamic sitemaps. |
| **Server Entry** | `src/entry-server.tsx` | SSR entry utilizing `createMemoryRouter` and `ReactDOMServer.renderToString`. |
| **Hydration Entry** | `src/main.tsx` | Hydration logic with `ReactDOM.hydrateRoot` when static content exists. |
| **Dynamic SEO Hook** | `src/hooks/useSEO.ts` | Sets `<title>`, Open Graph, Twitter cards, canonical link, and Schema.org JSON-LD dynamically. |
| **Meta Controller** | `src/components/MetaTagController/` | Sets `noindex, follow` on temporary campaign or referral queries (`?ref=...`). |
| **Centralized Config** | `src/constants/seo.ts` | Global site name, base URL, keywords, and URL helpers. |
| **AI Crawler Rules** | `public/robots.txt` | Explicitly grants access to `GPTBot`, `ClaudeBot`, `PerplexityBot`, and `Google-Extended`. |
| **AI Knowledge File**| `public/llms.txt` | Structured plain-text documentation optimized for AI agents and LLM citations. |
| **Social Card Banner**| `public/og/og-image.jpg` | High-resolution 1200x630 social share preview card. |

---

## How to Adopt `feature/seo`

### 1. Checkout or Merge the Branch

To switch to the standalone SEO version:
```bash
git checkout feature/seo
```

To pull the SEO capabilities into your active project branch:
```bash
git merge origin/feature/seo
```

### 2. Available Build Scripts

When on `feature/seo`, the build script runs a multi-stage pipeline:
```bash
# 1. Typecheck and client bundle -> dist/
npm run build:client

# 2. Bundle SSR entry -> dist-ssr/
npm run build:ssr

# 3. Prerender all routes to static HTML & generate sitemap -> dist/*.html
npm run build:prerender

# Or run everything at once:
npm run build
```

---

## Using `useSEO` in Your Pages

```tsx
import useSEO from '@/hooks/useSEO'
import { resolveAbsoluteUrl, SITE_CONFIG } from '@/constants/seo'

const MyPage = () => {
  useSEO({
    title: 'My Custom Page Title',
    description: 'An informative summary of this page for search engines and social cards.',
    canonicalUrl: '/my-page',
    keywords: ['custom', 'keywords'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'My Custom Page',
      url: resolveAbsoluteUrl('/my-page')
    }
  })

  return (
    <main>
      <h1>My Custom Page</h1>
    </main>
  )
}
```

---

## Adding New Routes to Prerendering

When you add a new page component in `src/routes.tsx`, register it in [`scripts/prerender.js`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/ts-react-tailwind-starter/scripts/prerender.js):

```javascript
// scripts/prerender.js
const routes = [
  // ... existing routes
  {
    url: '/my-page',
    title: 'My Custom Page Title | React Starter',
    description: 'An informative summary of this page.',
    keywords: 'custom, keywords',
    ogType: 'website',
    ogImage: '/og/og-image.jpg',
    priority: '0.8',
    changefreq: 'monthly'
  }
]
```

When you run `npm run build`, a new folder `dist/my-page/index.html` will be generated with fully populated HTML content and registered in `dist/sitemap.xml`.
