import { useState, useRef, useEffect } from "react";
import { MessageSquare, Hash, Lock, Send } from "@/icons";
import { cn } from "@/lib/utils";
import { CHAT_ROOMS, CHAT_MESSAGES, type ChatMessage } from "@/lib/mock/community";

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Avatar colors ─────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-violet-500", "bg-sky-500", "bg-emerald-500", "bg-amber-500",
  "bg-pink-500", "bg-teal-500", "bg-orange-500", "bg-indigo-500",
];
function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

// ── Message Bubble ────────────────────────────────────────────────────────────

function MessageBubble({ msg, isFirst }: { msg: ChatMessage; isFirst: boolean }) {
  return (
    <div className="flex gap-3 px-4 py-1.5">
      {isFirst ? (
        <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white mt-0.5", avatarColor(msg.senderName))}>
          {initials(msg.senderName)}
        </div>
      ) : (
        <div className="size-8 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        {isFirst && (
          <div className="mb-0.5 flex items-baseline gap-2">
            <span className="text-[13px] font-semibold text-foreground">{msg.senderName}</span>
            <span className="text-[11px] text-foreground/60">{fmtTime(msg.sentAt)}</span>
          </div>
        )}
        <p className="text-[13px] leading-relaxed text-foreground/80">{msg.content}</p>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const ME_ID = "me";
const ME_NAME = "You";

export default function CommunityMessageBoard() {
  const [selectedRoomId, setSelectedRoomId] = useState(CHAT_ROOMS[0]?.id ?? "");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({ ...CHAT_MESSAGES });
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectedRoom = CHAT_ROOMS.find((r) => r.id === selectedRoomId);
  const roomMessages = messages[selectedRoomId] ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages.length, selectedRoomId]);

  function sendMessage() {
    const content = draft.trim();
    if (!content) return;
    const newMsg: ChatMessage = {
      id: `msg${Date.now()}`,
      senderId: ME_ID,
      senderName: ME_NAME,
      content,
      sentAt: new Date().toISOString(),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedRoomId]: [...(prev[selectedRoomId] ?? []), newMsg],
    }));
    setDraft("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-[22px] font-bold text-foreground">Message Board</h1>
        <p className="text-[13px] text-foreground/50">Community chat rooms</p>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — room list */}
        <div className="w-60 shrink-0 border-r border-border flex flex-col overflow-y-auto">
          <div className="px-3 py-3">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/60">Channels</p>
          </div>
          {CHAT_ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoomId(room.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-xl mx-2 px-3 py-2.5 text-left transition-colors",
                selectedRoomId === room.id
                  ? "bg-[#F62C7D]/10 text-[#F62C7D]"
                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground",
              )}
              style={{ width: "calc(100% - 16px)" }}
            >
              {room.privacy === "private"
                ? <Lock className="size-3.5 shrink-0" />
                : <Hash className="size-3.5 shrink-0" />
              }
              <div className="flex-1 min-w-0">
                <p className="truncate text-[13px] font-medium">{room.name.replace("#", "")}</p>
              </div>
              <span className="text-[10px] shrink-0 opacity-60">{timeAgo(room.lastActivity)}</span>
            </button>
          ))}
        </div>

        {/* Right — chat area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {selectedRoom ? (
            <>
              {/* Room header */}
              <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
                <div className="flex items-center gap-1.5">
                  {selectedRoom.privacy === "private"
                    ? <Lock className="size-4 text-foreground/60" />
                    : <Hash className="size-4 text-foreground/60" />
                  }
                  <p className="text-[15px] font-semibold text-foreground">{selectedRoom.name.replace("#", "")}</p>
                </div>
                <div className="h-4 w-px bg-border" />
                <p className="text-[12px] text-foreground/60">{selectedRoom.description}</p>
                <div className="ml-auto flex items-center gap-1 text-[12px] text-foreground/60">
                  <MessageSquare className="size-3.5" />
                  <span>{selectedRoom.memberCount} members</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-3">
                {roomMessages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2">
                    <MessageSquare className="size-8 text-foreground/45" />
                    <p className="text-[13px] text-foreground/60">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  <>
                    {roomMessages.map((msg, i) => {
                      const isFirst = i === 0 || roomMessages[i - 1].senderId !== msg.senderId;
                      return <MessageBubble key={msg.id} msg={msg} isFirst={isFirst} />;
                    })}
                    <div ref={bottomRef} />
                  </>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-border px-4 py-3">
                <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
                  <textarea
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message ${selectedRoom.name}`}
                    rows={1}
                    className="flex-1 resize-none bg-transparent text-[13px] text-foreground outline-none placeholder:text-foreground/55"
                    style={{ minHeight: "20px", maxHeight: "120px" }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!draft.trim()}
                    className="shrink-0 rounded-lg bg-[#F62C7D] p-1.5 text-white transition-opacity hover:opacity-90 disabled:opacity-30"
                  >
                    <Send className="size-3.5" />
                  </button>
                </div>
                <p className="mt-1.5 text-[11px] text-foreground/55">Enter to send · Shift+Enter for new line</p>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-[13px] text-foreground/60">Select a channel to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
