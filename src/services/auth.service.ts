import { AuthResponse, MeResponse, RefreshResponse } from '../types/auth.types'
import { apiClient } from './api.client'

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password })
    return response.data
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', { name, email, password })
    return response.data
  },

  logout: async (refreshToken: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.post('/auth/logout', { refreshToken })
    return response.data
  },

  fetchMe: async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>('/auth/me')
    return response.data
  },

  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    const response = await apiClient.post<RefreshResponse>('/auth/refresh', { refreshToken })
    return response.data
  }
}
