import type { Ref } from "react";
import { Link } from "@tanstack/react-router";
import { BandMarquee } from "@/components/band-marquee";
import { games, squadKey } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";

export function GamesMarquee() {
  const { t } = usePrefs();
  if (games.length === 0) return null;

  return (
    <BandMarquee count={games.length} label={t.home.gamesH}>
      {(stripRef, clone) => <GameStrip stripRef={stripRef} clone={clone} />}
    </BandMarquee>
  );
}

function GameStrip({ stripRef, clone }: { stripRef?: Ref<HTMLUListElement>; clone?: boolean }) {
  const { t, locale } = usePrefs();

  return (
    <ul ref={stripRef} className="flex shrink-0" aria-hidden={clone || undefined}>
      {games.map((game) => {
        const count = game.lineup.length;
        const format = t.games[squadKey(count)];
        const status = game.soon ? t.games.soon : count > 0 ? format : t.games.open;

        return (
          <li key={game.id} className="w-[min(70vw,22rem)] shrink-0 border-r border-edge sm:w-[22rem]">
            <Link
              to="/games/$gameId"
              params={{ gameId: game.id }}
              className="group relative block aspect-[16/10] overflow-hidden bg-panel"
            >
              {game.cover ? (
                <img
                  src={asset(game.cover)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 bg-panel-2" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="kicker text-mist">
                  {game.short} · {status}
                </p>
                <h3 className="display mt-1 text-3xl">{tx(game.name, locale)}</h3>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
