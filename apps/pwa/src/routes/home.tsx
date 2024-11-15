import Navbar from "@/components/nav";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
}
