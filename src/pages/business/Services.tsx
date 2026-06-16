import { useState } from "react";
import {
  Plus, Search, Pencil, Trash2, X, Star, ChevronDown,
} from "@/icons";
import { cn } from "@/lib/utils";
import { CATALOG_ITEMS, BRANDS, type CatalogItem } from "@/lib/mock/business";

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  active:   { label: "Active",   className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  featured: { label: "Featured", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  premium:  { label: "Premium",  className: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
};

type TabValue = "all" | "service" | "product";

const BLANK: Omit<CatalogItem, "id" | "rating" | "clients"> = {
  title: "", description: "", type: "service", price: 0,
  duration: "", status: "active", features: [], brandId: "br1", category: "",
};

// ── Confirm Delete ────────────────────────────────────────────────────────────

function ConfirmModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <h3 className="text-[16px] font-bold text-foreground">Delete item?</h3>
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

// ── Item Sheet ────────────────────────────────────────────────────────────────

function ItemSheet({
  draft, onChange, onSave, onClose, isEdit,
}: {
  draft: Omit<CatalogItem, "id" | "rating" | "clients">;
  onChange: (patch: Partial<Omit<CatalogItem, "id" | "rating" | "clients">>) => void;
  onSave: () => void;
  onClose: () => void;
  isEdit: boolean;
}) {
  const [featureInput, setFeatureInput] = useState("");
  const inputCls = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls = "mb-1.5 block text-[12px] font-medium text-foreground/60";
  const selectCls = "h-[42px] w-full appearance-none rounded-xl border border-border bg-background pl-3 pr-8 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";

  function addFeature() {
    const f = featureInput.trim();
    if (!f || draft.features.includes(f)) return;
    onChange({ features: [...draft.features, f] });
    setFeatureInput("");
  }

  function removeFeature(f: string) {
    onChange({ features: draft.features.filter((x) => x !== f) });
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{isEdit ? "Edit Item" : "New Item"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8"><X className="size-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className={labelCls}>Title</label>
            <input value={draft.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="e.g. Brand Identity Package" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea value={draft.description} onChange={(e) => onChange({ description: e.target.value })} rows={3} placeholder="What does this include?" className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Type</label>
              <div className="relative">
                <select value={draft.type} onChange={(e) => onChange({ type: e.target.value as CatalogItem["type"] })} className={selectCls}>
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <div className="relative">
                <select value={draft.status} onChange={(e) => onChange({ status: e.target.value as CatalogItem["status"] })} className={selectCls}>
                  <option value="active">Active</option>
                  <option value="featured">Featured</option>
                  <option value="premium">Premium</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Price (₱)</label>
              <input type="number" value={draft.price} onChange={(e) => onChange({ price: Number(e.target.value) })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Duration</label>
              <input value={draft.duration ?? ""} onChange={(e) => onChange({ duration: e.target.value })} placeholder="e.g. 2–4 weeks" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Brand</label>
              <div className="relative">
                <select value={draft.brandId} onChange={(e) => onChange({ brandId: e.target.value })} className={selectCls}>
                  {BRANDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <input value={draft.category} onChange={(e) => onChange({ category: e.target.value })} placeholder="e.g. Design" className={inputCls} />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className={labelCls}>Features</label>
            <div className="flex gap-2">
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                placeholder="e.g. Logo Design"
                className={cn(inputCls, "flex-1")}
              />
              <button onClick={addFeature} className="shrink-0 rounded-xl bg-foreground/8 px-3 text-[13px] font-medium text-foreground/60 hover:bg-foreground/12">Add</button>
            </div>
            {draft.features.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {draft.features.map((f) => (
                  <span key={f} className="flex items-center gap-1 rounded-full bg-[#F62C7D]/10 px-2.5 py-1 text-[11px] font-medium text-[#F62C7D]">
                    {f}
                    <button onClick={() => removeFeature(f)} className="ml-0.5"><X className="size-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border px-5 py-4">
          <button
            onClick={onSave}
            disabled={!draft.title.trim()}
            className="flex w-full items-center justify-center rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
          >
            {isEdit ? "Save Changes" : "Create Item"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Item Card ─────────────────────────────────────────────────────────────────

function ItemCard({
  item, onEdit, onDelete,
}: { item: CatalogItem; onEdit: (item: CatalogItem) => void; onDelete: (item: CatalogItem) => void }) {
  const stCfg  = STATUS_CONFIG[item.status];
  const brand  = BRANDS.find((b) => b.id === item.brandId);

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
      {/* Image placeholder */}
      <div className="relative h-32 bg-foreground/5">
        {item.imageUrl
          ? <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
          : <div className="flex h-full items-center justify-center text-foreground/15 text-[12px]">No image</div>
        }
        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm", stCfg.className)}>
            {stCfg.label}
          </span>
          <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium capitalize text-white/80 backdrop-blur-sm">
            {item.type}
          </span>
        </div>
        <div className="absolute right-2 top-2 flex gap-1">
          <button onClick={() => onEdit(item)} className="flex size-7 items-center justify-center rounded-lg bg-black/30 text-white backdrop-blur-sm hover:bg-black/50">
            <Pencil className="size-3.5" />
          </button>
          <button onClick={() => onDelete(item)} className="flex size-7 items-center justify-center rounded-lg bg-red-600/80 text-white backdrop-blur-sm hover:bg-red-600">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[14px] font-bold text-foreground leading-tight">{item.title}</h3>
        <p className="mt-1 text-[11px] text-foreground/45 line-clamp-2">{item.description}</p>

        {/* Features */}
        {item.features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.features.slice(0, 3).map((f) => (
              <span key={f} className="rounded-full bg-foreground/6 px-2 py-0.5 text-[10px] text-foreground/55">{f}</span>
            ))}
            {item.features.length > 3 && (
              <span className="rounded-full bg-foreground/6 px-2 py-0.5 text-[10px] text-foreground/60">+{item.features.length - 3}</span>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-[16px] font-bold text-foreground">₱{item.price.toLocaleString()}</p>
            {item.duration && <p className="text-[10px] text-foreground/60">{item.duration}</p>}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <span className="text-[12px] font-semibold text-foreground">{item.rating}</span>
            </div>
            {brand && (
              <p className="text-[10px] text-foreground/60">{brand.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BusinessServices() {
  const [items,  setItems]  = useState<CatalogItem[]>(CATALOG_ITEMS);
  const [tab,    setTab]    = useState<TabValue>("all");
  const [query,  setQuery]  = useState("");
  const [sheet,  setSheet]  = useState<"create" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft,  setDraft]  = useState<Omit<CatalogItem, "id" | "rating" | "clients">>(BLANK);
  const [deleteTarget, setDeleteTarget] = useState<CatalogItem | null>(null);

  function openCreate() { setDraft(BLANK); setSheet("create"); }
  function openEdit(item: CatalogItem) {
    const { id, rating, clients, ...rest } = item;
    setDraft(rest);
    setEditId(id);
    setSheet("edit");
  }

  function handleSave() {
    if (sheet === "create") {
      setItems((prev) => [{ ...draft, id: `cat${Date.now()}`, rating: 0, clients: 0 }, ...prev]);
    } else if (sheet === "edit" && editId) {
      setItems((prev) => prev.map((i) => i.id === editId ? { ...i, ...draft } : i));
    }
    setSheet(null);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  const filtered = items.filter((i) => {
    const matchTab = tab === "all" || i.type === tab;
    const matchQ   = !query || i.title.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase());
    return matchTab && matchQ;
  });

  const serviceCount = items.filter((i) => i.type === "service").length;
  const productCount = items.filter((i) => i.type === "product").length;
  const featuredCount = items.filter((i) => i.status === "featured" || i.status === "premium").length;

  return (
    <>
      {deleteTarget && (
        <ConfirmModal title={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
      {sheet && (
        <ItemSheet
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
              <h1 className="text-[22px] font-bold text-foreground">Services & Products</h1>
              <p className="text-[13px] text-foreground/50">Manage your service and product catalog</p>
            </div>
            <button
              onClick={openCreate}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Plus className="size-4" />
              New Item
            </button>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6">
          {/* Stats */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { label: "Services",  value: serviceCount,  color: "#7c3aed" },
              { label: "Products",  value: productCount,  color: "#0ea5e9" },
              { label: "Featured",  value: featuredCount, color: "#f59e0b" },
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
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services and products…" className="h-[42px] w-full rounded-xl border border-border bg-background py-0 pl-9 pr-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
          </div>

          {/* Tabs */}
          <div className="mb-5 flex gap-1.5">
            {(["all", "service", "product"] as TabValue[]).map((v) => (
              <button
                key={v}
                onClick={() => setTab(v)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium capitalize transition-colors",
                  tab === v ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "text-foreground/50 hover:bg-foreground/5",
                )}
              >
                {v === "all" ? "All" : v === "service" ? "Services" : "Products"}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[14px] font-medium text-foreground/60">No items found.</p>
              <button onClick={openCreate} className="mt-2 text-[13px] font-medium text-[#F62C7D] hover:opacity-70">+ Add one</button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <ItemCard key={item.id} item={item} onEdit={openEdit} onDelete={setDeleteTarget} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
