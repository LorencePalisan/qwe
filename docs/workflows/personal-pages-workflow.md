# Personal Pages Workflow

Root: `src/app/personal/`

---

## Layout & Auth Guard

`layout.tsx`

All `/personal/*` routes are wrapped by:
- `RequireSession` — redirects unauthenticated users to `/?redirect=<encodedPath>`
- `SideBar` — rendered on the left; content offset with `xl:ml-18`
- Brand gradient `bg-gradient-to-t from-[#ff5f6d] to-[#ffc371]` inherited by all child pages

---

## Home Feed (`/personal`)

`page.tsx` + `PersonalGallery.tsx`

### PersonalGallery (top of page)
Full-width landscape photo carousel.

| Feature | Detail |
|---|---|
| Max photos | 20 |
| Upload guard | `< 15 MB`, landscape orientation only (`naturalHeight > naturalWidth`) |
| Upload flow | `optimizeImage(file)` → `uploadGalleryPhoto()` → invalidates `['personal', 'gallery']` |
| Delete | Confirm dialog → `deleteGalleryPhoto(id)` → optimistic cache removal, adjusts `activeIdx` |
| Navigation | Chevrons + 4-thumbnail filmstrip |

### Home Feed Sections (horizontal scroll)

| Section | Query key | Data source | On click |
|---|---|---|---|
| Quick Nav | — | Static icons | `router.push(href)` |
| Featured Businesses | `['personal', 'businesses']` | `listDiscoverableBusinesses()` | Opens `BusinessDetailClient` inline |
| Notifications | `['personal', 'notifications', 'pending']` | `listNotifications({ status: 'pending' })` | — |
| Connections | `['personal', 'connections', 'accepted']` | `listConnections({ status: 'accepted' })` | — |
| Events | `['personal', 'events', 'explore']` | `exploreEvents()` | — |
| Communities | `['personal', 'communities', 'discover']` | `discoverCommunities()` | `router.push('/personal/community/discover')` (uses `activeTab` state) |
| Agencies | `['personal', 'agencies', 'home']` | `listApprovedAgencies()` | `router.push('/personal/agency/:id')` |
| Freelancers | `['personal', 'freelancers']` | `listApprovedFreelancers({ limit: 12 })` | `router.push('/personal/freelance/:id')` |

**Inline Business Detail:** Clicking a business card sets `activeBusinessId` and calls `window.history.pushState(null,'','/personal/business/:id')`. Closing calls `window.history.pushState(null,'','/personal')` and clears `activeBusinessId`.

---

## Profile (`/personal/profile`)

`profile/page.tsx` + `profile/otp-auth.tsx`

### Tabs
`activeTab: 'profile' | 'security'`

### Profile Tab — Editable Sections

Each section is independently editable with an Edit/Cancel/Save flow and its own `isSaving` guard.

| Section | Fields | API call |
|---|---|---|
| Basic Info | name, username, bio, location | `updateProfileBasic()` |
| Contact | phone, website, address | `updateContactInfo()` |
| Social Links | instagram, twitter, facebook, linkedin, tiktok | `updateSocialLinks()` |
| Interests | tag strings | `apiAddInterest(tag)` / `apiDeleteInterest(tag)` |

**Avatar upload:** file input → `< 2 MB` → `uploadProfileAvatar(file)` → `qc.setQueryData`
**Banner upload:** file input → `< 5 MB` → `uploadProfileBanner(file)` → `qc.setQueryData`

Query key: `['personal', 'profile']` → `getProfile()`

### Security Tab — OTP Auth Card (`otp-auth.tsx`)

`step: 'idle' | 'enter_phone' | 'enter_otp' | 'enabled'`

| Step | Action | API |
|---|---|---|
| idle | Enable OTP button | — |
| enter_phone | Submit phone | `requestOtp(phone)` → moves to `enter_otp`, starts 60s cooldown |
| enter_otp | 6-digit input + verify | `verifyAndEnableOtp({ phone, code })` → moves to `enabled` |
| enabled | Disable button | `disableOtp()` → moves to `idle` |

