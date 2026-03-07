# Architecture Overview

This boilerplate includes a fully-functional architecture prioritizing robust concern separation via **Clean Architecture**.

## Folder Structure
- **`src/types/`**: Strict TypeScript interfaces mapping DTOs (e.g. `User`, `AuthResponse`).
- **`src/utils/`**: Encapsulates external operations such as `localStorage` interaction for Token Management.
- **`src/services/`**: The core data layer connecting directly to formatting `axios` API calls and endpoints.
- **`src/hooks/`**: Global state management leveraging Context and third-party libraries like `useSWR`.
- **`src/components/`**: Reusable interface elements intended for global sharing, such as `Navbar` and `ProtectedRoute`.
- **`src/pages/`**: Singular page implementations dictating View logic for complex domains (e.g. `/login`, `/register`, and `/dashboard`).
