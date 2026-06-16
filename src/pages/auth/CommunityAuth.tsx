import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Users, Eye, EyeOff } from "@/icons";
import { cn } from "@/lib/utils";

const INPUT =
  "h-[53px] w-full rounded-[10px] border border-white/12 bg-white/6 px-[18px] text-[15.2px] text-white placeholder:text-white/50 focus:border-[#F62C7D]/80 focus:outline-none focus:ring-[3px] focus:ring-[#F62C7D]/15 transition-all";

export default function CommunityAuth() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <button
        onClick={() => navigate("/signup")}
        className="absolute left-8 top-8 flex items-center gap-2 text-[14px] text-white/60 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>

      <div className="w-full max-w-[440px] rounded-[16px] border border-white/12 bg-white/10 p-8 backdrop-blur-sm">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#F62C7D]/20">
            <Users className="size-4 text-[#F62C7D]" />
          </div>
          <span className="text-[13.6px] font-medium text-[#F62C7D]">Community Account</span>
        </div>

        <h1 className="mb-2 text-[28px] font-bold text-white">Create your account</h1>
        <p className="mb-8 text-[14px] text-[#999]">Set up your community on Whodini</p>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-[13.6px] font-medium text-white/80">Community Name</label>
            <input type="text" placeholder="Your community name" className={INPUT} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13.6px] font-medium text-white/80">Your Name</label>
            <input type="text" placeholder="Your full name" className={INPUT} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13.6px] font-medium text-white/80">Email</label>
            <input type="email" placeholder="you@example.com" className={INPUT} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13.6px] font-medium text-white/80">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={cn(INPUT, "pr-12")}
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

          <button
            type="submit"
            className="mt-2 h-[48px] rounded-full bg-[#F62C7D] text-[14.4px] font-semibold text-white shadow-[rgba(246,44,125,0.35)_0px_4px_20px_0px] transition-opacity hover:opacity-90 active:opacity-80"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-[13.6px] text-[#999]">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-white hover:text-[#F62C7D]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
