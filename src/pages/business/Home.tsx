import { useNavigate } from "react-router-dom";
import {
  Building2, ShoppingBag, Star, DollarSign, TrendingUp,
  Users, Bell, Mail, Store, LayoutGrid, Settings, Calendar,
  Award, Zap,
} from "@/icons";
import { cn } from "@/lib/utils";
import {
  BUSINESS_DASHBOARD, CATALOG_ITEMS, BUSINESS_EVENTS, SUBSCRIBERS, HISTORY_EVENTS,
} from "@/lib/mock/business";

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label, value, icon: Icon, accent,
}: {
  label: string; value: string | number; icon: React.ElementType; accent: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className={cn("flex size-9 items-center justify-center rounded-xl", accent)}>
          <Icon className="size-4" />
        </div>
        <TrendingUp className="size-4 text-foreground/45" />
      </div>
      <p className="text-[26px] font-bold text-foreground">{value}</p>
      <p className="mt-0.5 text-[12px] text-foreground/50">{label}</p>
    </div>
  );
}

// ── Quick Link ────────────────────────────────────────────────────────────────

function QuickLink({
  label, href, icon: Icon, color,
}: {
  label: string; href: string; icon: React.ElementType; color: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(href)}
      className="flex flex-col items-center gap-2 transition-all hover:-translate-y-0.5"
    >
      <div
        className="flex size-13 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="size-5" style={{ color }} />
      </div>
      <span className="text-[11px] font-medium text-foreground/60">{label}</span>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Services",      href: "/business/services",      icon: ShoppingBag, color: "#7c3aed" },
  { label: "Events",        href: "/business/events",        icon: Calendar,    color: "#0ea5e9" },
  { label: "Subscribers",   href: "/business/subscribers",   icon: Users,       color: "#16a34a" },
  { label: "Inquiries",     href: "/business/inquiries",     icon: Mail,        color: "#f97316" },
  { label: "Notifications", href: "/business/notifications", icon: Bell,        color: "#F62C7D" },
  { label: "Workspace",     href: "/business/workspace",     icon: LayoutGrid,  color: "#06b6d4" },
  { label: "Brands",        href: "/business/brands",        icon: Store,       color: "#a855f7" },
  { label: "Settings",      href: "/business/settings",      icon: Settings,    color: "#64748b" },
];

const EVENT_TYPE_COLOR: Record<string, string> = {
  in_person: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  virtual:   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  hybrid:    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
};

const HISTORY_ICON_COLOR: Record<string, { icon: React.ElementType; color: string }> = {
  sale_completed:     { icon: DollarSign,  color: "#16a34a" },
  subscriber_added:   { icon: Users,       color: "#0ea5e9" },
  review_received:    { icon: Star,        color: "#f59e0b" },
  notification_sent:  { icon: Bell,        color: "#6366f1" },
  milestone_reached:  { icon: TrendingUp,  color: "#8b5cf6" },
  content_updated:    { icon: ShoppingBag, color: "#f97316" },
  subscriber_removed: { icon: Users,       color: "#ef4444" },
};

