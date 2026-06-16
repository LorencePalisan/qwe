# Login Workflow

`src/app/page.tsx`

## Flow Overview

```
Page load → SPA fallback check → Session check → Login form (Password | OTP) → Redirect
```

---

## On Mount — SPA Fallback

Because the CDN (S3/CloudFront) serves `index.html` for all unknown paths, this page doubles as the SPA router. A `useEffect` runs once on mount:

1. If `window.location.pathname` is `/` or empty → do nothing, render login.
2. Otherwise, check sessionStorage for an infinite-loop guard (`whodini_spa_path` + `whodini_spa_ts`):
   - **Loop detected** (same path seen within 5 s) → clear keys, `router.replace('/not-found')`.
   - **No loop** → check if path matches a dynamic-route stub pattern:

| Pattern                    | sessionStorage key        | Stub destination                  |
| -------------------------- | ------------------------- | --------------------------------- |
| `/personal/freelance/:id`  | `whodini_nav__freelancer` | `/personal/freelance/preview`     |
| `/personal/business/:id`   | `whodini_nav__business`   | `/personal/business/preview`      |
| `/personal/agency/:id`     | `whodini_nav__agency`     | `/personal/agency/preview`        |
| `/personal/organizers/:id` | `whodini_nav__organizer`  | `/personal/organizers/preview`    |
| `/business/workspace/:id`  | `whodini_nav__workspace`  | `/business/workspace/__loading__` |

For matching paths, the real UUID is saved to sessionStorage and the router replaces to the stub. For non-matching paths, the original pathname is used as the target. The **stub path** (not the real UUID) is written to the loop guard so a hard reload of the restored URL doesn't false-trigger the detector.

---

## Session Check

`useSessionQuery` checks for a cached/valid session (token in `localStorage`, 30-min cache):

- Loading → render nothing.
- Session exists → `router.replace(redirect)` where `redirect` is:
  1. `?redirect=<encoded>` query param if present.
  2. Otherwise current pathname if not `/`.
  3. Fallback: `/personal`.

---

## Login Form

Two tabs, toggled by `activeTab: 'password' | 'otp'`.

### Tab 1 — Password

| Field    | Type     | Notes                           |
| -------- | -------- | ------------------------------- |
| Email    | email    | required                        |
| Password | password | toggle visibility with Eye icon |

**Submit (`handlePasswordSubmit`):**

1. Calls `loginWithPassword({ email, password })` from `src/lib/auth/client.ts`.
2. On success → `qc.setQueryData(['session'], result)` which triggers the session-redirect effect.
3. On error → sets `pwError` state; displayed as an inline red banner above the submit button.

Forgot password link → `/forgot-password`.

---

### Tab 2 — OTP via Phone

Two sub-steps controlled by `otpStep: 'enter_phone' | 'enter_code'`.

#### Sub-step 1: Enter Phone

| Field        | Type | Notes                     |
| ------------ | ---- | ------------------------- |
| Phone Number | tel  | must include country code |

- Enter key or "Send OTP" button calls `handleSendOtp`.
- `handleSendOtp` → calls `sendLoginOtp(phone)` → advances to `enter_code`, starts 60 s resend cooldown, focuses first OTP digit.

#### Sub-step 2: Enter Code

- Displays a readonly phone number row with a **Change** button (resets to `enter_phone`).
- 6 individual digit inputs (`OTP_LENGTH = 6`), each `maxLength={1}`, numeric only.
- Keyboard navigation: Backspace moves focus left, ArrowLeft/Right navigate between digits, Enter on a full code triggers verify.
- Paste support: strips non-digits, distributes up to 6 chars across inputs, focuses last filled digit.
- **Verify & Sign In** button enabled only when all 6 digits filled (`otpFull`).
  - Calls `handleVerifyOtp` → `verifyLoginOtp({ phone, code })` → `qc.setQueryData(['session'], result)`.
  - On error → `toast.error`.
- **Resend OTP** button disabled for 60 s (`RESEND_COOLDOWN`) after each send; shows countdown `"Resend OTP in Xs"`.

---

## Constants

| Name              | Value | Purpose                          |
| ----------------- | ----- | -------------------------------- |
| `OTP_LENGTH`      | 6     | Number of OTP digits             |
| `RESEND_COOLDOWN` | 60    | Seconds before resend is allowed |

---

## Post-Login Redirect

After `qc.setQueryData(['session'], result)` the session-redirect `useEffect` fires because `session` changes from `undefined` to the result object. It resolves the destination using the priority order described in **Session Check** above.
