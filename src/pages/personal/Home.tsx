import { useState, useEffect } from "react";
import {
  Calendar, Users, Star, MapPin, Zap, Trophy, Bell,
  ChevronRight, CheckCircle2, Building2, ChevronLeft,
} from "@/icons";
import { cn } from "@/lib/utils";
import {
  EVENTS, COMMUNITIES, FREELANCERS, SUBSCRIPTIONS, ACTIVITIES, REWARDS, MEMBERSHIPS,
} from "@/lib/mock/personal";

const MY_NAME = "Lorence";

// ── Hero Slider ───────────────────────────────────────────────────────────────

const SLIDE_DESCRIPTIONS: Record<string, string> = {
  e1: "Experience the most iconic summer music festival in New York with over 50 artists across 5 electrifying stages.",
  e2: "Join thousands of cloud professionals for technical deep-dives, live demos, and networking at AWS Summit NYC.",
  e3: "A celebration of Filipino design talent featuring curated exhibitions, talks, and immersive installations.",
  e4: "Lace up and join the community for a scenic 5K run through the iconic paths of Central Park.",
};

const EVENT_BADGE: Record<string, string> = {
  business:  "Business",
  community: "Community",
};

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const slides = EVENTS;
  const total  = slides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % total), 4000);
    return () => clearInterval(t);
  }, [paused, total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const ev = slides[current];

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ height: "480px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides (cross-fade) */}
      {slides.map((s, i) => (
        <img
          key={s.id}
          src={s.cover}
          alt={s.title}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            i === current ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {/* Gradient overlay — dark left, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Left content */}
      <div className="absolute bottom-0 left-0 flex flex-col justify-end px-7 pb-8 pr-[180px]">
        {/* Badge */}
        <span className="mb-3 w-fit rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {EVENT_BADGE[ev.type]}
        </span>

        {/* Title */}
        <h2 className="mb-2 text-[26px] font-extrabold leading-tight tracking-tight text-white">
          {ev.title}
        </h2>

        {/* Date · Venue */}
        <p className="mb-3 flex items-center gap-1.5 text-[13px] text-white/70">
          <Calendar className="size-3.5 shrink-0" />
          {new Date(ev.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          <span className="text-white/40">·</span>
          <MapPin className="size-3.5 shrink-0" />
          {ev.venue}
        </p>

        {/* Description */}
        <p className="mb-5 max-w-[440px] text-[13px] leading-relaxed text-white/60 line-clamp-2">
          {SLIDE_DESCRIPTIONS[ev.id]}
        </p>

        {/* CTA */}
        <button className="w-fit rounded-full border border-white/30 bg-white/15 px-5 py-2 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25">
          View Details
        </button>
      </div>

      {/* Thumbnail strip — right side */}
      <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-[72px] w-[110px] overflow-hidden rounded-xl border-2 transition-all duration-300",
              i === current
                ? "border-white opacity-100 scale-100"
                : "border-transparent opacity-50 scale-95 hover:opacity-75",
            )}
          >
            <img src={s.cover} alt={s.title} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-[148px] top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-4 right-[148px] flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "rounded-full bg-white transition-all duration-300",
              i === current ? "w-5 h-1.5 opacity-100" : "w-1.5 h-1.5 opacity-40",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function daysUntil(iso: string) {
  const d = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (d <= 0) return "Today";
  if (d === 1) return "Tomorrow";
  return `${d}d away`;
}

function SectionHeader({
  title, sub, action,
}: {
  title: string; sub?: string; action?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="text-[15px] font-bold text-foreground">{title}</h2>
        {sub && <p className="mt-0.5 text-[12px] text-foreground/60">{sub}</p>}
      </div>
      {action && (
        <button className="flex items-center gap-0.5 text-[12px] font-medium text-[#F62C7D] transition-opacity hover:opacity-75">
          {action} <ChevronRight className="size-3.5" />
        </button>
      )}
    </div>
  );
}

// ── Upcoming Events ───────────────────────────────────────────────────────────

const EVENT_TYPE: Record<string, string> = {
  business:  "bg-sky-500/15 text-sky-400",
  community: "bg-violet-500/15 text-violet-400",
};

function UpcomingEvents() {
  const upcoming = EVENTS.filter((e) => new Date(e.date) > new Date()).slice(0, 3);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <SectionHeader
        title="Upcoming Events"
        sub={`${upcoming.length} events ahead`}
        action="See all"
      />
      <div className="flex flex-col gap-3">
        {upcoming.map((ev) => {
          const pct = Math.round((ev.registrations / ev.capacity) * 100);
          const urgent = pct >= 90;
          const d = new Date(ev.date);

          return (
            <div
              key={ev.id}
              className="flex gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-foreground/[0.02]"
            >
              {/* Date badge */}
              <div className="flex shrink-0 min-w-[52px] flex-col items-center justify-center rounded-xl bg-[#F62C7D]/10 px-3 py-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#F62C7D]/70">
                  {d.toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="text-[22px] font-extrabold leading-tight text-[#F62C7D]">
                  {d.getDate()}
                </span>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold text-foreground">{ev.title}</p>
                  {ev.registered && (
                    <span className="shrink-0 flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <CheckCircle2 className="size-3" /> Registered
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[12px] text-foreground/50">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" /> {ev.venue}
                  </span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", EVENT_TYPE[ev.type])}>
                    {ev.type === "business" ? "Business" : "Community"}
                  </span>
                </div>
                {/* Fill meter */}
                <div className="mt-2.5">
                  <div className="mb-1 flex justify-between text-[11px] text-foreground/60">
                    <span>{ev.registrations.toLocaleString()} of {ev.capacity.toLocaleString()}</span>
                    <span className={cn(urgent && "font-semibold text-red-400")}>{pct}% full</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className={cn("h-full rounded-full transition-all", urgent ? "bg-red-400" : "bg-[#F62C7D]")}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div className="shrink-0 self-start">
                <span className="rounded-full bg-foreground/8 px-2.5 py-1 text-[11px] font-semibold text-foreground/50">
                  {daysUntil(ev.date)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── My Communities ────────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<string, string> = {
  Technology: "bg-sky-500/15 text-sky-400",
  Wellness:   "bg-emerald-500/15 text-emerald-400",
  Business:   "bg-violet-500/15 text-violet-400",
  Sports:     "bg-amber-500/15 text-amber-400",
  Creative:   "bg-[#F62C7D]/15 text-[#F62C7D]",
};

function MyCommunities() {
  const joined = COMMUNITIES.filter((c) => c.joined);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <SectionHeader title="My Communities" sub={`${joined.length} joined`} action="Browse" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {joined.map((cm) => (
          <div
            key={cm.id}
            className="flex items-center gap-3 rounded-xl border border-border p-3.5 transition-colors hover:bg-foreground/[0.02]"
          >
            <div
              className="size-11 shrink-0 overflow-hidden rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${cm.cover})` }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">{cm.name}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", CATEGORY_COLOR[cm.category] ?? "bg-foreground/10 text-foreground/50")}>
                  {cm.category}
                </span>
                <span className="text-[11px] text-foreground/60">
                  {cm.members >= 1000 ? `${(cm.members / 1000).toFixed(1)}k` : cm.members} members
                </span>
              </div>
            </div>
            <ChevronRight className="size-4 shrink-0 text-foreground/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Featured Freelancers ──────────────────────────────────────────────────────

function FeaturedFreelancers() {
  const sorted = [...FREELANCERS].sort((a) => (a.availability === "available" ? -1 : 1)).slice(0, 4);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <SectionHeader title="Freelancers" sub="Explore talent near you" action="View all" />
      <div className="grid grid-cols-2 gap-3">
        {sorted.map((fl) => (
          <div
            key={fl.id}
            className="flex flex-col gap-3 rounded-xl border border-border p-3.5 transition-colors hover:bg-foreground/[0.02]"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img src={fl.avatar} alt={fl.name} className="size-10 rounded-full object-cover" />
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card",
                  fl.availability === "available" ? "bg-emerald-400" : "bg-amber-400",
                )} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-foreground">{fl.name}</p>
                <p className="truncate text-[11px] text-foreground/50">{fl.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {fl.skills.slice(0, 2).map((s) => (
                <span key={s} className="rounded-full bg-foreground/8 px-2 py-0.5 text-[10px] font-medium text-foreground/60">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-foreground/50">
              <span className="flex items-center gap-0.5">
                <Star className="size-3 fill-amber-400 text-amber-400" /> {fl.rating}
              </span>
              <span>{fl.projects} projects</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Subscriptions ─────────────────────────────────────────────────────────────

function MySubscriptions() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <SectionHeader title="Subscriptions" sub={`${SUBSCRIPTIONS.length} active`} action="Manage" />
      <div className="flex flex-col gap-2.5">
        {SUBSCRIPTIONS.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-extrabold text-white"
              style={{ backgroundColor: s.color }}
            >
              {s.abbr}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">{s.name}</p>
              <p className="text-[11px] text-foreground/60">{s.type}</p>
            </div>
            {s.notif && <Bell className="size-3.5 shrink-0 text-[#F62C7D]/60" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Recent Activity ───────────────────────────────────────────────────────────

const ACTIVITY_STYLE: Record<string, { color: string; icon: React.ElementType }> = {
  subscription: { color: "bg-[#F62C7D]/15 text-[#F62C7D]",  icon: Zap },
  follow:       { color: "bg-sky-500/15 text-sky-400",       icon: Users },
  event:        { color: "bg-violet-500/15 text-violet-400", icon: Calendar },
};

function RecentActivity() {
  const grouped: Record<string, typeof ACTIVITIES> = {};
  for (const a of ACTIVITIES) {
    (grouped[a.period] ??= []).push(a);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <SectionHeader title="Recent Activity" />
      <div className="flex flex-col gap-4">
        {Object.entries(grouped).map(([period, items]) => (
          <div key={period}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-foreground/55">
              {period}
            </p>
            <div className="flex flex-col gap-2">
              {items.map((a) => {
                const style = ACTIVITY_STYLE[a.type] ?? { color: "bg-foreground/10 text-foreground/50", icon: Building2 };
                const Icon = style.icon;
                return (
                  <div key={a.id} className="flex items-center gap-2.5">
                    <div className={cn("flex size-7 shrink-0 items-center justify-center rounded-full", style.color)}>
                      <Icon className="size-3.5" />
                    </div>
                    <p className="text-[12px] text-foreground/70">
                      <span className="font-medium text-foreground/90">{a.action} </span>
                      <span className="text-[#F62C7D]/80">{a.target}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Rewards ───────────────────────────────────────────────────────────────────

function MyRewards() {
  const unredeemed = REWARDS.filter((r) => !r.redeemed);
  if (unredeemed.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <SectionHeader title="Rewards" sub={`${unredeemed.length} available`} action="See all" />
      <div className="flex flex-col gap-2.5">
        {unredeemed.map((r) => (
          <div key={r.id} className="flex items-start gap-3 rounded-xl border border-[#F62C7D]/20 bg-[#F62C7D]/5 p-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F62C7D]/15">
              <Trophy className="size-4 text-[#F62C7D]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-foreground">{r.title}</p>
              <p className="mt-0.5 text-[11px] text-foreground/50">
                {r.from} · expires {new Date(r.expires).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PersonalHome() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
  const registeredCount = EVENTS.filter((e) => e.registered).length;
  const upcomingCount   = EVENTS.filter((e) => new Date(e.date) > new Date()).length;

  const chips = [
    { label: `${SUBSCRIPTIONS.length} Subscriptions`,    color: "bg-[#F62C7D]/10 text-[#F62C7D]"    },
    { label: `${MEMBERSHIPS.length} Communities`,         color: "bg-sky-500/10 text-sky-400"          },
    { label: `${registeredCount} Events Registered`,      color: "bg-violet-500/10 text-violet-400"    },
    { label: `${upcomingCount} Upcoming Events`,          color: "bg-amber-500/10 text-amber-500"      },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Hero Slider */}
      <div className="mb-8">
        <HeroSlider />
      </div>

      {/* Greeting */}
      <div className="mb-8">
        <p className="text-[13px] font-medium text-foreground/60">{today}</p>
        <h1 className="mt-1 text-[28px] font-extrabold leading-tight tracking-tight text-foreground">
          {getGreeting()}, {MY_NAME}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className={cn("rounded-full px-3 py-1 text-[12px] font-semibold", chip.color)}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* Bento layout */}
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Left — main content */}
        <div className="flex flex-col gap-6">
          <UpcomingEvents />
          <MyCommunities />
          <FeaturedFreelancers />
        </div>

        {/* Right — sidebar */}
        <div className="flex flex-col gap-6">
          <MySubscriptions />
          <RecentActivity />
          <MyRewards />
        </div>
      </div>
    </div>
  );
}
