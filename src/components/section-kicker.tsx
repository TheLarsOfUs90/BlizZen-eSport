import { cn } from "@/lib/utils";

export function SectionKicker({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-[11px] tracking-[0.22em] text-dim">{index}</span>
      <span className="h-px w-8 bg-edge" />
      <span className="kicker text-mist">{label}</span>
    </div>
  );
}
