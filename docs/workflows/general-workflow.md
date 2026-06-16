# Whodini Frontend — General Workflow

Root: `src/`

This document covers the global architecture, auth system, routing patterns, shared components, and conventions that apply across all role sections of the app.

---

## Project Architecture

**Stack:** Next.js 16 App Router, static export, deployed to GitHub Pages via CDN (CloudFront/S3).

**`next.config.ts` key settings:**

| Setting | Value | Reason |
|---|---|---|
| `output` | `'export'` | Fully static SPA; no server |
| `trailingSlash` | `true` | CDN compatibility |
| `images.unoptimized` | `true` | Required for static export |
| `basePath` / `assetPrefix` | From `BASE_PATH` / `NEXT_PUBLIC_BASE_PATH` env (optional) | Supports non-root CDN paths |

**Fonts:** Geist (sans) + Geist Mono via `next/font/google`, applied as CSS variables `--font-geist-sans` / `--font-geist-mono`.

**Root layout** (`src/app/layout.tsx`):
```
<html>
  <body suppressHydrationWarning>
    <Providers>         ← React Query client
      <AppShell>        ← Optional AppHeader (currently commented out)
        {children}
      </AppShell>
    </Providers>
  </body>
</html>
```

**`AppShell`** (`src/components/app/AppShell.tsx`): Checks `usePathname()` to conditionally render `AppHeader`. AppHeader is currently commented out — the shell is a passthrough. Paths that would hide the header: `/`, `/auth/*`, `/forgot-password/*`, `/reset-password/*`, `/brands/*`, `/events/*`, `/subscribe/*`, `/join/*`, `/register/*`, `/dashboard/*`.

---

## Static Export / SSG Pattern

Because `output: 'export'` requires all pages to be statically generated, every dynamic route segment must export `generateStaticParams()` returning a single placeholder entry. The real ID is resolved client-side.

```ts
// page.tsx — server component (NO 'use client')
export function generateStaticParams() {
  return [{ freelancerId: 'preview' }];  // placeholder
}
export default function Page() {
  return <Suspense fallback={<Loader2 />}><MyClientComponent /></Suspense>;
}

// MyClientComponent.tsx — 'use client'
// reads real ID from useParams() or sessionStorage
```

**Rule:** Never add `'use client'` to a `page.tsx` that exports `generateStaticParams` — it must remain a server component.

**Existing dynamic routes:**
- `personal/business/[businessId]` → stub: `preview`
- `personal/agency/[agencyId]` → stub: `preview`
- `personal/freelance/[freelancerId]` → stub: `preview`
- `personal/organizers/[id]` → stub: `preview`
- `business/workspace/[workspaceId]` → stub: `__loading__`

---

## SPA Fallback Pattern

**Problem:** The CDN serves `index.html` for all unknown paths (no prebuilt file for `/business/something`). This causes the login page component to render at the wrong URL.

**Solution:** `src/app/page.tsx` (the login page) doubles as the SPA router. On mount it reads `window.location.pathname` and calls `router.replace(pathname)` so Next.js loads the correct page component.

### Loop Guard

sessionStorage keys `whodini_spa_path` + `whodini_spa_ts` detect infinite reload loops. If the same path triggers the effect twice within 5 seconds, the SPA router redirects to `/not-found` instead.

The loop guard stores the **stub path** (not the original real UUID) so a hard reload of the restored URL doesn't false-trigger the detector.

### Dynamic Route Deep-Link Stubs

Real UUIDs have no prebuilt HTML file on the CDN. The SPA router intercepts them, stores the real ID in sessionStorage, then redirects to the pre-built stub. The client component reads the ID back from sessionStorage and calls `window.history.replaceState` to restore the real URL in the address bar.

| URL pattern | sessionStorage key | Stub path |
|---|---|---|
| `/personal/freelance/[id]` | `whodini_nav__freelancer` | `/personal/freelance/preview` |
| `/personal/business/[id]` | `whodini_nav__business` | `/personal/business/preview` |
| `/personal/agency/[id]` | `whodini_nav__agency` | `/personal/agency/preview` |
| `/personal/organizers/[id]` | `whodini_nav__organizer` | `/personal/organizers/preview` |
| `/business/workspace/[id]` | `whodini_nav__workspace` | `/business/workspace/__loading__` |

