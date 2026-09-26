import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { GameTile } from "@/components/game-tile";
import { games } from "@/data/roster";
import { fillCols, fillSpan } from "@/lib/fill-grid";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games/")({ component: GamesPage });

function GamesPage() {
  const { t } = usePrefs();

  return (
    <SiteShell>
      <PageHero kicker={t.games.kicker} title={t.games.title} dek={t.games.dek} />
      <ul className={cn("grid gap-px bg-edge", fillCols(games.length))}>
        {games.map((game, index) => (
          <li key={game.id} className={fillSpan(index, games.length)}>
            <GameTile game={game} />
          </li>
        ))}
      </ul>
    </SiteShell>
  );
}
