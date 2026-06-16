import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, BadgeCheck } from "@/icons";
import { cn } from "@/lib/utils";
import { FREELANCERS } from "@/lib/mock/personal";

const TAB = "flex-1 rounded-[8px] py-2 text-[13.6px] font-semibold transition-all";

const MY_INQUIRIES = [
  { id: "fi1", freelancer: "Maria Santos",  subject: "Logo Design Project",      status: "replied", date: "Jun 11" },
  { id: "fi2", freelancer: "Carlos Reyes",  subject: "Motion Graphics for Ad",   status: "pending", date: "Jun 13" },
];

const STATUS_STYLE: Record<string, string> = {
  replied: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-amber-500/15 text-amber-400",
};

export default function PersonalFreelance() {
  const navigate = useNavigate();
  const [activeTab,    setActiveTab]    = useState<"browse" | "inquiries">("browse");
  const [search,       setSearch]       = useState("");
  const [availability, setAvailability] = useState<"all" | "available" | "busy">("all");

  const filtered = FREELANCERS.filter((f) =>
    (availability === "all" || f.availability === availability) &&
    (f.name.toLowerCase().includes(search.toLowerCase()) || f.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))),
  );

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-[12px] font-medium uppercase tracking-wider text-foreground/60">Hire & Collaborate</p>
        <h1 className="text-[28px] font-bold text-foreground">Freelancers</h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex rounded-[10px] border border-border bg-card p-1">
        {(["browse", "inquiries"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(TAB, activeTab === t ? "bg-[#F62C7D] text-white shadow-[0_2px_10px_rgba(246,44,125,0.3)]" : "text-foreground/60 hover:text-foreground")}
          >
            {t === "browse" ? "Browse" : "My Inquiries"}
          </button>
        ))}
      </div>

      {activeTab === "browse" && (
        <>
          {/* Search + filters */}
          <div className="mb-5 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/60" />
              <input
                placeholder="Search by name or skill…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-[46px] w-full rounded-[10px] border border-border bg-card pl-10 pr-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/10 transition-all"
              />
            </div>
            <div className="flex gap-1.5">
              {(["all", "available", "busy"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAvailability(a)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[12px] font-medium capitalize transition-all",
                    availability === a
                      ? "border-[#F62C7D]/40 bg-[#F62C7D]/15 text-[#F62C7D]"
                      : "border-border text-foreground/50 hover:border-foreground/20 hover:text-foreground",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f) => (
              <button
                key={f.id}
                onClick={() => navigate(`/personal/freelance/${f.id}`)}
                className="group rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#F62C7D]/20 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative size-14 shrink-0">
                    <div className="size-14 overflow-hidden rounded-full ring-2 ring-border ring-offset-2 ring-offset-card">
                      <img src={f.avatar} alt={f.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className={cn(
                      "absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-card",
                      f.availability === "available" ? "bg-emerald-400" : "bg-foreground/30",
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-[14px] font-semibold text-foreground">{f.name}</p>
                      <BadgeCheck className="size-4 shrink-0 text-[#F62C7D]" />
                    </div>
                    <p className="text-[12px] text-foreground/45">{f.role}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-[12px] text-foreground/55">{f.rating} · {f.projects} projects</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {f.skills.map((s) => (
                    <span key={s} className="rounded-full border border-border bg-foreground/4 px-2.5 py-0.5 text-[11px] text-foreground/55">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                    f.availability === "available" ? "bg-emerald-500/15 text-emerald-400" : "bg-foreground/10 text-foreground/60",
                  )}>
                    {f.availability === "available" ? "Available" : "Busy"}
                  </span>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    disabled={f.availability === "busy"}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all",
                      f.availability === "busy"
                        ? "cursor-not-allowed bg-foreground/10 text-foreground/55"
                        : "bg-[#F62C7D] text-white shadow-[0_2px_8px_rgba(246,44,125,0.3)] hover:shadow-[0_4px_15px_rgba(246,44,125,0.4)] hover:opacity-90",
                    )}
                  >
                    Inquire
                  </button>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {activeTab === "inquiries" && (
        <div className="flex flex-col gap-3 xl:max-w-2xl">
          {MY_INQUIRIES.map((i) => (
            <div
              key={i.id}
              className="rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/20 hover:shadow-md hover:shadow-black/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F62C7D]/10">
                    <BadgeCheck className="size-4 text-[#F62C7D]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-foreground/45 mb-0.5">{i.freelancer}</p>
                    <p className="text-[14px] font-semibold text-foreground">{i.subject}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize", STATUS_STYLE[i.status])}>
                    {i.status}
                  </span>
                  <span className="text-[11px] text-foreground/55">{i.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overlay removed — detail page at /personal/freelance/:freelancerId */}
    </div>
  );
}
