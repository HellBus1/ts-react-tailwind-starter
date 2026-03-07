# Authentication Flow

This repository natively tracks and utilizes a dual-token JWT flow connected to the bun backend service.

## The JWT Lifecycle
1. **API Client (`api.client.ts`)**: An `axios` instance intercepts outgoing HTTP requests matching the internal backend configurations. It automatically queries the local storage and mounts the primary `Authorization: Bearer <accessToken>`.
2. **Access Token Expiration**: The backend returns a strict access token mapped to a specific period. When it runs out, the server fires back a `401 Unauthorized` response to the client.
3. **The Refresh Flow**:
   - The same instance catches the `401` gracefully without alerting the user component.
   - It pauses the original failing request, pulls the `refreshToken` from the utility manager, and queries `/api/auth/refresh`.
   - On a successful swap, the `apiClient` overrides the global keys, saves the new tokens, and cleanly retries the original request providing seamless continuity to the frontend user.
4. **State Hooks (`AuthProvider.tsx` & `useSWR`)**:
   - The React Context dynamically validates and polls the session against the backend via the wrapper hook.
   - Any component requiring authentication calls `const { user, isAuthenticated } = useAuth()`.
   - Modifiers like `login`, `register`, and `logout` natively alter the context and trigger automatic SWR revalidations of the views.
