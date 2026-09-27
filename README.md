# React 18 + TypeScript + Tailwind CSS Starter Template

<div align="center">

[![React Version](https://img.shields.io/github/package-json/dependency-version/HellBus1/ts-react-tailwind-starter/react?style=flat)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12+-5AD8E6?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

### 📚 Documentation Navigation

[Quick Start](#quick-start) • [Features](#features) • [Auth Guide](docs/guides/auth-setup.md) • [useAuth API](docs/reference/hooks-auth.md) • [Auth Components](docs/reference/components-auth.md) • [Architecture Overview](docs/architecture/overview.md) • [ADR-002: Auth Provider](docs/decisions/ADR-002-auth-provider.md)

</div>

---

## Description

A production-ready starter template designed for modern web applications. Built with React 18, TypeScript, Tailwind CSS, DaisyUI, Vite SWC, React Router 7, and a complete **modular authentication flow** with persistent sessions and route protection.

---

## Features

- ⚡ **Vite + React SWC**: Sub-second cold starts and instant Hot Module Replacement.
- 🔐 **Authentication System**:
  - Sign in, account registration, password recovery simulation, and session management.
  - Persistent login state stored with schema versioning (`localStorage`).
  - Session expiry (7 days with "Remember me", 24 hours standard).
  - Out-of-the-box demo credentials: `demo@example.com` / `password123`.
- 🛡️ **Protected Route Guards**:
  - Seamless redirection of unauthenticated users to `/login` with target route recovery upon sign-in.
- 👤 **Auth-Aware Navigation**:
  - Interactive user avatar dropdown with role, email, profile navigation, and sign-out action.
- 🔋 **Styling & Components**: Utility-first [Tailwind CSS](https://tailwindcss.com/) paired with accessible [DaisyUI](https://daisyui.com/) themes.
- 📟 **Declarative Routing**: [React Router 7](https://reactrouter.com/) with code splitting via `React.lazy`.
- 🛠️ **Code Quality**: Strict TypeScript, [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), and [lint-staged](https://github.com/lint-staged/lint-staged).

---

## Route Overview

| Path | Type | Component | Description |
|:-----|:-----|:----------|:------------|
| `/` | Public | `HomePage` | Template overview and highlights |
| `/about` | Public | `AboutPage` | Technology stack and design principles |
| `/profile` | **Protected** | `ProfilePage` | User account overview and session management (requires login) |
| `/login` | Public (Auth) | `LoginPage` | User sign-in with email and password |
| `/register` | Public (Auth) | `RegisterPage` | Account creation with password strength meter |
| `/forgot-password` | Public (Auth) | `ForgotPasswordPage` | Password recovery simulation |

---

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/HellBus1/ts-react-tailwind-starter.git
cd ts-react-tailwind-starter
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## Documentation

Comprehensive guides following the [Diátaxis](https://diataxis.fr/) framework are available in [`docs/`](docs/):

- **Guides**:
  - [Authentication Setup & Customization Guide](docs/guides/auth-setup.md)
- **Reference**:
  - [useAuth Hook API Reference](docs/reference/hooks-auth.md)
  - [Authentication Components Reference](docs/reference/components-auth.md)
- **Architecture**:
  - [System Architecture & Lifecycle Overview](docs/architecture/overview.md)
- **Architecture Decisions (ADRs)**:
  - [ADR-002: LocalStorage-Based Mock Auth Provider](docs/decisions/ADR-002-auth-provider.md)

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

Want to support future updates and high-quality open-source templates?

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/syubban)