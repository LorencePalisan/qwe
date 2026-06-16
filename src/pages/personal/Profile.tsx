import { useState } from "react";
import {
  Phone,
  Globe2,
  MapPin,
  Shield,
  Eye,
  EyeOff,
  Pencil,
  Check,
  X,
} from "@/icons";
import { cn } from "@/lib/utils";

const TAB =
  "flex-1 rounded-[8px] py-2 text-[13.6px] font-semibold transition-all";
const LABEL =
  "text-[12px] font-medium text-foreground/50 uppercase tracking-wide";
const VAL = "mt-1 text-[14px] text-foreground";
const INPUT =
  "h-[46px] w-full rounded-[10px] border border-border bg-card px-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/15 transition-all";

// Static profile data
const PROFILE = {
  name: "Lorence Palisan",
  username: "@lorencepalisan",
  bio: "Designer & builder. Living at the intersection of tech and creativity.",
  location: "Manila, Philippines",
  phone: "+63 917 123 4567",
  website: "lorencepalisan.com",
  address: "Makati City, Metro Manila",
  social: {
    instagram: "@lorencepalisan",
    twitter: "@lorencepalisan",
    facebook: "lorencepalisan",
    linkedin: "lorencepalisan",
  },
  interests: ["Design", "Technology", "Music", "Travel", "Photography"],
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  banner:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
};

function EditableSection({
  title,
  children,
  onSave,
}: {
  title: string;
  children: (editing: boolean) => React.ReactNode;
  onSave?: () => void;
}) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="rounded-[14px] border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
        {editing ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                onSave?.();
                setEditing(false);
              }}
              className="flex size-8 items-center justify-center rounded-lg bg-[#F62C7D]/15 text-[#F62C7D] hover:bg-[#F62C7D]/25"
            >
              <Check className="size-4" />
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex size-8 items-center justify-center rounded-lg bg-foreground/8 text-foreground/60 hover:bg-foreground/15"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex size-8 items-center justify-center rounded-lg bg-foreground/8 text-foreground/60 hover:bg-foreground/15"
          >
            <Pencil className="size-4" />
          </button>
        )}
      </div>
      {children(editing)}
    </div>
  );
}

function OtpCard() {
  const [step, setStep] = useState<
    "idle" | "enter_phone" | "enter_otp" | "enabled"
  >("idle");
  const [phone, setPhone] = useState("");
  const [digits, setDigits] = useState(Array(6).fill(""));

  return (
    <div className="rounded-[14px] border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#F62C7D]/15">
          <Shield className="size-5 text-[#F62C7D]" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">
            OTP Authentication
          </h3>
          <p className="text-[12px] text-foreground/50">
            Add phone-based 2-factor login
          </p>
        </div>
        {step === "enabled" && (
          <span className="ml-auto rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
            Enabled
          </span>
        )}
      </div>

      {step === "idle" && (
        <button
          onClick={() => setStep("enter_phone")}
          className="h-11 w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-foreground transition-opacity hover:opacity-90"
        >
          Enable OTP
        </button>
      )}

      {step === "enter_phone" && (
        <div className="flex flex-col gap-3">
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={INPUT}
          />
          <button
            onClick={() => setStep("enter_otp")}
            className="h-[44px] w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-foreground hover:opacity-90"
          >
            Send OTP
          </button>
        </div>
      )}

      {step === "enter_otp" && (
        <div className="flex flex-col gap-3">
          <p className="text-[13px] text-foreground/60">
            Enter the 6-digit code sent to {phone}
          </p>
          <div className="flex gap-2">
            {digits.map((d, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => {
                  const n = [...digits];
                  n[i] = e.target.value.replace(/\D/g, "").slice(-1);
                  setDigits(n);
                }}
                className="h-[52px] w-full rounded-[10px] border border-border bg-card text-center text-[20px] font-bold text-foreground focus:border-[#F62C7D]/70 focus:outline-none"
              />
            ))}
          </div>
          <button
            onClick={() => setStep("enabled")}
            className="h-[44px] w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-foreground hover:opacity-90"
          >
            Verify & Enable
          </button>
        </div>
      )}

      {step === "enabled" && (
        <button
          onClick={() => setStep("idle")}
          className="h-[44px] w-full rounded-full border border-red-500/30 bg-red-500/10 text-[14px] font-semibold text-red-400 hover:bg-red-500/20"
        >
          Disable OTP
        </button>
      )}
    </div>
  );
}

