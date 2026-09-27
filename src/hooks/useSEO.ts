import { useEffect } from 'react'
import { SITE_CONFIG, resolveAbsoluteUrl, resolveOgImageUrl } from '@/constants/seo'

export interface SEOProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  keywords?: string[]
  publishedDate?: string
  author?: string
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
}

export const useSEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = SITE_CONFIG.defaultOgImage,
  ogType = 'website',
  keywords = [],
  publishedDate,
  author = SITE_CONFIG.author,
  schema
}: SEOProps) => {
  useEffect(() => {
    if (typeof document === 'undefined') return

    // 1. Title formatting
    const formattedTitle =
      title.includes(SITE_CONFIG.shortName) || title.includes(SITE_CONFIG.name)
        ? title
        : `${title} | ${SITE_CONFIG.shortName}`
    document.title = formattedTitle

    // Helper for meta tag updates/creation
    const setMetaTag = (
      selector: string,
      attr: 'name' | 'property',
      name: string,
      content: string
    ) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Standard Meta Tags
    setMetaTag("meta[name='description']", 'name', 'description', description)

    const allKeywords = Array.from(new Set([...keywords, ...SITE_CONFIG.keywords]))
    setMetaTag("meta[name='keywords']", 'name', 'keywords', allKeywords.join(', '))
    setMetaTag("meta[name='author']", 'name', 'author', author)

    // 3. Open Graph
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
    const fullCanonical = canonicalUrl
      ? canonicalUrl.startsWith('http')
        ? canonicalUrl
        : resolveAbsoluteUrl(canonicalUrl)
      : resolveAbsoluteUrl(currentPath)

    const resolvedImage = resolveOgImageUrl(ogImage)

    setMetaTag("meta[property='og:title']", 'property', 'og:title', formattedTitle)
    setMetaTag("meta[property='og:description']", 'property', 'og:description', description)
    setMetaTag("meta[property='og:url']", 'property', 'og:url', fullCanonical)
    setMetaTag("meta[property='og:image']", 'property', 'og:image', resolvedImage)
    setMetaTag("meta[property='og:type']", 'property', 'og:type', ogType)
    setMetaTag("meta[property='og:site_name']", 'property', 'og:site_name', SITE_CONFIG.name)
    setMetaTag("meta[property='og:locale']", 'property', 'og:locale', SITE_CONFIG.locale)

    // 4. Twitter Cards
    setMetaTag("meta[name='twitter:card']", 'name', 'twitter:card', 'summary_large_image')
    setMetaTag("meta[name='twitter:title']", 'name', 'twitter:title', formattedTitle)
    setMetaTag("meta[name='twitter:description']", 'name', 'twitter:description', description)
    setMetaTag("meta[name='twitter:image']", 'name', 'twitter:image', resolvedImage)

    // 5. Canonical URL
    let canonicalTag = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', fullCanonical)

    // 6. JSON-LD Schema
    const existingSchemaScript = document.getElementById('dynamic-seo-schema')
    if (existingSchemaScript) {
      existingSchemaScript.remove()
    }

    if (schema) {
      const script = document.createElement('script')
      script.id = 'dynamic-seo-schema'
      script.type = 'application/ld+json'
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    }
  }, [title, description, canonicalUrl, ogImage, ogType, keywords, publishedDate, author, schema])
}

export default useSEO
