import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type Ref,
} from "react";
import type { Player } from "@/data/roster";
import { PlayerCard } from "@/components/player-card";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

const DRAG_THRESHOLD = 8;

export function RosterMarquee({ players }: { players: Player[] }) {
  const { t } = usePrefs();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const startXRef = useRef(0);
  const movedRef = useRef(false);
  const hoverRef = useRef(false);
  const reduceRef = useRef(false);
  const widthRef = useRef(0);
  const rafRef = useRef(0);
  const lastTRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  const applyOffset = useCallback((value: number) => {
    const width = widthRef.current;
    offsetRef.current = width > 0 ? ((value % width) + width) % width : value;
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, []);

  const measure = useCallback(() => {
    widthRef.current = stripRef.current?.offsetWidth ?? 0;
  }, []);

  useEffect(() => {
    measure();
    const node = stripRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [measure, players]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reduceRef.current = media.matches;
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const duration = Math.max(28, players.length * 10);
    const tick = (now: number) => {
      const previous = lastTRef.current || now;
      const dt = Math.min(0.064, (now - previous) / 1000);
      lastTRef.current = now;
      const width = widthRef.current;
      if (width > 0 && !draggingRef.current && !hoverRef.current && !reduceRef.current) {
        applyOffset(offsetRef.current + (width / duration) * dt);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyOffset, players.length]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    draggingRef.current = true;
    movedRef.current = false;
    lastXRef.current = event.clientX;
    startXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = event.clientX - lastXRef.current;
    if (dx === 0) return;
    lastXRef.current = event.clientX;
    applyOffset(offsetRef.current - dx);
    if (Math.abs(event.clientX - startXRef.current) >= DRAG_THRESHOLD) {
      movedRef.current = true;
      setDragging(true);
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const root = rootRef.current;
    if (event.pointerType === "mouse" && root) {
      const rect = root.getBoundingClientRect();
      hoverRef.current =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
    } else {
      hoverRef.current = false;
    }
  };

  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!movedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    movedRef.current = false;
  };

  if (players.length === 0) return null;

  if (players.length === 1) {
    return (
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <PlayerCard player={players[0]} stacked large />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn("roster-marquee relative overflow-hidden border-y border-edge", dragging && "is-dragging")}
      role="region"
      aria-label={`${t.home.rosterH} ${t.home.rosterPause}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onLostPointerCapture={onPointerUp}
      onClickCapture={onClickCapture}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hoverRef.current = true;
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !draggingRef.current) hoverRef.current = false;
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-void to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-void to-transparent sm:w-20" />
      <div ref={trackRef} className="roster-marquee-track">
        <MarqueeStrip players={players} stripRef={stripRef} />
        <MarqueeStrip players={players} clone />
      </div>
    </div>
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
    <ul
      ref={stripRef}
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
