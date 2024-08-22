import { NavbarRouteName } from '@/constants/RouteName'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <div className='navbar bg-base-100 fixed top-0 px-24'>
      <div className='navbar-start'></div>
      <div className='navbar-center my-4'>
        <div role='tablist' className='tabs tabs-boxed'>
          {Object.entries(NavbarRouteName).map(([key, path]) => (
            <Link
              key={key}
              to={path}
              role='tab'
              className={`tab ${pathname === path ? 'tab-active' : ''}`}
            >
              <p className='font-medium'>{key.charAt(0) + key.slice(1).toLowerCase()}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className='navbar-end'></div>
    </div>
  )
}

export default Navbar
