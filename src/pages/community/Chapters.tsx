import { useState } from "react";
import { BookOpen, X, Pencil, Plus } from "@/icons";
import { cn } from "@/lib/utils";
import {
  COMMUNITY_CHAPTERS, COMMUNITY_MEMBERS,
  type CommunityChapter, type ChapterOfficer,
} from "@/lib/mock/community";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Creative:    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Business:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

// ── Edit Sheet ────────────────────────────────────────────────────────────────

function EditSheet({
  chapter, onClose, onSave,
}: {
  chapter: CommunityChapter;
  onClose: () => void;
  onSave: (updated: CommunityChapter) => void;
}) {
  const [name, setName] = useState(chapter.name);
  const [description, setDescription] = useState(chapter.description);
  const [category, setCategory] = useState(chapter.category);
  const [leaderName, setLeaderName] = useState(chapter.leaderName);
  const [viceLeaderName, setViceLeaderName] = useState(chapter.viceLeaderName);
  const [officers, setOfficers] = useState<ChapterOfficer[]>(chapter.officers);
  const [newOfficerName, setNewOfficerName] = useState("");
  const [newOfficerRole, setNewOfficerRole] = useState("");

  function addOfficer() {
    if (!newOfficerName.trim() || !newOfficerRole.trim()) return;
    setOfficers((prev) => [...prev, { name: newOfficerName.trim(), role: newOfficerRole.trim() }]);
    setNewOfficerName(""); setNewOfficerRole("");
  }

  function removeOfficer(i: number) {
    setOfficers((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSave() {
    onSave({ ...chapter, name, description, category, leaderName, viceLeaderName, officers });
    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">Edit Chapter</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 transition-colors hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Chapter Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] outline-none focus:border-[#F62C7D]/50 resize-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50">
              <option>Engineering</option>
              <option>Creative</option>
              <option>Business</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Chapter Leader</label>
              <input value={leaderName} onChange={(e) => setLeaderName(e.target.value)}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Vice Leader</label>
              <input value={viceLeaderName} onChange={(e) => setViceLeaderName(e.target.value)}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-[12px] font-medium text-foreground/60">Officers</label>
            {officers.map((o, i) => (
              <div key={i} className="mb-2 flex items-center gap-2 rounded-xl border border-border bg-background/50 px-3 py-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground">{o.name}</p>
                  <p className="text-[11px] text-foreground/60">{o.role}</p>
                </div>
                <button onClick={() => removeOfficer(i)} className="text-foreground/55 hover:text-red-500">
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input value={newOfficerName} onChange={(e) => setNewOfficerName(e.target.value)}
                placeholder="Name" className="h-[36px] flex-1 rounded-xl border border-border bg-background px-3 text-[12px] outline-none focus:border-[#F62C7D]/50" />
              <input value={newOfficerRole} onChange={(e) => setNewOfficerRole(e.target.value)}
                placeholder="Role" className="h-[36px] flex-1 rounded-xl border border-border bg-background px-3 text-[12px] outline-none focus:border-[#F62C7D]/50" />
              <button onClick={addOfficer} className="rounded-xl bg-[#F62C7D]/10 px-3 text-[#F62C7D] hover:bg-[#F62C7D]/20">
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-border px-5 py-4">
          <button onClick={handleSave}
            className="w-full rounded-xl bg-[#F62C7D] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

// ── Chapter Detail ────────────────────────────────────────────────────────────

function ChapterDetail({
  chapter, onEdit,
}: { chapter: CommunityChapter; onEdit: () => void }) {
  const chapterMembers = COMMUNITY_MEMBERS.filter((m) => m.chapterName === chapter.name);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-5 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-[18px] font-bold text-foreground">{chapter.name}</h2>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", CATEGORY_COLOR[chapter.category] ?? "bg-foreground/8 text-foreground/50")}>
                {chapter.category}
              </span>
            </div>
            <p className="text-[13px] text-foreground/50 leading-relaxed">{chapter.description}</p>
          </div>
          <button onClick={onEdit} className="shrink-0 rounded-xl border border-border p-2 text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground">
            <Pencil className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Leadership */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-foreground/60">Leadership</p>
          <div className="space-y-2">
            {[
              { label: "Chapter Leader", name: chapter.leaderName },
              { label: "Vice Leader", name: chapter.viceLeaderName },
              ...chapter.officers.map((o) => ({ label: o.role, name: o.name })),
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/15 text-[11px] font-bold text-[#7c3aed]">
                  {initials(item.name)}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-foreground">{item.name}</p>
                  <p className="text-[11px] text-foreground/60">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-[24px] font-bold text-foreground">{chapter.memberCount}</p>
            <p className="text-[11px] text-foreground/60">Total Members</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-[24px] font-bold text-foreground">{1 + 1 + chapter.officers.length}</p>
            <p className="text-[11px] text-foreground/60">Officers</p>
          </div>
        </div>

        {/* Members */}
        {chapterMembers.length > 0 && (
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
              Members on Record ({chapterMembers.length})
            </p>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {chapterMembers.map((m, i) => (
                <div key={m.id} className={cn("flex items-center gap-3 px-4 py-3", i !== chapterMembers.length - 1 && "border-b border-border")}>
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/10 text-[10px] font-bold text-[#7c3aed]">
                    {initials(m.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-foreground truncate">{m.name}</p>
                    <p className="text-[11px] text-foreground/60">{m.whodiniId}</p>
                  </div>
                  <span className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                    m.role === "leader" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      : m.role === "moderator" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-foreground/8 text-foreground/50",
                  )}>
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function CommunityChapters() {
  const [chapters, setChapters] = useState(COMMUNITY_CHAPTERS);
  const [selectedId, setSelectedId] = useState(chapters[0]?.id ?? "");
  const [editing, setEditing] = useState(false);

  const selected = chapters.find((c) => c.id === selectedId) ?? chapters[0];

  function handleSave(updated: CommunityChapter) {
    setChapters((prev) => prev.map((c) => c.id === updated.id ? updated : c));
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-[22px] font-bold text-foreground">Chapters</h1>
        <p className="text-[13px] text-foreground/50">{chapters.length} chapters · {chapters.reduce((a, c) => a + c.memberCount, 0)} total members</p>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — chapter list */}
        <div className="w-64 shrink-0 border-r border-border overflow-y-auto">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedId(ch.id)}
              className={cn(
                "flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left transition-colors",
                selectedId === ch.id ? "bg-[#F62C7D]/5 border-l-2 border-l-[#F62C7D]" : "hover:bg-foreground/3",
              )}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10">
                <BookOpen className="size-4 text-[#7c3aed]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-[13px] font-semibold text-foreground">{ch.name}</p>
                <p className="text-[11px] text-foreground/60">{ch.memberCount} members</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right panel — chapter detail */}
        <div className="flex-1 overflow-hidden">
          {selected && (
            <ChapterDetail chapter={selected} onEdit={() => setEditing(true)} />
          )}
        </div>
      </div>

      {editing && selected && (
        <EditSheet
          chapter={selected}
          onClose={() => setEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
