# Design System

Reference implementation: `src/pages/Dashboard.tsx`

---

## Typography

| Role                | Classes                                 |
| ------------------- | --------------------------------------- |
| Section header      | `text-lg font-semibold text-white`      |
| Tile label          | `text-base font-medium text-white`      |
| Card title (large)  | `text-sm font-semibold text-white`      |
| Card title (small)  | `text-[13px] font-semibold text-white`  |
| Supporting text     | `text-[13px] font-medium text-white/70` |
| App / category name | `text-[11px] text-white/40`             |
| Tag / badge         | `text-xs font-medium text-white`        |
| Micro label         | `text-[10px] text-white/40`             |
| Body paragraph      | `text-sm leading-relaxed text-[#bbb]`   |

---

## Spacing & Layout

### Page structure

- Sidebar offset: `pl-20` (80px)
- Content padding: `px-20 py-15` (80px / 60px)
- Between sections: `gap-12.5` (50px, via `flex flex-col gap-12.5`)
- Section header bottom margin: `mb-10`

### Hero section

- Height: `h-165` (660px)
- Content column max-width: `max-w-150`
- Content padding: `px-22.5 pb-25 pt-15`
- Inner gap: `gap-5`

---

## Border Radius

| Token          | Class            | Usage                       |
| -------------- | ---------------- | --------------------------- |
| Cards / tiles  | `rounded-xl`     | All card-level containers   |
| App icon tiles | `rounded-[10px]` | AppTile, carousel thumbs    |
| Buttons        | `rounded-full`   | Primary and icon buttons    |
| Tags / badges  | `rounded-full`   | Category tags on PhotoCards |
| Glass button   | `rounded-lg`     | In-card action buttons      |

---

## Grid Systems

| Section       | Columns           | Gap      |
| ------------- | ----------------- | -------- |
| Favorites     | `grid-cols-6`     | `gap-5`  |
| Topics        | `grid-cols-6`     | `gap-5`  |
| Notifications | `grid-cols-4`     | `gap-5`  |
| Subscriptions | `grid-cols-4`     | `gap-5`  |
| Communities   | `grid-cols-4`     | `gap-5`  |
| Events        | `grid-cols-4`     | `gap-5`  |
| Discover      | `grid-cols-4`     | `gap-5`  |
| Connections   | `grid-cols-8`     | `gap-10` |
| Games         | horizontal `flex` | `gap-5`  |

---

## Component Specs

### SectionHeader

```tsx
<div className="mb-10 flex items-center gap-1.5">
  <h2 className="text-lg font-semibold text-white">{title}</h2>
  {hasArrow && <ChevronRight className="mt-0.5 size-3.5 text-white/50" />}
</div>
```

### FavTile (Favorites grid cell)

- Container: `flex min-h-37 flex-col justify-between rounded-xl border border-white/6 bg-[#161820] p-3`
- Label: `text-base font-medium text-white` at top
- Content: bottom-aligned slot

### AppTile (icon square)

- Size: `size-11` (44px square)
- Shape: `rounded-[10px]`
- Icon: `size-5 text-white`
- Text fallback: `text-[11px] font-bold text-white`
- Background: inline `style={{ backgroundColor: color }}`

### PhotoCard (Communities / Events / Discover)

- Outer: `relative overflow-hidden rounded-xl {className}`
- Background layer: `absolute inset-0 bg-linear-to-br {gradient}`
- Scrim layer: `absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent`
- Content: `relative flex h-full flex-col justify-between p-4`
- Tag badge: `self-start rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white`
- Title: `text-sm font-semibold leading-snug text-white`
- Meta: `mt-0.5 text-xs text-white/50`
- Standard height: `h-65.25` (~261px)

### Notification card

- `flex h-26 items-center gap-3 rounded-xl border border-white/6 bg-[#161820] px-4`
- Icon: `size-11 rounded-xl` with brand color background

### Subscription card

- `flex h-26.25 items-center gap-3 rounded-xl border border-white/6 bg-[#161820] px-4`
- Abbr tile: `size-11 rounded-xl text-[11px] font-bold text-white`

### Connection card

- `flex h-47.25 flex-col items-center justify-center gap-3 rounded-xl border border-white/6 bg-[#161820] p-4`
- Avatar: `size-20 rounded-full bg-linear-to-br {gradient}`

### Topic tile

- `relative h-37 overflow-hidden rounded-xl border border-white/6 bg-[#161820]`
- Icon (decorative): `absolute right-4 top-4 size-16.75 text-white/15`
- Label: `absolute bottom-4 left-4 text-base font-medium text-white`

