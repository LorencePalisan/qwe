import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import {
  ChevronRight,
  Plus,
  Mail,
  ShoppingBag,
  Receipt,
  Newspaper,
  Heart,
  Activity,
  Briefcase,
  Star,
  Tv,
  Leaf,
  Dumbbell,
  Plane,
  Bike,
  Cpu,
  Bell,
  Play,
} from "@/icons";

// ── Figma MCP assets from Cover section (valid ~7 days) ───────────────────
const heroBg = "https://www.figma.com/api/mcp/asset/6fc888e4-31e3-4933-9543-fa049b46bf9a";
const sunburnLogo = "https://www.figma.com/api/mcp/asset/d2309886-a41e-47c7-8ee5-ad3d8d78c86f";
const communityIcon = "https://www.figma.com/api/mcp/asset/9760f648-6d95-419d-acde-2dc8eb9778b0";
const t1 = "https://www.figma.com/api/mcp/asset/441d8f36-82d6-4673-b201-8b8626b917e0";
const t2 = "https://www.figma.com/api/mcp/asset/ac7102b3-8018-4cc5-ad2b-ec0f9339b753";
const t3 = "https://www.figma.com/api/mcp/asset/b5282bb7-0d23-48b6-80ad-c3190f9a2e32";
const t4 = "https://www.figma.com/api/mcp/asset/05a23be4-8739-4d81-9db7-a4102da1a388";

// ── Helpers ───────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  hasArrow,
  className,
}: {
  title: string;
  hasArrow?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex items-center gap-1.5", className)}>
      <h2 className="text-[20px] font-bold leading-8.5 text-white">{title}</h2>
      {hasArrow && <ChevronRight className="mt-0.5 size-3.5 text-[#999]" />}
    </div>
  );
}

function AppTile({
  color,
  label,
  icon: Icon,
  className,
}: {
  color: string;
  label?: string;
  icon?: ElementType;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold text-white",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      {Icon ? <Icon className="size-5 text-white" /> : label}
    </div>
  );
}

