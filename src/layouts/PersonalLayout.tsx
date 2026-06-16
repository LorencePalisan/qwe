import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SideBar from "@/components/app/SideBar";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

function PersonalLayoutInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // RequireSession guard — redirect unauthenticated users to login
  useEffect(() => {
    const raw = localStorage.getItem("whodini_session");
    if (!raw) {
      navigate(`/?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
      return;
    }
    try {
      const { token, expiresAt } = JSON.parse(raw) as { token?: string; expiresAt?: number };
      if (!token || Date.now() >= (expiresAt ?? 0)) {
        localStorage.removeItem("whodini_session");
        navigate(`/?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
      }
    } catch {
      localStorage.removeItem("whodini_session");
      navigate(`/?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn(theme, "min-h-screen bg-background font-sans")}>
      <SideBar expanded={sidebarOpen} onExpandedChange={setSidebarOpen} />
      <main
        className={cn(
          "min-h-screen pt-16 xl:pt-0 transform-gpu transition-[padding-left] duration-200 ease-in-out",
          sidebarOpen ? "xl:pl-64" : "xl:pl-[72px]",
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default function PersonalLayout() {
  return (
    <ThemeProvider>
      <PersonalLayoutInner />
    </ThemeProvider>
  );
}
