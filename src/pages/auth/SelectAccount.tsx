import type { ElementType } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Briefcase, Building2, Users, ChevronRight } from "@/icons";

const ACCOUNT_TYPES: {
  id: string;
  label: string;
  description: string;
  icon: ElementType;
  path: string;
}[] = [
  {
    id: "personal",
    label: "Personal",
    icon: User,
    description: "Manage your personal life, subscriptions, and connections in one place.",
    path: "/signup/personal",
  },
  {
    id: "freelance",
    label: "Freelance",
    icon: Briefcase,
    description: "Built for independent professionals and creative solopreneurs.",
    path: "/signup/freelance",
  },
  {
    id: "business",
    label: "Business",
    icon: Building2,
    description: "For teams and organizations looking to streamline their operations.",
    path: "/signup/business",
  },
  {
    id: "community",
    label: "Community",
    icon: Users,
    description: "Connect and grow your community with powerful management tools.",
    path: "/signup/community",
  },
];

export default function SelectAccount() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="mb-10 text-[28px] font-extrabold tracking-tight text-white">Whodini</div>

      <div className="mb-10 text-center">
        <h1 className="mb-3 text-[36px] font-bold leading-tight text-white">
          What brings you to Whodini?
        </h1>
        <p className="text-[16px] text-[#999]">Choose the account type that fits your needs</p>
      </div>

      <div className="grid w-full max-w-[640px] grid-cols-2 gap-5">
        {ACCOUNT_TYPES.map(({ id, label, icon: Icon, description, path }) => (
          <button
            key={id}
            onClick={() => navigate(path)}
            className="group flex flex-col gap-4 rounded-[14px] border border-white/12 bg-white/10 p-7 text-left transition-all hover:border-white/20 hover:bg-white/15"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#F62C7D]/20">
              <Icon className="size-6 text-[#F62C7D]" />
            </div>
            <div>
              <h3 className="mb-1.5 text-[17.6px] font-bold text-white">{label}</h3>
              <p className="text-[14px] leading-relaxed text-[#999]">{description}</p>
            </div>
            <div className="mt-auto flex items-center gap-1 text-[13.6px] font-semibold text-[#F62C7D]">
              Get started
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </div>

      <p className="mt-10 text-[14px] text-[#999]">
        Already have an account?{" "}
        <Link to="/" className="font-medium text-white transition-colors hover:text-[#F62C7D]">
          Sign in
        </Link>
      </p>
    </div>
  );
}
