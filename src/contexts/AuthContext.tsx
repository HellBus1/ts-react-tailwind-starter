import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContextType, AuthState, LoginCredentials, RegisterData } from '@/types/auth'
import { mockAuthService } from '@/services/mockAuth'
import { AuthContext } from './authContextDef'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  })

  // Check for existing session on initial load
  useEffect(() => {
    let isMounted = true

    const initAuth = async () => {
      try {
        const user = await mockAuthService.getCurrentSession()
        if (isMounted) {
          setState({
            user,
            isAuthenticated: !!user,
            isLoading: false,
            error: null
          })
        }
      } catch (err) {
        if (isMounted) {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: err instanceof Error ? err.message : 'Failed to restore session.'
          })
        }
      }
    }

    initAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const user = await mockAuthService.login(credentials)
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message
      }))
      throw err
    }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const user = await mockAuthService.register(data)
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.'
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message
      }))
      throw err
    }
  }, [])

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      await mockAuthService.logout()
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    }
  }, [])

  const forgotPassword = useCallback(async (email: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      await mockAuthService.resetPassword(email)
      setState((prev) => ({ ...prev, isLoading: false }))
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Password reset failed. Please try again.'
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message
      }))
      throw err
    }
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => (prev.error ? { ...prev, error: null } : prev))
  }, [])

  const contextValue = useMemo<AuthContextType>(
    () => ({
      ...state,
      login,
      register,
      logout,
      forgotPassword,
      clearError
    }),
    [state, login, register, logout, forgotPassword, clearError]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
