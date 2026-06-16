// ── Types ─────────────────────────────────────────────────────────────────────

export type ClientStatus = "Active" | "Prospect" | "Inactive" | "VIP";

export type AgencyClient = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  contractValue: number;
  status: ClientStatus;
  joinedAt: string;
  avatar?: string;
  deals: number;
  notes: string;
};

export type AgencyService = {
  id: string;
  name: string;
  description: string;
  price: number;
  pricingType: "Fixed" | "Monthly" | "Per project" | "Starting at";
  category: string;
  active: boolean;
  clients: number;
};

export type AgencyTeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "Active" | "On Leave" | "Inactive";
  activeClients: number;
  joinedAt: string;
};

export type AgencyInquiry = {
  id: string;
  from: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  receivedAt: string;
  status: "New" | "In Review" | "Proposal Sent" | "Negotiating" | "Closed Won" | "Closed Lost";
};

// ── Data ──────────────────────────────────────────────────────────────────────

export const AGENCY_CLIENTS: AgencyClient[] = [
  {
    id: "ac1",
    name: "Sofia Mendoza",
    company: "Jollibee Foods Corporation",
    email: "s.mendoza@jollibee.com.ph",
    phone: "+63 917 101 0001",
    industry: "Food & Beverage",
    contractValue: 3500000,
    status: "VIP",
    joinedAt: "2024-03-15",
    deals: 8,
    notes: "Key account. Prefers bi-weekly status calls.",
  },
  {
    id: "ac2",
    name: "Brent Lim",
    company: "Ayala Land Inc.",
    email: "brent.lim@ayalaland.com",
    phone: "+63 998 202 0002",
    industry: "Real Estate",
    contractValue: 2800000,
    status: "Active",
    joinedAt: "2024-07-01",
    deals: 5,
    notes: "Active on 2 campaigns. Prefers email communication.",
  },
  {
    id: "ac3",
    name: "Diana Cruz",
    company: "Smart Communications",
    email: "d.cruz@smart.com.ph",
    phone: "+63 915 303 0003",
    industry: "Telecommunications",
    contractValue: 1500000,
    status: "Active",
    joinedAt: "2025-01-20",
    deals: 3,
    notes: "Q3 campaign pending approval.",
  },
  {
    id: "ac4",
    name: "Nathan Rivera",
    company: "Bench / Suyen Corporation",
    email: "nathan.r@bench.com.ph",
    phone: "+63 920 404 0004",
    industry: "Fashion & Retail",
    contractValue: 950000,
    status: "Active",
    joinedAt: "2025-04-10",
    deals: 2,
    notes: "New client from referral. Fashion campaign only.",
  },
  {
    id: "ac5",
    name: "Patricia Yap",
    company: "BDO Unibank",
    email: "p.yap@bdo.com.ph",
    phone: "+63 906 505 0005",
    industry: "Banking & Finance",
    contractValue: 4200000,
    status: "VIP",
    joinedAt: "2023-11-05",
    deals: 12,
    notes: "Long-term client since launch. Annual contract renewal in November.",
  },
  {
    id: "ac6",
    name: "Jerome Santos",
    company: "UnionBank of the Philippines",
    email: "jerome.s@unionbank.ph",
    phone: "+63 919 606 0006",
    industry: "Banking & Finance",
    contractValue: 0,
    status: "Prospect",
    joinedAt: "2026-05-30",
    deals: 0,
    notes: "Met at FinTech Summit. Interested in digital campaign package.",
  },
  {
    id: "ac7",
    name: "Claudia Tan",
    company: "Unilab Inc.",
    email: "c.tan@unilab.com.ph",
    phone: "+63 915 707 0007",
    industry: "Pharmaceuticals",
    contractValue: 780000,
    status: "Inactive",
    joinedAt: "2024-02-14",
    deals: 2,
    notes: "Contract ended March 2026. Open to re-engagement.",
  },
];

export const AGENCY_SERVICES: AgencyService[] = [
  {
    id: "as1",
    name: "Brand Campaign Management",
    description: "End-to-end management of brand campaigns across all digital and traditional channels.",
    price: 150000,
    pricingType: "Monthly",
    category: "Campaign",
    active: true,
    clients: 5,
  },
  {
    id: "as2",
    name: "Social Media Management",
    description: "Content creation, scheduling, and community management across all major platforms.",
    price: 60000,
    pricingType: "Monthly",
    category: "Digital",
    active: true,
    clients: 7,
  },
  {
    id: "as3",
    name: "Influencer Marketing",
    description: "Sourcing, briefing, and managing influencer partnerships from nano to macro.",
    price: 80000,
    pricingType: "Per project",
    category: "Influencer",
    active: true,
    clients: 4,
  },
  {
    id: "as4",
    name: "Event Production & PR",
    description: "Product launches, press conferences, and branded event experiences.",
    price: 250000,
    pricingType: "Starting at",
    category: "Events & PR",
    active: true,
    clients: 3,
  },
  {
    id: "as5",
    name: "Media Buying & Planning",
    description: "Strategic media planning and buying across TV, digital, OOH, and print.",
    price: 120000,
    pricingType: "Monthly",
    category: "Media",
    active: true,
    clients: 4,
  },
  {
    id: "as6",
    name: "Creative Production Package",
    description: "Full creative production: TVC, AVP, key visuals, and digital content.",
    price: 300000,
    pricingType: "Per project",
    category: "Creative",
    active: false,
    clients: 0,
  },
];

