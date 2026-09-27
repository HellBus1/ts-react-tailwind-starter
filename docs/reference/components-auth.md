# Components Reference: Authentication Components

This reference covers the core authentication components included in `feature/webapp`.

---

## 1. `AuthProvider`

Top-level context provider that manages session restoration, login state, and authentication handlers.

### Props
| Prop | Type | Description |
|:-----|:-----|:------------|
| `children` | `React.ReactNode` | The React node tree that needs access to the auth context. |

### Usage
```tsx
import { AuthProvider } from '@/contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  )
}
```

---

## 2. `ProtectedRoute`

Guard component that evaluates authentication status before rendering child components.

### Props
| Prop | Type | Description |
|:-----|:-----|:------------|
| `children` | `React.ReactNode` | Protected elements to render if authenticated. |

### Usage
```tsx
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'

const routeConfig = {
  path: '/profile',
  element: (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  )
}
```

### Loading & Redirect States
- **While Checking Session (`isLoading === true`)**: Renders an accessible spinner with `role="status"` and `aria-live="polite"`.
- **When Unauthenticated (`isAuthenticated === false`)**: Renders `<Navigate to="/login" state={{ from: location }} replace />`.
- **When Authenticated (`isAuthenticated === true`)**: Renders child elements.

---

## 3. `Navbar`

An auth-aware header navigation bar.

### Dynamic Rendering
- **Unauthenticated**: Renders "Sign In" and "Get Started" buttons linking to `/login` and `/register`.
- **Authenticated**: Renders an avatar dropdown menu displaying the user's name, email, profile link, and a "Sign Out" button.
