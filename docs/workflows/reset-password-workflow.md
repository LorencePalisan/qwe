# Reset Password Workflow

`src/app/reset-password/page.tsx`

## Flow Overview

```
Arrive via email link (?token=&email=) → Validate params → Set new password → Auto-redirect to sign in
```

---

## URL Parameters

The page is reached via a link in the password-reset email. Both params are required:

| Param   | Source              | Purpose                         |
|---------|---------------------|---------------------------------|
| `token` | `useSearchParams()` | One-time reset token from email |
| `email` | `useSearchParams()` | Identifies the account          |

`hasValidParams` is `true` only when both are non-empty strings.

---

## Mount / Hydration Guard

`useSearchParams()` may return empty values on the first render (SSR/hydration). A `mounted` state (set via `useEffect` on mount) ensures the param-validation redirect only fires after the client has fully hydrated:

```
mounted = false → skip redirect, render nothing special
mounted = true  → check hasValidParams → redirect to /forgot-password if missing
```

While the redirect fires, the page renders `"Verifying link…"` as a placeholder.

---

## Form State

| State          | Type      | Purpose                              |
|----------------|-----------|--------------------------------------|
| `password`     | `string`  | New password input                   |
| `confirmation` | `string`  | Confirm password input               |
| `done`         | `boolean` | Toggles to success view after reset  |
| `showPassword` | `boolean` | Eye toggle for new password field    |
| `showConfirmation` | `boolean` | Eye toggle for confirmation field |
| `mutation`     | `useResetPasswordMutation` | Tracks pending/error state |

---

## Submit Guard (`canSubmit`)

Button is enabled only when all three conditions are true:

1. `password.length >= 8`
2. `password === confirmation` (`passwordsMatch`)
3. `!mutation.isPending`

Enter key on the confirmation field also triggers submit when `canSubmit` is true.

An inline validation message `"Passwords do not match."` appears below the confirmation field when `confirmation.length > 0 && !passwordsMatch`.

---

## Submission (`handleSubmit`)

1. Calls `mutation.mutateAsync({ email, token, password, password_confirmation: confirmation })` → `useResetPasswordMutation` from `src/hooks/useApi.ts`.
2. On success → sets `done = true`, renders the success view, and schedules `router.push('/')` after **3 seconds**.
3. On error → `mutation.error` displayed as an inline red banner.

---

## Views

### Form View (`done === false`)

- Subtitle shows the email address from the URL param.
- New password field (min 8 chars, Eye toggle).
- Confirm password field (Eye toggle, inline mismatch error).
- Error banner (shown when `mutation.error` is set).
- "Reset password" / "Saving…" submit button.

### Success View (`done === true`)

- Green `CheckCircle2` icon.
- "Password reset!" heading.
- "Redirecting to sign in…" message (auto-redirect fires after 3 s).
- "Go to sign in" button → `Link href="/"` (manual escape if user doesn't want to wait).

---

## Navigation

- **Back button** (bottom, outside card) → `history.back()`.
- **Go to sign in** (success view) → `Link href="/"`.
- **Invalid params redirect** → `router.replace('/forgot-password')`.
- **Auto-redirect after success** → `router.push('/')` after 3000 ms.

---

## Suspense Boundary

`ResetPasswordForm` is wrapped in `<Suspense>` at the page level because `useSearchParams()` requires it in Next.js App Router static exports. The fallback renders a dark loading screen.
