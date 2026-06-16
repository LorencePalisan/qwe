import { useState, useRef } from "react";
import { Users, Search, UserPlus, Trash2, Crown, ChevronDown, X } from "@/icons";
import { cn } from "@/lib/utils";
import {
  COMMUNITY_MEMBERS, COMMUNITY_CHAPTERS,
  type CommunityMember,
} from "@/lib/mock/community";

// ── Helpers ───────────────────────────────────────────────────────────────────

const ROLE_CONFIG = {
  leader:    { label: "Leader",    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  moderator: { label: "Moderator", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  member:    { label: "Member",    color: "bg-foreground/8 text-foreground/50" },
};

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Confirm Modal ─────────────────────────────────────────────────────────────

function ConfirmModal({
  name, onCancel, onConfirm,
}: { name: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl">
        <h3 className="text-[16px] font-bold text-foreground">Remove Member</h3>
        <p className="mt-1.5 text-[13px] text-foreground/60">
          Remove <span className="font-semibold text-foreground">{name}</span> from the community? This cannot be undone.
        </p>
        <div className="mt-5 flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-80"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Invite Sheet ──────────────────────────────────────────────────────────────

function InviteSheet({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CommunityMember["role"]>("member");
  const [chapter, setChapter] = useState(COMMUNITY_CHAPTERS[0].name);
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(""); }, 2000);
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sidebar shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-bold text-foreground">Invite Member</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 transition-colors hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Email Address *</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@email.com"
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as CommunityMember["role"])}
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50"
            >
              <option value="member">Member</option>
              <option value="moderator">Moderator</option>
              <option value="leader">Leader</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Assign to Chapter</label>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50"
            >
              {COMMUNITY_CHAPTERS.map((ch) => (
                <option key={ch.id} value={ch.name}>{ch.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="border-t border-border px-5 py-4">
          <button
            onClick={handleSend}
            className="w-full rounded-xl bg-[#F62C7D] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            {sent ? "Invitation Sent!" : "Send Invitation"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Member Row ────────────────────────────────────────────────────────────────

function MemberRow({
  member, onRemove,
}: { member: CommunityMember; onRemove: (m: CommunityMember) => void }) {
  const cfg = ROLE_CONFIG[member.role];
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-foreground/2 transition-colors">
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/15 text-[12px] font-bold text-[#7c3aed]">
        {initials(member.name)}
        {member.role === "leader" && (
          <div className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-amber-400">
            <Crown className="size-2.5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-semibold text-foreground truncate">{member.name}</p>
          <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", cfg.color)}>{cfg.label}</span>
        </div>
        <p className="text-[11px] text-foreground/60 truncate">{member.email} · {member.whodiniId}</p>
      </div>
      <div className="hidden sm:block text-right shrink-0">
        <p className="text-[12px] font-medium text-foreground/70">{member.chapterName}</p>
        <p className="text-[11px] text-foreground/60">Joined {fmtDate(member.joinedAt)}</p>
      </div>
      <button
        onClick={() => onRemove(member)}
        className="shrink-0 rounded-lg p-1.5 text-foreground/55 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const ROLE_TABS = ["All", "Leader", "Moderator", "Member"] as const;

export default function CommunityMembers() {
  const [members, setMembers] = useState(COMMUNITY_MEMBERS);
  const [search, setSearch] = useState("");
  const [roleTab, setRoleTab] = useState<typeof ROLE_TABS[number]>("All");
  const [chapterFilter, setChapterFilter] = useState("All");
  const [toRemove, setToRemove] = useState<CommunityMember | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [searchVal, setSearchVal] = useState("");

  function handleSearch(v: string) {
    setSearchVal(v);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearch(v), 300);
  }

  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.whodiniId.toLowerCase().includes(q);
    const matchRole = roleTab === "All" || m.role === roleTab.toLowerCase();
    const matchChapter = chapterFilter === "All" || m.chapterName === chapterFilter;
    return matchSearch && matchRole && matchChapter;
  });

  const leaders = members.filter((m) => m.role === "leader").length;
  const mods = members.filter((m) => m.role === "moderator").length;

  function confirmRemove() {
    if (!toRemove) return;
    setMembers((prev) => prev.filter((m) => m.id !== toRemove.id));
    setToRemove(null);
  }

  const chapters = ["All", ...Array.from(new Set(COMMUNITY_CHAPTERS.map((c) => c.name)))];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-foreground">Members</h1>
            <p className="text-[13px] text-foreground/50">{members.length} total · {leaders} leaders · {mods} moderators</p>
          </div>
          <button
            onClick={() => setShowInvite(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <UserPlus className="size-3.5" /> Invite
          </button>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 space-y-3">
        {/* Search + chapter filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/55" />
            <input
              value={searchVal}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search members…"
              className="h-[38px] w-full rounded-xl border border-border bg-background pl-9 pr-3 text-[13px] outline-none focus:border-[#F62C7D]/50"
            />
          </div>
          <div className="relative">
            <select
              value={chapterFilter}
              onChange={(e) => setChapterFilter(e.target.value)}
              className="h-[38px] appearance-none rounded-xl border border-border bg-background pl-3 pr-8 text-[13px] outline-none focus:border-[#F62C7D]/50"
            >
              {chapters.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
          </div>
        </div>

        {/* Role tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {ROLE_TABS.map((t) => {
            const count = t === "All" ? members.length : members.filter((m) => m.role === t.toLowerCase()).length;
            return (
              <button
                key={t}
                onClick={() => setRoleTab(t)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  roleTab === t
                    ? "bg-[#F62C7D]/10 text-[#F62C7D]"
                    : "text-foreground/50 hover:bg-foreground/8",
                )}
              >
                {t} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* List */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Users className="size-8 text-foreground/45 mb-2" />
              <p className="text-[13px] text-foreground/60">No members found</p>
            </div>
          ) : (
            filtered.map((m) => (
              <MemberRow key={m.id} member={m} onRemove={setToRemove} />
            ))
          )}
        </div>
      </div>

      {toRemove && (
        <ConfirmModal name={toRemove.name} onCancel={() => setToRemove(null)} onConfirm={confirmRemove} />
      )}
      {showInvite && <InviteSheet onClose={() => setShowInvite(false)} />}
    </div>
  );
}