- OTP input: Arrow/Backspace keyboard nav, paste strips non-digits and auto-distributes
- Resend after 60s cooldown (`setInterval`)
- Query key: `['personal', 'security', 'otp']` → `getOtpStatus()`

---

## Accounts (`/personal/accounts`)

`accounts/page.tsx`

Displays all 6 account types. Users can apply for new ones via `OpenAccountModal`.

| Account Type | Locked | Documents required |
|---|---|---|
| Personal | yes (auto-approved) | none |
| Freelance | no | govt_id, proof_of_skill |
| Business | no | privacy_policy, business_permit, tax_document |
| Community | no | org_charter, sec_registration, tax_exempt |
| Organizer | no | business_permit, tax_document, liability_insurance |
| Agency | no | business_permit, tax_document, agency_accreditation |

**State:** `openModal: string | null`, `pendingTypes: Set<string>` (optimistic local), `successType: string | null`
**Data:** `useSessionQuery()` → `session.roles`, `session.pendingAccountTypes`
**Mutation:** `useAddAccountTypeMutation()`

---

## Activity (`/personal/activity`)

`activity/page.tsx`

Period tabs: **Today**, **This Week**, **This Month** (`activeTab` state)

- Query: `['personal', 'activities']` → `listActivities()`
- Client-side filter: `activity.period === activeTab`
- Summary stat cards: `subscriptions`, `follows`, `involved_actions`
- Delete: `deleteActivity(id)` with optimistic cache update

---

## Connections (`/personal/connections`)

`connections/page.tsx` + `connections/chatroom.tsx`

### Tabs
`tab: 'connections' | 'rooms'`

### Connections Tab

**Sub-sections:**
- **Incoming Pending** (`direction !== 'outgoing'`): Accept / Reject buttons → `respondToConnection(id, action)`
- **My Connections** (accepted): Remove button → `removeConnection(id)`, Edit Tags → `updateConnectionTags`
- **Sent Requests** (outgoing pending): shown for visibility only

**Tag presets:** Family, Friends, Work, School

**User Search:**
- `showSearch` state toggles search panel
- Query: `['personal', 'users', 'search', debouncedQuery]` → `searchUsers(query)` (enabled when `query.length >= 2`)
- 400ms debounce

Data: `['personal', 'connections']` → `listConnections()`

### Rooms Tab

Data: `['personal', 'chat-rooms']` → `listChatRooms()`

**Actions:** Create Room (`showCreateRoom` → `CreateRoomModal`), Click room → sets `activeRoom` → full-page `ChatView` overlay

### ChatView (`chatroom.tsx`)

- Messages: `['personal', 'chat-rooms', room.id, 'messages']` → `getChatRoomMessages(room.id)`, `refetchInterval: 5000`
- Send: Enter key or button → `sendMessage()`; Shift+Enter = newline
- Invite: `showInvite` → `InviteModal` → `inviteToRoom()`
- Leave: `leaveRoom()` → removes from cache → calls `onBack()`
- `isMine()`: checks `msg.sender_id === numericUserId` OR `msg.sender_name === displayName`
- Messages auto-scroll to bottom on new messages

---

## Community (`/personal/community`)

`community/page.tsx` + `community/show.tsx` + `community/chatroom.tsx`

Single-page shell. No route changes — uses `view` state and `whodini:navigate` CustomEvent.

`view: 'list' | 'show' | 'chatroom'`

### Tab 1 — Forums

`CommunityForumSection` per joined community:
- Query: `['personal', 'community', community.id, 'chat-rooms']` per community
- Click room → writes `whodini:selected-chatroom` to sessionStorage (communityId, communityName, communityImage, initialRoomId, origin) → `view = 'chatroom'`

### Tab 2 — Discover

**Filters:**
- Category pills: Technology, Business, Creative, Marketing, Finance, Leadership, Regional (+ All)
- Scope toggle: All / Joined
- Search: 400ms debounce, separate `searchQuery` state
- Query: `['personal', 'community', 'discover', discoverCategory, searchQuery]` → `discoverCommunities()`

**Card actions:**

