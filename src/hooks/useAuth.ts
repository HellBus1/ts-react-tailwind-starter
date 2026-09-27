import { useContext } from 'react'
import { AuthContext } from '@/contexts/authContextDef'
import { AuthContextType } from '@/types/auth'

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'useAuth must be used within an <AuthProvider>. Ensure your component tree is wrapped by AuthProvider.'
    )
  }
  return context
}

export default useAuth
