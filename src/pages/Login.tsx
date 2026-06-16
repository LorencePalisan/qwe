import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "@/icons";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

// ── Constants ─────────────────────────────────────────────────────────────────

const OTP_LENGTH      = 6;
const RESEND_COOLDOWN = 60;

// SPA fallback — dynamic-route stub patterns for CDN-served index.html
const ROUTE_STUBS = [
  { re: /^\/personal\/freelance\/([^/]+)$/,  key: "whodini_nav__freelancer", stub: "/personal/freelance/preview"     },
  { re: /^\/personal\/business\/([^/]+)$/,   key: "whodini_nav__business",   stub: "/personal/business/preview"      },
  { re: /^\/personal\/agency\/([^/]+)$/,     key: "whodini_nav__agency",     stub: "/personal/agency/preview"        },
  { re: /^\/personal\/organizers\/([^/]+)$/, key: "whodini_nav__organizer",  stub: "/personal/organizers/preview"    },
  { re: /^\/business\/workspace\/([^/]+)$/,  key: "whodini_nav__workspace",  stub: "/business/workspace/__loading__" },
] as const;

// ── Shared styles ─────────────────────────────────────────────────────────────

const LABEL = "text-[13.6px] font-medium text-foreground/80";
const INPUT =
  "h-[53px] w-full rounded-[10px] border border-border bg-foreground/6 px-[18px] text-[15.2px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/80 focus:outline-none focus:ring-[3px] focus:ring-[#F62C7D]/15 transition-all";
const BTN_PRIMARY =
  "h-[48px] w-full rounded-full bg-[#F62C7D] text-[14.4px] font-semibold text-white shadow-[rgba(246,44,125,0.35)_0px_4px_20px_0px] transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50";

// ── Component ─────────────────────────────────────────────────────────────────

