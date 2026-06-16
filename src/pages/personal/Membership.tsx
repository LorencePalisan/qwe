import { useState } from "react";
import { Users, Check } from "@/icons";
import { cn } from "@/lib/utils";
import { MEMBERSHIPS } from "@/lib/mock/personal";

export default function PersonalMembership() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const allSelected = selected.size === MEMBERSHIPS.length;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-foreground">Memberships</h1>
        <button
          onClick={() => setSelected(allSelected ? new Set() : new Set(MEMBERSHIPS.map((m) => m.id)))}
          className="text-[13px] text-[#F62C7D] hover:underline"
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      {selected.size > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3">
          <span className="text-[13px] text-red-400">{selected.size} selected</span>
          <button className="rounded-full bg-red-500/80 px-4 py-1.5 text-[12px] font-semibold text-foreground hover:opacity-90">
            Leave Selected
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-4xl">
        {MEMBERSHIPS.map((m) => {
          const isSelected = selected.has(m.id);
          return (
            <button
              key={m.id}
              onClick={() => toggle(m.id)}
              className={cn(
                "overflow-hidden rounded-[14px] border text-left transition-all",
                isSelected ? "border-[#F62C7D]/50 bg-[#F62C7D]/8" : "border-border bg-card hover:border-foreground/20",
              )}
            >
              <div className="relative h-32 overflow-hidden">
                <img src={m.cover} alt={m.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {isSelected && (
                  <div className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-[#F62C7D]">
                    <Check className="size-3.5 text-foreground" />
                  </div>
                )}
                {m.role === "admin" && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#F62C7D] px-2 py-0.5 text-[10px] font-medium text-foreground">Admin</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-[14px] font-semibold text-foreground">{m.name}</p>
                <div className="mt-0.5 flex items-center gap-1 text-[12px] text-foreground/50">
                  <Users className="size-3" /> {m.members.toLocaleString()} members · {m.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
