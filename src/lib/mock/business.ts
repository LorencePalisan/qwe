const UP = "https://images.unsplash.com/photo-";

// ── Dashboard ─────────────────────────────────────────────────────────────────

export const BUSINESS_DASHBOARD = {
  businessName: "Neon Studios",
  whodiniId: "WH-BUS-0042",
  flagshipProductId: "cat1",
  stats: {
    totalItems: 18,
    services: 11,
    products: 7,
    featured: 3,
    avgPrice: 4200,
  },
};

// ── Catalog ───────────────────────────────────────────────────────────────────

export type CatalogItem = {
  id: string;
  title: string;
  description: string;
  type: "service" | "product";
  price: number;
  duration?: string;
  status: "active" | "featured" | "premium";
  features: string[];
  brandId: string;
  category: string;
  imageUrl?: string;
  rating: number;
  clients: number;
};

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "cat1", title: "Brand Identity Package", type: "service",
    description: "Complete brand identity — from logo to full brand guidelines.",
    price: 45000, duration: "2–4 weeks", status: "featured",
    features: ["Logo Design", "Brand Guidelines", "Color Palette", "Typography"],
    brandId: "br1", category: "Design", rating: 4.9, clients: 28,
    imageUrl: `${UP}1460925895917-afdab827c52f?w=400&q=80`,
  },
  {
    id: "cat2", title: "Social Media Kit", type: "product",
    description: "Ready-to-use templates for all major platforms.",
    price: 3500, status: "active",
    features: ["50+ Templates", "Editable PSD", "Story Frames"],
    brandId: "br1", category: "Design", rating: 4.7, clients: 54,
    imageUrl: `${UP}1611162616305-ad423e6af59d?w=400&q=80`,
  },
  {
    id: "cat3", title: "Website Design & Dev", type: "service",
    description: "Full website from wireframe to launch — custom and CMS-ready.",
    price: 120000, duration: "4–8 weeks", status: "premium",
    features: ["Custom Design", "CMS Integration", "SEO Setup", "Analytics"],
    brandId: "br2", category: "Web", rating: 4.8, clients: 17,
    imageUrl: `${UP}1517694712202-14dd9538aa97?w=400&q=80`,
  },
  {
    id: "cat4", title: "Photography Session", type: "service",
    description: "Professional brand photography for products and team.",
    price: 18000, duration: "1 day", status: "active",
    features: ["8 Hours", "200+ Edited Photos", "Commercial License"],
    brandId: "br2", category: "Photography", rating: 4.6, clients: 42,
    imageUrl: `${UP}1507003211169-0a1dd7228f2d?w=400&q=80`,
  },
  {
    id: "cat5", title: "Motion Graphics Pack", type: "product",
    description: "Animated intros, outros, and lower thirds — After Effects source included.",
    price: 5500, status: "active",
    features: ["After Effects Source", "Fully Editable", "4K Resolution"],
    brandId: "br1", category: "Design", rating: 4.5, clients: 31,
  },
  {
    id: "cat6", title: "Content Strategy", type: "service",
    description: "3-month content roadmap aligned to your brand voice and business goals.",
    price: 25000, duration: "1 week", status: "active",
    features: ["Editorial Calendar", "Topic Clusters", "Platform Strategy"],
    brandId: "br2", category: "Marketing", rating: 4.4, clients: 12,
  },
];

// ── Brands ────────────────────────────────────────────────────────────────────

export type Brand = {
  id: string;
  name: string;
  category: string;
  itemCount: number;
  color: string;
};

export const BRANDS: Brand[] = [
  { id: "br1", name: "Neon Core",   category: "Design",    itemCount: 9, color: "#7c3aed" },
  { id: "br2", name: "Studio Plus", category: "Media",     itemCount: 6, color: "#0ea5e9" },
  { id: "br3", name: "Brand Lab",   category: "Marketing", itemCount: 3, color: "#16a34a" },
];

// ── Events ────────────────────────────────────────────────────────────────────

export type BusinessEvent = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt?: string;
  locationType: "in_person" | "virtual" | "hybrid";
  locationLabel: string;
  paymentType: "free" | "paid";
  price: number;
  capacity: number;
  category: string;
  organizerLabel: string;
  isAdvertised: boolean;
};

