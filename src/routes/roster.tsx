import { createFileRoute } from "@tanstack/react-router";
import { PlayerCard, memberCols } from "@/components/player-card";
import { isOrphan, orphanCard, orphanSlot } from "@/lib/fill-grid";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { players } from "@/data/roster";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/roster")({ component: RosterPage });

function RosterPage() {
  const { t } = usePrefs();
  const count = players.length;

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
      <ul
        className={cn(
          "mx-auto grid items-stretch gap-px bg-edge",
          count <= 1 ? "max-w-[720px] px-4 sm:px-6 lg:px-10" : "max-w-[1440px]",
          memberCols(count),
        )}
      >
        {players.map((player, index) => {
          const orphan = isOrphan(index, count);
          return (
            <li key={player.id} className={cn(orphan && orphanSlot())}>
              <PlayerCard
                player={player}
                stacked
                statsLayout="tiles"
                className={cn("h-full", orphan && orphanCard())}
              />
            </li>
          );
        })}
      </ul>
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
        <SocialLinks />
      </div>
    </SiteShell>
  );
}
