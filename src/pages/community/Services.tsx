import { Clock } from "@/icons";

export default function CommunityServices() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-[22px] font-bold text-foreground">Services</h1>
        <p className="text-[13px] text-foreground/50">Community service offerings for members</p>
      </div>
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="relative mb-6">
            <div
              className="grid grid-cols-3 gap-2 opacity-20 blur-[3px] pointer-events-none select-none"
              aria-hidden
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-foreground/10" />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#F62C7D]/10">
                  <Clock className="size-5 text-[#F62C7D]/60" />
                </div>
                <span className="rounded-full bg-[#F62C7D]/10 px-3 py-1 text-[11px] font-semibold text-[#F62C7D]">
                  In Progress
                </span>
              </div>
            </div>
          </div>
          <p className="text-[15px] font-semibold text-foreground/50">Community services coming soon</p>
          <p className="mt-1 text-[12px] text-foreground/55">Member service offerings and marketplace</p>
        </div>
      </div>
    </div>
  );
}
