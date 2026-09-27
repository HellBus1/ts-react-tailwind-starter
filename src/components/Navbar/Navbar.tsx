import { Link, useLocation } from 'react-router-dom'
import { NavbarRouteName, RouteName } from '@/constants/RouteName'
import useAuth from '@/hooks/useAuth'

export const Navbar = () => {
  const { pathname } = useLocation()
  const { user, isAuthenticated, logout, isLoading } = useAuth()

  return (
    <header className='navbar bg-base-100/90 backdrop-blur-md border-b border-base-200 fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 transition-all'>
      <div className='navbar-start'>
        <Link to={RouteName.HOME} className='btn btn-ghost text-sm sm:text-base font-bold gap-2'>
          <span className='w-2 h-2 rounded-full bg-primary animate-pulse' />
          React Starter
        </Link>
      </div>

      <div className='navbar-center hidden sm:flex'>
        <nav
          role='tablist'
          aria-label='Main navigation'
          className='tabs tabs-boxed bg-base-200/60 p-1'
        >
          {Object.entries(NavbarRouteName).map(([key, path]) => (
            <Link
              key={key}
              to={path}
              role='tab'
              aria-selected={pathname === path}
              className={`tab tab-sm font-medium transition-colors ${
                pathname === path ? 'tab-active !bg-base-100 !text-primary shadow-sm' : ''
              }`}
            >
              {key.charAt(0) + key.slice(1).toLowerCase()}
            </Link>
          ))}
        </nav>
      </div>

      <div className='navbar-end gap-2'>
        {isLoading ? (
          <div className='w-20 h-8 rounded-lg bg-base-300 animate-pulse' />
        ) : isAuthenticated && user ? (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              aria-haspopup='menu'
              className='btn btn-ghost btn-circle avatar placeholder border border-base-300 hover:border-primary'
            >
              <div className='bg-primary text-primary-content rounded-full w-8'>
                <span className='text-xs font-bold'>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              role='menu'
              className='menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 border border-base-200 rounded-box w-56 space-y-1'
            >
              <li className='menu-title px-2 py-1'>
                <span className='font-semibold text-xs text-base-content block truncate'>
                  {user.name}
                </span>
                <span className='text-[10px] text-base-content/60 block truncate font-normal'>
                  {user.email}
                </span>
              </li>
              <div className='divider my-1' />
              <li role='none'>
                <Link to={RouteName.PROFILE} role='menuitem' className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                  Profile &amp; Settings
                </Link>
              </li>
              <li role='none'>
                <button
                  onClick={() => logout()}
                  role='menuitem'
                  className='text-error flex items-center gap-2 hover:bg-error/10'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                    />
                  </svg>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <Link to={RouteName.LOGIN} className='btn btn-ghost btn-sm text-xs font-semibold'>
              Sign In
            </Link>
            <Link to={RouteName.REGISTER} className='btn btn-primary btn-sm text-xs font-semibold'>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
