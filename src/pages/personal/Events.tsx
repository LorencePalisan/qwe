import { useState } from "react";
import { MapPin, Calendar, Ticket } from "@/icons";
import { cn } from "@/lib/utils";
import { EVENTS, REGISTRATIONS } from "@/lib/mock/personal";

const TAB = "flex-1 rounded-[8px] py-2 text-[13.6px] font-semibold transition-all";

function DaysLeft({ dateStr }: { dateStr: string }) {
  const days = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
  if (days === 0) return <span className="rounded-full bg-[#F62C7D]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#F62C7D]">Today</span>;
  if (days < 0)   return <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 text-[11px] font-medium text-foreground/60">{-days}d ago</span>;
  return <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">{days}d left</span>;
}

function CapacityBar({ registered, capacity }: { registered: number; capacity: number }) {
  const pct = Math.min(100, Math.round((registered / capacity) * 100));
  const color = pct >= 90 ? "bg-red-400" : pct >= 70 ? "bg-amber-400" : "bg-emerald-400";
  return (
    <div className="mt-2">
      <div className="mb-1 flex items-center justify-between text-[10px]">
        <span className="text-foreground/60">{registered.toLocaleString()} / {capacity.toLocaleString()}</span>
        <span className={cn("font-medium", pct >= 90 ? "text-red-400" : pct >= 70 ? "text-amber-400" : "text-emerald-400")}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function TicketModal({ reg, onClose }: { reg: typeof REGISTRATIONS[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Ticket header */}
        <div className="relative h-36 overflow-hidden">
          <img src={reg.cover} alt={reg.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/75" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[17px] font-bold text-white">{reg.title}</p>
            <div className="mt-0.5 flex items-center gap-1 text-[12px] text-white/70">
              <MapPin className="size-3" />{reg.venue}
            </div>
          </div>
        </div>
        {/* Perforation */}
        <div className="relative flex items-center bg-sidebar">
          <div className="absolute -left-3 size-6 rounded-full bg-black" />
          <div className="mx-5 flex-1 border-t-2 border-dashed border-foreground/15" />
          <div className="absolute -right-3 size-6 rounded-full bg-black" />
        </div>
        {/* Ticket body */}
        <div className="bg-sidebar p-5">
          <div className="grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/55">Ticket ID</p>
              <p className="mt-1 font-mono text-[13px] font-bold text-foreground">{reg.ticketId.slice(0, 12).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/55">Seat</p>
              <p className="mt-1 font-semibold text-foreground">{reg.seat}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/55">Date</p>
              <p className="mt-1 font-semibold text-foreground">{new Date(reg.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/55">Venue</p>
              <p className="mt-1 font-semibold text-foreground">{reg.venue}</p>
            </div>
          </div>
          {/* QR-style placeholder */}
          <div className="my-4 flex justify-center">
            <div className="grid grid-cols-5 grid-rows-5 gap-0.5 rounded-lg border border-border p-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={cn("size-4 rounded-[2px]", Math.random() > 0.4 ? "bg-foreground/80" : "bg-foreground/10")} />
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-[44px] w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-white shadow-[0_4px_15px_rgba(246,44,125,0.35)] hover:opacity-90"
          >
            Close Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PersonalEvents() {
  const [activeTab,    setActiveTab]    = useState<"my-events" | "registrations">("my-events");
  const [ticketOpen,   setTicketOpen]   = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const ticketReg = REGISTRATIONS.find((r) => r.id === ticketOpen);

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-wider text-foreground/60">Discover & Track</p>
          <h1 className="text-[28px] font-bold text-foreground">Events</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex rounded-[10px] border border-border bg-card p-1">
        {(["my-events", "registrations"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(TAB, activeTab === t ? "bg-[#F62C7D] text-white shadow-[0_2px_10px_rgba(246,44,125,0.3)]" : "text-foreground/60 hover:text-foreground")}
          >
            {t === "my-events" ? "My Events" : "Registrations"}
          </button>
        ))}
      </div>

      {activeTab === "my-events" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((e) => (
            <div
              key={e.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-[#F62C7D]/20 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={e.cover} alt={e.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[15px] font-bold text-white">{e.title}</p>
                  <div className="mt-1 flex items-center gap-1 text-[12px] text-white/65">
                    <MapPin className="size-3" /> {e.venue}
                  </div>
                </div>
                <div className="absolute right-3 top-3">
                  <DaysLeft dateStr={e.date} />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[12px] text-foreground/50">
                    <Calendar className="size-3.5" />
                    {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <button className={cn(
                    "rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all",
                    e.registered
                      ? "bg-foreground/10 text-foreground/50"
                      : "bg-[#F62C7D] text-white shadow-[0_2px_10px_rgba(246,44,125,0.3)] hover:shadow-[0_4px_15px_rgba(246,44,125,0.4)] hover:opacity-90",
                  )}>
                    {e.registered ? "Registered" : "Register"}
                  </button>
                </div>
                <CapacityBar registered={e.registrations} capacity={e.capacity} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "registrations" && (
        <>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1 scrollbar-styled">
            {["all", "upcoming", "attended", "cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-medium capitalize transition-all",
                  statusFilter === f
                    ? "border-[#F62C7D]/40 bg-[#F62C7D]/15 text-[#F62C7D]"
                    : "border-border text-foreground/50 hover:border-foreground/20 hover:text-foreground",
                )}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 xl:max-w-2xl">
            {REGISTRATIONS.map((r) => (
              <div
                key={r.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-[#F62C7D]/20 hover:shadow-lg hover:shadow-black/10"
              >
                <div className="flex gap-4 p-4">
                  <div className="size-16 shrink-0 overflow-hidden rounded-xl">
                    <img src={r.cover} alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-foreground">{r.title}</p>
                    <div className="mt-0.5 flex items-center gap-1 text-[12px] text-foreground/45">
                      <MapPin className="size-3" /> {r.venue}
                    </div>
                    <div className="mt-0.5 text-[12px] text-foreground/60">
                      {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <DaysLeft dateStr={r.date} />
                    <button
                      onClick={() => setTicketOpen(r.id)}
                      className="flex items-center gap-1.5 rounded-full bg-[#F62C7D]/10 px-3 py-1 text-[11px] font-medium text-[#F62C7D] transition-colors hover:bg-[#F62C7D]/20"
                    >
                      <Ticket className="size-3" /> Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {ticketReg && <TicketModal reg={ticketReg} onClose={() => setTicketOpen(null)} />}
    </div>
  );
}
