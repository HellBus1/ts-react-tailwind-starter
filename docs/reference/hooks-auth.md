# API Reference: `useAuth`

The `useAuth` hook provides access to the global authentication context state and dispatch functions.

---

## Import

```typescript
import useAuth from '@/hooks/useAuth'
```

---

## Return Values (`AuthContextType`)

| Property / Method | Type | Description |
|:------------------|:-----|:------------|
| `user` | `User \| null` | The current authenticated user object, or `null` if unauthenticated. |
| `isAuthenticated` | `boolean` | `true` if a valid session exists, otherwise `false`. |
| `isLoading` | `boolean` | `true` while the initial session check or async auth action is running. |
| `error` | `string \| null` | Human-readable error message from the last failed authentication operation. |
| `login` | `(credentials: LoginCredentials) => Promise<void>` | Signs in an existing user with email and password. |
| `register` | `(data: RegisterData) => Promise<void>` | Registers a new account, persists user, and starts an active session. |
| `logout` | `() => Promise<void>` | Destroys current session and clears persisted state. |
| `forgotPassword` | `(email: string) => Promise<void>` | Initiates password recovery process for given email. |
| `clearError` | `() => void` | Resets `error` to `null`. |

---

## Type Interfaces

```typescript
export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword?: string
}
```

---

## Error Handling

When calling `login`, `register`, or `forgotPassword`, the function returns a Promise. If an error occurs, it is both set into `error` in context and thrown by the Promise:

```tsx
const { login, error } = useAuth()

const handleSignIn = async () => {
  try {
    await login({ email, password })
    // Success: navigate to destination
  } catch (err) {
    // Error is accessible via context `error` or caught `err.message`
    console.error('Failed to log in:', err)
  }
}
```
