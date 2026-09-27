# API Reference: `useSEO`

The `useSEO` hook provides dynamic client-side document head management, updating `<title>`, standard meta tags, Open Graph cards, Twitter metadata, canonical URLs, and Schema.org JSON-LD scripts.

---

## Import

```typescript
import useSEO from '@/hooks/useSEO'
import type { SEOProps } from '@/hooks/useSEO'
```

---

## Interface: `SEOProps`

| Property | Type | Default | Description |
|:---------|:-----|:--------|:------------|
| `title` | `string` | *(Required)* | Base title for the page. Formatted automatically with site short name. |
| `description` | `string` | *(Required)* | Meta description for search engines and social cards (150-160 chars recommended). |
| `canonicalUrl` | `string` | Current pathname | Absolute or relative URL for canonical link tag and social sharing URLs. |
| `ogImage` | `string` | `SITE_CONFIG.defaultOgImage` | Relative or absolute path to the social share preview banner. |
| `ogType` | `'website' \| 'article'` | `'website'` | Open Graph entity type. |
| `keywords` | `string[]` | `[]` | Additional page-specific keywords merged with global site keywords. |
| `publishedDate`| `string` | `undefined` | ISO 8601 publication timestamp (useful for articles). |
| `author` | `string` | `SITE_CONFIG.author` | Page author or creator name. |
| `schema` | `Record<string, unknown> \| Array<Record<string, unknown>>` | `undefined` | Schema.org JSON-LD object or array of objects injected into the document head. |

---

## Behavior Details

1. **Title Formatting**:
   If `title` already contains `SITE_CONFIG.shortName` or `SITE_CONFIG.name`, it is applied as-is. Otherwise, it is formatted as:
   ```
   ${title} | ${SITE_CONFIG.shortName}
   ```

2. **Canonical Resolution**:
   If `canonicalUrl` begins with `http://` or `https://`, it is used directly. Otherwise, it is prefixed with `SITE_CONFIG.url`.

3. **Dynamic Schema Injection**:
   If provided, `schema` is serialized into `<script id="dynamic-seo-schema" type="application/ld+json">`. Previous dynamic schemas are cleanly replaced on route transitions.

4. **SSR / Prerender Safe**:
   Does not trigger `window` or `document` references outside of `useEffect`.
