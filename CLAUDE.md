# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server
npm run build     # type-check + production build
npm run lint      # run ESLint
npm run preview   # preview production build
```

There is no test runner configured.

## Architecture

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router DOM v7, Lucide React.

**Path alias:** `@/` resolves to `src/` — use it for all internal imports.

**Routing** is defined in `src/router/index.tsx` using `createBrowserRouter`. All routes live under `RootLayout` as children. Add new routes there. `NotFound` doubles as the `errorElement`.

**Layouts** (`src/layouts/`) wrap routes via React Router's `<Outlet>`. `RootLayout` is the single top-level wrapper today.

**Pages** (`src/pages/`) are route-level components — one file per route, no logic beyond what the route needs.

**Icons** (`src/icons/index.ts`) is a barrel re-export of named icons from `lucide-react`. Import icons from `@/icons` rather than directly from `lucide-react` to keep usage consistent.

**Utilities** (`src/lib/utils.ts`) holds the `cn()` helper for merging Tailwind class strings.

**Styling** uses Tailwind v4 (PostCSS-free, Vite plugin). The only global CSS is `src/index.css` which just `@import "tailwindcss"`.
