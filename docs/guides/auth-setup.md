# How to Use and Customize the Authentication System

This how-to guide explains how the authentication flow operates in this starter template, how to protect routes, and how to swap the mock service with a real production backend like Supabase, Firebase, or an external REST API.

---

## 1. Overview of the Mock Auth System

The template includes a local authentication service built on `localStorage` with:
- **Session Expiration**: 7-day session with "Remember me" checked; 24 hours otherwise.
- **Data Isolation**: Schema versioning (`app_auth_session_v1`) to prevent deserialization bugs after schema changes.
- **Pre-seeded Demo User**:
  - **Email**: `demo@example.com`
  - **Password**: `password123`

---

## 2. Using `useAuth` in Components

Any component rendered inside `<AuthProvider>` can consume the authentication context:

```tsx
import useAuth from '@/hooks/useAuth'

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <p>Please sign in to view your dashboard.</p>
  }

  return (
    <div>
      <p>Welcome back, {user?.name}!</p>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  )
}
```

---

## 3. Protecting Application Routes

To restrict a route to authenticated users, wrap it with [`ProtectedRoute`](file:///Users/syubbanfakhriya/Desktop/Repository/side-project/ts-react-tailwind-starter/src/components/ProtectedRoute/ProtectedRoute.tsx) in `src/routes.tsx`:

```tsx
// src/routes.tsx
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import DashboardPage from '@/pages/DashboardPage/DashboardPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]
```

### Redirect Behavior
When an unauthenticated user visits `/dashboard`:
1. `ProtectedRoute` saves `/dashboard` into navigation state (`state: { from: location }`).
2. The user is redirected to `/login`.
3. After completing login, `LoginPage` reads `location.state.from` and returns the user directly back to `/dashboard`.

---

## 4. Swapping Mock Auth with a Production Provider

The architecture isolates authentication logic to `src/services/mockAuth.ts` and `src/contexts/AuthContext.tsx`.

### Example: Supabase Auth
1. Install Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```
2. Replace methods in a new `src/services/supabaseAuth.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   )

   export const supabaseAuthService = {
     async getCurrentSession() {
       const { data: { session } } = await supabase.auth.getSession()
       if (!session?.user) return null
       return {
         id: session.user.id,
         email: session.user.email!,
         name: session.user.user_metadata?.name || 'User',
         role: 'user',
         createdAt: session.user.created_at
       }
     },
     async login({ email, password }) {
       const { data, error } = await supabase.auth.signInWithPassword({ email, password })
       if (error) throw error
       return data.user
     },
     async logout() {
       await supabase.auth.signOut()
     }
   }
   ```
3. Update `AuthContext.tsx` to reference `supabaseAuthService`. Components and hooks (`useAuth`, `ProtectedRoute`, `Navbar`) require **zero changes**.
