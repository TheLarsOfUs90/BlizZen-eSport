import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavDropdown({
  label,
  rootTo,
  items,
  active,
  pathname,
}: {
  label: string;
  rootTo: "/about" | "/roster";
  items: { to: string; label: string }[];
  active: boolean;
  pathname: string;
}) {
  return (
    <div className="group relative">
      <Link
        to={rootTo}
        className={cn(
          "inline-flex h-16 items-center gap-1 font-display text-[13px] tracking-[0.16em] uppercase transition-colors duration-150",
          active ? "text-fog" : "text-mist hover:text-fog",
        )}
      >
        {label}
        <ChevronDown className="size-3.5" />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 min-w-56 border border-edge bg-void opacity-0 shadow-border transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to as "/about"}
            className={cn(
              "flex h-12 items-center px-4 font-display text-[13px] tracking-[0.16em] uppercase hover:bg-panel hover:text-fog",
              pathname === item.to ? "text-fog" : "text-mist",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
