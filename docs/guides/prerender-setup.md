# How to Configure and Extend Build-Time Prerendering

This guide explains how build-time static HTML prerendering works in this project and how to add new routes.

---

## Overview

Unlike full Server-Side Rendering (SSR) which requires a Node.js server in production, build-time prerendering runs during `npm run build`:
1. **Client Build**: Bundles browser assets into `dist/`.
2. **SSR Build**: Bundles server entry into temporary directory `dist-ssr/`.
3. **Prerender Execution**: Node script renders each route to static HTML, updates meta tags and schemas, generates `sitemap.xml`, and deletes `dist-ssr/`.
4. **Hydration**: When the browser loads the static HTML, React hydrates the DOM seamlessly using `ReactDOM.hydrateRoot`.

---

## Adding a New Route to Prerendering

When you create a new route in your application:

### Step 1: Add the Route Component
Create your page component in `src/pages/` and register it in `src/routes.tsx`:

```tsx
// src/routes.tsx
import FeaturesPage from '@/pages/FeaturesPage/FeaturesPage'

export const routes: RouteObject[] = [
  {
    path: RouteName.HOME,
    element: <Root />,
    children: [
      // ... existing routes
      {
        path: '/features',
        element: <FeaturesPage />
      }
    ]
  }
]
```

### Step 2: Register in `scripts/prerender.js`
Open [`scripts/prerender.js`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/ts-react-tailwind-starter/scripts/prerender.js) and add your route entry to the `routes` array:

```javascript
{
  url: '/features',
  title: 'Platform Features | React Starter',
  description: 'Explore the full list of production-ready features included with this starter template.',
  keywords: 'react features, vite starter features',
  ogType: 'website',
  ogImage: '/og/og-image.jpg',
  priority: '0.8',
  changefreq: 'monthly',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Features — React TypeScript Tailwind Starter',
    url: `${BASE_URL}/features`
  }
}
```

---

## Verifying Prerender Output

Run the complete build command:

```bash
npm run build
```

Check the `dist/` directory:
- A new folder `dist/features/` should be created.
- Inside it, `dist/features/index.html` contains the full pre-rendered HTML.
- `dist/sitemap.xml` automatically lists the new URL with specified priority and change frequency.

Preview the build locally with static file serving:

```bash
npm run preview
```
