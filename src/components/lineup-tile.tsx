import { Link } from "@tanstack/react-router";
import type { Player } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export function LineupTile({
  player,
  className,
  compact,
}: {
  player: Player;
  className?: string;
  compact?: boolean;
}) {
  const { locale, t } = usePrefs();

  return (
    <li className={cn("bg-void", className)}>
      <Link
        to="/roster/$playerId"
        params={{ playerId: player.id }}
        className="group block h-full"
        aria-label={`${player.ign} — ${t.games.toProfile}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {player.image ? (
            <img
              src={asset(player.image)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-panel-2">
              <span className="display absolute inset-0 flex items-center justify-center text-[88px] text-edge">
                {player.ign.slice(0, 1)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
        </div>
        <div className={compact ? "p-3" : "p-5"}>
          <p className="kicker text-mist">{tx(player.role, locale)}</p>
          <h3 className={cn("display mt-1 leading-none", compact ? "text-lg sm:text-2xl" : "text-3xl")}>
            {player.ign}
          </h3>
        </div>
      </Link>
    </li>
  );
}
