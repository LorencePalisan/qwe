import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "@/icons";
import { ORGANIZER_SERVICES, type OrganizerService } from "@/lib/mock/organizer";
import { cn } from "@/lib/utils";

const CATEGORIES   = ["All", "Wedding", "Corporate", "Birthday", "Concert", "Private"];
const PRICING_TYPES = ["Fixed", "Starting at", "Per head"] as const;
const INPUT = "h-[46px] w-full rounded-[10px] border border-border bg-card px-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/15 transition-all";
const LABEL = "mb-1 block text-[12px] font-medium text-foreground/50 uppercase tracking-wide";

const EMPTY: Partial<OrganizerService> = {
  name: "", description: "", price: 0, pricingType: "Starting at",
  category: "Wedding", included: [], active: true,
};

function ServiceSheet({ service, onClose, onSave }: {
  service: Partial<OrganizerService> | null;
  onClose: () => void;
  onSave: (s: OrganizerService) => void;
}) {
  const [form, setForm]   = useState<Partial<OrganizerService>>(service ?? EMPTY);
  const [tag, setTag]     = useState("");
  const set = (k: keyof OrganizerService, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const addIncluded = () => {
    if (!tag.trim()) return;
    set("included", [...(form.included ?? []), tag.trim()]);
    setTag("");
  };

  const removeIncluded = (i: number) => {
    set("included", (form.included ?? []).filter((_, idx) => idx !== i));
  };

  const handleSave = () => {
    if (!form.name?.trim()) return;
    onSave({ id: form.id ?? `os${Date.now()}`, ...EMPTY, ...form } as OrganizerService);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{form.id ? "Edit Package" : "New Package"}</h2>
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-lg bg-foreground/8 text-foreground/60 hover:bg-foreground/15"><X className="size-4" /></button>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          <div><label className={LABEL}>Package Name</label><input className={INPUT} placeholder="Classic Wedding Package" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} /></div>
          <div>
            <label className={LABEL}>Description</label>
            <textarea className={cn(INPUT, "h-20 resize-none py-3")} placeholder="What's included?" value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Price (₱)</label>
              <input type="number" className={INPUT} value={form.price ?? 0} onChange={(e) => set("price", Number(e.target.value))} />
            </div>
            <div>
              <label className={LABEL}>Pricing Type</label>
              <select className={INPUT} value={form.pricingType ?? "Starting at"} onChange={(e) => set("pricingType", e.target.value as OrganizerService["pricingType"])}>
                {PRICING_TYPES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={LABEL}>Category</label>
            <select className={INPUT} value={form.category ?? "Wedding"} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>What's Included</label>
            <div className="flex gap-2">
              <input className={cn(INPUT, "flex-1")} placeholder="Add item…" value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addIncluded()} />
              <button onClick={addIncluded} className="flex size-[46px] shrink-0 items-center justify-center rounded-[10px] bg-[#F62C7D]/15 text-[#F62C7D] hover:bg-[#F62C7D]/25"><Plus className="size-4" /></button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(form.included ?? []).map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 rounded-full bg-foreground/8 px-3 py-1 text-[12px] text-foreground/70">
                  {item}
                  <button onClick={() => removeIncluded(i)} className="text-foreground/60 hover:text-foreground"><X className="size-3" /></button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => set("active", !form.active)}
              className={cn("flex size-5 items-center justify-center rounded border", form.active ? "border-[#F62C7D] bg-[#F62C7D]" : "border-border bg-card")}
            >
              {form.active && <Check className="size-3 text-white" />}
            </button>
            <span className="text-[14px] text-foreground/70">Active (visible to clients)</span>
          </div>
        </div>
        <div className="shrink-0 border-t border-border p-5">
          <button onClick={handleSave} className="h-[44px] w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-white hover:opacity-90">
            {form.id ? "Save Changes" : "Create Package"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrganizerServices() {
  const [services, setServices]   = useState(ORGANIZER_SERVICES);
  const [category, setCategory]   = useState("All");
  const [sheet, setSheet]         = useState<Partial<OrganizerService> | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteId, setDeleteId]   = useState<string | null>(null);

  const filtered = services.filter((s) => category === "All" || s.category === category);

  const handleSave = (s: OrganizerService) => {
    setServices((p) => p.some((x) => x.id === s.id) ? p.map((x) => x.id === s.id ? s : x) : [s, ...p]);
  };

  const toggleActive = (id: string) => {
    setServices((p) => p.map((s) => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-foreground">Services & Packages</h1>
          <p className="text-[14px] text-foreground/50">{services.length} packages · {services.filter((s) => s.active).length} active</p>
        </div>
        <button onClick={() => { setSheet(EMPTY); setSheetOpen(true); }} className="flex h-[40px] items-center gap-2 rounded-full bg-[#F62C7D] px-4 text-[13.6px] font-semibold text-white hover:opacity-90">
          <Plus className="size-4" /> New Package
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={cn("rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors", category === c ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "bg-foreground/6 text-foreground/50 hover:text-foreground")}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <div key={s.id} className={cn("rounded-[14px] border bg-card p-5 transition-opacity", s.active ? "border-border" : "border-border opacity-60")}>
            <div className="mb-1 flex items-start justify-between gap-2">
              <p className="text-[15px] font-semibold text-foreground">{s.name}</p>
              <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium", s.active ? "bg-emerald-500/15 text-emerald-400" : "bg-foreground/10 text-foreground/60")}>
                {s.active ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="mb-3 text-[12px] text-foreground/50">{s.category}</p>
            <p className="mb-3 text-[13px] text-foreground/70 leading-relaxed">{s.description}</p>
            <p className="mb-3 text-[18px] font-bold text-[#F62C7D]">
              ₱{s.price.toLocaleString()}
              <span className="ml-1 text-[12px] font-normal text-foreground/50">{s.pricingType}</span>
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {s.included.map((item) => (
                <span key={item} className="rounded-full bg-foreground/6 px-2.5 py-0.5 text-[11px] text-foreground/60">{item}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleActive(s.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-[12px] text-foreground/60 hover:bg-foreground/8">
                {s.active ? "Deactivate" : "Activate"}
              </button>
              <button onClick={() => { setSheet(s); setSheetOpen(true); }} className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground/60 hover:bg-foreground/8"><Pencil className="size-3.5" /></button>
              <button onClick={() => setDeleteId(s.id)} className="flex size-9 items-center justify-center rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-[14px] text-foreground/60">No packages found.</div>
        )}
      </div>

      {sheetOpen && <ServiceSheet service={sheet} onClose={() => { setSheetOpen(false); setSheet(null); }} onSave={handleSave} />}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-sidebar p-6">
            <h3 className="mb-2 text-[16px] font-bold text-foreground">Delete Package?</h3>
            <p className="mb-6 text-[14px] text-foreground/60">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="h-[44px] flex-1 rounded-full border border-border text-[14px] text-foreground/70 hover:bg-foreground/8">Cancel</button>
              <button onClick={() => { setServices((p) => p.filter((s) => s.id !== deleteId)); setDeleteId(null); }} className="h-[44px] flex-1 rounded-full bg-red-500/80 text-[14px] font-semibold text-white hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
