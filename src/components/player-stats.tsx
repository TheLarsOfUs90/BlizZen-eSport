import type { Player } from "@/data/roster";
import { fillCols, fillSpan } from "@/lib/fill-grid";
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
    <dl className={cn("grid gap-px bg-edge", fillCols(stats.length, "always"), className)}>
      {stats.map((s, index) => (
        <div
          key={s.label.de}
          className={cn("bg-void", compact ? "p-3" : "p-4", fillSpan(index, stats.length, "always"))}
        >
          <dt className="kicker">{tx(s.label, locale)}</dt>
          <dd className={cn("display mt-2 leading-none", compact ? "text-xl sm:text-2xl" : "text-3xl")}>
            {tx(s.value, locale)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
