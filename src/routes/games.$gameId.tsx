import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { LineupTile } from "@/components/lineup-tile";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { getGame, squadKey } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/games/$gameId")({
  component: GamePage,
});

function GamePage() {
  const { gameId } = Route.useParams();
  const { t, locale } = usePrefs();
  const game = getGame(gameId);
  if (!game) throw notFound();

  const count = game.lineup.length;
  const format = t.games[squadKey(count)];
  const status = game.soon ? t.games.soon : count > 0 ? format : t.games.open;

  return (
    <SiteShell>
      <section className="relative min-h-[42vh] overflow-hidden border-b border-edge sm:min-h-[52vh]">
        {game.cover ? (
          <img
            src={asset(game.cover)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-panel" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/20" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-[1440px] flex-col justify-end px-4 py-10 sm:min-h-[52vh] sm:px-6 sm:py-14 lg:px-10">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-mist uppercase hover:text-fog"
          >
            <ArrowLeft className="size-3.5" /> {t.games.back}
          </Link>
          <p className="kicker mt-8">
            {game.short} · {status}
          </p>
          <h1 className="display mt-3 text-6xl sm:text-8xl">{tx(game.name, locale)}</h1>
          <p className="mt-4 max-w-xl text-lg text-fog">{tx(game.blurb, locale)}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <p className="kicker">{t.games.rosterH}</p>
        <h2 className="display mt-3 text-4xl sm:text-5xl">{status}</h2>
        {count > 0 ? (
          <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {game.lineup.map((player) => (
              <LineupTile key={player.id} player={player} compact />
            ))}
          </ul>
        ) : (
          <div className="mt-10 max-w-lg">
            <p className="text-mist">{game.soon ? t.games.soon : t.games.openP}</p>
            {org.socials.discord ? (
              <Button asChild className="mt-6">
                <ExternalLink href={org.socials.discord}>{t.home.cta}</ExternalLink>
              </Button>
            ) : null}
          </div>
        )}
      </section>

      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <p className="kicker">{t.games.achievements}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{t.games.achievements}</h2>
          {game.achievements.length > 0 ? (
            <ol className="mt-10 divide-y divide-edge border-y border-edge">
              {game.achievements.map((item) => (
                <li key={`${item.year}-${item.title.de}`} className="grid grid-cols-[5rem_1fr] gap-6 py-5 sm:grid-cols-[7rem_1fr]">
                  <span className="font-mono text-sm tracking-wider text-dim">{item.year}</span>
                  <span className="display text-2xl sm:text-3xl">{tx(item.title, locale)}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-6 max-w-lg text-mist">{t.games.achievementsEmpty}</p>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
