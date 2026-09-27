# Build and Development Scripts Reference

This reference covers the npm scripts available in `package.json`, explaining their purpose and when to use them.

---

## Scripts Table

| Command | Script Command | Description |
|:--------|:---------------|:------------|
| `npm run dev` | `vite` | Starts local development server with Hot Module Replacement (HMR). |
| `npm run build:client` | `tsc -b && vite build` | Runs TypeScript type checking and generates the client-side bundle in `dist/`. |
| `npm run build:ssr` | `vite build --ssr src/entry-server.tsx --outDir dist-ssr` | Compiles the server entry point with Vite SSR into temporary bundle in `dist-ssr/`. |
| `npm run build:prerender`| `node scripts/prerender.js` | Executes static prerendering script across routes, writes static HTML, outputs sitemap, and deletes `dist-ssr/`. |
| `npm run build` | `npm run build:client && npm run build:ssr && npm run build:prerender` | Full production build pipeline producing deployment-ready static files. |
| `npm run preview` | `vite preview` | Serves the generated `dist/` directory locally to verify prerendered output and routing. |
| `npm run lint` | `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0` | Checks TypeScript and React code against ESLint rules with zero tolerance for warnings. |
| `npm run lint:fix` | `eslint --fix` | Automatically corrects fixable ESLint errors and styling issues. |
| `npm run format` | `prettier --write 'src/**/*.{ts,tsx,css}' --config ./.prettierrc.json` | Formats source files using Prettier. |

---

## Production Pipeline Flow

```
   ┌──────────────────────┐
   │ npm run build:client │  ──► Compiles TypeScript and creates dist/ assets
   └──────────┬───────────┘
              │
   ┌──────────▼───────────┐
   │  npm run build:ssr   │  ──► Bundles src/entry-server.tsx into dist-ssr/
   └──────────┬───────────┘
              │
   ┌──────────▼───────────┐
   │npm run build:prerender│  ──► Generates static HTML per route, updates sitemap.xml,
   └──────────┬───────────┘      cleans up dist-ssr/
              │
              ▼
   ✅ Fully Prerendered Static Site in dist/
```
