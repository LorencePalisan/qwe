import { useState } from "react";
import { Bell, BellOff, Repeat } from "@/icons";
import { cn } from "@/lib/utils";
import { SUBSCRIPTIONS } from "@/lib/mock/personal";

export default function PersonalSubscription() {
  const [notifs, setNotifs] = useState<Record<string, boolean>>(
    Object.fromEntries(SUBSCRIPTIONS.map((s) => [s.id, s.notif])),
  );

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-foreground">Subscriptions</h1>
        <div className="flex items-center gap-2 rounded-[10px] border border-border bg-card px-3 py-2">
          <Repeat className="size-4 text-[#F62C7D]" />
          <span className="text-[13px] font-semibold text-foreground">{SUBSCRIPTIONS.length} Active</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 xl:max-w-2xl">
        {SUBSCRIPTIONS.map((s) => (
          <div key={s.id} className="flex items-center gap-4 rounded-[14px] border border-border bg-card p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl text-[14px] font-bold text-foreground" style={{ backgroundColor: s.color }}>
              {s.abbr}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-foreground">{s.name}</p>
              <p className="text-[12px] text-foreground/50">{s.type}</p>
              <p className="text-[11px] text-foreground/55 mt-0.5">Since {new Date(s.since).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNotifs((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                className={cn("flex size-9 items-center justify-center rounded-full transition-colors",
                  notifs[s.id] ? "bg-[#F62C7D]/15 text-[#F62C7D]" : "bg-foreground/8 text-foreground/60")}
              >
                {notifs[s.id] ? <Bell className="size-4" /> : <BellOff className="size-4" />}
              </button>
              <button className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[12px] text-red-400 hover:bg-red-500/20">
                Leave
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
