import type { Ref } from "react";
import type { Player } from "@/data/roster";
import { PlayerCard } from "@/components/player-card";
import { BandMarquee } from "@/components/band-marquee";
import { usePrefs } from "@/lib/prefs";

export function RosterMarquee({ players }: { players: Player[] }) {
  const { t } = usePrefs();

  if (players.length === 0) return null;

  if (players.length === 1) {
    return (
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <PlayerCard player={players[0]} stacked large />
      </div>
    );
  }

  return (
    <BandMarquee count={players.length} label={t.home.rosterH}>
      {(stripRef, clone) => <MarqueeStrip players={players} stripRef={stripRef} clone={clone} />}
    </BandMarquee>
  );
}

function MarqueeStrip({
  players,
  clone,
  stripRef,
}: {
  players: Player[];
  clone?: boolean;
  stripRef?: Ref<HTMLUListElement>;
}) {
  return (
    <ul ref={stripRef} className="flex shrink-0" aria-hidden={clone || undefined}>
      {players.map((player) => (
        <li key={player.id} className="flex w-[min(60vw,21rem)] shrink-0 border-r border-edge sm:w-[21rem]">
          <PlayerCard player={player} stacked className="w-full" />
        </li>
      ))}
    </ul>
  );
}