export const BUSINESS_EVENTS: BusinessEvent[] = [
  {
    id: "bev1", title: "Brand Masterclass 2026",
    description: "An intensive 1-day workshop on building powerful brands in the digital age.",
    startsAt: "2026-07-15T09:00:00", endsAt: "2026-07-15T18:00:00",
    locationType: "in_person", locationLabel: "BGC, Taguig City",
    paymentType: "paid", price: 3500, capacity: 80, category: "Workshop",
    organizerLabel: "Neon Studios", isAdvertised: true,
  },
  {
    id: "bev2", title: "Design Systems Summit",
    description: "Virtual summit on design systems, component libraries, and scalable UI.",
    startsAt: "2026-08-02T13:00:00",
    locationType: "virtual", locationLabel: "Zoom",
    paymentType: "free", price: 0, capacity: 500, category: "Conference",
    organizerLabel: "Neon Studios", isAdvertised: false,
  },
  {
    id: "bev3", title: "Portfolio Review Night",
    description: "Get your creative portfolio reviewed by industry professionals.",
    startsAt: "2026-06-20T18:30:00",
    locationType: "hybrid", locationLabel: "Ortigas + Online",
    paymentType: "paid", price: 500, capacity: 30, category: "Networking",
    organizerLabel: "Neon Studios", isAdvertised: true,
  },
];

// ── Subscribers ───────────────────────────────────────────────────────────────

export type Subscriber = {
  id: string;
  name: string;
  email: string;
  digitalId: string;
  subscribedAt: string;
  tier: "premium" | "standard";
  status: "active" | "cancelled";
};

export const SUBSCRIBERS: Subscriber[] = [
  { id: "sub1", name: "Maria Santos",  email: "maria@email.com",  digitalId: "WH-0128", subscribedAt: "2026-01-14", tier: "premium",  status: "active" },
  { id: "sub2", name: "James Rivera",  email: "james@email.com",  digitalId: "WH-0203", subscribedAt: "2026-02-08", tier: "standard", status: "active" },
  { id: "sub3", name: "Priya Sharma",  email: "priya@email.com",  digitalId: "WH-0317", subscribedAt: "2026-02-21", tier: "premium",  status: "active" },
  { id: "sub4", name: "Carlos Mendez", email: "carlos@email.com", digitalId: "WH-0441", subscribedAt: "2026-03-05", tier: "standard", status: "cancelled" },
  { id: "sub5", name: "Emma Wilson",   email: "emma@email.com",   digitalId: "WH-0509", subscribedAt: "2026-03-19", tier: "standard", status: "active" },
  { id: "sub6", name: "Kai Tanaka",    email: "kai@email.com",    digitalId: "WH-0620", subscribedAt: "2026-04-02", tier: "premium",  status: "active" },
  { id: "sub7", name: "Olivia Brown",  email: "olivia@email.com", digitalId: "WH-0712", subscribedAt: "2026-04-18", tier: "standard", status: "active" },
  { id: "sub8", name: "Ryan Chen",     email: "ryan@email.com",   digitalId: "WH-0831", subscribedAt: "2026-05-03", tier: "premium",  status: "active" },
];

// ── Enquiries ─────────────────────────────────────────────────────────────────

export type BusinessEnquiry = {
  id: string;
  subject: string;
  message: string;
  fromName: string;
  fromEmail: string;
  status: "pending" | "read" | "replied" | "closed";
  createdAt: string;
  reply?: string;
  repliedAt?: string;
};

export const BUSINESS_ENQUIRIES: BusinessEnquiry[] = [
  {
    id: "enq1", subject: "Custom Web Design Quote",
    message: "Hi, I'm interested in a full website design and development for my restaurant. Can you provide a quote and timeline?",
    fromName: "Ana Reyes", fromEmail: "ana@restaurant.ph",
    status: "pending", createdAt: "2026-06-14T09:30:00",
  },
  {
    id: "enq2", subject: "Brand Package Inquiry",
    message: "We're launching a new product line and need complete branding. What does your Brand Identity Package include?",
    fromName: "Mark Torres", fromEmail: "mark@venture.com",
    status: "read", createdAt: "2026-06-13T14:15:00",
  },
  {
    id: "enq3", subject: "Photography Session Availability",
    message: "Are you available for a product photography session in July? We have about 50 SKUs.",
    fromName: "Lena Park", fromEmail: "lena@shop.co",
    status: "replied", createdAt: "2026-06-12T11:00:00",
    reply: "Hi Lena! Yes, we're available in July. Let's schedule a call to discuss details.",
    repliedAt: "2026-06-12T16:30:00",
  },
  {
    id: "enq4", subject: "Motion Graphics Quote",
    message: "I need 5 custom animated intros for my YouTube channel. What are your rates?",
    fromName: "Sam Lee", fromEmail: "sam@studio.net",
    status: "closed", createdAt: "2026-06-10T08:45:00",
  },
];

