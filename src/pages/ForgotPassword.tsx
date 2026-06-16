import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "@/icons";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const LABEL =
  "text-[13.6px] font-medium text-foreground/80";
const INPUT =
  "h-[53px] w-full rounded-[10px] border border-border bg-foreground/6 px-[18px] text-[15.2px] text-foreground placeholder:text-foreground/55 focus:border-[#F62C7D]/80 focus:outline-none focus:ring-[3px] focus:ring-[#F62C7D]/15 transition-all";
const BTN_PRIMARY =
  "h-[48px] w-full rounded-full bg-[#F62C7D] text-[14.4px] font-semibold text-white shadow-[rgba(246,44,125,0.35)_0px_4px_20px_0px] transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [email,         setEmail]         = useState("");
  const [sent,          setSent]          = useState(false);
  const [isPending,     setIsPending]     = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 3 && email.includes("@") && !isPending;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setMutationError(null);
    setIsPending(true);
    // TODO: requestPasswordReset(email.trim())
    //       .then(() => setSent(true))
    //       .catch(err => setMutationError(err.message))
    //       .finally(() => setIsPending(false));
    setSent(true);
    setIsPending(false);
  };

  const handleReset = () => {
    setSent(false);
    setMutationError(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <img
        src={theme === "dark" ? "/whodini-dark.webp" : "/whodini-light.webp"}
        alt="Whodini"
        className="mb-10 h-14 w-auto"
      />

      <div className="w-full max-w-[440px] rounded-[16px] border border-border bg-card p-8 backdrop-blur-sm">

        {!sent ? (
          <>
            <h1 className="mb-2 text-[28px] font-bold text-foreground">Forgot password?</h1>
            <p className="mb-8 text-[14px] text-foreground/60">
              Enter your email and we'll send you a reset link.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className={LABEL}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className={INPUT}
                  autoFocus
                />
              </div>

              {mutationError && (
                <p className="rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13.6px] text-red-400">
                  {mutationError}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={cn(BTN_PRIMARY, "mt-2")}
              >
                {isPending ? "Sending…" : "Send reset link"}
              </button>

              <p className="text-center text-[13.6px] text-foreground/60">
                Remember your password?{" "}
                <Link to="/" className="font-medium text-foreground hover:text-[#F62C7D]">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="size-8 text-emerald-400" />
            </div>
            <h1 className="text-[24px] font-bold text-foreground">Check your email</h1>
            <p className="text-[14px] text-foreground/60">
              We sent a reset link to{" "}
              <span className="font-medium text-foreground">{email}</span>.
              <br />
              It may take a minute to arrive.
            </p>

            <p className="mt-2 text-[13.6px] text-foreground/60">
              Didn't receive it?{" "}
              <button
                onClick={handleReset}
                className="font-medium text-foreground hover:text-[#F62C7D]"
              >
                Try again
              </button>
            </p>

            <Link
              to="/"
              className={cn(BTN_PRIMARY, "mt-4 flex items-center justify-center")}
            >
              Back to sign in
            </Link>
          </div>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 flex items-center gap-2 text-[13.6px] text-foreground/55 transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </button>
    </div>
  );
}
