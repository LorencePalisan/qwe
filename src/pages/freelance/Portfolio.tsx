import { useState } from "react";
import { Plus, Pencil, Trash2, X, BadgeCheck, CheckCircle2 } from "@/icons";
import { cn } from "@/lib/utils";
import { PORTFOLIO, type ShowcaseEntry, type SkillBadge } from "@/lib/mock/freelance";

// ── Config ────────────────────────────────────────────────────────────────────

const AVAIL_OPTIONS = [
  { value: "available" as const,   label: "Available for work", color: "#16a34a", dot: "bg-emerald-400" },
  { value: "busy" as const,        label: "Currently busy",      color: "#f59e0b", dot: "bg-amber-400" },
  { value: "unavailable" as const, label: "Not available",       color: "#ef4444", dot: "bg-red-400" },
];

// ── Profile Section ───────────────────────────────────────────────────────────

function ProfileSection() {
  const [bio,          setBio]          = useState(PORTFOLIO.bio);
  const [availability, setAvailability] = useState(PORTFOLIO.availability);
  const [skills,       setSkills]       = useState<string[]>(PORTFOLIO.skills);
  const [skillInput,   setSkillInput]   = useState("");
  const [saved,        setSaved]        = useState(false);

  const availCfg = AVAIL_OPTIONS.find((o) => o.value === availability)!;

  function addSkill() {
    const s = skillInput.trim();
    if (!s || skills.includes(s)) return;
    setSkills((prev) => [...prev, s]);
    setSkillInput("");
  }
  function removeSkill(s: string) { setSkills((prev) => prev.filter((x) => x !== s)); }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Profile card preview */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-[#7c3aed]/6 via-background to-[#F62C7D]/6 p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img src={PORTFOLIO.photoUrl} alt="Profile" className="size-16 rounded-2xl object-cover ring-2 ring-border" />
            <span className={cn("absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-background", availCfg.dot)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[18px] font-bold text-foreground">Alex Reyes</p>
            <p className="text-[12px] text-foreground/45" style={{ color: availCfg.color }}>{availCfg.label}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skills.slice(0, 3).map((s) => (
                <span key={s} className="rounded-full border border-border bg-card/80 px-2.5 py-0.5 text-[11px] font-medium text-foreground/60">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <p className="mb-2 text-[12px] font-medium text-foreground/60">Availability status</p>
        <div className="grid grid-cols-3 gap-2">
          {AVAIL_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setAvailability(o.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border py-3 text-[11px] font-medium transition-colors",
                availability === o.value ? "border-[#F62C7D] bg-[#F62C7D]/6 text-foreground" : "border-border text-foreground/50 hover:bg-foreground/5",
              )}
            >
              <span className={cn("size-2.5 rounded-full", o.dot)} />
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="mb-2 block text-[12px] font-medium text-foreground/60">Skills</label>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <span key={s} className="flex items-center gap-1 rounded-full bg-[#7c3aed]/10 px-2.5 py-1 text-[12px] font-medium text-[#7c3aed]">
              {s}
              <button onClick={() => removeSkill(s)}><X className="size-3" /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            placeholder="Add a skill…"
            className="h-[38px] flex-1 rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
          />
          <button onClick={addSkill} className="rounded-xl bg-foreground/8 px-3 text-[13px] font-medium text-foreground/60 hover:bg-foreground/12">Add</button>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={cn(
          "flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all",
          saved ? "bg-emerald-600" : "bg-[#F62C7D] hover:opacity-90",
        )}
      >
        {saved ? <><CheckCircle2 className="size-4" /> Saved!</> : "Save profile"}
      </button>
    </div>
  );
}

// ── Showcase Section ──────────────────────────────────────────────────────────

const BLANK_ENTRY: Omit<ShowcaseEntry, "id"> = {
  serviceType: "", clientName: "", date: "", description: "", anonymizeClient: false, images: [],
};

function ShowcaseSection() {
  const [entries, setEntries] = useState<ShowcaseEntry[]>(PORTFOLIO.showcaseEntries);
  const [sheet,   setSheet]   = useState(false);
  const [draft,   setDraft]   = useState<Omit<ShowcaseEntry, "id">>(BLANK_ENTRY);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imgInput, setImgInput] = useState("");

  function addEntry() {
    if (!draft.serviceType.trim()) return;
    setEntries((prev) => [{ ...draft, id: `sc${Date.now()}` }, ...prev]);
    setSheet(false);
    setDraft(BLANK_ENTRY);
    setImgInput("");
  }

  function toggleAnonymize(id: string) {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, anonymizeClient: !e.anonymizeClient } : e));
  }

  function deleteEntry() {
    if (!deleteId) return;
    setEntries((prev) => prev.filter((e) => e.id !== deleteId));
    setDeleteId(null);
  }

  const inputCls = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls = "mb-1.5 block text-[12px] font-medium text-foreground/60";

  return (
    <>
      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-[16px] font-bold text-foreground">Remove showcase entry?</h3>
            <p className="mt-2 text-[13px] text-foreground/60">This will be removed from your public portfolio.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground/70 hover:bg-foreground/5">Cancel</button>
              <button onClick={deleteEntry} className="flex-1 rounded-xl bg-red-600 py-2.5 text-[13px] font-semibold text-white hover:opacity-90">Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* Add sheet */}
      {sheet && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setSheet(false)} />
          <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-[16px] font-bold text-foreground">Add Showcase Entry</h2>
              <button onClick={() => setSheet(false)} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8"><X className="size-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              <div><label className={labelCls}>Service type</label><input value={draft.serviceType} onChange={(e) => setDraft((p) => ({ ...p, serviceType: e.target.value }))} placeholder="e.g. UI/UX Design" className={inputCls} /></div>
              <div><label className={labelCls}>Client name</label><input value={draft.clientName} onChange={(e) => setDraft((p) => ({ ...p, clientName: e.target.value }))} placeholder="e.g. TechCorp" className={inputCls} /></div>
              <div><label className={labelCls}>Date</label><input type="date" value={draft.date} onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))} className={inputCls} /></div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea value={draft.description} onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="What did you create?" className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30" />
              </div>
              <div>
                <label className={labelCls}>Image URLs</label>
                <div className="mb-2 space-y-1">
                  {draft.images.map((img, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                      <p className="flex-1 truncate text-[11px] text-foreground/60">{img}</p>
                      <button onClick={() => setDraft((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))} className="text-foreground/55 hover:text-red-500"><X className="size-3.5" /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={imgInput} onChange={(e) => setImgInput(e.target.value)} placeholder="https://…" className={cn(inputCls, "flex-1")} />
                  <button onClick={() => { if (imgInput.trim()) { setDraft((p) => ({ ...p, images: [...p.images, imgInput.trim()] })); setImgInput(""); } }} className="shrink-0 rounded-xl bg-foreground/8 px-3 text-[13px] font-medium text-foreground/60 hover:bg-foreground/12">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <div>
                  <p className="text-[13px] font-medium text-foreground">Anonymize client</p>
                  <p className="text-[11px] text-foreground/45">Show "Confidential" instead of client name</p>
                </div>
                <button
                  onClick={() => setDraft((p) => ({ ...p, anonymizeClient: !p.anonymizeClient }))}
                  className={cn("relative h-6 w-11 rounded-full transition-colors", draft.anonymizeClient ? "bg-[#F62C7D]" : "bg-foreground/20")}
                >
                  <span className={cn("absolute top-0.5 left-0 size-5 rounded-full bg-white shadow transition-transform", draft.anonymizeClient ? "translate-x-[22px]" : "translate-x-0.5")} />
                </button>
              </div>
            </div>
            <div className="border-t border-border px-5 py-4">
              <button onClick={addEntry} disabled={!draft.serviceType.trim()} className="flex w-full items-center justify-center rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white hover:opacity-90 disabled:opacity-40">Add to portfolio</button>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-between mb-3">
        <p className="text-[15px] font-bold text-foreground">Showcase</p>
        <button onClick={() => { setDraft(BLANK_ENTRY); setSheet(true); }} className="flex items-center gap-1 rounded-lg bg-[#F62C7D]/10 px-3 py-1.5 text-[12px] font-medium text-[#F62C7D] hover:opacity-80">
          <Plus className="size-3.5" /> Add entry
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="py-10 text-center text-[13px] text-foreground/60">No showcase entries yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map((entry) => (
            <div key={entry.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              {entry.images.length > 0 && (
                <img src={entry.images[0]} alt={entry.serviceType} className="h-36 w-full object-cover" />
              )}
              <div className="p-4">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#7c3aed]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#7c3aed]">{entry.serviceType}</span>
                  <div className="flex gap-1">
                    <button onClick={() => toggleAnonymize(entry.id)} className={cn("rounded-lg px-2 py-1 text-[10px] font-medium transition-colors", entry.anonymizeClient ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-foreground/6 text-foreground/45")}>
                      {entry.anonymizeClient ? "Anonymous" : "Named"}
                    </button>
                    <button onClick={() => setDeleteId(entry.id)} className="rounded-lg p-1 text-foreground/55 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"><Trash2 className="size-3.5" /></button>
                  </div>
                </div>
                <p className="text-[13px] font-semibold text-foreground">{entry.anonymizeClient ? "Confidential Client" : entry.clientName}</p>
                <p className="mt-1 text-[12px] text-foreground/55 line-clamp-2">{entry.description}</p>
                <p className="mt-2 text-[11px] text-foreground/55">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ── Skill Badges Section ──────────────────────────────────────────────────────

function SkillBadgesSection() {
  const [badges, setBadges] = useState<SkillBadge[]>(PORTFOLIO.skillBadges);
  const [input,  setInput]  = useState("");

  function addBadge() {
    const s = input.trim();
    if (!s || badges.some((b) => b.skill === s)) return;
    setBadges((prev) => [...prev, { id: `sb${Date.now()}`, skill: s, verifiedCount: 0 }]);
    setInput("");
  }
  function removeBadge(id: string) { setBadges((prev) => prev.filter((b) => b.id !== id)); }

  return (
    <>
      <p className="mb-3 text-[15px] font-bold text-foreground">Skill Badges</p>
      <p className="mb-4 text-[12px] text-foreground/50">Badges are verified by clients after project completion. They show on your public profile.</p>

      <div className="space-y-2 mb-4">
        {badges.map((badge) => (
          <div key={badge.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <BadgeCheck className={cn("size-4 shrink-0", badge.verifiedCount > 0 ? "text-[#F62C7D]" : "text-foreground/50")} />
            <p className="flex-1 text-[13px] font-medium text-foreground">{badge.skill}</p>
            <span className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
              badge.verifiedCount > 0 ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "bg-foreground/6 text-foreground/55",
            )}>
              {badge.verifiedCount} verified
            </span>
            <button onClick={() => removeBadge(badge.id)} className="text-foreground/50 hover:text-red-500"><X className="size-3.5" /></button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBadge())}
          placeholder="Add a skill badge…"
          className="h-[42px] flex-1 rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
        />
        <button onClick={addBadge} className="rounded-xl bg-[#F62C7D]/10 px-3 text-[13px] font-medium text-[#F62C7D] hover:opacity-80">
          <Plus className="size-4" />
        </button>
      </div>
    </>
  );
}

// ── Tab nav ───────────────────────────────────────────────────────────────────

type Tab = "profile" | "showcase" | "badges";
const TABS: { value: Tab; label: string }[] = [
  { value: "profile",  label: "Profile" },
  { value: "showcase", label: "Showcase" },
  { value: "badges",   label: "Skill Badges" },
];

// ── Main ──────────────────────────────────────────────────────────────────────

export default function FreelancePortfolio() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <div className="flex items-center gap-2">
          <Pencil className="size-4 text-[#F62C7D]/60" />
          <h1 className="text-[22px] font-bold text-foreground">Portfolio</h1>
        </div>
        <p className="text-[13px] text-foreground/50">Your public-facing profile — hero, showcase, and skill badges</p>
      </div>

      {/* Tab nav */}
      <div className="border-b border-border px-4 sm:px-6">
        <div className="flex gap-0">
          {TABS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={cn(
                "border-b-2 px-4 py-3 text-[13px] font-medium transition-colors",
                tab === value ? "border-[#F62C7D] text-[#F62C7D]" : "border-transparent text-foreground/50 hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {tab === "profile"  && <ProfileSection />}
          {tab === "showcase" && <ShowcaseSection />}
          {tab === "badges"   && <SkillBadgesSection />}
        </div>
      </div>
    </div>
  );
}
