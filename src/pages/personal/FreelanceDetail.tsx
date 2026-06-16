import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Star, Mail, Globe2, MapPin, Clock } from "@/icons";
import { cn } from "@/lib/utils";
import { FREELANCERS } from "@/lib/mock/personal";

const UP = "https://images.unsplash.com/photo-";

// Per-freelancer supplementary detail
const EXTRA: Record<string, {
  bio: string; hourlyRate: string; location: string; website: string;
  responseTime: string; portfolio: string[];
}> = {
  f1: {
    bio: "I'm a UI/UX designer with 6+ years crafting digital products that are both beautiful and intuitive. I specialize in SaaS dashboards, mobile apps, and brand identity systems. Every pixel should have a purpose.",
    hourlyRate: "$85/hr", location: "Manila, Philippines", website: "mariasantos.design",
    responseTime: "< 2 hours",
    portfolio: [
      `${UP}1561070791-2526850290-a4b2a4eae2d5?w=400&q=80`,
      `${UP}1545235617-9a1ac52b8d34?w=400&q=80`,
      `${UP}1581091226825-a6a2a5aee158?w=400&q=80`,
      `${UP}1496181133206-80ce9b88a853?w=400&q=80`,
    ],
  },
  f2: {
    bio: "Full-stack developer focused on building scalable web apps with React, Node.js, and AWS. I've shipped products used by 500k+ users and love working on complex architecture challenges.",
    hourlyRate: "$110/hr", location: "San Francisco, USA", website: "alextorres.dev",
    responseTime: "< 4 hours",
    portfolio: [
      `${UP}1518770660439-4636190af475?w=400&q=80`,
      `${UP}1633356122544-f134324a6cee?w=400&q=80`,
      `${UP}1555421689-d68471e189f2?w=400&q=80`,
      `${UP}1555099962-4182d35c3ab8?w=400&q=80`,
    ],
  },
  f3: {
    bio: "Brand strategist helping companies find their authentic voice. I craft messaging frameworks, positioning strategies, and go-to-market plans that actually convert. Your brand is your promise.",
    hourlyRate: "$95/hr", location: "Bangalore, India", website: "priyanair.co",
    responseTime: "< 3 hours",
    portfolio: [
      `${UP}1542744094-3a31f272c490?w=400&q=80`,
      `${UP}1432888498266-38ffec3eaf0a?w=400&q=80`,
      `${UP}1493612276216-ee3925520721?w=400&q=80`,
      `${UP}1460925895917-afdab827c52f?w=400&q=80`,
    ],
  },
  f4: {
    bio: "Award-winning video editor with a reel spanning commercials, documentaries, and branded content. Proficient in Premiere Pro, After Effects, and DaVinci Resolve. Stories well told.",
    hourlyRate: "$75/hr", location: "Seoul, South Korea", website: "jameslee.video",
    responseTime: "< 5 hours",
    portfolio: [
      `${UP}1536240478-f1e8b1ac3eff?w=400&q=80`,
      `${UP}1574717024653-61fd2cf4d44d?w=400&q=80`,
      `${UP}1540959733332-eab4deabeeaf?w=400&q=80`,
      `${UP}1522202176988-66273c2fd55f?w=400&q=80`,
    ],
  },
  f5: {
    bio: "Content writer and SEO strategist who has generated 10M+ organic impressions for B2B and DTC brands. I write long-form guides, product copy, and email sequences that rank and convert.",
    hourlyRate: "$65/hr", location: "London, UK", website: "emmachen.writes",
    responseTime: "< 6 hours",
    portfolio: [
      `${UP}1455390582262-044cdead277a?w=400&q=80`,
      `${UP}1471107191679-f26174d2d41e?w=400&q=80`,
      `${UP}1519791883288-dc8bd696eff2?w=400&q=80`,
      `${UP}1487014679447-9885374ae878?w=400&q=80`,
    ],
  },
  f6: {
    bio: "Motion designer turning complex ideas into elegant animations. I work with startups, agencies, and in-house teams to produce Lottie animations, explainer videos, and 3D renders.",
    hourlyRate: "$90/hr", location: "Madrid, Spain", website: "carlosreyes.motion",
    responseTime: "< 2 hours",
    portfolio: [
      `${UP}1550745165-9bc0b252726f?w=400&q=80`,
      `${UP}1558618666-fcd25c85cd64?w=400&q=80`,
      `${UP}1535223289827-a525a8ae6d7f?w=400&q=80`,
      `${UP}1611162617474-5b21e879e113?w=400&q=80`,
    ],
  },
};

const FALLBACK_EXTRA = (name: string) => ({
  bio: `${name} is a talented professional delivering high-quality work on time. With extensive experience and a client-first approach, they consistently exceed expectations.`,
  hourlyRate: "$80/hr", location: "Philippines", website: `${name.toLowerCase().split(" ")[0]}.com`,
  responseTime: "< 4 hours",
  portfolio: [
    `${UP}1561070791-2526850290-a4b2a4eae2d5?w=400&q=80`,
    `${UP}1545235617-9a1ac52b8d34?w=400&q=80`,
    `${UP}1496181133206-80ce9b88a853?w=400&q=80`,
    `${UP}1493612276216-ee3925520721?w=400&q=80`,
  ],
});