export const AGENCY_TEAM: AgencyTeamMember[] = [
  { id: "at1", name: "Isabella Reyes", role: "Account Director", department: "Client Services", email: "isabella@whodini-agency.io", phone: "+63 917 110 1100", status: "Active", activeClients: 3, joinedAt: "2023-03-01" },
  { id: "at2", name: "Marco Bautista", role: "Creative Director", department: "Creative", email: "marco@whodini-agency.io", phone: "+63 998 220 2200", status: "Active", activeClients: 6, joinedAt: "2023-05-15" },
  { id: "at3", name: "Tricia Gonzales", role: "Social Media Manager", department: "Digital", email: "tricia@whodini-agency.io", phone: "+63 915 330 3300", status: "Active", activeClients: 4, joinedAt: "2024-01-08" },
  { id: "at4", name: "Ryan Ong", role: "Media Planner", department: "Media", email: "ryan@whodini-agency.io", phone: "+63 920 440 4400", status: "Active", activeClients: 3, joinedAt: "2024-04-20" },
  { id: "at5", name: "Janine Flores", role: "Account Manager", department: "Client Services", email: "janine@whodini-agency.io", phone: "+63 906 550 5500", status: "Active", activeClients: 2, joinedAt: "2025-02-01" },
  { id: "at6", name: "Kevin De Leon", role: "Copywriter", department: "Creative", email: "kevin@whodini-agency.io", phone: "+63 919 660 6600", status: "On Leave", activeClients: 0, joinedAt: "2024-08-11" },
  { id: "at7", name: "Samantha Wu", role: "PR & Events Lead", department: "Events & PR", email: "samantha@whodini-agency.io", phone: "+63 915 770 7700", status: "Active", activeClients: 2, joinedAt: "2023-09-01" },
];

export const AGENCY_INQUIRIES: AgencyInquiry[] = [
  {
    id: "ai1",
    from: "Erwin Tan",
    company: "Monde Nissin",
    email: "erwin.tan@mondenissin.com",
    phone: "+63 998 801 0011",
    service: "Brand Campaign Management",
    budget: "₱500,000–₱800,000 / month",
    message: "We're looking to revamp our Lucky Me digital campaign. Do you have experience with FMCG brands?",
    receivedAt: "2026-06-15 10:02",
    status: "New",
  },
  {
    id: "ai2",
    from: "Claire Villanueva",
    company: "Robinsons Retail",
    email: "c.villanueva@robinsons.com.ph",
    phone: "+63 917 802 0022",
    service: "Influencer Marketing",
    budget: "₱200,000–₱350,000",
    message: "We want to run an influencer campaign for our back-to-school promo in July. Can you help?",
    receivedAt: "2026-06-14 15:30",
    status: "In Review",
  },
  {
    id: "ai3",
    from: "Dominic Uy",
    company: "Republic Biscuit Corporation",
    email: "d.uy@rebisco.com.ph",
    phone: "+63 915 803 0033",
    service: "Event Production & PR",
    budget: "₱1,500,000–₱2,000,000",
    message: "We need a grand product launch for our new snack line. Full production and PR coverage needed.",
    receivedAt: "2026-06-12 09:00",
    status: "Proposal Sent",
  },
  {
    id: "ai4",
    from: "Mariel Santos",
    company: "Cebu Pacific Air",
    email: "m.santos@cebupacificair.com",
    phone: "+63 920 804 0044",
    service: "Social Media Management",
    budget: "₱80,000 / month",
    message: "Looking for an agency to fully manage our Instagram and TikTok. Current provider is underperforming.",
    receivedAt: "2026-06-10 11:45",
    status: "Negotiating",
  },
  {
    id: "ai5",
    from: "Harold Reyes",
    company: "ICTSI",
    email: "h.reyes@ictsi.com",
    phone: "+63 906 805 0055",
    service: "Media Buying & Planning",
    budget: "₱3,000,000",
    message: "Seeking a media agency to handle our Q4 OOH and digital media buys for port infrastructure awareness.",
    receivedAt: "2026-06-08 08:20",
    status: "Closed Won",
  },
];
