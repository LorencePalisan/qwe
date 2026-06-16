// Static mock data for all personal pages

const UP = "https://images.unsplash.com/photo-";

export const GALLERY_PHOTOS = [
  { id: "g1", url: `${UP}1540575467063-178a50c2df87?w=1400&q=80`, caption: "Sunburn Festival 2026" },
  { id: "g2", url: `${UP}1533174072545-7a4b6ad7a6c3?w=1400&q=80`, caption: "Night Vibes" },
  { id: "g3", url: `${UP}1506905925346-21bda4d32df4?w=1400&q=80`, caption: "Into the Wild" },
  { id: "g4", url: `${UP}1529156069898-49953e39b3ac?w=1400&q=80`, caption: "Squad Goals" },
];

export const CONNECTIONS = [
  { id: "c1", name: "Alex Martinez",  avatar: `${UP}1500648767791-00dcc994a43e?w=120&q=80`, status: "accepted", tags: ["Friends"] },
  { id: "c2", name: "Maria Santos",   avatar: `${UP}1494790108377-be9c29b29330?w=120&q=80`, status: "accepted", tags: ["Work"] },
  { id: "c3", name: "James Rivera",   avatar: `${UP}1507003211169-0a1dd7228f2d?w=120&q=80`, status: "accepted", tags: ["School"] },
  { id: "c4", name: "Priya Sharma",   avatar: `${UP}1438761681033-6461ffad8d80?w=120&q=80`, status: "accepted", tags: ["Family"] },
  { id: "c5", name: "Carlos Mendez",  avatar: `${UP}1472099645785-5658abf4ff4e?w=120&q=80`, status: "accepted", tags: ["Work"] },
  { id: "c6", name: "Emma Wilson",    avatar: `${UP}1544005313-94ddf0286df2?w=120&q=80`, status: "accepted", tags: ["Friends"] },
  { id: "c7", name: "Kai Tanaka",     avatar: `${UP}1463453091185-61582044d556?w=120&q=80`, status: "pending",  tags: [] },
  { id: "c8", name: "Olivia Brown",   avatar: `${UP}1542596594-649edbc13630?w=120&q=80`, status: "pending",  tags: [] },
];

export const BUSINESSES = [
  {
    id: "b1", name: "Neon Studios",       category: "Creative Agency",
    cover: `${UP}1486406146926-c627a92ad1ab?w=600&q=80`, subscribed: false,
    subscribers: 1240, color: "#7c3aed",
  },
  {
    id: "b2", name: "Urban Brew Co.",     category: "Food & Beverage",
    cover: `${UP}1497366216548-37526070297c?w=600&q=80`, subscribed: true,
    subscribers: 3800, color: "#ca8a04",
  },
  {
    id: "b3", name: "FitZone Gym",        category: "Health & Fitness",
    cover: `${UP}1517836357463-d25dfeac3438?w=600&q=80`, subscribed: false,
    subscribers: 920, color: "#16a34a",
  },
  {
    id: "b4", name: "Velvet Records",     category: "Music & Entertainment",
    cover: `${UP}1511715282680-d4ef75fec13a?w=600&q=80`, subscribed: false,
    subscribers: 5600, color: "#db2777",
  },
  {
    id: "b5", name: "TechHub Manila",     category: "Technology",
    cover: `${UP}1518770660439-4636190af475?w=600&q=80`, subscribed: true,
    subscribers: 2100, color: "#0ea5e9",
  },
  {
    id: "b6", name: "Bloom & Co Flowers", category: "Retail",
    cover: `${UP}1476224203421-74177f19a409?w=600&q=80`, subscribed: false,
    subscribers: 680, color: "#f43f5e",
  },
];