// ── Notifications ─────────────────────────────────────────────────────────────

export type NotificationRecord = {
  id: string;
  title: string;
  message: string;
  type: "informational" | "promotional" | "urgent" | "event";
  audience: "all_subscribers" | "new_subscribers";
  delivered: number;
  opened: number;
  clicked: number;
  sentAt: string;
};

export const NOTIFICATION_RECORDS: NotificationRecord[] = [
  {
    id: "notif1", title: "Brand Masterclass Early Bird",
    message: "Secure your spot for our Brand Masterclass on July 15! Early bird ends June 30.",
    type: "promotional", audience: "all_subscribers",
    delivered: 248, opened: 142, clicked: 38, sentAt: "2026-06-10T10:00:00",
  },
  {
    id: "notif2", title: "New Service: Motion Graphics Pack",
    message: "We've just launched our Motion Graphics Pack — 60+ animated assets for your brand.",
    type: "informational", audience: "all_subscribers",
    delivered: 240, opened: 128, clicked: 52, sentAt: "2026-06-05T09:00:00",
  },
  {
    id: "notif3", title: "Limited Slots: Portfolio Review Night",
    message: "Only 8 slots remaining for our Portfolio Review Night on June 20!",
    type: "urgent", audience: "all_subscribers",
    delivered: 248, opened: 198, clicked: 74, sentAt: "2026-06-01T14:00:00",
  },
];

// ── History ───────────────────────────────────────────────────────────────────

export type HistoryEvent = {
  id: string;
  type:
    | "subscriber_added"
    | "subscriber_removed"
    | "notification_sent"
    | "sale_completed"
    | "team_member_added"
    | "settings_changed"
    | "content_updated"
    | "review_received"
    | "milestone_reached";
  title: string;
  description: string;
  importance: "high" | "medium" | "low";
  createdAt: string;
};

export const HISTORY_EVENTS: HistoryEvent[] = [
  { id: "h1", type: "sale_completed",     title: "New Sale: Website Design & Dev", description: "Client: Ana Reyes — ₱120,000",                            importance: "high",   createdAt: "2026-06-14T10:30:00" },
  { id: "h2", type: "subscriber_added",   title: "New Subscriber",                 description: "Ryan Chen joined as a premium subscriber",                  importance: "medium", createdAt: "2026-06-13T14:00:00" },
  { id: "h3", type: "review_received",    title: "5-Star Review Received",         description: "\"Excellent work on the brand identity!\" — Mark T.",      importance: "high",   createdAt: "2026-06-12T09:15:00" },
  { id: "h4", type: "notification_sent",  title: "Notification Sent",              description: "Brand Masterclass Early Bird — delivered to 248",           importance: "low",    createdAt: "2026-06-10T10:05:00" },
  { id: "h5", type: "milestone_reached",  title: "Milestone: 250 Subscribers",     description: "Crossed 250 total subscribers",                             importance: "high",   createdAt: "2026-06-08T16:00:00" },
  { id: "h6", type: "content_updated",    title: "Catalog Updated",                description: "Added Motion Graphics Pack to catalog",                      importance: "low",    createdAt: "2026-06-05T11:30:00" },
  { id: "h7", type: "subscriber_removed", title: "Subscriber Cancelled",           description: "Carlos Mendez cancelled their subscription",                importance: "medium", createdAt: "2026-06-03T08:45:00" },
];

// ── Workspaces ────────────────────────────────────────────────────────────────

export type Workspace = {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryColor: string;
  dotColor: string;
  ticketCount: number;
  collaboratorCount: number;
  createdAt: string;
};

export const WORKSPACES: Workspace[] = [
  {
    id: "ws1", name: "Website Redesign 2026",
    description: "Full redesign of client website with new brand direction.",
    category: "Design",
    categoryColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    dotColor: "bg-violet-500",
    ticketCount: 12, collaboratorCount: 3, createdAt: "2026-05-01",
  },
  {
    id: "ws2", name: "Brand Campaign Q3",
    description: "Planning and execution of Q3 brand awareness campaign.",
    category: "Marketing",
    categoryColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    dotColor: "bg-blue-500",
    ticketCount: 8, collaboratorCount: 2, createdAt: "2026-05-20",
  },
  {
    id: "ws3", name: "Legal Documents",
    description: "Client contracts, NDAs, and service agreements.",
    category: "Legal",
    categoryColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    dotColor: "bg-amber-500",
    ticketCount: 5, collaboratorCount: 1, createdAt: "2026-04-15",
  },
];