export default function PersonalProfile() {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [name, setName] = useState(PROFILE.name);
  const [bio, setBio] = useState(PROFILE.bio);
  const [location, setLocation] = useState(PROFILE.location);
  const [phone, setPhone] = useState(PROFILE.phone);
  const [website, setWebsite] = useState(PROFILE.website);
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen pb-16">
      {/* Banner */}
      <div className="relative h-40 overflow-hidden sm:h-52">
        <img
          src={PROFILE.banner}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Avatar row */}
        <div className="relative z-9 -mt-12 mb-4 flex items-end gap-4">
          <div className="size-24 overflow-hidden rounded-full border-4 border-background">
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mb-1">
            <h1 className="text-[20px] font-bold text-foreground">
              {PROFILE.name}
            </h1>
            <p className="text-[13px] text-foreground/50">{PROFILE.username}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-[10px] border border-border bg-card p-1">
          {(["profile", "security"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={cn(
                TAB,
                activeTab === t
                  ? "bg-[#F62C7D] text-foreground"
                  : "text-foreground/60 hover:text-foreground",
              )}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="flex flex-col gap-4 xl:max-w-2xl">
            {/* Basic Info */}
            <EditableSection title="Basic Info">
              {(editing) =>
                editing ? (
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className={LABEL}>Name</label>
                      <input
                        className={cn(INPUT, "mt-1")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>Bio</label>
                      <textarea
                        className={cn(INPUT, "mt-1 h-20 resize-none py-3")}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>Location</label>
                      <input
                        className={cn(INPUT, "mt-1")}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className={LABEL}>Name</p>
                      <p className={VAL}>{name}</p>
                    </div>
                    <div>
                      <p className={LABEL}>Bio</p>
                      <p className={cn(VAL, "leading-relaxed")}>{bio}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-foreground/60" />
                      <p className="text-[14px] text-foreground/70">
                        {location}
                      </p>
                    </div>
                  </div>
                )
              }
            </EditableSection>

            {/* Contact */}
            <EditableSection title="Contact">
              {(editing) =>
                editing ? (
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className={LABEL}>Phone</label>
                      <input
                        className={cn(INPUT, "mt-1")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>Website</label>
                      <input
                        className={cn(INPUT, "mt-1")}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 text-foreground/60" />
                      <p className="text-[14px] text-foreground/70">{phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe2 className="size-4 text-foreground/60" />
                      <p className="text-[14px] text-foreground/70">
                        {website}
                      </p>
                    </div>
                  </div>
                )
              }
            </EditableSection>

            {/* Social Links */}
            <EditableSection title="Social Links">
              {(editing) =>
                editing ? (
                  <div className="flex flex-col gap-3">
                    {Object.entries(PROFILE.social).map(([k, v]) => (
                      <div key={k}>
                        <label className={LABEL}>
                          {k.charAt(0).toUpperCase() + k.slice(1)}
                        </label>
                        <input className={cn(INPUT, "mt-1")} defaultValue={v} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        icon: Globe2,
                        label: "Instagram",
                        val: PROFILE.social.instagram,
                      },
                      {
                        icon: Globe2,
                        label: "Facebook",
                        val: PROFILE.social.facebook,
                      },
                      {
                        icon: Globe2,
                        label: "LinkedIn",
                        val: PROFILE.social.linkedin,
                      },
                    ].map(({ icon: Icon, label, val }) => (
                      <div key={label} className="flex items-center gap-2">
                        <Icon className="size-4 text-foreground/60" />
                        <span className="text-[13px] text-foreground/70">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              }
            </EditableSection>

            {/* Interests */}
            <EditableSection title="Interests">
              {() => (
                <div className="flex flex-wrap gap-2">
                  {PROFILE.interests.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#F62C7D]/30 bg-[#F62C7D]/10 px-3 py-1 text-[12px] text-[#F62C7D]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </EditableSection>
          </div>
        )}

        {activeTab === "security" && (
          <div className="flex flex-col gap-4 xl:max-w-2xl">
            <OtpCard />

            {/* Change Password */}
            <div className="rounded-[14px] border border-border bg-card p-5">
              <h3 className="mb-4 text-[15px] font-semibold text-foreground">
                Change Password
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  "Current password",
                  "New password",
                  "Confirm new password",
                ].map((label, i) => (
                  <div key={label}>
                    <label className={cn(LABEL, "mb-1 block")}>{label}</label>
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        className={cn(INPUT, "pr-10")}
                      />
                      {i === 0 && (
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                        >
                          {showPw ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button className="mt-1 h-[44px] w-full rounded-full bg-[#F62C7D] text-[14px] font-semibold text-foreground hover:opacity-90">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
