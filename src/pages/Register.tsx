import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { User, Briefcase, Building2, Users, Eye, EyeOff, Lock, Check, Upload } from "@/icons";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import NdaModal from "@/components/auth/NdaModal";

// ── Data ──────────────────────────────────────────────────────────────────────

const VISIBLE_ACCOUNT_TYPES = [
  { id: "personal",  label: "Personal",         description: "Manage subscriptions & memberships", icon: User,      locked: true  },
  { id: "freelance", label: "Freelance",         description: "Offer services & manage clients",   icon: Briefcase, locked: false },
  { id: "business",  label: "Business / Brand",  description: "Send updates to subscribers",       icon: Building2, locked: false },
  { id: "community", label: "Community",         description: "Manage members & announcements",    icon: Users,     locked: false },
] as const;

const DOCUMENT_REQUIREMENTS: Record<string, { key: string; label: string; hint: string }[]> = {
  freelance: [
    { key: "govt_id",        label: "Government-Issued ID",           hint: "Passport, Driver's License, or National ID" },
    { key: "proof_of_skill", label: "Proof of Skill / Certification", hint: "Diploma, certificate, or relevant credential" },
  ],
  business: [
    { key: "privacy_policy",  label: "Privacy Policy",     hint: "PDF of your published privacy policy" },
    { key: "business_permit", label: "Business Permit",    hint: "Local government-issued business permit" },
    { key: "tax_document",    label: "Tax Document (BIR)", hint: "Certificate of Registration or TIN document" },
  ],
  community: [
    { key: "org_charter",      label: "Community Charter / Constitution", hint: "Founding document or bylaws" },
    { key: "sec_registration", label: "SEC / NGO Registration",           hint: "Government registration certificate" },
    { key: "tax_exempt",       label: "Tax Exemption Certificate",        hint: "BIR tax exemption ruling, if applicable" },
  ],
};

// ── Shared styles ─────────────────────────────────────────────────────────────

const LABEL = "text-[13.6px] font-medium text-foreground/80";
const INPUT =
  "h-[53px] w-full rounded-[10px] border border-border bg-foreground/6 px-[18px] text-[15.2px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/80 focus:outline-none focus:ring-[3px] focus:ring-[#F62C7D]/15 transition-all";

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ step, title }: { step: number; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex size-6 items-center justify-center rounded-full bg-[#F62C7D]/20 text-[11px] font-bold text-[#F62C7D]">
        {step}
      </div>
      <h2 className="text-[17.6px] font-bold text-foreground">{title}</h2>
    </div>
  );
}