export default function PersonalFreelanceDetail() {
  const { freelancerId } = useParams<{ freelancerId: string }>();
  const navigate = useNavigate();

  const freelancer = FREELANCERS.find((f) => f.id === freelancerId);

  if (!freelancer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-[18px] font-semibold text-foreground">Freelancer not found</p>
          <button onClick={() => navigate(-1)} className="mt-3 text-[14px] text-[#F62C7D] hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const extra = EXTRA[freelancer.id] ?? FALLBACK_EXTRA(freelancer.name);
  const isAvailable = freelancer.availability === "available";

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#F62C7D]/20 via-[#F62C7D]/5 to-background sm:h-64">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(246,44,125,0.15),transparent_60%)]" />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm border border-border transition-all hover:bg-foreground/20"
        >
          <ArrowLeft className="size-5" />
        </button>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Avatar + identity */}
        <div className="-mt-16 mb-6 flex items-end gap-4">
          <div className="relative size-24 shrink-0">
            <div className="size-24 overflow-hidden rounded-full border-4 border-background ring-2 ring-[#F62C7D]/30 ring-offset-2 ring-offset-background shadow-xl">
              <img src={freelancer.avatar} alt={freelancer.name} className="h-full w-full object-cover" />
            </div>
            <div className={cn(
              "absolute bottom-1 right-1 size-4 rounded-full border-2 border-background",
              isAvailable ? "bg-emerald-400" : "bg-foreground/30",
            )} />
          </div>
          <div className="mb-2 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h1 className="text-[22px] font-bold text-foreground">{freelancer.name}</h1>
              <BadgeCheck className="size-5 shrink-0 text-[#F62C7D]" />
            </div>
            <p className="text-[13px] text-foreground/50">{freelancer.role}</p>
            <span className={cn(
              "mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              isAvailable ? "bg-emerald-500/15 text-emerald-400" : "bg-foreground/10 text-foreground/60",
            )}>
              {isAvailable ? "Available for hire" : "Currently busy"}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-lg">
          {[
            { label: "Rating",   value: String(freelancer.rating), icon: Star },
            { label: "Projects", value: String(freelancer.projects), icon: Mail },
            { label: "Rate",     value: extra.hourlyRate, icon: Clock },
            { label: "Response", value: extra.responseTime, icon: Clock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1 bg-card px-2 py-4">
              <Icon className="size-3.5 text-[#F62C7D]" />
              <p className="text-[14px] font-bold text-foreground leading-tight">{value}</p>
              <p className="text-[9px] text-foreground/60 text-center">{label}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mb-8 flex gap-3">
          <button className="flex h-[46px] flex-1 items-center justify-center gap-2 rounded-full border border-foreground/20 text-[14px] font-medium text-foreground transition-colors hover:bg-foreground/8">
            <Mail className="size-4" /> Message
          </button>
          <button
            disabled={!isAvailable}
            className={cn(
              "flex h-[46px] flex-1 items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-all",
              isAvailable
                ? "bg-[#F62C7D] text-white shadow-[0_4px_15px_rgba(246,44,125,0.35)] hover:shadow-[0_4px_20px_rgba(246,44,125,0.5)] hover:opacity-95"
                : "cursor-not-allowed bg-foreground/10 text-foreground/55",
            )}
          >
            Send Inquiry
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:max-w-2xl">
          {/* About */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-foreground">
              <div className="h-4 w-[3px] rounded-full bg-[#F62C7D]" /> About
            </h2>
            <p className="text-[14px] leading-relaxed text-foreground/65">{extra.bio}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: MapPin,  label: extra.location },
                { icon: Globe2,  label: extra.website  },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[12px] text-foreground/50">
                  <Icon className="size-3.5 shrink-0 text-foreground/55" />
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-foreground">
              <div className="h-4 w-[3px] rounded-full bg-[#F62C7D]" /> Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[#F62C7D]/20 bg-[#F62C7D]/8 px-4 py-1.5 text-[13px] font-medium text-[#F62C7D]/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Portfolio */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-foreground">
              <div className="h-4 w-[3px] rounded-full bg-[#F62C7D]" /> Portfolio
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {extra.portfolio.map((src, i) => (
                <div
                  key={i}
                  className="group aspect-square overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <img
                    src={src}
                    alt={`Portfolio ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Rating summary */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-foreground">
              <div className="h-4 w-[3px] rounded-full bg-[#F62C7D]" /> Reviews
            </h2>
            <div className="mb-4 flex items-center gap-4">
              <p className="text-[52px] font-bold leading-none text-foreground">{freelancer.rating}</p>
              <div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className={cn("size-5", i <= Math.round(freelancer.rating) ? "fill-amber-400 text-amber-400" : "text-foreground/45")} />
                  ))}
                </div>
                <p className="mt-1 text-[13px] text-foreground/45">{freelancer.projects} completed projects</p>
              </div>
            </div>
            {[
              { label: "Communication",   pct: 98 },
              { label: "Quality of Work", pct: Math.round(freelancer.rating * 20) },
              { label: "On Time",         pct: 95 },
              { label: "Value for Money", pct: 92 },
            ].map(({ label, pct }) => (
              <div key={label} className="mb-2.5">
                <div className="mb-1 flex items-center justify-between text-[12px]">
                  <span className="text-foreground/55">{label}</span>
                  <span className="font-medium text-foreground/70">{pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-foreground/8">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-sidebar/90 px-4 py-3 backdrop-blur-xl xl:left-[72px]">
        <button
          disabled={!isAvailable}
          className={cn(
            "h-[46px] w-full rounded-full text-[14px] font-semibold transition-all",
            isAvailable
              ? "bg-[#F62C7D] text-white shadow-[0_4px_15px_rgba(246,44,125,0.4)] hover:shadow-[0_4px_20px_rgba(246,44,125,0.55)] hover:opacity-95"
              : "cursor-not-allowed bg-foreground/10 text-foreground/55",
          )}
        >
          {isAvailable ? `Send Inquiry · ${extra.hourlyRate}` : "Currently Unavailable"}
        </button>
      </div>
    </div>
  );
}
