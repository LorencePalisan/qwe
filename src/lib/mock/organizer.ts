// ── Types ─────────────────────────────────────────────────────────────────────

export type OrganizerEventStatus = "Planning" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";

export type OrganizerEvent = {
  id: string;
  name: string;
  client: string;
  date: string;
  venue: string;
  type: string;
  budget: number;
  expenses: number;
  attendees: number;
  capacity: number;
  status: OrganizerEventStatus;
  thumbnail?: string;
};

export type Vendor = {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  phone: string;
  rating: number;
  priceRange: string;
  status: "Active" | "On Hold" | "Inactive";
  lastUsed: string;
};

export type OrganizerService = {
  id: string;
  name: string;
  description: string;
  price: number;
  pricingType: "Fixed" | "Starting at" | "Per head";
  category: string;
  included: string[];
  active: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Available" | "Busy" | "Off";
  assignedEvents: number;
  avatar?: string;
};

export type OrganizerInquiry = {
  id: string;
  from: string;
  company: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guestCount: number;
  budget: string;
  message: string;
  receivedAt: string;
  status: "New" | "Replied" | "Quoted" | "Booked" | "Declined";
};

// ── Data ──────────────────────────────────────────────────────────────────────

export const ORGANIZER_EVENTS: OrganizerEvent[] = [
  {
    id: "oe1",
    name: "Santos–Reyes Wedding",
    client: "Maria Santos",
    date: "2026-07-12",
    venue: "Solaire Resort Ballroom, Parañaque",
    type: "Wedding",
    budget: 850000,
    expenses: 620000,
    attendees: 0,
    capacity: 300,
    status: "Planning",
  },
  {
    id: "oe2",
    name: "Tech Forward Summit 2026",
    client: "Globe Telecom",
    date: "2026-08-05",
    venue: "SMX Convention Center, Pasay",
    type: "Corporate",
    budget: 2500000,
    expenses: 1800000,
    attendees: 850,
    capacity: 1200,
    status: "Confirmed",
  },
  {
    id: "oe3",
    name: "Dela Cruz 50th Birthday Gala",
    client: "Roberto Dela Cruz",
    date: "2026-06-28",
    venue: "The Peninsula Manila, Makati",
    type: "Birthday",
    budget: 450000,
    expenses: 390000,
    attendees: 0,
    capacity: 120,
    status: "In Progress",
  },
  {
    id: "oe4",
    name: "Accenture Year-End Party",
    client: "Accenture Philippines",
    date: "2025-12-20",
    venue: "Conrad Manila, Pasay",
    type: "Corporate",
    budget: 1200000,
    expenses: 1150000,
    attendees: 420,
    capacity: 500,
    status: "Completed",
  },
  {
    id: "oe5",
    name: "Lim Family Reunion",
    client: "Jonathan Lim",
    date: "2026-09-14",
    venue: "Palawan Hidden Garden Resort",
    type: "Private",
    budget: 320000,
    expenses: 0,
    attendees: 0,
    capacity: 80,
    status: "Planning",
  },
  {
    id: "oe6",
    name: "BDO Leadership Conference",
    client: "Banco de Oro",
    date: "2026-10-08",
    venue: "Raffles Makati Ballroom",
    type: "Corporate",
    budget: 1800000,
    expenses: 0,
    attendees: 0,
    capacity: 350,
    status: "Confirmed",
  },
];

export const VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Lumino Photo & Film",
    category: "Photography",
    contact: "Carlo Lumino",
    email: "carlo@luminophoto.ph",
    phone: "+63 917 234 5678",
    rating: 4.9,
    priceRange: "₱35,000–₱80,000",
    status: "Active",
    lastUsed: "2026-06-28",
  },
  {
    id: "v2",
    name: "Flavors Unlimited Catering",
    category: "Catering",
    contact: "Ana Mercado",
    email: "ana@flavorsunlimited.ph",
    phone: "+63 998 345 6789",
    rating: 4.7,
    priceRange: "₱1,200–₱2,500 / head",
    status: "Active",
    lastUsed: "2026-06-12",
  },
  {
    id: "v3",
    name: "Soundwave AV Solutions",
    category: "Audio / Visual",
    contact: "Mark Tanaka",
    email: "mark@soundwaveav.ph",
    phone: "+63 912 456 7890",
    rating: 4.8,
    priceRange: "₱25,000–₱120,000",
    status: "Active",
    lastUsed: "2026-05-20",
  },
  {
    id: "v4",
    name: "Bloom & Co. Flowers",
    category: "Decoration",
    contact: "Liza Reyes",
    email: "liza@bloomandco.ph",
    phone: "+63 920 567 8901",
    rating: 4.6,
    priceRange: "₱15,000–₱60,000",
    status: "Active",
    lastUsed: "2026-07-12",
  },
  {
    id: "v5",
    name: "Premier Transport PH",
    category: "Transportation",
    contact: "Ben Castro",
    email: "ben@premiertransport.ph",
    phone: "+63 906 678 9012",
    rating: 4.5,
    priceRange: "₱5,000–₱25,000",
    status: "On Hold",
    lastUsed: "2025-11-30",
  },
  {
    id: "v6",
    name: "DJ Kyx Entertainment",
    category: "Entertainment",
    contact: "Kyle Ignacio",
    email: "kyle@djkyx.com",
    phone: "+63 915 789 0123",
    rating: 5.0,
    priceRange: "₱30,000–₱75,000",
    status: "Active",
    lastUsed: "2025-12-20",
  },
  {
    id: "v7",
    name: "Cake Studio by Mara",
    category: "Cakes & Pastry",
    contact: "Mara Yap",
    email: "mara@cakestudiomara.ph",
    phone: "+63 919 890 1234",
    rating: 4.8,
    priceRange: "₱8,000–₱35,000",
    status: "Active",
    lastUsed: "2026-06-28",
  },
];

