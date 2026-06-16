import { Sparkles } from "@/icons";

const SKELETON_GAMES = [
  { title: "Evolution Simulator", plays: "4.8m plays", gradient: "from-[#0d2238] to-[#071018]" },
  { title: "City Builder Pro",    plays: "2.1m plays", gradient: "from-[#1a2810] to-[#0d1808]" },
  { title: "Dragon Quest VI",     plays: "1.5m plays", gradient: "from-[#280d0d] to-[#180707]" },
  { title: "Racing League",       plays: "3.2m plays", gradient: "from-[#1a0d28] to-[#0d0718]" },
];

export default function PersonalGames() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      {/* Skeleton content */}
      <div className="pointer-events-none select-none" aria-hidden>
        <div className="mb-6 h-8 w-32 rounded-lg bg-foreground/5" />
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-[14px] bg-foreground/5" />
          ))}
        </div>
        <div className="mb-2 h-5 w-28 rounded bg-foreground/5" />
        <div className="flex gap-4 overflow-hidden">
          {SKELETON_GAMES.map((g) => (
            <div key={g.title} className={`h-64 w-44 shrink-0 rounded-xl bg-gradient-to-br ${g.gradient}`} />
          ))}
        </div>
      </div>

      {/* Coming soon overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-[#F62C7D]/15 mb-4">
          <Sparkles className="size-8 text-[#F62C7D]" />
        </div>
        <h2 className="text-[22px] font-bold text-foreground mb-2">Games — Coming Soon</h2>
        <p className="text-[14px] text-foreground/50 text-center max-w-xs">
          Play casual games, track daily challenges, and compete with your connections.
        </p>
      </div>
    </div>
  );
}
