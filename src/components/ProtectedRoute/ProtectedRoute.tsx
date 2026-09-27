import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { RouteName } from '@/constants/RouteName'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div
        role='status'
        aria-live='polite'
        className='flex flex-col items-center justify-center p-12 space-y-4'
      >
        <span className='loading loading-spinner loading-lg text-primary' />
        <p className='text-sm text-base-content/70'>Verifying authentication session...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={RouteName.LOGIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
