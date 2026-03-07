import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className='navbar bg-base-100 shadow-sm border-b'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          AppLogo
        </Link>
      </div>
      <div className='flex-none gap-2'>
        {isAuthenticated ? (
          <div className='flex items-center gap-4'>
            <span className='text-sm font-medium'>Hello, {user?.name}</span>
            <button onClick={handleLogout} className='btn btn-primary btn-sm'>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to='/login' className='btn btn-ghost btn-sm mr-2'>
              Login
            </Link>
            <Link to='/register' className='btn btn-primary btn-sm'>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
