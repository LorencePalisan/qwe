import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";

export default function AuthLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background font-sans">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
