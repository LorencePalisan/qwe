# Community Pages Workflow

Root: `src/app/community/`

---

## Layout & Auth Guard

`layout.tsx`

All `/community/*` routes are wrapped by:
- `RequireSession` — redirects unauthenticated users to `/?redirect=<encodedPath>`
- `SideBar` — shared sidebar navigation
- Content container: `bg-gray-50 min-h-screen pt-16 xl:pt-0 xl:ml-18`

---

## Dashboard (`/community`)

`page.tsx`

Read-only overview. No mutations.

### Data Fetching

| Query key | API | Purpose |
|---|---|---|
| `['community', 'dashboard']` | `getCommunityDashboard()` | Metrics + community identity |
| `['community', 'chapters']` | `listChapters()` | Chapter summary list |
| `['community', 'chat-rooms']` | `listChatRooms()` | Active rooms list |

**Dashboard fields:** `community_name`, `whodini_id`, metrics: `total_members`, `total_chapters`, `total_events`

**Helpers:**
- `timeAgo(dateString)` — human-relative timestamps (e.g. "3 days ago")
- `categoryColor(category)` — maps category string to Tailwind color classes

### Sections

| Section | Content |
|---|---|
| Metrics cards | total_members, total_chapters, total_events |
| Chapters list | Each chapter: name, member count, category badge |
| Chat rooms list | Recent rooms with last activity via `timeAgo()` |

Loading state: per-section inline "Loading…", no page spinner.

---

## Members (`/community/members`)

`members/page.tsx`

Two-view member management: list and invite/edit forms.

### State

| State | Type | Purpose |
|---|---|---|
| `view` | `'list' \| 'create' \| 'show' \| 'update'` | Active view |
| `selectedMember` | `CommunityMemberRecord \| null` | Member in detail/edit view |
| `search` | `string` | Client-side name filter |
| `chapterFilter` | `string` | Filter by chapter (from chaptersQ) |

### Data Fetching

| Query key | API | Purpose |
|---|---|---|
| `['community', 'members']` | `listMembers({ limit: 200 })` | Main member list |
| `['community', 'chapters']` | `listChapters()` | Chapter dropdown for filter |

Client-side filter applied to `m.name` (search) and `m.chapter_name` (chapter filter).

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Invite | `inviteMember({ whodini_id, role, chapter_name })` | `['community', 'members']`, `['community', 'dashboard']` |
| Update | `updateMember(id, { role, chapter_name })` | `['community', 'members']` |

**Role colors:**
- `leader` → brand gradient
- `moderator` → amber
- default → blue

**Invite form fields:** `whodini_id*`, `role` (select), `chapter_name` (select from chapters).

---

## Chapters (`/community/chapters`)

`chapters/page.tsx`

Two-panel layout. Left: active detail/form. Right: scrollable chapter list with search + New button.

**Layout:** `h-[calc(100vh-4rem)] xl:h-screen overflow-hidden`
- Left panel: `flex-1 overflow-y-auto`
- Right panel: `w-72 shrink-0 border-l overflow-y-auto`

### State

| State | Type | Purpose |
|---|---|---|
| `mode` | `'detail' \| 'create' \| 'update' \| 'add-member'` | Active panel mode |
| `selectedChapter` | `ChapterRecord \| null` | Chapter in detail view |
| `search` | `string` | Filters right-panel chapter list |

### Data Fetching

| Query key | API | Purpose |
|---|---|---|
| `['community', 'chapters']` | `listChapters()` | Right-panel list |
| `['community', 'members', chapter.name]` | `listMembers({ chapter: chapter.name })` | Members shown in ChapterDetail (enabled only when `selectedChapter` is set) |

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Create chapter | `createChapter(payload)` | `['community', 'chapters']`, `['community', 'members']` |
| Update chapter | `updateChapter(id, payload)` | `['community', 'chapters']`, `['community', 'members']` |
| Assign member | `updateMember(memberId, { chapter_name })` | `['community', 'chapters']`, `['community', 'members']` |

### ChapterDetail

Shows:
- **Leadership card:** Crown icon for `leader_name`, Shield icon for `vice_leader_name`, initials chip for each officer in `officers[]`
- **Team members:** fetched from `listMembers({ chapter: chapter.name })`; avatar initials + name + role badge

### AddMemberPanel

Fetches all members from `['community', 'members']`, then filters to those where `m.chapter_name !== chapter.name` (or unassigned). Assign via `assignMutation`.

### Chapter Form Fields

| Field | Notes |
|---|---|
| `name` | Required |
| `description` | |
| `leader_name` | |
| `vice_leader_name` | |
| `officers[]` | `{ name, role }` — roles: Secretary, Treasurer, Events Coordinator, Communications Officer, Membership Officer, Other |

