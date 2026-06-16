# SideBar Workflow

`src/components/app/SideBar.tsx`

## Responsive Layout

| Breakpoint | Rendering |
|---|---|
| `< xl` (tablet + mobile) | Fixed top header (`h-16`) + slide-in Sheet drawer (shadcn `Sheet`, side: left) |
| `≥ xl` (desktop) | Fixed left sidebar (`h-screen`), collapsible icon-rail ↔ full-width |

---

## Props

| Prop | Type | Purpose |
|---|---|---|
| `onNavigate` | `(path: string) => void` | Override default `router.push`; used by community page to navigate in-place |
| `currentPath` | `string` | Override `usePathname()`; used when the host page manages routing state |
| `expanded` | `boolean` | Controlled expanded state (desktop sidebar) |
| `onExpandedChange` | `(expanded: boolean) => void` | Callback when expanded state changes |

If `expanded`/`onExpandedChange` are omitted the component manages its own `uncontrolledExpanded` state.

---

## Role Resolution

Session roles come from `useSessionQuery()`. Each role is mapped to a `SidebarRoleOption`:

```
role.accountType → getNormalizedRoleAccountType() → sidebarId
sidebarId → NAV_ITEMS[sidebarId] → currentNavItems
sidebarId → getOverviewPathForAccountType() → overviewPath
```

**`selectedRole` priority:**
1. Match `sidebarId` to the account type derived from the current URL path (`getAccountTypeForPath(currentPath)`).
2. Fall back to `getDefaultActiveRole(roles, session.activeRoleIndex)`.
3. Fall back to `mappedRoles[0]`.

**Auto-sync `activeRoleIndex`:** A `useEffect` watches `currentPath` and `session.activeRoleIndex`. When the URL implies a different role than what the server reports as active, it calls `switchRole.mutate(matchedIndex)` silently. This fixes stale-role state after logout → re-login on a non-personal page.

---

## Navigation Items (`NAV_ITEMS`)

Each role maps to a flat list of `NavItem`. Items may have `children` (one level of sub-items only).

### Personal
| Label | Path | Children |
|---|---|---|
| Home | `/personal` | — |
| Connections | `/personal/connections` | — |
| Freelancers | `/personal/freelance` | — |
| Business | `/personal/business` | Subscriptions → `/personal/subscription` |
| Community | `/personal/community` | Memberships → `/personal/membership` |
| Events | `/personal/events` | — |
| Profile | `/personal/profile` | Accounts → `/personal/accounts` |

### Business
Home, Events, Brands, WorkSpace, Services & Products, Subscribers, Create Notification, Inquiries, Settings

### Community
Home, Events, Chapters, Members, Directory, Message Board, Services, History, Inquiries, Settings

### Organizer
Home, Events, Vendors, Services, Team, Inquiries, Settings

### Agency
Home, Clients, Services, Team, Inquiries, Settings

### Freelance
Home, Services, Clients, Calendar, Portfolio, Inquiries

---

## Active State

An item is marked active when:
```
currentPath === item.href  OR  currentPath.startsWith(item.href + '/')
```

Same rule applies to child items. On path change, any parent whose child matches is automatically added to `openItems` (accordion auto-expand effect).

---

## Desktop Sidebar Behavior

- **Collapsed:** `w-18`, icons only, labels hidden via opacity/translate animation.
- **Expanded:** `w-64`, icons + labels, label text fades/slides in.
- Expands on `mouseenter`, collapses 200 ms after `mouseleave` (debounced via `collapseTimer` ref).
- Collapsing also closes `profileOpen`.
- A right-edge mask (`maskImage: linear-gradient(to right, black 88%, transparent)`) is applied when expanded to soften the edge.

### Role Dropdown (desktop, expanded only)
Shown when `mappedRoles.length > 1`. Clicking the role label toggles `roleDropdownOpen`. The dropdown is absolutely positioned below the logo. Clicking outside (detected via `mousedown` on `document`) closes it.

---

## Mobile / Tablet Behavior

- Fixed gradient header shows: hamburger button, logo + brand name, active role label, current role pill.
- Hamburger opens a `Sheet` from the left (`w-[85vw] max-w-xs`).
- Sheet header shows avatar, display name, account ID, and **role pills** (one per mapped role). Clicking a pill calls `handleAccountTypeChange` and closes the sheet (`SheetClose`).
- Nav items with children show a ChevronDown toggle; tapping navigates to the parent href AND toggles the accordion. Leaf items close the sheet on tap.

---

## Role Switching (`handleAccountTypeChange`)

1. Find the `SidebarRoleOption` by `roleValue`.
2. Find its index in `session.roles`.
3. Call `switchRole.mutate(roleIndex)` to update the server's `activeRoleIndex`.
4. Call `navigate(role.overviewPath)` to move to the role's home page.
5. Close mobile sheet and role dropdown.

### `whodini:open-account-type` CustomEvent
Other parts of the app can dispatch this event with `detail.accountTypeId` to programmatically switch the sidebar role without going through UI interaction. The sidebar listens on `window`, normalizes the account type, finds the matching mapped role, and calls `handleAccountTypeChange`.

---

## Profile Avatar & Popup (desktop)

- Avatar is fetched via `useQuery(['personal', 'profile'])` → `getProfile()`, `staleTime: 5 min`.
- Falls back to initials (first letter of each word in `displayName`, max 2 chars, uppercase).
- Clicking the avatar button toggles `profileOpen`.
- Clicking outside the `profileRef` div closes it.

**Profile popup menu items:**

| Label | Icon | Href |
|---|---|---|
| Saved | Bookmark | `#` |
| Calendar | Calendar | `#` |
| Activity | Activity | `#` |
| Support | HelpCircle | `#` |

- Bottom of popup: **Log Out** → sets `profileOpen = false`, opens sign-out confirm modal.

---

## Sign-Out Confirmation Modal

Triggered by clicking **Sign Out** in the mobile sheet footer or **Log Out** in the desktop profile popup. Rendered as a fixed overlay (z-9999).

- **Cancel** → `setShowSignOutConfirm(false)`.
- **Sign Out** → `signOut.mutateAsync()` → `router.push('/')`.
- Button is disabled while `signOut.isPending`.

---

## Helper Functions

| Function | Purpose |
|---|---|
| `getInitials(label)` | Splits on spaces, takes first char of each word, max 2 chars, uppercased |
| `formatAccountType(str)` | Splits on `-_\s`, title-cases each part, joins with space |
| `getRoleAccountTypeLabel(accountType)` | Looks up `ROLE_DISPLAY_LABELS` or falls back to `formatAccountType` |
