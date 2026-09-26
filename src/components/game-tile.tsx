import { Link } from "@tanstack/react-router";
import { games, squadKey } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

type Game = (typeof games)[number];

export function GameTile({
  game,
  titleAs = "h2",
}: {
  game: Game;
  titleAs?: "h2" | "h3";
}) {
  const { t, locale } = usePrefs();
  const count = game.lineup.length;
  const format = t.games[squadKey(count)];
  const status = game.soon ? t.games.soon : count > 0 ? format : t.games.open;
  const Title = titleAs;

  return (
    <Link
      to="/games/$gameId"
      params={{ gameId: game.id }}
      className={cn("game-tile group relative block aspect-[16/10] overflow-hidden bg-panel", `game-tile-${game.id}`)}
    >
      {game.cover ? (
        <img src={asset(game.cover)} alt="" className="game-tile-cover absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-panel-2" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-7">
        <p className="kicker text-mist">
          {game.short} · {status}
        </p>
        <Title className="display mt-1 text-3xl leading-none sm:text-4xl">{tx(game.name, locale)}</Title>
        <p className="game-tile-blurb mt-3 truncate text-sm text-fog">{tx(game.blurb, locale)}</p>
      </div>
    </Link>
  );
}
