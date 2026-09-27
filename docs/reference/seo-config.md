# Configuration Reference: `src/constants/seo.ts`

Central location for all SEO, site branding, canonical URLs, and metadata settings.

---

## Configuration Object: `SITE_CONFIG`

```typescript
import { SITE_CONFIG } from '@/constants/seo'
```

### Properties

| Key | Type | Default Value | Description |
|:----|:-----|:--------------|:------------|
| `name` | `string` | `'React TypeScript Tailwind Starter'` | Full application name used in `og:site_name` and schemas. |
| `shortName` | `string` | `'React Starter'` | Concatenated into page titles (e.g. `Page | React Starter`). |
| `description` | `string` | *(Starter description)* | Fallback meta description when none is provided by a route. |
| `url` | `string` | `VITE_SITE_URL` or fallback Vercel URL | Canonical root URL used to construct absolute URLs. |
| `author` | `string` | `'Syubban Fakhriya'` | Default meta author tag. |
| `authorUrl` | `string` | `'https://github.com/HellBus1'` | Author URL for JSON-LD schemas. |
| `defaultOgImage`| `string` | `'/og/og-image.jpg'` | Relative path to default social share card banner. |
| `defaultOgType` | `'website'` | `'website'` | Default Open Graph type. |
| `locale` | `string` | `'en_US'` | Target Open Graph locale. |
| `keywords` | `string[]` | *(Array of starter keywords)* | Base keywords appended to every page. |

---

## Helper Functions

### `resolveAbsoluteUrl(path?: string): string`
Takes a relative path (e.g., `/about`) and produces an absolute canonical URL using `SITE_CONFIG.url`.

```typescript
resolveAbsoluteUrl('/about')
// => "https://ts-react-tailwind-starter.vercel.app/about"
```

### `resolveOgImageUrl(image?: string): string`
Returns an absolute image URL for Open Graph and Twitter Card tags.

```typescript
resolveOgImageUrl('/custom-banner.png')
// => "https://ts-react-tailwind-starter.vercel.app/custom-banner.png"
```