> **Note:** `/community/team/` redirects to `/community/chapters/` via `router.replace`. The Team sidebar link has been removed.

---

## Events (`/community/events`)

`events/page.tsx`

Full lifecycle event management.

### State

| State | Type | Purpose |
|---|---|---|
| `view` | `'list' \| 'create' \| 'show' \| 'update'` | Active view |
| `selectedEvent` | `CommunityEvent \| null` | Event in detail/edit view |

**Data:** `['community', 'events']` → `listCommunityEvents()`

### Event Status

| Status | Meaning |
|---|---|
| `upcoming` | Future event |
| `ongoing` | Currently in progress |
| `completed` | Past event |
| `cancelled` | Cancelled |
| `postponed` | Rescheduled |

### Mutations

| Action | API | Notes |
|---|---|---|
| Create | `createCommunityEvent(payload)` | Invalidates `['community', 'events']` |
| Update | `updateCommunityEvent(id, payload)` | Includes `status` field |
| Postpone | `updateCommunityEvent(id, { status: 'postponed' })` | From dropdown menu |
| Cancel | `cancelCommunityEvent(id)` | `window.confirm` gate before mutating |
| Delete | `deleteCommunityEvent(id)` | `window.confirm` gate before mutating |

**Card actions:** Dropdown menu with Postpone / Cancel / Delete. Each destructive action guarded by `window.confirm`.

**Card shows:** title, date/time, location, `attendeeCount` / `capacity`, status badge.

---

## Message Board (`/community/message-board`)

`message-board/page.tsx`

Room-based live chat. Room list on left, inline ChatView on right.

### State

| State | Type | Purpose |
|---|---|---|
| `selectedRoom` | `ChatRoom \| null` | Active chat room |
| `createRoomOpen` | `boolean` | CreateRoomModal visibility |
| `inviteOpen` | `boolean` | InviteModal visibility (private rooms only) |

### Data Fetching

| Query key | API | Notes |
|---|---|---|
| `['community', 'chat-rooms']` | `listChatRooms()` | Room list |
| `['community', 'chat-rooms', room.id, 'messages']` | `getChatMessages(room.id)` | Messages in active room; `refetchInterval: 5000` |

Messages sorted ascending by `sent_at` before render.

### Room Creation

**CreateRoomModal fields:** `name*`, `description`, `privacy` toggle (public / private). If private: `member_ids[]` select from members query.

Public rooms auto-add all community members on creation. Private rooms require explicit member selection.

### InviteModal

Only available for private rooms. Fetches `listRoomMembers(room.id)` and `listMembers()`, then filters to members NOT already in the room. Invite via `inviteToRoom(room.id, { member_ids })`.

### ChatView

| Feature | Detail |
|---|---|
| `isMine(msg)` | Checks `msg.sender_id === currentUser.id` OR `msg.sender_name === currentUser.name` |
| Send | Enter key submits; `sendMessage(room.id, { content })` |
| Members strip | Horizontal avatar row showing room members |
| Leave room | Optimistic cache filter (removes room from list) → `leaveRoom(room.id)` → `onBack()` |

---

## Inquiries (`/community/inquiries`)

`inquiries/page.tsx`

Inbox for inbound messages from personal users. Identical pattern to business inquiries.

### State

| State | Type | Purpose |
|---|---|---|
| `statusFilter` | `'all' \| 'pending' \| 'read' \| 'replied' \| 'closed'` | Active filter tab |
| `expandedId` | `string \| null` | Expanded inquiry card |
| `replyTarget` | `CommunityEnquiry \| null` | Controls ReplyModal |
| `successMsg` | `string \| null` | "Reply sent!" banner, auto-clears after 3500ms |

**Data:** `['community', 'enquiries', statusFilter]` → `listCommunityEnquiries({ status?, limit: 50 })`

### Mutations

All use optimistic `qc.setQueryData` before `invalidateQueries`.

| Action | API | Invalidates | Trigger |
|---|---|---|---|
| Reply | `replyToCommunityEnquiry(id, { reply })` | All `['community', 'enquiries']` variants | ReplyModal submit |
| Close | `updateCommunityEnquiryStatus(id, { status: 'closed' })` | All `['community', 'enquiries']` variants | Close button in card |
| Mark read | `updateCommunityEnquiryStatus(id, { status: 'read' })` | All `['community', 'enquiries']` variants | **Auto-fires** when a `pending` card is expanded |

### Auto-Mark-as-Read

When a card is toggled open (`isOpening === true`) and `enq.status === 'pending'`, `markReadMutation.mutate(enq.id)` fires immediately — no user action required.

**ReplyModal:** local `reply: string` state; submit disabled if `!reply.trim()`.

