// ── Profile / Dashboard ───────────────────────────────────────────────────────

export const FREELANCE_PROFILE = {
  displayName: "Alex Reyes",
  availability: "available" as "available" | "busy" | "unavailable",
  bio: "Full-stack designer and developer with 8 years crafting digital products for startups and enterprises across Southeast Asia.",
  skills: ["UI/UX Design", "Figma", "React", "Brand Identity", "Motion Graphics"],
  photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
};

export const FREELANCE_METRICS = {
  totalClients: 12,
  totalServices: 8,
  totalEarnings: 485000,
  upcomingMilestones: 3,
};

export const RECENT_ACTIVITY = [
  { id: "ra1", serviceType: "UI/UX Design",    clientName: "TechCorp Inc.",   date: "2026-06-12", value: 45000 },
  { id: "ra2", serviceType: "Brand Identity",   clientName: "Bloom & Co.",     date: "2026-06-08", value: 32000 },
  { id: "ra3", serviceType: "Motion Graphics",  clientName: "Velvet Records",  date: "2026-06-01", value: 18000 },
  { id: "ra4", serviceType: "Web Development",  clientName: "Urban Brew Co.",  date: "2026-05-28", value: 75000 },
];

export const UPCOMING_MILESTONES_PREVIEW = [
  { id: "um1", title: "Design Handoff – TechCorp",     clientName: "TechCorp Inc.",  type: "deadline"  as const, dueDate: "2026-06-20" },
  { id: "um2", title: "Discovery Call – FitZone",       clientName: "FitZone Gym",    type: "booking"   as const, dueDate: "2026-06-18" },
  { id: "um3", title: "Invoice Follow-up – Velvet",     clientName: "Velvet Records", type: "follow_up" as const, dueDate: "2026-06-22" },
];

// ── Services ──────────────────────────────────────────────────────────────────

export type ServiceTier = {
  name: string;
  price: number;
  description: string;
};

export type ServiceAddOn = {
  name: string;
  price: number;
};

export type FreelanceService = {
  id: string;
  title: string;
  category: string;
  description: string;
  pricingModel: "fixed" | "hourly" | "tiered";
  basePrice?: number;
  hourlyRate?: number;
  minHours?: number;
  maxHours?: number;
  tiers?: ServiceTier[];
  addOns?: ServiceAddOn[];
  status: "active" | "paused" | "archived";
};

export const FREELANCE_SERVICES: FreelanceService[] = [
  {
    id: "fs1", title: "UI/UX Design", category: "Design",
    description: "End-to-end product design from wireframes to pixel-perfect Figma handoff.",
    pricingModel: "hourly", hourlyRate: 3500, minHours: 10, maxHours: 80,
    addOns: [
      { name: "Interactive Prototype", price: 5000 },
      { name: "Design System",         price: 12000 },
    ],
    status: "active",
  },
  {
    id: "fs2", title: "Brand Identity", category: "Branding",
    description: "Complete brand identity including logo, colors, typography, and brand guidelines.",
    pricingModel: "tiered",
    tiers: [
      { name: "Starter",      price: 15000, description: "Logo + 2 color palette + font pair" },
      { name: "Professional", price: 35000, description: "Full identity + brand book (20 pages)" },
      { name: "Enterprise",   price: 70000, description: "Full identity + brand book + brand film" },
    ],
    status: "active",
  },
  {
    id: "fs3", title: "Web Development", category: "Development",
    description: "React-based web applications with modern tooling and clean architecture.",
    pricingModel: "fixed", basePrice: 85000,
    addOns: [
      { name: "CMS Integration", price: 15000 },
      { name: "SEO Audit",        price: 8000 },
    ],
    status: "active",
  },
  {
    id: "fs4", title: "Motion Graphics", category: "Video",
    description: "Animated brand assets, social content, and video intros.",
    pricingModel: "hourly", hourlyRate: 2800, minHours: 5, maxHours: 40,
    status: "paused",
  },
  {
    id: "fs5", title: "Content Strategy", category: "Marketing",
    description: "3-month editorial roadmap with platform-specific recommendations.",
    pricingModel: "fixed", basePrice: 22000,
    status: "active",
  },
  {
    id: "fs6", title: "Photography Direction", category: "Photography",
    description: "Art direction and post-production for brand photography sessions.",
    pricingModel: "hourly", hourlyRate: 2500, minHours: 8, maxHours: 32,
    status: "archived",
  },
];

