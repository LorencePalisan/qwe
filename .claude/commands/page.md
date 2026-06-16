Create a new page and register it in the router.

Page name and optional path: $ARGUMENTS

Steps:
1. Create `src/pages/<PageName>.tsx`
2. Register the route in `src/router/index.tsx` under the RootLayout children array
3. If the page needs a dedicated layout, create it in `src/layouts/` and nest it in the router

Rules:
- Pages are thin — no heavy logic inline; delegate to hooks or router loaders
- Use `@/` alias for all imports
- Tailwind CSS only — no inline styles
- Default export the page component