| Button | Condition | Action |
|---|---|---|
| Follow / Unfollow | — | `followCommunity` / `unfollowCommunity`, invalidates discover cache |
| Join | public, not member | `joinCommunity()` |
| Leave | member | `leaveCommunity()` |
| Inquire | private, not member | Opens send-inquiry modal + switches to Inquiries tab |
| View | — | Writes `whodini:selected-community` to sessionStorage → `view = 'show'` |

### Tab 3 — Inquiries

- Filter pills: All, Pending, Read, Replied, Closed
- Query: `['personal', 'community', 'enquiries', enquiryFilter]` → `listMyCommunityEnquiries()`
- Each inquiry card shows subject, status badge, reply thread if status = `replied`

### Community Show (`show.tsx`)

Reads `communityId` from sessionStorage on mount.

- Detail: `['personal', 'community', 'detail', communityId]`
- Events: `['personal', 'community', 'events', communityId, eventsTab]` (`eventsTab: 'recent' | 'upcoming'`)
- Join/Leave (public). Private non-members see locked warning.
- Send inquiry → `sendCommunityEnquiry()`
- Back → `whodini:navigate { path: '/community' }`
- Open forum → writes sessionStorage → `whodini:navigate { path: '/community/chatroom' }`

### Community Chatroom (`chatroom.tsx`)

Reads `whodini:selected-chatroom` from sessionStorage on mount.

- Rooms: `['personal', 'community', communityId, 'chat-rooms']`
- Messages: `['personal', 'community', communityId, 'chat-rooms', room.id, 'messages']`, `refetchInterval: 5000`
- Auto-selects `initialRoomId` from sessionStorage on mount
- Send: `sendPersonalCommunityChatMessage()`
- Leave: `leavePersonalCommunityChatRoom()` → back
- Back → `whodini:navigate` to `/community` or `/community/show` based on `chatroomData.origin`
- Members shown in horizontal strip with role badges

---

## Business (`/personal/business`)

`business/page.tsx` + `business/[businessId]/BusinessDetailClient.tsx` + `business/enquiries.tsx`

### Discover Tab

- Query: `['personal', 'business-rewards', search]` → `listDiscoverableBusinesses({ search })`
- Click card → sets `activeBusinessId` + `window.history.pushState` → renders `BusinessDetailClient` inline
- Subscribe button (disabled once subscribed): `subscribeToBusiness(id)`
- Inquire button → opens `EnquiryModal`

### My Inquiries Tab

- Query: `['personal', 'business-enquiries', statusFilter]` → `listMyBusinessEnquiries()`
- Status filter pills. Each `InquiryCard` is collapsible.

### Business Detail (`BusinessDetailClient.tsx`)

Used both as:
1. Standalone route `/personal/business/:id`
2. Inline via `businessIdProp` prop

SPA deep-link: `rawBusinessId === 'preview'` reads `sessionStorage.getItem('whodini_nav__business')`. URL restored via `window.history.replaceState`.

- Detail: `['personal', 'business', businessId]` → `getDiscoverableBusinessDetail()`
- Catalog: `['personal', 'business', businessId, 'catalog', catalogTab]` → `listBusinessPublicCatalog()`
- `catalogTab: 'all' | 'service' | 'product'`
- Subscribe / Unsubscribe, Send inquiry (header or per catalog item)
- Back → calls `onClose()` or `router.back()`

### My Rewards (`/personal/business/my-rewards`)

`business/my-rewards/page.tsx`

Tabs: **Browse Rewards** (category filter) / **Voucher History**

- Category query: `['personal', 'rewards', 'categories']` → `listRewardCategories()`
- Rewards query: `['personal', 'rewards', 'list', resolvedCategory]` → `listRewards()`
- History query: `['personal', 'rewards', 'history']` → `listRedemptionHistory()`
- Actions: Redeem (`redeemReward(id)`), Mark Used (`updateRedemptionRecord(id, 'used')`), Remove (`deleteRedemptionRecord(id)`)

---

## Freelance (`/personal/freelance`)

`freelance/page.tsx` + `freelance/[freelancerId]/FreelancerProfileClient.tsx`

### Browse Tab

