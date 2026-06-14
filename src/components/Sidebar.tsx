import { cn } from "@/lib/utils";
import { Home, Search, Bell, Heart, Settings, User, Star } from "@/icons";

const NAV_ITEMS = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Search" },
  { icon: Bell, label: "Notifications" },
  { icon: Heart, label: "Favorites" },
  { icon: Star, label: "Discover" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-20 flex-col items-center border-r border-white/6 bg-[#0d0f14] py-6">
      {/* Logo mark */}
      <div className="mb-8 flex size-10 items-center justify-center rounded-xl bg-white/10">
        <span className="text-[13px] font-bold tracking-tight text-white">
          W
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={label}
            className={cn(
              "flex size-11 items-center justify-center rounded-xl transition-colors",
              active
                ? "bg-white/15 text-white"
                : "text-white/35 hover:bg-white/10 hover:text-white/80",
            )}
          >
            <Icon className="size-5" />
          </button>
        ))}
      </nav>

      {/* User avatar */}
      <button className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-blue-500">
        <User className="size-4 text-white" />
      </button>
    </aside>
  );
}
