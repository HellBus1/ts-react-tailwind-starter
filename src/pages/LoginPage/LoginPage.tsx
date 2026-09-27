import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { RouteName } from '@/constants/RouteName'

export const LoginPage = () => {
  const { login, error, clearError, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

  const fromLocation =
    (location.state as { from?: { pathname?: string } })?.from?.pathname || RouteName.PROFILE

  const validate = (): boolean => {
    const errors: { email?: string; password?: string } = {}
    if (!email.trim()) {
      errors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid email address.'
    }

    if (!password) {
      errors.password = 'Password is required.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!validate()) return

    try {
      await login({ email: email.trim(), password, rememberMe })
      navigate(fromLocation, { replace: true })
    } catch {
      // Error handled in AuthContext and displayed via context error
    }
  }

  const handleFillDemo = () => {
    setEmail('demo@example.com')
    setPassword('password123')
    setFieldErrors({})
    clearError()
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='card bg-base-100 shadow-xl border border-base-200'>
        <div className='card-body p-8'>
          <div className='text-center space-y-2 mb-4'>
            <h1 className='text-2xl font-bold tracking-tight'>Sign in to your account</h1>
            <p className='text-xs text-base-content/70'>
              Enter your credentials to access your protected profile and settings.
            </p>
          </div>

          {error && (
            <div role='alert' className='alert alert-error text-xs py-2 px-3 rounded-lg mb-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current shrink-0 h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className='space-y-4'>
            <div className='form-control'>
              <label className='label' htmlFor='login-email'>
                <span className='label-text font-medium text-xs'>Email Address</span>
              </label>
              <input
                id='login-email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }))
                }}
                placeholder='you@example.com'
                className={`input input-bordered w-full text-sm ${
                  fieldErrors.email ? 'input-error' : ''
                }`}
                disabled={isLoading}
              />
              {fieldErrors.email && (
                <span className='text-error text-xs mt-1'>{fieldErrors.email}</span>
              )}
            </div>

            <div className='form-control'>
              <div className='flex justify-between items-center'>
                <label className='label' htmlFor='login-password'>
                  <span className='label-text font-medium text-xs'>Password</span>
                </label>
                <Link
                  to={RouteName.FORGOT_PASSWORD}
                  className='text-xs text-primary hover:underline'
                  tabIndex={0}
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id='login-password'
                type='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password)
                    setFieldErrors((prev) => ({ ...prev, password: undefined }))
                }}
                placeholder='••••••••'
                className={`input input-bordered w-full text-sm ${
                  fieldErrors.password ? 'input-error' : ''
                }`}
                disabled={isLoading}
              />
              {fieldErrors.password && (
                <span className='text-error text-xs mt-1'>{fieldErrors.password}</span>
              )}
            </div>

            <div className='flex items-center justify-between pt-1'>
              <label className='cursor-pointer label p-0 flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='checkbox checkbox-primary checkbox-sm'
                  disabled={isLoading}
                />
                <span className='label-text text-xs text-base-content/80'>
                  Remember me (7 days)
                </span>
              </label>

              <button
                type='button'
                onClick={handleFillDemo}
                className='text-xs text-secondary hover:underline cursor-pointer'
                disabled={isLoading}
              >
                Use demo account
              </button>
            </div>

            <button
              type='submit'
              className='btn btn-primary w-full mt-2'
              disabled={isLoading}
              id='login-submit-btn'
            >
              {isLoading ? (
                <>
                  <span className='loading loading-spinner loading-xs' />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className='divider text-xs text-base-content/50 my-4'>OR</div>

          <p className='text-center text-xs text-base-content/70'>
            Don&apos;t have an account yet?{' '}
            <Link to={RouteName.REGISTER} className='text-primary font-semibold hover:underline'>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
