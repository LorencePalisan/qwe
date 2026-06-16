import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mail, Users } from "@/icons";
import { cn } from "@/lib/utils";
import { BUSINESSES } from "@/lib/mock/personal";

const TAB = "flex-1 rounded-[8px] py-2 text-[13.6px] font-semibold transition-all";

const INQUIRIES = [
  { id: "i1", business: "Neon Studios",   subject: "Collaboration Proposal",  status: "replied",  date: "Jun 10" },
  { id: "i2", business: "TechHub Manila", subject: "Event Sponsorship Query",  status: "pending",  date: "Jun 12" },
  { id: "i3", business: "FitZone Gym",    subject: "Membership Inquiry",       status: "read",     date: "Jun 8" },
];

const STATUS_STYLE: Record<string, string> = {
  replied: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-amber-500/15 text-amber-400",
  read:    "bg-blue-500/15 text-blue-400",
  closed:  "bg-foreground/10 text-foreground/60",
};

export default function PersonalBusiness() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"discover" | "inquiries">("discover");
  const [search,    setSearch]    = useState("");

  const filtered = BUSINESSES.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-[12px] font-medium uppercase tracking-wider text-foreground/60">Explore & Connect</p>
        <h1 className="text-[28px] font-bold text-foreground">Business</h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex rounded-[10px] border border-border bg-card p-1">
        {(["discover", "inquiries"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(TAB, activeTab === t ? "bg-[#F62C7D] text-white shadow-[0_2px_10px_rgba(246,44,125,0.3)]" : "text-foreground/60 hover:text-foreground")}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "discover" && (
        <>
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/60" />
            <input
              placeholder="Search businesses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[46px] w-full rounded-[10px] border border-border bg-card pl-10 pr-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => navigate(`/personal/business/${b.id}`)}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#F62C7D]/20 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={b.cover} alt={b.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {b.subscribed && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#F62C7D] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-[0_2px_8px_rgba(246,44,125,0.4)]">
                      Subscribed
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2.5">
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: b.color }}
                    >
                      {b.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-foreground">{b.name}</p>
                      <p className="text-[11px] text-foreground/45">{b.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[11px] text-foreground/55">
                      <Users className="size-3" />
                      {b.subscribers.toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full border border-foreground/20 px-3 py-1 text-[11px] font-medium text-foreground/60 transition-colors hover:bg-foreground/8"
                      >
                        Inquire
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "rounded-full px-3 py-1 text-[11px] font-semibold transition-all",
                          b.subscribed
                            ? "bg-foreground/10 text-foreground/50"
                            : "bg-[#F62C7D] text-white shadow-[0_2px_8px_rgba(246,44,125,0.3)] hover:opacity-90",
                        )}
                      >
                        {b.subscribed ? "Subscribed" : "Subscribe"}
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {activeTab === "inquiries" && (
        <div className="flex flex-col gap-3 xl:max-w-2xl">
          {INQUIRIES.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/20 hover:shadow-md hover:shadow-black/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F62C7D]/10">
                    <Mail className="size-4 text-[#F62C7D]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-foreground/45 mb-0.5">{inq.business}</p>
                    <p className="text-[14px] font-semibold text-foreground">{inq.subject}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize", STATUS_STYLE[inq.status])}>
                    {inq.status}
                  </span>
                  <span className="text-[11px] text-foreground/55">{inq.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
