import { useState } from "react";
import { Mail, ChevronDown, ChevronUp, X, Send } from "@/icons";
import { cn } from "@/lib/utils";
import { COMMUNITY_ENQUIRIES, type CommunityEnquiry } from "@/lib/mock/community";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

const STATUS_CONFIG: Record<CommunityEnquiry["status"], { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  read:    { label: "Read",    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  replied: { label: "Replied", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  closed:  { label: "Closed",  color: "bg-foreground/8 text-foreground/50" },
};

// ── Reply Modal ───────────────────────────────────────────────────────────────

function ReplyModal({
  enquiry, onClose, onSend,
}: {
  enquiry: CommunityEnquiry;
  onClose: () => void;
  onSend: (reply: string) => void;
}) {
  const [reply, setReply] = useState("");

  function handleSend() {
    if (!reply.trim()) return;
    onSend(reply.trim());
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-[15px] font-bold text-foreground">Reply to {enquiry.fromName}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>
        <div className="px-5 py-4 space-y-3">
          <div className="rounded-xl border border-border bg-foreground/3 px-4 py-3">
            <p className="mb-1 text-[11px] font-medium text-foreground/60">Original message</p>
            <p className="text-[13px] text-foreground/70 leading-relaxed">{enquiry.message}</p>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-foreground/60">Your Reply</label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder="Type your reply…"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] outline-none focus:border-[#F62C7D]/50 resize-none"
            />
          </div>
        </div>
        <div className="flex gap-2.5 border-t border-border px-5 py-4">
          <button onClick={onClose} className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground hover:bg-foreground/5">
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F62C7D] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            disabled={!reply.trim()}
          >
            <Send className="size-3.5" /> Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Inquiry Card ──────────────────────────────────────────────────────────────

function InquiryCard({
  enquiry, onMarkRead, onReply, onClose: onCloseEnquiry,
}: {
  enquiry: CommunityEnquiry;
  onMarkRead: (id: string) => void;
  onReply: (e: CommunityEnquiry) => void;
  onClose: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[enquiry.status];

  function toggle() {
    if (!expanded && enquiry.status === "pending") onMarkRead(enquiry.id);
    setExpanded((p) => !p);
  }

  return (
    <div className={cn(
      "rounded-2xl border bg-card transition-all",
      enquiry.status === "pending" ? "border-[#F62C7D]/30" : "border-border",
    )}>
      <button onClick={toggle} className="flex w-full items-start gap-3 p-4 text-left">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/10 mt-0.5">
          <Mail className="size-4 text-[#F62C7D]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <p className="text-[13px] font-semibold text-foreground truncate">{enquiry.subject}</p>
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", cfg.color)}>{cfg.label}</span>
          </div>
          <p className="text-[12px] text-foreground/50">From {enquiry.fromName} · {fmtDateTime(enquiry.createdAt)}</p>
        </div>
        <div className="shrink-0 ml-1 mt-0.5 text-foreground/55">
          {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-5 pb-4 pt-3 space-y-3">
          <p className="text-[13px] leading-relaxed text-foreground/70">{enquiry.message}</p>

          {enquiry.reply && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700/30 px-4 py-3">
              <p className="mb-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Your Reply · {enquiry.repliedAt ? fmtDateTime(enquiry.repliedAt) : ""}</p>
              <p className="text-[13px] text-emerald-800 dark:text-emerald-300 leading-relaxed">{enquiry.reply}</p>
            </div>
          )}

          {enquiry.status !== "closed" && (
            <div className="flex gap-2 pt-1">
              {enquiry.status !== "replied" && (
                <button
                  onClick={() => onReply(enquiry)}
                  className="flex items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Send className="size-3" /> Reply
                </button>
              )}
              <button
                onClick={() => onCloseEnquiry(enquiry.id)}
                className="rounded-xl border border-border px-4 py-2 text-[12px] font-medium text-foreground/60 transition-colors hover:bg-foreground/5"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const STATUS_TABS = ["All", "Pending", "Read", "Replied", "Closed"] as const;

export default function CommunityInquiries() {
  const [enquiries, setEnquiries] = useState(COMMUNITY_ENQUIRIES);
  const [tab, setTab] = useState<typeof STATUS_TABS[number]>("All");
  const [replyTarget, setReplyTarget] = useState<CommunityEnquiry | null>(null);

  const pendingCount = enquiries.filter((e) => e.status === "pending").length;

  const filtered = enquiries.filter((e) =>
    tab === "All" ? true : e.status === tab.toLowerCase(),
  );

  function markRead(id: string) {
    setEnquiries((prev) => prev.map((e) => e.id === id && e.status === "pending" ? { ...e, status: "read" } : e));
  }

  function sendReply(reply: string) {
    if (!replyTarget) return;
    setEnquiries((prev) => prev.map((e) =>
      e.id === replyTarget.id
        ? { ...e, status: "replied", reply, repliedAt: new Date().toISOString() }
        : e,
    ));
  }

  function closeEnquiry(id: string) {
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: "closed" } : e));
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] font-bold text-foreground">Inquiries</h1>
              {pendingCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F62C7D] px-1.5 text-[10px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
            </div>
            <p className="text-[13px] text-foreground/50">Messages from community visitors</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 space-y-3">
        {/* Tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_TABS.map((t) => {
            const count = t === "All" ? enquiries.length : enquiries.filter((e) => e.status === t.toLowerCase()).length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  tab === t ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "text-foreground/50 hover:bg-foreground/8",
                )}
              >
                {t} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Mail className="size-8 text-foreground/45 mb-2" />
            <p className="text-[13px] text-foreground/60">No inquiries in this category</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((e) => (
              <InquiryCard
                key={e.id}
                enquiry={e}
                onMarkRead={markRead}
                onReply={setReplyTarget}
                onClose={closeEnquiry}
              />
            ))}
          </div>
        )}
      </div>

      {replyTarget && (
        <ReplyModal
          enquiry={replyTarget}
          onClose={() => setReplyTarget(null)}
          onSend={sendReply}
        />
      )}
    </div>
  );
}
