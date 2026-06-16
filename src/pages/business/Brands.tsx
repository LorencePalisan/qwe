import { useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, Store } from "@/icons";
import { cn } from "@/lib/utils";
import { BRANDS, CATALOG_ITEMS, type Brand } from "@/lib/mock/business";

// ── Confirm Delete ────────────────────────────────────────────────────────────

function ConfirmModal({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <h3 className="text-[16px] font-bold text-foreground">Delete brand?</h3>
        <p className="mt-2 text-[13px] text-foreground/60">
          "<span className="font-medium text-foreground">{name}</span>" will be permanently deleted.
        </p>
        <div className="mt-5 flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground/70 hover:bg-foreground/5">Cancel</button>
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-600 py-2.5 text-[13px] font-semibold text-white hover:opacity-90">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Brand Sheet ───────────────────────────────────────────────────────────────

const COLOR_OPTIONS = [
  "#7c3aed", "#0ea5e9", "#16a34a", "#f97316", "#ef4444", "#f59e0b", "#F62C7D", "#6b7280",
];

function BrandSheet({
  draft, onChange, onSave, onClose, isEdit,
}: {
  draft: Omit<Brand, "id" | "itemCount">;
  onChange: (patch: Partial<Omit<Brand, "id" | "itemCount">>) => void;
  onSave: () => void;
  onClose: () => void;
  isEdit: boolean;
}) {
  const inputCls = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{isEdit ? "Edit Brand" : "New Brand"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8"><X className="size-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Brand name</label>
            <input value={draft.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="e.g. Neon Core" className={inputCls} />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Category</label>
            <input value={draft.category} onChange={(e) => onChange({ category: e.target.value })} placeholder="e.g. Design" className={inputCls} />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Brand color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => onChange({ color: c })}
                  className={cn("size-8 rounded-full transition-transform hover:scale-110", draft.color === c && "ring-2 ring-offset-2 ring-foreground/40")}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border px-5 py-4">
          <button
            onClick={onSave}
            disabled={!draft.name.trim()}
            className="flex w-full items-center justify-center rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
          >
            {isEdit ? "Save Changes" : "Create Brand"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Brand Row (accordion) ─────────────────────────────────────────────────────

function BrandRow({
  brand, onEdit, onDelete,
}: { brand: Brand; onEdit: (b: Brand) => void; onDelete: (b: Brand) => void }) {
  const [expanded, setExpanded] = useState(false);
  const linked = CATALOG_ITEMS.filter((c) => c.brandId === brand.id);

  return (
    <div className="border-b border-border last:border-b-0">
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-4">
        {/* Color dot */}
        <div className="size-3 shrink-0 rounded-full" style={{ backgroundColor: brand.color }} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-foreground">{brand.name}</p>
          <p className="text-[11px] text-foreground/45">{brand.category} · {brand.itemCount} items</p>
        </div>

        {/* Label badge */}
        <span className="hidden rounded-full px-2.5 py-0.5 text-[11px] font-medium sm:block" style={{ backgroundColor: `${brand.color}18`, color: brand.color }}>
          {brand.category}
        </span>

        {/* Actions */}
        <button onClick={() => onEdit(brand)} className="rounded-lg p-1.5 text-foreground/55 hover:bg-foreground/8 hover:text-foreground">
          <Pencil className="size-3.5" />
        </button>
        <button onClick={() => onDelete(brand)} className="rounded-lg p-1.5 text-foreground/55 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
          <Trash2 className="size-3.5" />
        </button>
        <button onClick={() => setExpanded((v) => !v)} className="rounded-lg p-1.5 text-foreground/55 hover:bg-foreground/8">
          {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>
      </div>

      {/* Expanded: linked catalog items */}
      {expanded && (
        <div className="border-t border-border bg-foreground/2 px-4 py-3">
          {linked.length === 0 ? (
            <p className="text-[12px] text-foreground/60">No catalog items linked to this brand.</p>
          ) : (
            <div className="space-y-2">
              {linked.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5">
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    item.type === "service"
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                  )}>
                    {item.type}
                  </span>
                  <p className="flex-1 text-[13px] font-medium text-foreground">{item.title}</p>
                  <p className="shrink-0 text-[12px] font-semibold text-foreground/70">₱{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const BLANK: Omit<Brand, "id" | "itemCount"> = { name: "", category: "", color: "#7c3aed" };

export default function BusinessBrands() {
  const [brands, setBrands] = useState<Brand[]>(BRANDS);
  const [sheet,  setSheet]  = useState<"create" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft,  setDraft]  = useState<Omit<Brand, "id" | "itemCount">>(BLANK);
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);

  function openCreate() { setDraft(BLANK); setSheet("create"); }
  function openEdit(b: Brand) {
    setDraft({ name: b.name, category: b.category, color: b.color });
    setEditId(b.id);
    setSheet("edit");
  }

  function handleSave() {
    if (sheet === "create") {
      setBrands((prev) => [...prev, { ...draft, id: `br${Date.now()}`, itemCount: 0 }]);
    } else if (sheet === "edit" && editId) {
      setBrands((prev) => prev.map((b) => b.id === editId ? { ...b, ...draft } : b));
    }
    setSheet(null);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setBrands((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <>
      {deleteTarget && (
        <ConfirmModal name={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
      {sheet && (
        <BrandSheet
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
              <h1 className="text-[22px] font-bold text-foreground">Brands</h1>
              <p className="text-[13px] text-foreground/50">Organize your catalog into brand categories</p>
            </div>
            <button
              onClick={openCreate}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Plus className="size-4" />
              New Brand
            </button>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6">
          {/* Stats */}
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Total Brands", value: brands.length,                                color: "#7c3aed" },
              { label: "Total Items",  value: brands.reduce((a, b) => a + b.itemCount, 0), color: "#0ea5e9" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-[22px] font-bold" style={{ color }}>{value}</p>
                <p className="text-[11px] text-foreground/45">{label}</p>
              </div>
            ))}
          </div>

          {/* Brand list */}
          {brands.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Store className="mb-3 size-10 text-foreground/45" />
              <p className="text-[14px] font-medium text-foreground/60">No brands yet.</p>
              <button onClick={openCreate} className="mt-2 text-[13px] font-medium text-[#F62C7D] hover:opacity-70">+ Create a brand</button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {brands.map((b) => (
                <BrandRow key={b.id} brand={b} onEdit={openEdit} onDelete={setDeleteTarget} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
