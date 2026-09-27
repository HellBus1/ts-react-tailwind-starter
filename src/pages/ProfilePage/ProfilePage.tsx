import useAuth from '@/hooks/useAuth'

export const ProfilePage = () => {
  const { user, logout, isLoading } = useAuth()

  return (
    <section aria-labelledby='profile-heading' className='space-y-6 max-w-md w-full text-left'>
      <div className='text-center space-y-2 mb-6'>
        <h1 id='profile-heading' className='text-3xl font-bold tracking-tight'>
          User Profile
        </h1>
        <p className='text-sm text-base-content/70'>
          Authenticated session details and account preferences.
        </p>
      </div>

      <div className='p-6 rounded-2xl border border-base-200 bg-base-200/40 shadow-sm space-y-6'>
        <div className='flex items-center space-x-4'>
          <div className='avatar placeholder'>
            <div className='bg-primary text-primary-content rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl'>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          <div>
            <h2 className='text-lg font-semibold'>{user?.name || 'Authenticated User'}</h2>
            <p className='text-xs text-base-content/60'>{user?.email || 'N/A'}</p>
          </div>
        </div>

        <div className='divider my-2' />

        <div className='space-y-3 text-sm'>
          <div className='flex justify-between items-center py-1'>
            <span className='text-base-content/70'>User ID</span>
            <span className='font-mono text-xs text-base-content/90'>{user?.id || '—'}</span>
          </div>
          <div className='flex justify-between items-center py-1'>
            <span className='text-base-content/70'>Account Role</span>
            <span className='badge badge-primary badge-sm uppercase'>{user?.role || 'user'}</span>
          </div>
          <div className='flex justify-between items-center py-1'>
            <span className='text-base-content/70'>Session Status</span>
            <span className='badge badge-success badge-sm'>Authenticated</span>
          </div>
          <div className='flex justify-between items-center py-1'>
            <span className='text-base-content/70'>Member Since</span>
            <span className='text-xs text-base-content/80'>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recent'}
            </span>
          </div>
        </div>

        <button
          onClick={() => logout()}
          disabled={isLoading}
          className='btn btn-outline btn-error btn-sm w-full mt-4'
        >
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </section>
  )
}

export default ProfilePage
