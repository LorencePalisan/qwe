import { useState } from "react";
import { Gift, Ticket, DollarSign } from "@/icons";
import { cn } from "@/lib/utils";
import { REWARDS } from "@/lib/mock/personal";

const ICON_MAP = { discount: DollarSign, ticket: Ticket, product: Gift };
const COLOR_MAP = { discount: "#16a34a", ticket: "#3b82f6", product: "#F62C7D" };

export default function PersonalBusinessRewards() {
  const [activeTab, setActiveTab] = useState<"browse" | "history">("browse");

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-[24px] font-bold text-foreground">My Rewards</h1>

      <div className="mb-6 flex rounded-[10px] border border-border bg-card p-1">
        {(["browse", "history"] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={cn("flex-1 rounded-[8px] py-2 text-[13.6px] font-semibold transition-all",
              activeTab === t ? "bg-[#F62C7D] text-foreground" : "text-foreground/60 hover:text-foreground")}>
            {t === "browse" ? "Browse Rewards" : "Voucher History"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 xl:max-w-2xl">
        {REWARDS.filter((r) => activeTab === "browse" ? !r.redeemed : r.redeemed).map((r) => {
          const Icon  = ICON_MAP[r.type as keyof typeof ICON_MAP] ?? Gift;
          const color = COLOR_MAP[r.type as keyof typeof COLOR_MAP] ?? "#F62C7D";
          return (
            <div key={r.id} className={cn("rounded-[14px] border p-4 transition-all", r.redeemed ? "border-border bg-foreground/4 opacity-60" : "border-border bg-card")}>
              <div className="flex items-start gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}20` }}>
                  <Icon className="size-6" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-foreground">{r.title}</p>
                  <p className="text-[12px] text-foreground/50">{r.from}</p>
                  <p className="text-[11px] text-foreground/55 mt-0.5">Expires {r.expires}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-bold text-[#F62C7D]">{r.points.toLocaleString()} pts</p>
                  <button className={cn("mt-2 rounded-full px-3 py-1 text-[12px] font-medium",
                    r.redeemed ? "bg-foreground/10 text-foreground/60 cursor-default" : "bg-[#F62C7D] text-foreground hover:opacity-90")}>
                    {r.redeemed ? "Used" : "Redeem"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
