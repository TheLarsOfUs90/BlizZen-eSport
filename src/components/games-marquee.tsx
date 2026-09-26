import type { Ref } from "react";
import { BandMarquee } from "@/components/band-marquee";
import { GameTile } from "@/components/game-tile";
import { games } from "@/data/roster";
import { usePrefs } from "@/lib/prefs";

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
  return (
    <ul ref={stripRef} className="flex shrink-0" aria-hidden={clone || undefined}>
      {games.map((game) => (
        <li key={game.id} className="w-[min(70vw,22rem)] shrink-0 border-r border-edge sm:w-[22rem]">
          <GameTile game={game} titleAs="h3" />
        </li>
      ))}
    </ul>
  );
}
