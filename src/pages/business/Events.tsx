import { useState } from "react";
import {
  Plus, Search, Pencil, Trash2, X, ChevronDown, MapPin, Calendar,
} from "@/icons";
import { cn } from "@/lib/utils";
import { BUSINESS_EVENTS, type BusinessEvent } from "@/lib/mock/business";

// ── Config ────────────────────────────────────────────────────────────────────

const LOC_CONFIG = {
  in_person: { label: "In-person",   className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  virtual:   { label: "Virtual",     className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  hybrid:    { label: "Hybrid",      className: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
};

const BLANK: Omit<BusinessEvent, "id"> = {
  title: "", description: "", startsAt: "", endsAt: "",
  locationType: "in_person", locationLabel: "",
  paymentType: "free", price: 0, capacity: 50, category: "",
  organizerLabel: "Neon Studios", isAdvertised: false,
};

type TabValue = "all" | "upcoming" | "past";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

function isUpcoming(ev: BusinessEvent) {
  return new Date(ev.startsAt) > new Date();
}

// ── Confirm Delete Modal ──────────────────────────────────────────────────────

function ConfirmModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <h3 className="text-[16px] font-bold text-foreground">Delete event?</h3>
        <p className="mt-2 text-[13px] text-foreground/60">
          "<span className="font-medium text-foreground">{title}</span>" will be permanently deleted.
        </p>
        <div className="mt-5 flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground/70 hover:bg-foreground/5">Cancel</button>
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-600 py-2.5 text-[13px] font-semibold text-white hover:opacity-90">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Sheet (Create/Edit) ───────────────────────────────────────────────────────

function EventSheet({
  draft, onChange, onSave, onClose, isEdit,
}: {
  draft: Omit<BusinessEvent, "id">;
  onChange: (patch: Partial<Omit<BusinessEvent, "id">>) => void;
  onSave: () => void;
  onClose: () => void;
  isEdit: boolean;
}) {
  const inputCls = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls = "mb-1.5 block text-[12px] font-medium text-foreground/60";
  const selectCls = "h-[42px] w-full appearance-none rounded-xl border border-border bg-background pl-3 pr-8 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        {/* Sheet header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{isEdit ? "Edit Event" : "New Event"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8"><X className="size-4" /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className={labelCls}>Title</label>
            <input value={draft.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="Event title" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea value={draft.description} onChange={(e) => onChange({ description: e.target.value })} rows={3} placeholder="What's this event about?" className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Start date & time</label>
              <input type="datetime-local" value={draft.startsAt?.slice(0, 16)} onChange={(e) => onChange({ startsAt: e.target.value + ":00" })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>End (optional)</label>
              <input type="datetime-local" value={draft.endsAt?.slice(0, 16)} onChange={(e) => onChange({ endsAt: e.target.value + ":00" })} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Location type</label>
              <div className="relative">
                <select value={draft.locationType} onChange={(e) => onChange({ locationType: e.target.value as BusinessEvent["locationType"] })} className={selectCls}>
                  <option value="in_person">In-person</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Location label</label>
              <input value={draft.locationLabel} onChange={(e) => onChange({ locationLabel: e.target.value })} placeholder="e.g. BGC, Taguig" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Payment</label>
              <div className="relative">
                <select value={draft.paymentType} onChange={(e) => onChange({ paymentType: e.target.value as "free" | "paid" })} className={selectCls}>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
              </div>
            </div>
            <div>
              <label className={labelCls}>{draft.paymentType === "paid" ? "Price (₱)" : "Price"}</label>
              <input type="number" value={draft.price} onChange={(e) => onChange({ price: Number(e.target.value) })} disabled={draft.paymentType === "free"} placeholder="0" className={cn(inputCls, "disabled:opacity-40")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Capacity</label>
              <input type="number" value={draft.capacity} onChange={(e) => onChange({ capacity: Number(e.target.value) })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <input value={draft.category} onChange={(e) => onChange({ category: e.target.value })} placeholder="e.g. Workshop" className={inputCls} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
            <div>
              <p className="text-[13px] font-medium text-foreground">Advertise</p>
              <p className="text-[11px] text-foreground/45">Show on public Whodini feed</p>
            </div>
            <button
              onClick={() => onChange({ isAdvertised: !draft.isAdvertised })}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                draft.isAdvertised ? "bg-[#F62C7D]" : "bg-foreground/20",
              )}
            >
              <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform", draft.isAdvertised ? "translate-x-5" : "translate-x-0.5")} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-5 py-4">
          <button
            onClick={onSave}
            disabled={!draft.title.trim() || !draft.startsAt}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
          >
            {isEdit ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Event Card ────────────────────────────────────────────────────────────────

function EventCard({
  ev, onEdit, onDelete, onToggleAdvertise,
}: {
  ev: BusinessEvent;
  onEdit: (ev: BusinessEvent) => void;
  onDelete: (ev: BusinessEvent) => void;
  onToggleAdvertise: (id: string) => void;
}) {
  const locCfg   = LOC_CONFIG[ev.locationType];
  const upcoming = isUpcoming(ev);

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", locCfg.className)}>{locCfg.label}</span>
            {ev.isAdvertised && (
              <span className="rounded-full bg-[#F62C7D]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F62C7D]">Advertised</span>
            )}
            {!upcoming && (
              <span className="rounded-full bg-foreground/8 px-2 py-0.5 text-[10px] text-foreground/60">Past</span>
            )}
          </div>
          <h3 className="text-[15px] font-bold text-foreground">{ev.title}</h3>
        </div>
        <div className="flex shrink-0 gap-1">
          <button onClick={() => onEdit(ev)} className="rounded-lg p-1.5 text-foreground/60 transition-colors hover:bg-foreground/8 hover:text-foreground">
            <Pencil className="size-3.5" />
          </button>
          <button onClick={() => onDelete(ev)} className="rounded-lg p-1.5 text-foreground/60 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      <p className="mb-3 text-[12px] text-foreground/55 line-clamp-2">{ev.description}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-3 text-[12px] text-foreground/55">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5" />
          <span>{formatDate(ev.startsAt)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          <span>{ev.locationLabel}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={cn("font-semibold", ev.paymentType === "paid" ? "text-foreground" : "text-emerald-600 dark:text-emerald-400")}>
            {ev.paymentType === "paid" ? `₱${ev.price.toLocaleString()}` : "Free"}
          </span>
          <button
            onClick={() => onToggleAdvertise(ev.id)}
            className={cn(
              "relative h-5 w-9 rounded-full transition-colors",
              ev.isAdvertised ? "bg-[#F62C7D]" : "bg-foreground/20",
            )}
          >
            <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform", ev.isAdvertised ? "translate-x-4" : "translate-x-0.5")} />
          </button>
          <span className="text-[11px] text-foreground/60">Advertise</span>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BusinessEvents() {
  const [events,   setEvents]   = useState<BusinessEvent[]>(BUSINESS_EVENTS);
  const [tab,      setTab]      = useState<TabValue>("all");
  const [query,    setQuery]    = useState("");
  const [sheet,    setSheet]    = useState<"create" | "edit" | null>(null);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [draft,    setDraft]    = useState<Omit<BusinessEvent, "id">>(BLANK);
  const [deleteTarget, setDeleteTarget] = useState<BusinessEvent | null>(null);

  function openCreate() { setDraft(BLANK); setSheet("create"); }
  function openEdit(ev: BusinessEvent) {
    const { id, ...rest } = ev;
    setDraft(rest);
    setEditId(id);
    setSheet("edit");
  }

  function handleSave() {
    if (sheet === "create") {
      setEvents((prev) => [{ ...draft, id: `bev${Date.now()}` }, ...prev]);
    } else if (sheet === "edit" && editId) {
      setEvents((prev) => prev.map((e) => e.id === editId ? { ...draft, id: editId } : e));
    }
    setSheet(null);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function toggleAdvertise(id: string) {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, isAdvertised: !e.isAdvertised } : e));
  }

  const filtered = events.filter((e) => {
    const matchTab = tab === "all" ? true : tab === "upcoming" ? isUpcoming(e) : !isUpcoming(e);
    const matchQ   = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.locationLabel.toLowerCase().includes(query.toLowerCase());
    return matchTab && matchQ;
  });

  return (
    <>
      {deleteTarget && (
        <ConfirmModal title={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
      {sheet && (
        <EventSheet
          draft={draft}
          onChange={(patch) => setDraft((prev) => ({ ...prev, ...patch }))}
          onSave={handleSave}
          onClose={() => setSheet(null)}
          isEdit={sheet === "edit"}
        />
      )}

      <div className="pb-16">
        <div className="border-b border-border bg-card/50 px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-bold text-foreground">Events</h1>
              <p className="text-[13px] text-foreground/50">Create and manage your business events</p>
            </div>
            <button
              onClick={openCreate}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Plus className="size-4" />
              New Event
            </button>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events…" className="h-[42px] w-full rounded-xl border border-border bg-background py-0 pl-9 pr-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
          </div>

          {/* Tabs */}
          <div className="mb-5 flex gap-1.5">
            {(["all", "upcoming", "past"] as TabValue[]).map((v) => (
              <button
                key={v}
                onClick={() => setTab(v)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium capitalize transition-colors",
                  tab === v ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "text-foreground/50 hover:bg-foreground/5",
                )}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[14px] font-medium text-foreground/60">No events found.</p>
              <button onClick={openCreate} className="mt-3 text-[13px] font-medium text-[#F62C7D] hover:opacity-70">+ Create one</button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((ev) => (
                <EventCard key={ev.id} ev={ev} onEdit={openEdit} onDelete={setDeleteTarget} onToggleAdvertise={toggleAdvertise} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
