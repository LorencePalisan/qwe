import { useState, useEffect, useRef, useMemo, type ElementType } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Users, Briefcase, Building2, Calendar, User,
  Settings, Mail, ShoppingBag, Bell, BookOpen, Globe2,
  MessageSquare, Clock, LayoutGrid, Store,
  Bookmark, HelpCircle, Activity,
  ChevronDown, LogOut, Menu, X, Star, Sun, Moon, Check, Plus,
} from "@/icons";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type NavChild = { label: string; href: string };
type NavItem  = { label: string; href: string; icon: ElementType; children?: NavChild[] };

type SidebarRoleOption = {
  sidebarId: string;
  label: string;
  overviewPath: string;
  roleIndex: number;
  icon: ElementType;
};

type SessionRole = { accountType: string; index: number };
type Session = {
  displayName: string;
  accountId: string;
  roles: SessionRole[];
  activeRoleIndex: number;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_ITEMS: Record<string, NavItem[]> = {
  personal: [
    { label: "Home",        href: "/personal",             icon: Home },
    { label: "Connections", href: "/personal/connections", icon: Users },
    { label: "Freelancers", href: "/personal/freelance",   icon: Briefcase },
    {
      label: "Business", href: "/personal/business", icon: Building2,
      children: [{ label: "Subscriptions", href: "/personal/subscription" }],
    },
    {
      label: "Community", href: "/personal/community", icon: Users,
      children: [{ label: "Memberships", href: "/personal/membership" }],
    },
    { label: "Events", href: "/personal/events", icon: Calendar },
    {
      label: "Profile", href: "/personal/profile", icon: User,
      children: [{ label: "Accounts", href: "/personal/accounts" }],
    },
  ],
  business: [
    { label: "Home",                href: "/business",             icon: Home },
    { label: "Events",              href: "/business/events",      icon: Calendar },
    { label: "Brands",              href: "/business/brands",      icon: Store },
    { label: "WorkSpace",           href: "/business/workspace",   icon: LayoutGrid },
    { label: "Services & Products", href: "/business/services",    icon: ShoppingBag },
    { label: "Subscribers",         href: "/business/subscribers", icon: Users },
    { label: "Notifications",       href: "/business/notifications", icon: Bell },
    { label: "Inquiries",           href: "/business/inquiries",   icon: Mail },
    { label: "Settings",            href: "/business/settings",    icon: Settings },
  ],
  community: [
    { label: "Home",          href: "/community",               icon: Home },
    { label: "Events",        href: "/community/events",        icon: Calendar },
    { label: "Chapters",      href: "/community/chapters",      icon: BookOpen },
    { label: "Members",       href: "/community/members",       icon: Users },
    { label: "Directory",     href: "/community/directory",     icon: Globe2 },
    { label: "Message Board", href: "/community/message-board", icon: MessageSquare },
    { label: "Services",      href: "/community/services",      icon: ShoppingBag },
    { label: "History",       href: "/community/history",       icon: Clock },
    { label: "Inquiries",     href: "/community/inquiries",     icon: Mail },
    { label: "Settings",      href: "/community/settings",      icon: Settings },
  ],
  organizer: [
    { label: "Home",      href: "/organizer",           icon: Home },
    { label: "Events",    href: "/organizer/events",    icon: Calendar },
    { label: "Vendors",   href: "/organizer/vendors",   icon: Briefcase },
    { label: "Services",  href: "/organizer/services",  icon: ShoppingBag },
    { label: "Team",      href: "/organizer/team",      icon: Users },
    { label: "Inquiries", href: "/organizer/inquiries", icon: Mail },
    { label: "Settings",  href: "/organizer/settings",  icon: Settings },
  ],
  agency: [
    { label: "Home",      href: "/agency",          icon: Home },
    { label: "Clients",   href: "/agency/clients",  icon: Users },
    { label: "Services",  href: "/agency/services", icon: ShoppingBag },
    { label: "Team",      href: "/agency/team",     icon: Users },
    { label: "Inquiries", href: "/agency/inquiries",icon: Mail },
    { label: "Settings",  href: "/agency/settings", icon: Settings },
  ],
  freelance: [
    { label: "Home",      href: "/freelance",           icon: Home },
    { label: "Services",  href: "/freelance/services",  icon: ShoppingBag },
    { label: "Clients",   href: "/freelance/clients",   icon: Users },
    { label: "Calendar",  href: "/freelance/calendar",  icon: Calendar },
    { label: "Portfolio", href: "/freelance/portfolio", icon: BookOpen },
    { label: "Inquiries", href: "/freelance/inquiries", icon: Mail },
  ],
};

const ROLE_ICONS: Record<string, ElementType> = {
  personal:  User,
  freelance: Briefcase,
  business:  Building2,
  community: Users,
  organizer: Star,
  agency:    Globe2,
};

const ROLE_DISPLAY_LABELS: Record<string, string> = {
  personal:  "Personal",
  freelance: "Freelance",
  business:  "Business",
  community: "Community",
  organizer: "Organizer",
  agency:    "Agency",
};

const PROFILE_MENU = [
  { label: "Saved",    icon: Bookmark,    href: "#" },
  { label: "Calendar", icon: Calendar,    href: "#" },
  { label: "Activity", icon: Activity,    href: "#" },
  { label: "Support",  icon: HelpCircle,  href: "#" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

function formatAccountType(str: string) {
  return str.split(/[-_\s]+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getRoleLabel(accountType: string) {
  return ROLE_DISPLAY_LABELS[accountType] ?? formatAccountType(accountType);
}

function getOverviewPath(type: string) {
  return `/${type}`;
}

function getAccountTypeForPath(path: string): string | null {
  for (const t of ["freelance", "business", "community", "organizer", "agency", "personal"]) {
    if (path === `/${t}` || path.startsWith(`/${t}/`)) return t;
  }
  return null;
}

// ── Session stub ──────────────────────────────────────────────────────────────
// TODO: replace with useSessionQuery() from src/lib/auth/client.ts

function useWhodiniSession(): Session | null {
  const raw = localStorage.getItem("whodini_session");
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as {
      token?: string; expiresAt?: number;
      displayName?: string; accountId?: string;
      roles?: SessionRole[]; activeRoleIndex?: number;
    };
    if (!p.token || Date.now() >= (p.expiresAt ?? 0)) return null;
    return {
      displayName:     p.displayName     ?? "Whodini User",
      accountId:       p.accountId       ?? "WH-0001",
      roles:           p.roles           ?? [
        { accountType: "personal",  index: 0 },
        { accountType: "business",  index: 1 },
        { accountType: "freelance", index: 2 },
        { accountType: "community", index: 3 },
      ],
      activeRoleIndex: p.activeRoleIndex ?? 0,
    };
  } catch {
    return null;
  }
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface SideBarProps {
  onNavigate?:        (path: string) => void;
  currentPath?:       string;
  expanded?:          boolean;
  onExpandedChange?:  (v: boolean) => void;
}

// ── Collapsed width (px) used for fixed popup positioning ─────────────────────
const W_COLLAPSED = 72;   // w-18
const W_EXPANDED  = 256;  // w-64

// ── Component ─────────────────────────────────────────────────────────────────

export default function SideBar({
  onNavigate,
  currentPath: currentPathProp,
  expanded,
  onExpandedChange,
}: SideBarProps) {
  const location    = useLocation();
  const navigate    = useNavigate();
  const currentPath = currentPathProp ?? location.pathname;

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigate(path);
  };

  // Session
  const session    = useWhodiniSession();
  const rawRoles   = session?.roles ?? [{ accountType: "personal", index: 0 }];
  const mappedRoles: SidebarRoleOption[] = rawRoles.map((r) => ({
    sidebarId:    r.accountType,
    label:        getRoleLabel(r.accountType),
    overviewPath: getOverviewPath(r.accountType),
    roleIndex:    r.index,
    icon:         ROLE_ICONS[r.accountType] ?? User,
  }));

  const pathType = getAccountTypeForPath(currentPath);
  const selectedRole: SidebarRoleOption | undefined =
    (pathType ? mappedRoles.find((r) => r.sidebarId === pathType) : undefined) ??
    mappedRoles.find((r) => r.roleIndex === (session?.activeRoleIndex ?? 0)) ??
    mappedRoles[0];

  const navItems = NAV_ITEMS[selectedRole?.sidebarId ?? "personal"] ?? [];

  // ── Controlled / uncontrolled expand ──────────────────────────────────────
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(false);
  const isExpanded = expanded !== undefined ? expanded : uncontrolledExpanded;

  const setExpanded = (v: boolean) => {
    if (expanded === undefined) setUncontrolledExpanded(v);
    onExpandedChange?.(v);
  };

  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onMouseEnter = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    setExpanded(true);
  };

  const onMouseLeave = () => {
    collapseTimer.current = setTimeout(() => {
      setExpanded(false);
      setProfileOpen(false);
      setRoleDropdownOpen(false);
    }, 150);
  };

  useEffect(() => () => { if (collapseTimer.current) clearTimeout(collapseTimer.current); }, []);

  // ── Mobile sheet ──────────────────────────────────────────────────────────
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Accordion ─────────────────────────────────────────────────────────────
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Auto-expand parent when child is active
  useEffect(() => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      for (const item of navItems) {
        if (item.children?.some((c) => isActive(c.href))) next.add(item.href);
      }
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const toggleAccordion = (href: string) =>
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(href) ? next.delete(href) : next.add(href);
      return next;
    });

  // ── Profile popup (desktop) ───────────────────────────────────────────────
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  // ── Role dropdown (desktop) ───────────────────────────────────────────────
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!roleDropdownRef.current?.contains(e.target as Node)) setRoleDropdownOpen(false);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  // ── Theme toggle ──────────────────────────────────────────────────────────
  const { theme, toggle: toggleTheme } = useTheme();

  // ── Sign-out ──────────────────────────────────────────────────────────────
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut,       setIsSigningOut]       = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    // TODO: signOut.mutateAsync()
    localStorage.removeItem("whodini_session");
    navigate("/");
  };

  // ── Role switching ────────────────────────────────────────────────────────
  const handleAccountTypeChange = (roleValue: string) => {
    const role = mappedRoles.find((r) => r.sidebarId === roleValue);
    if (!role) return;
    // TODO: switchRole.mutate(role.roleIndex)
    go(role.overviewPath);
    setMobileOpen(false);
    setRoleDropdownOpen(false);
  };

  // ── whodini:open-account-type custom event ────────────────────────────────
  useEffect(() => {
    const h = (e: Event) => {
      const detail = (e as CustomEvent<{ accountTypeId: string }>).detail;
      handleAccountTypeChange(detail.accountTypeId);
    };
    window.addEventListener("whodini:open-account-type", h);
    return () => window.removeEventListener("whodini:open-account-type", h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedRoles]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const isActive = (href: string) =>
    currentPath === href || currentPath.startsWith(href + "/");

  const initials   = getInitials(session?.displayName ?? "W");
  const sidebarPx  = isExpanded ? W_EXPANDED : W_COLLAPSED;
  const RoleIcon   = selectedRole?.icon ?? User;

  // ── Shared nav renderer ───────────────────────────────────────────────────
  const renderNavItems = (mobile: boolean) =>
    navItems.map((item) => {
      const Icon       = item.icon;
      const active     = isActive(item.href);
      const hasKids    = !!item.children?.length;
      const isOpen     = openItems.has(item.href);
      const childMatch = item.children?.some((c) => isActive(c.href)) ?? false;
      const itemActive = active || childMatch;

      return (
        <div key={item.href}>
          <button
            onClick={() => {
              go(item.href);
              if (hasKids) toggleAccordion(item.href);
              else if (mobile) setMobileOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
              !mobile && !isExpanded && "justify-center",
              itemActive
                ? "bg-[#F62C7D]/15 text-[#F62C7D]"
                : "text-foreground/60 hover:bg-foreground/8 hover:text-foreground",
            )}
          >
            <Icon className="size-5 shrink-0" />
            {(mobile || isExpanded) && (
              <span className="flex-1 text-left text-[13.6px] font-medium">{item.label}</span>
            )}
            {(mobile || isExpanded) && hasKids && (
              <ChevronDown className={cn("size-4 shrink-0 transition-transform", isOpen && "rotate-180")} />
            )}
          </button>

          {/* Accordion children */}
          {(mobile || isExpanded) && hasKids && isOpen && (
            <div className="ml-8 mt-0.5 flex flex-col gap-0.5">
              {item.children!.map((c) => (
                <button
                  key={c.href}
                  onClick={() => { go(c.href); if (mobile) setMobileOpen(false); }}
                  className={cn(
                    "flex w-full rounded-lg px-3 py-2 text-left text-[13px] transition-colors",
                    isActive(c.href) ? "text-[#F62C7D]" : "text-foreground/50 hover:text-foreground",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    });

  // ── Memoized nav outputs ──────────────────────────────────────────────────
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const desktopNav = useMemo(() => renderNavItems(false), [selectedRole?.sidebarId, isExpanded, currentPath, openItems]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mobileNav  = useMemo(() => renderNavItems(true),  [selectedRole?.sidebarId, currentPath, openItems]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Desktop sidebar (xl+) ─────────────────────────────────────── */}
      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          "hidden xl:flex fixed left-0 top-0 z-40 h-screen flex-col border-r border-border bg-sidebar overflow-hidden transform-gpu transition-[width] duration-200 ease-in-out",
          isExpanded ? "w-64" : "w-18",
        )}
      >
        {/* Logo */}
        <div className="shrink-0 px-3 pt-4 pb-1">
          <div className={cn("flex items-center gap-2.5 px-2 py-2", !isExpanded && "justify-center")}>
            <img
              src={theme === "dark" ? "/whodini-dark.webp" : "/whodini-light.webp"}
              alt="Whodini"
              className="h-7 w-auto shrink-0"
            />
            {isExpanded && (
              <span className="whitespace-nowrap text-[15px] font-bold text-foreground">Whodini</span>
            )}
          </div>
        </div>

        {/* Account switcher */}
        <div ref={roleDropdownRef} className="shrink-0 border-b border-border px-3 pb-3">
          <button
            onClick={() => setRoleDropdownOpen((v) => !v)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-foreground/6",
              !isExpanded && "justify-center",
              isExpanded && "border border-border",
              roleDropdownOpen && "bg-foreground/6",
            )}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F62C7D]/15">
              <RoleIcon className="size-4 text-[#F62C7D]" />
            </div>
            {isExpanded && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/60">Account</p>
                  <p className="truncate text-[13px] font-semibold text-foreground">{selectedRole?.label ?? "Personal"}</p>
                </div>
                <ChevronDown className={cn("size-4 shrink-0 text-foreground/60 transition-transform", roleDropdownOpen && "rotate-180")} />
              </>
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden px-3 py-2 scrollbar-styled">
          {desktopNav}
        </nav>

        {/* Theme toggle */}
        <div className="shrink-0 px-3 pb-1">
          <button
            onClick={toggleTheme}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-foreground/50 transition-colors hover:bg-foreground/8 hover:text-foreground",
              !isExpanded && "justify-center",
            )}
          >
            {theme === "dark" ? <Sun className="size-4 shrink-0" /> : <Moon className="size-4 shrink-0" />}
            {isExpanded && (
              <span className="text-[12px] font-medium">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
            )}
          </button>
        </div>

        {/* Profile avatar */}
        <div ref={profileRef} className="shrink-0 px-3 pb-4">
          <button
            onClick={() => isExpanded && setProfileOpen((v) => !v)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-foreground/8",
              !isExpanded && "justify-center",
            )}
          >
            <div className="size-8 shrink-0 rounded-full bg-[#F62C7D]/25 flex items-center justify-center text-[11px] font-bold text-[#F62C7D]">
              {initials}
            </div>
            {isExpanded && (
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[13px] font-medium text-foreground">
                  {session?.displayName ?? "Whodini User"}
                </p>
                <p className="truncate text-[11px] text-foreground/50">{session?.accountId ?? "WH-0001"}</p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* ── Desktop account dropdown popup ────────────────────────────── */}
      {roleDropdownOpen && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="fixed z-50 rounded-xl border border-border bg-sidebar p-1.5 shadow-2xl"
          style={{
            left:  isExpanded ? 8         : W_COLLAPSED + 8,
            top:   isExpanded ? 112       : 56,
            width: isExpanded ? W_EXPANDED - 16 : 220,
          }}
        >
          {mappedRoles.map((role) => {
            const Icon     = role.icon;
            const isActv   = selectedRole?.sidebarId === role.sidebarId;
            return (
              <button
                key={role.sidebarId}
                onClick={() => handleAccountTypeChange(role.sidebarId)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-colors",
                  isActv
                    ? "bg-[#F62C7D]/15 text-[#F62C7D]"
                    : "text-foreground/60 hover:bg-foreground/8 hover:text-foreground",
                )}
              >
                <div className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg",
                  isActv ? "bg-[#F62C7D]/20" : "bg-foreground/8",
                )}>
                  <Icon className="size-4" />
                </div>
                <span className="flex-1 text-left font-medium">{role.label}</span>
                {isActv && <Check className="size-3.5 shrink-0" />}
              </button>
            );
          })}
          <div className="my-1 border-t border-border" />
          <Link
            to="/personal/accounts"
            onClick={() => setRoleDropdownOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] text-foreground/50 transition-colors hover:bg-foreground/8 hover:text-foreground"
          >
            <Plus className="size-3.5 shrink-0" />
            Manage accounts
          </Link>
        </div>
      )}

      {/* ── Desktop profile popup ─────────────────────────────────────── */}
      {profileOpen && isExpanded && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="fixed z-50 rounded-xl border border-border bg-sidebar p-1.5 shadow-2xl"
          style={{ left: sidebarPx + 8, bottom: 16, width: 220 }}
        >
          {PROFILE_MENU.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              to={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.6px] text-foreground/60 transition-colors hover:bg-foreground/8 hover:text-foreground"
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}
          <div className="my-1 border-t border-border" />
          <button
            onClick={() => { setProfileOpen(false); setShowSignOutConfirm(true); }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.6px] text-red-400 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="size-4 shrink-0" />
            Log Out
          </button>
        </div>
      )}

      {/* ── Mobile / tablet header (<xl) ──────────────────────────────── */}
      <header className="xl:hidden fixed left-0 right-0 top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-sidebar/95 px-4 backdrop-blur-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex size-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
        >
          <Menu className="size-5" />
        </button>

        <img src={theme === "dark" ? "/whodini-dark.webp" : "/whodini-light.webp"} alt="Whodini" className="h-7 w-auto" />
        <span className="text-[14px] font-bold text-foreground">Whodini</span>

        <div className="flex-1" />

        {selectedRole && (
          <span className="rounded-full border border-[#F62C7D]/30 bg-[#F62C7D]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#F62C7D]">
            {selectedRole.label}
          </span>
        )}
      </header>

      {/* ── Mobile sheet backdrop ─────────────────────────────────────── */}
      <div
        onClick={() => setMobileOpen(false)}
        className={cn(
          "xl:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* ── Mobile sheet panel ────────────────────────────────────────── */}
      <div
        className={cn(
          "xl:hidden fixed left-0 top-0 z-[51] flex h-full w-[85vw] max-w-xs flex-col bg-sidebar transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sheet header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#F62C7D]/25 text-[13px] font-bold text-[#F62C7D]">
              {initials}
            </div>
            <div>
              <p className="text-[14px] font-semibold text-foreground">
                {session?.displayName ?? "Whodini User"}
              </p>
              <p className="text-[11px] text-foreground/50">{session?.accountId ?? "WH-0001"}</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex size-8 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Account switcher */}
        <div className="border-b border-border px-4 py-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-foreground/60">Switch Account</p>
          <div className="flex flex-col gap-1">
            {mappedRoles.map((role) => {
              const Icon   = role.icon;
              const isActv = selectedRole?.sidebarId === role.sidebarId;
              return (
                <button
                  key={role.sidebarId}
                  onClick={() => handleAccountTypeChange(role.sidebarId)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                    isActv
                      ? "bg-[#F62C7D]/15 text-[#F62C7D]"
                      : "text-foreground/60 hover:bg-foreground/8 hover:text-foreground",
                  )}
                >
                  <div className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg",
                    isActv ? "bg-[#F62C7D]/20" : "bg-foreground/8",
                  )}>
                    <Icon className="size-4" />
                  </div>
                  <span className="flex-1 text-left">{role.label}</span>
                  {isActv && <Check className="size-3.5 shrink-0" />}
                </button>
              );
            })}
            <Link
              to="/personal/accounts"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] text-foreground/60 transition-colors hover:bg-foreground/8 hover:text-foreground/60"
            >
              <Plus className="size-3.5 shrink-0" />
              Manage accounts
            </Link>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-3 scrollbar-styled">
          {mobileNav}
        </nav>

        {/* Footer: theme toggle + sign out */}
        <div className="shrink-0 border-t border-border px-3 py-3 flex flex-col gap-1">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.6px] text-foreground/60 transition-colors hover:bg-foreground/8 hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-5 shrink-0" /> : <Moon className="size-5 shrink-0" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button
            onClick={() => { setMobileOpen(false); setShowSignOutConfirm(true); }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.6px] text-red-400 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="size-5 shrink-0" />
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Sign-out confirm modal ────────────────────────────────────── */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-sidebar p-6 shadow-2xl">
            <h2 className="mb-2 text-[18px] font-bold text-foreground">Sign out?</h2>
            <p className="mb-6 text-[14px] text-foreground/60">
              You'll be returned to the login screen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="h-[44px] flex-1 rounded-full border border-border text-[14px] font-medium text-foreground/70 transition-colors hover:bg-foreground/8"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="h-[44px] flex-1 rounded-full bg-red-500/80 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSigningOut ? "Signing out…" : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