export const EVENTS = [
  {
    id: "e1", title: "Sunburn Festival 2026", date: "2026-07-12", venue: "New York",
    cover: `${UP}1540575467063-178a50c2df87?w=600&q=80`, type: "business",
    registered: false, capacity: 5000, registrations: 4120,
  },
  {
    id: "e2", title: "AWS Summit NYC 2026",   date: "2026-07-18", venue: "New York",
    cover: `${UP}1518770660439-4636190af475?w=600&q=80`, type: "business",
    registered: true, capacity: 2000, registrations: 1850,
  },
  {
    id: "e3", title: "Manila Design Week",    date: "2026-08-05", venue: "Manila",
    cover: `${UP}1560179707-f14e90ef3623?w=600&q=80`, type: "community",
    registered: false, capacity: 800, registrations: 340,
  },
  {
    id: "e4", title: "Urban Runners 5K",      date: "2026-07-26", venue: "Central Park",
    cover: `${UP}1529156069898-49953e39b3ac?w=600&q=80`, type: "community",
    registered: true, capacity: 300, registrations: 298,
  },
];

export const COMMUNITIES = [
  {
    id: "cm1", name: "AI & Machine Learning Hub", category: "Technology",
    members: 12400, joined: true, private: false,
    cover: `${UP}1518770660439-4636190af475?w=600&q=80`,
  },
  {
    id: "cm2", name: "Mindful Living Community",  category: "Wellness",
    members: 8700, joined: true, private: false,
    cover: `${UP}1517836357463-d25dfeac3438?w=600&q=80`,
  },
  {
    id: "cm3", name: "Urban Runners Club",        category: "Sports",
    members: 3200, joined: false, private: false,
    cover: `${UP}1529156069898-49953e39b3ac?w=600&q=80`,
  },
  {
    id: "cm4", name: "Indie Artists Collective",  category: "Creative",
    members: 5600, joined: false, private: true,
    cover: `${UP}1511715282680-d4ef75fec13a?w=600&q=80`,
  },
  {
    id: "cm5", name: "Startup Founders PH",       category: "Business",
    members: 2100, joined: true, private: false,
    cover: `${UP}1486406146926-c627a92ad1ab?w=600&q=80`,
  },
];

export const FREELANCERS = [
  {
    id: "f1", name: "Maria Santos",  role: "UI/UX Designer",
    skills: ["Figma", "React", "Branding"], availability: "available",
    avatar: `${UP}1494790108377-be9c29b29330?w=200&q=80`, rating: 4.9, projects: 48,
  },
  {
    id: "f2", name: "Alex Torres",   role: "Full-Stack Developer",
    skills: ["Node.js", "React", "AWS"], availability: "busy",
    avatar: `${UP}1500648767791-00dcc994a43e?w=200&q=80`, rating: 4.8, projects: 73,
  },
  {
    id: "f3", name: "Priya Nair",    role: "Brand Strategist",
    skills: ["Strategy", "Copy", "Adobe"], availability: "available",
    avatar: `${UP}1438761681033-6461ffad8d80?w=200&q=80`, rating: 5.0, projects: 29,
  },
  {
    id: "f4", name: "James Lee",     role: "Video Editor",
    skills: ["Premiere", "After Effects", "DaVinci"], availability: "available",
    avatar: `${UP}1507003211169-0a1dd7228f2d?w=200&q=80`, rating: 4.7, projects: 91,
  },
  {
    id: "f5", name: "Emma Chen",     role: "Content Writer",
    skills: ["SEO", "Copywriting", "Research"], availability: "busy",
    avatar: `${UP}1544005313-94ddf0286df2?w=200&q=80`, rating: 4.6, projects: 55,
  },
  {
    id: "f6", name: "Carlos Reyes",  role: "Motion Designer",
    skills: ["Lottie", "Blender", "C4D"], availability: "available",
    avatar: `${UP}1472099645785-5658abf4ff4e?w=200&q=80`, rating: 4.9, projects: 34,
  },
];

