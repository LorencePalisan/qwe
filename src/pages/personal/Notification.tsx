import { useState } from "react";
import { Heart, MessageSquare, Repeat, Users, Bell, Star, Zap, Trash2 } from "@/icons";
import { cn } from "@/lib/utils";
import { SOCIAL_NOTIFICATIONS } from "@/lib/mock/personal";

// ── Helpers ───────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  like:     { icon: Heart,         color: "text-[#F62C7D]", bg: "bg-[#F62C7D]/15" },
  comment:  { icon: MessageSquare, color: "text-sky-400",   bg: "bg-sky-400/15" },
  repost:   { icon: Repeat,        color: "text-emerald-400", bg: "bg-emerald-400/15" },
  connect:  { icon: Users,         color: "text-violet-400", bg: "bg-violet-400/15" },
  follow:   { icon: Users,         color: "text-violet-400", bg: "bg-violet-400/15" },
  event:    { icon: Star,          color: "text-amber-400",  bg: "bg-amber-400/15" },
  promo:    { icon: Zap,           color: "text-orange-400", bg: "bg-orange-400/15" },
};

// ── Notification Item ─────────────────────────────────────────────────────────

function NotifItem({
  notif,
  onDismiss,
  onAccept,
}: {
  notif: typeof SOCIAL_NOTIFICATIONS[0];
  onDismiss: (id: string) => void;
  onAccept?: (id: string) => void;
}) {
  const cfg = TYPE_CONFIG[notif.type] ?? { icon: Bell, color: "text-foreground/50", bg: "bg-foreground/10" };
  const Icon = cfg.icon;

  return (
    <div className={cn(
      "flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-foreground/[0.03]",
      !notif.read && "bg-[#F62C7D]/[0.03]",
    )}>
      {/* Avatar stack with type icon */}
      <div className="relative shrink-0">
        <img src={notif.avatar} alt={notif.name} className="size-11 rounded-full object-cover ring-1 ring-border" />
        <div className={cn("absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full border-2 border-background", cfg.bg)}>
          <Icon className={cn("size-2.5", cfg.color)} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-foreground/90 leading-snug">
          <span className="font-bold text-foreground">{notif.name}</span>{" "}
          {notif.action}
        </p>
        {notif.postPreview && (
          <p className="mt-0.5 text-[12px] text-foreground/60 line-clamp-1">{notif.postPreview}</p>
        )}
        <p className="mt-1 text-[11px] text-foreground/55">{notif.time}</p>

        {/* Accept/Decline for connection requests */}
        {notif.type === "connect" && (
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onAccept?.(notif.id)}
              className="rounded-full bg-[#F62C7D] px-4 py-1.5 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
            >
              Accept
            </button>
            <button
              onClick={() => onDismiss(notif.id)}
              className="rounded-full border border-border px-4 py-1.5 text-[12px] font-medium text-foreground/60 transition-colors hover:bg-foreground/8"
            >
              Decline
            </button>
          </div>
        )}
      </div>

      {/* Unread dot + dismiss */}
      <div className="flex shrink-0 flex-col items-center gap-2 pt-0.5">
        {!notif.read && (
          <div className="size-2 rounded-full bg-[#F62C7D]" />
        )}
        {notif.type !== "connect" && (
          <button
            onClick={() => onDismiss(notif.id)}
            className="text-foreground/45 transition-colors hover:text-foreground/50"
          >
            <Trash2 className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

type Tab = "All" | "Mentions" | "Requests";

export default function PersonalNotification() {
  const [notifs, setNotifs]   = useState(SOCIAL_NOTIFICATIONS);
  const [tab, setTab]         = useState<Tab>("All");

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = notifs.filter((n) => {
    if (tab === "Mentions")  return n.type === "comment";
    if (tab === "Requests")  return n.type === "connect";
    return true;
  });

  function dismiss(id: string) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }

  function accept(id: string) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[600px] xl:border-x xl:border-border xl:min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-[17px] font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F62C7D] px-1.5 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70">
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-border">
          {(["All", "Mentions", "Requests"] as Tab[]).map((t) => {
            const count = t === "All" ? notifs.length
              : t === "Mentions" ? notifs.filter((n) => n.type === "comment").length
              : notifs.filter((n) => n.type === "connect").length;
            return (
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
                {count > 0 && (
                  <span className={cn(
                    "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    tab === t ? "bg-[#F62C7D]/15 text-[#F62C7D]" : "bg-foreground/10 text-foreground/60",
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2">
            <Bell className="size-10 text-foreground/15" />
            <p className="text-[15px] font-semibold text-foreground/55">No notifications</p>
            <p className="text-[13px] text-foreground/45">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((n) => (
              <NotifItem
                key={n.id}
                notif={n}
                onDismiss={dismiss}
                onAccept={accept}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
