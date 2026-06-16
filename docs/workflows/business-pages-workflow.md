# Business Pages Workflow

Root: `src/app/business/`

---

## Layout & Auth Guard

`layout.tsx`

All `/business/*` routes are wrapped by:
- `RequireSession` — redirects unauthenticated users to `/?redirect=<encodedPath>`
- `SideBar` — shared sidebar navigation
- Content container: `bg-gray-50 min-h-screen pt-16 xl:pt-0 xl:ml-18`

---

## Overview / Dashboard (`/business`)

`page.tsx` → re-exports `overview/page.tsx`

Read-only catalog overview. No mutations.

**Data:**

| Query key | API | Purpose |
|---|---|---|
| `['business', 'dashboard']` | `getBusinessDashboard()` | Business name, digital ID, flagship product |
| `['business', 'overview', activeTab]` | `listOverview(activeTab)` | Filtered products/services list |

### Tabs

`activeTab: 'all' | 'services' | 'products'`

### Stats (derived from `meta` or client-side fallback)

| Stat | Source |
|---|---|
| Total Items | `meta.total` |
| Services | `meta.services` |
| Products | `meta.products` |
| Featured | `meta.featured` |
| Avg Price | `meta.avg_price` |

### Catalog Card

Each product/service card shows: type pill (service = blue, product = rose), Flagship badge (if `flagshipId === product.id`), name, description, price, category tag.

---

## Services & Products (`/business/services`)

`services/page.tsx` + `services/create.tsx` + `services/show.tsx` + `services/update.tsx`

Full CRUD for the catalog. Items are polymorphic: `type: 'service' | 'product'`.

### State

| State | Type | Purpose |
|---|---|---|
| `activeTab` | `'all' \| 'services' \| 'products'` | Filter tab |
| `searchQuery` | `string` | Text search (passed to API) |
| `categoryFilter` | `string` | Category filter dropdown |
| `brandFilter` | `string` | Brand filter dropdown |
| `createOpen` | `boolean` | Controls `CreateServiceForm` modal |
| `showItem` | `ServiceCatalogItem \| null` | Controls `ShowServiceItem` modal |
| `editItem` | `ServiceCatalogItem \| null` | Controls `UpdateServiceForm` modal |

### Data Fetching

| Query key | API | Notes |
|---|---|---|
| `['business', 'brands']` | `listBrands()` | Populates brand filter dropdown |
| `['business', 'catalog', 'items', search, tab, category, brand]` | `listCatalogItems(filters)` | All filters passed to API |

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Create | `createCatalogItem(payload)` | `['business', 'catalog']`, `['business', 'dashboard']` |
| Update | `updateCatalogItem(id, payload)` | `['business', 'catalog']`, `['business', 'dashboard']` |
| Delete | `deleteCatalogItem(id)` | `['business', 'catalog']`, `['business', 'dashboard']` |

### ServiceCatalogItem Shape

| Field | Notes |
|---|---|
| `title` | Required |
| `description` | |
| `type` | `'service' \| 'product'` |
| `price` | Number |
| `duration` | String (e.g. "per hour") |
| `status` | `'active' \| 'featured' \| 'premium'` |
| `features` | `string[]` — up to 2 shown as badges, overflow "+N" |
| `brandId` | Optional link to a brand |
| `imageUrl` | Optional; falls back to placeholder icon |
| `categoryId` | |
| `rating` | Read-only |
| `clients` | Read-only |

### Card Actions

Each card: **Edit** → `UpdateServiceForm`, **View** → `ShowServiceItem`, **Delete** → `deleteMut.mutate(id)` (no confirm modal).

---

## Brands (`/business/brands`)

`brands/page.tsx` + `brands/create.tsx` + `brands/show.tsx` + `brands/update.tsx`

Parent categories for catalog items. Accordion list with inline item preview.

### State

`view: 'list' | 'create' | 'show' | 'update'`, `selectedBrand`, `expandedId`

### Data Fetching

