import useSEO from '@/hooks/useSEO'
import { resolveAbsoluteUrl, SITE_CONFIG } from '@/constants/seo'

const AboutPage = () => {
  useSEO({
    title: 'About This Starter Template',
    description:
      'Discover the design principles, architecture, and technology stack powering this production-grade React TypeScript Tailwind starter template.',
    canonicalUrl: '/about',
    keywords: [
      'about react starter',
      'react template architecture',
      'typescript best practices',
      'seo ready template'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About — ${SITE_CONFIG.name}`,
      url: resolveAbsoluteUrl('/about'),
      description:
        'Technical overview and architecture of the React TypeScript Tailwind Starter template.',
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: SITE_CONFIG.name,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any'
      }
    }
  })

  return (
    <article aria-labelledby='about-heading' className='space-y-6 max-w-2xl text-left'>
      <div className='text-center space-y-2 mb-8'>
        <h1 id='about-heading' className='text-3xl font-bold tracking-tight'>
          About This Starter
        </h1>
        <p className='text-base text-base-content/80'>
          Built to give developers a rock-solid, production-grade foundation for modern web
          applications.
        </p>
      </div>

      <div className='space-y-6'>
        <section aria-labelledby='stack-heading' className='space-y-3'>
          <h2 id='stack-heading' className='text-xl font-semibold text-primary'>
            Modern Technology Stack
          </h2>
          <ul className='list-disc list-inside space-y-1 text-sm text-base-content/80'>
            <li>
              <strong>React 18</strong> with concurrent rendering and hydration support
            </li>
            <li>
              <strong>TypeScript</strong> with strict type checking and strict compiler options
            </li>
            <li>
              <strong>Vite</strong> with React SWC plugin for sub-second build times
            </li>
            <li>
              <strong>Tailwind CSS 3</strong> &amp; <strong>DaisyUI 4</strong> for customizable,
              accessible UI themes
            </li>
            <li>
              <strong>React Router 7</strong> for modern declarative routing
            </li>
          </ul>
        </section>

        <section aria-labelledby='seo-philosophy-heading' className='space-y-3'>
          <h2 id='seo-philosophy-heading' className='text-xl font-semibold text-secondary'>
            SEO &amp; AI Search Engine Architecture
          </h2>
          <p className='text-sm text-base-content/80 leading-relaxed'>
            Single Page Applications (SPAs) often face indexing hurdles with search bots and AI
            crawlers. This template includes a zero-dependency build-time prerender pipeline that
            generates fully populated static HTML for every route, self-referencing canonicals,
            social meta cards, Schema.org JSON-LD, and an AI-friendly{' '}
            <code className='px-1 py-0.5 rounded bg-base-200 text-xs font-mono'>llms.txt</code>.
          </p>
        </section>
      </div>
    </article>
  )
}

export default AboutPage
