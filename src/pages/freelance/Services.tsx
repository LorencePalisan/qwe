import { useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown } from "@/icons";
import { cn } from "@/lib/utils";
import { FREELANCE_SERVICES, type FreelanceService, type ServiceTier, type ServiceAddOn } from "@/lib/mock/freelance";

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  active:   { label: "Active",   className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  paused:   { label: "Paused",   className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  archived: { label: "Archived", className: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" },
};

const PRICING_COLOR: Record<FreelanceService["pricingModel"], string> = {
  fixed:  "#7c3aed",
  hourly: "#0ea5e9",
  tiered: "#f97316",
};

type TabValue = "all" | FreelanceService["status"];

const BLANK: Omit<FreelanceService, "id"> = {
  title: "", category: "", description: "",
  pricingModel: "fixed", basePrice: 0, status: "active",
  tiers: [], addOns: [],
};

// ── Confirm Delete ────────────────────────────────────────────────────────────

function ConfirmModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <h3 className="text-[16px] font-bold text-foreground">Delete service?</h3>
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

// ── Service Sheet ─────────────────────────────────────────────────────────────

function ServiceSheet({
  draft, onChange, onSave, onClose, isEdit,
}: {
  draft: Omit<FreelanceService, "id">;
  onChange: (p: Partial<Omit<FreelanceService, "id">>) => void;
  onSave: () => void;
  onClose: () => void;
  isEdit: boolean;
}) {
  const [tierInput,   setTierInput]   = useState<ServiceTier>({ name: "", price: 0, description: "" });
  const [addOnInput,  setAddOnInput]  = useState<ServiceAddOn>({ name: "", price: 0 });
  const inputCls  = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls  = "mb-1.5 block text-[12px] font-medium text-foreground/60";
  const selectCls = "h-[42px] w-full appearance-none rounded-xl border border-border bg-background pl-3 pr-8 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";

  function addTier() {
    if (!tierInput.name.trim()) return;
    onChange({ tiers: [...(draft.tiers ?? []), { ...tierInput }] });
    setTierInput({ name: "", price: 0, description: "" });
  }
  function removeTier(i: number) {
    onChange({ tiers: (draft.tiers ?? []).filter((_, idx) => idx !== i) });
  }
  function addAddOn() {
    if (!addOnInput.name.trim()) return;
    onChange({ addOns: [...(draft.addOns ?? []), { ...addOnInput }] });
    setAddOnInput({ name: "", price: 0 });
  }
  function removeAddOn(i: number) {
    onChange({ addOns: (draft.addOns ?? []).filter((_, idx) => idx !== i) });
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{isEdit ? "Edit Service" : "New Service"}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8"><X className="size-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className={labelCls}>Title</label>
            <input value={draft.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="e.g. UI/UX Design" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Category</label>
              <input value={draft.category} onChange={(e) => onChange({ category: e.target.value })} placeholder="e.g. Design" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <div className="relative">
                <select value={draft.status} onChange={(e) => onChange({ status: e.target.value as FreelanceService["status"] })} className={selectCls}>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="archived">Archived</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
              </div>
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea value={draft.description} onChange={(e) => onChange({ description: e.target.value })} rows={3} placeholder="What does this service include?" className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
          </div>

          {/* Pricing model */}
          <div>
            <label className={labelCls}>Pricing model</label>
            <div className="grid grid-cols-3 gap-2">
              {(["fixed", "hourly", "tiered"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => onChange({ pricingModel: m })}
                  className={cn(
                    "rounded-xl border py-2.5 text-[12px] font-semibold capitalize transition-colors",
                    draft.pricingModel === m ? "border-[#F62C7D] bg-[#F62C7D]/8 text-[#F62C7D]" : "border-border text-foreground/50 hover:bg-foreground/5",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Fixed */}
          {draft.pricingModel === "fixed" && (
            <div>
              <label className={labelCls}>Base price (₱)</label>
              <input type="number" value={draft.basePrice ?? 0} onChange={(e) => onChange({ basePrice: Number(e.target.value) })} className={inputCls} />
            </div>
          )}

          {/* Hourly */}
          {draft.pricingModel === "hourly" && (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Rate (₱/hr)</label>
                <input type="number" value={draft.hourlyRate ?? 0} onChange={(e) => onChange({ hourlyRate: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Min hrs</label>
                <input type="number" value={draft.minHours ?? 0} onChange={(e) => onChange({ minHours: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Max hrs</label>
                <input type="number" value={draft.maxHours ?? 0} onChange={(e) => onChange({ maxHours: Number(e.target.value) })} className={inputCls} />
              </div>
            </div>
          )}

          {/* Tiered */}
          {draft.pricingModel === "tiered" && (
            <div>
              <label className={labelCls}>Tiers</label>
              <div className="space-y-2 mb-3">
                {(draft.tiers ?? []).map((tier, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-foreground">{tier.name} — ₱{tier.price.toLocaleString()}</p>
                      <p className="text-[11px] text-foreground/45 truncate">{tier.description}</p>
                    </div>
                    <button onClick={() => removeTier(i)} className="text-foreground/55 hover:text-red-500"><X className="size-3.5" /></button>
                  </div>
                ))}
              </div>
              <div className="space-y-2 rounded-xl border border-dashed border-border p-3">
                <p className="text-[11px] font-medium text-foreground/60">Add tier</p>
                <div className="grid grid-cols-2 gap-2">
                  <input value={tierInput.name} onChange={(e) => setTierInput((t) => ({ ...t, name: e.target.value }))} placeholder="Tier name" className={inputCls} />
                  <input type="number" value={tierInput.price} onChange={(e) => setTierInput((t) => ({ ...t, price: Number(e.target.value) }))} placeholder="Price" className={inputCls} />
                </div>
                <input value={tierInput.description} onChange={(e) => setTierInput((t) => ({ ...t, description: e.target.value }))} placeholder="What's included?" className={inputCls} />
                <button onClick={addTier} className="rounded-xl bg-foreground/8 px-3 py-2 text-[12px] font-medium text-foreground/60 hover:bg-foreground/12">+ Add tier</button>
              </div>
            </div>
          )}

          {/* Add-ons (not for tiered) */}
          {draft.pricingModel !== "tiered" && (
            <div>
              <label className={labelCls}>Add-ons (optional)</label>
              <div className="space-y-2 mb-2">
                {(draft.addOns ?? []).map((a, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
                    <p className="flex-1 text-[12px] text-foreground">{a.name} — +₱{a.price.toLocaleString()}</p>
                    <button onClick={() => removeAddOn(i)} className="text-foreground/55 hover:text-red-500"><X className="size-3.5" /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={addOnInput.name} onChange={(e) => setAddOnInput((a) => ({ ...a, name: e.target.value }))} placeholder="Add-on name" className={cn(inputCls, "flex-1")} />
                <input type="number" value={addOnInput.price} onChange={(e) => setAddOnInput((a) => ({ ...a, price: Number(e.target.value) }))} placeholder="₱" className={cn(inputCls, "w-20")} />
                <button onClick={addAddOn} className="shrink-0 rounded-xl bg-foreground/8 px-3 text-[12px] font-medium text-foreground/60 hover:bg-foreground/12">+</button>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          <button
            onClick={onSave}
            disabled={!draft.title.trim()}
            className="flex w-full items-center justify-center rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {isEdit ? "Save Changes" : "Create Service"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Service Card ──────────────────────────────────────────────────────────────

function ServiceCard({ svc, onEdit, onDelete }: { svc: FreelanceService; onEdit: (s: FreelanceService) => void; onDelete: (s: FreelanceService) => void }) {
  const stCfg  = STATUS_CONFIG[svc.status];
  const pColor = PRICING_COLOR[svc.pricingModel];

  function pricingDisplay() {
    if (svc.pricingModel === "fixed") return `₱${(svc.basePrice ?? 0).toLocaleString()}`;
    if (svc.pricingModel === "hourly") return `₱${(svc.hourlyRate ?? 0).toLocaleString()}/hr`;
    if (svc.pricingModel === "tiered") {
      const prices = (svc.tiers ?? []).map((t) => t.price);
      if (!prices.length) return "Tiered";
      return `₱${Math.min(...prices).toLocaleString()} – ₱${Math.max(...prices).toLocaleString()}`;
    }
  }

  return (
    <div className={cn("flex flex-col rounded-2xl border bg-card p-4", svc.status === "archived" && "opacity-60")}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-foreground/6 px-2.5 py-0.5 text-[11px] font-medium text-foreground/55">{svc.category}</span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", stCfg.className)}>{stCfg.label}</span>
        </div>
        <div className="flex gap-1 shrink-0">
          <button onClick={() => onEdit(svc)} className="rounded-lg p-1.5 text-foreground/55 hover:bg-foreground/8 hover:text-foreground"><Pencil className="size-3.5" /></button>
          <button onClick={() => onDelete(svc)} className="rounded-lg p-1.5 text-foreground/55 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"><Trash2 className="size-3.5" /></button>
        </div>
      </div>

      <h3 className="text-[15px] font-bold text-foreground">{svc.title}</h3>
      <p className="mt-1 text-[12px] text-foreground/50 line-clamp-2">{svc.description}</p>

      {/* Pricing display */}
      <div className="mt-3">
        {svc.pricingModel === "tiered" && svc.tiers && svc.tiers.length > 0 ? (
          <div className="space-y-1">
            {svc.tiers.map((tier) => (
              <div key={tier.name} className="flex items-center justify-between rounded-lg bg-foreground/4 px-3 py-1.5">
                <span className="text-[12px] font-medium text-foreground/70">{tier.name}</span>
                <span className="text-[12px] font-bold" style={{ color: pColor }}>₱{tier.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="text-[20px] font-bold" style={{ color: pColor }}>{pricingDisplay()}</span>
            {svc.pricingModel === "hourly" && svc.minHours && (
              <span className="text-[11px] text-foreground/60">{svc.minHours}–{svc.maxHours}h range</span>
            )}
          </div>
        )}
      </div>

      {/* Add-ons */}
      {svc.addOns && svc.addOns.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {svc.addOns.map((a) => (
            <span key={a.name} className="rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] text-foreground/50">+{a.name} ₱{a.price.toLocaleString()}</span>
          ))}
        </div>
      )}

      {/* Pricing model tag */}
      <div className="mt-3 border-t border-border pt-3">
        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize" style={{ backgroundColor: `${pColor}18`, color: pColor }}>
          {svc.pricingModel} pricing
        </span>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function FreelanceServices() {
  const [services, setServices] = useState<FreelanceService[]>(FREELANCE_SERVICES);
  const [tab,      setTab]      = useState<TabValue>("all");
  const [sheet,    setSheet]    = useState<"create" | "edit" | null>(null);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [draft,    setDraft]    = useState<Omit<FreelanceService, "id">>(BLANK);
  const [deleteTarget, setDeleteTarget] = useState<FreelanceService | null>(null);

  function openCreate() { setDraft(BLANK); setSheet("create"); }
  function openEdit(svc: FreelanceService) {
    const { id, ...rest } = svc;
    setDraft(rest);
    setEditId(id);
    setSheet("edit");
  }
  function handleSave() {
    if (sheet === "create") {
      setServices((prev) => [{ ...draft, id: `fs${Date.now()}` }, ...prev]);
    } else if (sheet === "edit" && editId) {
      setServices((prev) => prev.map((s) => s.id === editId ? { ...draft, id: editId } : s));
    }
    setSheet(null);
  }
  function handleDelete() {
    if (!deleteTarget) return;
    setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  const filtered = services.filter((s) => tab === "all" || s.status === tab);

  const activeCount   = services.filter((s) => s.status === "active").length;
  const pausedCount   = services.filter((s) => s.status === "paused").length;
  const archivedCount = services.filter((s) => s.status === "archived").length;

  return (
    <>
      {deleteTarget && <ConfirmModal title={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {sheet && (
        <ServiceSheet
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
              <h1 className="text-[22px] font-bold text-foreground">Services</h1>
              <p className="text-[13px] text-foreground/50">Manage your service offerings and pricing models</p>
            </div>
            <button onClick={openCreate} className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2.5 text-[13px] font-semibold text-white hover:opacity-90">
              <Plus className="size-4" />
              New Service
            </button>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6">
          {/* Stats */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { label: "Active",   value: activeCount,   color: "#16a34a" },
              { label: "Paused",   value: pausedCount,   color: "#f59e0b" },
              { label: "Archived", value: archivedCount, color: "#6b7280" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-[22px] font-bold" style={{ color }}>{value}</p>
                <p className="text-[11px] text-foreground/45">{label}</p>
              </div>
            ))}
          </div>

          {/* Tab filter */}
          <div className="mb-5 flex gap-1.5">
            {([
              { value: "all" as const,      label: "All" },
              { value: "active" as const,   label: "Active" },
              { value: "paused" as const,   label: "Paused" },
              { value: "archived" as const, label: "Archived" },
            ]).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  tab === value ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "text-foreground/50 hover:bg-foreground/5",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[14px] font-medium text-foreground/60">No services here.</p>
              <button onClick={openCreate} className="mt-2 text-[13px] font-medium text-[#F62C7D] hover:opacity-70">+ Create one</button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((svc) => <ServiceCard key={svc.id} svc={svc} onEdit={openEdit} onDelete={setDeleteTarget} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