| Query key | API | Notes |
|---|---|---|
| `['business', 'brands']` | `listBrands()` | List + meta (total_brands, total_items, unassigned_items) |
| `['business', 'brands', selectedBrand?.id \| expandedId]` | `getBrand(id)` | Enabled when `view === 'show'` OR a row is expanded |

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Create | `createBrand({ name, category })` | `['business', 'brands']`, `['business', 'dashboard']` |
| Update | `updateBrand(id, { name, category })` | Same |
| Delete | `deleteBrand(id)` | Same |

### Accordion Behavior

Clicking a brand row toggles `expandedId`. When expanded, `detailQ` fetches `getBrand(id)` and renders each linked item as a mini-row (title, type badge, price).

### Views

`create` / `update` → centered form overlay (max-w-lg). `show` → `ShowBrand` with items list and Edit button. Delete fires directly from the list row without a confirm modal.

---

## Events (`/business/events`)

`events/page.tsx` + `events/create.tsx` + `events/show.tsx` + `events/update.tsx`

Full CRUD for business events with advertise toggle.

### State

`view: 'list' | 'create' | 'show' | 'update'`, `selectedEvent`, `filterStatus`, `search`

### Data Fetching

| Query key | API | Purpose |
|---|---|---|
| `['business', 'dashboard']` | `getBusinessDashboard()` | `brandName` for display |
| `['business', 'events']` | `listBusinessEvents()` | All events (client-side filtered) |

### Client-Side Filters

- `filterStatus: 'all' | 'upcoming' | 'past'` — `deriveStatus(startsAt)` compares to `new Date()`
- `search` — title, description, category (case-insensitive)
- Events sorted ascending by `startsAt`

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Create | `createBusinessEvent(payload)` | `['business', 'events']`, `['business', 'dashboard']` |
| Update | `updateBusinessEvent(id, payload)` | Same |
| Delete | `deleteBusinessEvent(id)` | Same |
| Toggle Advertise | `toggleEventAdvertised(id, !current)` | Same |

### BusinessEvent Shape

| Field | Type |
|---|---|
| `title` | `string` |
| `description` | `string` |
| `startsAt` | ISO datetime |
| `endsAt` | ISO datetime (optional) |
| `locationType` | `'in_person' \| 'virtual' \| 'hybrid'` |
| `locationLabel` | `string` |
| `paymentType` | `'free' \| 'paid'` |
| `price` | `number` |
| `capacity` | `number` (0 = unlimited) |
| `category` | `string` |
| `organizerLabel` | `string` |

**Advertise badge:** shown on cards when `isAdvertised` (`recordById.get(id)?.is_advertised`).

---

## Subscribers (`/business/subscribers`)

`subscribers/page.tsx` + `subscribers/contact.tsx`

Paginated subscriber list with search and remove.

### State

`page`, `searchInput`, `searchQuery` (debounced 400ms), `contactTarget`

### Data Fetching

`['business', 'subscribers', searchQuery, page]` → `listSubscribers({ search?, page, limit: 20 })`

Meta: `total_pages`, `total`

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Remove | `removeSubscriber(id)` | `['business', 'subscribers']` |
| Contact (Email) | `contactSubscriber(id, { subject, message })` | `['business', 'subscribers']` |

> The Email button is currently commented out in the UI. Only Remove is active.

### SubscriberRow Fields

`id`, `name`, `email`, `digital_id`, `subscribed_at`, `tier` (`premium` = brand gradient badge, `standard` = blue), `status` (`active` = green, `cancelled` = neutral)

### Pagination

`pageNumbers` computed via `useMemo` with delta=2 (shows ±2 pages around current). Prev/Next chevron buttons. Search resets `page` to 1.

---

## Inquiries (`/business/inquiries`)

`inquiries/page.tsx`

Inbox for inbound messages from personal users.

### State

| State | Type | Purpose |
|---|---|---|
| `statusFilter` | `'all' \| 'pending' \| 'read' \| 'replied' \| 'closed'` | Active filter tab |
| `expandedId` | `string \| null` | Expanded inquiry card |
| `replyTarget` | `BusinessEnquiry \| null` | Controls ReplyModal |
| `successMsg` | `string \| null` | "Reply sent!" banner, auto-clears after 3500ms |

