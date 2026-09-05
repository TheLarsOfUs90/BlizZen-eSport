import type { Player } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export function PlayerStats({
  stats,
  className,
  compact,
}: {
  stats: Player["stats"];
  className?: string;
  compact?: boolean;
}) {
  const { locale } = usePrefs();
  if (stats.length === 0) return null;

  return (
    <dl className={cn("grid grid-cols-3 gap-px bg-edge", className)}>
      {stats.map((s) => (
        <div key={s.label.de} className={cn("bg-void", compact ? "p-3" : "p-4")}>
          <dt className="kicker">{tx(s.label, locale)}</dt>
          <dd className={cn("display mt-2 leading-none", compact ? "text-xl sm:text-2xl" : "text-3xl")}>
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
