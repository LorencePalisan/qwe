import { useState, useEffect, useRef } from "react";
import { Search, Trash2, Crown, X } from "@/icons";
import { cn } from "@/lib/utils";
import { SUBSCRIBERS, type Subscriber } from "@/lib/mock/business";

// ── Config ────────────────────────────────────────────────────────────────────

const TIER_CONFIG = {
  premium:  { label: "Premium",  className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  standard: { label: "Standard", className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
};

const STATUS_CONFIG = {
  active:    { label: "Active",    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
};

type TabValue = "all" | "premium" | "standard" | "cancelled";

const TABS: { value: TabValue; label: string }[] = [
  { value: "all",       label: "All" },
  { value: "premium",   label: "Premium" },
  { value: "standard",  label: "Standard" },
  { value: "cancelled", label: "Cancelled" },
];

// ── Confirm Remove Modal ──────────────────────────────────────────────────────

function ConfirmModal({
  name, onConfirm, onCancel,
}: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <h3 className="text-[16px] font-bold text-foreground">Remove subscriber?</h3>
        <p className="mt-2 text-[13px] text-foreground/60">
          <span className="font-medium text-foreground">{name}</span> will be removed from your subscriber list. This cannot be undone.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground/70 transition-colors hover:bg-foreground/5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Row ───────────────────────────────────────────────────────────────────────

function SubscriberRow({
  sub, onRemove,
}: { sub: Subscriber; onRemove: (id: string) => void }) {
  const initials = sub.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const tierCfg  = TIER_CONFIG[sub.tier];
  const stCfg    = STATUS_CONFIG[sub.status];

  return (
    <div className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-foreground/3">
      {/* Avatar */}
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/12">
        <span className="text-[12px] font-bold text-[#F62C7D]">{initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <p className="text-[13px] font-semibold text-foreground">{sub.name}</p>
          {sub.tier === "premium" && <Crown className="size-3 text-amber-500" />}
        </div>
        <p className="truncate text-[11px] text-foreground/45">{sub.email} · {sub.digitalId}</p>
      </div>

      {/* Badges */}
      <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", tierCfg.className)}>
          {tierCfg.label}
        </span>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", stCfg.className)}>
          {stCfg.label}
        </span>
      </div>

      {/* Date */}
      <div className="hidden shrink-0 text-right sm:block">
        <p className="text-[11px] text-foreground/60">
          {new Date(sub.subscribedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(sub.id)}
        className="ml-1 shrink-0 rounded-lg p-1.5 text-foreground/55 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 5;

export default function BusinessSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(SUBSCRIBERS);
  const [tab, setTab]                 = useState<TabValue>("all");
  const [query, setQuery]             = useState("");
  const [debouncedQ, setDebouncedQ]   = useState("");
  const [page, setPage]               = useState(1);
  const [removeId, setRemoveId]       = useState<string | null>(null);
  const debounceRef                   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { setDebouncedQ(query); setPage(1); }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => { setPage(1); }, [tab]);

  const filtered = subscribers.filter((s) => {
    const matchTab =
      tab === "all"
        ? true
        : tab === "cancelled"
        ? s.status === "cancelled"
        : s.tier === tab;
    const q = debouncedQ.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.digitalId.toLowerCase().includes(q);
    return matchTab && matchQ;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const toRemove   = removeId ? subscribers.find((s) => s.id === removeId) : null;

  function handleRemove(id: string) { setRemoveId(id); }
  function confirmRemove() {
    if (!removeId) return;
    setSubscribers((prev) => prev.filter((s) => s.id !== removeId));
    setRemoveId(null);
  }

  const premiumCount  = subscribers.filter((s) => s.tier === "premium" && s.status === "active").length;
  const standardCount = subscribers.filter((s) => s.tier === "standard" && s.status === "active").length;
  const cancelledCount = subscribers.filter((s) => s.status === "cancelled").length;

  return (
    <>
      {removeId && toRemove && (
        <ConfirmModal
          name={toRemove.name}
          onConfirm={confirmRemove}
          onCancel={() => setRemoveId(null)}
        />
      )}

      <div className="pb-16">
        {/* Header */}
        <div className="border-b border-border bg-card/50 px-6 py-5">
          <h1 className="text-[22px] font-bold text-foreground">Subscribers</h1>
          <p className="text-[13px] text-foreground/50">Manage your subscriber list</p>
        </div>

        <div className="px-4 py-6 sm:px-6">
          {/* Stats strip */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              { label: "Premium",   value: premiumCount,   color: "#f59e0b" },
              { label: "Standard",  value: standardCount,  color: "#0ea5e9" },
              { label: "Cancelled", value: cancelledCount, color: "#ef4444" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-[22px] font-bold" style={{ color }}>{value}</p>
                <p className="text-[11px] text-foreground/45">{label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, or Whodini ID…"
              className="h-[42px] w-full rounded-xl border border-border bg-background py-0 pl-9 pr-9 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/55 hover:text-foreground/60"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="mb-4 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-styled">
            {TABS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  tab === value
                    ? "bg-[#F62C7D]/10 text-[#F62C7D]"
                    : "text-foreground/50 hover:bg-foreground/5",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {pageItems.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-foreground/60">No subscribers found.</p>
            ) : (
              pageItems.map((sub, i) => (
                <div key={sub.id} className={cn(i !== pageItems.length - 1 && "border-b border-border")}>
                  <SubscriberRow sub={sub} onRemove={handleRemove} />
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[12px] text-foreground/60">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-foreground/60 transition-colors hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-30"
                >
                  Prev
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-foreground/60 transition-colors hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
