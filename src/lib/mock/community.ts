// ── Dashboard ─────────────────────────────────────────────────────────────────

export const COMMUNITY_DASHBOARD = {
  communityName: "Manila Tech Circle",
  whodiniId: "WH-COM-0017",
  metrics: {
    totalMembers: 248,
    totalChapters: 6,
    totalEvents: 14,
  },
};

// ── Members ───────────────────────────────────────────────────────────────────

export type CommunityMember = {
  id: string;
  name: string;
  email: string;
  whodiniId: string;
  role: "leader" | "moderator" | "member";
  chapterName: string;
  joinedAt: string;
};

export const COMMUNITY_MEMBERS: CommunityMember[] = [
  { id: "cm1", name: "Marco Dela Cruz", email: "marco@tech.ph",  whodiniId: "WH-0041", role: "leader",    chapterName: "Web Development",  joinedAt: "2025-01-10" },
  { id: "cm2", name: "Lia Santos",      email: "lia@tech.ph",    whodiniId: "WH-0055", role: "moderator", chapterName: "Design",           joinedAt: "2025-02-14" },
  { id: "cm3", name: "Dan Reyes",       email: "dan@tech.ph",    whodiniId: "WH-0072", role: "member",    chapterName: "Web Development",  joinedAt: "2025-03-08" },
  { id: "cm4", name: "Sofia Kim",       email: "sofia@tech.ph",  whodiniId: "WH-0089", role: "moderator", chapterName: "Mobile",           joinedAt: "2025-03-20" },
  { id: "cm5", name: "Jake Morales",    email: "jake@tech.ph",   whodiniId: "WH-0104", role: "member",    chapterName: "Design",           joinedAt: "2025-04-05" },
  { id: "cm6", name: "Rina Tan",        email: "rina@tech.ph",   whodiniId: "WH-0118", role: "leader",    chapterName: "Mobile",           joinedAt: "2025-01-25" },
  { id: "cm7", name: "Ben Castro",      email: "ben@tech.ph",    whodiniId: "WH-0133", role: "member",    chapterName: "Data & AI",        joinedAt: "2025-05-12" },
  { id: "cm8", name: "Mia Ramos",       email: "mia@tech.ph",    whodiniId: "WH-0147", role: "member",    chapterName: "Design",           joinedAt: "2025-05-28" },
  { id: "cm9", name: "Leo Sy",          email: "leo@tech.ph",    whodiniId: "WH-0162", role: "member",    chapterName: "Web Development",  joinedAt: "2025-06-10" },
  { id: "cm10",name: "Amy Lim",         email: "amy@tech.ph",    whodiniId: "WH-0179", role: "moderator", chapterName: "Product & Startup",joinedAt: "2025-06-22" },
];

// ── Chapters ──────────────────────────────────────────────────────────────────

export type ChapterOfficer = {
  name: string;
  role: string;
};

export type CommunityChapter = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  leaderName: string;
  viceLeaderName: string;
  officers: ChapterOfficer[];
  category: string;
};

export const COMMUNITY_CHAPTERS: CommunityChapter[] = [
  {
    id: "ch1", name: "Web Development",
    description: "Front-end and back-end engineers building the open web.",
    memberCount: 58, leaderName: "Marco Dela Cruz", viceLeaderName: "Dan Reyes",
    officers: [{ name: "Leo Sy", role: "Secretary" }, { name: "Amy Lim", role: "Events Coordinator" }],
    category: "Engineering",
  },
  {
    id: "ch2", name: "Design",
    description: "UI/UX designers, graphic designers, and brand creatives.",
    memberCount: 45, leaderName: "Lia Santos", viceLeaderName: "Jake Morales",
    officers: [{ name: "Mia Ramos", role: "Communications Officer" }],
    category: "Creative",
  },
  {
    id: "ch3", name: "Mobile",
    description: "iOS and Android developers — native and cross-platform.",
    memberCount: 39, leaderName: "Rina Tan", viceLeaderName: "Sofia Kim",
    officers: [{ name: "Ken Wu", role: "Treasurer" }],
    category: "Engineering",
  },
  {
    id: "ch4", name: "Data & AI",
    description: "Data scientists, ML engineers, and AI enthusiasts.",
    memberCount: 31, leaderName: "Ben Castro", viceLeaderName: "Jess Liao",
    officers: [],
    category: "Engineering",
  },
  {
    id: "ch5", name: "DevOps & Cloud",
    description: "Infrastructure engineers and cloud architects.",
    memberCount: 24, leaderName: "Ray Alvarez", viceLeaderName: "Gab Flores",
    officers: [],
    category: "Engineering",
  },
  {
    id: "ch6", name: "Product & Startup",
    description: "PMs, founders, and growth hackers building the next big thing.",
    memberCount: 51, leaderName: "Nina Cruz", viceLeaderName: "Tom Lim",
    officers: [{ name: "Bea Santos", role: "Membership Officer" }],
    category: "Business",
  },
];

// ── Events ────────────────────────────────────────────────────────────────────

