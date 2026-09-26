import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";

const LERP = 0.18;
const GLITCH_MS = 200;
const SCALES = [18, 10, 4, 0];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canUsePointer() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !prefersReducedMotion()
  );
}

function nativeTarget(node: EventTarget | null) {
  if (!(node instanceof Element)) return false;
  return Boolean(
    node.closest("input, textarea, select, [contenteditable], .roster-marquee"),
  );
}

export function BlitzPointer() {
  const [cursorOn, setCursorOn] = useState(false);
  const [glitchOn, setGlitchOn] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGFEDisplacementMapElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const glitchRef = useRef(0);
  const glitchingRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setGlitchOn(true);
    if (canUsePointer()) {
      setCursorOn(true);
      document.documentElement.classList.add("blitz-pointer-on");
    }
    return () => {
      document.documentElement.classList.remove("blitz-pointer-on");
      document.documentElement.classList.remove("blitz-route-glitch");
      window.cancelAnimationFrame(rafRef.current);
      window.clearTimeout(glitchRef.current);
    };
  }, []);

  useEffect(() => {
    if (!cursorOn) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const tick = () => {
      const mouse = mouseRef.current;
      const pos = posRef.current;
      pos.x += (mouse.x - pos.x) * LERP;
      pos.y += (mouse.y - pos.y) * LERP;
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      const speed = Math.hypot(dx, dy);
      const stretch = 1 + Math.min(speed / 48, 0.85);
      const angle = speed > 0.4 ? Math.atan2(dy, dx) : 0;
      const blur = speed > 1.2 ? 10 : 6;
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${angle}rad) scale(${stretch}, ${1 / Math.sqrt(stretch)})`;
      cursor.style.filter = `blur(${blur}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mouseRef.current = { x: event.clientX, y: event.clientY };
      if (nativeTarget(event.target)) {
        cursor.dataset.hide = "1";
      } else {
        cursor.dataset.hide = "0";
      }
    };

    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      cursor.dataset.hide = "1";
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [cursorOn]);

  useEffect(() => {
    if (!glitchOn) return;
    let seen = false;
    let lastPath = window.location.pathname;
    const runGlitch = () => {
      if (glitchingRef.current) return;
      glitchingRef.current = true;
      const html = document.documentElement;
      const map = mapRef.current;
      html.classList.add("blitz-route-glitch");
      SCALES.forEach((scale, index) => {
        window.setTimeout(() => {
          map?.setAttribute("scale", String(scale));
        }, (GLITCH_MS / (SCALES.length - 1)) * index);
      });
      window.clearTimeout(glitchRef.current);
      glitchRef.current = window.setTimeout(() => {
        html.classList.remove("blitz-route-glitch");
        map?.setAttribute("scale", "0");
        glitchingRef.current = false;
      }, GLITCH_MS);
    };

    const unsub = router.subscribe("onResolved", () => {
      const next = window.location.pathname;
      if (!seen) {
        seen = true;
        lastPath = next;
        return;
      }
      if (next === lastPath) return;
      lastPath = next;
      runGlitch();
    });
    return unsub;
  }, [glitchOn, router]);

  if (!cursorOn && !glitchOn) return null;

  return (
    <>
      {cursorOn ? <div ref={cursorRef} className="blitz-pointer" aria-hidden="true" data-hide="1" /> : null}
      <svg className="blitz-filter" aria-hidden="true" width="0" height="0">
        <filter id="blitz-displace" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.04" numOctaves="1" result="noise" />
          <feDisplacementMap
            ref={mapRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  );
}
