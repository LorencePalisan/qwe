Create a new reusable React component for this project.

Component name: $ARGUMENTS

Steps:
1. Create `src/components/<ComponentName>.tsx`
2. If it's a base UI primitive (button, input, card, badge, etc.) place it in `src/components/ui/<ComponentName>.tsx` instead

Rules:
- TypeScript — define props as `interface <ComponentName>Props`
- Use `@/` alias for all internal imports
- Import icons from `@/icons`, never directly from `lucide-react`
- Use `cn()` from `@/lib/utils` for all conditional class merging
- Tailwind CSS only — no inline styles
- Named props interface, default export for the component itself
