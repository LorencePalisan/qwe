import { useState } from "react";
import { Plus, Search, Star, Phone, Mail, Pencil, Trash2, X } from "@/icons";
import { VENDORS, type Vendor } from "@/lib/mock/organizer";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Photography", "Catering", "Audio / Visual", "Decoration", "Transportation", "Entertainment", "Cakes & Pastry"];
const STATUSES   = ["Active", "On Hold", "Inactive"] as const;
const INPUT = "h-[46px] w-full rounded-[10px] border border-border bg-card px-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/15 transition-all";
const LABEL = "mb-1 block text-[12px] font-medium text-foreground/50 uppercase tracking-wide";

const STATUS_COLOR: Record<string, string> = {
  Active:   "bg-emerald-500/15 text-emerald-400",
  "On Hold":"bg-amber-500/15 text-amber-400",
  Inactive: "bg-foreground/10 text-foreground/60",
};

const EMPTY_VENDOR: Partial<Vendor> = {
  name: "", category: "Photography", contact: "", email: "", phone: "",
  rating: 5, priceRange: "", status: "Active", lastUsed: "",
};

function VendorSheet({ vendor, onClose, onSave }: {
  vendor: Partial<Vendor> | null;
  onClose: () => void;
  onSave: (v: Vendor) => void;
}) {
  const [form, setForm] = useState<Partial<Vendor>>(vendor ?? EMPTY_VENDOR);
  const set = (k: keyof Vendor, v: string | number) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.name?.trim()) return;
    onSave({ id: form.id ?? `v${Date.now()}`, ...EMPTY_VENDOR, ...form } as Vendor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{form.id ? "Edit Vendor" : "Add Vendor"}</h2>
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-lg bg-foreground/8 text-foreground/60 hover:bg-foreground/15"><X className="size-4" /></button>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          <div><label className={LABEL}>Business Name</label><input className={INPUT} placeholder="Vendor / business name" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL}>Category</label>
              <select className={INPUT} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Status</label>
              <select className={INPUT} value={form.status ?? "Active"} onChange={(e) => set("status", e.target.value as Vendor["status"])}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div><label className={LABEL}>Contact Person</label><input className={INPUT} placeholder="Full name" value={form.contact ?? ""} onChange={(e) => set("contact", e.target.value)} /></div>
          <div><label className={LABEL}>Email</label><input type="email" className={INPUT} placeholder="vendor@email.com" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} /></div>
          <div><label className={LABEL}>Phone</label><input type="tel" className={INPUT} placeholder="+63 9XX XXX XXXX" value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /></div>
          <div><label className={LABEL}>Price Range</label><input className={INPUT} placeholder="e.g. ₱25,000–₱80,000" value={form.priceRange ?? ""} onChange={(e) => set("priceRange", e.target.value)} /></div>
          <div>
            <label className={LABEL}>Rating (1–5)</label>
            <input type="number" min={1} max={5} step={0.1} className={INPUT} value={form.rating ?? 5} onChange={(e) => set("rating", Number(e.target.value))} />
          </div>
          <div><label className={LABEL}>Last Used</label><input type="date" className={INPUT} value={form.lastUsed ?? ""} onChange={(e) => set("lastUsed", e.target.value)} /></div>
        </div>
        <div className="shrink-0 border-t border-border p-5">
          <button onClick={handleSave} className="h-[44px] w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-white hover:opacity-90">
            {form.id ? "Save Changes" : "Add Vendor"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrganizerVendors() {
  const [vendors, setVendors]     = useState(VENDORS);
  const [category, setCategory]   = useState("All");
  const [query, setQuery]         = useState("");
  const [sheet, setSheet]         = useState<Partial<Vendor> | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteId, setDeleteId]   = useState<string | null>(null);

  const filtered = vendors.filter((v) => {
    const matchCat = category === "All" || v.category === category;
    const matchQ   = !query || v.name.toLowerCase().includes(query.toLowerCase()) || v.contact.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const handleSave = (v: Vendor) => {
    setVendors((p) => p.some((x) => x.id === v.id) ? p.map((x) => x.id === v.id ? v : x) : [v, ...p]);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-foreground">Vendors</h1>
          <p className="text-[14px] text-foreground/50">{vendors.length} vendors in your network</p>
        </div>
        <button onClick={() => { setSheet(EMPTY_VENDOR); setSheetOpen(true); }} className="flex h-[40px] items-center gap-2 rounded-full bg-[#F62C7D] px-4 text-[13.6px] font-semibold text-white hover:opacity-90">
          <Plus className="size-4" /> Add Vendor
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/60" />
          <input className="h-[40px] w-full rounded-full border border-border bg-card pl-9 pr-4 text-[13.6px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/50 focus:outline-none" placeholder="Search vendors…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={cn("rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors", category === c ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "bg-foreground/6 text-foreground/50 hover:text-foreground")}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((v) => (
          <div key={v.id} className="rounded-[14px] border border-border bg-card p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-foreground">{v.name}</p>
                <p className="text-[12px] text-foreground/50">{v.category}</p>
              </div>
              <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium", STATUS_COLOR[v.status])}>{v.status}</span>
            </div>
            <div className="mb-3 flex items-center gap-1 text-[12px] text-amber-400">
              <Star className="size-3.5 fill-amber-400" />
              <span className="font-semibold">{v.rating.toFixed(1)}</span>
              <span className="text-foreground/60">· {v.priceRange}</span>
            </div>
            <div className="mb-4 flex flex-col gap-1.5 text-[12px] text-foreground/60">
              <span>{v.contact}</span>
              <span className="flex items-center gap-1.5"><Mail className="size-3.5" />{v.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="size-3.5" />{v.phone}</span>
            </div>
            <p className="mb-3 text-[11px] text-foreground/55">Last used: {v.lastUsed || "—"}</p>
            <div className="flex gap-2">
              <button onClick={() => { setSheet(v); setSheetOpen(true); }} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-[12px] text-foreground/60 hover:bg-foreground/8">
                <Pencil className="size-3.5" /> Edit
              </button>
              <button onClick={() => setDeleteId(v.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-500/20 py-2 text-[12px] text-red-400 hover:bg-red-500/10">
                <Trash2 className="size-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-[14px] text-foreground/60">No vendors found.</div>
        )}
      </div>

      {sheetOpen && <VendorSheet vendor={sheet} onClose={() => { setSheetOpen(false); setSheet(null); }} onSave={handleSave} />}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-sidebar p-6">
            <h3 className="mb-2 text-[16px] font-bold text-foreground">Remove Vendor?</h3>
            <p className="mb-6 text-[14px] text-foreground/60">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="h-[44px] flex-1 rounded-full border border-border text-[14px] text-foreground/70 hover:bg-foreground/8">Cancel</button>
              <button onClick={() => { setVendors((p) => p.filter((v) => v.id !== deleteId)); setDeleteId(null); }} className="h-[44px] flex-1 rounded-full bg-red-500/80 text-[14px] font-semibold text-white hover:opacity-90">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
