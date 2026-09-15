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
  const firstStripRef = useRef<HTMLUListElement>(null);
  const secondStripRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const widthRef = useRef(0);
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);
  const touchingRef = useRef(false);
  const pressedRef = useRef(false);
  const reduceRef = useRef(false);
  const lastXRef = useRef(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const axisRef = useRef<"none" | "x" | "y">("none");
  const movedRef = useRef(false);
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
    const first = firstStripRef.current;
    const second = secondStripRef.current;
    if (!first || !second) return;
    const width = second.offsetLeft - first.offsetLeft;
    if (width > 0) widthRef.current = width;
  }, []);

  useEffect(() => {
    measure();
    const node = firstStripRef.current;
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
      const paused =
        draggingRef.current ||
        hoveringRef.current ||
        touchingRef.current ||
        reduceRef.current;
      if (width > 0 && !paused) applyOffset(offsetRef.current + (width / duration) * dt);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyOffset, players.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      pressedRef.current = true;
      touchingRef.current = true;
      movedRef.current = false;
      axisRef.current = "none";
      startXRef.current = touch.clientX;
      startYRef.current = touch.clientY;
      lastXRef.current = touch.clientX;
    };

    const onMove = (event: TouchEvent) => {
      if (!pressedRef.current) return;
      const touch = event.touches[0];
      if (!touch) return;
      const totalX = touch.clientX - startXRef.current;
      const totalY = touch.clientY - startYRef.current;
      if (axisRef.current === "none") {
        if (Math.hypot(totalX, totalY) < DRAG_THRESHOLD) return;
        axisRef.current = Math.abs(totalX) >= Math.abs(totalY) ? "x" : "y";
        if (axisRef.current === "x") lastXRef.current = startXRef.current;
      }
      if (axisRef.current !== "x") return;
      event.preventDefault();
      const dx = touch.clientX - lastXRef.current;
      lastXRef.current = touch.clientX;
      applyOffset(offsetRef.current - dx);
      if (Math.abs(totalX) >= DRAG_THRESHOLD) movedRef.current = true;
    };

    const onEnd = () => {
      pressedRef.current = false;
      touchingRef.current = false;
      axisRef.current = "none";
    };

    root.addEventListener("touchstart", onStart, { passive: true });
    root.addEventListener("touchmove", onMove, { passive: false });
    root.addEventListener("touchend", onEnd);
    root.addEventListener("touchcancel", onEnd);
    return () => {
      root.removeEventListener("touchstart", onStart);
      root.removeEventListener("touchmove", onMove);
      root.removeEventListener("touchend", onEnd);
      root.removeEventListener("touchcancel", onEnd);
    };
  }, [applyOffset]);

  const onMouseDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    draggingRef.current = true;
    movedRef.current = false;
    lastXRef.current = event.clientX;
    startXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onMouseMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !draggingRef.current) return;
    const dx = event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;
    if (dx !== 0) applyOffset(offsetRef.current - dx);
    if (Math.abs(event.clientX - startXRef.current) >= DRAG_THRESHOLD) {
      movedRef.current = true;
      setDragging(true);
    }
  };

  const onMouseUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    draggingRef.current = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
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
      aria-label={t.home.rosterH}
      onPointerDown={onMouseDown}
      onPointerMove={onMouseMove}
      onPointerUp={onMouseUp}
      onPointerCancel={onMouseUp}
      onClickCapture={onClickCapture}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hoveringRef.current = true;
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !draggingRef.current) hoveringRef.current = false;
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-void to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-void to-transparent sm:w-20" />
      <div ref={trackRef} className="roster-marquee-track">
        <MarqueeStrip players={players} stripRef={firstStripRef} />
        <MarqueeStrip players={players} stripRef={secondStripRef} clone />
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
      className="flex shrink-0"
      aria-hidden={clone || undefined}
    >
      {players.map((player) => (
        <li key={player.id} className="flex w-[min(60vw,21rem)] shrink-0 border-r border-edge sm:w-[21rem]">
          <PlayerCard player={player} stacked className="w-full" />
        </li>
      ))}
    </ul>
  );
}