**Data:** `['business', 'enquiries', statusFilter]` → `listBusinessEnquiries({ status?, limit: 50 })`

### Mutations

All use optimistic `qc.setQueryData` before `invalidateQueries`.

| Action | API | Trigger |
|---|---|---|
| Reply | `replyToBusinessEnquiry(id, { reply })` | ReplyModal submit |
| Close | `updateBusinessEnquiryStatus(id, { status: 'closed' })` | Close button in card |
| Mark read | `updateBusinessEnquiryStatus(id, { status: 'read' })` | **Auto-fires** when a `pending` card is expanded |

### EnquiryCard

Pending: `border-amber-200 ring-1 ring-amber-100` + brand icon.

Expanded actions (not shown when `closed`):

| Condition | Button |
|---|---|
| `status !== 'replied'` | **Reply** (gradient) |
| `status === 'replied'` | **Send Another Reply** (outline) |
| Not closed | **Close Inquiry** (disabled per-item via `closeMutation.variables`) |

### ReplyModal

Fixed overlay. Shows subject + message preview (3-line clamp). Submit disabled if `!reply.trim()`.

`pendingCount` derived client-side from loaded data.

---

## Notifications (`/business/notifications`)

`notifications/page.tsx`

Compose and send notifications to subscribers.

### State

`formData` (compose form), `showPreview`, `searchTerm`, `filterType`, `blastType: 'marketing' | 'promo' | null`

### Data Fetching

`['business', 'notifications', searchTerm]` → `listBusinessNotifications({ search? })`

### Stats (computed from `notificationRows`)

`totalDelivered`, `totalOpened`, `avgOpenRate` (%), `avgClickRate` (%)

### Compose Form Fields

| Field | Type | Notes |
|---|---|---|
| `title` | `string` | Required |
| `message` | `string` | Required |
| `type` | `'informational' \| 'promotional' \| 'urgent' \| 'event'` | |
| `audience` | `'all_subscribers' \| 'new_subscribers'` | `location_based` and `premium_only` exist in the type but aren't exposed in the UI dropdown |
| `locationRadius` | `string` | Shown only for `location_based` audience |
| `scheduledTime` | `string` | Optional; changes button label to "Schedule Notification" |
| `actionUrl` | `string` | Optional |
| `imageUrl` | `string` | Optional (field exists but not in form UI) |

**Mail Blast presets:** Marketing Blast (informational, all_subscribers) / Promo Blast (promotional, all_subscribers) — pre-fills title and message if empty.

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Send | `createBusinessNotification(payload)` | `['business', 'notifications']`; resets form |
| Delete | `deleteBusinessNotification(id)` | `['business', 'notifications']` |

**Notification history:** Search by title/message + filter by type. Each row shows delivered/opened/clicked counts and rates.

---

## History (`/business/history`)

`history/page.tsx`

Read-only activity timeline.

**Data:** `['business', 'history', searchTerm, filterType, filterImportance]` → `listHistory({ search?, type?, importance? })`

### Filters

| Filter | Options |
|---|---|
| Search | Text (title/description) |
| Event type | subscriber_added, subscriber_removed, notification_sent, sale_completed, team_member_added, milestone_reached |
| Importance | high (destructive badge), medium (outline), low (secondary) |
| Date period | All time, Today, This Week (7d), This Month (30d) — client-side only |

### Stats

| Stat | Source |
|---|---|
| Total Events | `meta.total` ?? client-count |
| Today | `meta.today` ?? client-filter |
| This Week | `meta.this_week` ?? client-filter |
| This Month | `meta.this_month` ?? client-filter |

### Event Icons by Type

| Type | Icon | Color |
|---|---|---|
| `subscriber_added` | UserPlus | green |
| `subscriber_removed` | UserMinus | red |
| `notification_sent` | Bell | blue |
| `sale_completed` | ShoppingCart | green |
| `team_member_added` | UserPlus | blue |
| `settings_changed` | Settings | gray |
| `content_updated` | FileText | orange |
| `review_received` | Star | yellow |
| `milestone_reached` | TrendingUp | purple |

