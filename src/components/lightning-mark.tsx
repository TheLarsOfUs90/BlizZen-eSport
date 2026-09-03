import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export function LightningMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      aria-hidden="true"
      className={cn("text-fog", className)}
    >
      <path
        d="M38 2 8 38h18L18 78 56 34H36L38 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LogoLockup({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={asset("/brand/logo-mark.png")}
        alt="BliZzen"
        className={cn("logo-mark h-10 w-auto", markClassName)}
        style={{ outline: "none" }}
      />
    </span>
  );
}
