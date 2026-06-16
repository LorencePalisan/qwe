import { useState } from "react";
import { Plus, Search, Calendar, DollarSign, Users, X, Pencil, Trash2 } from "@/icons";
import { ORGANIZER_EVENTS, type OrganizerEvent, type OrganizerEventStatus } from "@/lib/mock/organizer";
import { cn } from "@/lib/utils";

const STATUS_COLOR: Record<string, string> = {
  Planning:      "bg-blue-500/15 text-blue-400",
  Confirmed:     "bg-emerald-500/15 text-emerald-400",
  "In Progress": "bg-amber-500/15 text-amber-400",
  Completed:     "bg-foreground/10 text-foreground/50",
  Cancelled:     "bg-red-500/15 text-red-400",
};

const STATUSES: OrganizerEventStatus[] = ["Planning", "Confirmed", "In Progress", "Completed", "Cancelled"];
const EVENT_TYPES = ["Wedding", "Corporate", "Birthday", "Concert", "Private", "Other"];
const TABS = ["All", "Planning", "Confirmed", "In Progress", "Completed"] as const;

const INPUT = "h-[46px] w-full rounded-[10px] border border-border bg-card px-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/15 transition-all";
const LABEL = "mb-1 block text-[12px] font-medium text-foreground/50 uppercase tracking-wide";

const EMPTY: Partial<OrganizerEvent> = {
  name: "", client: "", date: "", venue: "", type: "Wedding",
  budget: 0, expenses: 0, attendees: 0, capacity: 0, status: "Planning",
};

