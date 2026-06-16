import { useState } from "react";
import { Globe2, Search, Plus, ExternalLink, Trash2, X, Tag } from "@/icons";
import { cn } from "@/lib/utils";
import { DIRECTORY_ENTRIES, type DirectoryEntry } from "@/lib/mock/community";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<DirectoryEntry["category"], string> = {
  Guidelines: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Resources:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Directory:  "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Tools:      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Events:     "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

const CATEGORIES: Array<DirectoryEntry["category"] | "All"> = ["All", "Guidelines", "Resources", "Directory", "Tools", "Events"];

// ── Confirm Modal ─────────────────────────────────────────────────────────────

function ConfirmModal({ title, onCancel, onConfirm }: { title: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl">
        <h3 className="text-[16px] font-bold text-foreground">Archive Entry</h3>
        <p className="mt-1.5 text-[13px] text-foreground/60">
          Archive <span className="font-semibold text-foreground">{title}</span>? It will be hidden from the directory.
        </p>
        <div className="mt-5 flex gap-2.5">
          <button onClick={onCancel} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground hover:bg-foreground/5">Cancel</button>
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-2.5 text-[13px] font-semibold text-white hover:opacity-80">Archive</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Resource Sheet ────────────────────────────────────────────────────────

function AddResourceSheet({ onClose, onAdd }: { onClose: () => void; onAdd: (e: DirectoryEntry) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<DirectoryEntry["category"]>("Resources");
  const [resourceType, setResourceType] = useState("Guide");
  const [url, setUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  function addTag() {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((p) => [...p, t]);
    setTagInput("");
  }

  function removeTag(t: string) { setTags((p) => p.filter((x) => x !== t)); }

  function handleSave() {
    if (!title.trim()) return;
    onAdd({
      id: `de${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      resourceType,
      url: url.trim() || "#",
      tags,
      status: "active",
    });
    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">Add Resource</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tech Interview Handbook"
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] outline-none focus:border-[#F62C7D]/50 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as DirectoryEntry["category"])}
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50">
                {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Type</label>
              <input value={resourceType} onChange={(e) => setResourceType(e.target.value)} placeholder="Guide, Tool, Doc…"
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">URL</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..."
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Tags</label>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag…"
                className="h-[36px] flex-1 rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50"
              />
              <button onClick={addTag} className="rounded-xl border border-border px-3 text-[12px] font-medium text-foreground/60 hover:bg-foreground/5">
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {t}
                    <button onClick={() => removeTag(t)} className="ml-0.5 opacity-60 hover:opacity-100"><X className="size-2.5" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-border px-5 py-4">
          <button onClick={handleSave}
            className="w-full rounded-xl bg-[#F62C7D] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
            Add Resource
          </button>
        </div>
      </div>
    </>
  );
}

// ── Resource Card ─────────────────────────────────────────────────────────────

function ResourceCard({ entry, onArchive }: { entry: DirectoryEntry; onArchive: () => void }) {
  const catColor = CATEGORY_COLOR[entry.category];
  const isExternal = entry.url !== "#";

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center gap-2 flex-wrap">
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", catColor)}>{entry.category}</span>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-foreground/50">{entry.resourceType}</span>
          </div>
          <h3 className="text-[14px] font-bold text-foreground">{entry.title}</h3>
        </div>
        <button onClick={onArchive} className="shrink-0 rounded-lg p-1.5 text-foreground/55 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
          <Trash2 className="size-3.5" />
        </button>
      </div>
      <p className="mb-3 text-[12px] leading-relaxed text-foreground/50">{entry.description}</p>
      {entry.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {entry.tags.map((t) => (
            <span key={t} className="flex items-center gap-1 rounded-full bg-foreground/5 px-2 py-0.5 text-[11px] text-foreground/50">
              <Tag className="size-2.5" />{t}
            </span>
          ))}
        </div>
      )}
      {isExternal && (
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5 rounded-xl bg-[#F62C7D]/10 px-3 py-1.5 text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70"
        >
          <ExternalLink className="size-3.5" /> Visit Resource
        </a>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function CommunityDirectory() {
  const [entries, setEntries] = useState(DIRECTORY_ENTRIES.filter((e) => e.status === "active"));
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<typeof CATEGORIES[number]>("All");
  const [showAdd, setShowAdd] = useState(false);
  const [toArchive, setToArchive] = useState<DirectoryEntry | null>(null);

  const filtered = entries.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.tags.some((t) => t.toLowerCase().includes(q));
    const matchCat = categoryFilter === "All" || e.category === categoryFilter;
    return matchSearch && matchCat;
  });

  function handleAdd(entry: DirectoryEntry) {
    setEntries((prev) => [entry, ...prev]);
  }

  function confirmArchive() {
    if (!toArchive) return;
    setEntries((prev) => prev.filter((e) => e.id !== toArchive.id));
    setToArchive(null);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-foreground">Directory</h1>
            <p className="text-[13px] text-foreground/50">Shared resources, guides, and links for members</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="size-3.5" /> Add Resource
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
            placeholder="Search resources…"
            className="h-[38px] w-full rounded-xl border border-border bg-background pl-9 pr-3 text-[13px] outline-none focus:border-[#F62C7D]/50"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? entries.length : entries.filter((e) => e.category === cat).length;
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

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Globe2 className="size-8 text-foreground/45 mb-2" />
            <p className="text-[13px] text-foreground/60">No resources found</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((entry) => (
              <ResourceCard key={entry.id} entry={entry} onArchive={() => setToArchive(entry)} />
            ))}
          </div>
        )}
      </div>

      {showAdd && <AddResourceSheet onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {toArchive && (
        <ConfirmModal title={toArchive.title} onCancel={() => setToArchive(null)} onConfirm={confirmArchive} />
      )}
    </div>
  );
}
