import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Dice1 } from "lucide-react";

const NAV_ITEMS = {
  pump: { title: "Pump", icon: Dice1, path: "/pump" },
  dump: { title: "Dump", icon: Dice1, path: "/dump" },
} as const;

export default function Navbar() {
  return (
    <div className="border-t-border fixed bottom-0 z-20 h-navbar w-full border-t-[1px] bg-black px-10 pt-2">
      <div className="mx-auto flex w-full max-w-sm justify-between">
        {Object.entries(NAV_ITEMS).map(
          ([nav, { title, icon: IconComponent, path }]) => (
            <Link
              key={nav}
              to={path}
              className={cn(
                "text-sub-text group flex h-11 max-h-11 w-12 max-w-12 flex-col items-center gap-1 hover:cursor-pointer",
              )}
            >
              <IconComponent
                className={cn(
                  "stroke-sub-text size-5 group-hover:stroke-white",
                )}
              />
              <div className="whitespace-nowrap text-[11px] group-hover:text-white">
                {title}
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
