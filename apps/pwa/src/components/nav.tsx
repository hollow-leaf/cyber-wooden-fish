import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Dice1 } from "lucide-react";

const NAV_ITEMS = {
  pump: { title: "Pump", icon: Dice1, path: "/pump" },
  dump: { title: "Dump", icon: Dice1, path: "/dump" },
} as const;

export default function Navbar() {
  return (
    <div className="fixed h-navbar bottom-0 w-full bg-black border-t-[1px] border-t-border px-10 pt-2 z-20">
      <div className="w-full max-w-sm flex justify-between mx-auto">
        {Object.entries(NAV_ITEMS).map(
          ([nav, { title, icon: IconComponent, path }]) => (
            <Link
              key={nav}
              to={path}
              className={cn(
                "w-12 h-11 max-w-12 max-h-11 text-sub-text flex flex-col gap-1 items-center hover:cursor-pointer group",
              )}
            >
              <IconComponent
                className={cn(
                  "stroke-sub-text group-hover:stroke-white size-5",
                )}
              />
              <div className="text-[11px] group-hover:text-white whitespace-nowrap">
                {title}
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
