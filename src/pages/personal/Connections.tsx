import { useState, useRef, useEffect } from "react";
import { Search, X, Send, MessageSquare, UserPlus, ChevronLeft } from "@/icons";
import { cn } from "@/lib/utils";
import { CONNECTIONS } from "@/lib/mock/personal";

// ── Types ─────────────────────────────────────────────────────────────────────

type Connection = typeof CONNECTIONS[0];

// ── Helpers ───────────────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  Friends: "bg-blue-500/15 text-blue-400",
  Work:    "bg-violet-500/15 text-violet-400",
  School:  "bg-amber-500/15 text-amber-400",
  Family:  "bg-rose-500/15 text-rose-400",
};

const MUTUAL_COUNTS: Record<string, number> = {
  c1: 12, c2: 8, c3: 5, c4: 3, c5: 17, c6: 6, c7: 2, c8: 9,
};

// ── DM mock data ──────────────────────────────────────────────────────────────

type DMMessage = { id: string; text: string; mine: boolean; time: string };

const DM_THREADS: Record<string, DMMessage[]> = {
  c1: [
    { id: "1", text: "Hey! How's the project going?",        mine: false, time: "10:30 AM" },
    { id: "2", text: "Going great! Almost done with the UI.", mine: true,  time: "10:32 AM" },
    { id: "3", text: "Awesome, can't wait to see it.",        mine: false, time: "10:33 AM" },
    { id: "4", text: "I'll share a preview later today.",     mine: true,  time: "10:35 AM" },
  ],
  c2: [
    { id: "1", text: "Are you joining the meetup next week?", mine: false, time: "Yesterday" },
    { id: "2", text: "Yes! Already registered 🎉",            mine: true,  time: "Yesterday" },
  ],
  c3: [
    { id: "1", text: "Did you see the React 19 release?",     mine: false, time: "Mon" },
    { id: "2", text: "Yeah it's wild. The new hooks are 🔥",  mine: true,  time: "Mon" },
    { id: "3", text: "We should rebuild that project with it",mine: false, time: "Mon" },
  ],
};

const DM_PREVIEWS: Record<string, { text: string; time: string; unread: number }> = {
  c1: { text: "I'll share a preview later today.",     time: "10:35 AM", unread: 0 },
  c2: { text: "Yes! Already registered 🎉",            time: "Yesterday", unread: 1 },
  c3: { text: "We should rebuild that project with it",time: "Mon",      unread: 2 },
};

// ── Chat View ─────────────────────────────────────────────────────────────────