export const AGENCIES = [
  {
    id: "ag1", name: "DraftLab Creative", category: "Design Agency",
    city: "New York", following: true, verified: true,
    cover: `${UP}1486406146926-c627a92ad1ab?w=600&q=80`, tagline: "Crafting brands that resonate",
  },
  {
    id: "ag2", name: "DevForge Studio",   category: "Software Development",
    city: "San Francisco", following: false, verified: true,
    cover: `${UP}1518770660439-4636190af475?w=600&q=80`, tagline: "Building the future, one sprint at a time",
  },
  {
    id: "ag3", name: "MediaFlow",         category: "Marketing Agency",
    city: "Manila", following: false, verified: false,
    cover: `${UP}1560179707-f14e90ef3623?w=600&q=80`, tagline: "Your story, amplified",
  },
  {
    id: "ag4", name: "PulseMedia PH",     category: "PR & Communications",
    city: "Manila", following: true, verified: true,
    cover: `${UP}1511795409834-ef04bbd61622?w=600&q=80`, tagline: "Making noise that matters",
  },
];

export const SUBSCRIPTIONS = [
  { id: "s1", name: "Urban Brew Co.",  type: "Food & Beverage", color: "#ca8a04", abbr: "UB", notif: true,  since: "2025-10-01" },
  { id: "s2", name: "TechHub Manila",  type: "Technology",       color: "#0ea5e9", abbr: "TH", notif: true,  since: "2025-11-15" },
  { id: "s3", name: "Velvet Records",  type: "Entertainment",    color: "#db2777", abbr: "VR", notif: false, since: "2026-01-08" },
  { id: "s4", name: "FitZone Gym",     type: "Health & Fitness", color: "#16a34a", abbr: "FZ", notif: true,  since: "2026-03-20" },
];

export const MEMBERSHIPS = [
  { id: "m1", name: "AI & Machine Learning Hub", category: "Technology", members: 12400, role: "member",  cover: `${UP}1518770660439-4636190af475?w=400&q=80` },
  { id: "m2", name: "Mindful Living Community",  category: "Wellness",   members: 8700,  role: "member",  cover: `${UP}1517836357463-d25dfeac3438?w=400&q=80` },
  { id: "m3", name: "Startup Founders PH",       category: "Business",   members: 2100,  role: "admin",   cover: `${UP}1486406146926-c627a92ad1ab?w=400&q=80` },
];

export const NOTIFICATIONS = [
  { id: "n1", type: "event",        title: "Sunburn Festival tickets now available", from: "Sunburn Official", time: "2m ago",  read: false },
  { id: "n2", type: "announcement", title: "TechHub Manila: Monthly Meetup recap",   from: "TechHub Manila",   time: "1h ago",  read: false },
  { id: "n3", type: "promotion",    title: "20% off for Urban Brew subscribers",     from: "Urban Brew Co.",   time: "3h ago",  read: false },
  { id: "n4", type: "announcement", title: "Velvet Records: New album drop Friday",  from: "Velvet Records",   time: "1d ago",  read: true },
  { id: "n5", type: "event",        title: "Urban Runners 5K — register by Jul 15",  from: "Urban Runners",    time: "2d ago",  read: true },
];

export const ACTIVITIES = [
  { id: "a1", action: "Subscribed to",  target: "Urban Brew Co.",        period: "Today",      type: "subscription" },
  { id: "a2", action: "Followed",       target: "AI & Machine Learning", period: "Today",      type: "follow" },
  { id: "a3", action: "Registered for", target: "AWS Summit NYC 2026",   period: "This Week",  type: "event" },
  { id: "a4", action: "Joined",         target: "Startup Founders PH",   period: "This Week",  type: "subscription" },
  { id: "a5", action: "Sent inquiry to",target: "Maria Santos",           period: "This Week",  type: "follow" },
  { id: "a6", action: "Subscribed to",  target: "Velvet Records",        period: "This Month", type: "subscription" },
  { id: "a7", action: "Registered for", target: "Urban Runners 5K",      period: "This Month", type: "event" },
];

