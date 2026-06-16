import { useState } from "react";
import { Plus, X, CheckCircle2, ChevronDown } from "@/icons";
import { cn } from "@/lib/utils";
import { FREELANCE_MILESTONES, FREELANCE_CLIENTS, type FreelanceMilestone } from "@/lib/mock/freelance";

// ── Config ────────────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  deadline:  { label: "Deadline",   color: "#ef4444", dot: "bg-red-500" },
  booking:   { label: "Booking",    color: "#3b82f6", dot: "bg-blue-500" },
  follow_up: { label: "Follow-up",  color: "#f59e0b", dot: "bg-amber-400" },
};

const STATUS_CONFIG = {
  pending:   { label: "Pending",   className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" },
};

type TypeFilter   = "all" | FreelanceMilestone["type"];
type StatusFilter = "all" | "pending" | "completed" | "cancelled";

const BLANK: Omit<FreelanceMilestone, "id"> = {
  title: "", description: "", clientId: null,
  dueDate: "", type: "deadline", status: "pending",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function daysUntil(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86_400_000);
  if (diff < 0)  return `${Math.abs(diff)}d overdue`;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `in ${diff}d`;
}

function isOverdue(dateStr: string) {
  return new Date(dateStr) < new Date() && new Date(dateStr).toDateString() !== new Date().toDateString();
}

// ── Add/Edit Sheet ────────────────────────────────────────────────────────────

function MilestoneSheet({
  draft, onChange, onSave, onClose, isEdit,
}: {
  draft: Omit<FreelanceMilestone, "id">;
  onChange: (p: Partial<Omit<FreelanceMilestone, "id">>) => void;
  onSave: () => void;
  onClose: () => void;
  isEdit: boolean;
}) {
  const inputCls  = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls  = "mb-1.5 block text-[12px] font-medium text-foreground/60";
  const selectCls = "h-[42px] w-full appearance-none rounded-xl border border-border bg-background pl-3 pr-8 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{isEdit ? "Edit Milestone" : "New Milestone"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8"><X className="size-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className={labelCls}>Title</label>
            <input value={draft.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="e.g. Design Handoff" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea value={draft.description} onChange={(e) => onChange({ description: e.target.value })} rows={3} placeholder="What needs to happen?" className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Type</label>
              <div className="relative">
                <select value={draft.type} onChange={(e) => onChange({ type: e.target.value as FreelanceMilestone["type"] })} className={selectCls}>
                  <option value="deadline">Deadline</option>
                  <option value="booking">Booking</option>
                  <option value="follow_up">Follow-up</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Due date</label>
              <input type="date" value={draft.dueDate} onChange={(e) => onChange({ dueDate: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Client (optional)</label>
            <div className="relative">
              <select value={draft.clientId ?? ""} onChange={(e) => onChange({ clientId: e.target.value || null })} className={selectCls}>
                <option value="">No client</option>
                {FREELANCE_CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
            </div>
          </div>
        </div>

        <div className="border-t border-border px-5 py-4">
          <button
            onClick={onSave}
            disabled={!draft.title.trim() || !draft.dueDate}
            className="flex w-full items-center justify-center rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {isEdit ? "Save Changes" : "Add Milestone"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Milestone Card ────────────────────────────────────────────────────────────

function MilestoneCard({
  m, onComplete, onCancel, onEdit,
}: {
  m: FreelanceMilestone;
  onComplete: (id: string) => void;
  onCancel:   (id: string) => void;
  onEdit:     (m: FreelanceMilestone) => void;
}) {
  const typeCfg   = TYPE_CONFIG[m.type];
  const statusCfg = STATUS_CONFIG[m.status];
  const client    = FREELANCE_CLIENTS.find((c) => c.id === m.clientId);
  const overdue   = m.status === "pending" && isOverdue(m.dueDate);
  const until     = daysUntil(m.dueDate);

  return (
    <div className={cn("rounded-2xl border bg-card p-4", overdue ? "border-red-200 dark:border-red-900/40" : "border-border")}>
      <div className="flex items-start gap-3">
        {/* Type dot */}
        <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${typeCfg.color}18` }}>
          <span className={cn("size-2 rounded-full", typeCfg.dot)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <p className="text-[14px] font-bold text-foreground">{m.title}</p>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", statusCfg.className)}>{statusCfg.label}</span>
          </div>
          <p className="text-[12px] text-foreground/55">{m.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-foreground/60">
            {client && <span>{client.name}</span>}
            <span
              className={cn("font-medium", overdue ? "text-red-500" : m.status === "completed" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground/60")}
            >
              {new Date(m.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              {m.status === "pending" && <span className="ml-1">· {until}</span>}
            </span>
          </div>
        </div>

        {/* Actions */}
        {m.status === "pending" && (
          <div className="flex shrink-0 flex-col gap-1">
            <button onClick={() => onEdit(m)} className="rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-foreground/50 hover:bg-foreground/5">Edit</button>
            <button onClick={() => onComplete(m.id)} className="rounded-lg bg-emerald-100 px-2.5 py-1.5 text-[11px] font-medium text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400">Done</button>
            <button onClick={() => onCancel(m.id)} className="rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-foreground/55 hover:bg-foreground/5">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function FreelanceCalendar() {
  const [milestones, setMilestones] = useState<FreelanceMilestone[]>(FREELANCE_MILESTONES);
  const [typeFilter,   setTypeFilter]   = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");
  const [sheet,   setSheet]   = useState<"create" | "edit" | null>(null);
  const [editId,  setEditId]  = useState<string | null>(null);
  const [draft,   setDraft]   = useState<Omit<FreelanceMilestone, "id">>(BLANK);

  function openCreate() { setDraft(BLANK); setSheet("create"); }
  function openEdit(m: FreelanceMilestone) {
    const { id, ...rest } = m;
    setDraft(rest);
    setEditId(id);
    setSheet("edit");
  }
  function handleSave() {
    if (sheet === "create") {
      setMilestones((prev) => [...prev, { ...draft, id: `mil${Date.now()}` }]);
    } else if (sheet === "edit" && editId) {
      setMilestones((prev) => prev.map((m) => m.id === editId ? { ...draft, id: editId } : m));
    }
    setSheet(null);
  }
  function handleComplete(id: string) {
    setMilestones((prev) => prev.map((m) => m.id === id ? { ...m, status: "completed" } : m));
  }
  function handleCancel(id: string) {
    setMilestones((prev) => prev.map((m) => m.id === id ? { ...m, status: "cancelled" } : m));
  }

  const filtered = milestones
    .filter((m) => {
      const matchType   = typeFilter === "all" || m.type === typeFilter;
      const matchStatus = statusFilter === "all" || m.status === statusFilter;
      return matchType && matchStatus;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const pendingCount   = milestones.filter((m) => m.status === "pending").length;
  const completedCount = milestones.filter((m) => m.status === "completed").length;
  const overdueCount   = milestones.filter((m) => m.status === "pending" && isOverdue(m.dueDate)).length;

  return (
    <>
      {sheet && (
        <MilestoneSheet
          draft={draft}
          onChange={(p) => setDraft((prev) => ({ ...prev, ...p }))}
          onSave={handleSave}
          onClose={() => setSheet(null)}
          isEdit={sheet === "edit"}
        />
      )}

      <div className="pb-16">
        <div className="border-b border-border bg-card/50 px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-bold text-foreground">Calendar</h1>
              <p className="text-[13px] text-foreground/50">Track deadlines, bookings, and follow-ups</p>
            </div>
            <button onClick={openCreate} className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2.5 text-[13px] font-semibold text-white hover:opacity-90">
              <Plus className="size-4" />
              Add
            </button>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6">
          {/* Stats */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { label: "Pending",   value: pendingCount,   color: "#f59e0b" },
              { label: "Completed", value: completedCount, color: "#16a34a" },
              { label: "Overdue",   value: overdueCount,   color: "#ef4444" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-[22px] font-bold" style={{ color }}>{value}</p>
                <p className="text-[11px] text-foreground/45">{label}</p>
              </div>
            ))}
          </div>

          {/* Type filter */}
          <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-styled">
            {(["all", "deadline", "booking", "follow_up"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setTypeFilter(v)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium capitalize transition-colors",
                  typeFilter === v ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "text-foreground/50 hover:bg-foreground/5",
                )}
              >
                {v === "all" ? "All types" : v === "follow_up" ? "Follow-up" : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="mb-5 flex gap-1.5">
            {(["pending", "completed", "cancelled", "all"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setStatusFilter(v)}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium capitalize transition-colors",
                  statusFilter === v ? "bg-foreground/10 text-foreground" : "text-foreground/60 hover:bg-foreground/5",
                )}
              >
                {v}
              </button>
            ))}
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <CheckCircle2 className="mx-auto mb-3 size-10 text-foreground/15" />
              <p className="text-[14px] font-medium text-foreground/60">No milestones here.</p>
              <button onClick={openCreate} className="mt-2 text-[13px] font-medium text-[#F62C7D] hover:opacity-70">+ Add one</button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((m) => (
                <MilestoneCard key={m.id} m={m} onComplete={handleComplete} onCancel={handleCancel} onEdit={openEdit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