export default function Login() {
  const navigate    = useNavigate();
  const { theme }   = useTheme();

  // ── On mount: SPA fallback ───────────────────────────────────────────────
  useEffect(() => {
    const path = window.location.pathname;
    if (!path || path === "/") return;

    const SPA_PATH = "whodini_spa_path";
    const SPA_TS   = "whodini_spa_ts";
    const LOOP_MS  = 5_000;

    const stored = sessionStorage.getItem(SPA_PATH);
    const ts     = Number(sessionStorage.getItem(SPA_TS) || "0");

    if (stored === path && Date.now() - ts < LOOP_MS) {
      sessionStorage.removeItem(SPA_PATH);
      sessionStorage.removeItem(SPA_TS);
      navigate("/not-found", { replace: true });
      return;
    }

    const match = ROUTE_STUBS.find(({ re }) => re.test(path));
    let target: string;

    if (match) {
      const [, id] = path.match(match.re)!;
      sessionStorage.setItem(match.key, id);
      target = match.stub;
      sessionStorage.setItem(SPA_PATH, match.stub); // write stub, not real UUID
    } else {
      target = path;
      sessionStorage.setItem(SPA_PATH, path);
    }

    sessionStorage.setItem(SPA_TS, String(Date.now()));
    navigate(target, { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── On mount: session check ──────────────────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem("whodini_session");
    if (!raw) return;
    try {
      const { token, expiresAt } = JSON.parse(raw) as { token: string; expiresAt: number };
      if (!token || Date.now() >= expiresAt) {
        localStorage.removeItem("whodini_session");
        return;
      }
      const params   = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");
      const current  = window.location.pathname;
      const dest     = redirect ? decodeURIComponent(redirect) : current !== "/" ? current : "/personal";
      navigate(dest, { replace: true });
    } catch {
      localStorage.removeItem("whodini_session");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tab ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<"password" | "otp">("password");

  // ── Password tab state ───────────────────────────────────────────────────
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [pwError,     setPwError]     = useState<string | null>(null);
  const [isPwLoading, setIsPwLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setIsPwLoading(true);
    // Dev stub: accept any credentials and store a session
    localStorage.setItem("whodini_session", JSON.stringify({
      token: "dev-token",
      expiresAt: Date.now() + 86_400_000, // 24 h
      displayName: email.split("@")[0] || "Whodini User",
      accountId: "WH-0001",
      roles: [
        { accountType: "personal",  index: 0 },
        { accountType: "business",  index: 1 },
        { accountType: "freelance", index: 2 },
        { accountType: "community", index: 3 },
      ],
      activeRoleIndex: 0,
    }));
    const params   = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    navigate(redirect ? decodeURIComponent(redirect) : "/personal", { replace: true });
    setIsPwLoading(false);
  };

  // ── OTP tab state ────────────────────────────────────────────────────────
  const [otpStep,        setOtpStep]        = useState<"enter_phone" | "enter_code">("enter_phone");
  const [phone,          setPhone]          = useState("");
  const [otpDigits,      setOtpDigits]      = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpError,       setOtpError]       = useState<string | null>(null);
  const [isSendingOtp,   setIsSendingOtp]   = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpFull   = otpDigits.every((d) => d.length === 1);

  // Tick the resend countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCooldown]);

  const handleSendOtp = () => {
    if (!phone.trim()) return;
    setIsSendingOtp(true);
    setOtpError(null);
    // TODO: sendLoginOtp(phone)
    //       .then(() => { ... })
    //       .catch(err => setOtpError(err.message))
    //       .finally(() => setIsSendingOtp(false));
    setOtpStep("enter_code");
    setResendCooldown(RESEND_COOLDOWN);
    setTimeout(() => digitRefs.current[0]?.focus(), 50);
    setIsSendingOtp(false);
  };

  const handleVerifyOtp = () => {
    if (!otpFull) return;
    setIsVerifyingOtp(true);
    setOtpError(null);
    // Dev stub: accept any OTP code
    localStorage.setItem("whodini_session", JSON.stringify({
      token: "dev-token",
      expiresAt: Date.now() + 86_400_000,
      displayName: "Whodini User",
      accountId: "WH-0001",
      roles: [
        { accountType: "personal",  index: 0 },
        { accountType: "business",  index: 1 },
        { accountType: "freelance", index: 2 },
        { accountType: "community", index: 3 },
      ],
      activeRoleIndex: 0,
    }));
    const params   = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    navigate(redirect ? decodeURIComponent(redirect) : "/personal", { replace: true });
    setIsVerifyingOtp(false);
  };

  const handleResendOtp = () => {
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setOtpError(null);
    handleSendOtp();
  };

  // OTP digit input handlers
  const updateDigit = (i: number, val: string) =>
    setOtpDigits((prev) => { const next = [...prev]; next[i] = val; return next; });

  const handleDigitChange = (i: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    updateDigit(i, digit);
    if (digit && i < OTP_LENGTH - 1) digitRefs.current[i + 1]?.focus();
  };

  const handleDigitKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otpDigits[i]) updateDigit(i, "");
      else if (i > 0) digitRefs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft"  && i > 0)              digitRefs.current[i - 1]?.focus();
    else if   (e.key === "ArrowRight" && i < OTP_LENGTH - 1) digitRefs.current[i + 1]?.focus();
    else if   (e.key === "Enter" && otpFull)                  handleVerifyOtp();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next   = Array(OTP_LENGTH).fill("");
    digits.split("").forEach((d, i) => { next[i] = d; });
    setOtpDigits(next);
    digitRefs.current[Math.min(digits.length - 1, OTP_LENGTH - 1)]?.focus();
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <img
        src={theme === "dark" ? "/whodini-dark.webp" : "/whodini-light.webp"}
        alt="Whodini"
        className="mb-10 h-14 w-auto"
      />

      <div className="w-full max-w-[440px] rounded-[16px] border border-border bg-card p-8 backdrop-blur-sm">
        <h1 className="mb-2 text-[28px] font-bold text-foreground">Welcome back</h1>
        <p className="mb-8 text-[14px] text-foreground/60">Sign in to your Whodini account</p>

        {/* Tab switcher */}
        <div className="mb-8 flex rounded-[10px] border border-border bg-foreground/6 p-1">
          {(["password", "otp"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-[8px] py-2 text-[13.6px] font-semibold transition-all",
                activeTab === tab ? "bg-[#F62C7D] text-white" : "text-foreground/60 hover:text-foreground",
              )}
            >
              {tab === "password" ? "Password" : "OTP via Phone"}
            </button>
          ))}
        </div>

        {/* ── Password tab ─────────────────────────────────────────── */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className={LABEL}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className={LABEL}>Password</label>
                <Link to="/forgot-password" className="text-[13.6px] text-[#F62C7D] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(INPUT, "pr-12")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/55 hover:text-foreground"
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {pwError && (
              <p className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13.6px] text-red-400">
                {pwError}
              </p>
            )}

            <button type="submit" disabled={isPwLoading} className={cn(BTN_PRIMARY, "mt-2")}>
              {isPwLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        )}

        {/* ── OTP tab ──────────────────────────────────────────────── */}
        {activeTab === "otp" && (
          <div className="flex flex-col gap-4">

            {/* Sub-step 1 — Enter phone */}
            {otpStep === "enter_phone" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className={LABEL}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                    className={INPUT}
                  />
                  <p className="text-[12px] text-foreground/60">Include your country code (e.g. +1 for US)</p>
                </div>

                {otpError && (
                  <p className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13.6px] text-red-400">
                    {otpError}
                  </p>
                )}

                <button
                  onClick={handleSendOtp}
                  disabled={!phone.trim() || isSendingOtp}
                  className={BTN_PRIMARY}
                >
                  {isSendingOtp ? "Sending…" : "Send OTP"}
                </button>
              </>
            )}

            {/* Sub-step 2 — Enter code */}
            {otpStep === "enter_code" && (
              <>
                {/* Phone row with Change button */}
                <div className="flex items-center justify-between rounded-[10px] border border-border bg-foreground/6 px-4 py-3">
                  <span className="text-[14px] text-foreground/80">{phone}</span>
                  <button
                    onClick={() => {
                      setOtpStep("enter_phone");
                      setOtpDigits(Array(OTP_LENGTH).fill(""));
                      setOtpError(null);
                    }}
                    className="text-[13.6px] font-medium text-[#F62C7D] hover:underline"
                  >
                    Change
                  </button>
                </div>

                <p className="text-[13.6px] text-foreground/60">
                  Enter the 6-digit code sent to your phone.
                </p>

                {/* 6 digit boxes */}
                <div className="flex gap-2">
                  {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => { digitRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otpDigits[i]}
                      onChange={(e) => handleDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleDigitKeyDown(i, e)}
                      onPaste={i === 0 ? handlePaste : undefined}
                      className="h-[56px] w-full rounded-[10px] border border-border bg-foreground/6 text-center text-[22px] font-bold text-foreground caret-[#F62C7D] transition-all focus:border-[#F62C7D]/80 focus:outline-none focus:ring-[3px] focus:ring-[#F62C7D]/15"
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13.6px] text-red-400">
                    {otpError}
                  </p>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={!otpFull || isVerifyingOtp}
                  className={BTN_PRIMARY}
                >
                  {isVerifyingOtp ? "Verifying…" : "Verify & Sign In"}
                </button>

                <button
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                  className="text-center text-[13.6px] font-medium text-foreground/60 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:text-foreground/30"
                >
                  {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
                </button>
              </>
            )}

          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-[13.6px] text-foreground/60">
          New to Whodini?{" "}
          <Link to="/register" className="font-medium text-foreground hover:text-[#F62C7D]">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
