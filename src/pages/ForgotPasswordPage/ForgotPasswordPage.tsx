import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { RouteName } from '@/constants/RouteName'

export const ForgotPasswordPage = () => {
  const { forgotPassword, error, clearError, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState<string | undefined>()
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (!email.trim()) {
      setFieldError('Email address is required.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFieldError('Please provide a valid email address.')
      return
    }

    setFieldError(undefined)

    try {
      await forgotPassword(email.trim())
      setSubmittedEmail(email.trim())
    } catch {
      // Error handled by AuthContext
    }
  }

  if (submittedEmail) {
    return (
      <div className='w-full max-w-md mx-auto'>
        <div className='card bg-base-100 shadow-xl border border-base-200'>
          <div className='card-body p-8 text-center space-y-4'>
            <div className='w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h1 className='text-2xl font-bold tracking-tight'>Check your inbox</h1>
            <p className='text-xs text-base-content/80 leading-relaxed'>
              We sent a password recovery simulation link to{' '}
              <span className='font-semibold text-primary'>{submittedEmail}</span>. Since this is a
              mock auth service, you can log in directly using your registered credentials.
            </p>
            <div className='pt-2'>
              <Link to={RouteName.LOGIN} className='btn btn-primary w-full'>
                Return to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='card bg-base-100 shadow-xl border border-base-200'>
        <div className='card-body p-8'>
          <div className='text-center space-y-2 mb-4'>
            <h1 className='text-2xl font-bold tracking-tight'>Reset your password</h1>
            <p className='text-xs text-base-content/70'>
              Enter your account email and we will send you password reset instructions.
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
              <label className='label' htmlFor='forgot-email'>
                <span className='label-text font-medium text-xs'>Account Email</span>
              </label>
              <input
                id='forgot-email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldError) setFieldError(undefined)
                }}
                placeholder='you@example.com'
                className={`input input-bordered w-full text-sm ${fieldError ? 'input-error' : ''}`}
                disabled={isLoading}
              />
              {fieldError && <span className='text-error text-xs mt-1'>{fieldError}</span>}
            </div>

            <button
              type='submit'
              className='btn btn-primary w-full mt-2'
              disabled={isLoading}
              id='forgot-submit-btn'
            >
              {isLoading ? (
                <>
                  <span className='loading loading-spinner loading-xs' />
                  Sending instructions...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <p className='text-center text-xs text-base-content/70 mt-6'>
            Remembered your password?{' '}
            <Link to={RouteName.LOGIN} className='text-primary font-semibold hover:underline'>
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
