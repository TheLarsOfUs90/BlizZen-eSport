import type { Player } from "@/data/roster";
import { fillCols, fillSpan } from "@/lib/fill-grid";
import { usePrefs, tx } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export function PlayerStats({
  stats,
  className,
  compact,
  layout = "tiles",
}: {
  stats: Player["stats"];
  className?: string;
  compact?: boolean;
  layout?: "tiles" | "rows";
}) {
  const { locale } = usePrefs();
  if (stats.length === 0) return null;

  if (layout === "rows") {
    return (
      <dl
        className={cn(
          "grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2 border-t border-edge px-4 py-3",
          className,
        )}
      >
        {stats.map((s) => (
          <div key={s.label.de} className="contents">
            <dt className="kicker">{tx(s.label, locale)}</dt>
            <dd className="display text-lg leading-none">{tx(s.value, locale)}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={cn("grid gap-px bg-edge", fillCols(stats.length, "always"), className)}>
      {stats.map((s, index) => (
        <div
          key={s.label.de}
          className={cn("bg-void", compact ? "p-3" : "p-4", fillSpan(index, stats.length, "always"))}
        >
          <dt className="kicker">{tx(s.label, locale)}</dt>
          <dd
            className={cn(
              "display mt-2 break-words leading-tight",
              compact ? "min-h-[2.4em] text-base sm:text-lg" : "text-3xl leading-none",
            )}
          >
            {tx(s.value, locale)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
