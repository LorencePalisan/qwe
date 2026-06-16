import { useState } from "react";
import { Clock, Plus, X, Trophy, TrendingUp, Calendar, Users, Zap, BookOpen } from "@/icons";
import { cn } from "@/lib/utils";
import { COMMUNITY_MILESTONES, type CommunityMilestone } from "@/lib/mock/community";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<CommunityMilestone["category"], { color: string; bg: string; icon: React.ElementType }> = {
  Foundation:   { color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-100 dark:bg-amber-900/30",   icon: Zap },
  Growth:       { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30", icon: TrendingUp },
  Events:       { color: "text-blue-600 dark:text-blue-400",     bg: "bg-blue-100 dark:bg-blue-900/30",     icon: Calendar },
  Partnerships: { color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30", icon: Users },
  Expansion:    { color: "text-sky-600 dark:text-sky-400",       bg: "bg-sky-100 dark:bg-sky-900/30",       icon: BookOpen },
  Programs:     { color: "text-pink-600 dark:text-pink-400",     bg: "bg-pink-100 dark:bg-pink-900/30",     icon: Trophy },
};

const CATEGORIES = ["All", "Foundation", "Growth", "Events", "Partnerships", "Expansion", "Programs"] as const;

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ── Add Milestone Modal ───────────────────────────────────────────────────────

function AddMilestoneModal({
  onClose, onAdd,
}: { onClose: () => void; onAdd: (m: CommunityMilestone) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<CommunityMilestone["category"]>("Growth");
  const [impact, setImpact] = useState("");

  function handleAdd() {
    if (!title.trim() || !date) return;
    onAdd({
      id: `cmi${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      date,
      category,
      impact: impact.trim(),
      communityLabel: "Manila Tech Circle",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-[15px] font-bold text-foreground">Add Milestone</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Reached 500 Members"
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              placeholder="What happened and why does it matter?"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] outline-none focus:border-[#F62C7D]/50 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as CommunityMilestone["category"])}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50">
                {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Impact / Key Stat</label>
            <input value={impact} onChange={(e) => setImpact(e.target.value)} placeholder="500 active members across 8 chapters"
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
          </div>
        </div>
        <div className="flex gap-2.5 border-t border-border px-5 py-4">
          <button onClick={onClose} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground hover:bg-foreground/5">
            Cancel
          </button>
          <button onClick={handleAdd} disabled={!title.trim() || !date}
            className="flex-1 rounded-xl bg-[#F62C7D] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40">
            Add Milestone
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Timeline Item ─────────────────────────────────────────────────────────────

function TimelineItem({ milestone, isLast }: { milestone: CommunityMilestone; isLast: boolean }) {
  const cfg = CATEGORY_CONFIG[milestone.category];
  const Icon = cfg.icon;

  return (
    <div className="flex gap-4">
      {/* Spine */}
      <div className="flex flex-col items-center">
        <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", cfg.bg)}>
          <Icon className={cn("size-4", cfg.color)} />
        </div>
        {!isLast && <div className="mt-1 flex-1 w-px bg-gradient-to-b from-border to-transparent min-h-[32px]" />}
      </div>
      {/* Content */}
      <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[14px] font-bold text-foreground">{milestone.title}</h3>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", cfg.bg, cfg.color)}>
              {milestone.category}
            </span>
          </div>
          <p className="shrink-0 text-[11px] text-foreground/60">{fmtDate(milestone.date)}</p>
        </div>
        <p className="mb-2 text-[13px] leading-relaxed text-foreground/60">{milestone.description}</p>
        {milestone.impact && (
          <div className="flex items-center gap-1.5 rounded-lg bg-foreground/4 px-3 py-2 w-fit">
            <TrendingUp className="size-3 text-foreground/60 shrink-0" />
            <span className="text-[12px] font-medium text-foreground/60">{milestone.impact}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function CommunityHistory() {
  const [milestones, setMilestones] = useState(
    [...COMMUNITY_MILESTONES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  );
  const [categoryFilter, setCategoryFilter] = useState<typeof CATEGORIES[number]>("All");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = milestones.filter((m) =>
    categoryFilter === "All" ? true : m.category === categoryFilter,
  );

  function handleAdd(m: CommunityMilestone) {
    setMilestones((prev) =>
      [m, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-foreground">History</h1>
            <p className="text-[13px] text-foreground/50">Community milestones and key moments</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="size-3.5" /> Add Milestone
          </button>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 space-y-4">
        {/* Category filter */}
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? milestones.length : milestones.filter((m) => m.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  categoryFilter === cat ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "text-foreground/50 hover:bg-foreground/8",
                )}
              >
                {cat} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Clock className="size-8 text-foreground/45 mb-2" />
            <p className="text-[13px] text-foreground/60">No milestones in this category</p>
          </div>
        ) : (
          <div className="max-w-2xl pt-2">
            {filtered.map((m, i) => (
              <TimelineItem key={m.id} milestone={m} isLast={i === filtered.length - 1} />
            ))}
          </div>
        )}
      </div>

      {showAdd && <AddMilestoneModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  );
}
