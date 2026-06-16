# Forgot Password Workflow

`src/app/forgot-password/page.tsx`

## Flow Overview

```
Enter email → Submit → Success state (check email) → Back to sign in
```

---

## Form State

| State      | Type                              | Purpose                                               |
| ---------- | --------------------------------- | ----------------------------------------------------- |
| `email`    | `string`                          | Controlled input value                                |
| `sent`     | `boolean`                         | Toggles between form view and success view            |
| `mutation` | `useRequestPasswordResetMutation` | Tracks pending/error state from `src/hooks/useApi.ts` |

---

## Submit Guard (`canSubmit`)

Button is enabled only when all three conditions are true:

1. `email.trim().length > 3`
2. `email.includes('@')`
3. `!mutation.isPending`

Enter key on the input also triggers submit when `canSubmit` is true.

---

## Submission (`handleSubmit`)

1. Calls `mutation.mutateAsync(email.trim())` → `useRequestPasswordResetMutation` from `src/hooks/useApi.ts`.
2. On success → sets `sent = true`, renders the success view.
3. On error → `mutation.error` is set; displayed as an inline red banner.

---

## Views

### Form View (`sent === false`)

- Email input field.
- Error banner (shown when `mutation.error` is set).
- "Send reset link" / "Sending…" submit button.
- "Remember your password? Sign in" link → `/`.

### Success View (`sent === true`)

- Green `CheckCircle2` icon.
- Confirmation message showing the submitted email address.
- "Didn't receive it?" → "try again" button resets `sent = false` and calls `mutation.reset()` to clear error state.
- "Back to sign in" button → `/`.

---

## Navigation

- **Back button** (bottom, outside card) → `router.push('/')`.
- **Sign in link** (inside form) → `Link href="/"`.
- **Back to sign in** (success view) → `Link href="/"`.
