import { Link } from "@tanstack/react-router";
import type { Player } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { SocialLinks } from "@/components/social-links";
import { PlayerStats } from "@/components/player-stats";
import { fillCols } from "@/lib/fill-grid";

export const playerCardTracks =
  "grid [grid-template-rows:auto_auto_1fr_auto_auto]";

export const memberCols = fillCols;

const ACCENT: Record<string, string> = {
  thelars: "#7ec8ff",
  inus: "#c4b5a0",
  skill: "#f4f6fa",
  dead: "#b54545",
  dark: "#8b95a8",
  maxi: "#9bb7d4",
  crak: "#e8eef6",
  lab: "#e07040",
  shal: "#6ad4f0",
};

export function PlayerCard({
  player,
  large,
  className,
  stacked,
  details,
}: {
  player: Player;
  large?: boolean;
  className?: string;
  stacked?: boolean;
  details?: boolean;
}) {
  const { locale } = usePrefs();
  const quote = tx(player.quote, locale);
  const accent = ACCENT[player.id] ?? "var(--bz-live)";

  return (
    <article
      className={cn("flex h-full flex-col overflow-hidden bg-panel", className)}
      style={{ ["--player-accent" as string]: accent }}
    >
      <Link
        to="/roster/$playerId"
        params={{ playerId: player.id }}
        className={cn(
          "player-tile group relative block overflow-hidden",
          stacked || details ? "aspect-[4/5]" : "aspect-[4/5] min-h-[70vh]",
          large && "min-h-[320px] sm:min-h-[420px]",
        )}
      >
        {player.image ? (
          <img
            src={asset(player.image)}
            alt={player.ign}
            className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
          />
        ) : (
          <div className="absolute inset-0 bg-panel-2">
            <span className="display absolute inset-0 flex items-center justify-center text-[88px] text-edge">
              {player.ign.slice(0, 1)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          {quote ? <p className="player-tile-quote display mb-4 leading-none">{quote}</p> : null}
          <p className="kicker text-mist">
            {player.countryCode} · {tx(player.role, locale)}
          </p>
          <h3 className="display mt-1 text-[36px] leading-none sm:text-[42px]">{player.ign}</h3>
        </div>
      </Link>
      {details ? (
        <div className="flex flex-1 flex-col px-4 py-5 sm:px-5">
          <p className="kicker text-mist">
            {tx(player.role, locale)} · {tx(player.country, locale)}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist">{tx(player.bio, locale)}</p>
          <div className="mt-4">
            <PlayerStats stats={player.stats} compact />
          </div>
          <div className="mt-auto flex min-h-11 items-center pt-3">
            <SocialLinks links={player.socials} />
          </div>
        </div>
      ) : null}
    </article>
  );
}
