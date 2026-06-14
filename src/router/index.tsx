import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
]);