The stubs `preview` and `__loading__` are excluded from the intercept regex so re-renders don't loop.

---

## Auth / Session

### localStorage Keys

| Key | Content |
|---|---|
| `whodini_auth_token_v1` | Bearer token string |
| `whodini_numeric_user_id_v1` | Numeric user ID string |
| `whodini_pending_account_types_v1` | JSON array of pending account type strings |
| `whodini_session_cache_v1` | `{ session: Session, cachedAt: number }` — TTL 30 minutes |

### Session Shape

```ts
type Session = {
  userId: string;
  numericUserId?: string;
  email: string;
  displayName: string;
  roles: Role[];           // [{ accountType, accountId, label }]
  activeRoleIndex: number;
  pendingAccountTypes?: string[];
};
```

### `getCurrentSession()` Flow

1. Return `localStorage` session cache if still within 30-minute TTL.
2. If no token stored → return `null` (unauthenticated).
3. Fetch `GET /api/auth/me` with `Authorization: Bearer <token>`.
4. `401/403` → clear token + cache → return `null`.
5. `5xx` → return `null` (don't throw — prevents React Query error state from causing redirect loops).
6. On success: normalize session, clean up any pending account types that are now approved, cache result for 30 minutes.

### Token Extraction

`getAuthTokenFromResponse()` checks in priority order:
1. `body.token`
2. `body.access_token`
3. `body.data.token`
4. `body.data.access_token`
5. `Authorization` response header (Bearer prefix stripped)

### Role Normalization

`getNormalizedRoleAccountType(accountType)`: lowercases and trims; maps `event` → `organizer`.

### Pending Account Types

`registerUser()` and `addAccountType()` may return `account_types[]` with `status: 'pending'`. Pending types are stored in `whodini_pending_account_types_v1`. On each `getCurrentSession()` call, types that now appear in `session.roles` (approved) are removed from the pending list. The sidebar shows pending badges for these types.

### `logoutUser()` Flow

1. Clear localStorage token, numeric user ID, pending types, and session cache immediately (client-side logout is instant even if network call fails).
2. Best-effort `POST /api/auth/logout` — errors ignored.

---

## Auth API Endpoints

| Function | Method | Path | Notes |
|---|---|---|---|
| `loginWithPassword` | POST | `/api/auth/login` | `{ email, password }` → Session |
| `sendLoginOtp` | POST | `/api/auth/login/otp/send` | `{ phone }` → `{ message }` |
| `verifyLoginOtp` | POST | `/api/auth/login/otp/verify` | `{ phone, code }` → Session |
| `registerUser` | POST | `/api/auth/register` | multipart (with docs) or JSON → Session |
| `getCurrentSession` | GET | `/api/auth/me` | → `{ user, session? }` |
| `logoutUser` | POST | `/api/auth/logout` | Best-effort; errors ignored |
| `switchRole` | PATCH | `/api/auth/session/role` | `{ activeRoleIndex }` → `{ session }` |
| `addAccountType` | POST | `/api/auth/account-types` | multipart or JSON → `{ session }` |
| `requestPasswordReset` | POST | `/api/auth/forgot-password` | `{ email }` → `{ message }` |
| `resetPassword` | POST | `/api/auth/reset-password` | `{ email, token, password, password_confirmation }` → `{ message }` |

---

## React Query Configuration

Configured in `src/app/providers.tsx`:

```ts
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,          // 10 seconds (all queries except session)
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})
```

**Session query overrides** (in `useSessionQuery()`):
```ts
staleTime: Infinity       // never auto-stale
refetchOnMount: false
refetchOnReconnect: false
enabled: !isPublicAuthPage
```

Public auth paths (`/forgot-password`, `/reset-password`) disable the session query entirely — no `/api/auth/me` call fires on these pages.

---

## `useApi.ts` Hooks

`src/hooks/useApi.ts` — all auth-related hooks. Do not call `src/lib/auth/client.ts` functions directly from components.

| Hook | Mutation fn | Side effect on success |
|---|---|---|
| `useSessionQuery()` | — | Query; reads session |
| `useSignOutMutation()` | `logoutUser()` | `setQueryData(['session'], null)` + `removeQueries(['session'])` |
| `useLoginMutation()` | `loginWithPassword(input)` | `invalidateQueries(['session'])` |
| `useRegisterMutation()` | `registerUser(input)` | `invalidateQueries(['session'])` |
| `useSwitchRoleMutation()` | `switchRole(index)` | `setQueryData(['session'], newSession)` (no invalidate) |
| `useAddAccountTypeMutation()` | `addAccountType(input)` | `invalidateQueries(['session'])` |
| `useRequestPasswordResetMutation()` | `requestPasswordReset(email)` | None |
| `useResetPasswordMutation()` | `resetPassword(input)` | None |

**Sign-out note:** `useSignOutMutation` sets session to `null` immediately then removes the query. It does NOT refetch — in APK WebViews, cross-origin cookies may still be valid and a refetch would re-populate the session before navigation completes.

---

## `RequireSession` Component

`src/components/app/RequireSession.tsx`

Wraps all protected role layouts. Behavior:

| State | Renders |
|---|---|
| Loading or error | `null` (blank) |
| `session === null` | `null` (blank); fires redirect |
| `session` exists | `{children}` |

Redirect: `router.replace('/?redirect=<encodedPath>')` where encoded path includes `window.location.search` so query params are preserved (e.g. workspace deep links).

**`pathnameRef` pattern:** Pathname is read via a ref so the redirect effect doesn't re-fire when Next.js updates the pathname mid-navigation before the layout unmounts.

**Bypass:** `NEXT_PUBLIC_DISABLE_AUTH=true` skips all checks and renders children unconditionally.

---

## Multi-Role System

A single user can hold multiple account types. Role switching changes `activeRoleIndex` on the server and navigates to the role's overview path.

### Account Types

| Account type | Overview path | Description |
|---|---|---|
| `personal` | `/personal` | Personal user feed, subscriptions, memberships |
| `business` | `/business` | Business/brand management |
| `community` | `/community` | Community admin |
| `organizer` | `/organizer` | Event organization (alias: `event`) |
| `agency` | `/agency` | Agency client management |
| `freelance` | `/freelance` | Freelancer services and CRM |

### Path-to-Role Mapping (`role-navigation.ts`)

`getAccountTypeForPath(path)` — used by SideBar to auto-select the correct role when the URL changes.

| Path prefix | Account type |
|---|---|
| `/personal` | `personal` |
| `/business` | `business` |
| `/community` | `community` |
| `/organizer` or `/event` | `organizer` |
| `/agency` | `agency` |
| `/freelance` | `freelance` |

### Role Index Clamping

`clampActiveRoleIndex(roles, activeRoleIndex)`: returns 0 if index is out-of-bounds, NaN, or negative. Never throws.

---

## API Client Pattern

Each role has its own client module: `src/lib/<role>/client.ts`.

All share this pattern:

```ts
function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!.trim();
  return `${baseUrl.replace(/\/+$/, '')}${path}`;
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('whodini_auth_token_v1');
  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) await throwRequestError(response);
  return response.json() as Promise<T>;
}
```

**Error parsing:** checks `body.message`, then first value in `body.errors` (object), falls back to `response.statusText`. Always throws `Error`.

**Rule:** Never call `fetch` directly in components. Go through the `src/lib/<role>/client.ts` layer.

---

## Role Layouts

All role sections share the same layout structure in their `layout.tsx`:

```tsx
<RequireSession>
  <SideBar />
  <div className="bg-gray-50 min-h-screen pt-16 xl:pt-0 xl:ml-18">
    {children}
  </div>
</RequireSession>
```

- `pt-16` clears the mobile fixed header (h-16)
- `xl:pt-0 xl:ml-18` clears the desktop sidebar (w-18 collapsed)

---

## SideBar

`src/components/app/SideBar.tsx` — see `SideBar-workflow.md` for full detail.

### Responsive Behavior

| Breakpoint | Layout |
|---|---|
| `< xl` | Fixed gradient top header (`h-16`) + shadcn `Sheet` slide-in drawer |
| `≥ xl` | Fixed left sidebar, icon-rail (collapsed `w-18`) ↔ full-width (`w-64`, auto-expands on hover) |

### Key Behaviors

- **Role auto-sync:** `useEffect` watches URL path. When path implies a different role than `session.activeRoleIndex`, silently calls `switchRole.mutate(matchedIndex)`.
- **Role switching:** `handleAccountTypeChange` → `switchRole.mutate(index)` → `navigate(role.overviewPath)`.
- **`whodini:open-account-type` CustomEvent:** Other parts of the app dispatch this with `detail.accountTypeId` to programmatically switch roles without UI interaction.
- **Profile popup:** Avatar from `['personal', 'profile']` query (`staleTime: 5 min`), falls back to initials. Popup items: Saved, Calendar, Activity, Support (all `href="#"` — placeholder).
- **Sign-out:** Confirm modal → `signOut.mutateAsync()` → `router.push('/')`.

---

## UI Conventions

### Brand Gradient

`#ff5f6d` → `#ffc371`, always **bottom-to-top**:
```css
bg-gradient-to-t from-[#ff5f6d] to-[#ffc371]
```

Do not use `bg-gradient-to-b` or `bg-gradient-to-br` for brand gradient elements.

### shadcn/ui

Tailwind CSS v4 + shadcn/ui (new-york style). Components in `src/components/ui/` (shadcn primitives) and `src/components/app/` (app-level).

**`DialogFooter` is NOT exported.** Use:
```tsx
<div className="flex justify-end gap-2 pt-2">
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</div>
```

Exported `@/components/ui/dialog` members: `Dialog`, `DialogClose`, `DialogContent`, `DialogDescription`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger`.

### Image Safety

`safeImg(url)`: coerces `http://` to `https://`, returns `null` for falsy values. Pass through this helper before setting `<img src>` to avoid mixed-content warnings.

### Banner + Logo Card Pattern

Across agencies, communities, business cards, and the personal home page:
- Fixed-height banner area (`h-24`–`h-28`) with gradient placeholder when `banner_url` is null
- Logo avatar (`w-9`–`w-11` rounded square) absolutely positioned at `-bottom-4`/`-bottom-5` with `ring-2 ring-white shadow` to overlap banner bottom-left
- Card content below: `pt-6`–`pt-8` to clear overlapping logo

---

## Toast System

`src/components/app/Toast.tsx`

**Usage:**
```tsx
const { toast, toasts, removeToast } = useToast();
// ...
toast.success('Saved!');
toast.error('Something went wrong');
// ...
<ToastContainer toasts={toasts} onClose={removeToast} />
```

**`ToastContainer`:** Fixed `top-4 left-1/2 -translate-x-1/2`, `z-50`, centered. `pointer-events-none` on wrapper, `pointer-events-auto` per toast item.

**`Toast`:** auto-dismisses after `duration` (default 4000ms); enter animation at 10ms delay; exit animation over 300ms. Types: `success` (emerald) or `error` (red).

---

## Public Pages (No Auth Required)

### Login (`/`)

Also functions as the SPA router (see SPA Fallback Pattern above).

**Two auth methods:**

| Method | Fields | API |
|---|---|---|
| Password | email, password | `loginWithPassword({ email, password })` |
| OTP via Phone | phone, 6-digit code | `sendLoginOtp(phone)` → `verifyLoginOtp({ phone, code })` |

On success: `qc.setQueryData(['session'], result)` → `useEffect` watching session fires → `router.replace(redirectParam ?? '/personal')`.

**OTP UX:** 6 individual digit inputs (`otpRefs[]`); auto-advance on digit entry; Backspace returns to previous; ArrowLeft/Right moves between boxes; Enter when full submits. Paste event fills all boxes. 60-second resend cooldown (`RESEND_COOLDOWN = 60`) via `setInterval`.

**Session redirect:** if `useSessionQuery()` returns an existing session on mount, immediately redirects to `?redirect=` param or current pathname or `/personal`.

---

### Register (`/register`)

**NDA gate:** `NdaModal` opens immediately on page load. "I Accept" button only activates after the user scrolls to the bottom of the NDA text (`scrollHeight - scrollTop <= clientHeight + 60`). Cannot submit without accepting.

**3-step form:**
1. **Your Details:** Full Name, Email, Password, Confirm Password
2. **Account Type:** Grid of account type cards (multi-select). `personal` is locked/always selected.
3. **Documents (right panel):** Shown when non-personal types are selected. Accordion per selected type.

**Visible account types** (organizer + agency are hidden from the register UI):
- `personal` (locked default)
- `freelance`
- `business`
- `community`

**Document requirements per type:**

| Type | Documents |
|---|---|
| `freelance` | govt_id, proof_of_skill |
| `business` | privacy_policy, business_permit, tax_document |
| `community` | org_charter, sec_registration, tax_exempt |
| `organizer` | business_permit, tax_document, liability_insurance |
| `agency` | business_permit, tax_document, agency_accreditation |

**Submission:** `registerUser({ name, email, password, password_confirmation, accountTypes[], documents? })` — sent as multipart FormData (`documents[typeId][docKey]` fields) when files are present, otherwise JSON. Files accept `image/*,.pdf`.

**Pending approval:** If the API returns `account_types[].status === 'pending'`, those types are stored in `whodini_pending_account_types_v1`.

On success: `router.push('/personal')`.

---

### Forgot Password (`/forgot-password`)

Session query disabled (public page). Submit guard: `email.trim().length > 3 && email.includes('@') && !mutation.isPending`.

Two states: form → sent. "Try again" resets via `setSent(false); mutation.reset()`.

---

### Reset Password (`/reset-password`)

Session query disabled. Reads `?token=` and `?email=` from URL params via `useSearchParams()` (wrapped in `<Suspense>`).

`mounted` state guard prevents redirect on first render (avoids flicker while `useSearchParams()` hydrates). Missing params → redirects to `/forgot-password` after mount.

Submit guard: `password.length >= 8 && password === confirmation && !mutation.isPending`.

On success: `done = true` → auto-redirects to `/` after 3000ms.

---

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |
| `NEXT_PUBLIC_DISABLE_AUTH` | No | Set to `true` to bypass `RequireSession` (local dev) |
| `BASE_PATH` / `NEXT_PUBLIC_BASE_PATH` | No | CDN sub-path for non-root deployments |

---

## Navigation Summary (Top-Level Routes)

| Path | Component | Auth |
|---|---|---|
| `/` | Login + SPA router | Public |
| `/register` | Registration + NDA | Public |
| `/forgot-password` | Password reset request | Public |
| `/reset-password` | Password reset form | Public (needs `?token=&email=`) |
| `/personal/*` | Personal role pages | `RequireSession` |
| `/business/*` | Business role pages | `RequireSession` |
| `/community/*` | Community role pages | `RequireSession` |
| `/organizer/*` | Organizer role pages | `RequireSession` |
| `/agency/*` | Agency role pages | `RequireSession` |
| `/freelance/*` | Freelance role pages | `RequireSession` |
| `/not-found` | 404 fallback | SPA loop detection redirect target |

---

## Shared Cross-Role Patterns

| Pattern | Implementation |
|---|---|
| Auth guard | `RequireSession` in each role's `layout.tsx` |
| Role sidebar | `SideBar` in each role's `layout.tsx` |
| Session cache | 30-minute localStorage cache; prevents `/api/auth/me` on every navigation |
| Optimistic session set | Login/OTP/register: `qc.setQueryData(['session'], result)` instead of waiting for invalidate |
| Role switch on URL change | SideBar auto-calls `switchRole.mutate()` when URL implies different role |
| Deep-link restore | Client component reads ID from sessionStorage + `window.history.replaceState` |
| Per-section loading | Inline "Loading…" text per section, no page-level spinners (most role pages) |
| Submit guards on forms | Disabled submit button when required fields empty or mutation in progress |
| `window.confirm` for destructive actions | Events cancel/delete across Business, Community, Organizer roles |
| Auto-mark-read on expand | Inquiry pages (Business, Community, Freelance) — `pending` status updated when card opened |
| 3500ms success message auto-dismiss | `successMsg` state cleared via `setTimeout` in Inquiry pages |
| `safeImg(url)` for image URLs | Coerces `http://` → `https://`, returns `null` for falsy |
| `whodini:navigate` CustomEvent | Community page for in-place navigation (Forums/Discover/Chatroom tabs) |
| `whodini:open-account-type` CustomEvent | SideBar role switching from external components |