- Query: `['personal', 'freelancers']` → `listApprovedFreelancers({ limit: 100 })`
- Client-side filters: availability (`all` / `available` / `busy`), search by name or skills
- Card click → `router.push('/personal/freelance/:id')`
- Inquire button (disabled for `unavailable`) → opens inquiry modal → `sendEnquiry(id, payload)`

### My Inquiries Tab

- Query: `['personal', 'freelance', 'enquiries']` → `listMyEnquiries({ limit: 50 })`

### Freelancer Profile (`FreelancerProfileClient.tsx`)

`/personal/freelance/[freelancerId]`

SPA deep-link: `routeParam === 'preview'` reads `sessionStorage.getItem('whodini_nav__freelancer')`. URL restored via `window.history.replaceState`.

- Query: `['personal', 'freelancer', freelancerId]` → `getPublicFreelancer(freelancerId)`
- Shows: avatar, availability badge, bio, skills, stats, showcase grid
- Send inquiry → `sendEnquiry(freelancerId, payload)`
- Back → `router.push('/personal/freelance')`

---

## Agencies (`/personal/agencies`)

`agencies/page.tsx` + `agencies/detail.tsx` + `agencies/enquiries.tsx`

> Note: `/personal/agency` is a redirect stub → `router.replace('/personal/agencies')`.

### Agency List

- Query: `['personal', 'agencies']` → `listApprovedAgencies()`
- Client-side filters: search (name, category, city), scope (All / Following)
- Pagination: 50 per page with ellipsis
- Click → sets `activeAgencyId` → renders `AgencyDetail` inline
- Follow/Unfollow: optimistic `qc.setQueryData` on both `['personal', 'agency', id]` and `['personal', 'agencies']`

### My Inquiries Tab

- Query: `['personal', 'agency-enquiries']` → `listMyAgencyEnquiries()`
- Each `InquiryCard` collapsible, `expandedEnquiryId` state

### Agency Detail (`agencies/detail.tsx`)

Used both via `/personal/agency/[agencyId]` (SPA deep-link pattern) and inline in the agencies list.

SPA deep-link: `rawAgencyId === 'preview'` reads `sessionStorage.getItem('whodini_nav__agency')`.

- Detail: `['personal', 'agency', id]` → `getAgencyPublicDetails(id)`
- Services: `['personal', 'agency', id, 'services']` → `getAgencyPublicServices(id)`
- Follow/Unfollow, Send inquiry (header or per service card)
- `onBack()` prop to return to list

---

## Events (`/personal/events`)

`events/page.tsx` redirects → `/personal/events/my-events`

Tab layout (`events/(tabs)/layout.tsx`): **My Events** | **Registrations** (Discover and Organizers tabs are commented out)

### My Events (`(tabs)/my-events/page.tsx`)

- Query: `['personal', 'events', 'mine']` → `listMyEvents()`
- Past events (`date < today midnight`) filtered out client-side
- Business events: Register / Cancel → `registerForEvent` / `unregisterFromEvent`
- Community events: Register / Cancel → `registerForCommunityEvent` / `unregisterFromCommunityEvent`
- Empty state → `router.push('/personal/business')` or `router.push('/personal/community')`

### Registrations (`(tabs)/registrations/page.tsx`)

Filter tabs: **All**, **Upcoming** (registered), **Attended**, **Cancelled**

- Query: `['personal', 'events', 'registrations', filter]` → `listMyEventRegistrations({ status?, limit: 50 })`
- Past registrations (`daysUntil < 0`) filtered client-side
- Each row has `ticketOpen` state → `TicketModal` with styled ticket UI (gradient header, perforation decoration, first 12 chars of UUID uppercased)
- `DaysLeftBadge`: Today / Xd left / Xd ago

### Discover Organizer Events (`(tabs)/discover/page.tsx`)

- Query: `['personal', 'events', 'explore', searchDebounced]` → `exploreEvents({ source: 'organizer', search? })`
- Events grouped by `organizer_id` using `Map`, rendered as `OrganizerSection`
- Register / Unregister per event; "View all" → `/personal/organizers/?=${org.id}`
- `isFull` check: `registrations >= capacity`

### Discover Organizers (`(tabs)/organizers/page.tsx`)

