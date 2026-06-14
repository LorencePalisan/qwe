# Whodini — Page Documentation

Covers layout, content, static data, and design details for each page.
Auth pages are documented first; additional sections will be appended.

---

## Table of Contents

### Auth Pages

- [Login](#1-login)
- [Register](#2-register)
- [Forgot Password](#3-forgot-password)
- [Reset Password](#4-reset-password)
- [404 Not Found](#5-404-not-found)

### Personal Pages

- [Personal Home](#p1-personal-home)
- [Profile](#p2-profile)
- [Connections](#p3-connections)
- [Community](#p4-community)
- [Events](#p5-events)
- [Freelancers](#p6-freelancers)
- [Business Rewards](#p7-business-rewards)
- [Agencies](#p8-agencies)
- [Notifications](#p9-notifications)
- [Activity / Transaction Log](#p10-activity--transaction-log)
- [My Accounts](#p11-my-accounts)
- [Subscriptions](#p12-subscriptions)
- [Organizer Preview](#p13-organizer-preview)
- [Games](#p14-games)

### Business Pages

- [Business Overview (Products & Services)](#b1-business-overview-products--services)
- [Brands](#b2-brands)
- [Services & Products Catalog](#b3-services--products-catalog)
- [Events](#b4-business-events)
- [Subscribers](#b5-subscribers)
- [Inquiries](#b6-inquiries)
- [Notifications](#b7-business-notifications)
- [History](#b8-history)
- [Workspace](#b9-workspace)
- [Team](#b10-team)
- [Settings](#b11-settings)
- [Setup](#b12-setup)

### Freelance Pages

- [Freelance Dashboard](#f1-freelance-dashboard)
- [Service Catalog](#f2-service-catalog)
- [Client CRM](#f3-client-crm)
- [Public Portfolio](#f4-public-portfolio)
- [Inquiries](#f5-freelance-inquiries)
- [Calendar & Milestones](#f6-calendar--milestones)

### Community Pages

- [Community Dashboard](#c1-community-dashboard)
- [Members](#c2-members)
- [Events](#c3-community-events)
- [Chapters](#c4-chapters)
- [Message Board (Chat Rooms)](#c5-message-board-chat-rooms)
- [Inquiries](#c6-community-inquiries)
- [History (Audit Trail)](#c7-history-audit-trail)
- [Directory](#c8-directory)
- [Settings](#c9-community-settings)
- [Services](#c10-services)

---

## 1. Login

**Route:** `/`
**File:** `src/app/page.tsx`

### Layout

```
┌─────────────────────────────────────────────┐
│         Full-screen gradient background      │
│         (#ff5f6d → #ffc371, bottom-right)   │
│                                             │
│   ┌──────────────────────────────────┐      │
│   │  [Logo 72×72]  Whodini (bold)   │      │  ← centered brand header
│   └──────────────────────────────────┘      │
│                                             │
│   ┌──────────────────────────────────┐      │
│   │  Glass card (black/20 blur)      │      │  ← max-w-sm / md
│   │  "Sign in to access your        │      │
│   │   digital identity"              │      │
│   │                                  │      │
│   │  [Password | OTP via Phone] tab  │      │
│   │  ────────────────────────────── │      │
│   │  PASSWORD TAB                    │      │
│   │    Email field                   │      │
│   │    Password field + eye toggle   │      │
│   │    Forgot password? (right)      │      │
│   │    [Sign In] button              │      │
│   │  ────────────────────────────── │      │
│   │  OTP TAB (step 1 — phone)        │      │
│   │    Phone Number field            │      │
│   │    [Send OTP] button             │      │
│   │  OTP TAB (step 2 — code)         │      │
│   │    Phone display + Change link   │      │
│   │    6× digit boxes                │      │
│   │    [Verify & Sign In] button     │      │
│   │    Resend OTP / cooldown timer   │      │
│   │  ────────────────────────────── │      │
│   │  "Don't have an account?         │      │
│   │   Register here"                 │      │
│   └──────────────────────────────────┘      │
│                                             │
│   [Learn more about Whodini] (external)     │  ← pill button below card
└─────────────────────────────────────────────┘
```

### Design

| Token         | Value                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| Background    | `bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]`                               |
| Card          | `bg-black/20 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl` |
| Inputs        | `bg-white/10 border-white/20 text-white placeholder:text-white/35`            |
| Active tab    | `bg-white/20 text-white shadow-sm`                                            |
| Submit button | `bg-white text-[#ff5f6d] font-semibold rounded-xl`                            |
| Error alert   | `border-red-400/30 bg-red-500/20 text-white`                                  |

### Static Content

- Heading/tagline: `"Sign in to access your digital identity"`
- Tab labels: `Password`, `OTP via Phone`
- Password tab labels: `Email`, `Password`, `Forgot password?`
- Password placeholder: `you@example.com`
- OTP phone label: `Phone Number`, placeholder: `+1 234 567 8900`
- OTP hint: `"Enter your registered phone number including country code."`
- OTP code hint: `"Enter the 6-digit code sent to your phone."`
- Sign-up prompt: `"Don't have an account? Register here"`
- External link: `"Learn more about Whodini"` → `https://www.whodini.io/`

### Form Fields

| Field           | Type                                 | Validation                   |
| --------------- | ------------------------------------ | ---------------------------- |
| Email           | `email`                              | required                     |
| Password        | `password` / `text` (toggle)         | required                     |
| Phone           | `tel`                                | non-empty to enable Send OTP |
| OTP digits [×6] | `text` inputMode=numeric maxLength=1 | all 6 filled to verify       |

### States

- **Loading session** — renders nothing (returns `null`)
- **Authenticated** — immediately redirects to `/personal` (or `?redirect=` param)
- **OTP cooldown** — "Resend OTP in Xs" countdown (60 s)
- **Sign-in error** — inline red alert below password field
- **OTP error** — Toast notification

### Navigation

| Action                 | Destination                         |
| ---------------------- | ----------------------------------- |
| Forgot password link   | `/forgot-password`                  |
| Register here link     | `/register`                         |
| After successful login | `/personal` (or `?redirect=` value) |
| "Learn more"           | `https://www.whodini.io/` (new tab) |

---

## 2. Register

**Route:** `/register`
**File:** `src/app/register/page.tsx`

### Layout

```
┌─────────────────────────────────────────────────────┐
│      Full-screen gradient + decorative blur orbs    │
│      (#ff5f6d → #ffc371, bottom-right)             │
│                                                     │
│  [Logo 40×40]  Whodini  ← brand header             │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  GLASS CARD (max-w-5xl)                       │  │
│  │  ┌──────────────────────────────────────────┐ │  │
│  │  │ Card header                              │ │  │
│  │  │ "Create your account"                    │ │  │
│  │  │ "Fill in your details and choose your    │ │  │
│  │  │  account types to get started."          │ │  │
│  │  └──────────────────────────────────────────┘ │  │
│  │                                               │  │
│  │  ┌─────────────────┐  ┌──────────────────┐   │  │
│  │  │  LEFT PANEL     │  │  RIGHT PANEL      │   │  │
│  │  │                 │  │  (only when a     │   │  │
│  │  │  ① Your Details │  │   non-Personal    │   │  │
│  │  │  Full Name      │  │   type selected)  │   │  │
│  │  │  Email          │  │                   │   │  │
│  │  │  Password       │  │  ③ Documents      │   │  │
│  │  │  Confirm PW     │  │  Accordion per    │   │  │
│  │  │                 │  │  selected type    │   │  │
│  │  │  ② Account Type │  │  with file upload │   │  │
│  │  │  [Personal]     │  │  slots            │   │  │
│  │  │  [Freelance]    │  │                   │   │  │
│  │  │  [Business]     │  │                   │   │  │
│  │  │  [Community]    │  │                   │   │  │
│  │  └─────────────────┘  └──────────────────┘   │  │
│  │                                               │  │
│  │  ┌──────────────────────────────────────────┐ │  │
│  │  │  Card footer                             │ │  │
│  │  │  NDA status banner                       │ │  │
│  │  │  [Create Account] button                 │ │  │
│  │  │  "Already have an account? Sign in"      │ │  │
│  │  │  "Learn more →"                          │ │  │
│  │  └──────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Design

| Token                | Value                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| Background           | `bg-linear-to-br from-[#ff5f6d] to-[#ffc371]`                                 |
| Orbs                 | 3× `bg-white/10 blur-3xl rounded-full` (decorative)                           |
| Card                 | `bg-black/20 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl` |
| Right panel          | `bg-white/5` with `border-l border-white/10`                                  |
| Inputs               | `bg-white/10 border-white/20 text-white placeholder:text-white/35 rounded-xl` |
| Type tile (selected) | `border-white/60 bg-white/20 shadow`                                          |
| Type tile (default)  | `border-white/15 bg-white/5`                                                  |
| Submit button        | `bg-white text-[#ff5f6d] font-bold h-12 rounded-2xl`                          |
| NDA accepted         | `border-emerald-400/30 bg-emerald-400/10 text-emerald-300`                    |
| NDA pending          | `border-[#ff5f6d]/40 bg-[#ff5f6d]/10 text-white/80`                           |
| File upload area     | `border-dashed border-white/25 bg-white/5 rounded-xl`                         |

### Static Content

- Card heading: `"Create your account"`
- Card subheading: `"Fill in your details and choose your account types to get started."`
- Section 1 label: `"Your Details"` (badge: `1`)
- Section 2 label: `"Account Type"` (badge: `2`) — hint: `"Select all that apply — you can add more later"`
- Section 3 label: `"Documents"` (badge: `3`) — hint: `"Required for verification"`
- NDA accepted text: `"Non-Disclosure Agreement accepted"`
- NDA pending text: `"You must accept the NDA to register"` + `"Review NDA"` link
- Submit label: `"Create Account"` / `"Creating account…"`
- Footer links: `"Already have an account? Sign in"` | `"Learn more →"`

### Account Types (visible in UI)

| id          | Label            | Description                        | Default/Locked        |
| ----------- | ---------------- | ---------------------------------- | --------------------- |
| `personal`  | Personal         | Manage subscriptions & memberships | Yes (always selected) |
| `freelance` | Freelance        | Offer services & manage clients    | No                    |
| `business`  | Business / Brand | Send updates to subscribers        | No                    |
| `community` | Community        | Manage members & announcements     | No                    |

> `organizer` and `agency` types exist in the data model but are hidden from the registration UI.

### Required Documents per Type

**Freelance**

- Government-Issued ID — `"Passport, Driver's License, or National ID"`
- Proof of Skill / Certification — `"Diploma, certificate, or relevant credential"`

**Business / Brand**

- Privacy Policy — `"PDF of your published privacy policy"`
- Business Permit — `"Local government-issued business permit"`
- Tax Document (BIR) — `"Certificate of Registration or TIN document"`

**Community**

- Community Charter / Constitution — `"Founding document or bylaws"`
- SEC / NGO Registration — `"Government registration certificate"`
- Tax Exemption Certificate — `"BIR tax exemption ruling, if applicable"`

### Form Fields

| Field              | Type                       | Notes                          |
| ------------------ | -------------------------- | ------------------------------ |
| Full Name          | `text`                     | required                       |
| Email Address      | `email`                    | placeholder: `you@example.com` |
| Password           | `password` / `text` toggle | Eye icon toggle                |
| Confirm Password   | `password` / `text` toggle | Must match Password            |
| Account type tiles | multi-select toggle        | Personal locked                |
| Document files     | `file` (image/\*, .pdf)    | Per non-personal type selected |

### States

- **NDA modal** — opens automatically on page load; must be accepted before submitting
- **No non-personal type selected** — right panel hidden; single-column layout
- **Non-personal type selected** — right panel appears (document uploads); two-column layout on `lg`
- **Submitting** — button shows `"Creating account…"`, disabled
- **Session exists** — redirects to `/personal` immediately
- **Error** — Toast notification at top

### Navigation

| Action                    | Destination                         |
| ------------------------- | ----------------------------------- |
| "Sign in" link            | `/`                                 |
| "Learn more →"            | `https://www.whodini.io/` (new tab) |
| After successful register | `/personal`                         |

---

## 3. Forgot Password

**Route:** `/forgot-password`
**File:** `src/app/forgot-password/page.tsx`

### Layout

```
┌──────────────────────────────────────────┐
│   Full-screen gradient background        │
│   (#ff5f6d → #ffc371, bottom-right)     │
│                                          │
│   [Logo 80×80]                           │
│   Whodini                                │  ← centered brand header
│                                          │
│   ┌────────────────────────────────┐     │
│   │  White card (bg-white/95)      │     │  ← max-w-md / lg
│   │                                │     │
│   │  STATE A — Request form        │     │
│   │  "Enter your email and we'll   │     │
│   │   send you a reset link."      │     │
│   │  Email address field           │     │
│   │  [Send reset link] button      │     │
│   │  "Remember your password?      │     │
│   │   Sign in"                     │     │
│   │                                │     │
│   │  STATE B — Success             │     │
│   │  [✓ green icon]                │     │
│   │  "Check your email"            │     │
│   │  "We sent a reset link to      │     │
│   │   <email>"                     │     │
│   │  Spam hint + try again link    │     │
│   │  [Back to sign in] button      │     │
│   └────────────────────────────────┘     │
│                                          │
│   [← Back] pill button                   │  ← navigates to /
└──────────────────────────────────────────┘
```

### Design

| Token           | Value                                                                |
| --------------- | -------------------------------------------------------------------- |
| Background      | `bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]`                      |
| Card            | `bg-white/95 rounded-2xl shadow-xl`                                  |
| Submit button   | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white rounded-xl` |
| Success icon bg | `bg-green-50` with `CheckCircle2` in `text-green-600`                |
| Error alert     | `border border-red-200 bg-red-50 text-red-700 rounded-xl`            |
| Back button     | `bg-white/20 backdrop-blur-sm text-white rounded-xl`                 |

### Static Content

**Request state**

- Subtext: `"Enter your email and we'll send you a reset link."`
- Field label: `"Email address"`, placeholder: `"you@example.com"`
- Submit: `"Send reset link"` / `"Sending…"`
- Footer: `"Remember your password? Sign in"`

**Success state**

- Heading: `"Check your email"`
- Body: `"We sent a password reset link to <email>."`
- Hint: `"Didn't receive it? Check your spam folder or try again."`
- CTA: `"Back to sign in"`

### Form Fields

| Field         | Type    | Validation                  |
| ------------- | ------- | --------------------------- |
| Email address | `email` | length > 3 AND contains `@` |

### States

- **Idle** — email field + send button (disabled if email invalid)
- **Sending** — button shows `"Sending…"`, disabled
- **Success (`sent = true`)** — replaces form with confirmation card
- **Error** — inline red alert below field showing API error message
- **Try again** — clicking the inline link resets to idle form

### Navigation

| Action                             | Destination       |
| ---------------------------------- | ----------------- |
| "Sign in" link                     | `/`               |
| "Back to sign in" button (success) | `/`               |
| Back pill button                   | `/` (router.push) |

---

## 4. Reset Password

**Route:** `/reset-password?token=<token>&email=<email>`
**File:** `src/app/reset-password/page.tsx`

### Layout

```
┌──────────────────────────────────────────┐
│   Full-screen gradient background        │
│   (#ff5f6d → #ffc371, bottom-right)     │
│                                          │
│   [Logo 80×80]                           │
│   Whodini                                │  ← centered brand header
│                                          │
│   ┌────────────────────────────────┐     │
│   │  White card (bg-white/95)      │     │  ← max-w-md / lg
│   │                                │     │
│   │  STATE A — New password form   │     │
│   │  "Creating a new password for  │     │
│   │   <email>"                     │     │
│   │  New password field + toggle   │     │
│   │  Confirm password + toggle     │     │
│   │  Mismatch error (inline)       │     │
│   │  [Reset password] button       │     │
│   │                                │     │
│   │  STATE B — Done                │     │
│   │  [✓ green icon]                │     │
│   │  "Password reset!"             │     │
│   │  "Your password has been       │     │
│   │   updated. Redirecting…"       │     │
│   │  [Go to sign in] button        │     │
│   └────────────────────────────────┘     │
│                                          │
│   [← Back] pill button                   │  ← history.back()
└──────────────────────────────────────────┘
```

### Design

Identical to Forgot Password card styling.

| Token           | Value                                                                |
| --------------- | -------------------------------------------------------------------- |
| Background      | `bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]`                      |
| Card            | `bg-white/95 rounded-2xl shadow-xl`                                  |
| Submit button   | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white rounded-xl` |
| Mismatch error  | `text-xs text-red-500 mt-1` (inline below confirm field)             |
| API error alert | `border border-red-200 bg-red-50 text-red-700 rounded-xl`            |
| Back button     | `bg-white/20 backdrop-blur-sm text-white rounded-xl`                 |

### Static Content

**Form state**

- Subtext: `"Creating a new password for <email>"`
- New password label: `"New password"`, placeholder: `"At least 8 characters"`
- Confirm label: `"Confirm new password"`, placeholder: `"Repeat your password"`
- Mismatch error: `"Passwords do not match."`
- Submit: `"Reset password"` / `"Saving…"`

**Done state**

- Heading: `"Password reset!"`
- Body: `"Your password has been updated. Redirecting to sign in…"`
- CTA: `"Go to sign in"`

### URL Parameters (required)

| Param   | Description                          |
| ------- | ------------------------------------ |
| `token` | Password reset token from email link |
| `email` | User's email address                 |

If either param is missing after hydration, redirects to `/forgot-password`.

### Form Fields

| Field                | Type                       | Validation          |
| -------------------- | -------------------------- | ------------------- |
| New password         | `password` / `text` toggle | min 8 characters    |
| Confirm new password | `password` / `text` toggle | must match password |

### States

- **Params missing** — spinner + redirects to `/forgot-password`
- **Idle** — form shown, submit disabled until passwords match and length ≥ 8
- **Submitting** — button shows `"Saving…"`, disabled
- **Done** — success card; auto-redirects to `/` after 3 s
- **Error** — inline red alert showing API error message

### Navigation

| Action                            | Destination                  |
| --------------------------------- | ---------------------------- |
| "Go to sign in" button            | `/`                          |
| Auto-redirect (3 s after success) | `/`                          |
| Back pill button                  | `history.back()`             |
| Invalid params                    | `/forgot-password` (replace) |

---

## 5. 404 Not Found

**Route:** `/not-found`
**File:** `src/app/not-found/page.tsx`

### Layout

```
┌──────────────────────────────────────────┐
│   Soft gradient background               │
│   (pink-50 → white → rose-50)           │
│                                          │
│              404                         │  ← huge gradient text
│                                          │
│         Page not found                   │  ← h1
│   "The page you're looking for          │
│    doesn't exist or has been moved.     │
│    Let's get you back on track."        │
│                                          │
│   [Go to Dashboard]  OR  [Sign In]      │  ← conditional on session
│   (gradient button)                      │
└──────────────────────────────────────────┘
```

### Design

| Token      | Value                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Background | `bg-gradient-to-br from-pink-50 via-white to-rose-50`                                             |
| `404` text | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] bg-clip-text text-transparent` size `120px`–`160px` |
| CTA button | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white hover:opacity-90`                        |

### Static Content

- Large text: `404`
- Heading: `"Page not found"`
- Body: `"The page you're looking for doesn't exist or has been moved. Let's get you back on track."`
- Authenticated CTA: `"Go to Dashboard"` (LayoutDashboard icon)
- Unauthenticated CTA: `"Sign In"` (Home icon)

### States

- **Loading session** — spinner (`Loader2`) shown in place of CTA
- **Authenticated** — button routes to `/personal`
- **Unauthenticated** — button routes to `/`

### Navigation

| Condition      | CTA             | Destination |
| -------------- | --------------- | ----------- |
| Session exists | Go to Dashboard | `/personal` |
| No session     | Sign In         | `/`         |

---

## Personal Pages

### Shared Layout

**File:** `src/app/personal/layout.tsx`

All personal pages are wrapped in `RequireSession` (redirects unauthenticated users to `/?redirect=<path>`) and render inside:

```
┌─────────────────────────────────────────────┐
│  SideBar (left, collapsible on mobile)       │
│  bg-gradient-to-t from-[#ff5f6d] to-[#ffc371]│
│  pt-16 on mobile / xl:ml-18 on desktop      │
│  {children}                                  │
└─────────────────────────────────────────────┘
```

---

## P1. Personal Home

**Route:** `/personal`
**File:** `src/app/personal/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────┐
│  Personal Gallery (banner/slider)                │
│                                                  │
│  Header                                          │
│  <weekday, month day>                            │
│  "Hey, <FirstName> 👋"    [Following] [Communities] [Events]
│                                                  │
│  Quick Nav (horizontal scroll)                   │
│  [Home][Chat][Community][Events][Freelance]      │
│  [Business][Profile]                            │
│                                                  │
│  Businesses (h-scroll banner cards, up to 8)    │
│  Notifications (h-scroll cards, up to 6)        │
│  Connections (h-scroll avatar row, up to 14)    │
│  Events (h-scroll portrait cards, up to 8)      │
│  Communities (h-scroll banner+logo, up to 10)   │
│  Agencies (h-scroll banner+logo, up to 10)      │
│  Freelancers (h-scroll profile cards, up to 10) │
└──────────────────────────────────────────────────┘
```

### Design

| Element           | Value                                                         |
| ----------------- | ------------------------------------------------------------- |
| Page bg           | `bg-gradient-to-b from-[#ff5f6d] to-[#ffc371]`                |
| Section labels    | `text-sm font-semibold text-white`                            |
| See all button    | `text-xs text-white/60` + ChevronRight                        |
| Business card     | `w-52 h-32 rounded-2xl` image + gradient scrim overlay        |
| Notification card | `w-56 bg-white border border-neutral-100 rounded-2xl`         |
| Connection avatar | `w-16 h-16 rounded-full ring-2 ring-white/40`                 |
| Event card        | `w-44 h-60 rounded-2xl` portrait image + scrim                |
| Community card    | `w-40 rounded-2xl bg-white` banner + `-bottom-4` logo overlap |
| Agency card       | `w-40 rounded-2xl bg-white` banner + `-bottom-4` logo overlap |
| Freelancer card   | `w-36 rounded-2xl bg-white` — cover image + `h-28`            |

### Static Content

- Date format: `"Monday, January 1"` (dynamic)
- Greeting: `"Hey, <FirstName> 👋"`
- Header stats labels: `Following`, `Communities`, `Events`
- Section labels: `Businesses`, `Notifications`, `Connections`, `Events`, `Communities`, `Agencies`, `Freelancers`
- "See all" next to each section label

### Quick Nav Items

| Label     | Icon          | Gradient                          |
| --------- | ------------- | --------------------------------- |
| Home      | Home          | `from-rose-500 to-orange-400`     |
| Chat      | MessageSquare | `from-blue-500 to-cyan-400`       |
| Community | Users         | `from-violet-500 to-purple-500`   |
| Events    | Calendar      | `from-emerald-500 to-teal-400`    |
| Freelance | Briefcase     | `from-pink-500 to-rose-400`       |
| Business  | Building2     | `from-sky-500 to-blue-400`        |
| Profile   | User          | `from-neutral-600 to-neutral-500` |

### Notification Type → Gradient Map

| Type         | Gradient                        |
| ------------ | ------------------------------- |
| promotion    | `from-rose-500 to-orange-400`   |
| event        | `from-violet-500 to-purple-500` |
| update       | `from-blue-500 to-cyan-400`     |
| reward       | `from-amber-500 to-yellow-400`  |
| announcement | `from-emerald-500 to-teal-400`  |

### States

- **Business inline view** — clicking a business card replaces the whole page content with `<BusinessDetailClient>` (no route change); URL is pushed via `history.pushState`
- **Sections only render if data is non-empty** — no empty state placeholders on the home feed
- **Community card NEW badge** — `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371]` pill, top-right of banner
- **Freelancer availability dot** — emerald (available), amber (busy), neutral (unavailable)

### Navigation

| Action                  | Destination                             |
| ----------------------- | --------------------------------------- |
| Quick Nav items         | respective `/personal/<section>` routes |
| Businesses "See all"    | `/personal/business`                    |
| Notifications "See all" | `/personal/notification`                |
| Connections "See all"   | `/personal/connections`                 |
| Events "See all"        | `/personal/events`                      |
| Communities "See all"   | `/personal/community/discover`          |
| Agencies "See all"      | `/personal/agencies`                    |
| Freelancers "See all"   | `/personal/freelance`                   |
| Freelancer card click   | `/personal/freelance/:id`               |
| Agency card click       | `/personal/agency/:id`                  |
| Community card click    | `/personal/community/discover`          |

---

## P2. Profile

**Route:** `/personal/profile`
**File:** `src/app/personal/profile/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  HERO (white bg, border-b)                     │
│  ┌──────────────────────────────────────────┐  │
│  │ Banner h-52→72 (gradient placeholder or  │  │
│  │ image) + "Change banner" button (bottom) │  │
│  └──────────────────────────────────────────┘  │
│  Avatar (w-20→24, rounded-full, ring-4)        │
│  -mt-12 overlap onto banner                    │
│  Display Name (xl bold)                        │
│  @username                                     │
│  [whodini_id badge] [Member since badge]       │
│  Bio (if set)                                  │
│  Upload size hints (if missing images)         │
│                                                │
│  [Profile | Security] tabs                     │
│                                                │
│  PROFILE TAB                                   │
│  ┌──────────────────────────────────────────┐  │
│  │ Basic Information card (Edit / Save)     │  │
│  │ Contact Information card (Edit / Save)   │  │
│  │ Social Links card (Edit / Save)          │  │
│  │ Interests card (Edit / Done)             │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  SECURITY TAB                                  │
│  └── OTP Auth card (phone setup)              │
└────────────────────────────────────────────────┘
```

### Design

| Element            | Value                                                       |
| ------------------ | ----------------------------------------------------------- |
| Banner placeholder | `bg-gradient-to-t from-[#ff5f6d]/20 to-[#ffc371]/20`        |
| Avatar fallback    | `bg-linear-to-br from-[#ff5f6d] to-[#ffc371]` with initials |
| Active tab         | `bg-white text-[#ff5f6d] shadow-sm`                         |
| Edit button        | `border border-neutral-300`                                 |
| Save button        | `bg-[#ff5f6d] text-white`                                   |
| Interest badge     | `border-[#ff5f6d]/30 text-[#ff5f6d] bg-[#ff5f6d]/5`         |
| Cards              | `border border-neutral-200 rounded-xl bg-white shadow-sm`   |

### Tabs

| Tab      | Content                                           |
| -------- | ------------------------------------------------- |
| Profile  | Basic Info, Contact Info, Social Links, Interests |
| Security | OTP phone authentication setup                    |

### Editable Sections (Profile tab)

**Basic Information**
| Field | Type | Placeholder |
|---|---|---|
| Display Name | text | — |
| Username | text | — |
| Bio | textarea (rows=3) | — |
| Birthdate | date | — |

**Contact Information**
| Field | Type |
|---|---|
| Email | email |
| Phone | text |
| Location | text |

**Social Links**
| Field | Icon | Placeholder |
|---|---|---|
| Instagram | Instagram | `@handle` |
| Twitter / X | Twitter | `@handle` |
| Facebook | Facebook | `profile name` |
| Website | LinkIcon | `https://…` |

**Interests** — tag chips with add (`Enter` or Add button) and remove (×) actions

### Image Upload Constraints

| Asset  | Max size | Recommended dimensions |
| ------ | -------- | ---------------------- |
| Avatar | 2 MB     | 400×400 px             |
| Banner | 5 MB     | 1500×500 px            |

### States

- **Loading** — centered spinner
- **Error** — red text + Retry button
- **Viewing** — read-only `InfoRow` grid
- **Editing** — inline form for the active section; other sections remain read-only
- **Saving** — Save button shows spinner, Cancel disabled

---

## P3. Connections

**Route:** `/personal/connections`
**File:** `src/app/personal/connections/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Header: "Connections"                         │
│  "Connect with other Whodini users…"           │
│  [Add Connection] button (gradient)            │
│                                                │
│  [Connections | Chat Rooms] tab switcher       │
│  (each tab shows a count badge)                │
│                                                │
│  CONNECTIONS TAB                               │
│  Pending Requests section (amber bg cards)     │
│    Accept / Decline buttons per card           │
│  Sent Requests section (neutral bg cards)      │
│    "Awaiting response" chip + Cancel (×)       │
│  Connected section (1→2→3 column grid)         │
│    Avatar · name · Whodini ID                  │
│    Tag chips (#Family, #Friends…)              │
│    "Edit tags" link                            │
│    UserMinus (remove) icon                     │
│                                                │
│  CHAT ROOMS TAB                                │
│  [New Room] button                             │
│  Room list (name, last message, member count,  │
│   member avatars, unread badge)               │
└────────────────────────────────────────────────┘
```

### Design

| Element             | Value                                                                           |
| ------------------- | ------------------------------------------------------------------------------- |
| Header button       | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white rounded-xl`            |
| Active tab          | `bg-white text-[#ff5f6d] shadow-sm`                                             |
| Pending request row | `bg-amber-50/60 border-amber-200/60 rounded-2xl`                                |
| Sent request row    | `bg-neutral-50 border-neutral-200 rounded-2xl`                                  |
| Connected card      | `bg-white/80 backdrop-blur-sm border border-neutral-200/80 rounded-2xl`         |
| Tag chip            | `bg-gradient-to-r from-[#ff5f6d]/10 to-[#ffc371]/10 border border-[#ff5f6d]/15` |
| Unread badge        | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`                       |
| Accept button       | `bg-emerald-500 text-white rounded-xl`                                          |

### Static Content

- Page heading: `"Connections"`
- Subheading: `"Connect with other Whodini users and chat in private group rooms."`
- Add button: `"Add Connection"` (UserPlus icon)
- Empty connections: `"No connections yet"` / `"Search for Whodini users to connect with them."`
- Empty rooms: `"No chat rooms yet"` / `"Create a room and invite your connections to chat."`
- Pending section label: `"Pending Requests (N)"` (Clock + amber icon)
- Sent section label: `"Sent Requests (N)"`
- Connected section label: `"Connected (N)"` (CheckCircle2 + emerald)
- Awaiting chip: `"Awaiting response"`

### Modals / Overlays

**Search Panel** — bottom sheet on mobile, centered modal on `sm`+

- Search field: placeholder `"Search by name or WD-P-… ID"` (min 2 chars to trigger)
- Result row: avatar + display name + Whodini ID + `Connect` button (or `Connected` / `Pending` badge)

**Tag Editor** — centered modal

- Quick add presets: `Family`, `Friends`, `Work`, `School`
- Custom tag input: placeholder `"e.g. Neighbour, Colleague…"` + Plus button
- Applied tag list with `×` remove per tag
- Cancel / Save buttons

**Create Room Modal** — selects from accepted connections

**Chat View** — full-screen overlay replacing the page content

### States

- **Active chat room** — page replaced by `<ChatView>` full-screen; Back button returns to list
- **Empty tab** — respective empty state illustration

---

## P4. Community

**Route:** `/personal/community`
**File:** `src/app/personal/community/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Header: "Community"                           │
│  "Discover and join communities"               │
│                                                │
│  [Forums | Discover | Inquiries] tab switcher  │
│                                                │
│  FORUMS TAB                                    │
│  Per joined community:                         │
│    Community logo + name + room count          │
│    Room list: name, Globe/Lock icon,           │
│    last message preview, unread badge,         │
│    member count                                │
│  Empty: "No communities joined yet"            │
│  → link to Discover tab                        │
│                                                │
│  DISCOVER TAB                                  │
│  Search input (debounced 400 ms)               │
│  Category filter pills (All + 7 categories)    │
│  Scope toggle (All | Joined)                   │
│  Community card grid (1→2→3 cols)              │
│    Banner h-28 + overlapping logo w-11         │
│    Name + Globe/Lock icon                      │
│    New / Member / Following badges             │
│    #tag pills (up to 3)                        │
│    Description (line-clamp-2)                  │
│    Members count + location                    │
│    [♥ Follow] [Join/Leave/Inquire] [View] [→]  │
│                                                │
│  INQUIRIES TAB                                 │
│  Status filter pills (All/Pending/Read/…)      │
│  Accordion list (community name, subject,      │
│   date, status badge, expand → message + reply)│
│  Empty: "No inquiries yet"                     │
│                                                │
│  Send Inquiry Modal (when Inquire clicked)     │
│    Subject field + Message textarea            │
│    Cancel / Send buttons                       │
└────────────────────────────────────────────────┘
```

### Design

| Element                      | Value                                                      |
| ---------------------------- | ---------------------------------------------------------- |
| Active tab                   | `bg-white text-[#ff5f6d] shadow-sm`                        |
| Community banner placeholder | `bg-gradient-to-br from-[#ff5f6d]/20 to-[#ffc371]/20 h-28` |
| Logo overlap                 | `w-11 h-11 -bottom-5 left-4 ring-2 ring-white`             |
| Join button                  | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`  |
| Leave button                 | `bg-neutral-200 text-neutral-700`                          |
| Inquire button               | `variant="outline" text-neutral-600`                       |
| Follow (on)                  | `border-blue-200 bg-blue-50 text-blue-500 fill-blue-500`   |
| Inquiry status badges        | pending=amber, read=blue, replied=emerald, closed=neutral  |

### Static Content

- Heading: `"Community"`, sub: `"Discover and join communities"`
- Tab labels: `Forums`, `Discover`, `Inquiries`
- Discovery categories: `Technology`, `Business`, `Creative`, `Marketing`, `Finance`, `Leadership`, `Regional`
- Scope toggle: `All` | `Joined`
- Inquiry filter pills: `All`, `Pending`, `Read`, `Replied`, `Closed`
- Empty forums: `"No communities joined yet"` + `"Join communities from the Discover tab to access their chat rooms here."` + `"Discover communities →"`
- Empty inquiries: `"No inquiries yet"` + `"Send inquiries to communities from their profile page."`
- Send Inquiry modal heading: `"Send Inquiry"`, sub: `"To: <community name>"`
- Inquiry fields: `Subject` (placeholder: `"e.g. Membership inquiry"`), `Message` (placeholder: `"Write your message…"`)

### States

- **Forums view** — shows only joined communities with rooms; communities with no rooms are hidden
- **Private community** — Inquire button instead of Join; no join action possible without membership
- **Public community** — Join/Leave directly via API
- **Followed** — heart icon filled blue; `Following` badge on card
- **Success (inquiry sent)** — green banner: `"Inquiry sent successfully."`
- **Community profile view** — replaces page with `<CommunityShowPage>` (no route change)
- **Chatroom view** — replaces page with `<CommunityChatroomPage>` (no route change)

---

## P5. Events

**Route:** `/personal/events` → redirects to `/personal/events/my-events`
**Files:**

- `src/app/personal/events/page.tsx` (redirect)
- `src/app/personal/events/(tabs)/my-events/page.tsx`
- `src/app/personal/events/(tabs)/discover/page.tsx`
- `src/app/personal/events/(tabs)/registrations/page.tsx`
- `src/app/personal/events/(tabs)\organizers/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Tab navigation: My Events | Discover |        │
│                  Registrations | Organizers    │
│                                                │
│  MY EVENTS TAB                                 │
│  Business Events section                       │
│  Organizer Events section                      │
│  Community Events section                      │
│  Each: event card with banner/image,           │
│  title, date, location, Register/Unregister    │
│                                                │
│  DISCOVER TAB                                  │
│  Search input                                  │
│  Organizer groups (each with event cards)      │
│  Business events mixed in                      │
│                                                │
│  REGISTRATIONS TAB                             │
│  List of events user has registered for        │
│                                                │
│  ORGANIZERS TAB                                │
│  Browse event organizers + inquiry option      │
└────────────────────────────────────────────────┘
```

### Static Content

- Tab labels: `My Events`, `Discover`, `Registrations`, `Organizers`
- Event card fields: title, date (formatted `"Jan 1, 2025"`), location/type, organizer/business name, attendee count
- Location type labels: `In Person`, `Virtual`, `Hybrid`
- Register button: `"Register"` (gradient) / `"Unregister"` (neutral outline)
- Past event badge: visual indicator when event date has passed

---

## P6. Freelancers

**Route:** `/personal/freelance`
**File:** `src/app/personal/freelance/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Header: "Freelancers"                         │
│  "Discover approved freelancers…"              │
│                                                │
│  [Browse Freelancers | My Inquiries] tabs      │
│                                                │
│  BROWSE TAB                                    │
│  Search input (by name or skill)               │
│  Filter pills: [All] [Available] [Busy]        │
│  Card grid (1→2→3 cols)                        │
│    Avatar (w-10 rounded-xl)                    │
│    Name + availability badge                   │
│    Bio (line-clamp-2)                          │
│    Skill pills (up to 4, +N more)              │
│    Stats: "X services" + "X completed"         │
│    [Send Inquiry] button (gradient)            │
│                                                │
│  MY INQUIRIES TAB                              │
│  Accordion list: subject, status badge,        │
│  "To: <freelancer> · date"                     │
│  Expand → your message + reply block           │
│                                                │
│  Inquiry Form Modal (on Send Inquiry)          │
│  Freelancer Detail Page (on card click)        │
└────────────────────────────────────────────────┘
```

### Design

| Element             | Value                                                      |
| ------------------- | ---------------------------------------------------------- |
| Card                | `border border-neutral-200 rounded-2xl bg-white shadow-sm` |
| Available badge     | `bg-emerald-100 text-emerald-700 border-emerald-200`       |
| Busy badge          | `bg-amber-100 text-amber-700 border-amber-200`             |
| Unavailable badge   | `bg-neutral-100 text-neutral-500 border-neutral-200`       |
| Send Inquiry button | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`  |
| Reply block         | `bg-emerald-50/60 border border-emerald-100 rounded-xl`    |

### Static Content

- Heading: `"Freelancers"`, sub: `"Discover approved freelancers and send them a direct inquiry."`
- Tab labels: `Browse Freelancers`, `My Inquiries`
- Filter pills: `All`, `Available`, `Busy`
- Search placeholder: `"Search by name or skill…"`
- Stats: `"X services"` (Briefcase icon), `"X completed"` (Star icon)
- Empty browse: `"No approved freelancers yet."` or `"No freelancers match your filters."`
- Empty inquiries: `"No inquiries sent yet."`
- Success toast: `"Inquiry sent successfully! The freelancer will be notified."`

### Inquiry Form Modal Fields

| Field   | Required | Placeholder                                                         |
| ------- | -------- | ------------------------------------------------------------------- |
| Subject | Yes      | `"e.g. Interested in your logo design service"`                     |
| Message | Yes      | `"Describe your project, timeline, and any specific requirements…"` |

### Freelancer Detail View (inline, no route change)

- Hero gradient card: avatar, name, availability badge, `[Send Inquiry]` button, bio, skill pills, stats (Services / Completed)
- Recent Work grid: `showcase_preview` images (aspect-video)
- Back link: `"← All Freelancers"`

### Inquiry Status Styles

| Status  | Colors  |
| ------- | ------- |
| pending | amber   |
| read    | blue    |
| replied | emerald |
| closed  | neutral |

---

## P7. Business Rewards

**Route:** `/personal/business`
**File:** `src/app/personal/business/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Header: [Gift icon] "Business Rewards"        │
│  "Discover WHOdini-registered businesses…"     │
│                                                │
│  [Discover | My Inquiries] underline tabs      │
│                                                │
│  DISCOVER TAB                                  │
│  Search input (max-w-sm)                       │
│  Card grid (1→2→3 cols)                        │
│    Cover image h-40 (banner or logo)           │
│    Category label (rose, uppercase, small)     │
│    Business name + logo thumbnail (w-14)       │
│    Description (line-clamp-2)                  │
│    Location (MapPin)                           │
│    Phone / Website                             │
│    [Inquire] (outline) + [Subscribe/Subscribed]│
│                                                │
│  MY INQUIRIES TAB                              │
│  Status filter: All/Pending/Read/Replied/Closed│
│  Accordion inquiry cards                       │
│    Subject, status badge, business name, date  │
│    Expand → message + business reply           │
└────────────────────────────────────────────────┘
```

### Design

| Element           | Value                                                     |
| ----------------- | --------------------------------------------------------- |
| Header icon       | Gift in `text-[#ff5f6d]`                                  |
| Tab (active)      | `border-[#ff5f6d] text-[#ff5f6d]` (border-b-2)            |
| Card              | `border border-neutral-200 rounded-xl bg-white shadow-sm` |
| Category label    | `text-xs text-[#ff5f6d] uppercase tracking-wide`          |
| Inquire button    | `border-[#ff5f6d] text-[#ff5f6d] hover:bg-pink-50`        |
| Subscribe button  | `bg-[#ff5f6d] text-white`                                 |
| Subscribed button | `bg-green-500 text-white` disabled                        |
| Skeleton loader   | 6× animated pulse cards                                   |

### Static Content

- Heading: `"Business Rewards"`, sub: `"Discover WHOdini-registered businesses and their reward programs"`
- Tabs: `Discover` (Gift icon), `My Inquiries` (MessageCircle icon)
- Search placeholder: `"Search"`
- Subscribe CTA: `"Subscribe"` (Bell icon) → `"Subscribed"` (Check icon) after click
- Inquire CTA: `"Inquire"` (Send icon)
- Empty: `"No businesses found."`
- Success toast: `"Inquiry sent successfully! The business will be notified."` (Send icon)

### Inline Business Detail View

Clicking a card pushes a URL via `history.pushState` and renders `<BusinessDetailClient>` in place.

---

## P8. Agencies

**Route:** `/personal/agencies`
**File:** `src/app/personal/agencies/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Header: "Agencies"                            │
│  "Discover approved agencies…"                 │
│                                                │
│  [Browse | My Inquiries] tab switcher          │
│                                                │
│  BROWSE TAB                                    │
│  Search input (by name, category, city)        │
│  Scope toggle: [All | Following <count>]       │
│  Card grid (1→2→3 cols)                        │
│    Banner h-28 + overlapping logo w-12         │
│    Name + category badge                       │
│    Description (line-clamp-2)                  │
│    Location (MapPin), services count,          │
│    website link                                │
│    [Follow/Following] + [Inquire] buttons      │
│  Pagination (when >50 results)                 │
│                                                │
│  MY INQUIRIES TAB                              │
│  Accordion list: agency name + status badge +  │
│  subject + sent date                           │
│  Expand → message + agency reply / waiting     │
└────────────────────────────────────────────────┘
```

### Design

| Element            | Value                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Card               | `rounded-2xl bg-white border border-white/20 shadow-sm`                                     |
| Banner placeholder | `bg-gradient-to-br from-[#ff5f6d]/20 to-[#ffc371]/20 h-28`                                  |
| Logo overlap       | `w-12 h-12 -bottom-5 left-4 ring-2 ring-white`                                              |
| Follow button      | `bg-[#ff5f6d] text-white rounded-xl` → `border-neutral-300 text-neutral-700` when following |
| Inquire button     | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white rounded-xl`                        |
| Success toast      | `bg-green-50 border-green-200 text-green-800`                                               |
| Reply block        | `bg-green-50 border border-green-200 rounded-xl`                                            |
| Waiting block      | `bg-neutral-50 border border-neutral-200 rounded-xl`                                        |

### Static Content

- Heading: `"Agencies"`, sub: `"Discover approved agencies and follow or inquire about ones you're interested in."`
- Tabs: `Browse`, `My Inquiries`
- Search placeholder: `"Search by name, category, or city..."`
- Scope toggle: `All` | `Following`
- Empty (all): `"No agencies found"` + `"Try adjusting your search."`
- Empty (following): `"No agencies followed yet"` + `"Follow agencies to see them here."`
- Empty inquiries: `"No inquiries yet"` + `[Browse agencies]` button
- Success toast: `"Inquiry sent! The agency will get back to you."`
- Waiting reply: `"Waiting for the agency to reply…"`
- Pagination: `"Showing X–Y of Z agencies"` + Prev/Next + page numbers

### Inquiry Status Styles

| Status  | Icon         | Colors  |
| ------- | ------------ | ------- |
| pending | Clock        | yellow  |
| read    | MailOpen     | blue    |
| replied | CheckCircle2 | green   |
| closed  | XCircle      | neutral |

---

## P9. Notifications

**Route:** `/personal/notification`
**File:** `src/app/personal/notification/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Heading: "Followed & Subscribed Notifications"│
│  "Only notifications from events and           │
│   businesses you follow or subscribe to…"      │
│                                                │
│  [Unread <N> | Read <N>] tab switcher          │
│                                                │
│  Notification cards (vertical list)            │
│    emoji icon (large) + brand name             │
│    Title (lg bold)                             │
│    Message text                                │
│    Type icon + type badge                      │
│    Timestamp / expiry info                     │
│    [View] button (pending only) + [🗑 Delete]  │
│    [Expired] disabled button (expired only)    │
└────────────────────────────────────────────────┘
```

### Design

| Element        | Value                                                     |
| -------------- | --------------------------------------------------------- |
| Card           | `border border-neutral-200 rounded-xl bg-white shadow-sm` |
| View button    | `bg-[#ff5f6d] text-white text-xs`                         |
| Delete button  | `variant="outline" size="sm"` with Trash2 icon            |
| Expired button | `variant="outline"` disabled                              |

### Static Content

- Heading: `"Followed & Subscribed Notifications"`
- Sub: `"Only notifications from events and businesses you follow or subscribe to are shown."`
- Tabs: `Unread`, `Read` (each with count badge)
- Empty state: `"No pending notifications"` / `"No expired notifications"`
- Timestamp format (pending): as received from API
- Expiry format: `"Expires in <X>"` / `"Expired <date>"`

### Notification Type → Icon Map

| Type         | Icon     | Color              |
| ------------ | -------- | ------------------ |
| promotion    | Gift     | `text-[#ff5f6d]`   |
| event        | Calendar | `text-blue-500`    |
| announcement | Bell     | `text-orange-500`  |
| (default)    | Bell     | `text-neutral-500` |

### States

- **Pending** — shows View + Delete; View opens detail overlay via `whodini:navigate` CustomEvent
- **Expired** — shows Delete + disabled Expired button
- **Delete** — optimistically removes from list

---

## P10. Activity / Transaction Log

**Route:** `/personal/activity`
**File:** `src/app/personal/activity/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  [Activity icon] "Transaction Log"             │
│                                                │
│  Stats (3-col grid)                            │
│  [Subscriptions] [Follows] [Involved]          │
│  each: count + "Logs" pill                     │
│                                                │
│  [Today | This Week | This Month] tabs         │
│  (each shows activity count)                   │
│                                                │
│  Timeline list                                 │
│  Each item: emoji icon + category badge +      │
│  timestamp pill + title + description          │
│  "Transaction log entry" tag + [🗑] delete     │
│                                                │
│  Empty: "No activities today/this week/…"      │
└────────────────────────────────────────────────┘
```

### Design

| Element                 | Value                                                         |
| ----------------------- | ------------------------------------------------------------- |
| Subscriptions stat card | `border-blue-100 bg-gradient-to-b from-blue-50/60`            |
| Follows stat card       | `border-green-100 bg-gradient-to-b from-green-50/60`          |
| Involved stat card      | `border-orange-100 bg-gradient-to-b from-orange-50/60`        |
| Activity card           | `border border-neutral-200/80 rounded-2xl bg-white shadow-sm` |
| Log tag                 | `bg-[#ff5f6d]/10 text-[#e04a58]`                              |
| Active tab              | `bg-white text-[#ff5f6d] shadow-sm`                           |

### Static Content

- Heading: `"Transaction Log"` (Activity icon)
- Stat labels: `Subscriptions`, `Follows`, `Involved`
- Stat pill: `"Logs"` (each)
- Tab labels: `Today`, `This Week`, `This Month`
- Log tag: `"Transaction log entry"`
- Empty: `"No activities today"` / `"No activities this week"` / `"No activities this month"`

### Activity Type → Icon Map

| Type         | Icon       | Color             |
| ------------ | ---------- | ----------------- |
| follow       | Gift       | `text-[#ff5f6d]`  |
| community    | Users      | `text-blue-500`   |
| event        | Calendar   | `text-green-500`  |
| subscription | Building2  | `text-purple-500` |
| involved     | TrendingUp | `text-orange-500` |
| reward       | Star       | `text-yellow-500` |
| achievement  | TrendingUp | `text-orange-500` |

---

## P11. My Accounts

**Route:** `/personal/accounts`
**File:** `src/app/personal/accounts/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  "My Accounts"                                 │
│  "View your active Whodini account types…"     │
│                                                │
│  Active accounts summary strip (gradient pills)│
│                                                │
│  Card grid (1→2→3 cols)                        │
│  Each account type card:                       │
│    Gradient icon tile + label + description    │
│    STATUS: Active (emerald ✓ + accountId)      │
│            Pending (amber clock)               │
│            None → [Open Account] button        │
│                                                │
│  Footer note about admin approval              │
│                                                │
│  Open Account Modal (on card click)            │
│    Gradient icon + "Open <Type> Account"       │
│    Approval banner (for non-personal types)    │
│    Read-only: Display Name, Email              │
│    Extra fields (business name, etc.)          │
│    Document upload accordion                   │
│    Cancel / Open Account buttons               │
└────────────────────────────────────────────────┘
```

### Design

| Element             | Value                                                 |
| ------------------- | ----------------------------------------------------- |
| Page bg             | `bg-gradient-to-br from-neutral-50 to-neutral-100/60` |
| Active pill strip   | gradient per type (see below)                         |
| Active card         | `border-neutral-200/80 bg-white/80`                   |
| Pending card        | `border-amber-200 bg-amber-50/60`                     |
| Open Account button | `variant="outline" border-neutral-200`                |
| Success toast       | `border-emerald-200 bg-emerald-50 text-emerald-800`   |

### Account Type Colors

| Type                     | Gradient                        |
| ------------------------ | ------------------------------- |
| Personal                 | `from-[#ff5f6d] to-[#ffc371]`   |
| Freelance                | `from-violet-500 to-purple-400` |
| Business / Brand         | `from-blue-500 to-sky-400`      |
| Community / Organization | `from-emerald-500 to-teal-400`  |
| Event Organizer          | `from-orange-500 to-amber-400`  |
| Agency                   | `from-rose-500 to-pink-400`     |

### Static Content

- Heading: `"My Accounts"`, sub: `"View your active Whodini account types or open new ones based on your needs."`
- Footer: `"Account types other than Personal require admin approval before they become active. Your Personal account is always active."`
- Open modal approval banner: `"Note: This account type requires admin approval before it becomes active. You can still submit the application now."`
- Modal submit: `"Open Account"` / `"Submitting…"`
- Success toast (pending type): `"<Type> account application submitted — pending admin approval."`
- Success toast (personal): `"Personal account is now active!"`

### Open Account Modal — Extra Fields per Type

| Type                 | Extra Fields                                    |
| -------------------- | ----------------------------------------------- |
| Business             | Business Name (required), Industry, Description |
| Community            | Community Name (required), Description          |
| Organizer            | Organizer Name (required)                       |
| Agency               | Agency Name (required)                          |
| Personal / Freelance | None                                            |

---

## P12. Subscriptions

**Route:** `/personal/subscription`
**File:** `src/app/personal/subscription/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Gradient header (full-width)                  │
│  [Crown icon] SUBSCRIPTIONS label              │
│  "My Subscriptions"                            │
│  "Manage your active business subscriptions…" │
│                                                │
│  Stat cards (overlapping header, -mt-10)       │
│  [Active <N>] [Alerts <N>]                     │
│                                                │
│  Search input                                  │
│                                                │
│  Subscription card grid (1→2 cols)             │
│    Top gradient stripe (h-1)                   │
│    Business logo (w-12) + name + verified ✓    │
│    Category + tier pill + status pill          │
│    Monthly price (Free or $X/month)            │
│    Benefits list (up to 3, +N more)            │
│    [Alerts On/Off] [View Details] [Leave]      │
└────────────────────────────────────────────────┘
```

### Design

| Element             | Value                                                      |
| ------------------- | ---------------------------------------------------------- |
| Header bg           | `bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]`            |
| Stat card           | `bg-white rounded-2xl shadow-sm border border-neutral-100` |
| Card top stripe     | `h-1 bg-gradient-to-r from-[#ff5f6d] to-[#ffc371]`         |
| Tier pill           | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`  |
| Active status       | `text-emerald-700 bg-emerald-50 border-emerald-200`        |
| Benefits icon       | Zap in `text-[#ffc371]`                                    |
| Alerts On button    | `bg-amber-50 border-amber-200 text-amber-700`              |
| Alerts Off button   | `bg-neutral-50 border-neutral-200 text-neutral-600`        |
| View Details button | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`  |
| Leave button        | `border-red-200 text-red-500 hover:bg-red-50`              |

### Static Content

- Header label: `"SUBSCRIPTIONS"` (Crown icon, uppercase small)
- Heading: `"My Subscriptions"`
- Sub: `"Manage your active business subscriptions and notifications"`
- Stat labels: `Active`, `Alerts`, `Active subscriptions`, `Notifications on`
- Search placeholder: `"Search subscriptions..."`
- Price: `"Free"` or `"$X"` + `"/month"`
- Benefits: up to 3 shown, `"+N more benefits"` if more
- Empty: `"No subscriptions found"` + `"Subscribe to businesses to see them here"`

---

## P13. Organizer Preview

**Route:** `/personal/organizers`
**File:** `src/app/personal/organizers/page.tsx`

A static wrapper that renders `<OrganizerPreviewClient>` inside a `<Suspense>` boundary. The client component reads the organizer ID from the `?id=` query parameter (avoids dynamic route issues in static export). Shows a full organizer profile with events, services, and contact details.

Loading state: centered `<Loader2>` spinner.

---

## P14. Games

**Route:** `/personal/games`
**File:** `src/app/personal/games/page.tsx`

### Layout

```
┌────────────────────────────────────────────────┐
│  Blurred skeleton (aria-hidden)                │
│    Header + 6 stat cards + challenges section  │
│    + 6 game cards                              │
│                                                │
│  Coming Soon overlay (absolute, inset-0)       │
│  ┌──────────────────────────────────────────┐  │
│  │  [Clock icon in gradient circle]         │  │
│  │  "Coming Soon"                           │  │
│  │  "Games & Challenges is currently        │  │
│  │   under development. Check back soon!"   │  │
│  │  [In Progress] pill badge                │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

### Design

| Element      | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| Skeleton bg  | `blur-sm pointer-events-none select-none`                              |
| Overlay      | `bg-white/60 backdrop-blur-[2px]`                                      |
| Clock circle | `bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] w-16 h-16 rounded-full` |
| Badge        | `bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20`            |

### Static Content

- Heading: `"Coming Soon"`
- Body: `"Games & Challenges is currently under development. Check back soon!"`
- Badge: `"In Progress"`

---

## Business Pages

**Shared Layout** (`src/app/business/layout.tsx`)

- `RequireSession` auth guard wraps all pages.
- `SideBar` on the left.
- Background: `bg-gray-50` (flat light grey — no gradient, unlike personal).
- Content area: `min-h-screen` with `p-4 sm:p-6` padding per page.

---

## B1. Business Overview (Products & Services)

**Route:** `/business/` → `/business/overview/`
**File:** `src/app/business/overview/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────┐
│  Header: "Products & Services"                   │
│  Subtitle: "Manage your business catalog"        │
├──────────────────────────────────────────────────┤
│  [Stat: Total Items] [Stat: Services] [Stat: Products] │  ← 3-col cards (desktop)
├──────────────────────────────────────────────────┤
│  Filter tabs: [All (n)] [Services (n)] [Products (n)] │
├──────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Product  │ │ Product  │ │ Product  │  …        │  ← grid cards
│  │ Card     │ │ Card     │ │ Card     │           │
│  └──────────┘ └──────────┘ └──────────┘          │
└──────────────────────────────────────────────────┘
```

### Design

| Element                 | Value                                                         |
| ----------------------- | ------------------------------------------------------------- |
| Background              | `bg-gray-50`                                                  |
| Stat card               | `bg-white border border-neutral-200 rounded-xl shadow-sm p-6` |
| Filter tab (active)     | `bg-white text-[#ff5f6d]`                                     |
| Filter tab (inactive)   | `text-neutral-600`                                            |
| Product card accent bar | top `h-1 bg-gradient-to-r from-[#ff5f6d] to-[#ffc371]`        |
| Price                   | `font-bold text-[#ff5f6d]`                                    |
| Flagship badge          | `bg-amber-100 text-amber-700 border-amber-200`                |

### Static Content

**Stat cards (desktop):**

- Total Items (ShoppingBag icon, `text-[#ff5f6d]`)
- Services (Briefcase icon, blue)
- Products (Package icon, green)

**Product card elements:**

- Gradient accent bar (top)
- Type pill (`service` / `product`, capitalized)
- Flagship badge (if flagged)
- Name (`font-bold text-neutral-900`)
- Description (2-line clamp)
- Price (`$X,XXX`)
- Category pill (outline)

### States

| State       | Behavior                                    |
| ----------- | ------------------------------------------- |
| Loading     | Skeleton pulse cards                        |
| Empty       | Empty state with icon + "No items found"    |
| Filter tabs | All / Services / Products, counts in parens |

### Navigation

- Filter tabs switch between all/services/products views

---

## B2. Brands

**Route:** `/business/brands/`
**File:** `src/app/business/brands/page.tsx` + `create.tsx` + `show.tsx` + `update.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  Header: "Brands"                [+ Create Brand]  │
│  Subtitle: "Parent categories for products/services"│
├────────────────────────────────────────────────────┤
│  [Total Brands] [Total Items] [Unassigned Items]   │  ← 3 stat cards (desktop)
├────────────────────────────────────────────────────┤
│  Card: "Listing of Brands"                         │
│  ┌────────────────────────────────────────────┐   │
│  │ [Layers icon] Brand Name   [N Items] [›]   │   │  ← accordion row
│  │   Category                 [Edit] [Delete] │   │
│  ├────────────────────────────────────────────┤   │
│  │ (expanded) Item list: tag, name, type, $   │   │
│  └────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

### Design

| Element                  | Value                                                        |
| ------------------------ | ------------------------------------------------------------ |
| Background               | `bg-gray-50`                                                 |
| Stat card — Total Brands | `bg-red-100 rounded-lg` icon, value `text-[#ff5f6d]`         |
| Stat card — Total Items  | `bg-blue-100 rounded-lg` icon, value blue                    |
| Stat card — Unassigned   | `bg-amber-100 rounded-lg` icon, value amber with AlertCircle |
| Accordion row border     | `border border-neutral-200 rounded-lg`                       |
| Expanded items bg        | `bg-neutral-50`                                              |
| Item price               | `text-[#ff5f6d] font-medium`                                 |
| Delete button            | `text-red-600 border-red-200`                                |
| Create button            | `bg-[#ff5f6d] text-white`                                    |

### Views (managed by `view` state)

| View     | Renders                                             |
| -------- | --------------------------------------------------- |
| `list`   | Accordion brand list                                |
| `create` | `CreateBrandForm` — centered card, max-w-lg         |
| `show`   | `ShowBrand` — max-w-2xl card with linked items list |
| `update` | `UpdateBrandForm` — centered card, max-w-lg         |

### Form Fields — Create / Update Brand

| Field          | Type       | Required | Placeholder        |
| -------------- | ---------- | -------- | ------------------ |
| Brand Name     | text input | yes      | "e.g. Starter Kit" |
| Classification | text input | no       | "e.g. Bundle"      |

### Show Brand

- Layers icon + brand name + category header
- Item count badge
- Linked Items list: tag icon, title, type pill, price in `text-[#ff5f6d]`
- "Update Brand" and "Back to List" buttons

### States

| State               | Behavior                                    |
| ------------------- | ------------------------------------------- |
| Loading brands      | 3 skeleton pulse rows                       |
| Empty               | "No brands yet. Create one to get started." |
| Accordion expanding | Fetches items via `getBrand(id)`            |
| Items loading       | 2 skeleton rows in accordion                |
| No items            | "No items linked to this brand."            |

### Navigation

- Create Brand → view: `create`
- Edit (pencil) → view: `show` → can go to `update`
- Delete → removes brand, returns to `list`

---

## B3. Services & Products Catalog

**Route:** `/business/services/`
**File:** `src/app/business/services/page.tsx` + `create.tsx` + `show.tsx` + `update.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  [Settings icon] "Service & Products Management"   │
│                            [+ Add Product/Service] │
├────────────────────────────────────────────────────┤
│  [Total Services] [Total Products] [Unassigned]    │  ← 3 stat cards (desktop)
├────────────────────────────────────────────────────┤
│  Tabs: [All] [Services] [Products]  (pill style)   │
├────────────────────────────────────────────────────┤
│  Search input + Brand dropdown filter              │
├────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ [image]  │ │ [image]  │ │ [image]  │            │  ← grid 1/2/3 cols
│  │ status   │ │ status   │ │ status   │            │
│  │ type     │ │ type     │ │ type     │            │
│  │ title    │ │ title    │ │ title    │            │
│  │ desc     │ │ desc     │ │ desc     │            │
│  │ $price / │ │ $price / │ │ $price / │            │
│  │ duration │ │ duration │ │ duration │            │
│  │ ★ rating │ │ ★ rating │ │ ★ rating │            │
│  │ features │ │ features │ │ features │            │
│  │ [Edit][View][Del]│ …  │ …         │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└────────────────────────────────────────────────────┘
```

### Design

| Element                 | Value                                                                           |
| ----------------------- | ------------------------------------------------------------------------------- |
| Background              | `bg-gray-50`                                                                    |
| Stat cards              | `bg-white border border-neutral-200 rounded-xl shadow-sm p-6`                   |
| Tab (active)            | `bg-white text-[#ff5f6d] shadow-sm`                                             |
| Tab (inactive)          | `text-neutral-600`                                                              |
| Card                    | `border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md`       |
| Image placeholder       | `h-40 bg-gradient-to-br from-neutral-100 to-neutral-200` with Gift/Package icon |
| Status badge — Featured | `bg-[#ff5f6d] text-white`                                                       |
| Status badge — Premium  | `bg-purple-500 text-white`                                                      |
| Status badge — Active   | `bg-green-500 text-white`                                                       |
| Price                   | `font-bold text-[#ff5f6d]`                                                      |
| Star rating             | `text-yellow-500 fill-current`                                                  |
| Edit button             | outline, `flex-1`                                                               |
| View button             | `bg-[#ff5f6d]/90`, `flex-1`                                                     |
| Delete button           | `text-red-600 border-red-300`                                                   |

### Form Fields — Create / Update Item (Dialog)

| Field       | Type        | Required | Notes                       |
| ----------- | ----------- | -------- | --------------------------- |
| Title       | text input  | yes      |                             |
| Type        | select      | yes      | product / service           |
| Brand       | select      | no       | Populated from brands list  |
| Category    | text/select | no       |                             |
| Description | textarea    | no       |                             |
| Image URL   | text input  | no       |                             |
| Price       | number      | yes      |                             |
| Duration    | text input  | no       | e.g. "month", "session"     |
| Status      | select      | no       | active / featured / premium |
| Features    | tag input   | no       | comma-separated             |

### Show Item (Dialog)

- Full-size image or placeholder
- All fields displayed read-only
- Features as badge pills
- Edit / Close buttons

### States

| State              | Behavior                      |
| ------------------ | ----------------------------- |
| Loading            | Skeleton grid                 |
| Empty (all)        | "No items yet" empty state    |
| Empty (filtered)   | "No results"                  |
| Create Dialog open | Sheet/dialog with create form |
| Edit Dialog open   | Sheet/dialog pre-filled       |
| Show Dialog open   | Read-only detail view         |

---

## B4. Business Events

**Route:** `/business/events/`
**File:** `src/app/business/events/page.tsx` + `create.tsx` + `show.tsx` + `update.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  "Business Events"              [+ Create Event]   │
│  Subtitle: "Manage events for <brandName>"         │
├────────────────────────────────────────────────────┤
│  Filter: [All (n)] [Upcoming (n)] [Past (n)]       │
│  Search input (right-aligned)                      │
├────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Title    │ │ Title    │ │ Title    │            │
│  │ Desc     │ │ Desc     │ │ Desc     │            │
│  │ [Paid $] │ │ [Paid $] │ │ [Paid $] │            │
│  │ [Advert] │ │ [Advert] │ │ [Advert] │            │
│  │ Date     │ │ Date     │ │ Date     │            │
│  │ Location │ │ Location │ │ Location │            │
│  │ Category │ │ Category │ │ Category │            │
│  │ Status   │ │ Status   │ │ Status   │            │
│  │ Capacity │ │ Capacity │ │ Capacity │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└────────────────────────────────────────────────────┘
```

### Design

| Element              | Value                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------- |
| Background           | `bg-gradient-to-br from-neutral-50 to-neutral-100`                                       |
| Card                 | `border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md cursor-pointer` |
| Filter (active)      | `bg-[#ff5f6d] text-white`                                                                |
| Filter (inactive)    | `border-neutral-300 text-neutral-700`                                                    |
| Payment badge — paid | `bg-[#ff5f6d]` (price)                                                                   |
| Payment badge — free | secondary                                                                                |
| Advertising badge    | `bg-amber-100 text-amber-700 border-amber-200`                                           |
| Status — upcoming    | `text-green-700 border-green-200 bg-green-50`                                            |
| Status — past        | `text-neutral-500 border-neutral-200`                                                    |
| Capacity bar         | `bg-neutral-100 rounded-full h-1.5` with `bg-[#ff5f6d]` fill                             |

### Create / Update Event Form Fields

| Field          | Type           | Required    | Notes                        |
| -------------- | -------------- | ----------- | ---------------------------- |
| Title          | text input     | yes         |                              |
| Description    | textarea       | yes         |                              |
| Starts At      | datetime-local | yes         |                              |
| Ends At        | datetime-local | no          |                              |
| Location Type  | select         | yes         | in_person / virtual / hybrid |
| Location Label | text input     | no          | address or meeting link      |
| Payment Type   | select         | yes         | free / paid                  |
| Price          | number         | conditional | visible if paid              |
| Capacity       | number         | no          | 0 = unlimited                |
| Category       | text input     | no          |                              |

### Show Event

- Full event detail
- Advertised toggle (advertise / stop advertising)
- Edit / Delete buttons
- Back to list

### States

| State                  | Behavior                                                 |
| ---------------------- | -------------------------------------------------------- |
| Empty (no events)      | Calendar icon + "No Events Yet" + Create First Event CTA |
| Empty (filtered)       | "No Events Found" — adjust filter/search                 |
| Loading                | "Loading events" text                                    |
| List view              | 3-col responsive grid                                    |
| Create / Show / Update | Full-page view swap                                      |

### Navigation

- Click card → `show` view
- Create Event → `create` view
- Edit (in show) → `update` view
- Delete → returns to `list`

---

## B5. Subscribers

**Route:** `/business/subscribers/`
**File:** `src/app/business/subscribers/page.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  [Users icon] "Subscriber Management"              │
│  Subtitle: "Monitor your subscribers..."           │
├────────────────────────────────────────────────────┤
│  [Search input]                                    │
├────────────────────────────────────────────────────┤
│  (Contact form — shown when emailing a subscriber) │
├────────────────────────────────────────────────────┤
│  Card: "Subscribers"           [N total]           │
│  ┌──────────────────────────────────────────────┐ │
│  │ [Avatar] Name · Email · Digital ID           │ │  ← subscriber row
│  │          Subscribed [Date]                   │ │
│  │                      [Tier] [Status] [Remove]│ │
│  └──────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│  Pagination: [‹] [1] [2] [3] [›]                  │
└────────────────────────────────────────────────────┘
```

### Design

| Element            | Value                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Background         | `bg-gray-50`                                                                                                      |
| Avatar             | `w-10 h-10 rounded-full bg-gradient-to-br from-[#ff5f6d]/20 to-[#ffc371]/20` — initial letter in `text-[#ff5f6d]` |
| Tier — Premium     | `bg-[#ff5f6d] text-white`                                                                                         |
| Tier — Standard    | `bg-blue-100 text-blue-700`                                                                                       |
| Status — active    | `bg-green-100 text-green-700`                                                                                     |
| Status — cancelled | `bg-neutral-100 text-neutral-500`                                                                                 |
| Remove button      | `border-red-200 text-red-600 hover:bg-red-50 rounded-xl`                                                          |
| Pagination active  | `bg-[#ff5f6d] text-white`                                                                                         |

### Subscriber Row Fields

| Field           | Display                                |
| --------------- | -------------------------------------- |
| Name            | `font-semibold text-neutral-900`       |
| Email           | `text-xs text-neutral-500`             |
| Digital ID      | `text-neutral-400` (appended to email) |
| Subscribed date | "Subscribed Mon Day, Year"             |
| Tier badge      | Premium / Standard / default           |
| Status badge    | active / cancelled (capitalized)       |

### States

| State                      | Behavior                                       |
| -------------------------- | ---------------------------------------------- |
| Loading                    | "Loading…" centered text                       |
| Error                      | Error message centered                         |
| Empty                      | Users icon + "No subscribers found"            |
| Search active + no results | "Try a different search term."                 |
| Contact form open          | Inline form appears above list (scrolls to it) |

### Navigation

- Search debounced 400ms, resets to page 1
- Pagination: page size 20, ±2 delta page buttons shown
- Remove → `removeSubscriber(id)` mutation

---

## B6. Inquiries

**Route:** `/business/inquiries/`
**File:** `src/app/business/inquiries/page.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  "Inquiries" [N pending badge]                     │
│  Subtitle: "Messages from personal users..."       │
├────────────────────────────────────────────────────┤
│  Filter tabs: [All] [Pending] [Read] [Replied] [Closed] │
├────────────────────────────────────────────────────┤
│  (success banner — "Reply sent!" on success)       │
├────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────┐   │
│  │ [MessageCircle] Subject    [status badge]  │   │  ← inquiry card (collapsed)
│  │   Sender · Date                            │   │
│  │   message preview (1 line)           [›]   │   │
│  └────────────────────────────────────────────┘   │
│  (expanded: full message, reply text, actions)     │
└────────────────────────────────────────────────────┘
```

### Design

| Element                | Value                                                                |
| ---------------------- | -------------------------------------------------------------------- |
| Background             | `p-4 sm:p-6 lg:p-8` (no full-page bg override)                       |
| Pending badge (header) | gradient pill `from-[#ff5f6d] to-[#ffc371]`                          |
| Card — pending         | `border-amber-200 ring-1 ring-amber-100`                             |
| Card — others          | `border-neutral-200/80`                                              |
| Status — pending       | `bg-amber-100 text-amber-700 border-amber-200`                       |
| Status — read          | `bg-blue-100 text-blue-700 border-blue-200`                          |
| Status — replied       | `bg-emerald-100 text-emerald-700 border-emerald-200`                 |
| Status — closed        | `bg-neutral-100 text-neutral-500 border-neutral-200`                 |
| Reply button           | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white rounded-xl` |
| Filter tab (active)    | `bg-white text-[#ff5f6d] shadow-sm`                                  |
| Success banner         | `bg-emerald-50 border-emerald-200 text-emerald-700`                  |

### Inquiry Card Expanded

- Full message (whitespace-pre-wrap)
- Reply block (if exists): emerald bg, "Your Reply — [date]"
- Actions (if not closed):
  - Pending/read: **Reply** button
  - Replied: **Send Another Reply** button
  - **Close Inquiry** button

### Reply Modal

| Field          | Type     | Notes                       |
| -------------- | -------- | --------------------------- |
| Reply textarea | textarea | Required, 5-row             |
| Cancel         | button   |                             |
| Send Reply     | button   | Gradient, disabled if empty |

- Modal: `fixed inset-0 z-50`, glass card `bg-white/90 backdrop-blur-xl rounded-3xl`
- Shows original subject + message preview before the textarea

### States

| State            | Behavior                                            |
| ---------------- | --------------------------------------------------- |
| Loading          | Spinner centered                                    |
| Error            | "Failed to load inquiries"                          |
| Empty (all)      | Inbox icon + "No inquiries yet"                     |
| Empty (filtered) | "No [status] inquiries" + "Try a different filter." |
| Pending opened   | Auto-marks as `read` on expand                      |
| Reply success    | Inline `successMsg` banner, 3.5s auto-clear         |

### Navigation

- Filter tabs: All / Pending / Read / Replied / Closed
- Each tab count badge shown in `text-[10px] bg-[#ff5f6d]/10 text-[#ff5f6d]`

---

## B7. Business Notifications

**Route:** `/business/notifications/`
**File:** `src/app/business/notifications/page.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  [Bell icon] "Notification Center"                 │
│  Subtitle: "Create and send notifications..."      │
├────────────────────────────────────────────────────┤
│  Stats: [Total Sent] [Delivered] [Open Rate] [Click Rate] │  ← 4 cards (desktop)
├────────────────────────────────────────────────────┤
│  Card: "Create New Notification"                   │
│  ┌──────────────────────────────────────────────┐ │
│  │  Mail Blast: [Marketing Blast] [Promo Blast] │ │
│  │  Title * ────────────────────────────────    │ │
│  │  Message * ──────────────────────────────    │ │  ← textarea 4 rows
│  │  [Notification Type] [Target Audience]        │ │
│  │  [Schedule Time (opt)] [Action URL (opt)]     │ │
│  │  [Preview toggle] [Save Draft] [Send Now]     │ │
│  └──────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│  Card: "Notification History"                      │
│  [Search] [Type filter]                            │
│  ┌──────────────────────────────────────────────┐ │
│  │ Title · Message                              │ │
│  │ Sent: [date]  [audience] [type]              │ │
│  │ Delivered: N  Opened: N (%)  Clicked: N (%)  │ │
│  │                                    [Delete]  │ │
│  └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

### Design

| Element                    | Value                                                         |
| -------------------------- | ------------------------------------------------------------- |
| Background                 | `bg-gray-50`                                                  |
| Stat card                  | `bg-white border border-neutral-200 rounded-xl shadow-sm p-6` |
| Total Sent icon            | `text-[#ff5f6d]` (Send)                                       |
| Delivered icon             | green (CheckCircle)                                           |
| Open Rate icon             | blue (Eye)                                                    |
| Click Rate icon            | purple (Target)                                               |
| Blast button (active)      | `bg-[#ff5f6d] text-white border-[#ff5f6d] rounded-xl`         |
| Blast button (inactive)    | `border border-neutral-300 text-neutral-700 rounded-xl`       |
| Type — promotional         | `bg-[#ff5f6d] text-white` badge                               |
| Type — informational       | `bg-blue-100 text-blue-700`                                   |
| Type — urgent              | `bg-red-100 text-red-700`                                     |
| Type — event               | `bg-purple-100 text-purple-700`                               |
| Audience — premium_only    | `bg-amber-100 text-amber-700`                                 |
| Audience — new_subscribers | `bg-green-100 text-green-700`                                 |
| Send button                | `bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-xl`    |
| Delete button              | `border-red-200 text-red-600 hover:bg-red-50 rounded-xl`      |

### Form Fields — Create Notification

| Field             | Type              | Required | Notes                                        |
| ----------------- | ----------------- | -------- | -------------------------------------------- |
| Mail Blast        | button group      | no       | Marketing / Promo presets                    |
| Title             | text input        | yes      |                                              |
| Message           | textarea (4 rows) | yes      |                                              |
| Notification Type | select            | no       | informational / promotional / urgent / event |
| Target Audience   | select            | no       | all_subscribers / new_subscribers            |
| Schedule Time     | datetime-local    | no       | if set: "Schedule Notification"              |
| Action URL        | text input        | no       |                                              |

### Preview

- Toggle button shows/hides preview panel
- Preview card: type icon colored circle, title, message, "Just now"

### Stats (computed from history)

- Total Sent: count of notifications
- Delivered: sum `delivered`
- Open Rate: avg `(opened/delivered)*100` %
- Click Rate: avg `(clicked/delivered)*100` %

### States

| State           | Behavior                                                    |
| --------------- | ----------------------------------------------------------- |
| Blast active    | Badge shown "Marketing/Promo Blast Active"; form pre-filled |
| Schedule set    | Submit button text = "Schedule Notification"                |
| Preview visible | Preview card shown below form                               |
| History empty   | No cards in history section                                 |

---

## B8. History

**Route:** `/business/history/`
**File:** `src/app/business/history/page.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  "Business History"                                │
│  Subtitle: "Track all business activities..."      │
├────────────────────────────────────────────────────┤
│  Stats: [Total Events] [Today] [This Week] [Month] │  ← 4 cards (desktop)
├────────────────────────────────────────────────────┤
│  Card: "Filter Events"                             │
│  [Search] [Event Type select] [Importance] [Date]  │
├────────────────────────────────────────────────────┤
│  Card: "Activity Timeline"  [N event(s) found]     │
│  ┌─────────────────────────────────────────────┐  │
│  │ [Icon circle]─────────────────────────────  │  │  ← timeline line
│  │              Title   [type badge] [imp badge]│  │
│  │              Description                    │  │
│  │              [clock] timestamp [users] actor│  │
│  │              Metadata key-value grid        │  │
│  └─────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Design

| Element                 | Value                                                                      |
| ----------------------- | -------------------------------------------------------------------------- |
| Background              | `bg-gray-50`                                                               |
| Stat cards              | shadcn `<Card>` default styling                                            |
| Total Events icon       | `text-[#ff5f6d]` (Activity)                                                |
| Today icon              | blue (Clock)                                                               |
| This Week icon          | indigo (Calendar)                                                          |
| This Month icon         | emerald (TrendingUp)                                                       |
| Timeline icon circle    | `w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-gray-200 rounded-full` |
| Timeline connector line | `w-px bg-gray-200`                                                         |
| Event item card         | `bg-white border rounded-lg p-4 hover:shadow-md`                           |
| Importance — High       | `Badge variant="destructive"`                                              |
| Importance — Medium     | `Badge variant="outline"`                                                  |
| Importance — Low        | `Badge variant="secondary"`                                                |

### Event Types

| Type                | Icon         | Color  |
| ------------------- | ------------ | ------ |
| subscriber_added    | UserPlus     | green  |
| subscriber_removed  | UserMinus    | red    |
| notification_sent   | Bell         | blue   |
| sale_completed      | ShoppingCart | green  |
| team_member_added   | UserPlus     | blue   |
| team_member_removed | UserMinus    | red    |
| settings_changed    | Settings     | gray   |
| content_updated     | FileText     | orange |
| review_received     | Star         | yellow |
| milestone_reached   | TrendingUp   | purple |

### Filter Fields

| Filter     | Type       | Options                                   |
| ---------- | ---------- | ----------------------------------------- |
| Search     | text input | Searches title/description                |
| Event Type | select     | All / specific types                      |
| Importance | select     | All / High / Medium / Low                 |
| Date       | select     | All Time / Today / This Week / This Month |

### States

| State          | Behavior                                                         |
| -------------- | ---------------------------------------------------------------- |
| Loading        | Spinner (via React Query)                                        |
| Empty          | Activity icon + "No events found" + "Try adjusting your filters" |
| Events present | Vertical timeline with connector lines                           |

---

## B9. Workspace

**Route:** `/business/workspace/`
**File:** `src/app/business/workspace/page.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  [FolderOpen] "Document Workspaces"  [New Workspace] │
│  Subtitle: "N workspaces · Select to manage..."    │
├────────────────────────────────────────────────────┤
│  Tabs: [Columns3 My Workspaces] [Bell Invitations N?] │
├────────────────────────────────────────────────────┤
│  Workspaces tab:                                    │
│  Table: Workspace | Tickets | Collaborators | Last Activity | [Open] │
│  ┌────────────────────────────────────────────┐   │
│  │ [icon] Name  [category pill]               │   │
│  │        description                         │   │
│  │        ticket counts · N collaborators     │   │
│  │        last activity                [Open] │   │
│  └────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────┤
│  Invitations tab:                                   │
│  ┌────────────────────────────────────────────┐   │
│  │ [initials] Business name  [industry]       │   │
│  │            Invited to workspace [category] │   │
│  │            Role · Access · [time]          │   │
│  │            "message"        [Accept][Decline]│  │
│  └────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

### Design

| Element               | Value                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| Background            | `bg-gray-50`                                                                                       |
| Header bar            | `bg-white border-b px-6 py-4`                                                                      |
| FolderOpen icon bg    | `bg-indigo-100 rounded-xl`                                                                         |
| New Workspace button  | `bg-indigo-600 hover:bg-indigo-700 text-white`                                                     |
| Tab (active)          | `border-indigo-600 text-indigo-600`                                                                |
| Tab (inactive)        | `text-gray-500`                                                                                    |
| Table bg              | `bg-white rounded-xl border border-gray-200 shadow-sm`                                             |
| Category colors       | General=indigo, Legal=purple, Finance=amber, Marketing=pink, HR=blue, Operations=teal, Design=rose |
| Ticket status dots    | colored `w-2 h-2 rounded-full` per status                                                          |
| Open button           | `bg-indigo-600 hover:bg-indigo-700 text-white`                                                     |
| Invitation — initials | colored square (per business color)                                                                |
| Accept button         | `bg-emerald-600 hover:bg-emerald-700 text-white`                                                   |
| Decline button        | outline + `hover:text-rose-600 hover:border-rose-300`                                              |
| Declined invitation   | `opacity-50`                                                                                       |

### New Workspace Modal

| Field       | Type              | Required | Notes                                                            |
| ----------- | ----------------- | -------- | ---------------------------------------------------------------- |
| Name        | text input        | yes      | e.g. "Q3 Contracts"                                              |
| Description | textarea (3 rows) | no       |                                                                  |
| Category    | select            | no       | General / Legal / Finance / Marketing / HR / Operations / Design |

### Workspace Board (clicking Open)

- Renders `WorkspaceBoardClient` inline (replaces list view)
- URL updated to `/business/workspace/[id]` via `history.pushState`
- Contains: ticket board (Kanban columns), collaborator panel, ticket detail modal
- Closing restores URL to `/business/workspace`

### Invitation Row Fields

| Field                      | Display                                      |
| -------------------------- | -------------------------------------------- |
| Business initials          | colored square avatar                        |
| Business name + digital ID | header                                       |
| Industry pill              | `bg-gray-100 text-gray-500`                  |
| Workspace name             | bold                                         |
| Category pill              | workspace-specific color                     |
| Role                       | Shield icon + role text                      |
| Access                     | FileText icon + "All tickets" or "N tickets" |
| Invited at                 | Clock icon                                   |
| Optional message           | italic, `bg-gray-50` box                     |

### States

| State              | Behavior                                                    |
| ------------------ | ----------------------------------------------------------- |
| Loading workspaces | Spinner row in table                                        |
| Empty workspaces   | FolderOpen icon + "No workspaces yet"                       |
| No invitations     | MailOpen icon + "No pending invitations"                    |
| Accept invitation  | Optimistic update → accepted pill; refreshes workspace list |
| Decline invitation | Optimistic → `opacity-50` declined row                      |
| Board open         | Full `WorkspaceBoardClient` replaces page content           |

---

## B10. Team

**Route:** `/business/team/`
**File:** `src/app/business/team/page.tsx`

### Layout

```
┌─────────────────────────────────────────────────────┐
│  (blurred skeleton — 4 stat cards + header)         │
│  ─────────────────────────────────────────────────  │
│  [center overlay]                                   │
│  ┌──────────────────────────────────────────────┐  │
│  │  [Clock circle gradient icon]                │  │
│  │  "Coming Soon"  (or "Team")                  │  │
│  │  Status message from API                     │  │
│  │  [In Progress] badge                         │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Design

| Element           | Value                                                                  |
| ----------------- | ---------------------------------------------------------------------- |
| Skeleton bg       | `blur-sm pointer-events-none select-none`                              |
| Overlay           | `bg-white/60 backdrop-blur-[2px]`                                      |
| Clock icon circle | `bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] w-16 h-16 rounded-full` |
| Badge             | `bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20`            |

### Static Content

- Heading: `"Coming Soon"` (if API returns `status: 'coming_soon'`)
- Body: `"Team management is currently under development. Check back soon!"`
- Badge: `"In Progress"`

---

## B11. Settings

**Route:** `/business/settings/`
**File:** `src/app/business/settings/page.tsx` + `business-settings/` tabs

### Layout

```
┌────────────────────────────────────────────────────┐
│  "Business Settings"                               │
│  Subtitle: "Configure your business preferences..." │
├────────────────────────────────────────────────────┤
│  Tab bar: [General] [Business Documents] [Subscription] [API & Integrations] │
├────────────────────────────────────────────────────┤
│  (tab content panel)                               │
└────────────────────────────────────────────────────┘
```

### Design

| Element        | Value                                                |
| -------------- | ---------------------------------------------------- |
| Background     | `bg-gray-50`                                         |
| Tab bar        | `grid grid-cols-2 lg:flex bg-gray-50 rounded-t-lg`   |
| Tab (active)   | `border-b-2 border-blue-500 text-blue-600 bg-white`  |
| Tab (inactive) | `border-transparent text-gray-600 hover:bg-gray-100` |

### Tabs

#### General Tab (`GeneralSettingsTab.tsx`)

Two modes: **View** and **Edit** (toggled by "Edit Profile" button).

**View mode cards:**

1. Business Banner & Logo — banner image (h-350px) + logo (w-16 h-16) + business name
2. Basic Information — name, description, category
3. Contact Information — address, city, state, ZIP, country, phone, email
4. Online Presence — website, Facebook, Instagram, YouTube, LinkedIn, TikTok, X(Twitter)

**Edit mode form fields:**

| Section    | Fields                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| Banner     | Upload banner (drag/click), remove button; PNG/JPG ≤5MB, rec 1200×400px   |
| Logo       | Upload logo (96×96 preview), remove button; PNG/JPG ≤5MB, rec 512×512px   |
| Basic Info | Business Name \*, Description (textarea), Category                        |
| Contact    | Street Address, City, State/Province, ZIP, Country, Phone, Business Email |
| Online     | Website, Facebook, Instagram, YouTube, LinkedIn, TikTok, X/Twitter        |

Submit: "Save Changes" (Save icon). Cancel restores previous values.

#### Business Documents Tab (`PrivacySettingsTab.tsx`)

- Document upload / management for business verification documents.

#### Subscription Tab (`SubscriptionSettingsTab.tsx`)

- Plan name, plan type, auto-renew toggle; save via `updateSubscriptionSettings`.

#### API & Integrations Tab (`ApiSettingsTab.tsx`)

- API key display + "Regenerate Key" button
- Webhook URL input
- Rate limit enabled toggle
- API logging toggle
- Save via `updateApiSettings`

### States

| State                 | Behavior                                     |
| --------------------- | -------------------------------------------- |
| Loading               | 4 skeleton pulse cards in General tab        |
| View mode             | Read-only display with Edit Profile button   |
| Edit mode             | Full form with Save/Cancel                   |
| Logo/Banner uploading | Local preview shown + file name + dimensions |
| Remove logo/banner    | Warning text "will be removed on save"       |
| Save success          | `invalidateQueries(['business', 'profile'])` |
| Save error            | Red error text below form                    |

---

## B12. Setup

**Route:** `/business/setup/`
**File:** `src/app/business/setup/page.tsx`

### Layout

```
┌────────────────────────────────────────────────────┐
│  "Business Setup"                                  │
│  Subtitle: "Configure your business profile..."    │
├────────────────────────────────────────────────────┤
│  Card: Business Logo                               │
│  [Logo preview 100×100] [Upload Logo]              │
├────────────────────────────────────────────────────┤
│  Card: Basic Information                           │
│  Business Name * / Description / Category          │
├────────────────────────────────────────────────────┤
│  Card: Contact Information                         │
│  Address / City / State / ZIP / Country / Phone / Email │
├────────────────────────────────────────────────────┤
│  Card: Online Presence                             │
│  Website + [Facebook / Instagram / Twitter /       │
│  LinkedIn / TikTok]                                │
├────────────────────────────────────────────────────┤
│              [Cancel]  [Save Business Profile]     │
└────────────────────────────────────────────────────┘
```

### Design

| Element          | Value                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| Background       | `bg-gray-50`                                                                                      |
| Cards            | shadcn `<Card>` with border, rounded-xl, white, shadow-sm                                         |
| Logo placeholder | `w-24 h-24 bg-neutral-100 rounded-xl border border-dashed border-neutral-300` with Building2 icon |
| Upload button    | outline, PNG/JPG ≤5MB hint                                                                        |
| Submit button    | default style (shadcn), `Save icon mr-2`                                                          |
| Cancel button    | outline                                                                                           |

### Form Fields

| Section    | Fields                                                  | Required |
| ---------- | ------------------------------------------------------- | -------- |
| Logo       | file input (image/\*)                                   | no       |
| Basic Info | Business Name                                           | yes      |
| Basic Info | Description (textarea 3 rows)                           | no       |
| Basic Info | Category                                                | no       |
| Contact    | Street Address, City, State, ZIP, Country               | no       |
| Contact    | Phone, Business Email                                   | no       |
| Online     | Website, Facebook, Instagram, Twitter, LinkedIn, TikTok | no       |

### Notes

- This is a standalone setup/onboarding page (demo mode — `alert()` on submit).
- Does not have the banner upload or YouTube/X fields that `GeneralSettingsTab` has.
- Used during initial business account setup flow.

---

## Freelance Pages

**Shared layout** (`src/app/freelance/layout.tsx`)

- `RequireSession` auth guard
- `SideBar` component (same as other roles)
- Page area: `bg-gray-50 min-h-screen pt-16 xl:pt-0 xl:ml-18`
- Note: uses `xl:ml-18` (slightly narrower sidebar offset than business's `xl:ml-64`)

---

## F1. Freelance Dashboard

**Route:** `/freelance`
**File:** `src/app/freelance/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: gradient from-[#ff5f6d]/8 via-neutral-50    │
│             to-[#ffc371]/8 (very subtle tint)            │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Header                                            │  │
│  │  "Freelance Dashboard"  [display_name]             │  │
│  │  ● Available / Busy / Unavailable  (dot badge)     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ── Mobile metrics row (flex, gap-3) ──                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Clients  │ │ Services │ │ Earnings │ │ Upcoming │   │
│  │  (sm)   │ │  (sm)   │ │  (sm)   │ │  (sm)   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                          │
│  ── Desktop metric cards (4-col grid) ──                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  Total   │ │ Active   │ │  Total   │ │ Upcoming │   │
│  │ Clients  │ │Services  │ │Earnings  │ │Milestones│   │
│  │ (#ff5f6d)│ │(#ffc371) │ │(emerald) │ │ (blue)   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                          │
│  ── Lower grid (5-col) ──────────────────────────────   │
│  ┌──────────────────────────┐  ┌───────────────────┐    │
│  │  Recent Activity (3-col) │  │ Upcoming          │    │
│  │  divide-y list:          │  │ Milestones (2-col)│    │
│  │  service_type + client   │  │ type badge + date │    │
│  │  + date + value (emerald)│  │                   │    │
│  └──────────────────────────┘  └───────────────────┘    │
│                                                          │
│  ── Quick Links (3-col grid) ────────────────────────   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐           │
│  │ Manage     │ │ Client CRM │ │ Public     │           │
│  │ Services   │ │            │ │ Portfolio  │           │
│  └────────────┘ └────────────┘ └────────────┘           │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element                   | Value                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| Page background           | `bg-gradient-to-br from-[#ff5f6d]/8 via-neutral-50 to-[#ffc371]/8`                        |
| Metric cards (desktop)    | `backdrop-blur-sm bg-gradient-to-br ... border border-white/60 rounded-2xl shadow-md p-5` |
| Total Clients value       | `text-[#ff5f6d]`                                                                          |
| Active Services value     | `text-[#ffc371]`                                                                          |
| Total Earnings value      | `text-emerald-600`                                                                        |
| Upcoming Milestones value | `text-blue-600`                                                                           |
| Section cards             | `bg-white/80 backdrop-blur-sm border border-neutral-200/80 rounded-2xl shadow-sm`         |
| Quick Link cards          | `rounded-2xl border p-4 hover:border-[#ff5f6d]/30 hover:shadow-md transition-all`         |
| Availability dot          | emerald=available, amber=busy, red=unavailable                                            |

### Static Content

| Section    | Label               | Icon       |
| ---------- | ------------------- | ---------- |
| Metric     | Total Clients       | Users      |
| Metric     | Active Services     | Briefcase  |
| Metric     | Total Earnings      | DollarSign |
| Metric     | Upcoming Milestones | Calendar   |
| Quick Link | Manage Services     | Briefcase  |
| Quick Link | Client CRM          | Users      |
| Quick Link | Public Portfolio    | Globe      |

### States

| State                     | Behaviour                                        |
| ------------------------- | ------------------------------------------------ |
| Loading                   | `Loader2` spinner centered                       |
| Error                     | `AlertCircle` + "Failed to load dashboard data." |
| Empty Recent Activity     | "No recent activity." text                       |
| Empty Upcoming Milestones | "No upcoming milestones." text                   |

### Navigation

| Action                      | Destination            |
| --------------------------- | ---------------------- |
| Manage Services quick link  | `/freelance/services`  |
| Client CRM quick link       | `/freelance/clients`   |
| Public Portfolio quick link | `/freelance/portfolio` |

---

## F2. Service Catalog

**Route:** `/freelance/services`
**File:** `src/app/freelance/services/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: subtle tinted gradient                      │
│                                                          │
│  Header: "Service Catalog"  [+ New Service] button       │
│                                                          │
│  ── Filter pills (flex-wrap) ─────────────────────────   │
│  [All (N)] [Active (N)] [Paused (N)] [Archived (N)]      │
│                                                          │
│  ── Accordion service list ──────────────────────────    │
│  ┌────────────────────────────────────────────────────┐  │
│  │ ▶ Service Title          [Active]  $XX  + N add-ons│  │
│  │   Category: Tag icon  pricing-model summary        │  │
│  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ (expanded) ─ ─ ─ ─ ─ ─ ─ │  │
│  │   Description text                                 │  │
│  │   Pricing breakdown (tiers or fixed/hourly)        │  │
│  │   Add-ons list                                     │  │
│  │   [Edit]  [Delete]  (text links, right)            │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Empty: dashed border placeholder, "No services found."  │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element                | Value                                                                   |
| ---------------------- | ----------------------------------------------------------------------- |
| Page background        | subtle tinted gradient                                                  |
| Filter pill (active)   | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`               |
| Filter pill (inactive) | `bg-white border border-neutral-200 text-neutral-600`                   |
| Accordion row          | `bg-white/80 backdrop-blur-sm border border-neutral-200/80 rounded-2xl` |
| Expanded panel bg      | `bg-neutral-50/60`                                                      |
| Status badge: active   | `bg-emerald-50 text-emerald-700 border-emerald-200`                     |
| Status badge: paused   | `bg-amber-50 text-amber-700 border-amber-200`                           |
| Status badge: archived | `bg-neutral-100 text-neutral-500 border-neutral-200`                    |
| New Service button     | gradient bg (`from-[#ff5f6d] to-[#ffc371]`) white text                  |

### Service Form Modal

**Trigger:** "+ New Service" or "Edit" link
**Modal:** `max-w-2xl`, `max-h-[90vh] overflow-y-auto`, glass card

| Section        | Fields                                                                      | Required |
| -------------- | --------------------------------------------------------------------------- | -------- |
| Basic          | Title                                                                       | yes      |
| Basic          | Category (select)                                                           | yes      |
| Basic          | Description (textarea, 5 rows)                                              | no       |
| Pricing Model  | toggle: Fixed / Hourly / Tiered                                             | yes      |
| Fixed pricing  | Base Price ($) with DollarSign icon                                         | yes      |
| Hourly pricing | Rate + Min Hours + Max Hours (3-col)                                        | yes      |
| Tiered pricing | Dynamic rows: Tier Name, Price, Description + Remove X; + Add Tier link     | yes      |
| Add-ons        | Dynamic rows: Add-on Name, Price, Description + Remove X; + Add Add-on link | no       |
| Status         | select (active / paused / archived)                                         | yes      |
| Actions        | Cancel, Save Service (gradient)                                             | —        |

### States

| State                   | Behaviour                                                                    |
| ----------------------- | ---------------------------------------------------------------------------- |
| Loading                 | `Loader2` spinner                                                            |
| Empty (no filter match) | "No services found." placeholder with dashed border                          |
| Delete confirm          | Dialog `max-w-sm`: "Delete Service?" + service title + Cancel / Delete (red) |

---

## F3. Client CRM

**Route:** `/freelance/clients`
**File:** `src/app/freelance/clients/page.tsx`

### Layout — List View

```
┌──────────────────────────────────────────────────────────┐
│  Header: "Client CRM"  [+ Add Client] button             │
│                                                          │
│  ── Client grid (2-col) ─────────────────────────────    │
│  ┌───────────────────────┐ ┌───────────────────────┐     │
│  │ Name (bold)           │ │ ...                   │     │
│  │ Company (Building2)   │ │                       │     │
│  │ Email (Mail)          │ │                       │     │
│  │ Total Value (emerald) │ │                       │     │
│  │ N entries             │ │                       │     │
│  │ [View Details]        │ │                       │     │
│  └───────────────────────┘ └───────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

### Layout — Detail View

```
┌──────────────────────────────────────────────────────────┐
│  ← Back  "Client Details"                                │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Client Header Card                                 │  │
│  │   Name (xl bold)  Company (Building2 sm)           │  │
│  │   ─────────────────────────────────────────────    │  │
│  │   Email · Phone · Total Value · Entry Count (row) │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Notes                                              │  │
│  │  note text (sm neutral-600)                        │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Service History  [+ Add Entry]                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ ● ─────────────────────────────────────────────    │  │← gradient dot + line
│  │   service_type  date  $value (emerald)  ▼           │  │← collapsed
│  │   ─ ─ ─ (expanded) ─ ─ ─                           │  │
│  │   Deliverables: ● item ● item                      │  │
│  │   [MediaVault panel]                               │  │
│  │   [Edit] [Delete]                                  │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element               | Value                                                                             |
| --------------------- | --------------------------------------------------------------------------------- |
| Page background       | subtle tinted gradient                                                            |
| Client cards          | `bg-white/80 backdrop-blur-sm border border-neutral-200/80 rounded-2xl shadow-sm` |
| Total value           | `text-emerald-600 font-semibold`                                                  |
| View Details button   | gradient bg                                                                       |
| Timeline gradient dot | `from-[#ff5f6d] to-[#ffc371]` circle                                              |
| Timeline line         | gradient `from-[#ff5f6d]/30 to-[#ffc371]/10`                                      |
| Entry animation       | `fadeSlideIn` with index-based `animationDelay`                                   |
| Add Entry button      | gradient bg                                                                       |

### Client Form Modal (max-w-md)

| Field   | Type                           | Required |
| ------- | ------------------------------ | -------- |
| Name    | text                           | yes      |
| Email   | email                          | no       |
| Phone   | tel                            | no       |
| Company | text                           | no       |
| Notes   | textarea                       | no       |
| Actions | Cancel, Save Client (gradient) | —        |

### History Entry Form Modal (max-w-lg)

| Field        | Type                                  | Required |
| ------------ | ------------------------------------- | -------- |
| Date         | date                                  | yes      |
| Value ($)    | number                                | yes      |
| Service Type | text                                  | yes      |
| Description  | textarea                              | no       |
| Deliverables | tag input: type + Enter or Add button | no       |
| Actions      | Cancel, Save Entry (gradient)         | —        |

### MediaVault Panel

| Element                              | Detail                                              |
| ------------------------------------ | --------------------------------------------------- |
| Visibility select                    | Internal Only / Public Portfolio                    |
| Upload Photo button                  | file input, image/\*, triggers upload mutation      |
| Generate Invoice button              | gradient border, opens `invoice_url` in new tab     |
| Media grid                           | 2-col (sm: 3-col), aspect-video thumbnails          |
| Media item hover overlay             | Eye/EyeOff toggle (visibility) + Trash2 (delete)    |
| Visibility badge (top-left of thumb) | emerald = Public Portfolio, neutral = Internal Only |

### States

| State                 | Behaviour                                                |
| --------------------- | -------------------------------------------------------- |
| Loading               | `Loader2` spinner                                        |
| Empty clients         | "No clients yet." dashed placeholder + Add Client button |
| Empty history         | "No service history yet."                                |
| Delete client confirm | Dialog: "Delete Client?" + name + Cancel / Delete (red)  |
| Delete entry confirm  | Dialog: "Delete Entry?" + Cancel / Delete (red)          |

### Navigation

| Action       | Destination                                        |
| ------------ | -------------------------------------------------- |
| View Details | switches to detail view (in-page, no route change) |
| Back         | returns to list view                               |

---

## F4. Public Portfolio

**Route:** `/freelance/portfolio`
**File:** `src/app/freelance/portfolio/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: subtle tinted gradient                      │
│                                                          │
│  ── Hero section ─────────────────────────────────────   │
│  ┌──────────────────────────────────────────────────┐    │
│  │  Gradient border wrapper (from-[#ff5f6d] p-0.5   │    │
│  │   rounded-3xl)                                    │    │
│  │  ┌────────────────────────────────────────────┐   │    │
│  │  │  bg-white/90 backdrop-blur-xl rounded-[22px│   │    │
│  │  │                                            │   │    │
│  │  │  [Profile photo w-16 h-16 rounded-2xl]     │   │    │
│  │  │   + camera upload overlay (bottom-right)   │   │    │
│  │  │  display_name (xl bold)                    │   │    │
│  │  │  ● Available / Busy / Unavailable badge    │   │    │
│  │  │  Bio text (sm neutral-600)                 │   │    │
│  │  │  Skills pills (gradient bg, Sparkles icon) │   │    │
│  │  │  [Edit Profile] button (top-right)         │   │    │
│  │  └────────────────────────────────────────────┘   │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  ── Work Showcase ────────────────────────────────────   │
│  ┌──────────────────────┐ ┌──────────────────────┐       │
│  │  h-32 thumbnail strip│ │  ...                 │       │
│  │  (up to 3 images)    │ │                      │       │
│  │  client name / anon  │ │                      │       │
│  │  [Eye/EyeOff Anon]   │ │                      │       │
│  └──────────────────────┘ └──────────────────────┘       │
│                                                          │
│  ── Skill Verification Badges ────────────────────────   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                  │
│  │ Award+   │ │ Badge    │ │ ...      │                  │
│  │ skill    │ │ name     │ │          │                  │
│  └──────────┘ └──────────┘ └──────────┘                  │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element               | Value                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| Hero border           | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] p-0.5 rounded-3xl`                                |
| Hero inner card       | `bg-white/90 backdrop-blur-xl border border-white/60 rounded-[22px] p-6`                        |
| Profile photo         | `w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow`                                   |
| Camera upload overlay | `absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow border`                       |
| Availability badge    | inline-flex, emerald=available, amber=busy, neutral=unavailable                                 |
| Skills pill           | `bg-gradient-to-r from-[#ff5f6d]/10 to-[#ffc371]/10 border border-[#ff5f6d]/15` + Sparkles icon |
| Work showcase card    | glassmorphic `bg-white/80 backdrop-blur-sm border rounded-2xl`                                  |
| Showcase thumbnail    | `h-32` strip, up to 3 images, gradient placeholder if none                                      |
| Anonymize toggle      | `Eye`/`EyeOff` icon + "Anon"/"Named" text                                                       |
| Skill badge icon      | Award in `bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]` circle                                 |

### Hero Edit Form Modal (max-w-lg)

| Field               | Type                                            | Required |
| ------------------- | ----------------------------------------------- | -------- |
| Bio                 | textarea, 7 rows                                | no       |
| Skills              | text (comma-separated)                          | no       |
| Availability Status | 3-button toggle: Available / Busy / Unavailable | yes      |
| Actions             | Cancel, Save (gradient)                         | —        |

### AVAILABILITY_CONFIG

| Status      | Color   |
| ----------- | ------- |
| available   | emerald |
| busy        | amber   |
| unavailable | neutral |

### States

| State             | Behaviour                                   |
| ----------------- | ------------------------------------------- |
| Loading           | `Loader2` spinner                           |
| Error             | `AlertCircle` + "Failed to load portfolio." |
| No showcase items | empty card with gradient placeholder banner |
| No skill badges   | section hidden                              |

---

## F5. Freelance Inquiries

**Route:** `/freelance/inquiries`
**File:** `src/app/freelance/inquiries/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Header: Mail icon + "Inquiries"                         │
│  Subtitle: "Messages from personal users interested      │
│             in your services."                           │
│                                                          │
│  ── Filter tabs (flex-wrap) ─────────────────────────    │
│  [All (N)] [Pending (N)] [Read (N)] [Replied (N)]        │
│  [Closed (N)]                                            │
│                                                          │
│  ── Accordion inquiry list ──────────────────────────    │
│  ┌────────────────────────────────────────────────────┐  │
│  │ ▶ Sender Name  ·  subject/preview  [Pending]  date │  │
│  │ ─ ─ ─ (expanded) ─ ─ ─                            │  │
│  │   Full message text                                │  │
│  │   [Reply]  [Mark as Read]  [Close]                 │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Empty: "No inquiries found." placeholder               │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element               | Value                                                                             |
| --------------------- | --------------------------------------------------------------------------------- |
| Page background       | `bg-gray-50 min-h-screen p-4 sm:p-6`                                              |
| Filter tab (active)   | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`                         |
| Filter tab (inactive) | `bg-white border text-neutral-600`                                                |
| Accordion card        | `bg-white/80 backdrop-blur-sm border border-neutral-200/80 rounded-2xl shadow-sm` |
| Status: pending       | `bg-amber-50 text-amber-700 border-amber-200`                                     |
| Status: read          | `bg-blue-50 text-blue-700 border-blue-200`                                        |
| Status: replied       | `bg-emerald-50 text-emerald-700 border-emerald-200`                               |
| Status: closed        | `bg-neutral-100 text-neutral-500 border-neutral-200`                              |

### Reply Modal (glass card)

| Element                  | Detail                                                         |
| ------------------------ | -------------------------------------------------------------- |
| Original message preview | `bg-neutral-50 rounded-xl p-3 text-sm italic text-neutral-600` |
| Reply textarea           | `min-h-[120px]`                                                |
| Send button              | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`      |
| Cancel button            | outline                                                        |

### States

| State         | Behaviour                                   |
| ------------- | ------------------------------------------- |
| Loading       | `Loader2` spinner                           |
| Error         | `AlertCircle` + "Failed to load inquiries." |
| Empty         | Users icon + "No inquiries found."          |
| Sending reply | button shows `Loader2` spinner              |

---

## F6. Calendar & Milestones

**Route:** `/freelance/calendar`
**File:** `src/app/freelance/calendar/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: subtle tinted gradient                      │
│                                                          │
│  Header: CalendarDays icon + "Calendar & Milestones"     │
│  [+ Add Milestone] button (top-right)                    │
│                                                          │
│  ── View toggle ──────────────────────────────────────   │
│  [CalendarDays Month] [LayoutList List]                  │
│  (gradient active, rounded toggle group)                 │
│                                                          │
│  ── Month navigation ─────────────────────────────────   │
│  [‹]  "June 2026"  [›]  [Today]                         │
│                                                          │
│  ── Legend ───────────────────────────────────────────   │
│  ● deadline  ● booking  ● follow_up                     │
│  (red)       (blue)     (amber)                         │
│                                                          │
│  ── MONTH VIEW ───────────────────────────────────────   │
│  ┌───┬───┬───┬───┬───┬───┬───┐                          │
│  │Sun│Mon│Tue│Wed│Thu│Fri│Sat│  ← weekday headers       │
│  ├───┼───┼───┼───┼───┼───┼───┤                          │
│  │   │   │ 1 │ 2 │ 3 │ 4 │ 5 │                          │
│  │   │   │[chip]   │   │   │   │                          │
│  ├───┼───┼───┼───┼───┼───┼───┤                          │
│  │ …                          │  min-h-[80px] cells     │
│  └────────────────────────────┘                          │
│                                                          │
│  ── LIST VIEW ────────────────────────────────────────   │
│  ┌────────────────────────────────────────────────────┐  │
│  │ ● title  [Type]  [Status]  date  client  desc  ✎ 🗑│  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Footer: CalendarDays icon + "N milestones this month"   │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element                    | Value                                                             |
| -------------------------- | ----------------------------------------------------------------- |
| Page background            | subtle tinted gradient                                            |
| View toggle active         | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`         |
| Today cell                 | `bg-gradient-to-br from-[#ff5f6d]/5 to-[#ffc371]/5`               |
| Today date number          | gradient circle (`from-[#ff5f6d] to-[#ffc371]`) white text        |
| Calendar grid              | 7-col CSS grid, `min-h-[80px]` cells, `border border-neutral-100` |
| Milestone chip (deadline)  | red bg/text                                                       |
| Milestone chip (booking)   | blue bg/text                                                      |
| Milestone chip (follow_up) | amber bg/text                                                     |
| "+N more" overflow         | neutral text-xs                                                   |
| Add Milestone button       | gradient bg white text                                            |

### TYPE_STYLES

| Type      | Color classes                 |
| --------- | ----------------------------- |
| deadline  | `bg-red-100 text-red-700`     |
| booking   | `bg-blue-100 text-blue-700`   |
| follow_up | `bg-amber-100 text-amber-700` |

### STATUS_STYLES

| Status    | Classes                                        |
| --------- | ---------------------------------------------- |
| pending   | `bg-neutral-100 text-neutral-600`              |
| completed | `bg-emerald-100 text-emerald-700`              |
| cancelled | `bg-neutral-100 text-neutral-400 line-through` |

### Milestone Form Modal (max-w-md)

| Field       | Type                                                     | Required |
| ----------- | -------------------------------------------------------- | -------- |
| Title       | text                                                     | yes      |
| Due Date    | date (2-col with Type)                                   | yes      |
| Type        | select: deadline / booking / follow_up (2-col with Date) | yes      |
| Client      | select from client list (optional)                       | no       |
| Description | textarea                                                 | no       |
| Status      | select: pending / completed / cancelled (edit mode only) | —        |
| Actions     | Cancel, Save Milestone (gradient)                        | —        |

### Interactions

| Interaction          | Behaviour                                                   |
| -------------------- | ----------------------------------------------------------- |
| Click empty day cell | pre-fills `defaultDate` in create form, opens modal         |
| Click milestone chip | opens edit form pre-filled with that milestone              |
| ‹ / › nav            | shifts current month ±1, refetches milestones for new range |
| Today button         | jumps to current month                                      |
| List Edit icon       | opens edit form                                             |
| List Delete icon     | opens confirm dialog                                        |

### Query

- Fetches milestones for current month: `from` = first day of month ISO, `to` = last day of month ISO
- Query key: `['freelance', 'milestones', year, month]`

### States

| State          | Behaviour                                                              |
| -------------- | ---------------------------------------------------------------------- |
| Loading        | `Loader2` spinner over calendar area                                   |
| Error          | `AlertCircle` + error message                                          |
| Empty month    | calendar renders with no chips; list shows "No milestones this month." |
| Delete confirm | Dialog: "Delete Milestone?" + title + Cancel / Delete (red)            |

---

## Community Pages

**Shared layout** (`src/app/community/layout.tsx`)

- `RequireSession` auth guard
- `SideBar` component
- Page area: `bg-gray-50 min-h-screen pt-16 xl:pt-0 xl:ml-18`

**Shared background** for most community sub-pages: `bg-gradient-to-br from-neutral-50 to-neutral-100`

---

## C1. Community Dashboard

**Route:** `/community`
**File:** `src/app/community/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: bg-neutral-50                               │
│                                                          │
│  Header                                                  │
│  community_name (2xl bold)  whodini_id (mono, xs)        │
│                                                          │
│  ── Metric Cards (3-col grid) ─────────────────────────  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│  │  Members   │ │  Chapters  │ │   Events   │            │
│  │  rose-500  │ │violet-500  │ │emerald-600 │            │
│  │ gradient   │ │ gradient   │ │ gradient   │            │
│  │  top bar   │ │  top bar   │ │  top bar   │            │
│  └────────────┘ └────────────┘ └────────────┘            │
│                                                          │
│  ── Main grid (2-col lg) ──────────────────────────────  │
│  ┌──────────────────────┐ ┌──────────────────────┐       │
│  │  Chapters            │ │  Forums              │       │
│  │  BookOpen violet     │ │  MessageSquare rose  │       │
│  │  divide-y list:      │ │  divide-y list:      │       │
│  │  name, leader,       │ │  # room, last msg,   │       │
│  │  region, category,   │ │  unread badge,       │       │
│  │  member count        │ │  member count        │       │
│  └──────────────────────┘ └──────────────────────┘       │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element                | Value                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Page background        | `bg-neutral-50`                                                                                                   |
| Metric card            | `bg-white rounded-2xl border border-neutral-100 shadow-sm`                                                        |
| Metric top accent bar  | `h-0.5 bg-gradient-to-r` per metric                                                                               |
| Members accent         | `from-[#ff5f6d] to-[#ffc371]` / rose bg+text                                                                      |
| Chapters accent        | `from-violet-500 to-indigo-500` / violet bg+text                                                                  |
| Events accent          | `from-emerald-400 to-teal-500` / emerald bg+text                                                                  |
| Chapter status: active | `bg-emerald-50 text-emerald-600`                                                                                  |
| Chapter category pills | Technology=blue, Business=amber, Creative=pink, Marketing=purple, Finance=green, Leadership=indigo, Regional=teal |
| Forum room icon        | `w-8 h-8 bg-gradient-to-br from-[#ff5f6d]/10 to-[#ffc371]/10` with Hash icon                                      |
| Unread badge           | `bg-[#ff5f6d]` text white, min-w-[18px] rounded-full                                                              |

### Static Content

| Section      | Label    | Icon                 |
| ------------ | -------- | -------------------- |
| Metric       | Members  | Users                |
| Metric       | Chapters | BookOpen             |
| Metric       | Events   | Calendar             |
| Panel header | Chapters | BookOpen (violet)    |
| Panel header | Forums   | MessageSquare (rose) |

### States

| State            | Behaviour                            |
| ---------------- | ------------------------------------ |
| Chapters loading | "Loading chapters…" centered         |
| Chapters empty   | BookOpen icon + "No chapters yet"    |
| Forums loading   | "Loading forums…" centered           |
| Forums empty     | MessageSquare icon + "No forums yet" |

---

## C2. Members

**Route:** `/community/members`
**File:** `src/app/community/members/page.tsx`

### Layout — List View

```
┌──────────────────────────────────────────────────────────┐
│  Header: "Community Members"  [+ Add Member]             │
│  "Manage members in {communityName}"                     │
│                                                          │
│  ── Filters ────────────────────────────────────────     │
│  [Search by name, email, role…] [All Chapters ▼]         │
│                                                          │
│  ── Member cards (2-col sm / 3-col lg) ─────────────     │
│  ┌──────────────────────────┐                            │
│  │ [Avatar initials circle] │                            │
│  │ Name  Chapter            │                            │
│  │ [active] [role badge]    │                            │
│  │ bio (line-clamp-2)       │                            │
│  │ ─────────────────────── │                            │
│  │ Mail  email              │                            │
│  └──────────────────────────┘                            │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element           | Value                                                           |
| ----------------- | --------------------------------------------------------------- |
| Page background   | `bg-gradient-to-br from-neutral-50 to-neutral-100`              |
| Member card       | shadcn `<Card>` white, `hover:shadow-md hover:border-[#ff5f6d]` |
| Avatar: leader    | `bg-[#ff5f6d]`                                                  |
| Avatar: moderator | `bg-amber-500`                                                  |
| Avatar: member    | `bg-blue-500`                                                   |
| Status: active    | `bg-green-100 text-green-800 border-green-200`                  |
| Role badge        | `bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20`     |
| Add Member button | `bg-[#ff5f6d]`                                                  |

### Sub-views (in-page navigation)

| View   | Triggered by        | Component            |
| ------ | ------------------- | -------------------- |
| create | + Add Member button | `<CreateMemberForm>` |
| show   | click member card   | `<ShowMember>`       |
| update | Edit from show view | `<UpdateMemberForm>` |

### Create / Update Form Fields

| Field      | Type                                | Required     |
| ---------- | ----------------------------------- | ------------ |
| Whodini ID | text                                | yes (create) |
| Role       | select: member / moderator / leader | yes          |
| Chapter    | select from chapter list            | no           |
| Actions    | Cancel, Save                        | —            |

### States

| State              | Behaviour                                             |
| ------------------ | ----------------------------------------------------- |
| Loading            | shadcn `<Card>` with loading indicator                |
| Empty (no members) | 👥 emoji + "No Members Yet" + Add First Member button |
| Empty (filtered)   | 🔍 emoji + "No members found" + hint                  |

---

## C3. Community Events

**Route:** `/community/events`
**File:** `src/app/community/events/page.tsx`

### Layout — List View

```
┌──────────────────────────────────────────────────────────┐
│  Header: "Community Events"  [+ Create Event]            │
│  "Upcoming and past events"                              │
│                                                          │
│  ── Event cards (2-col sm) ─────────────────────────     │
│  ┌──────────────────────────┐                            │
│  │ Event Name   [Status] [⋮]│  ← title + badge + dropdown│
│  │ description (line-clamp-2)│                           │
│  │ 📅 date at time          │                            │
│  │ 📍 location              │                            │
│  │ ─────────────────────── │                            │
│  │ 👥 N/capacity registered  │                            │
│  └──────────────────────────┘                            │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element                     | Value                                                           |
| --------------------------- | --------------------------------------------------------------- |
| Page background             | `bg-gradient-to-br from-neutral-50 to-neutral-100`              |
| Event card                  | shadcn `<Card>` white, `hover:shadow-md hover:border-[#ff5f6d]` |
| Status: upcoming            | `bg-green-100 text-green-800`                                   |
| Status: ongoing             | `bg-blue-100 text-blue-800`                                     |
| Status: completed           | `bg-neutral-100 text-neutral-600`                               |
| Status: cancelled           | `bg-red-100 text-red-700`                                       |
| Status: postponed           | `bg-yellow-100 text-yellow-800`                                 |
| Calendar/MapPin/Users icons | `text-[#ff5f6d]`                                                |
| Create Event button         | `bg-[#ff5f6d]`                                                  |

### Dropdown Actions (⋮ per card)

| Action   | Icon             | Behaviour                                          |
| -------- | ---------------- | -------------------------------------------------- |
| Postpone | Clock (yellow)   | opens update form with status=postponed pre-filled |
| Cancel   | XCircle (orange) | `window.confirm` → `cancelCommunityEvent`          |
| Delete   | Trash2 (red)     | `window.confirm` → `deleteCommunityEvent`          |

### Sub-views

| View   | Component                |
| ------ | ------------------------ |
| create | `<CreateCommunityEvent>` |
| show   | `<ShowCommunityEvent>`   |
| update | `<UpdateCommunityEvent>` |

### Create / Update Form Fields

| Field       | Type                 | Required |
| ----------- | -------------------- | -------- |
| Event Name  | text                 | yes      |
| Chapter     | select from chapters | no       |
| Date        | date                 | yes      |
| Time        | time                 | yes      |
| Location    | text                 | yes      |
| Capacity    | number (default 100) | yes      |
| Description | textarea             | no       |
| Actions     | Cancel, Save         | —        |

### States

| State   | Behaviour                   |
| ------- | --------------------------- |
| Loading | spinner                     |
| Empty   | "No events yet" placeholder |

---

## C4. Chapters

**Route:** `/community/chapters`
**File:** `src/app/community/chapters/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Full-VH 2-panel layout (h-[calc(100vh-4rem)] xl:h-screen│
│  overflow-hidden)                                        │
│                                                          │
│  ┌──────────────────────────────────┬───────────────┐    │
│  │  LEFT PANEL (flex-1 overflow-y)  │  RIGHT PANEL  │    │
│  │  bg-gradient from-neutral-50     │  w-72 border-l│    │
│  │                                  │  bg-white     │    │
│  │  [detail mode: no chapter]       │               │    │
│  │   gradient icon + "Select a      │  Header:      │    │
│  │   chapter" + Create First        │  "Chapters"   │    │
│  │                                  │  communityName│    │
│  │  [detail mode: chapter selected] │  [New] button │    │
│  │   ChapterDetail component        │               │    │
│  │   (header, stats, about,         │  Search input │    │
│  │    leadership, team members)     │               │    │
│  │                                  │  Scrollable   │    │
│  │  [create mode]                   │  chapter list:│    │
│  │   CreateChapterForm              │  name, region,│    │
│  │                                  │  status, count│    │
│  │  [update mode]                   │               │    │
│  │   UpdateChapterForm              │               │    │
│  │                                  │               │    │
│  │  [add-member mode]               │               │    │
│  │   AddMemberPanel                 │               │    │
│  └──────────────────────────────────┴───────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### ChapterDetail Sections

| Section                  | Content                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------- |
| Header                   | gradient avatar (first letter), name, category, status badge, Edit button              |
| Stats (3-col)            | Members (Users), Region (MapPin), Founded (Calendar)                                   |
| About                    | description text (if set)                                                              |
| Leadership — Leader      | Crown icon in gradient bg, leader_name, "Chapter Leader" label                         |
| Leadership — Vice Leader | Shield icon, vice_leader_name (if set)                                                 |
| Leadership — Officers    | initials avatar, name, role (Secretary/Treasurer/Events Coordinator/etc.)              |
| Team Members             | 2-col grid of member rows with initials avatar, name, role, status badge; [Add] button |

### Design

| Element                       | Value                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| Left panel bg                 | `bg-gradient-to-br from-neutral-50 to-neutral-100`                                       |
| Right panel                   | `w-72 bg-white border-l border-neutral-200`                                              |
| Chapter avatar (detail)       | `w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]`                     |
| Leader card                   | `bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 border border-[#ff5f6d]/15 rounded-xl` |
| Crown icon                    | `bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]` circle                                   |
| Selected chapter (right list) | `bg-[#ff5f6d]/8 border border-[#ff5f6d]/20`                                              |
| Status: active                | `bg-green-50 text-green-600`                                                             |
| New/Edit buttons              | `bg-[#ff5f6d]`                                                                           |

### Create / Update Chapter Form Fields

| Field            | Type                                                                              | Required |
| ---------------- | --------------------------------------------------------------------------------- | -------- |
| Chapter Name     | text                                                                              | yes      |
| Region           | text                                                                              | yes      |
| Category         | select (Technology, Business, Creative, Marketing, Finance, Leadership, Regional) | yes      |
| Leader Name      | text                                                                              | yes      |
| Vice Leader Name | text                                                                              | no       |
| Officers         | dynamic rows: Name + Role select; + Add Officer link                              | no       |
| Description      | textarea                                                                          | no       |
| Status           | select: active / inactive                                                         | yes      |
| Actions          | Cancel, Save                                                                      | —        |

### AddMemberPanel

- Search by name or email
- Lists community members not already in this chapter
- Per row: initials avatar, name, current chapter or email, role badge, Assign button
- `updateMember(id, { chapter_name })` on assign

### States

| State                            | Behaviour                                            |
| -------------------------------- | ---------------------------------------------------- |
| No chapter selected (detail)     | placeholder card + "Create First Chapter" button     |
| Chapters loading (right list)    | `Loader2` spinner                                    |
| Chapters empty (right list)      | "No chapters yet." + "Create one →" link             |
| Members loading (AddMemberPanel) | `Loader2` centered                                   |
| All members already assigned     | "All community members are already in this chapter." |

---

## C5. Message Board (Chat Rooms)

**Route:** `/community/message-board`
**File:** `src/app/community/message-board/page.tsx`

### Layout — Room List

```
┌──────────────────────────────────────────────────────────┐
│  Header: "Community Chat Rooms"  [+ New Room]            │
│  "Private group chats for community members only."       │
│                                                          │
│  ── Room cards (space-y-3) ─────────────────────────     │
│  ┌────────────────────────────────────────────────────┐  │
│  │  [MessageSquare icon]  room name  [Public/Private]  │  │
│  │                        [unread badge]               │  │
│  │  last_message: sender: preview text                 │  │
│  │                           N members  [avatars ×3]  │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Layout — Chat View (full-screen, h=100vh-64px)

```
┌──────────────────────────────────────────────────────────┐
│  HEADER (sticky)                                         │
│  ← back | room name | [Public/Private] | member count   │
│  [Invite] (private only)  [Leave] (red)                  │
│                                                          │
│  MEMBERS STRIP (horizontal scroll)                       │
│  [avatar name] [avatar name] ...                         │
│                                                          │
│  MESSAGES (flex-1 overflow-y-auto)                       │
│  Other: [avatar]  sender_name                           │
│                   [bubble: neutral-100]  HH:MM           │
│                                                          │
│  Own:             [bubble: gradient]  HH:MM             │
│                                     (flex-row-reverse)   │
│                                                          │
│  INPUT BAR (sticky bottom)                               │
│  [text input]  [Send gradient button]                    │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element              | Value                                                                             |
| -------------------- | --------------------------------------------------------------------------------- |
| Room card            | `bg-white/80 backdrop-blur-sm border border-neutral-200/80 rounded-2xl shadow-sm` |
| Room icon            | `w-11 h-11 bg-gradient-to-br from-[#ff5f6d]/20 to-[#ffc371]/20`                   |
| Public badge         | sky-50 bg, sky-600 text, Globe icon                                               |
| Private badge        | neutral-100 bg, neutral-500 text, Lock icon                                       |
| Unread badge         | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371]` white text, rounded-full           |
| Chat header          | `bg-white/80 backdrop-blur-sm border-b`                                           |
| Members strip        | `bg-neutral-50/60 border-b`, horizontal scroll                                    |
| Own message bubble   | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white rounded-br-sm`           |
| Other message bubble | `bg-neutral-100 text-neutral-800 rounded-bl-sm`                                   |
| Send button          | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371]`                                    |
| Avatar               | `rounded-xl bg-gradient-to-br from-[#ff5f6d]/20 to-[#ffc371]/20 text-[#ff5f6d]`   |

### Create Room Modal (max-w-md)

| Element                    | Detail                                                            |
| -------------------------- | ----------------------------------------------------------------- |
| Room type toggle           | Public (Globe) / Private (Lock) — gradient active                 |
| Public note                | "All community members will be automatically added to this room." |
| Private note               | "Only the members you select will be added to this room."         |
| Room Name\*                | text input                                                        |
| Description                | text input                                                        |
| Add Members (private only) | searchable checkbox list of community members                     |
| Actions                    | Cancel, Create (gradient)                                         |

### Invite Modal (max-w-sm, private rooms only)

- Searchable checkbox list of members not already in the room
- Invite button (gradient, disabled until ≥1 selected)

### Interactions

| Interaction        | Behaviour                                                               |
| ------------------ | ----------------------------------------------------------------------- |
| Click room card    | enters ChatView                                                         |
| ← back button      | returns to room list                                                    |
| Enter key in input | sends message (no Shift+Enter)                                          |
| Messages polling   | `refetchInterval: 5000`                                                 |
| Leave button       | `leaveCommunityChatRoom` → removes room from list, returns to list view |

### States

| State            | Behaviour                                       |
| ---------------- | ----------------------------------------------- |
| Rooms loading    | `Loader2` spinner                               |
| No rooms         | MessageSquare icon + "No chat rooms yet" + hint |
| Messages loading | `Loader2` spinner                               |
| No messages      | MessageSquare + "No messages yet. Say hello!"   |

---

## C6. Community Inquiries

**Route:** `/community/inquiries`
**File:** `src/app/community/inquiries/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Header: "Inquiries"  [pending count badge]              │
│  "Messages from personal users interested in your        │
│   community."                                            │
│                                                          │
│  ── Filter tabs (bg-neutral-100 rounded-lg) ──────────   │
│  [All] [Pending (N)] [Read (N)] [Replied (N)] [Closed]   │
│                                                          │
│  ── Success banner (emerald, 3.5s auto-dismiss) ──────   │
│                                                          │
│  ── Accordion enquiry cards ───────────────────────────  │
│  ┌────────────────────────────────────────────────────┐  │
│  │  MessageCircle  subject  [Status]  sender · date  ▼│  │
│  │  message preview (line-clamp-1, collapsed)         │  │
│  │ ─ ─ ─ (expanded) ─ ─ ─                            │  │
│  │  Message section: full text                        │  │
│  │  Your Reply (emerald, if exists): reply text       │  │
│  │  Actions: [Reply] [Send Another Reply] [Close]     │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element                | Value                                                       |
| ---------------------- | ----------------------------------------------------------- |
| Page padding           | `p-4 sm:p-6 lg:p-8`                                         |
| Filter tab (active)    | `bg-white text-[#ff5f6d] shadow-sm`                         |
| Count pill             | `bg-[#ff5f6d]/10 text-[#ff5f6d]`                            |
| Pending card border    | `border-amber-200 ring-1 ring-amber-100`                    |
| Pending MessageCircle  | `text-[#ff5f6d]`                                            |
| STATUS_STYLES: pending | `bg-amber-100 text-amber-700 border-amber-200`              |
| STATUS_STYLES: read    | `bg-blue-100 text-blue-700 border-blue-200`                 |
| STATUS_STYLES: replied | `bg-emerald-100 text-emerald-700 border-emerald-200`        |
| STATUS_STYLES: closed  | `bg-neutral-100 text-neutral-500 border-neutral-200`        |
| Expanded bg            | `bg-neutral-50/40`                                          |
| Reply section          | `bg-emerald-50 border border-emerald-100 rounded-xl`        |
| Reply button           | gradient bg white text                                      |
| Success banner         | `bg-emerald-50 border border-emerald-200` with CheckCircle2 |

### Behaviour

- Expanding a pending enquiry auto-calls `markReadMutation` (status → read)
- Closing an enquiry sets status → closed, hides actions
- After sending reply: shows "Reply sent!" success banner for 3.5 s

### Reply Modal (max-w-lg, glass card)

| Element           | Detail                                               |
| ----------------- | ---------------------------------------------------- |
| Subject preview   | `bg-neutral-50 border border-neutral-100 rounded-xl` |
| Message preview   | `line-clamp-3`, subject label uppercase              |
| Reply textarea    | `h-32`, focus ring `[#ff5f6d]`                       |
| Send Reply button | gradient bg                                          |

---

## C7. History (Audit Trail)

**Route:** `/community/history`
**File:** `src/app/community/history/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: bg-gradient-to-br from-neutral-50 to-100    │
│                                                          │
│  Header: "Audit Trail"  [+ Add Milestone]                │
│  "Community milestones & activity log"                   │
│                                                          │
│  ── Vertical timeline ─────────────────────────────────  │
│  │  (gradient line: from-[#ff5f6d] to-[#ffc371])         │
│  ●  ┌─────────────────────────────────────────────────┐  │
│     │ Milestone Title        [Category badge]         │  │
│     │ 📅 date                                         │  │
│     │ description text                                │  │
│     │ ─────────────────────────────────────────────── │  │
│     │ 📈 impact text                                  │  │
│     └─────────────────────────────────────────────────┘  │
│  ●  ...                                                  │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element              | Value                                                                |
| -------------------- | -------------------------------------------------------------------- |
| Page background      | `bg-gradient-to-br from-neutral-50 to-neutral-100`                   |
| Timeline line        | `absolute left-3 bg-gradient-to-b from-[#ff5f6d] to-[#ffc371] w-0.5` |
| Timeline dot         | `w-3 h-3 rounded-full bg-[#ff5f6d] border-2 border-white shadow-sm`  |
| Milestone card       | shadcn `<Card>` white, `hover:shadow-md`                             |
| TrendingUp icon      | `text-[#ff5f6d]`                                                     |
| Add Milestone button | `bg-[#ff5f6d]`                                                       |

### Category Badge Colors

| Category     | Classes                         |
| ------------ | ------------------------------- |
| Foundation   | `bg-[#ff5f6d] text-white`       |
| Growth       | `bg-green-100 text-green-800`   |
| Events       | `bg-blue-100 text-blue-800`     |
| Partnerships | `bg-purple-100 text-purple-800` |
| Expansion    | `bg-orange-100 text-orange-800` |
| Programs     | `bg-indigo-100 text-indigo-800` |

### Add Milestone Form (full-page view, max-w-2xl)

| Field           | Type                                                                       | Required |
| --------------- | -------------------------------------------------------------------------- | -------- |
| Milestone Title | text                                                                       | yes      |
| Date            | date (2-col with Category)                                                 | yes      |
| Category        | select: Foundation / Growth / Events / Partnerships / Expansion / Programs | yes      |
| Description     | textarea, 3 rows                                                           | no       |
| Impact          | text                                                                       | no       |
| Actions         | Add Milestone, Cancel                                                      | —        |

### Notes

- Milestones sorted descending by date (newest first)
- No edit or delete on existing milestones (append-only)

---

## C8. Directory

**Route:** `/community/directory`
**File:** `src/app/community/directory/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: bg-gradient-to-br from-neutral-50 to-100    │
│                                                          │
│  Header: "Community Directory"  [+ Add Entry]            │
│  "Resources, guides, and useful links"                   │
│                                                          │
│  ── Filters ────────────────────────────────────────     │
│  [Search by title, tag, or type…]  [All Categories ▼]    │
│  "N results found in "Category""                         │
│                                                          │
│  ── Card grid (2-col sm / 3-col lg) ─────────────────   │
│  ┌──────────────────────────────┐                        │
│  │ [FileText icon]  Title       │                        │
│  │                  [Category] [Type]                    │
│  │ description (line-clamp-2)   │                        │
│  │ [tag] [tag] [tag] +N         │                        │
│  │ 🔗 Visit Resource            │                        │
│  └──────────────────────────────┘                        │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element              | Value                                                              |
| -------------------- | ------------------------------------------------------------------ |
| Page background      | `bg-gradient-to-br from-neutral-50 to-neutral-100`                 |
| Entry card           | shadcn `<Card>` white, `hover:shadow-md hover:border-[#ff5f6d]/40` |
| FileText icon bg     | `w-9 h-9 bg-[#ff5f6d]/10 rounded-lg`                               |
| Category: Guidelines | `bg-red-100 text-red-800`                                          |
| Category: Resources  | `bg-blue-100 text-blue-800`                                        |
| Category: Directory  | `bg-purple-100 text-purple-800`                                    |
| Category: Tools      | `bg-green-100 text-green-800`                                      |
| Category: Events     | `bg-amber-100 text-amber-800`                                      |
| Resource type badge  | `bg-neutral-100 text-neutral-600 rounded text-xs`                  |
| Tag pills            | `bg-neutral-100 text-neutral-600 rounded-full`                     |
| Visit Resource link  | `text-[#ff5f6d]` + LinkIcon                                        |
| Add Entry button     | `bg-[#ff5f6d]`                                                     |

### Sub-views

| View   | Component                |
| ------ | ------------------------ |
| create | `<CreateDirectoryEntry>` |
| show   | `<ShowDirectoryEntry>`   |
| update | `<UpdateDirectoryEntry>` |

### Create / Update Form Fields

| Field         | Type                                                         | Required |
| ------------- | ------------------------------------------------------------ | -------- |
| Title         | text                                                         | yes      |
| URL           | url                                                          | yes      |
| Category      | select (Guidelines / Resources / Directory / Tools / Events) | yes      |
| Resource Type | text                                                         | yes      |
| Description   | textarea                                                     | no       |
| Tags          | tag input                                                    | no       |
| Actions       | Cancel, Save                                                 | —        |

### States

| State              | Behaviour                                                              |
| ------------------ | ---------------------------------------------------------------------- |
| Empty (no filters) | "Add the first entry to get started."                                  |
| Empty (filtered)   | "Try adjusting your search or category filter." + Clear filters button |

---

## C9. Community Settings

**Route:** `/community/settings`
**File:** `src/app/community/settings/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: bg-gradient-to-br from-neutral-50 to-100    │
│                                                          │
│  Header: "Community Settings"                            │
│  "Manage community configuration and preferences"        │
│                                                          │
│  ── Tabs (2-col) ──────────────────────────────────────  │
│  [General]  [Notifications]                              │
│  bg-neutral-100, active=bg-white                         │
│                                                          │
│  ── Tab content ────────────────────────────────────     │
│  <GeneralSettings />  or  <CommunityNotificationPage />  │
└──────────────────────────────────────────────────────────┘
```

### General Tab (`settings/general.tsx`)

```
┌──────────────────────────────────────────────────────────┐
│  Card: gradient header "General Information"             │
│                                                          │
│  ── Community Images ──────────────────────────────────  │
│  ┌────────────────────────────────────────────────────┐  │
│  │  h-36 banner (gradient placeholder or image)       │  │
│  │  ● hover: "Upload/Change Banner" overlay           │  │
│  │  [Logo w-16 h-16 rounded-xl, -bottom-6 left-4]    │  │
│  │  ● hover: Camera icon overlay                      │  │
│  └────────────────────────────────────────────────────┘  │
│  "Click banner to upload (max 5MB) · Click logo (max 2MB)│
│   · JPEG, PNG, WEBP, or GIF"                             │
│                                                          │
│  Community Name*                                         │
│  Description (textarea 3 rows)                           │
│  Email + Phone (2-col)                                   │
│  Website                                                 │
│                                                          │
│  ── Privacy Toggle ─────────────────────────────────     │
│  [Globe Public]  [Lock Private]  (gradient active)       │
│  Public: "Any Whodini personal user can discover..."     │
│  Private: "Only users with a direct invite can join..."  │
│                                                          │
│  [Save General Settings] button (bg-[#ff5f6d])          │
└──────────────────────────────────────────────────────────┘
```

### General Tab Form Fields

| Field          | Type                              | Required |
| -------------- | --------------------------------- | -------- |
| Banner         | file (JPEG/PNG/WEBP/GIF, max 5MB) | no       |
| Logo           | file (JPEG/PNG/WEBP/GIF, max 2MB) | no       |
| Community Name | text                              | yes      |
| Description    | textarea, 3 rows                  | no       |
| Email          | email (2-col)                     | no       |
| Phone          | tel (2-col)                       | no       |
| Website        | text                              | no       |
| Privacy        | Public / Private toggle           | yes      |

### Design

| Element               | Value                                                                    |
| --------------------- | ------------------------------------------------------------------------ |
| Card header           | `bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5`                       |
| Banner area           | `h-36 rounded-xl bg-gradient-to-br from-[#ff5f6d]/20 to-[#ffc371]/20`    |
| Banner hover overlay  | `bg-black/30`, "Upload/Change Banner" chip                               |
| Logo                  | `w-16 h-16 rounded-xl ring-4 ring-white shadow-md` at `-bottom-6 left-4` |
| Logo fallback         | gradient bg with first letter initial                                    |
| Privacy toggle active | `bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white`                |
| Save button           | `bg-[#ff5f6d]` with Save icon                                            |

### States

| State            | Behaviour                                           |
| ---------------- | --------------------------------------------------- |
| Loading          | inputs disabled, button shows "Loading Settings..." |
| Uploading banner | `Loader2` spinner in banner area                    |
| Uploading logo   | `Loader2` spinner in logo area                      |
| Save error       | red bordered error paragraph                        |
| Save success     | green bordered success paragraph                    |

---

## C10. Services

**Route:** `/community/services`
**File:** `src/app/community/services/page.tsx`

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Background: bg-gradient-to-br from-neutral-50 to-100    │
│                                                          │
│  [Blurred skeleton grid — 6 placeholder cards]           │
│  (blur-sm, pointer-events-none, aria-hidden)             │
│                                                          │
│  ── Coming Soon overlay ───────────────────────────────  │
│  bg-white/60 backdrop-blur-[2px] absolute inset-0        │
│                                                          │
│  [Clock icon in gradient circle w-16 h-16]               │
│  "Coming Soon"  (2xl–3xl bold)                           │
│  "Community Services is currently under development.     │
│   Check back soon!"                                      │
│  [In Progress badge]                                     │
└──────────────────────────────────────────────────────────┘
```

### Design

| Element             | Value                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| Background          | `bg-gradient-to-br from-neutral-50 to-neutral-100`                               |
| Clock icon circle   | `w-16 h-16 bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] rounded-full shadow-lg` |
| "In Progress" badge | `bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20 rounded-full`         |
| Overlay             | `bg-white/60 backdrop-blur-[2px]`                                                |

### Notes

- No functional content — page is a Coming Soon placeholder
- Skeleton mimics a 3-col service card grid (6 ghost cards with Briefcase icons)
- Skeleton is blurred and non-interactive (`pointer-events-none select-none`)