// ── Clients ───────────────────────────────────────────────────────────────────

export type HistoryEntry = {
  id: string;
  date: string;
  serviceType: string;
  description: string;
  value: number;
  deliverables: string[];
};

export type FreelanceClient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  history: HistoryEntry[];
};

export const FREELANCE_CLIENTS: FreelanceClient[] = [
  {
    id: "fc1", name: "TechCorp Inc.", email: "project@techcorp.ph", phone: "+63 917 000 1111",
    company: "TechCorp Philippines",
    notes: "Long-term client. Prefers bi-weekly check-ins via Google Meet. Very detail-oriented.",
    history: [
      {
        id: "he1", date: "2026-06-12", serviceType: "UI/UX Design",
        description: "Dashboard redesign for their SaaS analytics platform.", value: 45000,
        deliverables: ["Design File (Figma)", "Component Library", "Handoff Specs"],
      },
      {
        id: "he2", date: "2026-04-05", serviceType: "Brand Identity",
        description: "Sub-brand for TechCorp's new AI product line.", value: 35000,
        deliverables: ["Logo Suite", "Brand Guidelines PDF"],
      },
    ],
  },
  {
    id: "fc2", name: "Bloom & Co.", email: "hello@bloomco.ph", phone: "+63 915 222 3333",
    company: "Bloom & Co. Flowers",
    notes: "Seasonal campaigns. Very detail-oriented on color accuracy.",
    history: [
      {
        id: "he3", date: "2026-06-08", serviceType: "Brand Identity",
        description: "Full brand refresh for their 10th anniversary.", value: 32000,
        deliverables: ["New Logo", "Packaging Design", "Brand Book"],
      },
    ],
  },
  {
    id: "fc3", name: "Velvet Records", email: "mgmt@velvetrecords.ph", phone: "+63 918 444 5555",
    company: "Velvet Records PH",
    notes: "Music label. Loves bold, experimental visuals. Fast turnaround preferred.",
    history: [
      {
        id: "he4", date: "2026-06-01", serviceType: "Motion Graphics",
        description: "Animated visuals for 3 music video releases.", value: 18000,
        deliverables: ["3 Motion Files (MP4)", "Source Files (AE)"],
      },
    ],
  },
  {
    id: "fc4", name: "Urban Brew Co.", email: "ops@urbanbrewco.com", phone: "+63 912 666 7777",
    company: "Urban Brew Co.",
    notes: "Coffee chain with multiple branches. Multiple concurrent projects possible.",
    history: [
      {
        id: "he5", date: "2026-05-28", serviceType: "Web Development",
        description: "New website with online ordering integration.", value: 75000,
        deliverables: ["Production Website", "CMS Setup", "Training Docs"],
      },
      {
        id: "he6", date: "2026-03-10", serviceType: "UI/UX Design",
        description: "Mobile app wireframes for loyalty program.", value: 28000,
        deliverables: ["Wireframes (PDF)", "Figma Prototype"],
      },
    ],
  },
];

// ── Milestones ────────────────────────────────────────────────────────────────

export type FreelanceMilestone = {
  id: string;
  title: string;
  description: string;
  clientId: string | null;
  dueDate: string;
  type: "deadline" | "booking" | "follow_up";
  status: "pending" | "completed" | "cancelled";
};

export const FREELANCE_MILESTONES: FreelanceMilestone[] = [
  { id: "mil1", title: "Design Handoff – TechCorp",       description: "Send final Figma files and handoff specs to dev team.",          clientId: "fc1",  dueDate: "2026-06-20", type: "deadline",  status: "pending" },
  { id: "mil2", title: "Discovery Call – FitZone Gym",     description: "Initial call to scope out branding requirements.",                clientId: null,   dueDate: "2026-06-18", type: "booking",   status: "pending" },
  { id: "mil3", title: "Invoice Follow-up – Velvet",       description: "Follow up on outstanding invoice #INV-2026-14.",                 clientId: "fc3",  dueDate: "2026-06-22", type: "follow_up", status: "pending" },
  { id: "mil4", title: "TechCorp Kickoff Meeting",         description: "Project kickoff for new SaaS feature set Q3.",                   clientId: "fc1",  dueDate: "2026-07-01", type: "booking",   status: "pending" },
  { id: "mil5", title: "Bloom & Co. Campaign Assets",      description: "Submit all September campaign visual assets.",                    clientId: "fc2",  dueDate: "2026-08-25", type: "deadline",  status: "pending" },
  { id: "mil6", title: "Urban Brew Website Launch",        description: "Final deployment and handover to the operations team.",           clientId: "fc4",  dueDate: "2026-06-10", type: "deadline",  status: "completed" },
  { id: "mil7", title: "Quarterly Review Meeting",         description: "Self-review of Q2 deliverables and financial summary.",           clientId: null,   dueDate: "2026-06-30", type: "follow_up", status: "pending" },
  { id: "mil8", title: "Velvet Records – New Brief",       description: "Receive album artwork brief for Q3 release.",                    clientId: "fc3",  dueDate: "2026-07-10", type: "booking",   status: "pending" },
];