function FavTile({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-37 flex-col justify-between rounded-[14px] border border-white/12 bg-white/10 p-4">
      <span className="text-[16px] font-semibold text-white">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function PhotoCard({
  gradient,
  tag,
  title,
  meta,
  className,
}: {
  gradient: string;
  tag?: string;
  title: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <div className={cn("absolute inset-0 bg-linear-to-br", gradient)} />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-4">
        {tag && (
          <span className="self-start rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white">
            {tag}
          </span>
        )}
        <div className="mt-auto">
          <p className="text-sm font-semibold leading-snug text-white">{title}</p>
          {meta && <p className="mt-0.5 text-xs text-[#999]">{meta}</p>}
        </div>
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────

const TOPICS = [
  { label: "Entertainment", Icon: Tv },
  { label: "Wellness", Icon: Leaf },
  { label: "Sports", Icon: Dumbbell },
  { label: "Travel", Icon: Plane },
  { label: "Fitness", Icon: Bike },
  { label: "Tech", Icon: Cpu },
];

const NOTIFICATIONS = [
  { app: "Mail", title: "New message from Sarah", time: "2m ago", color: "#1a73e8" },
  { app: "Calendar", title: "Meeting in 30 minutes", time: "15m ago", color: "#4285f4" },
  { app: "Fitness", title: "Daily goal achieved!", time: "1h ago", color: "#22c55e" },
  { app: "News", title: "Breaking: New AI policy announced", time: "2h ago", color: "#ea4335" },
  { app: "Shopping", title: "Your order has shipped", time: "3h ago", color: "#f97316" },
  { app: "Health", title: "Time to log your meals", time: "4h ago", color: "#ec4899" },
  { app: "Social", title: "Alex liked your post", time: "5h ago", color: "#0077b5" },
  { app: "Bills", title: "Payment due tomorrow", time: "6h ago", color: "#eab308" },
];

const SUBSCRIPTIONS = [
  { name: "Netflix", type: "Streaming", price: "$15.99/mo", color: "#e50914", abbr: "N" },
  { name: "Spotify", type: "Music", price: "$9.99/mo", color: "#1db954", abbr: "S" },
  { name: "NY Times", type: "News", price: "$17.00/mo", color: "#333333", abbr: "NYT" },
  { name: "Adobe CC", type: "Creative Suite", price: "$54.99/mo", color: "#ff0000", abbr: "Ai" },
  { name: "GitHub", type: "Dev Tools", price: "$4.00/mo", color: "#24292e", abbr: "GH" },
  { name: "Duolingo", type: "Learning", price: "Free", color: "#58cc02", abbr: "D" },
  { name: "LinkedIn", type: "Professional", price: "$39.99/mo", color: "#0077b5", abbr: "in" },
  { name: "Hulu", type: "Streaming", price: "$7.99/mo", color: "#3dbb3d", abbr: "H" },
];

const PROFILES = [
  { name: "Alex M.", gradient: "from-[#4f46e5] to-[#7c3aed]" },
  { name: "Sarah K.", gradient: "from-[#0ea5e9] to-[#2563eb]" },
  { name: "James R.", gradient: "from-[#ec4899] to-[#f43f5e]" },
  { name: "Priya L.", gradient: "from-[#10b981] to-[#059669]" },
  { name: "Carlos M.", gradient: "from-[#f59e0b] to-[#f97316]" },
  { name: "Emma W.", gradient: "from-[#8b5cf6] to-[#6366f1]" },
  { name: "Kai T.", gradient: "from-[#14b8a6] to-[#0ea5e9]" },
  { name: "Olivia B.", gradient: "from-[#f43f5e] to-[#ef4444]" },
];

const COMMUNITIES = [
  { tag: "Tech", title: "AI & Machine Learning Hub", gradient: "from-[#1a2038] to-[#0d1025]" },
  { tag: "Wellness", title: "Mindful Living Community", gradient: "from-[#1e2820] to-[#0d1a10]" },
  { tag: "Sports", title: "Urban Runners Club", gradient: "from-[#201a28] to-[#100d1a]" },
  { tag: "Music", title: "Indie Artists Collective", gradient: "from-[#281a1a] to-[#1a0d0d]" },
];

const EVENTS = [
  { tag: "Music", title: "Sunburn Festival 2026", meta: "New York  •  12 Jun", gradient: "from-[#0d1a28] to-[#070d18]" },
  { tag: "Tech", title: "AWS Summit NYC", meta: "New York  •  18 Jun", gradient: "from-[#1a1a28] to-[#0d0d18]" },
  { tag: "Food", title: "Smorgasburg Summer", meta: "Brooklyn  •  22 Jun", gradient: "from-[#281a0d] to-[#180d07]" },
  { tag: "Art", title: "Art Basel Miami", meta: "Miami  •  05 Jul", gradient: "from-[#201028] to-[#120818]" },
];

const GAMES = [
  { title: "Evolution Simulator", plays: "4.8m plays", cta: "Play", gradient: "from-[#0d2238] to-[#071018]" },
  { title: "City Builder Pro", plays: "2.1m plays", cta: "Continue", gradient: "from-[#1a2810] to-[#0d1808]" },
  { title: "Dragon Quest VI", plays: "1.5m plays", cta: "Play", gradient: "from-[#280d0d] to-[#180707]" },
  { title: "Racing League", plays: "3.2m plays", cta: "Continue", gradient: "from-[#1a0d28] to-[#0d0718]" },
  { title: "Puzzle Master", plays: "890k plays", cta: "Play", gradient: "from-[#281a0d] to-[#180d07]" },
];

const DISCOVER = [
  { cat: "Travel", title: "Hidden Gems of Tokyo", gradient: "from-[#1a2838] to-[#0d1520]" },
  { cat: "Food", title: "Michelin Stars 2026", gradient: "from-[#281a10] to-[#180d08]" },
  { cat: "Tech", title: "GPT-5 Deep Dive", gradient: "from-[#1a1a30] to-[#0d0d20]" },
  { cat: "Sports", title: "World Cup Preview 2026", gradient: "from-[#0d2815] to-[#071808]" },
  { cat: "Wellness", title: "Sleep Optimization Guide", gradient: "from-[#201028] to-[#120818]" },
  { cat: "Music", title: "Summer Playlist 2026", gradient: "from-[#28200d] to-[#181407]" },
  { cat: "Fashion", title: "Street Style New York", gradient: "from-[#280d20] to-[#180714]" },
  { cat: "Science", title: "Mars Mission Update", gradient: "from-[#0d2028] to-[#071318]" },
  { cat: "Business", title: "Startup Funding Q2", gradient: "from-[#1a2820] to-[#0d1810]" },
  { cat: "Art", title: "Digital Art Revolution", gradient: "from-[#281818] to-[#180d0d]" },
  { cat: "Travel", title: "Mediterranean Cruise Guide", gradient: "from-[#102028] to-[#081318]" },
  { cat: "Health", title: "Longevity Research 2026", gradient: "from-[#1e2808] to-[#111804]" },
  { cat: "Tech", title: "Quantum Computing 101", gradient: "from-[#0d0d28] to-[#070718]" },
  { cat: "Culture", title: "Cannes Film Highlights", gradient: "from-[#280d10] to-[#180708]" },
  { cat: "Nature", title: "Amazon Biodiversity", gradient: "from-[#082810] to-[#041808]" },
  { cat: "Finance", title: "Crypto Market 2026", gradient: "from-[#281a08] to-[#180e04]" },
];

// ── Main ──────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div className="dark flex min-h-screen bg-background font-sans">
      <Sidebar />

      {/* ── Main content shifted right of sidebar ─────────────────── */}
      <div className="flex-1 pl-20">

      {/* ── Cover / Hero ──────────────────────────────────────────── */}
      <section className="relative h-165 w-full overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />

        <div className="absolute left-0 top-0 flex h-full max-w-150 flex-col justify-center gap-5 px-22.5 pb-25 pt-15">
          {/* Community badge */}
          <div className="flex items-center gap-1.5 self-start rounded-md border border-[#3c5aa8] bg-white/10 px-2 py-0.5">
            <img src={communityIcon} alt="" className="size-3.5" />
            <span className="text-xs font-medium text-white">Community</span>
          </div>

          {/* Sunburn logo */}
          <img src={sunburnLogo} alt="Sunburn" className="h-14.25 w-auto self-start" />

          {/* Date · Location */}
          <div className="flex items-center gap-3 text-base text-white">
            <span>12 June 2026</span>
            <span className="text-[#999]">•</span>
            <span>New York</span>
          </div>

          {/* Description */}
          <p className="max-w-100 text-sm leading-relaxed text-muted-foreground">
            Following a landmark debut in New York last year, Sunburn Festival returns to the
            city in 2026, building on its momentum with an even more elevated experience.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-[#F62C7D] px-6 py-3 text-[14.4px] font-semibold text-white shadow-[rgba(246,44,125,0.35)_0px_4px_20px_0px]">
              View Details
            </button>
            <button className="flex size-11 items-center justify-center rounded-full bg-white/20">
              <Plus className="size-4 text-white" />
            </button>
          </div>

          {/* Carousel thumbnails */}
          <div className="flex items-center gap-2.5 pt-2">
            {[t1, t2, t3, t4].map((src, i) => (
              <div
                key={i}
                className={cn(
                  "h-15 w-24 shrink-0 overflow-hidden rounded-[10px]",
                  i === 0 ? "ring-[1.5px] ring-white" : "opacity-60",
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
            <button className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20">
              <ChevronRight className="size-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Dashboard Content ─────────────────────────────────────── */}
      <div className="px-20 py-15">
        <div className="flex flex-col gap-12.5">

          {/* FAVORITES */}
          <section>
            <SectionHeader title="Favorites" />
            <div className="grid grid-cols-6 gap-5">
              <FavTile label="Calendar">
                <p className="mb-0.5 text-[10px] text-[#999]">Monday</p>
                <p className="text-4xl font-bold leading-none text-white">May 26</p>
              </FavTile>

              <FavTile label="Email">
                <div className="flex gap-3">
                  <AppTile color="#1a73e8" icon={Mail} />
                  <AppTile color="#ea4335" icon={Mail} />
                </div>
              </FavTile>

              <FavTile label="Photos">
                <div className="flex gap-2">
                  {[t1, t2, t3, t4].map((src, i) => (
                    <div key={i} className="size-10 overflow-hidden rounded-lg">
                      <img src={src} alt="" className="size-full object-cover" />
                    </div>
                  ))}
                </div>
              </FavTile>

              <FavTile label="Books">
                <div className="flex gap-3">
                  {["#7c3aed", "#2563eb", "#dc2626", "#16a34a"].map((c) => (
                    <div key={c} className="h-14 w-11.25 shrink-0 rounded" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </FavTile>

              <FavTile label="Shopping">
                <div className="flex gap-3">
                  {["#f97316", "#a855f7", "#14b8a6", "#f43f5e"].map((c) => (
                    <AppTile key={c} color={c} icon={ShoppingBag} />
                  ))}
                </div>
              </FavTile>

              <FavTile label="Bills">
                <div className="flex gap-3">
                  {["#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((c) => (
                    <AppTile key={c} color={c} icon={Receipt} />
                  ))}
                </div>
              </FavTile>

              <FavTile label="News">
                <div className="flex gap-3">
                  {["#6366f1", "#ec4899", "#8b5cf6", "#06b6d4"].map((c) => (
                    <AppTile key={c} color={c} icon={Newspaper} />
                  ))}
                </div>
              </FavTile>

              <FavTile label="Social Media">
                <div className="flex gap-3">
                  <AppTile color="#0077b5" label="in" />
                  <AppTile color="#1877f2" label="f" />
                  <AppTile color="#111111" label="𝕏" />
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-linear-to-br from-purple-600 via-pink-500 to-orange-400 text-[11px] font-bold text-white">
                    IG
                  </div>
                </div>
              </FavTile>

              <FavTile label="Health">
                <div className="flex gap-3">
                  <AppTile color="#ec4899" icon={Heart} />
                  <AppTile color="#ef4444" icon={Activity} />
                  <AppTile color="#f97316" />
                </div>
              </FavTile>

              <FavTile label="Fitness">
                <div className="flex gap-3">
                  <AppTile color="#22c55e" icon={Activity} />
                  <AppTile color="#3b82f6" icon={Bike} />
                </div>
              </FavTile>

              <FavTile label="Job Search">
                <div className="flex gap-3">
                  <AppTile color="#0077b5" icon={Briefcase} />
                  <AppTile color="#f59e0b" />
                  <AppTile color="#6366f1" />
                </div>
              </FavTile>

              <FavTile label="Horoscope">
                <div className="flex gap-3">
                  <AppTile color="#7c3aed" icon={Star} />
                  <AppTile color="#c026d3" />
                </div>
              </FavTile>
            </div>
          </section>

          {/* TOPICS */}
          <section>
            <SectionHeader title="Topics" />
            <div className="grid grid-cols-6 gap-5">
              {TOPICS.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="relative h-37 overflow-hidden rounded-[14px] border border-white/12 bg-white/10"
                >
                  <div className="absolute right-4 top-4 text-white/15">
                    <Icon className="size-16.75" />
                  </div>
                  <p className="absolute bottom-4 left-4 text-base font-medium text-white">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section>
            <SectionHeader title="Notifications" hasArrow />
            <div className="grid grid-cols-4 gap-5">
              {NOTIFICATIONS.map(({ app, title, time, color }) => (
                <div
                  key={app + title}
                  className="flex h-26 items-center gap-3 rounded-[14px] border border-white/12 bg-white/10 px-7"
                >
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: color }}
                  >
                    <Bell className="size-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-[#999]">{app}</p>
                    <p className="truncate text-[13px] font-medium text-white">{title}</p>
                  </div>
                  <p className="shrink-0 text-[11px] text-[#999]">{time}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SUBSCRIPTIONS */}
          <section>
            <SectionHeader title="Subscriptions" hasArrow />
            <div className="grid grid-cols-4 gap-5">
              {SUBSCRIPTIONS.map(({ name, type, price, color, abbr }) => (
                <div
                  key={name}
                  className="flex h-26.25 items-center gap-3 rounded-[14px] border border-white/12 bg-white/10 px-7"
                >
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {abbr}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-white">{name}</p>
                    <p className="text-[11px] text-[#999]">{type}</p>
                  </div>
                  <p className="shrink-0 text-[13px] font-medium text-[#999]">{price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CONNECTIONS */}
          <section>
            <SectionHeader title="Connections" hasArrow />
            <div className="grid grid-cols-8 gap-10">
              {PROFILES.map(({ name, gradient }) => (
                <div
                  key={name}
                  className="flex h-47.25 flex-col items-center justify-center gap-3 rounded-[14px] border border-white/12 bg-white/10 p-4"
                >
                  <div className={cn("size-20 rounded-full bg-linear-to-br", gradient)} />
                  <p className="text-center text-[13px] font-medium text-white">{name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* COMMUNITIES */}
          <section>
            <SectionHeader title="Communities" hasArrow />
            <div className="grid grid-cols-4 gap-5">
              {COMMUNITIES.map((card) => (
                <PhotoCard key={card.title} {...card} className="h-65.25" />
              ))}
            </div>
          </section>

          {/* EVENTS */}
          <section>
            <SectionHeader title="Events" hasArrow />
            <div className="grid grid-cols-4 gap-5">
              {EVENTS.map((card) => (
                <PhotoCard key={card.title} {...card} className="h-65.25" />
              ))}
            </div>
          </section>

          {/* GAMES */}
          <section>
            <SectionHeader title="Games" hasArrow />
            <div className="flex gap-5">
              {GAMES.map(({ title, plays, cta, gradient }) => (
                <div
                  key={title}
                  className={cn(
                    "relative h-101 w-55.25 shrink-0 overflow-hidden rounded-xl bg-linear-to-br",
                    gradient,
                  )}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 w-full p-4">
                    <p className="text-[13px] font-semibold text-white">{title}</p>
                    <p className="mb-3 mt-0.5 text-[11px] text-[#999]">{plays}</p>
                    <button className="flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      <Play className="size-3 fill-white" />
                      {cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DISCOVER */}
          <section>
            <SectionHeader title="Discover" />
            <div className="grid grid-cols-4 gap-5">
              {DISCOVER.map(({ cat, title, gradient }) => (
                <PhotoCard key={title} tag={cat} title={title} gradient={gradient} className="h-65.25" />
              ))}
            </div>
          </section>

        </div>
      </div>

      </div>{/* end flex-1 pl-20 wrapper */}
    </div>
  );
}
