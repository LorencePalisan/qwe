import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Users,
  MapPin,
  Globe2,
  Mail,
  Calendar,
  Star,
  Bell,
} from "@/icons";
import { cn } from "@/lib/utils";
import { BUSINESSES, EVENTS, REWARDS } from "@/lib/mock/personal";

// Per-business supplementary detail not in the base mock
const EXTRA: Record<
  string,
  {
    about: string;
    location: string;
    website: string;
    email: string;
    founded: string;
  }
> = {
  b1: {
    about:
      "Neon Studios is a creative agency specializing in brand identity, motion design, and immersive digital experiences. We partner with startups and enterprises to craft visuals that resonate.",
    location: "New York, USA",
    website: "neonstudios.com",
    email: "hello@neonstudios.com",
    founded: "2018",
  },
  b2: {
    about:
      "Urban Brew Co. sources ethically grown beans from around the world and crafts exceptional specialty brews for the modern coffee lover. Visit us at any of our 12 locations.",
    location: "Manila, Philippines",
    website: "urbanbrewco.com",
    email: "hi@urbanbrewco.com",
    founded: "2020",
  },
  b3: {
    about:
      "FitZone Gym delivers results-driven fitness programs in a supportive community environment. From HIIT to strength training, our certified coaches help you hit every goal.",
    location: "Manila, Philippines",
    website: "fitzonegym.ph",
    email: "info@fitzonegym.ph",
    founded: "2017",
  },
  b4: {
    about:
      "Velvet Records is an independent music label championing emerging artists across Southeast Asia. We produce, distribute, and amplify the next generation of musical talent.",
    location: "Los Angeles, USA",
    website: "velvetrecords.com",
    email: "artists@velvetrecords.com",
    founded: "2015",
  },
  b5: {
    about:
      "TechHub Manila is the Philippines' premier technology coworking and event space. We connect startups, developers, and innovators through world-class infrastructure and programming.",
    location: "Bonifacio Global City",
    website: "techhubmanila.com",
    email: "events@techhubmanila.com",
    founded: "2019",
  },
  b6: {
    about:
      "Bloom & Co Flowers curates artisanal floral arrangements for every occasion. From intimate gifts to large-scale event florals, every bouquet tells a story.",
    location: "Makati City",
    website: "bloomandco.ph",
    email: "orders@bloomandco.ph",
    founded: "2021",
  },
};