### Game card

- `relative h-101 w-55.25 shrink-0 overflow-hidden rounded-xl bg-linear-to-br {gradient}`
- Scrim: `absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent`
- CTA button: `flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm`

---

## Buttons

| Variant            | Classes                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Primary (light)    | `rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black`                                           |
| Icon (ghost)       | `flex size-11 items-center justify-center rounded-full bg-white/20`                                            |
| Glass (in-card)    | `flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm` |
| Icon small (ghost) | `flex size-8 items-center justify-center rounded-full bg-white/20`                                             |

---

## Gradient Patterns

### Card backgrounds (dark, desaturated)

All PhotoCard and Game gradients use very dark, near-black hues with slight color tint (`bg-linear-to-br`):

- Blue-tinted: `from-[#0d1a28] to-[#070d18]`
- Green-tinted: `from-[#0d2815] to-[#071808]`
- Purple-tinted: `from-[#201028] to-[#120818]`
- Red-tinted: `from-[#280d0d] to-[#180707]`
- Warm amber: `from-[#281a0d] to-[#180d07]`

### Profile avatar gradients (vibrant)

Vivid two-stop gradients on `rounded-full`:

- Indigo → Violet: `from-[#4f46e5] to-[#7c3aed]`
- Sky → Blue: `from-[#0ea5e9] to-[#2563eb]`
- Pink → Rose: `from-[#ec4899] to-[#f43f5e]`
- Emerald → Green: `from-[#10b981] to-[#059669]`
- Amber → Orange: `from-[#f59e0b] to-[#f97316]`

### Hero overlay

```
bg-linear-to-r from-[#0b0e14] via-[#0b0e14]/80 to-transparent
```

### Card scrim (standard)

```
bg-linear-to-t from-black/80 via-black/10 to-transparent
```

### Card scrim (heavy — game cards)

```
bg-linear-to-t from-black/90 via-black/20 to-transparent
```

## Overall Aesthetic

- **Dark-first:** Everything on near-black surfaces (`#0d0f14`, `#161820`)
- **Subtle borders:** Cards use `border-white/6` — barely visible, just enough depth
- **White text hierarchy:** Full white → `/70` → `/50` → `/40` — no colored text outside accent tiles
- **Gradient-only imagery:** Content cards use dark gradient backgrounds instead of photos
- **Consistent card padding:** `p-3` (tiles), `p-4` (photo cards, game cards), `px-4` (list rows)
- **Standard gap:** `gap-5` (20px) across all grids; `gap-10` only for Connections

---

## Brand Gradient

The signature brand color is a gradient running bottom-to-top:

- `#ff5f6d` (coral/red) → `#ffc371` (orange/amber)
- Class: `bg-gradient-to-t from-[#ff5f6d] to-[#ffc371]`

---

## CSS Design Tokens

### Light Mode (`:root`)

| Token                  | Color                     | Description    |
| ---------------------- | ------------------------- | -------------- |
| `--background`         | `oklch(1 0 0)`            | Pure white     |
| `--foreground`         | `oklch(0.145 0 0)`        | Near black     |
| `--primary`            | `oklch(0.205 0 0)`        | Very dark gray |
| `--secondary`          | `oklch(0.97 0 0)`         | Off-white      |
| `--muted`              | `oklch(0.97 0 0)`         | Off-white      |
| `--muted-foreground`   | `oklch(0.556 0 0)`        | Medium gray    |
| `--border` / `--input` | `oklch(0.922 0 0)`        | Light gray     |
| `--destructive`        | `oklch(0.577 0.245 27.3)` | Red            |
| `--sidebar`            | `oklch(0.985 0 0)`        | Near white     |

### Dark Mode (`.dark`)

| Token          | Color              | Description |
| -------------- | ------------------ | ----------- |
| `--background` | `oklch(0.145 0 0)` | Near black  |
| `--foreground` | `oklch(0.985 0 0)` | Near white  |
| `--card`       | `oklch(0.205 0 0)` | Dark gray   |
| `--muted`      | `oklch(0.269 0 0)` | Dark gray   |
| `--sidebar`    | `oklch(0.205 0 0)` | Dark gray   |

### Summary

The UI palette is largely neutral (grays / white / black) with the brand identity carried entirely by the coral-to-orange gradient (`#ff5f6d` → `#ffc371`). No blue, green, or other hues are used in the base theme — just neutrals + the warm gradient accent.
