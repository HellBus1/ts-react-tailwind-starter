# Architecture Overview: Web Application & Auth System

This document outlines the architecture, data flow, and session lifecycle of the web application and authentication system.

---

## 1. Authentication Lifecycle

```
                     ┌────────────────────────┐
                     │ Application Mounts     │
                     └───────────┬────────────┘
                                 │
                     ┌───────────▼────────────┐
                     │ Read localStorage      │
                     │ (app_auth_session_v1)  │
                     └───────────┬────────────┘
                                 │
                ┌────────────────┴────────────────┐
                ▼                                 ▼
      [ Valid & Unexpired ]              [ Expired / Missing ]
                │                                 │
      ┌─────────▼──────────┐            ┌─────────▼──────────┐
      │ Set user in state  │            │ Set user = null    │
      │ isAuthenticated=true│           │ isAuthenticated=f  │
      └─────────┬──────────┘            └─────────┬──────────┘
                │                                 │
                └────────────────┬────────────────┘
                                 │
                     ┌───────────▼────────────┐
                     │ Set isLoading = false  │
                     └────────────────────────┘
```

---

## 2. Route Protection & Redirection Flow

```
                      User visits /profile
                               │
                               ▼
                    ┌─────────────────────┐
                    │  ProtectedRoute     │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
        [ Authenticated ]             [ Unauthenticated ]
                │                             │
                ▼                             ▼
        Render <ProfilePage />       Redirect to /login with
                                     state: { from: '/profile' }
                                              │
                                              ▼
                                     User fills credentials
                                              │
                                              ▼
                                     Successful login
                                              │
                                              ▼
                                     Navigate back to /profile
```

---

## 3. Data Storage & Schema Versioning

To ensure long-term stability and prevent breaking user state when object schemas change, the persistence layer enforces schema versioning:

```typescript
interface AuthSession {
  version: 1 // Changes to 2 trigger automatic invalidation rather than crash
  user: User
  expiresAt: number // Timestamp in milliseconds
}
```

If an existing session's version does not match the active `AUTH_STORAGE_VERSION`, the stored item is discarded safely.
