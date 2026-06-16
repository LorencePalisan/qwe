import { useNavigate } from "react-router-dom";
import {
  Users, BookOpen, Calendar, MessageSquare, Globe2, Clock,
  Mail, Settings, Hash, TrendingUp,
} from "@/icons";
import { cn } from "@/lib/utils";
import {
  COMMUNITY_DASHBOARD, COMMUNITY_CHAPTERS, CHAT_ROOMS,
} from "@/lib/mock/community";

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label, value, icon: Icon, color,
}: {
  label: string; value: number; icon: React.ElementType; color: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex size-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18` }}>
        <Icon className="size-4" style={{ color }} />
      </div>
      <p className="text-[26px] font-bold text-foreground">{value.toLocaleString()}</p>
      <p className="mt-0.5 text-[12px] text-foreground/50">{label}</p>
    </div>
  );
}

// ── Category color ────────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Creative:    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Business:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

// ── timeAgo helper ────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Quick Link ────────────────────────────────────────────────────────────────

function QuickLink({
  label, href, icon: Icon, color,
}: {
  label: string; href: string; icon: React.ElementType; color: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(href)}
      className="flex flex-col items-center gap-2 transition-all hover:-translate-y-0.5"
    >
      <div className="flex size-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}18` }}>
        <Icon className="size-6" style={{ color }} />
      </div>
      <span className="text-[11px] font-medium text-foreground/60">{label}</span>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Members",  href: "/community/members",       icon: Users,         color: "#7c3aed" },
  { label: "Chapters", href: "/community/chapters",      icon: BookOpen,      color: "#0ea5e9" },
  { label: "Events",   href: "/community/events",        icon: Calendar,      color: "#16a34a" },
  { label: "Chat",     href: "/community/message-board", icon: MessageSquare, color: "#f97316" },
  { label: "Directory",href: "/community/directory",     icon: Globe2,        color: "#8b5cf6" },
  { label: "History",  href: "/community/history",       icon: Clock,         color: "#06b6d4" },
  { label: "Inquiries",href: "/community/inquiries",     icon: Mail,          color: "#F62C7D" },
  { label: "Settings", href: "/community/settings",      icon: Settings,      color: "#64748b" },
];

export default function CommunityHome() {
  const navigate = useNavigate();
  const { communityName, whodiniId, metrics } = COMMUNITY_DASHBOARD;

  return (
    <div className="pb-16">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#7c3aed]/8 via-background to-[#06b6d4]/8 px-6 py-8">
        <div className="absolute -right-16 -top-16 size-64 rounded-full bg-[#7c3aed]/5 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4]">
              <Users className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-foreground">{communityName}</h1>
              <p className="text-[11px] text-foreground/60">{whodiniId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          <StatCard label="Members"  value={metrics.totalMembers}  icon={Users}       color="#7c3aed" />
          <StatCard label="Chapters" value={metrics.totalChapters} icon={BookOpen}    color="#0ea5e9" />
          <StatCard label="Events"   value={metrics.totalEvents}   icon={TrendingUp}  color="#16a34a" />
        </div>

        {/* ── Quick Links ────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
            <h2 className="text-[17px] font-bold text-foreground">Quick Access</h2>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {QUICK_LINKS.map((l) => <QuickLink key={l.href} {...l} />)}
          </div>
        </section>

        {/* ── Chapters ──────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
              <h2 className="text-[17px] font-bold text-foreground">Chapters</h2>
            </div>
            <button
              onClick={() => navigate("/community/chapters")}
              className="text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70"
            >
              See all →
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY_CHAPTERS.slice(0, 6).map((ch) => (
              <button
                key={ch.id}
                onClick={() => navigate("/community/chapters")}
                className="rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#F62C7D]/20 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-[14px] font-semibold text-foreground">{ch.name}</p>
                  <span className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                    CATEGORY_COLOR[ch.category] ?? "bg-foreground/8 text-foreground/50",
                  )}>
                    {ch.category}
                  </span>
                </div>
                <p className="mb-3 text-[12px] leading-relaxed text-foreground/50 line-clamp-2">{ch.description}</p>
                <div className="flex items-center gap-1 text-[11px] text-foreground/60">
                  <Users className="size-3" />
                  <span>{ch.memberCount} members</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Chat Rooms ────────────────────────────────────────────────── */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-[3px] rounded-full bg-[#F62C7D]" />
              <h2 className="text-[17px] font-bold text-foreground">Active Chat Rooms</h2>
            </div>
            <button
              onClick={() => navigate("/community/message-board")}
              className="text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-70"
            >
              Open chat →
            </button>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {CHAT_ROOMS.map((room, i) => (
              <button
                key={room.id}
                onClick={() => navigate("/community/message-board")}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-foreground/3",
                  i !== CHAT_ROOMS.length - 1 && "border-b border-border",
                )}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground/8">
                  <Hash className="size-3.5 text-foreground/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">{room.name}</p>
                  <p className="truncate text-[11px] text-foreground/60">{room.memberCount} members</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[11px] text-foreground/60">{timeAgo(room.lastActivity)}</p>
                  {room.privacy === "private" && (
                    <p className="mt-0.5 text-[10px] text-amber-500">Private</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
