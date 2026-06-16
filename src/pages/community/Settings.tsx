import { useState } from "react";
import { Settings, Image, Upload, Bell, Send, CheckCircle2 } from "@/icons";
import { cn } from "@/lib/utils";
import { COMMUNITY_DASHBOARD } from "@/lib/mock/community";

// ── Tabs ──────────────────────────────────────────────────────────────────────

type Tab = "General" | "Notifications";
const TABS: Tab[] = ["General", "Notifications"];

// ── General Tab ───────────────────────────────────────────────────────────────

function GeneralTab() {
  const { communityName, whodiniId } = COMMUNITY_DASHBOARD;
  const [name, setName] = useState(communityName);
  const [description, setDescription] = useState(
    "A vibrant community of tech professionals, developers, and innovators based in Metro Manila, Philippines.",
  );
  const [visibility, setVisibility] = useState<"public" | "invite-only">("public");
  const [website, setWebsite] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Banner upload */}
      <div>
        <label className="mb-2 block text-[13px] font-semibold text-foreground">Community Banner</label>
        <div className="group relative flex h-32 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-border bg-foreground/3 transition-colors hover:border-[#F62C7D]/40 hover:bg-[#F62C7D]/3">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-foreground/8 group-hover:bg-[#F62C7D]/10">
              <Image className="size-5 text-foreground/55 group-hover:text-[#F62C7D]/60" />
            </div>
            <p className="text-[12px] text-foreground/60">Click to upload banner image</p>
            <p className="text-[11px] text-foreground/50">Recommended: 1200 × 400px</p>
          </div>
        </div>
      </div>

      {/* Logo upload */}
      <div>
        <label className="mb-2 block text-[13px] font-semibold text-foreground">Community Logo</label>
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4]">
            <span className="text-[18px] font-bold text-white">
              {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div className="flex-1">
            <div className="group flex h-16 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border bg-foreground/3 transition-colors hover:border-[#F62C7D]/40 hover:bg-[#F62C7D]/3">
              <div className="flex items-center gap-2">
                <Upload className="size-3.5 text-foreground/55 group-hover:text-[#F62C7D]/60" />
                <p className="text-[12px] text-foreground/60 group-hover:text-foreground/60">Upload logo image</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community info */}
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Community Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] outline-none focus:border-[#F62C7D]/50 resize-none" />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Website</label>
          <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://manilatechchircle.com"
            className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Whodini ID</label>
          <input value={whodiniId} disabled
            className="h-[42px] w-full rounded-xl border border-border bg-foreground/3 px-3 text-[13px] text-foreground/60 cursor-not-allowed" />
        </div>
        <div>
          <label className="mb-2 block text-[12px] font-medium text-foreground/60">Visibility</label>
          <div className="flex gap-2">
            {(["public", "invite-only"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVisibility(v)}
                className={cn(
                  "flex-1 rounded-xl border py-2.5 text-[13px] font-medium capitalize transition-colors",
                  visibility === v
                    ? "border-[#F62C7D]/30 bg-[#F62C7D]/8 text-[#F62C7D]"
                    : "border-border text-foreground/50 hover:bg-foreground/5",
                )}
              >
                {v.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={cn(
          "flex items-center gap-2 rounded-xl px-6 py-2.5 text-[13px] font-semibold text-white transition-all",
          saved ? "bg-emerald-500" : "bg-[#F62C7D] hover:opacity-90",
        )}
      >
        {saved && <CheckCircle2 className="size-4" />}
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

// ── Notifications Tab ─────────────────────────────────────────────────────────

type NotifRecord = {
  id: string;
  title: string;
  message: string;
  audience: string;
  sentAt: string;
  deliveredTo: number;
};

const INITIAL_HISTORY: NotifRecord[] = [
  {
    id: "n1",
    title: "June Meetup Reminder",
    message: "Don't forget — our monthly meetup is this Saturday, June 28. Register now to secure your spot!",
    audience: "All Members",
    sentAt: "2026-06-14T10:00:00",
    deliveredTo: 248,
  },
  {
    id: "n2",
    title: "Hackathon Registration Open",
    message: "Registration is now open for our Build for Good hackathon on July 19. Teams of up to 4. Apply by July 12.",
    audience: "All Members",
    sentAt: "2026-06-10T09:00:00",
    deliveredTo: 248,
  },
];

const QUICK_TEMPLATES = [
  { label: "Event Reminder", title: "Event Reminder", message: "Don't forget about our upcoming event this week. Check the Events page for details." },
  { label: "New Chapter", title: "New Chapter Launched!", message: "We've launched a new chapter. Head over to the Chapters page to learn more and join." },
  { label: "Announcement", title: "Community Announcement", message: "We have an important update for all members. Please read below." },
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function NotificationsTab() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All Members");
  const [history, setHistory] = useState<NotifRecord[]>(INITIAL_HISTORY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function applyTemplate(t: typeof QUICK_TEMPLATES[0]) {
    setTitle(t.title);
    setMessage(t.message);
  }

  function handleSend() {
    if (!title.trim() || !message.trim()) return;
    setSending(true);
    setTimeout(() => {
      const newRecord: NotifRecord = {
        id: `n${Date.now()}`,
        title: title.trim(),
        message: message.trim(),
        audience,
        sentAt: new Date().toISOString(),
        deliveredTo: 248,
      };
      setHistory((prev) => [newRecord, ...prev]);
      setTitle("");
      setMessage("");
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 2000);
    }, 800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Compose */}
      <div>
        <div className="mb-4 flex items-center gap-2.5">
          <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
          <h2 className="text-[15px] font-bold text-foreground">Compose Notification</h2>
        </div>

        {/* Quick templates */}
        <div className="mb-4">
          <p className="mb-2 text-[11px] font-medium text-foreground/60">Quick templates</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TEMPLATES.map((t) => (
              <button
                key={t.label}
                onClick={() => applyTemplate(t)}
                className="rounded-full border border-border px-3 py-1 text-[12px] font-medium text-foreground/60 transition-colors hover:border-[#F62C7D]/30 hover:bg-[#F62C7D]/5 hover:text-[#F62C7D]"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title"
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Message *</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Your message to the community…"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] outline-none focus:border-[#F62C7D]/50 resize-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Audience</label>
            <select value={audience} onChange={(e) => setAudience(e.target.value)}
              className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[#F62C7D]/50">
              <option>All Members</option>
              <option>Leaders & Moderators</option>
              <option>Web Development Chapter</option>
              <option>Design Chapter</option>
              <option>Mobile Chapter</option>
              <option>Data & AI Chapter</option>
              <option>DevOps & Cloud Chapter</option>
              <option>Product & Startup Chapter</option>
            </select>
          </div>

          {/* Preview */}
          {(title || message) && (
            <div className="rounded-xl border border-border bg-foreground/3 p-4">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/55">Preview</p>
              {title && <p className="text-[13px] font-bold text-foreground">{title}</p>}
              {message && <p className="mt-1 text-[12px] leading-relaxed text-foreground/60">{message}</p>}
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={!title.trim() || !message.trim() || sending}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold text-white transition-all disabled:opacity-40",
              sent ? "bg-emerald-500" : "bg-[#F62C7D] hover:opacity-90",
            )}
          >
            {sent ? (
              <><CheckCircle2 className="size-4" /> Sent!</>
            ) : sending ? (
              <><Bell className="size-4 animate-pulse" /> Sending…</>
            ) : (
              <><Send className="size-3.5" /> Send Notification</>
            )}
          </button>
        </div>
      </div>

      {/* History */}
      <div>
        <div className="mb-4 flex items-center gap-2.5">
          <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
          <h2 className="text-[15px] font-bold text-foreground">Sent History</h2>
        </div>
        <div className="space-y-2">
          {history.map((n) => (
            <div key={n.id} className="rounded-xl border border-border bg-card p-4">
              <div className="mb-1 flex items-start justify-between gap-2">
                <p className="text-[13px] font-semibold text-foreground">{n.title}</p>
                <p className="shrink-0 text-[11px] text-foreground/60">{fmtDate(n.sentAt)}</p>
              </div>
              <p className="mb-2 text-[12px] text-foreground/50 leading-relaxed line-clamp-2">{n.message}</p>
              <div className="flex items-center gap-3 text-[11px] text-foreground/60">
                <span className="flex items-center gap-1">
                  <Bell className="size-3" /> {n.audience}
                </span>
                <span>·</span>
                <span>{n.deliveredTo.toLocaleString()} delivered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function CommunitySettings() {
  const [tab, setTab] = useState<Tab>("General");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-[22px] font-bold text-foreground">Settings</h1>
        <p className="text-[13px] text-foreground/50">Community profile and notification settings</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 border-b border-border px-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3.5 text-[13px] font-medium border-b-2 transition-colors",
              tab === t
                ? "border-[#F62C7D] text-[#F62C7D]"
                : "border-transparent text-foreground/50 hover:text-foreground",
            )}
          >
            {t === "General" ? <Settings className="size-3.5" /> : <Bell className="size-3.5" />}
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 px-6 py-6">
        {tab === "General" ? <GeneralTab /> : <NotificationsTab />}
      </div>
    </div>
  );
}