export type CommunityEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendeeCount: number;
  capacity: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled" | "postponed";
  category: string;
};

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "ce1", title: "Monthly Meetup: June 2026",
    description: "Our regular monthly gathering with lightning talks, demos, and open networking.",
    date: "2026-06-28", time: "6:00 PM", location: "Bonifacio Global City",
    attendeeCount: 112, capacity: 150, status: "upcoming", category: "Meetup",
  },
  {
    id: "ce2", title: "Hackathon: Build for Good",
    description: "48-hour hackathon focused on building civic tech solutions for real-world problems.",
    date: "2026-07-19", time: "8:00 AM", location: "Makati City",
    attendeeCount: 64, capacity: 100, status: "upcoming", category: "Hackathon",
  },
  {
    id: "ce3", title: "Talk: Building AI Products",
    description: "Guest speaker series on practical AI product development — from prototype to production.",
    date: "2026-05-30", time: "7:00 PM", location: "Online (Zoom)",
    attendeeCount: 200, capacity: 200, status: "completed", category: "Talk",
  },
  {
    id: "ce4", title: "Workshop: Figma Mastery",
    description: "Full-day Figma workshop covering auto-layout, components, and handoff best practices.",
    date: "2026-05-15", time: "9:00 AM", location: "Quezon City",
    attendeeCount: 30, capacity: 30, status: "completed", category: "Workshop",
  },
  {
    id: "ce5", title: "Career Fair: Tech Edition",
    description: "Connect with top tech companies hiring in the Philippines.",
    date: "2026-04-10", time: "10:00 AM", location: "Ortigas Center",
    attendeeCount: 180, capacity: 200, status: "completed", category: "Career",
  },
];

// ── Chat Rooms ────────────────────────────────────────────────────────────────

export type ChatRoom = {
  id: string;
  name: string;
  description: string;
  privacy: "public" | "private";
  memberCount: number;
  lastActivity: string;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  sentAt: string;
};

export const CHAT_ROOMS: ChatRoom[] = [
  { id: "cr1", name: "#general",    description: "Community-wide announcements and general chat.",  privacy: "public",  memberCount: 248, lastActivity: "2026-06-14T12:30:00" },
  { id: "cr2", name: "#web-dev",    description: "Web development discussion and code sharing.",     privacy: "public",  memberCount: 58,  lastActivity: "2026-06-14T11:15:00" },
  { id: "cr3", name: "#design",     description: "Design resources, critique, and inspiration.",     privacy: "public",  memberCount: 45,  lastActivity: "2026-06-14T09:00:00" },
  { id: "cr4", name: "#events",     description: "Event planning, coordination, and announcements.", privacy: "public",  memberCount: 62,  lastActivity: "2026-06-13T20:45:00" },
  { id: "cr5", name: "#leadership", description: "Chapter leaders and community organizers.",        privacy: "private", memberCount: 8,   lastActivity: "2026-06-13T16:00:00" },
];

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  cr1: [
    { id: "msg1", senderId: "cm1", senderName: "Marco Dela Cruz", content: "Good morning Manila Tech Circle! 👋", sentAt: "2026-06-14T09:00:00" },
    { id: "msg2", senderId: "cm2", senderName: "Lia Santos",      content: "GM! Don't forget — June meetup is on the 28th. Register at whodini.io/events", sentAt: "2026-06-14T09:05:00" },
    { id: "msg3", senderId: "cm4", senderName: "Sofia Kim",       content: "Thanks for the reminder Lia! Already registered 🎉", sentAt: "2026-06-14T09:12:00" },
    { id: "msg4", senderId: "cm7", senderName: "Ben Castro",      content: "Quick question — will there be a recording of the AI talk?", sentAt: "2026-06-14T09:30:00" },
    { id: "msg5", senderId: "cm1", senderName: "Marco Dela Cruz", content: "Yes! We'll post it to our YouTube channel within 48 hours of the event.", sentAt: "2026-06-14T09:35:00" },
  ],
  cr2: [
    { id: "msg6", senderId: "cm3", senderName: "Dan Reyes",  content: "Anyone using React 19 in production yet? Curious about the new concurrent features.", sentAt: "2026-06-14T10:00:00" },
    { id: "msg7", senderId: "cm9", senderName: "Leo Sy",     content: "Yes! Been using it for 2 months. Huge improvement for data-heavy dashboards.", sentAt: "2026-06-14T10:15:00" },
  ],
};

// ── Directory ─────────────────────────────────────────────────────────────────

export type DirectoryEntry = {
  id: string;
  title: string;
  description: string;
  category: "Guidelines" | "Resources" | "Directory" | "Tools" | "Events";
  resourceType: string;
  url: string;
  tags: string[];
  status: "active" | "archived";
};

