# Freelance Pages Workflow

Root: `src/app/freelance/`

---

## Layout & Auth Guard

`layout.tsx`

All `/freelance/*` routes are wrapped by:
- `RequireSession` — redirects unauthenticated users to `/?redirect=<encodedPath>`
- `SideBar` — shared sidebar navigation
- Content container: `bg-gray-50 min-h-screen pt-16 xl:pt-0 xl:ml-18`

---

## Dashboard (`/freelance`)

`page.tsx`

Read-only overview. No mutations.

**Data:** `['freelance', 'dashboard']` → `getFreelanceDashboard()`

### Sections

| Section | Content |
|---|---|
| Header | `profile.display_name` + availability dot |
| Metrics strip (mobile) | total_clients, total_services, total_earnings, upcoming_milestones |
| Metric cards (desktop, 4-col) | Same 4 values, glassmorphic cards |
| Recent Activity | `dashboard.recent_history[]` — service_type, client_name, date, value |
| Upcoming Milestones | `dashboard.upcoming_milestones[]` — title, client_name, type, due_date |
| Quick Links | → `/freelance/services`, `/freelance/clients`, `/freelance/portfolio` |

**Availability indicator:**

| Status | Display |
|---|---|
| `available` | Green dot |
| `busy` | Amber dot |
| `unavailable` | Red dot |

**Milestone types:** `deadline` (red), `booking` (blue), `follow_up` (amber)

`formatCurrency` uses `Intl.NumberFormat` with `maximumFractionDigits: 0`.

Loading state: inline "Loading…" text per section, no page-level spinner.

---

## Services (`/freelance/services`)

`services/page.tsx`

Full CRUD for service offerings across three pricing models.

### State

| State | Type | Purpose |
|---|---|---|
| `filter` | `'all' \| 'active' \| 'paused' \| 'archived'` | Active filter tab |
| `formMode` | `null \| 'create' \| 'edit'` | Controls ServiceForm modal |
| `editTarget` | `FreelanceServiceRecord \| null` | Service being edited |
| `expandedId` | `string \| null` | Which service card is expanded |
| `deleteConfirmId` | `string \| null` | Controls delete confirm modal |

### Data Fetching

| Query key | API | Purpose |
|---|---|---|
| `['freelance', 'services', filter]` | `listFreelanceServices({ status?, limit: 100 })` | Main list |
| `['freelance', 'services', 'all-count']` | `listFreelanceServices({ limit: 200 })` | Tab count badges only |

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Create | `createFreelanceService(payload)` | `['freelance', 'services']`, `['freelance', 'dashboard']` |
| Update | `updateFreelanceService(id, payload)` | `['freelance', 'services']` |
| Delete | `deleteFreelanceService(id)` | `['freelance', 'services']` |

### ServiceForm Fields

| Field | Type | Notes |
|---|---|---|
| `title` | `string` | Required — only field with submit guard |
| `category` | `string` | |
| `description` | `string` | |
| `pricing_model` | `'fixed' \| 'hourly' \| 'tiered'` | Controls which price fields are shown |
| `base_price` | `string` | Only for `fixed` |
| `hourly_rate` | `string` | Only for `hourly` |
| `min_hours` | `string` | Only for `hourly` |
| `max_hours` | `string` | Only for `hourly` |
| `tiers` | `ServiceTier[]` | Only for `tiered`; pre-seeded with Basic + Pro |
| `add_ons` | `ServiceAddOn[]` | Available for all models |
| `status` | `'active' \| 'paused' \| 'archived'` | |

**`formToPayload` logic:** `base_price` set only for `fixed` (else `null`); `hourly_rate/min_hours/max_hours` set only for `hourly` (else omitted); `tiers` set only for `tiered` (else `[]`).

### Service Card

Click header row → expand / collapse (`expandedId`). Expanded view shows: description, tiered breakdown chips, add-on pills, **Edit** → opens `ServiceForm` pre-filled, **Delete** → opens delete confirm modal.

---

## Clients (`/freelance/clients`)

`clients/page.tsx`

Two-view CRM: list and client detail with history timeline.

### State

