import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="dark min-h-screen bg-[#1A001D] font-sans">
      <Outlet />
    </div>
  );
}
