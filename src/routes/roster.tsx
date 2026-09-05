import { createFileRoute } from "@tanstack/react-router";
import { PlayerCard } from "@/components/player-card";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { players } from "@/data/roster";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/roster")({ component: RosterPage });

function rosterCols(count: number) {
  if (count <= 1) return "max-w-[720px] px-4 sm:px-6 lg:px-10";
  if (count === 2) return "max-w-[1440px] sm:grid-cols-2";
  return "max-w-[1440px] sm:grid-cols-2 lg:grid-cols-3";
}

function RosterPage() {
  const { t } = usePrefs();

  return (
    <SiteShell>
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <p className="kicker">{t.roster.kicker}</p>
        <h1 className="display mt-4 text-6xl sm:text-8xl">{t.roster.title}</h1>
        <p className="mt-4 max-w-xl text-mist">{t.roster.dek}</p>
        {org.socials.discord ? (
          <Button asChild className="mt-8">
            <ExternalLink href={org.socials.discord}>{t.home.cta}</ExternalLink>
          </Button>
        ) : null}
      </section>
      <ul className={cn("mx-auto grid gap-px bg-edge", rosterCols(players.length))}>
        {players.map((player) => (
          <li key={player.id}>
            <PlayerCard player={player} />
          </li>
        ))}
      </ul>
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
        <SocialLinks />
      </div>
    </SiteShell>
  );
}
