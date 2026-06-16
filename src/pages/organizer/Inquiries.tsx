import { useState } from "react";
import { ChevronDown, Mail, Phone, Send } from "@/icons";
import { ORGANIZER_INQUIRIES, type OrganizerInquiry } from "@/lib/mock/organizer";
import { cn } from "@/lib/utils";

const TABS = ["All", "New", "Replied", "Quoted", "Booked", "Declined"] as const;

const STATUS_COLOR: Record<string, string> = {
  New:      "bg-[#F62C7D]/15 text-[#F62C7D]",
  Replied:  "bg-blue-500/15 text-blue-400",
  Quoted:   "bg-amber-500/15 text-amber-400",
  Booked:   "bg-emerald-500/15 text-emerald-400",
  Declined: "bg-foreground/10 text-foreground/60",
};

function ReplyModal({ inquiry, onClose }: { inquiry: OrganizerInquiry; onClose: () => void }) {
  const [body, setBody] = useState(
    `Hi ${inquiry.from.split(" ")[0]},\n\nThank you for reaching out! We'd love to help with your ${inquiry.eventType.toLowerCase()} event.\n\nLet me know a good time to connect.\n\nBest regards,\nYour Organizer`
  );
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-sidebar p-6">
        <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-foreground/60">Reply to</div>
        <p className="mb-4 text-[15px] font-semibold text-foreground">{inquiry.from} — {inquiry.email}</p>
        <div className="mb-3 rounded-xl bg-foreground/5 p-3 text-[12px] text-foreground/50 italic leading-relaxed">
          "{inquiry.message}"
        </div>
        <textarea
          className="mb-4 h-36 w-full resize-none rounded-[10px] border border-border bg-card px-4 py-3 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/15"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="h-[44px] flex-1 rounded-full border border-border text-[14px] text-foreground/70 hover:bg-foreground/8">Cancel</button>
          <button
            onClick={handleSend}
            disabled={sent}
            className="flex h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[#F62C7D] text-[14px] font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {sent ? "Sent!" : <><Send className="size-4" /> Send Reply</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrganizerInquiries() {
  const [inquiries, setInquiries] = useState(ORGANIZER_INQUIRIES);
  const [tab, setTab]             = useState<typeof TABS[number]>("All");
  const [expanded, setExpanded]   = useState<string | null>(null);
  const [replyTo, setReplyTo]     = useState<OrganizerInquiry | null>(null);

  const filtered = inquiries.filter((i) => tab === "All" || i.status === tab);

  const markStatus = (id: string, status: OrganizerInquiry["status"]) => {
    setInquiries((p) => p.map((i) => i.id === id ? { ...i, status } : i));
  };

  const newCount = inquiries.filter((i) => i.status === "New").length;

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-foreground">Inquiries</h1>
          <p className="text-[14px] text-foreground/50">{inquiries.length} total · {newCount} new</p>
        </div>
        {newCount > 0 && (
          <span className="flex size-7 items-center justify-center rounded-full bg-[#F62C7D] text-[12px] font-bold text-white">{newCount}</span>
        )}
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors", tab === t ? "bg-[#F62C7D]/10 text-[#F62C7D]" : "bg-foreground/6 text-foreground/50 hover:text-foreground")}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 xl:max-w-3xl">
        {filtered.map((inq) => {
          const open = expanded === inq.id;
          return (
            <div key={inq.id} className={cn("rounded-[14px] border bg-card transition-all", open ? "border-[#F62C7D]/30" : "border-border")}>
              <button
                className="flex w-full items-center gap-4 p-4 text-left"
                onClick={() => {
                  setExpanded(open ? null : inq.id);
                  if (inq.status === "New") markStatus(inq.id, "Replied");
                }}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/15 text-[13px] font-bold text-[#F62C7D]">
                  {inq.from.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[14px] font-semibold text-foreground">{inq.from}</p>
                    {inq.company && <span className="shrink-0 text-[12px] text-foreground/60">· {inq.company}</span>}
                  </div>
                  <p className="truncate text-[12px] text-foreground/50">{inq.eventType} · {inq.budget} · {inq.receivedAt}</p>
                </div>
                <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium", STATUS_COLOR[inq.status])}>{inq.status}</span>
                <ChevronDown className={cn("ml-1 size-4 shrink-0 text-foreground/60 transition-transform", open && "rotate-180")} />
              </button>

              {open && (
                <div className="border-t border-border px-4 pb-5 pt-4">
                  <div className="mb-4 grid grid-cols-2 gap-3 text-[13px] sm:grid-cols-3">
                    <div><p className="text-[11px] text-foreground/60 uppercase tracking-wide mb-0.5">Event Type</p><p className="text-foreground">{inq.eventType}</p></div>
                    <div><p className="text-[11px] text-foreground/60 uppercase tracking-wide mb-0.5">Preferred Date</p><p className="text-foreground">{inq.date}</p></div>
                    <div><p className="text-[11px] text-foreground/60 uppercase tracking-wide mb-0.5">Guests</p><p className="text-foreground">{inq.guestCount}</p></div>
                    <div><p className="text-[11px] text-foreground/60 uppercase tracking-wide mb-0.5">Budget</p><p className="text-foreground">{inq.budget}</p></div>
                    <div className="flex items-center gap-1.5 text-foreground/60">
                      <Mail className="size-3.5 shrink-0" /><span className="text-[12px]">{inq.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground/60">
                      <Phone className="size-3.5 shrink-0" /><span className="text-[12px]">{inq.phone}</span>
                    </div>
                  </div>
                  <div className="mb-4 rounded-xl bg-foreground/5 p-3 text-[13px] text-foreground/70 leading-relaxed">
                    {inq.message}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setReplyTo(inq)} className="flex h-[36px] items-center gap-1.5 rounded-full bg-[#F62C7D] px-4 text-[12px] font-semibold text-white hover:opacity-90">
                      <Send className="size-3.5" /> Reply
                    </button>
                    {inq.status !== "Booked" && (
                      <button onClick={() => markStatus(inq.id, "Booked")} className="h-[36px] rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 text-[12px] font-medium text-emerald-400 hover:bg-emerald-500/20">
                        Mark as Booked
                      </button>
                    )}
                    {inq.status !== "Quoted" && (
                      <button onClick={() => markStatus(inq.id, "Quoted")} className="h-[36px] rounded-full border border-amber-500/30 bg-amber-500/10 px-4 text-[12px] font-medium text-amber-400 hover:bg-amber-500/20">
                        Mark as Quoted
                      </button>
                    )}
                    {inq.status !== "Declined" && (
                      <button onClick={() => markStatus(inq.id, "Declined")} className="h-[36px] rounded-full border border-red-500/20 bg-red-500/8 px-4 text-[12px] font-medium text-red-400 hover:bg-red-500/15">
                        Decline
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-[14px] text-foreground/60">No inquiries found.</div>
        )}
      </div>

      {replyTo && <ReplyModal inquiry={replyTo} onClose={() => setReplyTo(null)} />}
    </div>
  );
}
