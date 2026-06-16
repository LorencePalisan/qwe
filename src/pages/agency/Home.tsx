import { Users, DollarSign, TrendingUp, Briefcase } from "@/icons";
import { AGENCY_CLIENTS, AGENCY_INQUIRIES, AGENCY_TEAM } from "@/lib/mock/agency";
import { cn } from "@/lib/utils";

const STATUS_COLOR: Record<string, string> = {
  Active:   "bg-emerald-500/15 text-emerald-400",
  VIP:      "bg-amber-500/15 text-amber-400",
  Prospect: "bg-blue-500/15 text-blue-400",
  Inactive: "bg-foreground/10 text-foreground/60",
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

export default function AgencyHome() {
  const active    = AGENCY_CLIENTS.filter((c) => c.status === "Active" || c.status === "VIP").length;
  const prospects = AGENCY_CLIENTS.filter((c) => c.status === "Prospect").length;
  const totalRevenue = AGENCY_CLIENTS.reduce((s, c) => s + c.contractValue, 0);
  const newInqs   = AGENCY_INQUIRIES.filter((i) => i.status === "New").length;

  const topClients = [...AGENCY_CLIENTS].filter((c) => c.contractValue > 0).sort((a, b) => b.contractValue - a.contractValue).slice(0, 5);
  const recentInqs = AGENCY_INQUIRIES.slice(0, 4);

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-foreground">Agency Dashboard</h1>
        <p className="text-[14px] text-foreground/50">Your pipeline and client overview</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users}      label="Active Clients"   value={String(active)}    sub="including VIP accounts"  accent />
        <StatCard icon={Briefcase}  label="Prospects"        value={String(prospects)} sub="in pipeline"             />
        <StatCard icon={DollarSign} label="Total Contract"   value={`₱${(totalRevenue / 1_000_000).toFixed(1)}M`} sub="combined value" />
        <StatCard icon={TrendingUp} label="New Inquiries"    value={String(newInqs)}   sub="awaiting response"       />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Top clients */}
        <div className="rounded-[14px] border border-border bg-card p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-foreground">Top Clients by Contract Value</h2>
          <div className="flex flex-col gap-3">
            {topClients.map((c, i) => (
              <div key={c.id} className="flex items-center gap-4 rounded-xl border border-border p-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground/8 text-[12px] font-bold text-foreground/50">
                  #{i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-foreground">{c.name}</p>
                  <p className="truncate text-[12px] text-foreground/50">{c.company} · {c.industry}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[14px] font-bold text-foreground">₱{(c.contractValue / 1_000_000).toFixed(1)}M</p>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", STATUS_COLOR[c.status])}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Recent inquiries */}
          <div className="rounded-[14px] border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-foreground">Recent Inquiries</h2>
              {newInqs > 0 && (
                <span className="flex size-6 items-center justify-center rounded-full bg-[#F62C7D] text-[11px] font-bold text-white">{newInqs}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {recentInqs.map((inq) => (
                <div key={inq.id} className="flex items-start gap-3 rounded-xl border border-border p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/15 text-[12px] font-bold text-[#F62C7D]">
                    {inq.from.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-foreground">{inq.from}</p>
                    <p className="truncate text-[11px] text-foreground/50">{inq.company} · {inq.service}</p>
                  </div>
                  {inq.status === "New" && <div className="mt-1.5 size-2 shrink-0 rounded-full bg-[#F62C7D]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Team overview */}
          <div className="rounded-[14px] border border-border bg-card p-5">
            <h2 className="mb-3 text-[15px] font-semibold text-foreground">Team</h2>
            <div className="flex flex-col gap-2">
              {AGENCY_TEAM.slice(0, 5).map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[11px] font-bold text-foreground/70">
                    {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">{m.name}</p>
                    <p className="truncate text-[11px] text-foreground/50">{m.role}</p>
                  </div>
                  <span className={cn("shrink-0 text-[10px] font-medium",
                    m.status === "Active"    ? "text-emerald-400" :
                    m.status === "On Leave"  ? "text-amber-400" :
                                               "text-foreground/60"
                  )}>
                    {m.activeClients} clients
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
