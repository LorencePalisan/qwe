import { useState } from "react";
import { Check } from "@/icons";
import { cn } from "@/lib/utils";

const INPUT = "h-[46px] w-full rounded-[10px] border border-border bg-card px-4 text-[14px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/70 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/15 transition-all";
const LABEL = "mb-1 block text-[12px] font-medium text-foreground/50 uppercase tracking-wide";
const TABS  = ["General", "Notifications"] as const;

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-2">
      <span className="text-[14px] text-foreground/80">{label}</span>
      <div onClick={onChange} className={cn("relative h-6 w-11 rounded-full transition-colors", checked ? "bg-[#F62C7D]" : "bg-foreground/20")}>
        <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform", checked ? "left-[22px]" : "left-0.5")} />
      </div>
    </label>
  );
}

export default function AgencySettings() {
  const [tab, setTab]         = useState<typeof TABS[number]>("General");
  const [saved, setSaved]     = useState(false);
  const [agencyName, setAgencyName]   = useState("Whodini Creative Agency");
  const [tagline, setTagline]         = useState("Ideas that move brands forward.");
  const [email, setEmail]             = useState("hello@whodini-agency.io");
  const [phone, setPhone]             = useState("+63 917 888 8888");
  const [website, setWebsite]         = useState("whodini-agency.io");
  const [address, setAddress]         = useState("BGC, Taguig City, Metro Manila");
  const [founded, setFounded]         = useState("2023");

  const [nInquiry, setNInquiry]     = useState(true);
  const [nContract, setNContract]   = useState(true);
  const [nPayment, setNPayment]     = useState(true);
  const [nPipeline, setNPipeline]   = useState(true);
  const [nTeam, setNTeam]           = useState(false);
  const [nReport, setNReport]       = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-foreground">Settings</h1>
        <p className="text-[14px] text-foreground/50">Manage your agency profile and preferences</p>
      </div>

      <div className="mb-6 flex rounded-[10px] border border-border bg-card p-1 xl:max-w-xs">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("flex-1 rounded-[8px] py-2 text-[13.6px] font-semibold transition-all", tab === t ? "bg-[#F62C7D] text-white" : "text-foreground/60 hover:text-foreground")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "General" && (
        <div className="flex flex-col gap-4 xl:max-w-2xl">
          <div className="rounded-[14px] border border-border bg-card p-5">
            <h2 className="mb-4 text-[15px] font-semibold text-foreground">Agency Info</h2>
            <div className="flex flex-col gap-4">
              <div><label className={LABEL}>Agency Name</label><input className={INPUT} value={agencyName} onChange={(e) => setAgencyName(e.target.value)} /></div>
              <div><label className={LABEL}>Tagline</label><input className={INPUT} value={tagline} onChange={(e) => setTagline(e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={LABEL}>Email</label><input type="email" className={INPUT} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><label className={LABEL}>Phone</label><input type="tel" className={INPUT} value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              </div>
              <div><label className={LABEL}>Website</label><input className={INPUT} value={website} onChange={(e) => setWebsite(e.target.value)} /></div>
              <div><label className={LABEL}>Address</label><input className={INPUT} value={address} onChange={(e) => setAddress(e.target.value)} /></div>
              <div><label className={LABEL}>Founded Year</label><input type="number" className={INPUT} value={founded} onChange={(e) => setFounded(e.target.value)} /></div>
            </div>
          </div>

          <div className="rounded-[14px] border border-border bg-card p-5">
            <h2 className="mb-4 text-[15px] font-semibold text-foreground">Specializations</h2>
            <div className="flex flex-col gap-3">
              {[
                "Brand Strategy", "Digital Marketing", "Social Media", "PR & Events",
                "Influencer Marketing", "Media Buying", "Creative Production", "Content Marketing",
              ].map((spec) => (
                <label key={spec} className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" defaultChecked={["Digital Marketing", "Social Media", "PR & Events", "Influencer Marketing"].includes(spec)} className="size-4 accent-[#F62C7D]" />
                  <span className="text-[14px] text-foreground/80">{spec}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className={cn("flex h-[44px] items-center justify-center gap-2 rounded-full text-[14px] font-semibold text-white transition-all", saved ? "bg-emerald-500" : "bg-[#F62C7D] hover:opacity-90")}
          >
            {saved ? <><Check className="size-4" /> Saved!</> : "Save Changes"}
          </button>
        </div>
      )}

      {tab === "Notifications" && (
        <div className="flex flex-col gap-4 xl:max-w-2xl">
          <div className="rounded-[14px] border border-border bg-card p-5">
            <h2 className="mb-4 text-[15px] font-semibold text-foreground">Email Notifications</h2>
            <div className="flex flex-col divide-y divide-border">
              <Toggle checked={nInquiry}  onChange={() => setNInquiry((v) => !v)}  label="New inquiry or lead received" />
              <Toggle checked={nContract} onChange={() => setNContract((v) => !v)} label="Contract signed or updated" />
              <Toggle checked={nPayment}  onChange={() => setNPayment((v) => !v)}  label="Payment received or overdue" />
              <Toggle checked={nPipeline} onChange={() => setNPipeline((v) => !v)} label="Pipeline stage changes" />
              <Toggle checked={nTeam}     onChange={() => setNTeam((v) => !v)}     label="Team updates (new member, leave)" />
              <Toggle checked={nReport}   onChange={() => setNReport((v) => !v)}   label="Weekly performance reports" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
