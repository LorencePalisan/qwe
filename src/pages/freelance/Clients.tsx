import { useState } from "react";
import { ArrowLeft, Plus, Pencil, X, Mail, Phone, DollarSign, CheckCircle2 } from "@/icons";
import { cn } from "@/lib/utils";
import { FREELANCE_CLIENTS, type FreelanceClient, type HistoryEntry } from "@/lib/mock/freelance";

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function totalEarned(client: FreelanceClient) {
  return client.history.reduce((a, e) => a + e.value, 0);
}

// ── Edit Client Sheet ─────────────────────────────────────────────────────────

function EditSheet({
  client, onSave, onClose,
}: { client: FreelanceClient; onSave: (patch: Partial<FreelanceClient>) => void; onClose: () => void }) {
  const [name,  setName]  = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [company, setCompany] = useState(client.company);
  const [notes, setNotes] = useState(client.notes);

  const inputCls = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls = "mb-1.5 block text-[12px] font-medium text-foreground/60";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">Edit Client</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8"><X className="size-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div><label className={labelCls}>Name</label><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Company</label><input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} /></div>
          <div>
            <label className={labelCls}>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
          </div>
        </div>
        <div className="border-t border-border px-5 py-4">
          <button
            onClick={() => { onSave({ name, email, phone, company, notes }); onClose(); }}
            className="flex w-full items-center justify-center rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

// ── Add History Entry Sheet ───────────────────────────────────────────────────

const BLANK_ENTRY: Omit<HistoryEntry, "id"> = {
  date: "", serviceType: "", description: "", value: 0, deliverables: [],
};

function AddEntrySheet({ onSave, onClose }: { onSave: (e: HistoryEntry) => void; onClose: () => void }) {
  const [draft, setDraft] = useState<Omit<HistoryEntry, "id">>(BLANK_ENTRY);
  const [delInput, setDelInput] = useState("");
  const inputCls = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls = "mb-1.5 block text-[12px] font-medium text-foreground/60";

  function addDeliverable() {
    const d = delInput.trim();
    if (!d) return;
    setDraft((prev) => ({ ...prev, deliverables: [...prev.deliverables, d] }));
    setDelInput("");
  }
  function removeDeliverable(i: number) {
    setDraft((prev) => ({ ...prev, deliverables: prev.deliverables.filter((_, idx) => idx !== i) }));
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">Add Project</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8"><X className="size-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className={labelCls}>Service type</label>
            <input value={draft.serviceType} onChange={(e) => setDraft((p) => ({ ...p, serviceType: e.target.value }))} placeholder="e.g. UI/UX Design" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea value={draft.description} onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="What was done?" className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" value={draft.date} onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Value (₱)</label>
              <input type="number" value={draft.value} onChange={(e) => setDraft((p) => ({ ...p, value: Number(e.target.value) }))} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Deliverables</label>
            <div className="mb-2 space-y-1">
              {draft.deliverables.map((d, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <p className="flex-1 text-[12px] text-foreground">{d}</p>
                  <button onClick={() => removeDeliverable(i)} className="text-foreground/55 hover:text-red-500"><X className="size-3.5" /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={delInput} onChange={(e) => setDelInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDeliverable())} placeholder="e.g. Design File (Figma)" className={cn(inputCls, "flex-1")} />
              <button onClick={addDeliverable} className="shrink-0 rounded-xl bg-foreground/8 px-3 text-[13px] font-medium text-foreground/60 hover:bg-foreground/12">Add</button>
            </div>
          </div>
        </div>
        <div className="border-t border-border px-5 py-4">
          <button
            onClick={() => {
              if (!draft.serviceType.trim() || !draft.date) return;
              onSave({ ...draft, id: `he${Date.now()}` });
              onClose();
            }}
            disabled={!draft.serviceType.trim() || !draft.date}
            className="flex w-full items-center justify-center rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white hover:opacity-90 disabled:opacity-40"
          >
            Add Project
          </button>
        </div>
      </div>
    </>
  );
}

// ── Client Detail ─────────────────────────────────────────────────────────────

function ClientDetail({
  client, onBack, onUpdate,
}: { client: FreelanceClient; onBack: () => void; onUpdate: (id: string, patch: Partial<FreelanceClient>) => void }) {
  const [editSheet,    setEditSheet]    = useState(false);
  const [addEntrySheet, setAddEntrySheet] = useState(false);
  const [clientData,   setClientData]   = useState(client);

  function handleUpdate(patch: Partial<FreelanceClient>) {
    const updated = { ...clientData, ...patch };
    setClientData(updated);
    onUpdate(client.id, patch);
  }

  function handleAddEntry(entry: HistoryEntry) {
    const updated = { ...clientData, history: [entry, ...clientData.history] };
    setClientData(updated);
    onUpdate(client.id, { history: updated.history });
  }

  const earned = totalEarned(clientData);

  return (
    <>
      {editSheet     && <EditSheet client={clientData} onSave={handleUpdate} onClose={() => setEditSheet(false)} />}
      {addEntrySheet && <AddEntrySheet onSave={handleAddEntry} onClose={() => setAddEntrySheet(false)} />}

      <div className="pb-16">
        {/* Header */}
        <div className="border-b border-border bg-card/50 px-6 py-5">
          <button onClick={onBack} className="mb-3 flex items-center gap-1.5 text-[12px] font-medium text-foreground/50 hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            All clients
          </button>
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#F62C7D]/12">
              <span className="text-[16px] font-bold text-[#F62C7D]">{initials(clientData.name)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-[20px] font-bold text-foreground">{clientData.name}</h1>
              <p className="text-[13px] text-foreground/50">{clientData.company}</p>
            </div>
            <button onClick={() => setEditSheet(true)} className="shrink-0 flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-[12px] font-medium text-foreground/60 hover:bg-foreground/5">
              <Pencil className="size-3.5" /> Edit
            </button>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-[22px] font-bold text-[#16a34a]">₱{(earned / 1000).toFixed(0)}K</p>
              <p className="text-[11px] text-foreground/45">Total earned</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-[22px] font-bold text-[#0ea5e9]">{clientData.history.length}</p>
              <p className="text-[11px] text-foreground/45">Projects</p>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-foreground/60">Contact</p>
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-foreground/55" />
                <span className="text-[13px] text-foreground/70">{clientData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-foreground/55" />
                <span className="text-[13px] text-foreground/70">{clientData.phone}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {clientData.notes && (
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border px-4 py-3">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-foreground/60">Notes</p>
              </div>
              <p className="px-4 py-3 text-[13px] text-foreground/65 leading-relaxed">{clientData.notes}</p>
            </div>
          )}

          {/* History */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[15px] font-bold text-foreground">Project History</p>
              <button onClick={() => setAddEntrySheet(true)} className="flex items-center gap-1 rounded-lg bg-[#F62C7D]/10 px-3 py-1.5 text-[12px] font-medium text-[#F62C7D] hover:opacity-80">
                <Plus className="size-3.5" /> Add project
              </button>
            </div>

            {clientData.history.length === 0 ? (
              <p className="py-8 text-center text-[13px] text-foreground/60">No projects yet.</p>
            ) : (
              <div className="space-y-3">
                {clientData.history.map((entry) => (
                  <div key={entry.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[14px] font-bold text-foreground">{entry.serviceType}</p>
                        <p className="text-[11px] text-foreground/60">{new Date(entry.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1 text-[#16a34a]">
                        <DollarSign className="size-3.5" />
                        <span className="text-[15px] font-bold">₱{entry.value.toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="mb-3 text-[12px] text-foreground/55">{entry.description}</p>
                    {entry.deliverables.length > 0 && (
                      <div className="space-y-1">
                        {entry.deliverables.map((d) => (
                          <div key={d} className="flex items-center gap-2">
                            <CheckCircle2 className="size-3 shrink-0 text-emerald-500" />
                            <span className="text-[11px] text-foreground/55">{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Client List ───────────────────────────────────────────────────────────────

function ClientRow({ client, onClick }: { client: FreelanceClient; onClick: () => void }) {
  const earned = totalEarned(client);
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-foreground/3"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#F62C7D]/10">
        <span className="text-[13px] font-bold text-[#F62C7D]">{initials(client.name)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-foreground">{client.name}</p>
        <p className="text-[11px] text-foreground/45">{client.company} · {client.history.length} project{client.history.length !== 1 ? "s" : ""}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-[14px] font-bold text-[#16a34a]">₱{(earned / 1000).toFixed(0)}K</p>
        <p className="text-[10px] text-foreground/55">earned</p>
      </div>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function FreelanceClients() {
  const [clients,     setClients]     = useState<FreelanceClient[]>(FREELANCE_CLIENTS);
  const [activeClient, setActiveClient] = useState<FreelanceClient | null>(null);

  function handleUpdate(id: string, patch: Partial<FreelanceClient>) {
    setClients((prev) => prev.map((c) => c.id === id ? { ...c, ...patch } : c));
    if (activeClient?.id === id) setActiveClient((prev) => prev ? { ...prev, ...patch } : null);
  }

  if (activeClient) {
    return <ClientDetail client={activeClient} onBack={() => setActiveClient(null)} onUpdate={handleUpdate} />;
  }

  const totalEarnedAll = clients.reduce((a, c) => a + totalEarned(c), 0);
  const totalProjects  = clients.reduce((a, c) => a + c.history.length, 0);

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-[22px] font-bold text-foreground">Clients</h1>
        <p className="text-[13px] text-foreground/50">CRM — client list with history and contact info</p>
      </div>

      <div className="px-4 py-6 sm:px-6">
        {/* Stats */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          {[
            { label: "Clients",  value: clients.length,                     color: "#7c3aed" },
            { label: "Projects", value: totalProjects,                       color: "#0ea5e9" },
            { label: "Earned",   value: `₱${(totalEarnedAll / 1000).toFixed(0)}K`, color: "#16a34a" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-[18px] font-bold" style={{ color }}>{value}</p>
              <p className="text-[11px] text-foreground/45">{label}</p>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {clients.map((client, i) => (
            <div key={client.id} className={cn(i !== clients.length - 1 && "border-b border-border")}>
              <ClientRow client={client} onClick={() => setActiveClient(client)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
