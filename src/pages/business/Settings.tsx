import { useState } from "react";
import { Upload, FileText, Shield, Copy, CheckCircle2 } from "@/icons";
import { cn } from "@/lib/utils";
import { BUSINESS_DASHBOARD } from "@/lib/mock/business";

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "general" | "documents" | "subscription" | "api";

const TABS: { value: Tab; label: string }[] = [
  { value: "general",      label: "General" },
  { value: "documents",    label: "Documents" },
  { value: "subscription", label: "Subscription" },
  { value: "api",          label: "API & Integrations" },
];

// ── General Tab ───────────────────────────────────────────────────────────────

function GeneralTab() {
  const [name,       setName]       = useState(BUSINESS_DASHBOARD.businessName);
  const [tagline,    setTagline]    = useState("Creative design studio for forward-thinking brands.");
  const [email,      setEmail]      = useState("hello@neonstudios.ph");
  const [phone,      setPhone]      = useState("+63 917 123 4567");
  const [website,    setWebsite]    = useState("https://neonstudios.ph");
  const [saved,      setSaved]      = useState(false);

  const inputCls = "h-[42px] w-full rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls = "mb-1.5 block text-[12px] font-medium text-foreground/60";

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Logo / Banner */}
      <div>
        <p className="mb-3 text-[13px] font-semibold text-foreground">Brand assets</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[{ label: "Logo", hint: "Recommended: 512×512 PNG" }, { label: "Banner", hint: "Recommended: 1200×400 PNG" }].map(({ label, hint }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-foreground/2 px-4 py-8">
              <Upload className="size-6 text-foreground/55" />
              <p className="text-[12px] font-medium text-foreground/50">Upload {label}</p>
              <p className="text-[11px] text-foreground/55">{hint}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business info */}
      <div className="space-y-3">
        <p className="text-[13px] font-semibold text-foreground">Business info</p>
        <div>
          <label className={labelCls}>Business name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Tagline</label>
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Short description of your business" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Website</label>
          <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" className={inputCls} />
        </div>
      </div>

      <button
        onClick={handleSave}
        className={cn(
          "flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all",
          saved ? "bg-emerald-600" : "bg-[#F62C7D] hover:opacity-90",
        )}
      >
        {saved ? <><CheckCircle2 className="size-4" /> Saved!</> : "Save changes"}
      </button>
    </div>
  );
}

// ── Documents Tab ─────────────────────────────────────────────────────────────

const MOCK_DOCS = [
  { id: "d1", name: "Service Agreement Template.pdf", size: "128 KB", addedAt: "2026-05-01" },
  { id: "d2", name: "Non-Disclosure Agreement.docx",  size: "64 KB",  addedAt: "2026-04-12" },
  { id: "d3", name: "Payment Terms.pdf",              size: "48 KB",  addedAt: "2026-03-20" },
];

function DocumentsTab() {
  const [docs, setDocs] = useState(MOCK_DOCS);

  return (
    <div className="space-y-4">
      <p className="text-[13px] text-foreground/55">Upload contracts, NDAs, and service agreements that can be attached to client inquiries.</p>

      {/* Upload zone */}
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-foreground/2 px-4 py-10">
        <Upload className="size-7 text-foreground/55" />
        <p className="text-[13px] font-medium text-foreground/50">Drag & drop or click to upload</p>
        <p className="text-[11px] text-foreground/55">PDF, DOCX — max 10 MB</p>
      </div>

      {/* Doc list */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {docs.map((doc, i) => (
          <div key={doc.id} className={cn("flex items-center gap-3 px-4 py-3.5", i !== docs.length - 1 && "border-b border-border")}>
            <FileText className="size-4 shrink-0 text-[#F62C7D]/60" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] font-medium text-foreground">{doc.name}</p>
              <p className="text-[11px] text-foreground/60">{doc.size} · Added {new Date(doc.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
            </div>
            <button
              onClick={() => setDocs((prev) => prev.filter((d) => d.id !== doc.id))}
              className="shrink-0 rounded-lg p-1.5 text-foreground/55 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
            >
              <FileText className="size-3.5" />
            </button>
          </div>
        ))}
        {docs.length === 0 && <p className="py-10 text-center text-[13px] text-foreground/60">No documents uploaded yet.</p>}
      </div>
    </div>
  );
}

// ── Subscription Tab ──────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "starter", name: "Starter", price: 0,
    features: ["Up to 3 services/products", "50 subscriber limit", "Basic analytics"],
    current: false,
  },
  {
    id: "pro", name: "Pro", price: 999,
    features: ["Unlimited catalog items", "Up to 500 subscribers", "Advanced analytics", "Priority support"],
    current: true,
  },
  {
    id: "agency", name: "Agency", price: 2499,
    features: ["Everything in Pro", "Unlimited subscribers", "Team roles", "API access", "White-label"],
    current: false,
  },
];

