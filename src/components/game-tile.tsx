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
  const faces = game.lineup.slice(0, 4);
  const Title = titleAs;
  const gta = game.id === "gta";

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
      {game.id === "dayz" ? <div className="game-tile-dayz-wash absolute inset-0" /> : null}
      {game.id === "r6" ? <span className="absolute inset-y-0 left-0 z-10 w-0.5 bg-live" /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

      {faces.length > 0 ? (
        <div className="game-tile-faces absolute right-0 bottom-16 z-10 flex h-[5.5rem] sm:h-[6.25rem]">
          {faces.map((player) =>
            player.image ? (
              <img
                key={player.id}
                src={asset(player.image)}
                alt=""
                className="game-tile-face h-full w-10 object-cover object-[center_22%] sm:w-14"
              />
            ) : null,
          )}
        </div>
      ) : null}

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-7">
        {gta ? (
          <>
            <p className="kicker text-mist">{game.short}</p>
            <Title className="display mt-1 text-4xl leading-none sm:text-5xl">{status}</Title>
            <p className="game-tile-blurb mt-3 truncate text-sm text-fog">{tx(game.blurb, locale)}</p>
          </>
        ) : (
          <>
            <p className="kicker text-mist">
              {game.short} · {status}
            </p>
            <Title className="display mt-1 text-3xl leading-none sm:text-4xl">{tx(game.name, locale)}</Title>
            <p className="game-tile-blurb mt-3 truncate text-sm text-fog">{tx(game.blurb, locale)}</p>
          </>
        )}
      </div>
    </Link>
  );
}
