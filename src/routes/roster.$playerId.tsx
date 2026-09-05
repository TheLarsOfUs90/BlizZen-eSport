import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { PlayerStats } from "@/components/player-stats";
import { getPlayer } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/roster/$playerId")({
  component: PlayerPage,
});

function PlayerPage() {
  const { playerId } = Route.useParams();
  const { t, locale } = usePrefs();
  const player = getPlayer(playerId);
  if (!player) throw notFound();

  return (
    <SiteShell>
      <article className="mx-auto grid max-w-[1440px] gap-0 lg:grid-cols-12">
        <div className="relative aspect-square bg-panel lg:col-span-5 lg:aspect-auto lg:min-h-[calc(100dvh-4rem)]">
          {player.image ? (
            <img
              src={asset(player.image)}
              alt={player.ign}
              className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span className="display text-[140px] text-edge">{player.ign[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-void/40" />
        </div>
        <div className="px-4 py-10 sm:px-8 lg:col-span-7 lg:px-14 lg:py-16">
          <Link
            to="/roster"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-mist uppercase hover:text-fog"
          >
            <ArrowLeft className="size-3.5" /> {t.roster.back}
          </Link>
          <p className="kicker mt-8">
            {tx(player.country, locale)} · {tx(player.role, locale)}
          </p>
          <h1 className="display mt-3 text-6xl sm:text-8xl">{player.ign}</h1>
          {player.name ? <p className="mt-2 text-lg text-mist">{player.name}</p> : null}
          <blockquote className="mt-8 max-w-lg text-xl text-fog">{tx(player.quote, locale)}</blockquote>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-mist">{tx(player.bio, locale)}</p>
          <SocialLinks className="mt-6" links={player.socials} />
          <PlayerStats stats={player.stats} className="mt-10 max-w-lg" />
        </div>
      </article>
    </SiteShell>
  );
}