function EventSheet({ event, onClose, onSave }: {
  event: Partial<OrganizerEvent> | null;
  onClose: () => void;
  onSave: (e: OrganizerEvent) => void;
}) {
  const [form, setForm] = useState<Partial<OrganizerEvent>>(event ?? EMPTY);
  const set = (k: keyof OrganizerEvent, v: string | number) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.name?.trim() || !form.client?.trim() || !form.date) return;
    onSave({ id: form.id ?? `oe${Date.now()}`, ...EMPTY, ...form } as OrganizerEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{form.id ? "Edit Event" : "New Event"}</h2>
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-lg bg-foreground/8 text-foreground/60 hover:bg-foreground/15">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          <div><label className={LABEL}>Event Name</label><input className={INPUT} placeholder="Santos–Reyes Wedding" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} /></div>
          <div><label className={LABEL}>Client</label><input className={INPUT} placeholder="Client name" value={form.client ?? ""} onChange={(e) => set("client", e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Date</label>
              <input type="date" className={INPUT} value={form.date ?? ""} onChange={(e) => set("date", e.target.value)} />
            </div>
            <div>
              <label className={LABEL}>Type</label>
              <select className={INPUT} value={form.type ?? "Wedding"} onChange={(e) => set("type", e.target.value)}>
                {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div><label className={LABEL}>Venue</label><input className={INPUT} placeholder="Venue name & location" value={form.venue ?? ""} onChange={(e) => set("venue", e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Budget (₱)</label>
              <input type="number" className={INPUT} value={form.budget ?? 0} onChange={(e) => set("budget", Number(e.target.value))} />
            </div>
            <div>
              <label className={LABEL}>Expenses (₱)</label>
              <input type="number" className={INPUT} value={form.expenses ?? 0} onChange={(e) => set("expenses", Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Attendees</label>
              <input type="number" className={INPUT} value={form.attendees ?? 0} onChange={(e) => set("attendees", Number(e.target.value))} />
            </div>
            <div>
              <label className={LABEL}>Capacity</label>
              <input type="number" className={INPUT} value={form.capacity ?? 0} onChange={(e) => set("capacity", Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label className={LABEL}>Status</label>
            <select className={INPUT} value={form.status ?? "Planning"} onChange={(e) => set("status", e.target.value as OrganizerEventStatus)}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="shrink-0 border-t border-border p-5">
          <button onClick={handleSave} className="h-[44px] w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-white hover:opacity-90">
            {form.id ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrganizerEvents() {
  const [events, setEvents]     = useState(ORGANIZER_EVENTS);
  const [tab, setTab]           = useState<typeof TABS[number]>("All");
  const [query, setQuery]       = useState("");
  const [sheet, setSheet]       = useState<Partial<OrganizerEvent> | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = events.filter((e) => {
    const matchTab = tab === "All" || e.status === tab;
    const matchQ   = !query || e.name.toLowerCase().includes(query.toLowerCase()) || e.client.toLowerCase().includes(query.toLowerCase());
    return matchTab && matchQ;
  });

  const handleSave = (ev: OrganizerEvent) => {
    setEvents((p) => p.some((e) => e.id === ev.id) ? p.map((e) => e.id === ev.id ? ev : e) : [ev, ...p]);
  };

  const handleDelete = () => {
    if (deleteId) { setEvents((p) => p.filter((e) => e.id !== deleteId)); setDeleteId(null); }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-foreground">Events</h1>
          <p className="text-[14px] text-foreground/50">{events.length} total events</p>
        </div>
        <button onClick={() => { setSheet(EMPTY); setSheetOpen(true); }} className="flex h-[40px] items-center gap-2 rounded-full bg-[#F62C7D] px-4 text-[13.6px] font-semibold text-white hover:opacity-90">
          <Plus className="size-4" /> New Event
        </button>
      </div>

      {/* Search + tabs */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/60" />
          <input className="h-[40px] w-full rounded-full border border-border bg-card pl-9 pr-4 text-[13.6px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/50 focus:outline-none" placeholder="Search events or clients…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors", tab === t ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "bg-foreground/6 text-foreground/50 hover:text-foreground")}>
            {t}
          </button>
        ))}
      </div>

      {/* Event cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((ev) => {
          const budgetPct = ev.budget > 0 ? Math.round((ev.expenses / ev.budget) * 100) : 0;
          return (
            <div key={ev.id} className="rounded-[14px] border border-border bg-card p-5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-foreground">{ev.name}</p>
                  <p className="text-[12px] text-foreground/50">{ev.client}</p>
                </div>
                <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium", STATUS_COLOR[ev.status])}>{ev.status}</span>
              </div>
              <p className="mb-3 text-[12px] text-foreground/50 line-clamp-1">{ev.venue}</p>
              <div className="mb-3 grid grid-cols-2 gap-2 text-[12px]">
                <div className="flex items-center gap-1.5 text-foreground/60"><Calendar className="size-3.5" />{ev.date}</div>
                <div className="flex items-center gap-1.5 text-foreground/60"><DollarSign className="size-3.5" />₱{(ev.budget / 1000).toFixed(0)}k</div>
                <div className="flex items-center gap-1.5 text-foreground/60"><Users className="size-3.5" />{ev.capacity} capacity</div>
                <div className="text-foreground/60">{ev.type}</div>
              </div>
              {ev.expenses > 0 && (
                <div className="mb-3">
                  <div className="mb-1 flex justify-between text-[11px] text-foreground/60">
                    <span>Budget</span><span>{budgetPct}% used</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
                    <div className={cn("h-full rounded-full", budgetPct > 85 ? "bg-red-400" : "bg-[#F62C7D]")} style={{ width: `${Math.min(budgetPct, 100)}%` }} />
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <button onClick={() => { setSheet(ev); setSheetOpen(true); }} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-[12px] text-foreground/60 hover:bg-foreground/8">
                  <Pencil className="size-3.5" /> Edit
                </button>
                <button onClick={() => setDeleteId(ev.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-500/20 py-2 text-[12px] text-red-400 hover:bg-red-500/10">
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-[14px] text-foreground/60">No events found.</div>
        )}
      </div>

      {sheetOpen && <EventSheet event={sheet} onClose={() => { setSheetOpen(false); setSheet(null); }} onSave={handleSave} />}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-sidebar p-6">
            <h3 className="mb-2 text-[16px] font-bold text-foreground">Delete Event?</h3>
            <p className="mb-6 text-[14px] text-foreground/60">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="h-[44px] flex-1 rounded-full border border-border text-[14px] text-foreground/70 hover:bg-foreground/8">Cancel</button>
              <button onClick={handleDelete} className="h-[44px] flex-1 rounded-full bg-red-500/80 text-[14px] font-semibold text-white hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