function DMView({ conn, onBack }: { conn: Connection; onBack: () => void }) {
  const [messages, setMessages] = useState<DMMessage[]>(DM_THREADS[conn.id] ?? []);
  const [draft, setDraft]       = useState("");
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: String(Date.now()), text, mine: true, time: "now" }]);
    setDraft("");
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 4rem)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex size-8 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/8 hover:text-foreground"
        >
          <ChevronLeft className="size-5" />
        </button>
        <img src={conn.avatar} alt={conn.name} className="size-9 rounded-full object-cover ring-1 ring-border" />
        <div>
          <p className="text-[14px] font-bold text-foreground">{conn.name}</p>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-emerald-400" />
            <p className="text-[11px] text-foreground/60">Active now</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 scrollbar-styled">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <img src={conn.avatar} alt={conn.name} className="size-16 rounded-full object-cover ring-2 ring-border" />
            <p className="text-[14px] font-bold text-foreground">{conn.name}</p>
            <p className="text-[12px] text-foreground/60">Say hi to start a conversation!</p>
          </div>
        ) : (
          messages.map((m, i) => {
            const isFirst = i === 0 || messages[i - 1].mine !== m.mine;
            return (
              <div key={m.id} className={cn("flex items-end gap-2", m.mine ? "justify-end" : "justify-start")}>
                {!m.mine && isFirst && (
                  <img src={conn.avatar} alt="" className="size-7 shrink-0 rounded-full object-cover mb-0.5" />
                )}
                {!m.mine && !isFirst && <div className="size-7 shrink-0" />}
                <div className={cn(
                  "max-w-[72%] rounded-2xl px-3.5 py-2.5",
                  m.mine
                    ? "rounded-br-md bg-[#F62C7D] text-white"
                    : "rounded-bl-md bg-card border border-border text-foreground",
                )}>
                  <p className="text-[13px] leading-relaxed">{m.text}</p>
                  <p className={cn("mt-0.5 text-[10px]", m.mine ? "text-white/50 text-right" : "text-foreground/55")}>{m.time}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background/80 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={`Message ${conn.name.split(" ")[0]}…`}
            className="flex-1 h-[42px] rounded-full border border-border bg-card px-4 text-[13px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/60 focus:outline-none transition-all"
          />
          <button
            onClick={send}
            disabled={!draft.trim()}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F62C7D] text-white shadow-[0_2px_8px_rgba(246,44,125,0.3)] transition-opacity hover:opacity-90 disabled:opacity-30"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Friend Request Card ───────────────────────────────────────────────────────

function RequestCard({
  conn, onAccept, onDecline,
}: { conn: Connection; onAccept: () => void; onDecline: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
      <img src={conn.avatar} alt={conn.name} className="size-12 shrink-0 rounded-full object-cover ring-2 ring-[#F62C7D]/30 ring-offset-2 ring-offset-background" />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-foreground">{conn.name}</p>
        <p className="text-[12px] text-foreground/60">{MUTUAL_COUNTS[conn.id] ?? 0} mutual connections</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="rounded-full bg-[#F62C7D] px-4 py-1.5 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          className="rounded-full border border-border px-4 py-1.5 text-[12px] font-medium text-foreground/60 transition-colors hover:bg-foreground/8"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

// ── People You May Know ───────────────────────────────────────────────────────

const SUGGESTIONS = [
  { id: "s1", name: "Carlos Mendez",  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80", mutual: 7  },
  { id: "s2", name: "Emma Wilson",    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80",    mutual: 4  },
  { id: "s3", name: "Kai Tanaka",     avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&q=80", mutual: 11 },
  { id: "s4", name: "Olivia Brown",   avatar: "https://images.unsplash.com/photo-1542596594-649edbc13630?w=120&q=80",    mutual: 2  },
];

function PeopleYouMayKnow() {
  const [added,     setAdded]     = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = SUGGESTIONS.filter((s) => !dismissed.has(s.id));
  if (visible.length === 0) return null;

  return (
    <div className="border-b border-border px-4 py-4">
      <p className="mb-3 text-[13px] font-bold text-foreground">People you may know</p>
      <div className="flex gap-3 overflow-x-auto scrollbar-styled pb-1">
        {visible.map((s) => (
          <div key={s.id} className="relative flex shrink-0 w-36 flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 pt-4">
            <button
              onClick={() => setDismissed((d) => new Set([...d, s.id]))}
              className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-foreground/8 text-foreground/60 text-[11px] leading-none transition-colors hover:bg-foreground/15 hover:text-foreground"
            >
              <X className="size-3" />
            </button>
            <img src={s.avatar} alt={s.name} className="size-14 rounded-full object-cover ring-2 ring-border ring-offset-2 ring-offset-card" />
            <div className="text-center">
              <p className="text-[12px] font-bold text-foreground leading-tight">{s.name}</p>
              <p className="mt-0.5 text-[10px] text-foreground/60">{s.mutual} mutual</p>
            </div>
            <button
              onClick={() => setAdded((a) => new Set([...a, s.id]))}
              className={cn(
                "flex w-full items-center justify-center gap-1.5 rounded-full py-1.5 text-[12px] font-bold transition-all",
                added.has(s.id)
                  ? "border border-border text-foreground/50"
                  : "bg-[#F62C7D]/10 text-[#F62C7D] hover:bg-[#F62C7D]/20",
              )}
            >
              {added.has(s.id) ? (
                "Requested"
              ) : (
                <><UserPlus className="size-3.5" /> Add</>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Friend Card (2-col grid) ──────────────────────────────────────────────────

function FriendCard({
  conn, onMessage, onRemove,
}: { conn: Connection; onMessage: () => void; onRemove: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-all hover:border-foreground/15 hover:shadow-md hover:shadow-black/5">
      <img src={conn.avatar} alt={conn.name} className="size-16 rounded-full object-cover ring-2 ring-border ring-offset-2 ring-offset-card" />
      <div className="w-full min-w-0">
        <p className="truncate text-[13px] font-bold text-foreground">{conn.name}</p>
        <p className="text-[11px] text-foreground/60">{MUTUAL_COUNTS[conn.id] ?? 0} mutual</p>
        {conn.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap justify-center gap-1">
            {conn.tags.map((tag) => (
              <span key={tag} className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", TAG_COLORS[tag] ?? "bg-foreground/8 text-foreground/50")}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full gap-1.5 mt-1">
        <button
          onClick={onMessage}
          className="flex flex-1 items-center justify-center gap-1 rounded-full bg-[#F62C7D]/10 py-1.5 text-[12px] font-bold text-[#F62C7D] transition-colors hover:bg-[#F62C7D]/20"
        >
          <MessageSquare className="size-3.5" /> Message
        </button>
        <button
          onClick={onRemove}
          className="rounded-full border border-border px-2.5 py-1.5 text-[11px] text-foreground/60 transition-colors hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Messages Inbox ────────────────────────────────────────────────────────────

function MessagesInbox({
  connections, onOpen,
}: { connections: Connection[]; onOpen: (conn: Connection) => void }) {
  const withDMs = connections.filter((c) => DM_PREVIEWS[c.id]);
  const totalUnread = Object.values(DM_PREVIEWS).reduce((sum, d) => sum + d.unread, 0);

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-bold text-foreground">Messages</p>
          {totalUnread > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F62C7D] px-1.5 text-[10px] font-bold text-white">
              {totalUnread}
            </span>
          )}
        </div>
        <button className="rounded-full bg-foreground/8 p-2 text-foreground/60 transition-colors hover:bg-foreground/15 hover:text-foreground">
          <MessageSquare className="size-4" />
        </button>
      </div>

      {withDMs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <MessageSquare className="size-10 text-foreground/15" />
          <p className="text-[14px] font-semibold text-foreground/55">No messages yet</p>
          <p className="text-[12px] text-foreground/45">Message a connection to get started</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {connections.map((conn) => {
            const preview = DM_PREVIEWS[conn.id];
            if (!preview) return null;
            return (
              <button
                key={conn.id}
                onClick={() => onOpen(conn)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-foreground/[0.03]"
              >
                <div className="relative shrink-0">
                  <img src={conn.avatar} alt={conn.name} className="size-12 rounded-full object-cover ring-1 ring-border" />
                  <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className={cn("text-[14px] text-foreground", preview.unread > 0 ? "font-bold" : "font-semibold")}>{conn.name}</p>
                    <p className="shrink-0 text-[11px] text-foreground/55">{preview.time}</p>
                  </div>
                  <p className={cn("truncate text-[13px]", preview.unread > 0 ? "font-medium text-foreground/80" : "text-foreground/60")}>
                    {preview.text}
                  </p>
                </div>
                {preview.unread > 0 && (
                  <div className="flex shrink-0 size-5 items-center justify-center rounded-full bg-[#F62C7D] text-[10px] font-bold text-white">
                    {preview.unread}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

type Tab = "Friends" | "Messages";

export default function PersonalConnections() {
  const [tab,          setTab]          = useState<Tab>("Friends");
  const [search,       setSearch]       = useState("");
  const [activeConn,   setActiveConn]   = useState<Connection | null>(null);
  const [connections,  setConnections]  = useState(CONNECTIONS);

  // Open DM
  if (activeConn) return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[600px] xl:border-x xl:border-border xl:min-h-screen">
        <DMView conn={activeConn} onBack={() => setActiveConn(null)} />
      </div>
    </div>
  );

  const accepted = connections.filter((c) => c.status === "accepted");
  const pending  = connections.filter((c) => c.status === "pending");

  const filteredAccepted = accepted.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  function acceptRequest(id: string) {
    setConnections((prev) => prev.map((c) => c.id === id ? { ...c, status: "accepted" } : c));
  }

  function declineRequest(id: string) {
    setConnections((prev) => prev.filter((c) => c.id !== id));
  }

  function removeConnection(id: string) {
    setConnections((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[600px] xl:border-x xl:border-border xl:min-h-screen">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h1 className="text-[17px] font-bold text-foreground">Connections</h1>
            {pending.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F62C7D] px-1.5 text-[10px] font-bold text-white">
                {pending.length}
              </span>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-border">
          {(["Friends", "Messages"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-3.5 text-[13px] font-semibold transition-colors border-b-2",
                tab === t
                  ? "border-[#F62C7D] text-[#F62C7D]"
                  : "border-transparent text-foreground/45 hover:text-foreground hover:bg-foreground/3",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Friends" && (
          <div>
            {/* Search */}
            <div className="px-4 py-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search friends…"
                  className="h-[38px] w-full rounded-full border border-border bg-foreground/5 pl-9 pr-4 text-[13px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/50 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Friend requests */}
            {pending.length > 0 && !search && (
              <div>
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-[13px] font-bold text-foreground">
                    Friend Requests
                    <span className="ml-2 rounded-full bg-[#F62C7D]/15 px-2 py-0.5 text-[11px] text-[#F62C7D]">{pending.length}</span>
                  </p>
                </div>
                {pending.map((c) => (
                  <RequestCard
                    key={c.id}
                    conn={c}
                    onAccept={() => acceptRequest(c.id)}
                    onDecline={() => declineRequest(c.id)}
                  />
                ))}
              </div>
            )}

            {/* People you may know */}
            {!search && <PeopleYouMayKnow />}

            {/* Friends grid */}
            <div className="px-4 py-4">
              <p className="mb-3 text-[13px] font-bold text-foreground">
                Friends <span className="text-foreground/60 font-normal">· {filteredAccepted.length}</span>
              </p>
              {filteredAccepted.length === 0 ? (
                <p className="py-8 text-center text-[13px] text-foreground/55">No friends found</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredAccepted.map((c) => (
                    <FriendCard
                      key={c.id}
                      conn={c}
                      onMessage={() => { setActiveConn(c); }}
                      onRemove={() => removeConnection(c.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "Messages" && (
          <MessagesInbox
            connections={accepted}
            onOpen={(conn) => setActiveConn(conn)}
          />
        )}
      </div>
    </div>
  );
}