---

## Team (`/business/team`)

`team/page.tsx`

**Coming Soon** placeholder. Calls `getTeamStatus()` → `['business', 'team']`. Shows blurred skeleton (stat cards, member list) with `bg-white/60 backdrop-blur-[2px]` overlay. `pointer-events-none`, `aria-hidden` on skeleton. No mutations.

---

## Workspace (`/business/workspace`)

`workspace/page.tsx` + `workspace/[workspaceId]/WorkspaceBoardClient.tsx` + `workspace/_components/`

Document workspace system with kanban ticket boards and collaborator management.

### Workspace List (`/business/workspace`)

**Tabs:** My Workspaces | Invitations (badge with `pendingInviteCount`)

**Data:**

| Query key | API |
|---|---|
| `['business', 'workspaces']` | `listWorkspaces()` |
| `['business', 'workspace-invitations']` | `listInvitations()` |

**Workspace categories:** General, Legal, Finance, Marketing, HR, Operations, Design — each with a `categoryColor` and `dotColor` pair.

**Open workspace:** `window.history.pushState(null, '', '/business/workspace/:id')` + sets `activeWorkspaceId` → renders `WorkspaceBoardClient` inline.

**Create workspace:** Modal with `name*`, `description`, `category` select. `createWorkspace({ name, description, category, category_color, dot_color })` → optimistic prepend to `['business', 'workspaces']`.

**Invitations:** Accept → `acceptInvitationApi(id)` + optimistic status update + invalidate workspaces. Decline → `declineInvitationApi(id)` + optimistic update. Each invitation shows `fromBusiness.businessName`, workspace name, role, access (all tickets vs specific count), `invitedAt`.

### Workspace Board (`WorkspaceBoardClient`)

SPA deep-link: `rawWorkspaceId === '__loading__'` reads `sessionStorage.getItem('whodini_nav__workspace')`. URL restored via `window.history.replaceState`.

**Animated loading sequence** (2200ms) before data fetches become `enabled`.

**Data:**

| Query key | API | Notes |
|---|---|---|
| `['business', 'workspaces']` | `listWorkspaces()` | Reads `selectedWorkspace` from cache |
| `['business', 'workspace-tickets', workspaceId]` | `listTickets(id)` | `refetchInterval: 10_000` |
| `['business', 'workspace-collaborators', workspaceId]` | `listCollaborators(id)` | |

**Ticket visibility:** If `myAccess === 'specific'`, only tickets in `myTicketIds` are shown.

**Role permission matrix:**

| Action | owner | editor | reviewer | viewer |
|---|---|---|---|---|
| Change ticket status | ✓ | ✓ | — | — |
| Upload documents | ✓ | ✓ | — | — |
| Comment | ✓ | ✓ | ✓ | — |
| Create ticket | ✓ | ✓ | ✓ | ✓ |
| Invite collaborators | ✓ | — | — | — |
| Manage collaborators | ✓ | — | — | — |

**Ticket operations:**
- Create: `createTicketApi(wsId, { title, description, priority, due_date, tags })` → optional immediate doc upload
- Move status: `moveTicketStatusApi(wsId, ticketId, { status })` — `TicketConflictError` is handled
- Upload docs: `uploadDocuments(wsId, ticketId, files)` — files > `MAX_FILE_SIZE_BYTES` silently skipped
- Remove doc: `removeDocumentApi(wsId, ticketId, docId)`
- Invite collaborator: `inviteCollaboratorApi(wsId, payload)` (opens `InviteCollaboratorModal`)
- Update collaborator access: `updateCollaboratorAccessApi(wsId, collabId, payload)`
- Remove collaborator: `removeCollaboratorApi(wsId, collabId)`

**Ticket statuses** (from `static-data.ts`): rendered as kanban columns in `TicketBoard`.

---

## Settings (`/business/settings`)

`settings/page.tsx` + `settings/business-settings/*.tsx`

Four-tab settings panel.

**Tabs:** General | Business Documents | Subscription | API & Integrations

**Data:**

