import useSEO from '@/hooks/useSEO'
import { resolveAbsoluteUrl, SITE_CONFIG } from '@/constants/seo'

const HomePage = () => {
  useSEO({
    title: 'Modern React 18 + TypeScript + Tailwind CSS Starter',
    description:
      'A production-ready starter template featuring React 18, TypeScript, Tailwind CSS, DaisyUI, Vite, and build-time prerendering for optimal SEO.',
    canonicalUrl: '/',
    keywords: [
      'react starter template',
      'typescript vite template',
      'tailwind css daisyui',
      'seo prerender react',
      'react 18 starter'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: resolveAbsoluteUrl('/'),
      description: SITE_CONFIG.description,
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.authorUrl
      }
    }
  })

  return (
    <section aria-labelledby='hero-heading' className='space-y-6 max-w-2xl'>
      <h1 id='hero-heading' className='text-3xl sm:text-4xl font-bold tracking-tight'>
        React TypeScript Tailwind Starter
      </h1>
      <p className='text-base sm:text-lg text-base-content/80 leading-relaxed'>
        A production-ready starter template combining React 18, TypeScript, Tailwind CSS, DaisyUI,
        React Router, and build-time prerendering for fast loading and search engine visibility.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left'>
        <div className='p-4 rounded-xl border border-base-200 bg-base-200/50 shadow-sm'>
          <h2 className='text-sm font-semibold uppercase tracking-wider text-primary mb-1'>
            ⚡ Blazing Fast
          </h2>
          <p className='text-xs text-base-content/70'>
            Powered by Vite with instant HMR and lightweight SWC compilation.
          </p>
        </div>
        <div className='p-4 rounded-xl border border-base-200 bg-base-200/50 shadow-sm'>
          <h2 className='text-sm font-semibold uppercase tracking-wider text-secondary mb-1'>
            🎨 Tailwind + DaisyUI
          </h2>
          <p className='text-xs text-base-content/70'>
            Utility-first styling with accessible, themed UI components out of the box.
          </p>
        </div>
        <div className='p-4 rounded-xl border border-base-200 bg-base-200/50 shadow-sm'>
          <h2 className='text-sm font-semibold uppercase tracking-wider text-accent mb-1'>
            🔍 SEO & Prerender
          </h2>
          <p className='text-xs text-base-content/70'>
            Build-time static HTML generation, dynamic meta tags, JSON-LD schema, and AI bot
            support.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HomePage
