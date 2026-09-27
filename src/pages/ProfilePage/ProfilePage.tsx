import useSEO from '@/hooks/useSEO'
import { resolveAbsoluteUrl, SITE_CONFIG } from '@/constants/seo'

const ProfilePage = () => {
  useSEO({
    title: 'User Profile & Settings',
    description:
      'Manage your account profile, personal preferences, and security settings within the React starter template.',
    canonicalUrl: '/profile',
    keywords: ['user profile', 'account settings', 'starter template user'],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: `User Profile — ${SITE_CONFIG.name}`,
      url: resolveAbsoluteUrl('/profile')
    }
  })

  return (
    <section aria-labelledby='profile-heading' className='space-y-6 max-w-md w-full text-left'>
      <div className='text-center space-y-2 mb-6'>
        <h1 id='profile-heading' className='text-3xl font-bold tracking-tight'>
          User Profile
        </h1>
        <p className='text-sm text-base-content/70'>
          Account overview and personal application preferences.
        </p>
      </div>

      <div className='p-6 rounded-2xl border border-base-200 bg-base-200/40 shadow-sm space-y-4'>
        <div className='flex items-center space-x-4'>
          <div className='avatar placeholder'>
            <div className='bg-primary text-primary-content rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl'>
              U
            </div>
          </div>
          <div>
            <h2 className='text-lg font-semibold'>Guest User</h2>
            <p className='text-xs text-base-content/60'>guest@example.com</p>
          </div>
        </div>

        <div className='divider my-2' />

        <div className='space-y-3 text-sm'>
          <div className='flex justify-between items-center py-1'>
            <span className='text-base-content/70'>Account Type</span>
            <span className='badge badge-neutral badge-sm'>Demo User</span>
          </div>
          <div className='flex justify-between items-center py-1'>
            <span className='text-base-content/70'>Status</span>
            <span className='badge badge-success badge-sm'>Active</span>
          </div>
          <div className='flex justify-between items-center py-1'>
            <span className='text-base-content/70'>Auth Provider</span>
            <span className='font-mono text-xs'>Local Session</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
