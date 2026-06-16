import { useState } from "react";
import { ChevronDown, ChevronUp, Send, X, Mail } from "@/icons";
import { cn } from "@/lib/utils";
import { BUSINESS_ENQUIRIES, type BusinessEnquiry } from "@/lib/mock/business";

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending:  { label: "Pending",  className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  read:     { label: "Read",     className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  replied:  { label: "Replied",  className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  closed:   { label: "Closed",   className: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" },
};

type StatusTab = "all" | BusinessEnquiry["status"];

const TABS: { value: StatusTab; label: string }[] = [
  { value: "all",     label: "All" },
  { value: "pending", label: "Pending" },
  { value: "read",    label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "closed",  label: "Closed" },
];

// ── Reply Modal ───────────────────────────────────────────────────────────────

function ReplyModal({
  enquiry,
  onSend,
  onClose,
}: {
  enquiry: BusinessEnquiry;
  onSend: (id: string, reply: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-lg rounded-t-2xl border border-border bg-card p-5 shadow-2xl sm:rounded-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-bold text-foreground">Reply to {enquiry.fromName}</h3>
            <p className="text-[12px] text-foreground/50">{enquiry.subject}</p>
          </div>
          <button onClick={onClose} className="shrink-0 rounded-lg p-1 text-foreground/60 hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>

        {/* Original message */}
        <div className="mb-4 rounded-xl border border-border bg-foreground/3 px-4 py-3">
          <p className="text-[12px] text-foreground/55 italic">"{enquiry.message}"</p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Write your reply…"
          className="w-full resize-none rounded-xl border border-border bg-background p-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
        />

        <div className="mt-3 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground/60 hover:bg-foreground/5"
          >
            Cancel
          </button>
          <button
            onClick={() => { if (text.trim()) { onSend(enquiry.id, text.trim()); onClose(); } }}
            disabled={!text.trim()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F62C7D] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
          >
            <Send className="size-3.5" />
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Inquiry Card ──────────────────────────────────────────────────────────────

function InquiryCard({
  enq,
  onMarkRead,
  onReply,
  onClose,
}: {
  enq: BusinessEnquiry;
  onMarkRead: (id: string) => void;
  onReply: (enq: BusinessEnquiry) => void;
  onClose: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const stCfg = STATUS_CONFIG[enq.status];

  function toggle() {
    if (!expanded && enq.status === "pending") onMarkRead(enq.id);
    setExpanded((v) => !v);
  }

  return (
    <div className={cn("border-b border-border last:border-b-0", expanded && "bg-foreground/2")}>
      {/* Summary row */}
      <button
        onClick={toggle}
        className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-foreground/3"
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/10 mt-0.5">
          <Mail className="size-3.5 text-[#F62C7D]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className={cn("text-[13px] font-semibold text-foreground", enq.status === "pending" && "font-bold")}>
              {enq.subject}
            </p>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", stCfg.className)}>
              {stCfg.label}
            </span>
          </div>
          <p className="text-[11px] text-foreground/50">{enq.fromName} · {enq.fromEmail}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[11px] text-foreground/60">
            {new Date(enq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
          {expanded
            ? <ChevronUp className="ml-auto mt-1 size-3.5 text-foreground/60" />
            : <ChevronDown className="ml-auto mt-1 size-3.5 text-foreground/60" />
          }
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-[13px] text-foreground/75 leading-relaxed">{enq.message}</p>
          </div>

          {/* Existing reply */}
          {enq.reply && (
            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Your reply</p>
              <p className="text-[13px] text-foreground/75">{enq.reply}</p>
              {enq.repliedAt && (
                <p className="mt-1.5 text-[11px] text-foreground/55">
                  {new Date(enq.repliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          {enq.status !== "closed" && (
            <div className="mt-3 flex gap-2">
              {enq.status !== "replied" && (
                <button
                  onClick={() => onReply(enq)}
                  className="flex items-center gap-1.5 rounded-lg bg-[#F62C7D]/10 px-3 py-2 text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-80"
                >
                  <Send className="size-3" />
                  Reply
                </button>
              )}
              <button
                onClick={() => onClose(enq.id)}
                className="rounded-lg border border-border px-3 py-2 text-[12px] font-medium text-foreground/50 transition-colors hover:bg-foreground/5"
              >
                Close inquiry
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BusinessInquiries() {
  const [enquiries, setEnquiries] = useState<BusinessEnquiry[]>(BUSINESS_ENQUIRIES);
  const [tab, setTab]             = useState<StatusTab>("all");
  const [replyTarget, setReplyTarget] = useState<BusinessEnquiry | null>(null);

  function handleMarkRead(id: string) {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id && e.status === "pending" ? { ...e, status: "read" } : e)),
    );
  }

  function handleReply(id: string, reply: string) {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: "replied", reply, repliedAt: new Date().toISOString() } : e,
      ),
    );
  }

  function handleClose(id: string) {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "closed" } : e)),
    );
  }

  const filtered =
    tab === "all" ? enquiries : enquiries.filter((e) => e.status === tab);

  const pendingCount = enquiries.filter((e) => e.status === "pending").length;

  return (
    <>
      {replyTarget && (
        <ReplyModal
          enquiry={replyTarget}
          onSend={handleReply}
          onClose={() => setReplyTarget(null)}
        />
      )}

      <div className="pb-16">
        {/* Header */}
        <div className="border-b border-border bg-card/50 px-6 py-5">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold text-foreground">Inquiries</h1>
            {pendingCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#F62C7D] text-[10px] font-bold text-white">
                {pendingCount}
              </span>
            )}
          </div>
          <p className="text-[13px] text-foreground/50">Inbox for inbound messages from personal users</p>
        </div>

        <div className="px-4 py-6 sm:px-6">
          {/* Tabs */}
          <div className="mb-4 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-styled">
            {TABS.map(({ value, label }) => {
              const count = value === "all" ? enquiries.length : enquiries.filter((e) => e.status === value).length;
              return (
                <button
                  key={value}
                  onClick={() => setTab(value)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                    tab === value
                      ? "bg-[#F62C7D]/10 text-[#F62C7D]"
                      : "text-foreground/50 hover:bg-foreground/5",
                  )}
                >
                  {label}
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    tab === value ? "bg-[#F62C7D]/15 text-[#F62C7D]" : "bg-foreground/8 text-foreground/60",
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-[13px] text-foreground/60">No inquiries in this category.</p>
            ) : (
              filtered.map((enq) => (
                <InquiryCard
                  key={enq.id}
                  enq={enq}
                  onMarkRead={handleMarkRead}
                  onReply={setReplyTarget}
                  onClose={handleClose}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
