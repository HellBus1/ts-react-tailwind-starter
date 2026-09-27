export const SITE_CONFIG = {
  name: 'React TypeScript Tailwind Starter',
  shortName: 'React Starter',
  description:
    'A production-ready starter template featuring React 18, TypeScript, Tailwind CSS, DaisyUI, Vite, and build-time prerendering for maximum SEO performance.',
  url:
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
    'https://ts-react-tailwind-starter.vercel.app',
  author: 'Syubban Fakhriya',
  authorUrl: 'https://github.com/HellBus1',
  defaultOgImage: '/og/og-image.jpg',
  defaultOgType: 'website' as const,
  locale: 'en_US',
  keywords: [
    'react starter template',
    'typescript react vite',
    'tailwind css starter',
    'daisyui components',
    'seo prerender react',
    'vite ssr prerender',
    'react 18 starter'
  ]
}

export function resolveAbsoluteUrl(path = ''): string {
  const base = SITE_CONFIG.url.replace(/\/+$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${cleanPath}`
}

export function resolveOgImageUrl(image?: string): string {
  if (!image) {
    return resolveAbsoluteUrl(SITE_CONFIG.defaultOgImage)
  }
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }
  return resolveAbsoluteUrl(image)
}
