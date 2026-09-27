# ADR-002: LocalStorage-Based Mock Authentication Provider

## Status
Accepted

## Date
2026-09-27

## Context
A starter template requires authentication primitives (login, register, session persistence, logout, protected routes) to demonstrate realistic web application capabilities. However:
- Binding the template directly to a third-party vendor (Firebase, Supabase, Auth0, Clerk) forces external project creation, API keys, credentials, and network dependencies onto every developer who clones the starter.
- Developers often want to evaluate UI components, layout flows, and guard behaviors locally without configuring an external cloud backend first.
- At the same time, the authentication architecture must closely mirror real-world authentication patterns so that migrating to a production backend is a clean, single-service swap.

## Decision
Implement a self-contained mock authentication provider in `src/services/mockAuth.ts` and `src/contexts/AuthContext.tsx` with:
- LocalStorage persistence.
- Session expiry simulation (7 days for "Remember me", 24 hours standard).
- Schema versioning (`AUTH_STORAGE_VERSION = 1`) to ensure stale data is safely handled.
- Seed demo account (`demo@example.com` / `password123`).
- Service boundary abstraction so swapping to Supabase, Firebase, or a custom REST API requires editing only one service module without altering React components or hooks.

## Alternatives Considered

### 1. Firebase Authentication
- **Pros**: Real cloud identity platform, Google OAuth support.
- **Cons**: Requires Google Cloud project setup, API keys, adds large client SDK bundle weight, breaks offline development out of the box.
- **Rejected**: Too heavy and intrusive for a general-purpose starter template.

### 2. Supabase Auth
- **Pros**: Open-source, clean SDK.
- **Cons**: Still requires setting up a remote Supabase project and environment variables before the app can run.
- **Rejected**: Better documented as an opt-in migration guide (see `docs/guides/auth-setup.md`).

### 3. In-Memory React State Only
- **Pros**: Very simple implementation.
- **Cons**: Session state is lost on every page refresh or browser reload, making manual testing of protected routes frustrating and unrealistic.
- **Rejected**: Fails real-world developer experience standards.

## Consequences
- **Positive**: Zero external accounts, configuration, or API keys needed to clone and run the starter.
- **Positive**: 100% offline capable and instant startup.
- **Positive**: Full route protection and redirect ergonomics out of the box.
- **Positive**: Clean abstraction layer makes migration to production providers straightforward.
