import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../utils/token.utils'
import { RefreshResponse } from '../types/auth.types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor to inject Access Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor to handle 401s and refresh tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = getRefreshToken()

      if (!refreshToken) {
        clearTokens()
        // Handle redirect to login if necessary, or let the SWR hook handle auth state
        return Promise.reject(error)
      }

      try {
        const response = await axios.post<RefreshResponse>(`${API_URL}/auth/refresh`, {
          refreshToken
        })

        if (response.data.success) {
          const { accessToken, refreshToken: newRefreshToken } = response.data.data
          setTokens(accessToken, newRefreshToken)

          // Update header and retry
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
          }
          return apiClient(originalRequest)
        } else {
          clearTokens()
          return Promise.reject(error)
        }
      } catch (refreshError) {
        clearTokens()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
