import { useState } from "react";
import { Calendar, Repeat, Star, Trash2 } from "@/icons";
import { cn } from "@/lib/utils";
import { ACTIVITIES } from "@/lib/mock/personal";

const PERIODS = ["Today", "This Week", "This Month"] as const;

const ICON_MAP = { subscription: Repeat, follow: Star, event: Calendar };
const COLOR_MAP = { subscription: "#F62C7D", follow: "#8b5cf6", event: "#3b82f6" };

export default function PersonalActivity() {
  const [period, setPeriod] = useState<typeof PERIODS[number]>("Today");
  const filtered = ACTIVITIES.filter((a) => a.period === period);

  const stats = {
    subscriptions:    ACTIVITIES.filter((a) => a.type === "subscription").length,
    follows:          ACTIVITIES.filter((a) => a.type === "follow").length,
    involved_actions: ACTIVITIES.length,
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-[24px] font-bold text-foreground">Activity</h1>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Subscriptions", val: stats.subscriptions, color: "#F62C7D" },
          { label: "Follows",       val: stats.follows,       color: "#8b5cf6" },
          { label: "Actions",       val: stats.involved_actions, color: "#3b82f6" },
        ].map(({ label, val, color }) => (
          <div key={label} className="rounded-[14px] border border-border bg-card p-4 text-center">
            <p className="text-[24px] font-bold text-foreground" style={{ color }}>{val}</p>
            <p className="text-[12px] text-foreground/50">{label}</p>
          </div>
        ))}
      </div>

      {/* Period tabs */}
      <div className="mb-6 flex rounded-[10px] border border-border bg-card p-1">
        {PERIODS.map((p) => (
          <button key={p} onClick={() => setPeriod(p)}
            className={cn("flex-1 rounded-[8px] py-2 text-[13px] font-semibold transition-all",
              period === p ? "bg-[#F62C7D] text-foreground" : "text-foreground/60 hover:text-foreground")}>
            {p}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-[14px] text-foreground/60 py-10">No activity {period.toLowerCase()}.</p>
      ) : (
        <div className="flex flex-col gap-2 xl:max-w-2xl">
          {filtered.map((a) => {
            const Icon  = ICON_MAP[a.type as keyof typeof ICON_MAP] ?? Star;
            const color = COLOR_MAP[a.type as keyof typeof COLOR_MAP] ?? "#F62C7D";
            return (
              <div key={a.id} className="flex items-center gap-3 rounded-[14px] border border-border bg-card p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${color}20` }}>
                  <Icon className="size-5" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-foreground">
                    <span className="text-foreground/50">{a.action} </span>
                    <span className="font-semibold">{a.target}</span>
                  </p>
                </div>
                <button className="text-foreground/55 hover:text-red-400 transition-colors">
                  <Trash2 className="size-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
