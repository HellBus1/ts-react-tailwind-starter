import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link, Navigate } from 'react-router-dom'

export const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      await register({ name, email, password })
      navigate('/dashboard')
    } catch (err) {
      const axiosError = err as { response?: { data?: { error?: string } } }
      setErrorMsg(axiosError.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className='flex min-h-[calc(100vh-64px)] items-center justify-center p-4'>
      <div className='card w-full max-w-sm shrink-0 bg-base-100 shadow-xl border'>
        <form className='card-body' onSubmit={handleSubmit}>
          <h2 className='card-title text-2xl font-bold text-center justify-center'>Register</h2>

          {errorMsg && (
            <div className='alert alert-error text-sm rounded mt-2'>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              type='text'
              placeholder='Your name'
              className='input input-bordered'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='email@example.com'
              className='input input-bordered'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Min 6 characters'
              className='input input-bordered'
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-control mt-6'>
            <button className='btn btn-primary'>Create Account</button>
          </div>
          <p className='text-sm text-center mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-primary hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
