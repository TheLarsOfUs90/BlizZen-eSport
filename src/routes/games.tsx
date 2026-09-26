import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { LineupTile } from "@/components/lineup-tile";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { games, squadKey } from "@/data/roster";
import { fillCols, fillSpan } from "@/lib/fill-grid";
import { usePrefs, tx } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games")({ component: GamesPage });

function GamesPage() {
  const { t, locale } = usePrefs();

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <SiteShell>
      <PageHero kicker={t.games.kicker} title={t.games.title} dek={t.games.dek} />
      <GameJumpNav />
      {games.map((game, index) => {
        const count = game.lineup.length;
        const format = t.games[squadKey(count)];
        const status = game.soon ? t.games.soon : count > 0 ? format : t.games.open;

        return (
          <section
            key={game.id}
            id={game.id}
            className="scroll-mt-32 border-t border-edge"
          >
            <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:px-10">
              <div className="lg:col-span-4">
                <p className="kicker">
                  {String(index + 1).padStart(2, "0")} · {game.short}
                </p>
                <h2 className="display mt-3 text-5xl sm:text-6xl">{tx(game.name, locale)}</h2>
                <p className="mt-4 max-w-md text-mist">{tx(game.blurb, locale)}</p>
                <p className="kicker mt-8 text-fog">{status}</p>
                {count === 0 ? (
                  <p className="mt-3 max-w-md text-sm text-mist">
                    {game.soon ? t.games.soon : t.games.openP}
                  </p>
                ) : null}
              </div>

              <div className="lg:col-span-8">
                {count > 0 ? (
                  <ul className={cn("grid items-stretch gap-px bg-edge", fillCols(count))}>
                    {game.lineup.map((player, playerIndex) => (
                      <LineupTile
                        key={player.id}
                        player={player}
                        className={fillSpan(playerIndex, count)}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="flex min-h-48 items-end border border-edge bg-void p-6 sm:min-h-64 sm:p-8">
                    <p className="display text-4xl text-edge sm:text-5xl">
                      {game.soon ? t.games.soon : t.games.open}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
      {org.socials.discord ? (
        <section className="border-t border-edge">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 lg:px-10">
            <div>
              <p className="kicker">{t.home.endKicker}</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">{t.home.endH}</h2>
              <p className="mt-3 max-w-lg text-mist">{t.games.openP}</p>
            </div>
            <Button asChild>
              <ExternalLink href={org.socials.discord}>{t.home.cta}</ExternalLink>
            </Button>
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}

function GameJumpNav() {
  const { t } = usePrefs();
  const [active, setActive] = useState(games[0]?.id ?? "");

  useEffect(() => {
    const nodes = games
      .map((game) => document.getElementById(game.id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActive(id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky top-16 z-30 border-y border-edge bg-void/90 backdrop-blur-md"
      aria-label={t.games.jump}
    >
      <ul className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-10">
        {games.map((game) => (
          <li key={game.id} className="shrink-0">
            <Link
              to="/games"
              hash={game.id}
              className={cn(
                "grid h-11 place-items-center px-3 font-display text-[13px] tracking-[0.16em] uppercase transition-colors duration-150",
                active === game.id ? "bg-ice text-ink" : "text-mist hover:text-fog",
              )}
            >
              {game.short}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