export const ORGANIZER_SERVICES: OrganizerService[] = [
  {
    id: "os1",
    name: "Classic Wedding Package",
    description: "Full-day wedding coordination with vendor management, timeline, and on-site team.",
    price: 180000,
    pricingType: "Starting at",
    category: "Wedding",
    included: ["Day-of coordinator", "Vendor liaison", "Timeline creation", "Rehearsal direction", "2 assistants"],
    active: true,
  },
  {
    id: "os2",
    name: "Corporate Event Package",
    description: "End-to-end corporate event management from venue sourcing to post-event report.",
    price: 250000,
    pricingType: "Starting at",
    category: "Corporate",
    included: ["Venue sourcing", "AV management", "Catering coordination", "Speaker logistics", "Post-event report"],
    active: true,
  },
  {
    id: "os3",
    name: "Birthday Celebration Package",
    description: "Intimate or grand birthday parties with theme styling and entertainment.",
    price: 80000,
    pricingType: "Starting at",
    category: "Birthday",
    included: ["Theme concept", "Decoration", "Photo booth", "Entertainment booking", "Cake coordination"],
    active: true,
  },
  {
    id: "os4",
    name: "Full Planning Package",
    description: "12-month comprehensive planning for weddings and large-scale events.",
    price: 350000,
    pricingType: "Starting at",
    category: "Wedding",
    included: ["Budget management", "Vendor selection", "Monthly check-ins", "Full coordination", "3 assistants on-day"],
    active: true,
  },
  {
    id: "os5",
    name: "Concert & Live Show Package",
    description: "Stage production, crowd management, and artist logistics.",
    price: 500000,
    pricingType: "Starting at",
    category: "Concert",
    included: ["Stage design", "Sound & lighting", "Security coordination", "Artist rider", "Ticketing support"],
    active: false,
  },
];

export const ORGANIZER_TEAM: TeamMember[] = [
  { id: "tm1", name: "Kristine Flores", role: "Senior Coordinator", email: "kristine@whodini.io", phone: "+63 917 111 1111", status: "Busy", assignedEvents: 3 },
  { id: "tm2", name: "Paolo Ramos", role: "AV Technician", email: "paolo@whodini.io", phone: "+63 917 222 2222", status: "Available", assignedEvents: 1 },
  { id: "tm3", name: "Diane Uy", role: "On-Site Coordinator", email: "diane@whodini.io", phone: "+63 917 333 3333", status: "Available", assignedEvents: 2 },
  { id: "tm4", name: "Ralph Mendoza", role: "Logistics Lead", email: "ralph@whodini.io", phone: "+63 917 444 4444", status: "Busy", assignedEvents: 2 },
  { id: "tm5", name: "Sheena Cruz", role: "Client Relations", email: "sheena@whodini.io", phone: "+63 917 555 5555", status: "Available", assignedEvents: 0 },
  { id: "tm6", name: "Mark Navarro", role: "Decoration Specialist", email: "mark@whodini.io", phone: "+63 917 666 6666", status: "Off", assignedEvents: 0 },
];

export const ORGANIZER_INQUIRIES: OrganizerInquiry[] = [
  {
    id: "oi1",
    from: "Angela Reyes",
    company: "",
    email: "angela.reyes@gmail.com",
    phone: "+63 917 100 2002",
    eventType: "Wedding",
    date: "2026-11-22",
    guestCount: 250,
    budget: "₱800,000–₱1,000,000",
    message: "Hi! We're planning a garden wedding in November. Can you accommodate 250 guests with full coordination?",
    receivedAt: "2026-06-14 09:31",
    status: "New",
  },
  {
    id: "oi2",
    from: "Raymond Tan",
    company: "Tan Holdings Inc.",
    email: "raymond.tan@tanholdings.com",
    phone: "+63 998 200 3003",
    eventType: "Corporate",
    date: "2026-09-05",
    guestCount: 500,
    budget: "₱2,000,000+",
    message: "We need an organizer for our annual shareholders meeting and gala dinner in September.",
    receivedAt: "2026-06-13 14:05",
    status: "Replied",
  },
  {
    id: "oi3",
    from: "Grace Villanueva",
    company: "",
    email: "grace.vill@yahoo.com",
    phone: "+63 920 300 4004",
    eventType: "Birthday",
    date: "2026-08-18",
    guestCount: 80,
    budget: "₱150,000–₱200,000",
    message: "Planning a surprise 40th birthday party for my husband. Needs to be elegant and luxurious.",
    receivedAt: "2026-06-12 11:22",
    status: "Quoted",
  },
  {
    id: "oi4",
    from: "Carlos Gomez",
    company: "GVG Productions",
    email: "c.gomez@gvgprod.ph",
    phone: "+63 915 400 5005",
    eventType: "Concert",
    date: "2026-12-31",
    guestCount: 3000,
    budget: "₱5,000,000+",
    message: "Looking for a production company to handle a New Year's Eve concert event. Are you experienced with this?",
    receivedAt: "2026-06-10 16:45",
    status: "New",
  },
  {
    id: "oi5",
    from: "Marivic Santos",
    company: "SM Supermalls",
    email: "m.santos@sm.com.ph",
    phone: "+63 998 500 6006",
    eventType: "Corporate",
    date: "2026-07-30",
    guestCount: 200,
    budget: "₱600,000–₱800,000",
    message: "We need event support for our SM Brand Fair happening in July. Can you provide coordination services?",
    receivedAt: "2026-06-09 08:10",
    status: "Booked",
  },
];
