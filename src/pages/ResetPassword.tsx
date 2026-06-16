import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, CheckCircle2, ArrowLeft } from "@/icons";
import { cn } from "@/lib/utils";

const LABEL =
  "text-[13.6px] font-medium text-white/80";
const INPUT =
  "h-[53px] w-full rounded-[10px] border border-white/12 bg-white/6 px-[18px] text-[15.2px] text-white placeholder:text-white/50 focus:border-[#F62C7D]/80 focus:outline-none focus:ring-[3px] focus:ring-[#F62C7D]/15 transition-all";
const BTN_PRIMARY =
  "h-[48px] w-full rounded-full bg-[#F62C7D] text-[14.4px] font-semibold text-white shadow-[rgba(246,44,125,0.35)_0px_4px_20px_0px] transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50";

export default function ResetPassword() {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";
  const hasValidParams = token.length > 0 && email.length > 0;

  const [mounted,          setMounted]          = useState(false);
  const [password,         setPassword]         = useState("");
  const [confirmation,     setConfirmation]     = useState("");
  const [showPassword,     setShowPassword]     = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [done,             setDone]             = useState(false);
  const [isPending,        setIsPending]        = useState(false);
  const [mutationError,    setMutationError]    = useState<string | null>(null);

  // Guard: redirect to /forgot-password if params are missing after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!hasValidParams) navigate("/forgot-password", { replace: true });
  }, [mounted, hasValidParams, navigate]);

  const passwordsMatch = password === confirmation;
  const canSubmit      = password.length >= 8 && passwordsMatch && !isPending;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setMutationError(null);
    setIsPending(true);
    // TODO: resetPassword({ email, token, password, password_confirmation: confirmation })
    //       .then(() => {
    //         setDone(true);
    //         setTimeout(() => navigate("/"), 3000);
    //       })
    //       .catch(err => setMutationError(err.message))
    //       .finally(() => setIsPending(false));
    setDone(true);
    setTimeout(() => navigate("/"), 3000);
    setIsPending(false);
  };

  // Pre-hydration placeholder
  if (!mounted) return null;

  // Waiting for redirect when params are invalid
  if (!hasValidParams) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[14px] text-white/50">Verifying link…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <img src="/whodini.webp" alt="Whodini" className="mb-10 h-14 w-auto" />

      <div className="w-full max-w-[440px] rounded-[16px] border border-white/12 bg-white/10 p-8 backdrop-blur-sm">

        {!done ? (
          <>
            <h1 className="mb-2 text-[28px] font-bold text-white">Set new password</h1>
            <p className="mb-8 text-[14px] text-[#999]">
              Resetting password for{" "}
              <span className="font-medium text-white">{email}</span>.
            </p>

            <div className="flex flex-col gap-4">
              {/* New password */}
              <div className="flex flex-col gap-2">
                <label className={LABEL}>New password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(INPUT, "pr-12")}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-2">
                <label className={LABEL}>Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirmation ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className={cn(INPUT, "pr-12")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmation((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showConfirmation ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {confirmation.length > 0 && !passwordsMatch && (
                  <p className="text-[12px] text-red-400">Passwords do not match.</p>
                )}
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
                {isPending ? "Saving…" : "Reset password"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="size-8 text-emerald-400" />
            </div>
            <h1 className="text-[24px] font-bold text-white">Password reset!</h1>
            <p className="text-[14px] text-[#999]">Redirecting to sign in…</p>

            <Link
              to="/"
              className={cn(BTN_PRIMARY, "mt-4 flex items-center justify-center")}
            >
              Go to sign in
            </Link>
          </div>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-8 flex items-center gap-2 text-[13.6px] text-white/50 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>
    </div>
  );
}