function DocFileInput({
  label,
  hint,
  onFileChange,
}: {
  label: string;
  hint: string;
  onFileChange: (file: File | null) => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <p className={LABEL}>{label}</p>
      <p className="text-[12px] text-foreground/60">{hint}</p>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="flex h-[48px] items-center gap-2 rounded-[10px] border border-dashed border-border bg-foreground/6 px-4 text-[13.6px] text-foreground/60 transition-all hover:border-[#F62C7D]/50 hover:text-foreground/80"
      >
        <Upload className="size-4 shrink-0 text-[#F62C7D]" />
        <span className="truncate">{fileName ?? "Choose file"}</span>
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setFileName(file?.name ?? null);
          onFileChange(file);
        }}
      />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Register() {
  const { theme } = useTheme();

  // NDA
  const [ndaAccepted, setNdaAccepted]   = useState(false);
  const [ndaModalOpen, setNdaModalOpen] = useState(true); // auto-open on mount

  // Personal details
  const [name,            setName]            = useState("");
  const [email,           setEmail]           = useState("");
  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword,        setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Account types — personal always selected
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["personal"]);

  // Documents: { [typeId]: { [docKey]: File | null } }
  const [documents, setDocuments] = useState<Record<string, Record<string, File | null>>>({});

  const [isSaving, setIsSaving] = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const hasNonPersonal = selectedTypes.some((t) => t !== "personal");

  // ── Handlers ───────────────────────────────────────────────────────────────

  const toggleType = (typeId: string) => {
    if (typeId === "personal") return;
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes((prev) => prev.filter((t) => t !== typeId));
      setDocuments((prev) => { const copy = { ...prev }; delete copy[typeId]; return copy; });
    } else {
      setSelectedTypes((prev) => [...prev, typeId]);
    }
  };

  const setDocFile = (typeId: string, docKey: string, file: File | null) => {
    setDocuments((prev) => ({
      ...prev,
      [typeId]: { ...(prev[typeId] ?? {}), [docKey]: file },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!ndaAccepted) {
      setError("You must accept the NDA before creating your account.");
      setNdaModalOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSaving(true);
    // TODO: registerUser({ name, email, password, password_confirmation: confirmPassword, accountTypes: selectedTypes, documents })
    //       .then(() => navigate("/dashboard"))
    //       .catch((err) => setError(err.message))
    //       .finally(() => setIsSaving(false));
    void documents;
    setIsSaving(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
      <NdaModal
        open={ndaModalOpen}
        onAccept={() => { setNdaAccepted(true); setNdaModalOpen(false); }}
        onClose={() => setNdaModalOpen(false)}
      />

      {/* Logo */}
      <div className="mb-10 flex justify-center">
        <img
          src={theme === "dark" ? "/whodini-dark.webp" : "/whodini-light.webp"}
          alt="Whodini"
          className="h-14 w-auto"
        />
      </div>

      {/* Outer max-width container */}
      <div className={cn("mx-auto", hasNonPersonal ? "max-w-[1400px]" : "max-w-[720px]")}>

        {/* Inner flex: column on mobile, row on xl when docs panel is open */}
        <div
          className={cn(
            "flex gap-6",
            hasNonPersonal ? "flex-col xl:flex-row xl:items-start" : "flex-col",
          )}
        >

          {/* ── Main form ────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1 rounded-[16px] border border-border bg-card p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
            <h1 className="mb-1.5 text-[28px] font-bold text-foreground">Create your account</h1>
            <p className="mb-8 text-[14px] text-foreground/60">Fill in your details to get started</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              {/* Step 1 — Personal Details */}
              <div>
                <SectionTitle step={1} title="Personal Details" />
                <div className="flex flex-col gap-4">

                  <div className="flex flex-col gap-2">
                    <label className={LABEL}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={INPUT}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={LABEL}>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={INPUT}
                    />
                  </div>

                  {/* Password + Confirm side-by-side on sm+ */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className={LABEL}>Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={cn(INPUT, "pr-12")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/55 hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className={LABEL}>Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={cn(INPUT, "pr-12")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/55 hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Step 2 — Account Types */}
              <div>
                <SectionTitle step={2} title="Account Types" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {VISIBLE_ACCOUNT_TYPES.map(({ id, label, description, icon: Icon, locked }) => {
                    const selected = selectedTypes.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleType(id)}
                        className={cn(
                          "flex flex-col gap-3 rounded-[12px] border p-4 text-left transition-all",
                          selected
                            ? "border-[#F62C7D]/50 bg-[#F62C7D]/10"
                            : "border-border bg-foreground/6 hover:border-foreground/20 hover:bg-foreground/8",
                          locked && "cursor-default",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={cn(
                              "flex size-9 items-center justify-center rounded-lg",
                              selected ? "bg-[#F62C7D]/20" : "bg-foreground/10",
                            )}
                          >
                            <Icon
                              className={cn(
                                "size-4",
                                selected ? "text-[#F62C7D]" : "text-foreground/60",
                              )}
                            />
                          </div>
                          <div
                            className={cn(
                              "flex size-5 items-center justify-center rounded-full border",
                              selected ? "border-[#F62C7D] bg-[#F62C7D]" : "border-border",
                            )}
                          >
                            {selected && locked  && <Lock  className="size-2.5 text-white" />}
                            {selected && !locked && <Check className="size-3   text-white" />}
                          </div>
                        </div>
                        <div>
                          <p className={cn("text-[14px] font-semibold", selected ? "text-foreground" : "text-foreground/70")}>
                            {label}
                          </p>
                          <p className="mt-0.5 text-[12px] text-foreground/60">{description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13.6px] text-red-400">
                  {error}
                </p>
              )}

              {/* Footer */}
              <div className="flex flex-col gap-3">
                {!ndaAccepted && (
                  <div className="flex items-center justify-between rounded-[10px] border border-[#F62C7D]/20 bg-[#F62C7D]/10 px-4 py-3">
                    <p className="text-[13.6px] text-foreground/70">
                      You must accept the NDA before submitting.
                    </p>
                    <button
                      type="button"
                      onClick={() => setNdaModalOpen(true)}
                      className="shrink-0 pl-4 text-[13.6px] font-semibold text-[#F62C7D] hover:underline"
                    >
                      Review NDA
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSaving || !ndaAccepted}
                  className="h-[48px] rounded-full bg-[#F62C7D] text-[14.4px] font-semibold text-white shadow-[rgba(246,44,125,0.35)_0px_4px_20px_0px] transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? "Creating account…" : "Create Account"}
                </button>

                <p className="text-center text-[13.6px] text-foreground/60">
                  Already have an account?{" "}
                  <Link to="/" className="font-medium text-foreground hover:text-[#F62C7D]">
                    Sign in
                  </Link>
                </p>
              </div>

            </form>
          </div>

          {/* ── Document upload panel (conditional) ──────────────────── */}
          {hasNonPersonal && (
            <div className="w-full rounded-[16px] border border-border bg-card p-6 sm:p-8 backdrop-blur-sm xl:w-[460px] xl:shrink-0">
              <h2 className="mb-1.5 text-[17.6px] font-bold text-foreground">Required Documents</h2>
              <p className="mb-6 text-[13.6px] text-foreground/60">
                Upload the required files for each selected account type.
              </p>

              <div className="flex flex-col gap-4">
                {(["freelance", "business", "community"] as const).map((typeId) => {
                  if (!selectedTypes.includes(typeId)) return null;
                  const type = VISIBLE_ACCOUNT_TYPES.find((t) => t.id === typeId)!;
                  const Icon = type.icon;

                  return (
                    <div key={typeId} className="rounded-[12px] border border-border bg-foreground/6">
                      <div className="flex items-center gap-3 p-4">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[#F62C7D]/20">
                          <Icon className="size-4 text-[#F62C7D]" />
                        </div>
                        <p className="text-[14px] font-semibold text-foreground">{type.label}</p>
                      </div>
                      <div className="flex flex-col gap-5 border-t border-border p-4">
                        {DOCUMENT_REQUIREMENTS[typeId].map(({ key, label, hint }) => (
                          <DocFileInput
                            key={key}
                            label={label}
                            hint={hint}
                            onFileChange={(file) => setDocFile(typeId, key, file)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
