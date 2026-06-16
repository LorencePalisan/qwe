import { useState } from "react";
import {
  DollarSign, UserPlus, UserMinus, Bell, Star,
  Trophy, FileText, Users, Settings, Filter,
} from "@/icons";
import { cn } from "@/lib/utils";
import { HISTORY_EVENTS, type HistoryEvent } from "@/lib/mock/business";

// ── Config ────────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<HistoryEvent["type"], { icon: React.ElementType; color: string; label: string }> = {
  sale_completed:     { icon: DollarSign,  color: "#16a34a", label: "Sale" },
  subscriber_added:   { icon: UserPlus,    color: "#0ea5e9", label: "Subscriber Added" },
  subscriber_removed: { icon: UserMinus,   color: "#ef4444", label: "Subscriber Removed" },
  notification_sent:  { icon: Bell,        color: "#7c3aed", label: "Notification" },
  review_received:    { icon: Star,        color: "#f59e0b", label: "Review" },
  milestone_reached:  { icon: Trophy,      color: "#f97316", label: "Milestone" },
  content_updated:    { icon: FileText,    color: "#6b7280", label: "Content" },
  team_member_added:  { icon: Users,       color: "#0ea5e9", label: "Team" },
  settings_changed:   { icon: Settings,    color: "#6b7280", label: "Settings" },
};

const IMPORTANCE_CONFIG = {
  high:   { label: "High",   className: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  low:    { label: "Low",    className: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" },
};

const TYPE_TABS = [
  { value: "all",                label: "All" },
  { value: "sale_completed",     label: "Sales" },
  { value: "subscriber_added",   label: "Subscribers" },
  { value: "notification_sent",  label: "Notifications" },
  { value: "review_received",    label: "Reviews" },
  { value: "milestone_reached",  label: "Milestones" },
] as const;

const IMPORTANCE_TABS = ["all", "high", "medium", "low"] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

// ── Stats Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[22px] font-bold text-foreground" style={{ color }}>{value}</p>
      <p className="mt-0.5 text-[12px] text-foreground/50">{label}</p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BusinessHistory() {
  const [events] = useState(HISTORY_EVENTS);
  const [typeFilter, setTypeFilter]           = useState<string>("all");
  const [importanceFilter, setImportanceFilter] = useState<string>("all");

  const highCount   = events.filter((e) => e.importance === "high").length;
  const mediumCount = events.filter((e) => e.importance === "medium").length;

  const filtered = events.filter((e) => {
    const matchType       = typeFilter === "all" || e.type === typeFilter;
    const matchImportance = importanceFilter === "all" || e.importance === importanceFilter;
    return matchType && matchImportance;
  });

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-[22px] font-bold text-foreground">History</h1>
        <p className="text-[13px] text-foreground/50">Activity timeline for your business account</p>
      </div>

      <div className="px-4 py-6 sm:px-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard label="Total Events"   value={events.length} color="#7c3aed" />
          <StatCard label="High Priority"  value={highCount}     color="#ef4444" />
          <StatCard label="Medium Priority" value={mediumCount}  color="#f59e0b" />
        </div>

        {/* Type filter */}
        <div className="mb-3 flex items-center gap-2">
          <Filter className="size-3.5 shrink-0 text-foreground/60" />
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-styled">
            {TYPE_TABS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTypeFilter(value)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  typeFilter === value
                    ? "bg-[#F62C7D]/10 text-[#F62C7D]"
                    : "text-foreground/50 hover:bg-foreground/5",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Importance filter */}
        <div className="mb-6 flex gap-1.5">
          {IMPORTANCE_TABS.map((val) => (
            <button
              key={val}
              onClick={() => setImportanceFilter(val)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-medium capitalize transition-colors",
                importanceFilter === val
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/60 hover:bg-foreground/5",
              )}
            >
              {val}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[13px] text-foreground/60">No events match the selected filters.</p>
        ) : (
          <div className="relative">
            <div className="absolute left-[19px] top-0 h-full w-px bg-border" aria-hidden />
            <div className="space-y-1">
              {filtered.map((event) => {
                const cfg     = TYPE_CONFIG[event.type];
                const impCfg  = IMPORTANCE_CONFIG[event.importance];
                const Icon    = cfg.icon;
                return (
                  <div key={event.id} className="relative flex gap-4 rounded-xl p-3 transition-colors hover:bg-foreground/3">
                    {/* Icon bubble */}
                    <div
                      className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-background"
                      style={{ backgroundColor: `${cfg.color}18` }}
                    >
                      <Icon className="size-4" style={{ color: cfg.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[14px] font-semibold text-foreground">{event.title}</p>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", impCfg.className)}>
                          {impCfg.label}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[12px] text-foreground/55">{event.description}</p>
                      <p className="mt-1 text-[11px] text-foreground/55">{formatDate(event.createdAt)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
