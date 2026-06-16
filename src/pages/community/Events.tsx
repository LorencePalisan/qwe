import { useState } from "react";
import { Calendar, MapPin, Users, Plus, Pencil, Trash2, X, Search } from "@/icons";
import { cn } from "@/lib/utils";
import { COMMUNITY_EVENTS, type CommunityEvent } from "@/lib/mock/community";

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<CommunityEvent["status"], { label: string; color: string }> = {
  upcoming:   { label: "Upcoming",   color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  ongoing:    { label: "Ongoing",    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  completed:  { label: "Completed",  color: "bg-foreground/8 text-foreground/50" },
  cancelled:  { label: "Cancelled",  color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  postponed:  { label: "Postponed",  color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
};

const CATEGORY_COLORS: Record<string, string> = {
  Meetup:    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Hackathon: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Talk:      "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Workshop:  "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  Career:    "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function capacityPct(attendees: number, cap: number) {
  return Math.min(100, Math.round((attendees / cap) * 100));
}

// ── Confirm Modal ─────────────────────────────────────────────────────────────

function ConfirmModal({ title, onCancel, onConfirm }: { title: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl">
        <h3 className="text-[16px] font-bold text-foreground">Delete Event</h3>
        <p className="mt-1.5 text-[13px] text-foreground/60">
          Delete <span className="font-semibold text-foreground">{title}</span>? This cannot be undone.
        </p>
        <div className="mt-5 flex gap-2.5">
          <button onClick={onCancel} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-foreground/5">Cancel</button>
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-80">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Event Sheet ───────────────────────────────────────────────────────────────

function EventSheet({
  event, onClose, onSave,
}: {
  event?: CommunityEvent;
  onClose: () => void;
  onSave: (e: CommunityEvent) => void;
}) {
  const isNew = !event;
  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [time, setTime] = useState(event?.time ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [capacity, setCapacity] = useState(String(event?.capacity ?? "100"));
  const [category, setCategory] = useState(event?.category ?? "Meetup");
  const [status, setStatus] = useState<CommunityEvent["status"]>(event?.status ?? "upcoming");

  function handleSave() {
    if (!title.trim() || !date) return;
    const updated: CommunityEvent = {
      id: event?.id ?? `ce${Date.now()}`,
      title, description, date, time, location,
      attendeeCount: event?.attendeeCount ?? 0,
      capacity: Number(capacity) || 100,
      category, status,
    };
    onSave(updated);
    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{isNew ? "Create Event" : "Edit Event"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 transition-colors hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Event Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Monthly Meetup: July 2026"
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="What is this event about?"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] outline-none focus:border-[#F62C7D]/50 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Time</label>
              <input type="time" value={time.replace(" AM","").replace(" PM","").replace(":00 PM", ":00").replace(":00 AM", ":00")} onChange={(e) => setTime(e.target.value)}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bonifacio Global City / Online (Zoom)"
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Capacity</label>
              <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} min="1"
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50">
                {Object.keys(CATEGORY_COLORS).map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {!isNew && (
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as CommunityEvent["status"])}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50">
                {Object.keys(STATUS_CONFIG).map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}
        </div>
        <div className="border-t border-border px-5 py-4">
          <button onClick={handleSave}
            className="w-full rounded-xl bg-[#F62C7D] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
            {isNew ? "Create Event" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Event Card ────────────────────────────────────────────────────────────────

function EventCard({
  event, onEdit, onDelete,
}: { event: CommunityEvent; onEdit: () => void; onDelete: () => void }) {
  const cfg = STATUS_CONFIG[event.status];
  const pct = capacityPct(event.attendeeCount, event.capacity);
  const full = pct >= 100;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", cfg.color)}>{cfg.label}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", CATEGORY_COLORS[event.category] ?? "bg-foreground/8 text-foreground/50")}>
              {event.category}
            </span>
          </div>
          <h3 className="text-[15px] font-bold text-foreground">{event.title}</h3>
        </div>
        <div className="flex shrink-0 gap-1">
          <button onClick={onEdit} className="rounded-lg p-1.5 text-foreground/55 transition-colors hover:bg-foreground/8 hover:text-foreground">
            <Pencil className="size-3.5" />
          </button>
          <button onClick={onDelete} className="rounded-lg p-1.5 text-foreground/55 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
      <p className="mb-3 text-[12px] leading-relaxed text-foreground/50 line-clamp-2">{event.description}</p>
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-foreground/50">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5 shrink-0" />
          <span>{fmtDate(event.date)} · {event.time}</span>
        </div>
        {event.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            <span>{event.location}</span>
          </div>
        )}
      </div>
      {/* Capacity bar */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1 text-foreground/50">
            <Users className="size-3" />
            <span>{event.attendeeCount.toLocaleString()} / {event.capacity.toLocaleString()} attendees</span>
          </div>
          <span className={cn("font-medium", full ? "text-red-500" : "text-foreground/60")}>{pct}%{full ? " — Full" : ""}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-foreground/8">
          <div
            className={cn("h-1.5 rounded-full transition-all", full ? "bg-red-400" : "bg-[#F62C7D]")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const STATUS_TABS = ["All", "Upcoming", "Ongoing", "Completed", "Cancelled"] as const;

export default function CommunityEvents() {
  const [events, setEvents] = useState(COMMUNITY_EVENTS);
  const [tab, setTab] = useState<typeof STATUS_TABS[number]>("All");
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<CommunityEvent | undefined>(undefined);
  const [showSheet, setShowSheet] = useState(false);
  const [toDelete, setToDelete] = useState<CommunityEvent | null>(null);

  const filtered = events.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q);
    const matchTab = tab === "All" || e.status === tab.toLowerCase();
    return matchSearch && matchTab;
  });

  const upcoming = events.filter((e) => e.status === "upcoming").length;

  function handleSave(updated: CommunityEvent) {
    setEvents((prev) => {
      const idx = prev.findIndex((e) => e.id === updated.id);
      if (idx === -1) return [...prev, updated];
      return prev.map((e) => e.id === updated.id ? updated : e);
    });
  }

  function confirmDelete() {
    if (!toDelete) return;
    setEvents((prev) => prev.filter((e) => e.id !== toDelete.id));
    setToDelete(null);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-foreground">Events</h1>
            <p className="text-[13px] text-foreground/50">{events.length} total · {upcoming} upcoming</p>
          </div>
          <button
            onClick={() => { setEditTarget(undefined); setShowSheet(true); }}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="size-3.5" /> Create Event
          </button>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/55" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events…"
            className="h-[38px] w-full rounded-xl border border-border bg-background pl-9 pr-3 text-[13px] outline-none focus:border-[#F62C7D]/50"
          />
        </div>

        {/* Status tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_TABS.map((t) => {
            const count = t === "All" ? events.length : events.filter((e) => e.status === t.toLowerCase()).length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  tab === t ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "text-foreground/50 hover:bg-foreground/8",
                )}
              >
                {t} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Calendar className="size-8 text-foreground/45 mb-2" />
            <p className="text-[13px] text-foreground/60">No events found</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((e) => (
              <EventCard
                key={e.id}
                event={e}
                onEdit={() => { setEditTarget(e); setShowSheet(true); }}
                onDelete={() => setToDelete(e)}
              />
            ))}
          </div>
        )}
      </div>

      {showSheet && (
        <EventSheet
          event={editTarget}
          onClose={() => { setShowSheet(false); setEditTarget(undefined); }}
          onSave={handleSave}
        />
      )}
      {toDelete && (
        <ConfirmModal title={toDelete.title} onCancel={() => setToDelete(null)} onConfirm={confirmDelete} />
      )}
    </div>
  );
}
