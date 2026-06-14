Create a new custom React hook in `src/hooks/`.

Hook name: $ARGUMENTS (prefix with `use` if not already)

Steps:
1. Create `src/hooks/<hookName>.ts` (or `.tsx` if it returns JSX)
2. Export as a named export

Rules:
- TypeScript — fully type the return value, no `any`
- Use `@/` alias for internal imports
- Keep side effects contained inside the hook — callers should get clean values back