export const REGISTRATIONS = [
  {
    id: "r1", title: "AWS Summit NYC 2026", date: "2026-07-18", venue: "New York",
    cover: `${UP}1518770660439-4636190af475?w=600&q=80`, status: "upcoming",
    ticketId: "TKT-A3F9C2B1", seat: "General Admission",
  },
  {
    id: "r2", title: "Urban Runners 5K",   date: "2026-07-26", venue: "Central Park",
    cover: `${UP}1529156069898-49953e39b3ac?w=600&q=80`, status: "upcoming",
    ticketId: "TKT-B7D2E4A8", seat: "Wave B",
  },
  {
    id: "r3", title: "Manila Design Week", date: "2026-08-05", venue: "Manila",
    cover: `${UP}1560179707-f14e90ef3623?w=600&q=80`, status: "upcoming",
    ticketId: "TKT-C1F5G3H9", seat: "General Admission",
  },
];

export const CHAT_ROOMS = [
  { id: "cr1", name: "General",     community: "AI & Machine Learning Hub", lastMsg: "See you at the meetup!", lastTime: "5m ago",  unread: 3 },
  { id: "cr2", name: "Resources",   community: "AI & Machine Learning Hub", lastMsg: "Great paper shared!",    lastTime: "1h ago",  unread: 0 },
  { id: "cr3", name: "Mindfulness", community: "Mindful Living",            lastMsg: "Morning yoga session?",  lastTime: "30m ago", unread: 1 },
];

export const REWARDS = [
  { id: "rw1", title: "20% Off Your Next Coffee", from: "Urban Brew Co.",   expires: "2026-08-01", type: "discount",  points: 500,  redeemed: false },
  { id: "rw2", "title": "Free Event Ticket",       from: "TechHub Manila",   expires: "2026-07-31", type: "ticket",    points: 1000, redeemed: false },
  { id: "rw3", title: "Exclusive Merch Bundle",    from: "Velvet Records",   expires: "2026-09-15", type: "product",   points: 800,  redeemed: true },
];

// ── Feed / Social ─────────────────────────────────────────────────────────────

export type FeedPost = {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  time: string;
  liked: boolean;
  bookmarked: boolean;
  badge?: "Business" | "Event" | "Community";
};

export const FEED_POSTS: FeedPost[] = [
  {
    id: "fp1",
    authorName: "You",
    authorHandle: "@lorencepalisan",
    authorAvatar: `${UP}1500648767791-00dcc994a43e?w=200&q=80`,
    content: "Just wrapped up a huge redesign project — finally shipping it tomorrow. The attention to detail in the micro-interactions is something else 🎨✨",
    image: `${UP}1486406146926-c627a92ad1ab?w=800&q=80`,
    likes: 84, comments: 12, reposts: 7, time: "just now",
    liked: false, bookmarked: false,
  },
  {
    id: "fp2",
    authorName: "Maria Santos",
    authorHandle: "@mariasantos",
    authorAvatar: `${UP}1494790108377-be9c29b29330?w=200&q=80`,
    content: "Hot take: design systems aren't about consistency — they're about velocity. When your team stops debating button border-radius and starts shipping features, that's when it clicks.",
    likes: 231, comments: 44, reposts: 67, time: "12m ago",
    liked: true, bookmarked: false,
  },
  {
    id: "fp3",
    authorName: "TechHub Manila",
    authorHandle: "@techhubmanila",
    authorAvatar: `${UP}1518770660439-4636190af475?w=200&q=80`,
    content: "🚀 Monthly Meetup is happening July 28! We have 3 incredible speakers lined up covering React 19, AI-assisted dev workflows, and building for scale. Seats are filling up fast — register now.",
    image: `${UP}1560179707-f14e90ef3623?w=800&q=80`,
    likes: 156, comments: 23, reposts: 41, time: "1h ago",
    liked: false, bookmarked: true,
    badge: "Event",
  },
  {
    id: "fp4",
    authorName: "Alex Martinez",
    authorHandle: "@alexmartinez",
    authorAvatar: `${UP}1500648767791-00dcc994a43e?w=200&q=80`,
    content: "Anyone else feel like the best code you write is the code you delete? Spent 3 hours simplifying a 400-line service down to 80 lines today and it does the same thing. Sometimes less really is more.",
    likes: 98, comments: 19, reposts: 14, time: "2h ago",
    liked: false, bookmarked: false,
  },
  {
    id: "fp5",
    authorName: "Priya Sharma",
    authorHandle: "@priyasharma",
    authorAvatar: `${UP}1438761681033-6461ffad8d80?w=200&q=80`,
    content: "This is what peak productivity looks like 💼",
    image: `${UP}1517836357463-d25dfeac3438?w=800&q=80`,
    likes: 312, comments: 56, reposts: 28, time: "4h ago",
    liked: true, bookmarked: false,
  },
  {
    id: "fp6",
    authorName: "Urban Brew Co.",
    authorHandle: "@urbanbrewco",
    authorAvatar: `${UP}1497366216548-37526070297c?w=200&q=80`,
    content: "☕ Subscribers get 20% off this week only — flash promo running until Sunday midnight. Tap the link to redeem your reward. Brewing good things for good people.",
    likes: 445, comments: 31, reposts: 92, time: "6h ago",
    liked: false, bookmarked: false,
    badge: "Business",
  },
  {
    id: "fp7",
    authorName: "James Rivera",
    authorHandle: "@jamesrivera",
    authorAvatar: `${UP}1507003211169-0a1dd7228f2d?w=200&q=80`,
    content: "Three months into learning Rust and I finally understand why people obsess over it. The borrow checker is not your enemy — it's your code reviewer who never sleeps.",
    likes: 77, comments: 22, reposts: 11, time: "1d ago",
    liked: false, bookmarked: false,
  },
];

