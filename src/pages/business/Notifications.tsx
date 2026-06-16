import { useState } from "react";
import { Send, Bell, TrendingUp, Users, ChevronDown } from "@/icons";
import { NOTIFICATION_RECORDS, type NotificationRecord } from "@/lib/mock/business";

// ── Config ────────────────────────────────────────────────────────────────────

const TYPE_OPTIONS: { value: NotificationRecord["type"]; label: string }[] = [
  { value: "informational", label: "Informational" },
  { value: "promotional",   label: "Promotional" },
  { value: "urgent",        label: "Urgent" },
  { value: "event",         label: "Event" },
];

const TYPE_COLOR: Record<NotificationRecord["type"], string> = {
  informational: "#0ea5e9",
  promotional:   "#7c3aed",
  urgent:        "#ef4444",
  event:         "#f97316",
};

const AUDIENCE_OPTIONS = [
  { value: "all_subscribers" as const,  label: "All Subscribers" },
  { value: "new_subscribers" as const,  label: "New Subscribers" },
];

const PRESETS = [
  { label: "Event reminder", title: "Upcoming Event Reminder",         message: "Don't forget! Our event is coming up soon. Reserve your spot now." },
  { label: "New service",    title: "New Service Available",           message: "We've just launched a new service. Check it out and see how we can help." },
  { label: "Promo offer",    title: "Exclusive Offer for Subscribers", message: "As a valued subscriber, here's an exclusive offer just for you. Limited time only." },
  { label: "Thank you",      title: "Thank You for Your Support",      message: "We truly appreciate your continued support. It means the world to us." },
];

function pct(n: number, d: number) {
  if (!d) return "0%";
  return `${Math.round((n / d) * 100)}%`;
}

// ── History Card ──────────────────────────────────────────────────────────────

function HistoryCard({ rec }: { rec: NotificationRecord }) {
  const color = TYPE_COLOR[rec.type];
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-[13px] font-semibold text-foreground leading-tight">{rec.title}</p>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {rec.type}
        </span>
      </div>
      <p className="mb-3 text-[12px] text-foreground/55 leading-relaxed line-clamp-2">{rec.message}</p>

      <div className="flex items-center gap-4 border-t border-border pt-3">
        <div className="text-center">
          <p className="text-[15px] font-bold text-foreground">{rec.delivered}</p>
          <p className="text-[10px] text-foreground/60">Delivered</p>
        </div>
        <div className="text-center">
          <p className="text-[15px] font-bold" style={{ color: "#0ea5e9" }}>{pct(rec.opened, rec.delivered)}</p>
          <p className="text-[10px] text-foreground/60">Opened</p>
        </div>
        <div className="text-center">
          <p className="text-[15px] font-bold" style={{ color: "#7c3aed" }}>{pct(rec.clicked, rec.delivered)}</p>
          <p className="text-[10px] text-foreground/60">Clicked</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[11px] text-foreground/55">
            {new Date(rec.sentAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BusinessNotifications() {
  const [records, setRecords] = useState<NotificationRecord[]>(NOTIFICATION_RECORDS);
  const [title,    setTitle]    = useState("");
  const [message,  setMessage]  = useState("");
  const [type,     setType]     = useState<NotificationRecord["type"]>("informational");
  const [audience, setAudience] = useState<NotificationRecord["audience"]>("all_subscribers");
  const [sending,  setSending]  = useState(false);

  function applyPreset(p: (typeof PRESETS)[number]) {
    setTitle(p.title);
    setMessage(p.message);
  }

  function handleSend() {
    if (!title.trim() || !message.trim()) return;
    setSending(true);
    setTimeout(() => {
      setRecords((prev) => [{
        id: `notif${Date.now()}`,
        title: title.trim(),
        message: message.trim(),
        type,
        audience,
        delivered: 0,
        opened:    0,
        clicked:   0,
        sentAt: new Date().toISOString(),
      }, ...prev]);
      setTitle("");
      setMessage("");
      setSending(false);
    }, 800);
  }

  const avgOpenRate  = records.length ? Math.round(records.reduce((a, r) => a + (r.opened / (r.delivered || 1)), 0) / records.length * 100) : 0;
  const avgClickRate = records.length ? Math.round(records.reduce((a, r) => a + (r.clicked / (r.delivered || 1)), 0) / records.length * 100) : 0;
  const totalDelivered = records.reduce((a, r) => a + r.delivered, 0);

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-[22px] font-bold text-foreground">Notifications</h1>
        <p className="text-[13px] text-foreground/50">Compose and send mail blasts to your subscribers</p>
      </div>

      <div className="px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* ── Compose ── */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
              <h2 className="text-[16px] font-bold text-foreground">Compose</h2>
            </div>

            {/* Presets */}
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-foreground/60">Quick presets</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => applyPreset(p)}
                    className="rounded-full border border-border px-3 py-1.5 text-[12px] font-medium text-foreground/60 transition-colors hover:border-[#F62C7D]/40 hover:text-[#F62C7D]"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Subject / Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Early bird offer ends Friday!"
                className="h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                rows={5}
                placeholder="Write your notification message here…"
                className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
              />
              <p className="mt-1 text-right text-[11px] text-foreground/55">{message.length} / 500</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Type</label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as NotificationRecord["type"])}
                    className="h-[42px] w-full appearance-none rounded-xl border border-border bg-background pl-3 pr-8 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
                  >
                    {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Audience</label>
                <div className="relative">
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as NotificationRecord["audience"])}
                    className="h-[42px] w-full appearance-none rounded-xl border border-border bg-background pl-3 pr-8 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
                  >
                    {AUDIENCE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
                </div>
              </div>
            </div>

            {/* Preview */}
            {(title || message) && (
              <div className="rounded-xl border border-dashed border-border bg-foreground/2 p-4">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/55">Preview</p>
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/10">
                    <Bell className="size-3.5 text-[#F62C7D]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{title || "Your notification title"}</p>
                    <p className="mt-0.5 text-[12px] text-foreground/55">{message || "Your notification message"}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={!title.trim() || !message.trim() || sending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F62C7D] py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
            >
              <Send className="size-4" />
              {sending ? "Sending…" : "Send Notification"}
            </button>
          </div>

          {/* ── History ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
                <h2 className="text-[16px] font-bold text-foreground">Sent History</h2>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-foreground/60">
                <TrendingUp className="size-3.5" />
                <span>{records.length} blasts</span>
              </div>
            </div>

            {/* Aggregate */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Delivered", value: totalDelivered, icon: Users,       color: "#0ea5e9" },
                { label: "Avg Opens",  value: `${avgOpenRate}%`,  icon: Bell,      color: "#7c3aed" },
                { label: "Avg Clicks", value: `${avgClickRate}%`, icon: TrendingUp, color: "#F62C7D" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="rounded-xl border border-border bg-card p-3 text-center">
                  <Icon className="mx-auto mb-1 size-3.5" style={{ color }} />
                  <p className="text-[15px] font-bold text-foreground">{value}</p>
                  <p className="text-[10px] text-foreground/60">{label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {records.map((rec) => <HistoryCard key={rec.id} rec={rec} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