| State | Type | Purpose |
|---|---|---|
| `view` | `'list' \| 'detail'` | Active view |
| `selectedClient` | `FreelanceClientRecord \| null` | Client in detail view |
| `formMode` | `null \| 'create' \| 'edit'` | Controls ClientForm modal |
| `deleteConfirmId` | `string \| null` | Delete confirm modal |
| `search` | `string` | Client-side filter |

**Data:** `['freelance', 'clients']` → `listFreelanceClients({ limit: 200 })`

Client-side filter: `c.name.includes(search) || c.company.includes(search)`

### Client Mutations

| Action | API | Invalidates | Side effect |
|---|---|---|---|
| Create | `createFreelanceClient(payload)` | `['freelance', 'clients']`, `['freelance', 'dashboard']` | Closes form |
| Update | `updateFreelanceClient(id, payload)` | `['freelance', 'clients']` | Syncs `selectedClient` if currently viewed |
| Delete | `deleteFreelanceClient(id)` | `['freelance', 'clients']`, `['freelance', 'dashboard']` | Returns to list if in detail view |

**ClientForm fields:** `name*`, `email`, `phone`, `company`, `notes`. Submit disabled if `!form.name`.

### Client Detail (`ClientDetail`)

`selectedClient` is kept live by reading `clients.find(c => c.id === selectedClient.id) ?? selectedClient` from the cached list — no separate detail query.

**History state inside `ClientDetail`:**

| State | Type | Purpose |
|---|---|---|
| `historyMode` | `null \| 'create' \| 'edit'` | Controls HistoryForm |
| `editEntry` | `HistoryEntry \| null` | Entry being edited |
| `deleteEntryId` | `string \| null` | Delete confirm for a history entry |

History sorted descending by date before render.

### History Mutations

| Action | API | Invalidates |
|---|---|---|
| Add entry | `addHistoryEntry(clientId, payload)` | `['freelance', 'clients']`, `['freelance', 'dashboard']` |
| Update entry | `updateHistoryEntry(clientId, id, payload)` | `['freelance', 'clients']` |
| Delete entry | `deleteHistoryEntry(clientId, id)` | `['freelance', 'clients']` |

**HistoryForm fields:**
- `date*` — ISO date, pre-filled to today
- `service_type*`
- `description`
- `value` — number
- `deliverables[]` — added via Enter key or "Add" button

Submit disabled if `!form.service_type || !form.date`.

### TimelineEntry

Local `expanded: boolean` per entry. Fade-slide-in animation staggered by `index * 60ms`. Expanded → shows `MediaVault`.

### Media Vault (`MediaVault`)

Nested inside each `TimelineEntry`. Manages file uploads, visibility, and invoice generation for a single history entry.

| State | Purpose |
|---|---|
| `uploading` | Upload in-progress guard |
| `uploadVisibility: 'internal' \| 'public'` | Visibility for next upload |

| Action | API | Notes |
|---|---|---|
| Upload | `uploadHistoryMedia(clientId, entryId, file, visibility)` | Manual async (not `useMutation`); `accept="image/*"` |
| Toggle visibility | `updateMediaVisibility(clientId, entryId, mediaId, { visibility })` | Calls `onRefresh` on success |
| Delete media | `deleteHistoryMedia(clientId, entryId, mediaId)` | Calls `onRefresh` on success |
| Generate invoice | `generateInvoice(clientId, entryId)` | `window.open(data.invoice_url)` |

Media items show a **Public / Internal** visibility badge. Hover reveals toggle + delete overlay buttons.

---

## Calendar (`/freelance/calendar`)

`calendar/page.tsx`

Dual-view milestone tracker: **Month** grid and **List** view.

### State

| State | Type | Purpose |
|---|---|---|
| `viewMode` | `'month' \| 'list'` | Active view |
| `currentYear` | `number` | Initialized to today's year |
| `currentMonth` | `number` | Initialized to today's month (0-indexed) |
| `formMode` | `null \| 'create' \| 'edit'` | Controls MilestoneForm modal |
| `editTarget` | `FreelanceMilestone \| null` | Milestone being edited |
| `defaultDate` | `string \| undefined` | Pre-fills due date when creating from a day click |
| `deleteConfirmId` | `string \| null` | Delete confirm modal |

### Data Fetching