---

## Directory (`/community/directory`)

`directory/page.tsx`

Shared resources and links CRUD.

### State

| State | Type | Purpose |
|---|---|---|
| `view` | `'list' \| 'create' \| 'show' \| 'update'` | Active view |
| `selectedEntry` | `DirectoryEntry \| null` | Entry in detail/edit view |
| `search` | `string` | Client-side filter |
| `categoryFilter` | `string` | Category filter (derived from loaded entries) |

**Data:** `['community', 'directory']` → `listDirectoryEntries()`

### DirectoryEntry Fields

| Field | Notes |
|---|---|
| `title` | Required |
| `description` | |
| `category` | Dropdown: Guidelines / Resources / Directory / Tools / Events + dynamic categories from entries |
| `resourceType` | |
| `url` | |
| `tags[]` | |
| `status` | |

**Client-side filter:** matches `title`, `description`, `resourceType`, or `tags[]` against `search`. Category filter is a separate client-side select derived from unique categories in loaded entries.

**Card UX:** "Visit Resource" link uses `e.stopPropagation()` to prevent triggering the card's expand/select click handler.

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Create | `createDirectoryEntry(payload)` | `['community', 'directory']` |
| Update | `updateDirectoryEntry(id, payload)` | `['community', 'directory']` |
| Delete | `deleteDirectoryEntry(id)` | `['community', 'directory']` |

---

## History / Audit Trail (`/community/history`)

`history/page.tsx`

Community milestone timeline. Create-only (no edit or delete).

### State

| State | Type | Purpose |
|---|---|---|
| `view` | `'list' \| 'create'` | Active view |
| `formData` | `{ title, description, date, category, impact }` | Create form state |

**Data:** `['community', 'milestones']` → `listMilestones()`

Milestones sorted **descending** by `date` before render.

### CommunityMilestone Shape

`recordToMilestone(r: MilestoneRecord)` maps `r.community_label` → `communityLabel`.

Fields: `id`, `title`, `description`, `date`, `category`, `impact`, `communityLabel`

### Mutations

| Action | API | Invalidates |
|---|---|---|
| Create | `createMilestone({ title, date, category, description, impact })` | `['community', 'milestones']` |

Submit guard: `!formData.title.trim() || !formData.date`. On success: resets form, returns to `'list'` view.

### Categories

| Category | Color |
|---|---|
| `Foundation` | Brand red (`bg-[#ff5f6d] text-white`) |
| `Growth` | Green |
| `Events` | Blue |
| `Partnerships` | Purple |
| `Expansion` | Orange |
| `Programs` | Indigo |

### Timeline

- Vertical gradient line: `bg-gradient-to-b from-[#ff5f6d] to-[#ffc371]`
- Each entry: brand-dot, card with title, date, description, impact row (TrendingUp icon)

---

## Services (`/community/services`)

`services/page.tsx`

**Coming Soon placeholder.** No API calls. Blurred 6-card skeleton grid behind a centered overlay with Clock icon + "In Progress" badge. Same pattern as Business Team page.

---

## Settings (`/community/settings`)

`settings/page.tsx`

shadcn `Tabs` with 2 tabs: **General** and **Notifications**. Delegates rendering to sub-components.

---

### Settings — General

`settings/general.tsx`

Manual async (no React Query). Settings loaded via `useEffect` on mount.

#### State

| State | Purpose |
|---|---|
| `settings: FormState` | Full settings form (name, description, email, phone, website, privacy, logo_url, banner_url) |
| `isLoading` | Initial load guard |
| `isSaving` | Save in-progress guard |
| `isUploadingLogo / isUploadingBanner` | Upload in-progress guards |
| `error / success` | Inline status messages (no auto-dismiss) |
| `uploadError` | Separate error for image upload failures |

#### Image Uploads

| Upload | API | Size limit | On success |
|---|---|---|---|
| Banner | `uploadCommunityBanner(file)` | 5 MB | Updates `settings.banner_url` in local state |
| Logo | `uploadCommunityLogo(file)` | 2 MB | Updates `settings.logo_url` in local state |

Accepted types: JPEG, PNG, WEBP, GIF. Hidden `<input type="file">` triggered via refs (`bannerInputRef`, `logoInputRef`).

**Banner layout:** `h-36` full-width clickable area; hover overlay shows "Upload Banner" / "Change Banner" text.

**Logo layout:** `w-16 h-16 rounded-xl -bottom-6 left-4` absolutely positioned to overlap the banner bottom-left; `ring-4 ring-white`.

Images upload immediately on file pick (not on form save).

#### Form Fields