// ── Portfolio ─────────────────────────────────────────────────────────────────

export type ShowcaseEntry = {
  id: string;
  serviceType: string;
  clientName: string;
  date: string;
  description: string;
  anonymizeClient: boolean;
  images: string[];
};

export type SkillBadge = {
  id: string;
  skill: string;
  verifiedCount: number;
};

export const PORTFOLIO = {
  bio: "Full-stack designer and developer with 8 years crafting digital products for startups and enterprises across Southeast Asia. I turn complex problems into clear, beautiful interfaces.",
  skills: ["UI/UX Design", "Figma", "React", "Brand Identity", "Motion Graphics"],
  availability: "available" as "available" | "busy" | "unavailable",
  photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  showcaseEntries: [
    {
      id: "sc1", serviceType: "UI/UX Design", clientName: "TechCorp Inc.", date: "2026-06-12",
      description: "Redesigned the analytics dashboard for improved data readability and user flow.",
      anonymizeClient: false,
      images: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      ],
    },
    {
      id: "sc2", serviceType: "Brand Identity", clientName: "Bloom & Co.", date: "2026-06-08",
      description: "Full brand refresh including logo, packaging, and comprehensive brand guidelines.",
      anonymizeClient: false,
      images: [
        "https://images.unsplash.com/photo-1476224203421-74177f19a409?w=400&q=80",
      ],
    },
  ] as ShowcaseEntry[],
  skillBadges: [
    { id: "sb1", skill: "UI/UX Design",    verifiedCount: 4 },
    { id: "sb2", skill: "Brand Identity",   verifiedCount: 2 },
    { id: "sb3", skill: "Web Development",  verifiedCount: 1 },
    { id: "sb4", skill: "Motion Graphics",  verifiedCount: 1 },
  ] as SkillBadge[],
};

// ── Inquiries ─────────────────────────────────────────────────────────────────

export type FreelanceEnquiry = {
  id: string;
  subject: string;
  message: string;
  fromName: string;
  status: "pending" | "read" | "replied" | "closed";
  createdAt: string;
  reply?: string;
  repliedAt?: string;
};

export const FREELANCE_ENQUIRIES: FreelanceEnquiry[] = [
  {
    id: "feq1", subject: "UI Design for Mobile App",
    message: "Hi Alex! We're building a fitness tracking app and need a UI designer. Are you available for a 3-month contract starting July?",
    fromName: "FitZone Gym", status: "pending", createdAt: "2026-06-14T10:00:00",
  },
  {
    id: "feq2", subject: "Website Redesign Project",
    message: "We saw your portfolio and love your work. Can you redesign our corporate website? Our budget is flexible for the right designer.",
    fromName: "Spark Ventures", status: "read", createdAt: "2026-06-13T15:30:00",
  },
  {
    id: "feq3", subject: "Logo Design Quote",
    message: "I need a simple but memorable logo for my consultancy firm. What's your turnaround time and price range?",
    fromName: "Nina Cruz", status: "replied", createdAt: "2026-06-11T09:00:00",
    reply: "Hi Nina! For a logo project, our turnaround is 5–7 business days starting at ₱8,000. Let's schedule a quick call to discuss your vision!",
    repliedAt: "2026-06-11T13:45:00",
  },
  {
    id: "feq4", subject: "Social Media Content Package",
    message: "Do you offer recurring monthly packages for social media design? We need consistent content for 3 platforms.",
    fromName: "GreenLeaf PH", status: "closed", createdAt: "2026-06-09T11:00:00",
  },
];
