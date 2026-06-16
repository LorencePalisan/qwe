# Register Workflow

`src/app/register/page.tsx`

## Flow Overview

```
Page load → NDA modal → Fill details → Select account types → Upload docs → Submit
```

---

## Step 0 — NDA Gate

The `NdaModal` opens automatically on mount (`ndaModalOpen: true` by default). The user must accept before the form can be submitted. If they close without accepting, the banner in the footer shows "Review NDA" and the submit button stays disabled.

- State: `ndaAccepted: boolean`, `ndaModalOpen: boolean`
- Component: `src/components/app/NdaModal.tsx`

---

## Step 1 — Personal Details

| Field            | Type     | Notes                           |
| ---------------- | -------- | ------------------------------- |
| Full Name        | text     | `name` state                    |
| Email Address    | email    | `email` state                   |
| Password         | password | toggle visibility with Eye icon |
| Confirm Password | password | toggle visibility with Eye icon |

---

## Step 2 — Account Types

Visible types (rendered from `VISIBLE_ACCOUNT_TYPES`):

| ID          | Label            | Description                        | Locked        |
| ----------- | ---------------- | ---------------------------------- | ------------- |
| `personal`  | Personal         | Manage subscriptions & memberships | yes (default) |
| `freelance` | Freelance        | Offer services & manage clients    | no            |
| `business`  | Business / Brand | Send updates to subscribers        | no            |
| `community` | Community        | Manage members & announcements     | no            |

> `organizer` and `agency` are defined in `ACCOUNT_TYPES` but excluded from `VISIBLE_ACCOUNT_TYPES`.

- `personal` is always selected and cannot be toggled off.
- Selecting a non-personal type auto-expands its document accordion.
- Deselecting clears its uploaded files and collapses the accordion.

---

## Step 3 — Document Upload (conditional)

Appears as a right panel only when at least one non-personal type is selected. Each type expands in an accordion.

### Freelance

| Key              | Label                          | Hint                                         |
| ---------------- | ------------------------------ | -------------------------------------------- |
| `govt_id`        | Government-Issued ID           | Passport, Driver's License, or National ID   |
| `proof_of_skill` | Proof of Skill / Certification | Diploma, certificate, or relevant credential |

### Business / Brand

| Key               | Label              | Hint                                        |
| ----------------- | ------------------ | ------------------------------------------- |
| `privacy_policy`  | Privacy Policy     | PDF of your published privacy policy        |
| `business_permit` | Business Permit    | Local government-issued business permit     |
| `tax_document`    | Tax Document (BIR) | Certificate of Registration or TIN document |

### Community

| Key                | Label                            | Hint                                    |
| ------------------ | -------------------------------- | --------------------------------------- |
| `org_charter`      | Community Charter / Constitution | Founding document or bylaws             |
| `sec_registration` | SEC / NGO Registration           | Government registration certificate     |
| `tax_exempt`       | Tax Exemption Certificate        | BIR tax exemption ruling, if applicable |

### Organizer (hidden from UI, defined for future use)

| Key                   | Label               | Hint                               |
| --------------------- | ------------------- | ---------------------------------- |
| `business_permit`     | Business Permit     | Local government-issued            |
| `tax_document`        | Tax Document (BIR)  | Certificate of Registration or TIN |
| `liability_insurance` | Liability Insurance | Proof of event liability coverage  |

### Agency (hidden from UI, defined for future use)

| Key                    | Label                | Hint                                          |
| ---------------------- | -------------------- | --------------------------------------------- |
| `business_permit`      | Business Permit      | Local government-issued                       |
| `tax_document`         | Tax Document (BIR)   | Certificate of Registration or TIN            |
| `agency_accreditation` | Agency Accreditation | Industry license or accreditation certificate |

File input accepts: `image/*, .pdf`

---

## Submission

`handleSubmit` runs on form submit:

1. Guards: `!ndaAccepted` → error toast, re-opens NDA modal.
2. Guards: `password !== confirmPassword` → error toast.
3. Calls `registerUser({ name, email, password, password_confirmation, accountTypes, documents })` from `src/lib/auth/client.ts`.
4. On success → `toast.success` → `router.push('/personal')`.
5. On error → `toast.error` with the error message.

Submit button is `disabled` while `isSaving || !ndaAccepted`.

---

## Session Guard

On mount, `useSessionQuery` checks for an existing session. If a valid session exists, the page immediately calls `router.replace('/personal')` and renders nothing — prevents authenticated users from accessing the register page.
