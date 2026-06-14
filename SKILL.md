# SKILL.md

Custom slash commands for this project, available in Claude Code via `.claude/commands/`.

---

## `/component <Name>`
Creates a reusable component in `src/components/`.  
UI primitives (button, input, card…) go in `src/components/ui/`.

```
/component GameCard
/component ui/Button
```

---

## `/page <Name>`
Creates a page in `src/pages/` and registers the route in `src/router/index.tsx`.

```
/page Lobby
/page Game
/page Results
```

---

## `/hook <Name>`
Creates a typed custom hook in `src/hooks/`.

```
/hook useGameState
/hook useTimer
```

---

## `/icon <Name>`
Adds an icon export to `src/icons/index.ts` from `lucide-react`.

```
/icon Timer
/icon Skull, Ghost
```

---

## Conventions enforced by all skills
- `@/` alias for all internal imports
- Icons imported from `@/icons`, not directly from `lucide-react`
- `cn()` from `@/lib/utils` for conditional Tailwind classes
- No inline styles
