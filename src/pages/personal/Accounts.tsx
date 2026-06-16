import { User, Briefcase, Building2, Users, Star, Globe2, Lock, CheckCircle2 } from "@/icons";
import { cn } from "@/lib/utils";

const ACCOUNT_TYPES = [
  { id: "personal",  label: "Personal",   icon: User,      desc: "Manage subscriptions & memberships", status: "approved", locked: true  },
  { id: "freelance", label: "Freelance",   icon: Briefcase, desc: "Offer services & manage clients",   status: "none",     locked: false },
  { id: "business",  label: "Business",   icon: Building2, desc: "Send updates to subscribers",       status: "none",     locked: false },
  { id: "community", label: "Community",  icon: Users,     desc: "Manage members & announcements",    status: "pending",  locked: false },
  { id: "organizer", label: "Organizer",  icon: Star,      desc: "Host and manage events",            status: "none",     locked: false },
  { id: "agency",    label: "Agency",     icon: Globe2,    desc: "Manage clients & team",             status: "none",     locked: false },
];

const STATUS_STYLE: Record<string, string> = {
  approved: "bg-emerald-500/15 text-emerald-400",
  pending:  "bg-amber-500/15 text-amber-400",
  rejected: "bg-red-500/15 text-red-400",
  none:     "bg-foreground/8 text-foreground/60",
};

const STATUS_LABEL: Record<string, string> = {
  approved: "Approved",
  pending:  "Pending Review",
  rejected: "Rejected",
  none:     "Not Applied",
};

export default function PersonalAccounts() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-2 text-[24px] font-bold text-foreground">Account Types</div>
      <p className="mb-8 text-[14px] text-foreground/50">Apply for additional account types to expand your Whodini presence.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-4xl">
        {ACCOUNT_TYPES.map(({ id, label, icon: Icon, desc, status, locked }) => (
          <div
            key={id}
            className={cn("relative rounded-[14px] border bg-card p-5 transition-all",
              status === "approved" ? "border-emerald-500/30" : "border-border")}
          >
            {locked && (
              <div className="absolute right-4 top-4 text-white/20">
                <Lock className="size-4" />
              </div>
            )}
            <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-[#F62C7D]/15">
              <Icon className="size-6 text-[#F62C7D]" />
            </div>
            <p className="text-[15px] font-bold text-foreground">{label}</p>
            <p className="mt-0.5 text-[12px] text-foreground/50">{desc}</p>

            <div className="mt-4 flex items-center justify-between">
              <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium", STATUS_STYLE[status])}>
                {STATUS_LABEL[status]}
              </span>
              {status === "approved" ? (
                <CheckCircle2 className="size-5 text-emerald-400" />
              ) : status === "none" && !locked ? (
                <button className="rounded-full bg-[#F62C7D] px-3 py-1 text-[12px] font-semibold text-foreground hover:opacity-90">
                  Apply
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
