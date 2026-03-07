import { createContext, ReactNode, useCallback } from 'react'
import useSWR from 'swr'
import { authService } from '../services/auth.service'
import { User, LoginRequest, RegisterRequest } from '../types/auth.types'
import { clearTokens, getAccessToken, setTokens } from '../utils/token.utils'

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: unknown
  login: (credentials: LoginRequest) => Promise<void>
  register: (credentials: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// SWR fetcher for the user profile
const fetchUser = async () => {
  if (!getAccessToken()) return null
  const { data } = await authService.fetchMe()
  return data
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // useSWR will automatically revalidate, but we pause it if no token exists
  const {
    data: user,
    error,
    isLoading,
    mutate
  } = useSWR<User | null>('current_user', fetchUser, {
    revalidateOnFocus: false,
    shouldRetryOnError: false // Let our axios interceptor handle 401 retries
  })

  const login = useCallback(
    async (credentials: LoginRequest) => {
      const { data } = await authService.login(credentials.email, credentials.password || '')
      if (data) {
        setTokens(data.accessToken, data.refreshToken)
        await mutate(data.user) // update SWR cache with the new user
      }
    },
    [mutate]
  )

  const register = useCallback(
    async (credentials: RegisterRequest) => {
      const { data } = await authService.register(
        credentials.name,
        credentials.email,
        credentials.password || ''
      )
      if (data) {
        setTokens(data.accessToken, data.refreshToken)
        await mutate(data.user) // update SWR cache with the new user
      }
    },
    [mutate]
  )

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token') || '' // replace with your actual token retrieval method
      // Attempt backend logout if we have a refresh token
      await authService.logout(refreshToken)
    } catch (e) {
      console.error('Logout error', e)
    } finally {
      // Always clear local state
      clearTokens()
      await mutate(null, false)
    }
  }, [mutate])

  const value = {
    user: user || null,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