- Query: `['personal', 'organizers', searchDebounced]` → `listOrganizers({ search? })`
- Send inquiry modal → `sendOrganizerEnquiry(id, payload)`
- "View Profile" → `/personal/organizers/?=${org.id}`
- "My Inquiries" → `/personal/events/organizers/inquiries`

### Organizer Inquiries (`(tabs)/organizers/inquiries/page.tsx`)

Filter tabs: **All**, Pending, Read, Replied, Closed

- Query: `['personal', 'organizer', 'inquiries', filter]` → `listMyOrganizerEnquiries({ status?, limit: 50 })`
- Each `InquiryCard` collapsible (auto-expanded if `status === 'replied'`)
- Messages > 120 chars truncated with "Show more" toggle
- Reply block (emerald-styled) shown when `status === 'replied' && inquiry.reply`

---

## Organizer Profiles (`/personal/organizers`)

`organizers/page.tsx` + `organizers/[id]/OrganizerPreviewClient.tsx`

> `/personal/organizers?id=<uuid>` is used instead of `/personal/organizers/:id` to avoid RSC payload loop in static export mode.

SPA deep-link: `rawId === 'preview'` reads `sessionStorage.getItem('whodini_nav__organizer')`. URL restored via `window.history.replaceState`.

- ID resolution priority: `params.id` (route param) → `searchParams.get('')` (query param)
- Profile: `['personal', 'organizer', id, 'profile']` → `getOrganizerPublicProfile(id)`
- Events tab (`activeTab: 'upcoming' | 'past'`): `['personal', 'organizer', id, 'events', activeTab]` → `getOrganizerPublicEvents(id, { status })`
- Event cards show capacity progress bar (`registrations/capacity * 100%`)
- `formatLocationLabel()`: In Person / Virtual / Hybrid
- Send inquiry modal → `sendOrganizerEnquiry(id, payload)` → success toast auto-clears after 4s
- Back → `router.back()`

---

## Subscriptions (`/personal/subscription`)

`subscription/page.tsx` + `subscription/show.tsx`

`view: 'list' | 'show'`, `selectedSubscription`

### List View

- Query: `['personal', 'subscriptions', searchTerm]` → `listSubscriptions(searchTerm)`
- Stat cards: `meta.active_count`, `meta.notifications_enabled_count`
- Toggle Notifications (Bell on/off): `toggleNotifications(id, !enabled)`
- View Details → `view = 'show'`
- Leave (unsubscribe): `unsubscribeFromBusiness(id)` → invalidates cache
- Logo renders initials if `logo_url` is null

### Detail View (`show.tsx`)

- Query: `['personal', 'subscriptions', subscription.id]` → `getSubscriptionDetail(id)` with `placeholderData: subscription`
- Benefits list, recent activity feed, toggle notifications, unsubscribe
- Activity icons: event → Calendar, discount → Gift, announcement → Mail
- `onClose()` → returns to list view

---

## Memberships (`/personal/membership`)

`membership/page.tsx` + `membership/show.tsx`

### List View

Multi-select community cards.

- Query: `['personal', 'membership', 'communities', 'mine']` → `getMyCommunities()`
- Click card → toggle `selected: Set<string>`
- Select All / Deselect All toggle
- **Leave Selected** (bulk) — appears when `selected.size > 0` — calls `leaveMutation.mutate(id)` for each
- Per-card **Leave** button: `e.stopPropagation()` then `leaveCommunity(id)` with optimistic cache update

### Detail View (`show.tsx`)

`ShowMembershipItem` — discriminated by `item.type === 'community' | 'event'`

- Community: `getCommunityDetail()` with `placeholderData`, Join/Leave
- Event: `getEventDetail()` with `placeholderData`, Register/Unregister (hidden if `attended`)
- `onClose()` → returns to list

---

## Notifications (`/personal/notification`)

`notification/page.tsx` + `notification/show.tsx`

No route changes — uses `whodini:navigate` CustomEvent.

### List (`notification/page.tsx`)

Tabs: **Unread** (`pending`) | **Read** (`expired`)

- Query: `['personal', 'notifications']` → `listNotifications()`
- Delete: `deleteNotification(id)` with optimistic update removing from both `pending` and `expired` arrays
- View: writes `whodini:selected-notification` to sessionStorage → dispatches `whodini:navigate { path: '/notifications/show' }`
- Expired notifications show disabled "Expired" button

