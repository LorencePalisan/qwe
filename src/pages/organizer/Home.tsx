import { Calendar, DollarSign, Users, TrendingUp, CheckCircle2 } from "@/icons";
import { ORGANIZER_EVENTS, ORGANIZER_INQUIRIES, ORGANIZER_TEAM } from "@/lib/mock/organizer";
import { cn } from "@/lib/utils";

const STATUS_COLOR: Record<string, string> = {
  Planning:    "bg-blue-500/15 text-blue-400",
  Confirmed:   "bg-emerald-500/15 text-emerald-400",
  "In Progress": "bg-amber-500/15 text-amber-400",
  Completed:   "bg-foreground/10 text-foreground/50",
  Cancelled:   "bg-red-500/15 text-red-400",
};

function StatCard({ icon: Icon, label, value, sub, accent }: {
  icon: React.ElementType; label: string; value: string; sub: string; accent?: boolean;
}) {
  return (
    <div className="rounded-[14px] border border-border bg-card p-5">
      <div className={cn("mb-3 flex size-10 items-center justify-center rounded-xl", accent ? "bg-[#F62C7D]/15" : "bg-foreground/8")}>
        <Icon className={cn("size-5", accent ? "text-[#F62C7D]" : "text-foreground/60")} />
      </div>
      <p className="text-[13px] text-foreground/50">{label}</p>
      <p className="mt-0.5 text-[24px] font-bold text-foreground">{value}</p>
      <p className="mt-0.5 text-[12px] text-foreground/60">{sub}</p>
    </div>
  );
}

export default function OrganizerHome() {
  const upcoming   = ORGANIZER_EVENTS.filter((e) => e.status !== "Completed" && e.status !== "Cancelled");
  const completed  = ORGANIZER_EVENTS.filter((e) => e.status === "Completed").length;
  const newInqs    = ORGANIZER_INQUIRIES.filter((i) => i.status === "New").length;
  const available  = ORGANIZER_TEAM.filter((m) => m.status === "Available").length;
  const totalRev   = ORGANIZER_EVENTS.filter((e) => e.status === "Completed").reduce((s, e) => s + e.budget, 0);

  const recentEvents = [...ORGANIZER_EVENTS].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-foreground">Organizer Dashboard</h1>
        <p className="text-[14px] text-foreground/50">Overview of your events and operations</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Calendar}    label="Upcoming Events" value={String(upcoming.length)}  sub="active this season"  accent />
        <StatCard icon={CheckCircle2} label="Completed"       value={String(completed)}        sub="events delivered"   />
        <StatCard icon={TrendingUp}  label="Total Revenue"   value={`₱${(totalRev / 1_000_000).toFixed(1)}M`} sub="from completed events" />
        <StatCard icon={Users}       label="Team Available"  value={String(available)}         sub={`of ${ORGANIZER_TEAM.length} staff members`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        {/* Upcoming events */}
        <div className="rounded-[14px] border border-border bg-card p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-foreground">Upcoming Events</h2>
          <div className="flex flex-col gap-3">
            {recentEvents.map((ev) => {
                const budgetUsed = ev.budget > 0 ? Math.round((ev.expenses / ev.budget) * 100) : 0;
              return (
                <div key={ev.id} className="rounded-xl border border-border p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-foreground">{ev.name}</p>
                      <p className="text-[12px] text-foreground/50">{ev.client} · {ev.venue}</p>
                    </div>
                    <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium", STATUS_COLOR[ev.status])}>
                      {ev.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[12px] text-foreground/50">
                    <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {ev.date}</span>
                    <span className="flex items-center gap-1"><DollarSign className="size-3.5" /> ₱{(ev.budget / 1000).toFixed(0)}k budget</span>
                  </div>
                  {ev.expenses > 0 && (
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-[11px] text-foreground/60">
                        <span>Budget used</span>
                        <span>{budgetUsed}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
                        <div
                          className={cn("h-full rounded-full transition-all", budgetUsed > 85 ? "bg-red-400" : "bg-[#F62C7D]")}
                          style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* New inquiries */}
          <div className="rounded-[14px] border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-foreground">New Inquiries</h2>
              {newInqs > 0 && (
                <span className="flex size-6 items-center justify-center rounded-full bg-[#F62C7D] text-[11px] font-bold text-white">
                  {newInqs}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {ORGANIZER_INQUIRIES.filter((i) => i.status === "New" || i.status === "Replied").slice(0, 4).map((inq) => (
                <div key={inq.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/15 text-[12px] font-bold text-[#F62C7D]">
                    {inq.from.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-foreground">{inq.from}</p>
                    <p className="truncate text-[12px] text-foreground/50">{inq.eventType} · {inq.budget}</p>
                  </div>
                  {inq.status === "New" && <div className="size-2 shrink-0 rounded-full bg-[#F62C7D]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Team status */}
          <div className="rounded-[14px] border border-border bg-card p-5">
            <h2 className="mb-3 text-[15px] font-semibold text-foreground">Team Status</h2>
            <div className="flex flex-col gap-2">
              {ORGANIZER_TEAM.slice(0, 5).map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[11px] font-bold text-foreground/70">
                    {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">{m.name}</p>
                    <p className="truncate text-[11px] text-foreground/50">{m.role}</p>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                    m.status === "Available" ? "bg-emerald-500/15 text-emerald-400" :
                    m.status === "Busy"      ? "bg-amber-500/15 text-amber-400" :
                                               "bg-foreground/10 text-foreground/60"
                  )}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
