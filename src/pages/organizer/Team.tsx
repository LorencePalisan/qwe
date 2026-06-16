import { useState } from "react";
import { Plus, Search, Phone, Mail, Pencil, Trash2, X } from "@/icons";
import { ORGANIZER_TEAM, type TeamMember } from "@/lib/mock/organizer";
import { cn } from "@/lib/utils";

const ROLES    = ["Senior Coordinator", "On-Site Coordinator", "AV Technician", "Logistics Lead", "Client Relations", "Decoration Specialist", "Assistant"];
const STATUSES = ["Available", "Busy", "Off"] as const;
const INPUT = "h-[46px] w-full rounded-[10px] border border-border bg-card px-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/15 transition-all";
const LABEL = "mb-1 block text-[12px] font-medium text-foreground/50 uppercase tracking-wide";

const STATUS_COLOR: Record<string, string> = {
  Available: "bg-emerald-500/15 text-emerald-400",
  Busy:      "bg-amber-500/15 text-amber-400",
  Off:       "bg-foreground/10 text-foreground/60",
};

const EMPTY: Partial<TeamMember> = {
  name: "", role: "Assistant", email: "", phone: "", status: "Available", assignedEvents: 0,
};

function MemberSheet({ member, onClose, onSave }: {
  member: Partial<TeamMember> | null;
  onClose: () => void;
  onSave: (m: TeamMember) => void;
}) {
  const [form, setForm] = useState<Partial<TeamMember>>(member ?? EMPTY);
  const set = (k: keyof TeamMember, v: string | number) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.name?.trim()) return;
    onSave({ id: form.id ?? `tm${Date.now()}`, ...EMPTY, ...form } as TeamMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">{form.id ? "Edit Member" : "Add Member"}</h2>
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-lg bg-foreground/8 text-foreground/60 hover:bg-foreground/15"><X className="size-4" /></button>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          <div><label className={LABEL}>Full Name</label><input className={INPUT} placeholder="Team member name" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} /></div>
          <div>
            <label className={LABEL}>Role</label>
            <select className={INPUT} value={form.role ?? "Assistant"} onChange={(e) => set("role", e.target.value)}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div><label className={LABEL}>Email</label><input type="email" className={INPUT} placeholder="member@email.com" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} /></div>
          <div><label className={LABEL}>Phone</label><input type="tel" className={INPUT} placeholder="+63 9XX XXX XXXX" value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /></div>
          <div>
            <label className={LABEL}>Status</label>
            <select className={INPUT} value={form.status ?? "Available"} onChange={(e) => set("status", e.target.value as TeamMember["status"])}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Assigned Events</label>
            <input type="number" min={0} className={INPUT} value={form.assignedEvents ?? 0} onChange={(e) => set("assignedEvents", Number(e.target.value))} />
          </div>
        </div>
        <div className="shrink-0 border-t border-border p-5">
          <button onClick={handleSave} className="h-[44px] w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-white hover:opacity-90">
            {form.id ? "Save Changes" : "Add Member"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrganizerTeam() {
  const [members, setMembers]     = useState(ORGANIZER_TEAM);
  const [filter, setFilter]       = useState<"All" | "Available" | "Busy" | "Off">("All");
  const [query, setQuery]         = useState("");
  const [sheet, setSheet]         = useState<Partial<TeamMember> | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteId, setDeleteId]   = useState<string | null>(null);

  const filtered = members.filter((m) => {
    const matchStatus = filter === "All" || m.status === filter;
    const matchQ      = !query || m.name.toLowerCase().includes(query.toLowerCase()) || m.role.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQ;
  });

  const handleSave = (m: TeamMember) => {
    setMembers((p) => p.some((x) => x.id === m.id) ? p.map((x) => x.id === m.id ? m : x) : [m, ...p]);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-foreground">Team</h1>
          <p className="text-[14px] text-foreground/50">{members.length} staff members</p>
        </div>
        <button onClick={() => { setSheet(EMPTY); setSheetOpen(true); }} className="flex h-[40px] items-center gap-2 rounded-full bg-[#F62C7D] px-4 text-[13.6px] font-semibold text-white hover:opacity-90">
          <Plus className="size-4" /> Add Member
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/60" />
          <input className="h-[40px] w-full rounded-full border border-border bg-card pl-9 pr-4 text-[13.6px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/50 focus:outline-none" placeholder="Search members…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {(["All", "Available", "Busy", "Off"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={cn("rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors", filter === s ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "bg-foreground/6 text-foreground/50 hover:text-foreground")}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((m) => (
          <div key={m.id} className="rounded-[14px] border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/15 text-[14px] font-bold text-[#F62C7D]">
                {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-foreground">{m.name}</p>
                <p className="truncate text-[12px] text-foreground/50">{m.role}</p>
              </div>
              <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium", STATUS_COLOR[m.status])}>{m.status}</span>
            </div>
            <div className="mb-4 flex flex-col gap-1.5 text-[12px] text-foreground/60">
              <span className="flex items-center gap-1.5"><Mail className="size-3.5" />{m.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="size-3.5" />{m.phone}</span>
            </div>
            <div className="mb-4 rounded-xl bg-foreground/5 px-4 py-2.5 text-center">
              <p className="text-[20px] font-bold text-foreground">{m.assignedEvents}</p>
              <p className="text-[11px] text-foreground/60">Assigned Events</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setSheet(m); setSheetOpen(true); }} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-[12px] text-foreground/60 hover:bg-foreground/8">
                <Pencil className="size-3.5" /> Edit
              </button>
              <button onClick={() => setDeleteId(m.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-500/20 py-2 text-[12px] text-red-400 hover:bg-red-500/10">
                <Trash2 className="size-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-[14px] text-foreground/60">No team members found.</div>
        )}
      </div>

      {sheetOpen && <MemberSheet member={sheet} onClose={() => { setSheetOpen(false); setSheet(null); }} onSave={handleSave} />}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-sidebar p-6">
            <h3 className="mb-2 text-[16px] font-bold text-foreground">Remove Member?</h3>
            <p className="mb-6 text-[14px] text-foreground/60">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="h-[44px] flex-1 rounded-full border border-border text-[14px] text-foreground/70 hover:bg-foreground/8">Cancel</button>
              <button onClick={() => { setMembers((p) => p.filter((m) => m.id !== deleteId)); setDeleteId(null); }} className="h-[44px] flex-1 rounded-full bg-red-500/80 text-[14px] font-semibold text-white hover:opacity-90">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