export const DIRECTORY_ENTRIES: DirectoryEntry[] = [
  {
    id: "de1", title: "Tech Interview Handbook",
    description: "Free, open-source guide for software engineering interviews.",
    category: "Resources", resourceType: "Guide", url: "https://techinterviewhandbook.org",
    tags: ["Career", "Interview", "Algorithms"], status: "active",
  },
  {
    id: "de2", title: "Community Code of Conduct",
    description: "Our guidelines for respectful and inclusive participation in Manila Tech Circle.",
    category: "Guidelines", resourceType: "Document", url: "#",
    tags: ["Policy", "Community", "Rules"], status: "active",
  },
  {
    id: "de3", title: "Figma Community Templates",
    description: "Curated Figma templates for UI/UX design projects — free and premium.",
    category: "Tools", resourceType: "Tool", url: "https://figma.com/community",
    tags: ["Design", "Figma", "Templates"], status: "active",
  },
  {
    id: "de4", title: "Manila Tech Events Calendar",
    description: "Aggregated calendar of upcoming tech events and meetups in Metro Manila.",
    category: "Events", resourceType: "Calendar", url: "#",
    tags: ["Events", "Networking", "Manila"], status: "active",
  },
  {
    id: "de5", title: "Open Source PH Projects",
    description: "Curated list of open-source projects by Filipino developers on GitHub.",
    category: "Resources", resourceType: "Repository", url: "#",
    tags: ["Open Source", "Philippines", "GitHub"], status: "active",
  },
  {
    id: "de6", title: "Job Board: Tech PH",
    description: "Curated job listings from Manila's top tech companies and startups.",
    category: "Directory", resourceType: "Job Board", url: "#",
    tags: ["Jobs", "Career", "Tech"], status: "active",
  },
];

// ── Milestones / History ──────────────────────────────────────────────────────

export type CommunityMilestone = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "Foundation" | "Growth" | "Events" | "Partnerships" | "Expansion" | "Programs";
  impact: string;
  communityLabel: string;
};

export const COMMUNITY_MILESTONES: CommunityMilestone[] = [
  {
    id: "cmi1", title: "Reached 250 Members",
    description: "Manila Tech Circle hit the 250-member mark, cementing our position as one of the largest tech communities in the region.",
    date: "2026-06-08", category: "Growth", impact: "248 active members across 6 chapters",
    communityLabel: "Manila Tech Circle",
  },
  {
    id: "cmi2", title: "First Annual Hackathon",
    description: "Launched our inaugural community hackathon with 64 participants across 16 teams. Three projects were submitted to Open Source PH.",
    date: "2026-05-01", category: "Events", impact: "64 participants, 16 teams, 3 OSS submissions",
    communityLabel: "Manila Tech Circle",
  },
  {
    id: "cmi3", title: "TechCorp PH Partnership",
    description: "Signed a partnership agreement for sponsored workshops, job placements, and co-hosted events.",
    date: "2026-03-15", category: "Partnerships", impact: "₱200K in sponsorship secured",
    communityLabel: "Manila Tech Circle",
  },
  {
    id: "cmi4", title: "Launched 6th Chapter: Product & Startup",
    description: "Expanded community with a new chapter dedicated to product managers, founders, and growth practitioners.",
    date: "2026-02-01", category: "Expansion", impact: "51 members joined in first month",
    communityLabel: "Manila Tech Circle",
  },
  {
    id: "cmi5", title: "Community Founded",
    description: "Manila Tech Circle was officially founded by 12 founding members at a coffee shop in Bonifacio Global City.",
    date: "2025-01-10", category: "Foundation", impact: "12 founding members, 1 chapter",
    communityLabel: "Manila Tech Circle",
  },
];

// ── Inquiries ─────────────────────────────────────────────────────────────────

export type CommunityEnquiry = {
  id: string;
  subject: string;
  message: string;
  fromName: string;
  status: "pending" | "read" | "replied" | "closed";
  createdAt: string;
  reply?: string;
  repliedAt?: string;
};

export const COMMUNITY_ENQUIRIES: CommunityEnquiry[] = [
  {
    id: "cenq1", subject: "How to Join the Community",
    message: "Hi! I'm a software developer based in Cebu. Can I join Manila Tech Circle even if I'm not in Metro Manila?",
    fromName: "Paolo Aquino", status: "pending", createdAt: "2026-06-14T08:30:00",
  },
  {
    id: "cenq2", subject: "Workshop Partnership Proposal",
    message: "We're a developer bootcamp looking to partner for workshops and career fairs. Who should I get in touch with?",
    fromName: "CodePH Academy", status: "read", createdAt: "2026-06-13T14:00:00",
  },
  {
    id: "cenq3", subject: "Speaking Opportunity",
    message: "I'd love to present at your next meetup on the topic of practical AI in everyday products. Is there an application process?",
    fromName: "Rico Magno", status: "replied", createdAt: "2026-06-11T10:00:00",
    reply: "Hi Rico! Yes, we'd love to hear your talk. Please fill out our speaker nomination form and we'll be in touch within 5 days.",
    repliedAt: "2026-06-11T16:30:00",
  },
  {
    id: "cenq4", subject: "Community Sponsorship",
    message: "Our fintech startup would like to sponsor your next major event. Do you have a sponsorship deck available?",
    fromName: "PayFast PH", status: "closed", createdAt: "2026-06-09T09:00:00",
  },
];
