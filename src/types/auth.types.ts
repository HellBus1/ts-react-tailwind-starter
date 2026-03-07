export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

// Ensure the properties match exactly what the frontend uses
export interface LoginRequest {
  email: string
  password?: string
}

export interface RegisterRequest {
  name: string
  email: string
  password?: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  error?: string
  fields?: Record<string, string>
  data?: {
    user: User
  } & AuthTokens
}

export interface MeResponse {
  success: boolean
  data: User
}

export interface RefreshResponse {
  success: boolean
  data: AuthTokens
}
