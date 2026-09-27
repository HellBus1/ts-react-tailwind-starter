import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distPath = path.resolve(rootDir, 'dist')
const distSsrPath = path.resolve(rootDir, 'dist-ssr')

const BASE_URL = (process.env.VITE_SITE_URL || 'https://ts-react-tailwind-starter.vercel.app').replace(/\/+$/, '')
const TODAY = new Date().toISOString().split('T')[0]

async function prerender() {
  console.log('🚀 Starting build-time static HTML prerendering...')

  const templatePath = path.resolve(distPath, 'index.html')
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Client build template not found at ${templatePath}. Did you run "vite build" first?`)
  }

  const template = fs.readFileSync(templatePath, 'utf-8')

  const serverEntryFile = path.resolve(distSsrPath, 'entry-server.js')
  if (!fs.existsSync(serverEntryFile)) {
    throw new Error(`SSR build entry not found at ${serverEntryFile}. Did you run "vite build --ssr" first?`)
  }

  const { render } = await import(pathToFileURL(serverEntryFile).href)

  const routes = [
    {
      url: '/',
      title: 'Modern React 18 + TypeScript + Tailwind CSS Starter | React Starter',
      description:
        'A production-ready starter template featuring React 18, TypeScript, Tailwind CSS, DaisyUI, Vite, and build-time prerendering for optimal SEO.',
      keywords:
        'react starter template, typescript react vite, tailwind css starter, daisyui components, seo prerender react, vite ssr prerender, react 18 starter',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      priority: '1.0',
      changefreq: 'weekly',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'React TypeScript Tailwind Starter',
        url: `${BASE_URL}/`,
        description:
          'A production-ready starter template featuring React 18, TypeScript, Tailwind CSS, DaisyUI, Vite, and build-time prerendering.',
        author: {
          '@type': 'Person',
          name: 'Syubban Fakhriya',
          url: 'https://github.com/HellBus1'
        }
      }
    },
    {
      url: '/about',
      title: 'About This Starter Template | React Starter',
      description:
        'Discover the design principles, architecture, and technology stack powering this production-grade React TypeScript Tailwind starter template.',
      keywords:
        'about react starter, react template architecture, typescript best practices, seo ready template',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      priority: '0.8',
      changefreq: 'monthly',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About — React TypeScript Tailwind Starter',
        url: `${BASE_URL}/about`,
        description:
          'Technical overview and architecture of the React TypeScript Tailwind Starter template.',
        mainEntity: {
          '@type': 'SoftwareApplication',
          name: 'React TypeScript Tailwind Starter',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Any'
        }
      }
    },
    {
      url: '/profile',
      title: 'User Profile & Settings | React Starter',
      description:
        'Manage your account profile, personal preferences, and security settings within the React starter template.',
      keywords: 'user profile, account settings, starter template user',
      ogType: 'website',
      ogImage: '/og/og-image.jpg',
      priority: '0.6',
      changefreq: 'monthly',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'User Profile — React TypeScript Tailwind Starter',
        url: `${BASE_URL}/profile`
      }
    }
  ]

  for (const route of routes) {
    console.log(`  → Pre-rendering route: ${route.url}`)
    const { html } = render(route.url)
    const fullCanonical = `${BASE_URL}${route.url === '/' ? '/' : route.url}`
    const fullOgImage = route.ogImage.startsWith('http') ? route.ogImage : `${BASE_URL}${route.ogImage}`

    let pageHtml = template
      // Inject rendered app HTML
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      // Replace Title
      .replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)
      // Replace Meta Description
      .replace(
        /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="description" content="${route.description}" />`
      )
      // Replace Keywords
      .replace(
        /<meta\s+name=["']keywords["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="keywords" content="${route.keywords}" />`
      )
      // Replace Canonical
      .replace(
        /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
        `<link rel="canonical" href="${fullCanonical}" />`
      )
      // Replace OG Title & Twitter Title
      .replace(
        /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:title" content="${route.title}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="twitter:title" content="${route.title}" />`
      )
      // Replace OG Description & Twitter Description
      .replace(
        /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:description" content="${route.description}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="twitter:description" content="${route.description}" />`
      )
      // Replace OG URL & Twitter URL
      .replace(
        /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:url" content="${fullCanonical}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:url["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="twitter:url" content="${fullCanonical}" />`
      )
      // Replace OG Image & Twitter Image
      .replace(
        /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:image" content="${fullOgImage}" />`
      )
      .replace(
        /<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta name="twitter:image" content="${fullOgImage}" />`
      )
      // Replace OG Type
      .replace(
        /<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/i,
        `<meta property="og:type" content="${route.ogType || 'website'}" />`
      )

    // Inject route specific JSON-LD schema
    if (route.schema) {
      const schemaScript = `\n    <script id="prerendered-route-schema" type="application/ld+json">\n${JSON.stringify(route.schema, null, 2)}\n    </script>`
      pageHtml = pageHtml.replace('</head>', `${schemaScript}\n  </head>`)
    }

    // Determine target output directory
    if (route.url === '/') {
      fs.writeFileSync(path.resolve(distPath, 'index.html'), pageHtml, 'utf-8')
    } else {
      const targetDir = path.resolve(distPath, route.url.replace(/^\//, ''))
      fs.mkdirSync(targetDir, { recursive: true })
      fs.writeFileSync(path.resolve(targetDir, 'index.html'), pageHtml, 'utf-8')
    }
  }

  // Generate Sitemap XML
  console.log('📄 Generating sitemap.xml...')
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes
  .map(
    (item) => `  <url>
    <loc>${BASE_URL}${item.url === '/' ? '/' : item.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

  fs.writeFileSync(path.resolve(distPath, 'sitemap.xml'), sitemapXml, 'utf-8')
  fs.writeFileSync(path.resolve(rootDir, 'public/sitemap.xml'), sitemapXml, 'utf-8')

  // Clean up dist-ssr
  console.log('🧹 Cleaning up temporary SSR bundle...')
  fs.rmSync(distSsrPath, { recursive: true, force: true })

  console.log(`✅ Prerender complete! ${routes.length} pages generated into dist/ with full static HTML.`)
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})