export const SOCIAL_NOTIFICATIONS = [
  {
    id: "sn1",
    avatar: `${UP}1494790108377-be9c29b29330?w=120&q=80`,
    name: "Maria Santos",
    action: "liked your post",
    postPreview: "Just wrapped up a huge redesign project…",
    time: "2m ago",
    read: false,
    type: "like",
  },
  {
    id: "sn2",
    avatar: `${UP}1500648767791-00dcc994a43e?w=120&q=80`,
    name: "Alex Martinez",
    action: "commented on your post",
    postPreview: "\"Congrats! Can't wait to see it shipped 🔥\"",
    time: "15m ago",
    read: false,
    type: "comment",
  },
  {
    id: "sn3",
    avatar: `${UP}1438761681033-6461ffad8d80?w=120&q=80`,
    name: "Priya Sharma",
    action: "sent you a connection request",
    postPreview: null,
    time: "1h ago",
    read: false,
    type: "connect",
  },
  {
    id: "sn4",
    avatar: `${UP}1518770660439-4636190af475?w=120&q=80`,
    name: "TechHub Manila",
    action: "posted a new event you might like",
    postPreview: "Monthly Meetup: July 28, 2026",
    time: "2h ago",
    read: false,
    type: "event",
  },
  {
    id: "sn5",
    avatar: `${UP}1507003211169-0a1dd7228f2d?w=120&q=80`,
    name: "James Rivera",
    action: "reposted your post",
    postPreview: "Just wrapped up a huge redesign project…",
    time: "3h ago",
    read: true,
    type: "repost",
  },
  {
    id: "sn6",
    avatar: `${UP}1544005313-94ddf0286df2?w=120&q=80`,
    name: "Emma Wilson",
    action: "started following you",
    postPreview: null,
    time: "5h ago",
    read: true,
    type: "follow",
  },
  {
    id: "sn7",
    avatar: `${UP}1497366216548-37526070297c?w=120&q=80`,
    name: "Urban Brew Co.",
    action: "has a new promotion for subscribers",
    postPreview: "☕ 20% off this week only — flash promo",
    time: "6h ago",
    read: true,
    type: "promo",
  },
];
