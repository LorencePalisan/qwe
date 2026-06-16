import { useState } from "react";
import { Search, Users, BadgeCheck, Lock, Hash, ChevronRight, MessageSquare } from "@/icons";
import { cn } from "@/lib/utils";
import { COMMUNITIES } from "@/lib/mock/personal";

const TAB = "flex-1 rounded-[8px] py-2 text-[13.6px] font-semibold transition-all";

const CATEGORIES = ["All", "Technology", "Wellness", "Sports", "Creative", "Business"];

const FORUM_ROOMS = [
  {
    id: "fr1",
    community: "AI & Machine Learning Hub",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    color: "#6366f1",
    members: 12400,
    rooms: [
      { name: "General",       unread: 3,  lastMsg: "See you at the meetup!" },
      { name: "Resources",     unread: 0,  lastMsg: "Great paper shared today" },
      { name: "Paper Reviews", unread: 7,  lastMsg: "Interesting take on LLMs" },
    ],
  },
  {
    id: "fr2",
    community: "Mindful Living Community",
    cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    color: "#10b981",
    members: 8700,
    rooms: [
      { name: "Mindfulness", unread: 1, lastMsg: "Morning yoga session?" },
      { name: "Yoga",        unread: 0, lastMsg: "Great stretch routine!" },
      { name: "Nutrition",   unread: 2, lastMsg: "Healthy meal prep ideas" },
    ],
  },
  {
    id: "fr3",
    community: "Startup Founders PH",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    color: "#f97316",
    members: 2100,
    rooms: [
      { name: "General", unread: 0, lastMsg: "New funding round update" },
      { name: "Funding",  unread: 4, lastMsg: "Series A tips?" },
      { name: "Jobs",     unread: 0, lastMsg: "Hiring a CTO — DM me" },
    ],
  },
];

const ENQUIRIES = [
  { id: "eq1", community: "Indie Artists Collective", subject: "Membership Application",    status: "pending", date: "Jun 10" },
  { id: "eq2", community: "Urban Runners Club",        subject: "Event Participation Query", status: "replied", date: "Jun 5"  },
];

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400",
  replied: "bg-emerald-500/15 text-emerald-400",
};

export default function PersonalCommunity() {
  const [activeTab, setActiveTab] = useState<"forums" | "discover" | "inquiries">("forums");
  const [category,  setCategory]  = useState("All");
  const [search,    setSearch]    = useState("");

  const filtered = COMMUNITIES.filter((c) =>
    (category === "All" || c.category === category) &&
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-[12px] font-medium uppercase tracking-wider text-foreground/60">Connect & Belong</p>
        <h1 className="text-[28px] font-bold text-foreground">Community</h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex rounded-[10px] border border-border bg-card p-1">
        {(["forums", "discover", "inquiries"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(TAB, activeTab === t ? "bg-[#F62C7D] text-white shadow-[0_2px_10px_rgba(246,44,125,0.3)]" : "text-foreground/60 hover:text-foreground")}
          >
            {t === "forums" ? "Forums" : t === "discover" ? "Discover" : "Inquiries"}
          </button>
        ))}
      </div>

      {/* ── Forums ── */}
      {activeTab === "forums" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FORUM_ROOMS.map((f) => (
            <div
              key={f.id}
              className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-foreground/15 hover:shadow-lg hover:shadow-black/5"
            >
              {/* Community header */}
              <div className="relative h-24 overflow-hidden">
                <img src={f.cover} alt={f.community} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                <div className="absolute inset-0 flex items-center gap-3 px-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold text-white shadow-lg"
                    style={{ backgroundColor: f.color }}
                  >
                    {f.community[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-white">{f.community}</p>
                    <div className="flex items-center gap-1 text-[11px] text-white/55">
                      <Users className="size-3" />
                      {f.members.toLocaleString()} members
                    </div>
                  </div>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex flex-col divide-y divide-border">
                {f.rooms.map((r) => (
                  <button
                    key={r.name}
                    className="flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-foreground/4"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-foreground/6">
                      <Hash className="size-3.5 text-foreground/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground">{r.name}</p>
                      <p className="truncate text-[11px] text-foreground/60">{r.lastMsg}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {r.unread > 0 && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-[#F62C7D] text-[10px] font-bold text-white">
                          {r.unread}
                        </span>
                      )}
                      <ChevronRight className="size-4 text-foreground/50" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Discover ── */}
      {activeTab === "discover" && (
        <>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/60" />
            <input
              placeholder="Search communities…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[46px] w-full rounded-[10px] border border-border bg-card pl-10 pr-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/10 transition-all"
            />
          </div>

          {/* Category chips */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-styled">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1 text-[12px] font-medium transition-all",
                  category === c
                    ? "border-[#F62C7D]/40 bg-[#F62C7D]/15 text-[#F62C7D]"
                    : "border-border text-foreground/50 hover:border-foreground/20 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Community cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-[#F62C7D]/20 hover:shadow-xl hover:shadow-black/10"
              >
                {/* Cover */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={c.cover}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Badges */}
                  <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
                    {c.joined && (
                      <span className="flex items-center gap-1 rounded-full bg-[#F62C7D] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-[0_2px_8px_rgba(246,44,125,0.4)]">
                        <BadgeCheck className="size-3" /> Joined
                      </span>
                    )}
                    {c.private && (
                      <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                        <Lock className="size-3" /> Private
                      </span>
                    )}
                  </div>

                  {/* Bottom overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-white/65">
                      <Users className="size-3" />
                      {c.members.toLocaleString()} members
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="mb-0.5 text-[14px] font-semibold text-foreground">{c.name}</p>
                  <span className="inline-block rounded-full border border-border bg-foreground/5 px-2.5 py-0.5 text-[11px] text-foreground/45">
                    {c.category}
                  </span>

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-full border border-foreground/20 py-1.5 text-[12px] font-medium text-foreground/60 transition-colors hover:bg-foreground/8">
                      {c.joined ? "Following" : "Follow"}
                    </button>
                    <button
                      className={cn(
                        "flex-1 rounded-full py-1.5 text-[12px] font-semibold transition-all",
                        c.joined
                          ? "bg-foreground/10 text-foreground/50"
                          : c.private
                          ? "border border-[#F62C7D]/40 text-[#F62C7D] hover:bg-[#F62C7D]/10"
                          : "bg-[#F62C7D] text-white shadow-[0_2px_8px_rgba(246,44,125,0.3)] hover:opacity-90",
                      )}
                    >
                      {c.joined ? "Leave" : c.private ? "Inquire" : "Join"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Inquiries ── */}
      {activeTab === "inquiries" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ENQUIRIES.map((eq) => (
            <div
              key={eq.id}
              className="rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/20 hover:shadow-md hover:shadow-black/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F62C7D]/10">
                    <MessageSquare className="size-4 text-[#F62C7D]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-foreground/45 mb-0.5">{eq.community}</p>
                    <p className="text-[14px] font-semibold text-foreground">{eq.subject}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize", STATUS_STYLE[eq.status])}>
                    {eq.status}
                  </span>
                  <span className="text-[11px] text-foreground/55">{eq.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