| Query key | API | Notes |
|---|---|---|
| `['freelance', 'milestones', from, to]` | `listFreelanceMilestones({ from, to })` | `from`/`to` = first/last day of current month (`YYYY-MM-DD`). Re-fetches on month change. |
| `['freelance', 'clients']` | `listFreelanceClients({ limit: 200 })` | Populates client dropdown in form only |

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Create | `createFreelanceMilestone(payload)` | `['freelance', 'milestones']`, `['freelance', 'dashboard']` |
| Update | `updateFreelanceMilestone(id, payload)` | `['freelance', 'milestones']` |
| Delete | `deleteFreelanceMilestone(id)` | `['freelance', 'milestones']` |

### Month Navigation

`prevMonth()` / `nextMonth()` handle year rollover (month 0 → year−1 month 11, month 11 → year+1 month 0). **Today** button resets to actual today.

### MonthCalendar

- `milestonesByDate: Record<string, FreelanceMilestone[]>` via `useMemo`
- 7-column Sun–Sat grid, offset by `firstDayOfMonth` empty cells
- Today: brand gradient background + filled circle
- Up to **3 milestones** per cell as colored mini-buttons; overflow → "+N more"
- **Day click** → sets `defaultDate` + opens create form
- **Milestone click** → opens edit form (`stopPropagation` prevents day-click from also firing)

### ListView

All milestones sorted ascending by `due_date`. Cancelled milestones: `line-through`. Edit / Delete icon buttons per row.

### MilestoneForm Fields

| Field | Type | Notes |
|---|---|---|
| `title` | `string` | Required |
| `description` | `string` | |
| `client_id` | `string \| null` | Dropdown from `clientsQ` |
| `due_date` | `string` | Required; pre-filled from `defaultDate` or today |
| `type` | `'deadline' \| 'booking' \| 'follow_up'` | |
| `status` | `'pending' \| 'completed' \| 'cancelled'` | Only shown when editing |

Submit disabled if `!form.title || !form.due_date`.

**Color system:**

| Type | Color | Status | Style |
|---|---|---|---|
| `deadline` | Red | `pending` | Neutral |
| `booking` | Blue | `completed` | Emerald |
| `follow_up` | Amber | `cancelled` | Neutral + strikethrough |

---

## Portfolio (`/freelance/portfolio`)

`portfolio/page.tsx`

Public-facing profile editor. Three distinct sections.

### State

| State | Type | Purpose |
|---|---|---|
| `heroFormOpen` | `boolean` | Controls HeroForm modal |
| `togglingId` | `string \| null` | ID of showcase entry with in-flight anonymize toggle |
| `photoUploading` | `boolean` | Upload in-progress guard |
| `photoDeleting` | `boolean` | Delete in-progress guard |

**Data:** `['freelance', 'portfolio']` → `getFreelancePortfolio()`

Full-page loading / error states (returns early).

### Section 1 — Hero Card

Gradient border wrapper. Contains: profile photo (16×16 rounded square), availability badge, bio, skills pills, **Edit** button → opens HeroForm.

**Photo operations (manual async, not `useMutation`):**

| Action | API | Cache update |
|---|---|---|
| Upload | `uploadPortfolioPhoto(file)` | `qc.setQueryData(['freelance', 'portfolio'], ...)` directly |
| Delete | `deletePortfolioPhoto()` | Same direct cache-set pattern (no invalidate) |

### HeroForm Fields

| Field | Type | Notes |
|---|---|---|
| `bio` | `string` | Initialized from `portfolio.bio` |
| `skills` | `string` | Comma-joined from `portfolio.skills[]`; split on save |
| `availability` | `'available' \| 'busy' \| 'unavailable'` | |

On submit: splits `skills` by comma, trims, filters empty strings into array.

Mutation: `updateFreelancePortfolio(payload)` → invalidates `['freelance', 'portfolio']` + `['freelance', 'dashboard']`, closes form.

### Section 2 — Work Showcase

Auto-populated from `portfolio.showcase_entries[]` (backend generates from client history entries with `public` media). Read-only except anonymize toggle.

Each entry shows: service type, client name (or "Anonymous Client"), date, description, up to 3 thumbnail images in 3-col grid.

**Anonymize toggle** (Eye / EyeOff): `updateShowcaseEntry(entryId, { anonymize_client })` → invalidates portfolio. `togglingId` disables the button while in-flight (per-entry guard).

### Section 3 — Skill Verification Badges