| Field | Type |
|---|---|
| `name` | text |
| `description` | textarea |
| `email` | email |
| `phone` | text |
| `website` | text |
| `privacy` | Two-button segmented control: `public` (Globe) / `private` (Lock) |

**Privacy description text:** public → "Any Whodini personal user can discover and join"; private → "Only users with a direct invite can join."

**Save:** `updateCommunityGeneralSettings({ name, description, email, phone, website, privacy })` — images are excluded (uploaded separately).

---

### Settings — Notifications

`settings/notifications.tsx`

Manual async (no React Query). List reloads on `searchTerm`/`filterType` change via 250ms `window.setTimeout` debounce.

#### Compose Form

| Field | Type | Notes |
|---|---|---|
| `title` | text | Required |
| `message` | textarea | Required |
| `type` | select | announcement / event / urgent / general |
| `audience` | select | all_members / chapter_members |
| `chapter` | select | Only shown when audience = `chapter_members`; currently hardcoded to `COMMUNITY_CHAPTERS` list |
| `scheduledTime` | datetime-local | Optional |
| `actionUrl` | text | Optional |

**Quick Blast presets:**
- `update` → sets type=announcement, pre-fills title/message
- `event` → sets type=event, pre-fills title/message

**Preview toggle:** `showPreview` state renders a notification card mockup inline.

**Submit:** `createCommunityNotification({ title, message, type, audience, scheduled_time, action_url })`
- `scheduled_time` → converts `scheduledTime` string to ISO via `new Date().toISOString()`; `null` if empty
- Success message: "Notification scheduled successfully" (if scheduled) or "Notification sent successfully"

#### Notification History List

| Feature | Detail |
|---|---|
| Search | 250ms debounced; passed as `search` param to `listCommunityNotifications` |
| Type filter | Passed as `type` param to `listCommunityNotifications` |
| View Details | `getCommunityNotification(id)` → `window.alert(status, opened, clicked, time)` |
| Delete | `window.confirm` gate; `deleteCommunityNotification(id)`; sent notifications cannot be deleted |

**Type badge classes:** announcement=brand, event=orange, urgent=red, general=blue

**Audience badge classes:** all_members=neutral, chapter_members=cyan

**`displayTimestamp`:** uses `sent_at ?? scheduled_time`

---

## Navigation Summary

| Path | Component | Entry point |
|---|---|---|
| `/community` | Dashboard | Sidebar (Home) |
| `/community/members` | Member list + invite/edit | Sidebar |
| `/community/chapters` | Two-panel chapter management | Sidebar |
| `/community/events` | Event CRUD | Sidebar |
| `/community/message-board` | Live room-based chat | Sidebar |
| `/community/inquiries` | Inquiry inbox | Sidebar |
| `/community/directory` | Resource links CRUD | Sidebar |
| `/community/history` | Milestone audit trail | Sidebar |
| `/community/services` | Coming Soon | Sidebar |
| `/community/settings` | General + Notifications settings | Sidebar |
| `/community/team` | → redirects to `/community/chapters` | (decommissioned) |

---

## Data Dependencies

```
dashboard
  ├── reads from: members (total), chapters (total), events (total)
  └── invalidated by: inviteMember, createChapter, deleteChapter

chapters
  └── invalidated by: createChapter, updateChapter, assignMember (updateMember)

members
  └── invalidated by: inviteMember, updateMember (chapter assign)

milestones (history)
  └── create-only; no edit/delete mutations exist

portfolio.showcase_entries (portfolio)
  └── auto-populated from client history entries with public media
```

---

## Shared Patterns

| Pattern | Where used |
|---|---|
| Submit guard on required fields | Chapters (`name`), Milestones (`title + date`), Invite (`whodini_id`), ReplyModal (`reply`) |
| `window.confirm` before destructive action | Events: Cancel, Delete |
| Optimistic `qc.setQueryData` before invalidate | Inquiries (all mutations) |
| Manual async (no `useMutation`/React Query) | Settings General (load + save + images), Settings Notifications (load + send + delete) |
| 250ms debounce for search/filter | Notifications history list |
| Auto-dismiss success message | Inquiries: `successMsg` cleared after 3500ms |
| Auto-mark-read on expand | Inquiries: `pending` cards auto-update when opened |
| Two-panel fixed-height layout | Chapters: `h-[calc(100vh-4rem)] xl:h-screen overflow-hidden` |
| Coming Soon overlay | Services page |
| Redirect (decommissioned route) | `/community/team` → `router.replace('/community/chapters')` |
| `refetchInterval` polling | Message Board messages: 5000ms |
| `e.stopPropagation()` on nested links | Directory: "Visit Resource" link inside card click handler |
| Per-entry in-flight guard | `isMine()` in ChatView; `isUploadingLogo`/`isUploadingBanner` in Settings General |
