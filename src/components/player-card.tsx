import { Link } from "@tanstack/react-router";
import type { Player } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export function PlayerCard({
  player,
  large,
}: {
  player: Player;
  large?: boolean;
}) {
  const { locale } = usePrefs();
  return (
    <Link
      to="/roster/$playerId"
      params={{ playerId: player.id }}
      className={cn(
        "group relative block overflow-hidden bg-panel transition-[box-shadow] duration-150",
        "shadow-border hover:shadow-border-hover",
        large ? "min-h-[420px] sm:min-h-[520px]" : "min-h-[340px]",
      )}
    >
      {player.image ? (
        <img
          src={asset(player.image)}
          alt={player.ign}
          className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-panel-2">
          <span className="display absolute inset-0 flex items-center justify-center text-[88px] text-edge">
            {player.ign.slice(0, 1)}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="kicker text-mist">
          {player.countryCode} · {tx(player.role, locale)}
        </p>
        <h3 className="display mt-1 text-[36px] leading-none sm:text-[42px]">{player.ign}</h3>
        {player.name ? <p className="text-sm text-mist">{player.name}</p> : null}
        {large ? (
          <p className="mt-3 max-w-sm text-sm text-fog/90">{tx(player.quote, locale)}</p>
        ) : null}
      </div>
    </Link>
  );
}
