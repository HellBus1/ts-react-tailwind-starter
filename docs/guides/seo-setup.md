# How to Configure SEO for Your Application

This how-to guide explains how to customize search engine optimization (SEO), metadata, and social previews for your application using the built-in SEO engine.

---

## 1. Set Your Site URL and Global Metadata

Global settings live in [`src/constants/seo.ts`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/ts-react-tailwind-starter/src/constants/seo.ts).

### Environment Variable
In production or staging, define `VITE_SITE_URL` in your environment or `.env` file:

```bash
VITE_SITE_URL=https://your-domain.com
```

### Centralized Config File
Edit `src/constants/seo.ts` to customize branding and defaults:

```typescript
export const SITE_CONFIG = {
  name: 'Your App Name',
  shortName: 'YourApp',
  description: 'Your production-ready web application description.',
  url: import.meta.env.VITE_SITE_URL || 'https://your-domain.com',
  author: 'Your Name or Company',
  authorUrl: 'https://your-domain.com/about',
  defaultOgImage: '/og/og-image.jpg',
  locale: 'en_US',
  keywords: ['your', 'keywords', 'here']
}
```

---

## 2. Customize the Default OG Image

Replace the image file at:
```
public/og/og-image.jpg
```
Recommended specifications:
- **Dimensions**: 1200 × 630 pixels (16:9 ratio)
- **Format**: JPEG or PNG
- **File size**: under 300 KB for rapid social card rendering

---

## 3. Configure Per-Page SEO with `useSEO`

Call the `useSEO` hook at the top level of any page component:

```tsx
import useSEO from '@/hooks/useSEO'
import { resolveAbsoluteUrl, SITE_CONFIG } from '@/constants/seo'

const PricingPage = () => {
  useSEO({
    title: 'Transparent Pricing Plans',
    description: 'Explore affordable pricing tiers for teams and individual developers.',
    canonicalUrl: '/pricing',
    keywords: ['pricing', 'subscription plans'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${SITE_CONFIG.name} Pro`,
      offers: {
        '@type': 'Offer',
        price: '19.00',
        priceCurrency: 'USD'
      }
    }
  })

  return (
    <main>
      <h1>Pricing Plans</h1>
    </main>
  )
}

export default PricingPage
```

---

## 4. Control Crawler Indexing with Query Parameters

The included [`MetaTagController`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/ts-react-tailwind-starter/src/components/MetaTagController/MetaTagController.tsx) automatically flags temporary or campaign links (such as `?ref=...` or `?noindex=true`) with `<meta name="robots" content="noindex, follow">` to prevent duplicate indexing in search engines while preserving link authority.

---

## 5. Verify SEO Setup

1. Run a production build:
   ```bash
   npm run build
   ```
2. Test static HTML output in `dist/index.html` or inspect via browser DevTools.
3. Validate structured data using [Google Rich Results Test](https://search.google.com/test/rich-results) or [Schema.org Validator](https://validator.schema.org/).
