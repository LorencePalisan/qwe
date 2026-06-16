import { useNavigate } from "react-router-dom";
import {
  Briefcase, Users, DollarSign, Calendar,
  ShoppingBag, BookOpen, Mail, CheckCircle2,
} from "@/icons";
import { cn } from "@/lib/utils";
import {
  FREELANCE_PROFILE, FREELANCE_METRICS, RECENT_ACTIVITY, UPCOMING_MILESTONES_PREVIEW,
} from "@/lib/mock/freelance";

// ── Availability dot ──────────────────────────────────────────────────────────

const AVAIL_COLOR = {
  available:   "bg-emerald-400",
  busy:        "bg-amber-400",
  unavailable: "bg-red-400",
};

const AVAIL_LABEL = {
  available:   "Available for work",
  busy:        "Currently busy",
  unavailable: "Not available",
};

// ── Metric Card ───────────────────────────────────────────────────────────────

function MetricCard({
  label, value, icon: Icon, color,
}: {
  label: string; value: string; icon: React.ElementType; color: string;
}) {
  return (
    <div
      className="rounded-2xl border border-border bg-card p-5 backdrop-blur-sm"
      style={{ boxShadow: `0 0 0 1px ${color}10, inset 0 1px 0 ${color}08` }}
    >
      <div className="mb-3 flex size-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18` }}>
        <Icon className="size-4" style={{ color }} />
      </div>
      <p className="text-[24px] font-bold text-foreground">{value}</p>
      <p className="mt-0.5 text-[12px] text-foreground/50">{label}</p>
    </div>
  );
}

// ── Milestone type config ─────────────────────────────────────────────────────

const MILESTONE_TYPE = {
  deadline:  { color: "#ef4444", label: "Deadline" },
  booking:   { color: "#3b82f6", label: "Booking" },
  follow_up: { color: "#f59e0b", label: "Follow-up" },
};

// ── Main ──────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Services",  href: "/freelance/services",  icon: ShoppingBag, color: "#7c3aed" },
  { label: "Clients",   href: "/freelance/clients",   icon: Users,       color: "#0ea5e9" },
  { label: "Calendar",  href: "/freelance/calendar",  icon: Calendar,    color: "#16a34a" },
  { label: "Portfolio", href: "/freelance/portfolio", icon: BookOpen,    color: "#f97316" },
  { label: "Inquiries", href: "/freelance/inquiries", icon: Mail,        color: "#F62C7D" },
];

export default function FreelanceHome() {
  const navigate   = useNavigate();
  const { displayName, availability } = FREELANCE_PROFILE;
  const metrics    = FREELANCE_METRICS;

  return (
    <div className="pb-16">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#7c3aed]/8 via-background to-[#0ea5e9]/8 px-6 py-8">
        <div className="absolute -right-16 -top-16 size-64 rounded-full bg-[#7c3aed]/5 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={FREELANCE_PROFILE.photoUrl}
              alt={displayName}
              className="size-14 rounded-2xl object-cover ring-2 ring-border"
            />
            <span className={cn(
              "absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-background",
              AVAIL_COLOR[availability],
            )} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-[20px] font-bold text-foreground">{displayName}</h1>
            <p className="text-[12px] text-foreground/50">{AVAIL_LABEL[availability]}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {FREELANCE_PROFILE.skills.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-card/80 px-2.5 py-0.5 text-[11px] font-medium text-foreground/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        {/* ── Metrics strip (mobile) ─────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard label="Total Clients"     value={String(metrics.totalClients)}       icon={Users}      color="#0ea5e9" />
          <MetricCard label="Services"           value={String(metrics.totalServices)}      icon={Briefcase}  color="#7c3aed" />
          <MetricCard label="Total Earnings"     value={`₱${(metrics.totalEarnings / 1000).toFixed(0)}K`} icon={DollarSign} color="#16a34a" />
          <MetricCard label="Milestones Due"     value={String(metrics.upcomingMilestones)} icon={Calendar}   color="#f97316" />
        </div>

        {/* ── Quick Links ────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
            <h2 className="text-[17px] font-bold text-foreground">Quick Access</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-styled">
            {QUICK_LINKS.map(({ label, href, icon: Icon, color }) => (
              <button
                key={href}
                onClick={() => navigate(href)}
                className="flex shrink-0 flex-col items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <div
                  className="flex size-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon className="size-6" style={{ color }} />
                </div>
                <span className="text-[11px] font-medium text-foreground/60">{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Upcoming Milestones ────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
              <h2 className="text-[17px] font-bold text-foreground">Upcoming Milestones</h2>
            </div>
            <button
              onClick={() => navigate("/freelance/calendar")}
              className="text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70"
            >
              See all →
            </button>
          </div>
          <div className="space-y-2">
            {UPCOMING_MILESTONES_PREVIEW.map((m) => {
              const cfg = MILESTONE_TYPE[m.type];
              return (
                <div
                  key={m.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <div
                    className="flex size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-[13px] font-medium text-foreground">{m.title}</p>
                    <p className="text-[11px] text-foreground/50">{m.clientName}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[12px] font-medium text-foreground/70">
                      {new Date(m.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                    <p className="text-[10px] text-foreground/60">{cfg.label}</p>
                  </div>
                </div>
              );
            })}
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
              onClick={() => navigate("/freelance/clients")}
              className="text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70"
            >
              See clients →
            </button>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {RECENT_ACTIVITY.map((a, i) => (
              <div
                key={a.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-foreground/3",
                  i !== RECENT_ACTIVITY.length - 1 && "border-b border-border",
                )}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">{a.serviceType}</p>
                  <p className="truncate text-[11px] text-foreground/50">{a.clientName}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[13px] font-semibold text-emerald-600 dark:text-emerald-400">
                    +₱{a.value.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-foreground/60">
                    {new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
