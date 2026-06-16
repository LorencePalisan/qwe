import { useState } from "react";
import { Search, MapPin, BadgeCheck, Heart } from "@/icons";
import { cn } from "@/lib/utils";
import { AGENCIES } from "@/lib/mock/personal";

export default function PersonalAgencies() {
  const [search,    setSearch]    = useState("");
  const [following, setFollowing] = useState<Record<string, boolean>>(
    Object.fromEntries(AGENCIES.map((a) => [a.id, a.following])),
  );

  const filtered = AGENCIES.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-[24px] font-bold text-foreground">Agencies</h1>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/60" />
        <input placeholder="Search agencies…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="h-[46px] w-full rounded-[10px] border border-border bg-card pl-10 pr-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none transition-all" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <div key={a.id} className="overflow-hidden rounded-[14px] border border-border bg-card">
            <div className="relative h-36 overflow-hidden">
              <img src={a.cover} alt={a.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setFollowing((prev) => ({ ...prev, [a.id]: !prev[a.id] }))}
                className={cn("absolute right-3 top-3 flex size-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
                  following[a.id] ? "bg-[#F62C7D] text-foreground" : "bg-black/40 text-foreground/60 hover:text-foreground")}
              >
                <Heart className={cn("size-4", following[a.id] && "fill-white")} />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-2 mb-1">
                <p className="text-[14px] font-semibold text-foreground">{a.name}</p>
                {a.verified && <BadgeCheck className="size-4 text-[#F62C7D] shrink-0 mt-0.5" />}
              </div>
              <p className="text-[12px] text-foreground/50 mb-0.5">{a.category}</p>
              <div className="flex items-center gap-1 text-[12px] text-foreground/60 mb-3">
                <MapPin className="size-3" /> {a.city}
              </div>
              <p className="text-[13px] text-foreground/60 italic mb-4">"{a.tagline}"</p>
              <button className="w-full rounded-full bg-[#F62C7D]/15 py-2 text-[13px] font-medium text-[#F62C7D] hover:bg-[#F62C7D]/25 transition-colors">
                Send Inquiry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