`portfolio.skill_badges[]` — auto-generated by backend. Read-only.

Each badge: skill name + count of verified records (`linked_entry_ids.length`).

---

## Inquiries (`/freelance/inquiries`)

`inquiries/page.tsx`

Inbox for inbound messages from personal users.

### State

| State | Type | Purpose |
|---|---|---|
| `statusFilter` | `'all' \| 'pending' \| 'read' \| 'replied' \| 'closed'` | Active filter tab |
| `expandedId` | `string \| null` | Expanded inquiry card |
| `replyTarget` | `FreelanceEnquiry \| null` | Controls ReplyModal |
| `successMsg` | `string \| null` | "Reply sent!" banner, auto-clears after 3500ms |

**Data:** `['freelance', 'enquiries', statusFilter]` → `listFreelanceEnquiries({ status?, limit: 50 })`

Each filter tab is a separate cache entry.

### Mutations

All use optimistic `qc.setQueryData` before `invalidateQueries` to prevent stale data flash.

| Action | API | Invalidates | Trigger |
|---|---|---|---|
| Reply | `replyToEnquiry(id, { reply })` | All `['freelance', 'enquiries']` variants | ReplyModal submit |
| Close | `updateEnquiryStatus(id, { status: 'closed' })` | All `['freelance', 'enquiries']` variants | Close button in card |
| Mark read | `updateEnquiryStatus(id, { status: 'read' })` | All `['freelance', 'enquiries']` variants | **Auto-fires** when a `pending` card is expanded |

### Auto-Mark-as-Read

When a card is toggled open (`isOpening === true`) and `enq.status === 'pending'`, `markReadMutation.mutate(enq.id)` fires immediately — no user action required.

### EnquiryCard

Pending: `border-amber-200 ring-1 ring-amber-100` + brand-colored icon.

Expanded body: full `message` (pre-wrapped), existing `reply` in emerald bubble with `replied_at` date.

**Action buttons (shown when expanded):**

| Condition | Button |
|---|---|
| Not replied | **Reply** (gradient) |
| Already replied | **Send Another Reply** (outline) |
| Not closed | **Close Inquiry** (outline) — disabled per-item via `closeMutation.variables === enq.id` |
| Closed | No action buttons |

### ReplyModal

Local `reply: string` state. Shows original subject + message preview (line-clamped to 3 lines). Submit disabled if `!reply.trim()`.

`pendingCount` and per-tab counts derived client-side from loaded data.

---

## Navigation Summary

| Path | Component | Entry point |
|---|---|---|
| `/freelance` | Dashboard | Sidebar (Home) |
| `/freelance/services` | Service catalog (CRUD) | Sidebar |
| `/freelance/clients` | Client CRM (list → detail) | Sidebar |
| `/freelance/calendar` | Milestone calendar / list | Sidebar |
| `/freelance/portfolio` | Public portfolio editor | Sidebar |
| `/freelance/inquiries` | Inquiry inbox | Sidebar |

---

## Data Dependencies

```
dashboard
  ├── reads from: services (total), clients (total), milestones (upcoming)
  └── invalidated by: createService, deleteService, createClient, deleteClient,
                      addHistoryEntry, createMilestone, updatePortfolio

portfolio.showcase_entries
  └── auto-populated from: client history entries with public media

portfolio.skill_badges
  └── auto-generated by backend from history entries
```

---

## Shared Patterns

| Pattern | Where used |
|---|---|
| Submit guard on required fields | ServiceForm (`title`), ClientForm (`name`), HistoryForm (`service_type + date`), MilestoneForm (`title + due_date`), ReplyModal (`reply`) |
| Delete confirm modal (fixed overlay) | Services, Clients, History entries, Milestones |
| Optimistic `qc.setQueryData` before invalidate | Inquiries (all mutations) |
| Direct `qc.setQueryData` without invalidate | Portfolio photo upload/delete |
| `placeholderData` / live-sync from list cache | ClientDetail (reads from `['freelance', 'clients']` cache) |
| Per-item in-flight guard | `togglingId` (portfolio anonymize), `isClosing` (inquiries close button) |
| Auto-dismiss success message | Inquiries: `successMsg` cleared after 3500ms |
| Manual async (not `useMutation`) | Portfolio photo upload/delete, MediaVault upload |