const FALLBACK_EXTRA = (name: string) => ({
  about: `Discover exclusive content, events, and rewards by subscribing to ${name}. Join thousands of members enjoying premium benefits.`,
  location: "Philippines",
  website: `${name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
  email: `info@${name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
  founded: "2020",
});

function CapacityBar({
  registered,
  capacity,
}: {
  registered: number;
  capacity: number;
}) {
  const pct = Math.min(100, Math.round((registered / capacity) * 100));
  const color =
    pct >= 90 ? "bg-red-400" : pct >= 70 ? "bg-amber-400" : "bg-emerald-400";
  return (
    <div className="mt-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div
          className={cn("h-full rounded-full", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-[10px] text-foreground/55">
        {registered.toLocaleString()} / {capacity.toLocaleString()} registered
      </p>
    </div>
  );
}

export default function PersonalBusinessDetail() {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();

  const biz = BUSINESSES.find((b) => b.id === businessId);

  if (!biz) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-[18px] font-semibold text-foreground">
            Business not found
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-[14px] text-[#F62C7D] hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const extra = EXTRA[biz.id] ?? FALLBACK_EXTRA(biz.name);
  const relatedEvents = EVENTS.filter((e) => e.type === "business");
  const relatedRewards = REWARDS.filter((r) => r.from === biz.name);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={biz.cover}
          alt={biz.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-black/60"
        >
          <ArrowLeft className="size-5" />
        </button>
        {/* Identity anchored to hero bottom */}
        <div className="absolute bottom-5 left-4 right-4 flex items-end gap-3 sm:left-6 lg:left-8">
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white/20 text-[22px] font-bold text-white shadow-xl"
            style={{ backgroundColor: biz.color }}
          >
            {biz.name[0]}
          </div>
          <div className="min-w-0 pb-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[22px] font-bold text-white drop-shadow-md">
                {biz.name}
              </h1>
              <BadgeCheck className="size-5 shrink-0 text-[#F62C7D]" />
              {biz.subscribed && (
                <span className="rounded-full bg-[#F62C7D] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-[0_2px_8px_rgba(246,44,125,0.4)]">
                  Subscribed
                </span>
              )}
            </div>
            <p className="text-[13px] text-white/60">{biz.category}</p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6" />

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-lg">
          {[
            {
              label: "Subscribers",
              value: biz.subscribers.toLocaleString(),
              icon: Users,
            },
            {
              label: "Events",
              value: relatedEvents.length.toString(),
              icon: Calendar,
            },
            {
              label: "Rewards",
              value:
                relatedRewards.length > 0
                  ? relatedRewards.length.toString()
                  : "4",
              icon: Star,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 bg-card px-3 py-4"
            >
              <Icon className="size-4 text-[#F62C7D]" />
              <p className="text-[20px] font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-foreground/60">{label}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mb-8 flex gap-3">
          <button className="flex-1 h-[46px] rounded-full border border-foreground/20 text-[14px] font-medium text-foreground transition-colors hover:bg-foreground/8">
            <span className="flex items-center justify-center gap-2">
              <Mail className="size-4" /> Inquire
            </span>
          </button>
          <button
            className={cn(
              "flex-1 h-[46px] rounded-full text-[14px] font-semibold transition-all flex items-center justify-center gap-2",
              biz.subscribed
                ? "bg-foreground/10 text-foreground/50"
                : "bg-[#F62C7D] text-white shadow-[0_4px_15px_rgba(246,44,125,0.35)] hover:shadow-[0_4px_20px_rgba(246,44,125,0.5)] hover:opacity-95",
            )}
          >
            <Bell className="size-4" />
            {biz.subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:max-w-2xl">
          {/* About */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-foreground">
              <div className="h-4 w-[3px] rounded-full bg-[#F62C7D]" /> About
            </h2>
            <p className="text-[14px] leading-relaxed text-foreground/65">
              {extra.about}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: extra.location },
                { icon: Globe2, label: extra.website },
                { icon: Mail, label: extra.email },
                { icon: Calendar, label: `Founded ${extra.founded}` },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-[12px] text-foreground/50"
                >
                  <Icon className="size-3.5 shrink-0 text-foreground/55" />
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Events */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-foreground">
              <div className="h-4 w-[3px] rounded-full bg-[#F62C7D]" /> Events
            </h2>
            <div className="flex flex-col gap-3">
              {relatedEvents.map((e) => (
                <div
                  key={e.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-[#F62C7D]/20 hover:shadow-lg hover:shadow-black/10"
                >
                  <div className="flex gap-4 p-4">
                    <div className="size-16 shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={e.cover}
                        alt={e.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-foreground">
                        {e.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1 text-[12px] text-foreground/45">
                        <MapPin className="size-3" /> {e.venue}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-[12px] text-foreground/60">
                        <Calendar className="size-3" />
                        {new Date(e.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <CapacityBar
                        registered={e.registrations}
                        capacity={e.capacity}
                      />
                    </div>
                    <button
                      className={cn(
                        "self-start shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all",
                        e.registered
                          ? "bg-foreground/10 text-foreground/50"
                          : "bg-[#F62C7D] text-white shadow-[0_2px_8px_rgba(246,44,125,0.3)] hover:opacity-90",
                      )}
                    >
                      {e.registered ? "Registered" : "Register"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Rewards */}
          <section className="pb-6">
            <h2 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-foreground">
              <div className="h-4 w-[3px] rounded-full bg-[#F62C7D]" /> Rewards
              & Perks
            </h2>
            {relatedRewards.length > 0 ? (
              <div className="flex flex-col gap-3">
                {relatedRewards.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F62C7D]/10">
                      <Star className="size-5 text-[#F62C7D]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-foreground">
                        {r.title}
                      </p>
                      <p className="text-[12px] text-foreground/60">
                        Expires {r.expires} · {r.points} pts
                      </p>
                    </div>
                    <button
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold",
                        r.redeemed
                          ? "bg-foreground/8 text-foreground/55"
                          : "bg-[#F62C7D]/15 text-[#F62C7D] hover:bg-[#F62C7D]/25",
                      )}
                    >
                      {r.redeemed ? "Redeemed" : "Redeem"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
                <Star className="mx-auto mb-2 size-8 text-foreground/45" />
                <p className="text-[13px] text-foreground/60">
                  Subscribe to unlock exclusive rewards from {biz.name}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
