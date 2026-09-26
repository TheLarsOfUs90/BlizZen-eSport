import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { games, squadKey } from "@/data/roster";
import { fillCols, fillSpan } from "@/lib/fill-grid";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/")({ component: GamesPage });

function GamesPage() {
  const { t, locale } = usePrefs();

  return (
    <SiteShell>
      <PageHero kicker={t.games.kicker} title={t.games.title} dek={t.games.dek} />
      <ul className={cn("grid gap-px bg-edge", fillCols(games.length))}>
        {games.map((game, index) => {
          const count = game.lineup.length;
          const format = t.games[squadKey(count)];
          const status = game.soon ? t.games.soon : count > 0 ? format : t.games.open;

          return (
            <li key={game.id} className={fillSpan(index, games.length)}>
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
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
                  <p className="kicker text-mist">
                    {game.short} · {status}
                  </p>
                  <h2 className="display mt-1 text-3xl sm:text-4xl">{tx(game.name, locale)}</h2>
                  <p className="mt-3 max-w-md text-sm text-fog transition-all duration-300 max-sm:translate-y-0 max-sm:opacity-100 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
                    {tx(game.blurb, locale)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </SiteShell>
  );
}