export default function BusinessHome() {
  const navigate = useNavigate();
  const { businessName, whodiniId, stats } = BUSINESS_DASHBOARD;

  const flagship = CATALOG_ITEMS.find((i) => i.id === BUSINESS_DASHBOARD.flagshipProductId);
  const upcomingEvents = BUSINESS_EVENTS.filter(
    (e) => new Date(e.startsAt) > new Date(),
  ).slice(0, 3);
  const recentSubscribers = SUBSCRIBERS.filter((s) => s.status === "active").slice(0, 4);
  const recentHistory = HISTORY_EVENTS.slice(0, 5);

  return (
    <div className="pb-16">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#ff5f6d]/8 via-background to-[#ffc371]/8 px-6 py-8">
        <div className="absolute -right-16 -top-16 size-64 rounded-full bg-[#F62C7D]/5 blur-3xl" />
        <div className="relative">
          <div className="mb-1 flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5f6d] to-[#ffc371]">
              <Building2 className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-foreground">{businessName}</h1>
              <p className="text-[11px] text-foreground/60">{whodiniId}</p>
            </div>
          </div>
          {flagship && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200/60 bg-amber-50/80 px-3 py-1 dark:border-amber-700/40 dark:bg-amber-900/20">
              <Award className="size-3 text-amber-500" />
              <span className="text-[11px] font-medium text-amber-700 dark:text-amber-300">
                Flagship: {flagship.title}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Total Items"    value={stats.totalItems}  icon={ShoppingBag}  accent="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
          <StatCard label="Services"       value={stats.services}    icon={Zap}          accent="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
          <StatCard label="Products"       value={stats.products}    icon={Store}        accent="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" />
          <StatCard label="Avg Price (₱)"  value={`₱${stats.avgPrice.toLocaleString()}`} icon={DollarSign} accent="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        </div>

        {/* ── Quick Links ────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
            <h2 className="text-[17px] font-bold text-foreground">Quick Access</h2>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {QUICK_LINKS.map((l) => <QuickLink key={l.href} {...l} />)}
          </div>
        </section>

        {/* ── Upcoming Events ────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
              <h2 className="text-[17px] font-bold text-foreground">Upcoming Events</h2>
            </div>
            <button
              onClick={() => navigate("/business/events")}
              className="text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70"
            >
              See all →
            </button>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-[13px] text-foreground/60">No upcoming events.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => navigate("/business/events")}
                  className="cursor-pointer rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-[#F62C7D]/20 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <p className="text-[14px] font-semibold text-foreground leading-snug">{ev.title}</p>
                    {ev.isAdvertised && (
                      <span className="shrink-0 rounded-full bg-[#F62C7D]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F62C7D]">
                        Advertised
                      </span>
                    )}
                  </div>
                  <p className="mb-3 text-[12px] leading-relaxed text-foreground/50 line-clamp-2">{ev.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", EVENT_TYPE_COLOR[ev.locationType])}>
                      {ev.locationType.replace("_", " ")}
                    </span>
                    <span className="text-[11px] text-foreground/60">
                      {new Date(ev.startsAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    {ev.paymentType === "paid" && (
                      <span className="text-[11px] text-foreground/60">₱{ev.price.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Recent Subscribers ─────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
              <h2 className="text-[17px] font-bold text-foreground">Recent Subscribers</h2>
            </div>
            <button
              onClick={() => navigate("/business/subscribers")}
              className="text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70"
            >
              See all →
            </button>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {recentSubscribers.map((sub, i) => (
              <div
                key={sub.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-foreground/3",
                  i !== recentSubscribers.length - 1 && "border-b border-border",
                )}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/10 text-[11px] font-bold text-[#F62C7D]">
                  {sub.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">{sub.name}</p>
                  <p className="truncate text-[11px] text-foreground/60">{sub.email}</p>
                </div>
                <span className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
                  sub.tier === "premium"
                    ? "bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] text-white"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                )}>
                  {sub.tier}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Recent Activity ────────────────────────────────────────────── */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
              <h2 className="text-[17px] font-bold text-foreground">Recent Activity</h2>
            </div>
            <button
              onClick={() => navigate("/business/history")}
              className="text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70"
            >
              See all →
            </button>
          </div>
          <div className="space-y-2">
            {recentHistory.map((ev) => {
              const cfg = HISTORY_ICON_COLOR[ev.type] ?? { icon: Bell, color: "#64748b" };
              const Icon = cfg.icon;
              return (
                <div
                  key={ev.id}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <div
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${cfg.color}18` }}
                  >
                    <Icon className="size-3.5" style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground">{ev.title}</p>
                    <p className="text-[11px] text-foreground/50">{ev.description}</p>
                  </div>
                  <span className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                    ev.importance === "high"
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : ev.importance === "medium"
                      ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      : "bg-foreground/8 text-foreground/60",
                  )}>
                    {ev.importance}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
