import { useCallback, useState, type CSSProperties, type MouseEvent } from "react";
import type { Player } from "@/data/roster";
import { PlayerCard } from "@/components/player-card";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export function RosterMarquee({ players }: { players: Player[] }) {
  const { t } = usePrefs();
  const [locked, setLocked] = useState(false);

  const onToggle = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if ((event.target as HTMLElement).closest("a")) return;
    setLocked((value) => !value);
  }, []);

  if (players.length === 0) return null;

  if (players.length === 1) {
    return (
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <PlayerCard player={players[0]} stacked large />
      </div>
    );
  }

  const seconds = Math.max(28, players.length * 10);

  return (
    <div
      className={cn("roster-marquee relative overflow-hidden border-y border-edge", locked && "is-paused")}
      style={{ "--marquee-ms": `${seconds}s` } as CSSProperties}
      role="region"
      aria-label={`${t.home.rosterH} ${t.home.rosterPause}`}
      onClick={onToggle}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-void to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-void to-transparent sm:w-20" />
      <div className="roster-marquee-track">
        <MarqueeStrip players={players} />
        <MarqueeStrip players={players} clone />
      </div>
    </div>
  );
}

function MarqueeStrip({ players, clone }: { players: Player[]; clone?: boolean }) {
  return (
    <ul
      className={cn("flex shrink-0", clone && "roster-marquee-clone")}
      aria-hidden={clone || undefined}
    >
      {players.map((player) => (
        <li key={player.id} className="flex w-[min(86vw,21rem)] shrink-0 border-r border-edge">
          <PlayerCard player={player} stacked className="w-full" />
        </li>
      ))}
    </ul>
  );
}
