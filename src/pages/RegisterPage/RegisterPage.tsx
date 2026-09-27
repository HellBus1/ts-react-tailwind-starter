import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { RouteName } from '@/constants/RouteName'

export const RegisterPage = () => {
  const { register, error, clearError, isLoading } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  const getPasswordStrength = (pass: string): { label: string; color: string; score: number } => {
    if (!pass) return { label: '', color: '', score: 0 }
    if (pass.length < 6) return { label: 'Weak', color: 'progress-error', score: 25 }
    const hasNumOrSpecial = /[0-9!@#$%^&*]/.test(pass)
    const hasUpper = /[A-Z]/.test(pass)

    if (pass.length >= 8 && hasNumOrSpecial && hasUpper) {
      return { label: 'Strong', color: 'progress-success', score: 100 }
    }
    if (pass.length >= 6 && (hasNumOrSpecial || hasUpper)) {
      return { label: 'Medium', color: 'progress-warning', score: 60 }
    }
    return { label: 'Weak', color: 'progress-error', score: 35 }
  }

  const strength = getPasswordStrength(password)

  const validate = (): boolean => {
    const errors: {
      name?: string
      email?: string
      password?: string
      confirmPassword?: string
    } = {}

    if (!name.trim()) {
      errors.name = 'Full name is required.'
    }

    if (!email.trim()) {
      errors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid email address.'
    }

    if (!password) {
      errors.password = 'Password is required.'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!validate()) return

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword
      })
      navigate(RouteName.PROFILE, { replace: true })
    } catch {
      // Error is set in AuthContext and rendered in alert
    }
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='card bg-base-100 shadow-xl border border-base-200'>
        <div className='card-body p-8'>
          <div className='text-center space-y-2 mb-4'>
            <h1 className='text-2xl font-bold tracking-tight'>Create a new account</h1>
            <p className='text-xs text-base-content/70'>
              Join now to test protected session flows and customize your preferences.
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
              <label className='label' htmlFor='register-name'>
                <span className='label-text font-medium text-xs'>Full Name</span>
              </label>
              <input
                id='register-name'
                type='text'
                autoComplete='name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }))
                }}
                placeholder='Alex Morgan'
                className={`input input-bordered w-full text-sm ${
                  fieldErrors.name ? 'input-error' : ''
                }`}
                disabled={isLoading}
              />
              {fieldErrors.name && (
                <span className='text-error text-xs mt-1'>{fieldErrors.name}</span>
              )}
            </div>

            <div className='form-control'>
              <label className='label' htmlFor='register-email'>
                <span className='label-text font-medium text-xs'>Email Address</span>
              </label>
              <input
                id='register-email'
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
              <label className='label' htmlFor='register-password'>
                <span className='label-text font-medium text-xs'>Password</span>
              </label>
              <input
                id='register-password'
                type='password'
                autoComplete='new-password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password)
                    setFieldErrors((prev) => ({ ...prev, password: undefined }))
                }}
                placeholder='Min 6 characters'
                className={`input input-bordered w-full text-sm ${
                  fieldErrors.password ? 'input-error' : ''
                }`}
                disabled={isLoading}
              />
              {password && (
                <div className='mt-2 space-y-1'>
                  <progress
                    className={`progress ${strength.color} w-full h-1.5`}
                    value={strength.score}
                    max='100'
                  />
                  <div className='flex justify-between items-center text-[10px] text-base-content/60'>
                    <span>Password Strength</span>
                    <span className='font-semibold'>{strength.label}</span>
                  </div>
                </div>
              )}
              {fieldErrors.password && (
                <span className='text-error text-xs mt-1'>{fieldErrors.password}</span>
              )}
            </div>

            <div className='form-control'>
              <label className='label' htmlFor='register-confirm-password'>
                <span className='label-text font-medium text-xs'>Confirm Password</span>
              </label>
              <input
                id='register-confirm-password'
                type='password'
                autoComplete='new-password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (fieldErrors.confirmPassword)
                    setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }))
                }}
                placeholder='Confirm your password'
                className={`input input-bordered w-full text-sm ${
                  fieldErrors.confirmPassword ? 'input-error' : ''
                }`}
                disabled={isLoading}
              />
              {fieldErrors.confirmPassword && (
                <span className='text-error text-xs mt-1'>{fieldErrors.confirmPassword}</span>
              )}
            </div>

            <button
              type='submit'
              className='btn btn-primary w-full mt-2'
              disabled={isLoading}
              id='register-submit-btn'
            >
              {isLoading ? (
                <>
                  <span className='loading loading-spinner loading-xs' />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className='divider text-xs text-base-content/50 my-4'>OR</div>

          <p className='text-center text-xs text-base-content/70'>
            Already have an account?{' '}
            <Link to={RouteName.LOGIN} className='text-primary font-semibold hover:underline'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