| Query key | API | Used by |
|---|---|---|
| `['business', 'profile']` | `getBusinessProfile()` | General tab |
| `['business', 'settings']` | `getBusinessSettings()` | Subscription + API tabs |

### Tab 1 — General (`GeneralSettingsTab`)

View/edit mode. Edit button shows form; Cancel resets; Save calls `updateBusinessProfile(payload)`.

**Form sections:**
- Business Banner (recommended 1200×400px, PNG/JPG up to 5MB; dimensions previewed via `Image.onload`)
- Business Logo (recommended 512×512px; warns if non-square or < 512px)
- Basic Info: `businessName*`, `description`, `category`
- Contact: `address`, `city`, `state`, `zipCode`, `country`, `phone`, `email`
- Online Presence: `website`, `facebook`, `instagram`, `youtube`, `twitter`, `tiktok`, `linkedin`

**Logo/Banner payload logic:**
- New file → `payload.logo_file = file` / `payload.banner_file = file`
- Remove → `payload.logo_url = ''` / `payload.banner_url = ''`

Mutation: `updateBusinessProfile(payload)` → invalidates `['business', 'profile']`.

### Tab 2 — Business Documents (`PrivacySettingsTab`)

Upload required business documents. Uses `getBusinessDocuments()` / `uploadDocuments()` / `deleteDocument()`. Each document type has its own upload block with existing file display, preview, and delete. Accepts PDF and image files.

### Tab 3 — Subscription (`SubscriptionSettingsTab`)

Reads `settingsQ.data?.subscription`. Mutation: `updateSubscriptionSettings(payload)` → direct `qc.setQueryData` on `['business', 'settings']` (no invalidate).

### Tab 4 — API & Integrations (`ApiSettingsTab`)

Reads `settingsQ.data?.api`. Fields: `webhook_url`, `rate_limit_enabled`, `api_logging`. Shows `api_key` (masked). Mutation: `updateApiSettings(payload)` → direct `qc.setQueryData`. Regenerate key: `regenerateApiKey()` → updates `api.api_key` in cache.

---

## Setup (`/business/setup`)

`setup/page.tsx`

Legacy demo form — same fields as General Settings but not connected to the API. `handleSubmit` just fires `alert('Business setup completed! (Demo)')`. Not linked from the sidebar.

---

## Navigation Summary

| Path | Component | Entry point |
|---|---|---|
| `/business` | Overview (catalog read-only) | Sidebar (Home) |
| `/business/services` | Services & Products CRUD | Sidebar |
| `/business/brands` | Brands CRUD | Sidebar |
| `/business/events` | Events CRUD | Sidebar |
| `/business/subscribers` | Subscriber list | Sidebar |
| `/business/inquiries` | Inquiry inbox | Sidebar |
| `/business/notifications` | Notification center | Sidebar |
| `/business/history` | Activity timeline | Sidebar |
| `/business/team` | Coming Soon | Sidebar |
| `/business/workspace` | Workspace list + board | Sidebar |
| `/business/workspace/:id` | Workspace board (SPA deep-link) | Workspace list row |
| `/business/settings` | Settings (4 tabs) | Sidebar |
| `/business/setup` | Legacy demo form | Not linked |

---

## SessionStorage Keys Used

| Key | Set by | Read by | Purpose |
|---|---|---|---|
| `whodini_nav__workspace` | SPA router (`/`) | `WorkspaceBoardClient` | Real workspace UUID for deep-link |

---

## Shared Patterns

| Pattern | Where used |
|---|---|
| Optimistic `qc.setQueryData` before invalidate | Inquiries (reply/close/mark-read), Workspaces (invite accept/decline) |
| Direct `qc.setQueryData` without invalidate | Settings subscription + API tabs |
| `window.history.pushState` for inline navigation | Events (list↔create/show/update), Workspace (list↔board) |
| Status badge auto-dismiss | Inquiries: `successMsg` cleared after 3500ms |
| Per-item in-flight guard | Subscribers remove, Workspace ticket status move |
| Delete without confirm modal | Catalog items, Brands, Business events |
| `refetchInterval` | Workspace tickets: 10s (background disabled) |
