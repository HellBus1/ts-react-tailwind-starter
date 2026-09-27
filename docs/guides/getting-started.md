# Getting Started Guide

Welcome to the **React 18 + TypeScript + Tailwind CSS Starter**! This guide takes you through setting up your local development environment, understanding the repository structure, and building for production.

---

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later (or pnpm / yarn)
- **Git**: v2.30.0 or later

---

## 1. Installation

Clone the repository and install dependencies:

```bash
# Clone repository
git clone https://github.com/HellBus1/ts-react-tailwind-starter.git my-app
cd my-app

# Install project dependencies
npm install
```

---

## 2. Running Locally

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser at the local URL (typically [http://localhost:5173](http://localhost:5173)). Any code change made to files in `src/` will instantly update in your browser.

---

## 3. Project Structure

```
ts-react-tailwind-starter/
├── docs/                 # Central documentation guides and references
├── public/               # Static assets served as-is (icons, fonts, robots.txt)
├── src/
│   ├── assets/           # Bundled SVGs and images
│   ├── components/       # Reusable UI components (e.g. Navbar)
│   ├── constants/        # Centralized route names and configurations
│   ├── pages/            # Page-level components (Home, About, Profile)
│   ├── App.css           # Global application CSS resets
│   ├── App.tsx           # Router provider integration
│   ├── index.css         # Tailwind directives and DaisyUI imports
│   ├── main.tsx          # React DOM entry point
│   ├── routes.tsx        # Centralized route definitions
│   └── vite-env.d.ts     # Vite environment type declarations
├── index.html            # Main HTML document template
├── package.json          # Dependencies, scripts, and package metadata
├── tailwind.config.js    # Tailwind CSS and DaisyUI theme configuration
├── tsconfig.json         # TypeScript compiler configuration
└── vite.config.ts        # Vite build and plugin configurations
```

---

## 4. Code Quality & Formatting

This starter is configured with strict quality tools to keep code clean and standardized:

```bash
# Check code style and rules with ESLint
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

Automated pre-commit hooks via **Husky** and **lint-staged** automatically run Prettier and ESLint on any staged files before commits are accepted.

---

## 5. Building for Production

Compile TypeScript and build the optimized production assets:

```bash
npm run build
```

Preview the generated static output locally:

```bash
npm run preview
```

---

## 6. Next Steps: Exploring Pre-Built Features

Want to add search engine prerendering or user authentication? Check out our standalone feature branches:
- [SEO & Build-Time Prerendering Guide](seo-feature-guide.md) (`feature/seo`)
- [Webapp & Authentication Guide](auth-feature-guide.md) (`feature/webapp`)
- [Branching Strategy & Combining Features](../architecture/branching-strategy.md)