function SubscriptionTab() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-[#F62C7D]" />
          <p className="text-[13px] font-semibold text-foreground">Current plan: <span className="text-[#F62C7D]">Pro</span></p>
        </div>
        <p className="mt-1 text-[12px] text-foreground/50">Renews on July 15, 2026 · ₱999/month</p>
      </div>

      <div className="space-y-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "rounded-2xl border p-4 transition-colors",
              plan.current ? "border-[#F62C7D] bg-[#F62C7D]/3" : "border-border bg-card",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-bold text-foreground">{plan.name}</h3>
                  {plan.current && (
                    <span className="rounded-full bg-[#F62C7D]/12 px-2 py-0.5 text-[10px] font-semibold text-[#F62C7D]">Current</span>
                  )}
                </div>
                <p className="text-[13px] text-foreground/50">
                  {plan.price === 0 ? "Free" : `₱${plan.price.toLocaleString()}/month`}
                </p>
              </div>
              {!plan.current && (
                <button className="shrink-0 rounded-xl border border-[#F62C7D] px-3 py-1.5 text-[12px] font-semibold text-[#F62C7D] transition-colors hover:bg-[#F62C7D] hover:text-white">
                  {plan.price > 999 ? "Upgrade" : "Downgrade"}
                </button>
              )}
            </div>
            <ul className="mt-3 space-y-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[12px] text-foreground/60">
                  <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── API Tab ───────────────────────────────────────────────────────────────────

const MOCK_KEYS = [
  { id: "k1", name: "Production",  key: "wh_live_9x2k8mQ3nB7rTpL1cD5vY0", createdAt: "2026-04-01", lastUsed: "2026-06-14" },
  { id: "k2", name: "Staging",     key: "wh_test_4aJ7wRzHm2sXuEd6gN9pC3", createdAt: "2026-05-12", lastUsed: "2026-06-10" },
];

function ApiTab() {
  const [keys, setKeys] = useState(MOCK_KEYS);
  const [copied, setCopied] = useState<string | null>(null);

  function copyKey(id: string, key: string) {
    navigator.clipboard.writeText(key).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <p className="text-[12px] font-medium text-amber-700 dark:text-amber-400">Keep your API keys secret. Never share them in public repositories or client-side code.</p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-foreground">API Keys</p>
          <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-foreground/60 hover:bg-foreground/5">
            <span>+</span> Generate key
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {keys.map((k, i) => (
            <div key={k.id} className={cn("px-4 py-4", i !== keys.length - 1 && "border-b border-border")}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-foreground">{k.name}</p>
                <button
                  onClick={() => setKeys((prev) => prev.filter((x) => x.id !== k.id))}
                  className="text-[12px] font-medium text-red-500 hover:opacity-70"
                >
                  Revoke
                </button>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-foreground/3 px-3 py-2">
                <code className="flex-1 truncate font-mono text-[12px] text-foreground/60">
                  {k.key.slice(0, 18)}••••••••••••
                </code>
                <button
                  onClick={() => copyKey(k.id, k.key)}
                  className="shrink-0 text-foreground/60 transition-colors hover:text-foreground"
                >
                  {copied === k.id
                    ? <CheckCircle2 className="size-3.5 text-emerald-500" />
                    : <Copy className="size-3.5" />
                  }
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-foreground/55">
                Created {new Date(k.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · Last used {new Date(k.lastUsed).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks placeholder */}
      <div>
        <p className="mb-3 text-[13px] font-semibold text-foreground">Webhooks</p>
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
          <p className="text-[13px] font-medium text-foreground/60">Webhook endpoints coming soon</p>
          <p className="mt-1 text-[11px] text-foreground/55">Subscribe to real-time events from your account</p>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BusinessSettings() {
  const [tab, setTab] = useState<Tab>("general");

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-[22px] font-bold text-foreground">Settings</h1>
        <p className="text-[13px] text-foreground/50">Manage your business profile and preferences</p>
      </div>

      {/* Tab nav */}
      <div className="border-b border-border px-4 sm:px-6">
        <div className="flex gap-0 overflow-x-auto scrollbar-styled">
          {TABS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={cn(
                "shrink-0 border-b-2 px-4 py-3 text-[13px] font-medium transition-colors",
                tab === value
                  ? "border-[#F62C7D] text-[#F62C7D]"
                  : "border-transparent text-foreground/50 hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {tab === "general"      && <GeneralTab />}
          {tab === "documents"    && <DocumentsTab />}
          {tab === "subscription" && <SubscriptionTab />}
          {tab === "api"          && <ApiTab />}
        </div>
      </div>
    </div>
  );
}
