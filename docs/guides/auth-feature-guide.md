# Webapp & Authentication Feature Guide (`feature/webapp`)

The `feature/webapp` branch equips the starter template with a modular authentication architecture, persistent user sessions, route guards, and account management views.

---

## What `feature/webapp` Adds

| Component | Path | Description |
|:----------|:-----|:------------|
| **Auth Types** | `src/types/auth.ts` | TypeScript interfaces for `User`, `LoginCredentials`, `RegisterData`, and `AuthState`. |
| **Mock Auth Service** | `src/services/mockAuth.ts` | LocalStorage auth service with session expiration (7 days for remember-me) and schema versioning. |
| **Auth Context** | `src/contexts/AuthContext.tsx` | React Context and Provider supporting Fast Refresh, session restoration, and functional updates. |
| **`useAuth` Hook** | `src/hooks/useAuth.ts` | Simple hook returning auth state and `login`, `register`, `logout`, and `forgotPassword` methods. |
| **Route Guard** | `src/components/ProtectedRoute/` | Protects routes from unauthenticated access, preserves destination, and shows a loading state. |
| **Sign In Page** | `src/pages/LoginPage/` | Login view with form validation, error handling, and a one-click "Use demo account" helper. |
| **Registration Page**| `src/pages/RegisterPage/` | Account creation view with real-time password strength meter. |
| **Recovery Page** | `src/pages/ForgotPasswordPage/` | Password reset simulation with next-step instructions. |
| **Auth-Aware Navbar**| `src/components/Navbar/` | Header with user avatar dropdown, profile link, and sign-out button. |
| **Profile Page** | `src/pages/ProfilePage/` | View displaying authenticated user details and sign out action. |

---

## Demo Credentials

The mock authentication service comes pre-seeded with a demo user:
- **Email**: `demo@example.com`
- **Password**: `password123`

You can also create new accounts directly on the `/register` page—new accounts are persisted into browser `localStorage`.

---

## How to Adopt `feature/webapp`

### 1. Checkout or Merge the Branch

To switch to the standalone Webapp / Auth version:
```bash
git checkout feature/webapp
```

To pull the authentication flow into your active project branch:
```bash
git merge origin/feature/webapp
```

### 2. Protecting a Route

Wrap any route element inside `<ProtectedRoute>` in `src/routes.tsx`:

```tsx
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import DashboardPage from '@/pages/DashboardPage/DashboardPage'

const routes = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  }
]
```

When an unauthenticated user navigates to `/dashboard`, they are automatically redirected to `/login`. Upon successful sign in, they are redirected immediately back to `/dashboard`.

---

## Migrating to a Production Backend

The authentication service is decoupled behind `src/services/mockAuth.ts`. To connect to a cloud backend:
1. Replace `mockAuth.ts` with your SDK calls (e.g. Firebase Auth, Supabase Auth, Auth0, or custom REST backend).
2. Ensure your backend returns the expected `User` interface (`id`, `name`, `email`, `role`).
3. Your UI components, forms, and route guards continue to function with zero changes!