**Icon by type:** `promotion` → Gift (red), `event` → Calendar (blue), `announcement` → Bell (orange)

### Detail (`notification/show.tsx`)

Reads `whodini:selected-notification` from sessionStorage on mount.

- Query: `['personal', 'notifications', notificationId]` → `getNotificationDetail(notificationId)`
- Auto-mark as read: `markNotificationRead(notificationId)` fires once when detail loads and `!data.read_at`
- Shows relationship badge: "From followed source" or "From subscribed source"
- Back → `whodini:navigate { path: '/notifications' }`

---

## Games (`/personal/games`)

`games/page.tsx`

**Coming Soon** placeholder. Renders blurred skeleton (stat cards, daily challenges, game cards) with a `bg-white/60 backdrop-blur-[2px]` overlay. `pointer-events-none`, `aria-hidden` on skeleton. No state, no data fetching.

---

## Navigation Summary

| Path | Component | Entry mechanism |
|---|---|---|
| `/personal` | Home feed | Direct |
| `/personal/profile` | Profile + Security tabs | Sidebar |
| `/personal/accounts` | Account type manager | Sidebar (Accounts) |
| `/personal/activity` | Activity history | Sidebar |
| `/personal/connections` | Connections + Chat | Sidebar |
| `/personal/community` | Community shell (view state) | Sidebar |
| `/personal/business` | Business discovery | Sidebar |
| `/personal/business/my-rewards` | Voucher rewards | Back-nav from business detail |
| `/personal/freelance` | Freelancers browse | Sidebar |
| `/personal/freelance/[id]` | Freelancer profile | Card click |
| `/personal/agencies` | Agencies browse | Sidebar |
| `/personal/agency/[id]` | Agency detail (stub → agencies) | SPA deep-link |
| `/personal/events/my-events` | My events | Sidebar (Events) |
| `/personal/events/registrations` | Registration history | Tab |
| `/personal/events/discover` | Discover organizer events | Tab (hidden) |
| `/personal/events/organizers` | Discover organizers | Tab (hidden) |
| `/personal/events/organizers/inquiries` | Organizer inquiries | Link from organizers tab |
| `/personal/organizers?id=<uuid>` | Organizer profile | Card click |
| `/personal/subscription` | Subscriptions | Sidebar |
| `/personal/membership` | Memberships | Sidebar |
| `/personal/notification` | Notifications | — |
| `/personal/games` | Coming soon | Sidebar |

---

## SessionStorage Keys Used Across Personal Pages

| Key | Set by | Read by | Purpose |
|---|---|---|---|
| `whodini:selected-community` | `community/page.tsx` | `community/show.tsx` | Community ID for inline show view |
| `whodini:selected-chatroom` | `community/page.tsx`, `community/show.tsx` | `community/chatroom.tsx` | Chat context (communityId, name, image, initialRoomId, origin) |
| `whodini:selected-notification` | `notification/page.tsx` | `notification/show.tsx` | Notification ID for inline detail view |
| `whodini_nav__freelancer` | SPA router (`/`) | `FreelancerProfileClient.tsx` | Real freelancer UUID for deep-link |
| `whodini_nav__business` | SPA router (`/`) | `BusinessDetailClient.tsx` | Real business UUID for deep-link |
| `whodini_nav__agency` | SPA router (`/`) | `AgencyDetailClient.tsx` | Real agency UUID for deep-link |
| `whodini_nav__organizer` | SPA router (`/`) | `OrganizerPreviewClient.tsx` | Real organizer UUID for deep-link |

---

## Custom Events Used Across Personal Pages

| Event name | Dispatched by | Handled by | `detail` payload |
|---|---|---|---|
| `whodini:navigate` | `community/page.tsx`, `community/show.tsx`, `community/chatroom.tsx`, `notification/page.tsx`, `notification/show.tsx` | `community/page.tsx` | `{ path: string }` |
| `whodini:open-account-type` | Any page | `SideBar.tsx` | `{ accountTypeId: string }` |
