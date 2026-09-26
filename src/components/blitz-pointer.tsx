import { useEffect, useRef, useState } from "react";

const IDLE_MS = 120;
const FLASH_MS = 80;
const MOVE_PX = 1;

function canUsePointer() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function nativeTarget(node: EventTarget | null) {
  if (!(node instanceof Element)) return false;
  return Boolean(
    node.closest("input, textarea, select, [contenteditable], .roster-marquee"),
  );
}

function isRouteChangeClick(event: MouseEvent) {
  if (event.button !== 0) return false;
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return false;
  const origin = event.target;
  if (!(origin instanceof Element)) return false;
  const link = origin.closest("a");
  if (!link) return false;
  if (link.target === "_blank") return false;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  let url: URL;
  try {
    url = new URL(link.href, window.location.href);
  } catch {
    return false;
  }
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === window.location.pathname) return false;
  return true;
}

export function BlitzPointer() {
  const [on, setOn] = useState(false);
  const [flash, setFlash] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef(0);
  const flashRef = useRef(0);
  const flashingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canUsePointer()) return;
    setOn(true);
    document.documentElement.classList.add("blitz-pointer-on");
    return () => {
      document.documentElement.classList.remove("blitz-pointer-on");
      window.clearTimeout(idleRef.current);
      window.clearTimeout(flashRef.current);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const root = rootRef.current;
    if (!root) return;

    const hide = () => {
      root.dataset.hide = "1";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const x = event.clientX;
      const y = event.clientY;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const native = nativeTarget(event.target);
      if (native) {
        root.dataset.hide = "1";
        root.dataset.mode = "zen";
        return;
      }
      root.dataset.hide = "0";
      const dx = x - lastRef.current.x;
      const dy = y - lastRef.current.y;
      lastRef.current = { x, y };
      if (dx * dx + dy * dy > MOVE_PX) {
        root.dataset.mode = "blitz";
        window.clearTimeout(idleRef.current);
        idleRef.current = window.setTimeout(() => {
          root.dataset.mode = "zen";
        }, IDLE_MS);
      }
    };

    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      hide();
    };

    const onClick = (event: MouseEvent) => {
      if (flashingRef.current) return;
      if (!isRouteChangeClick(event)) return;
      flashingRef.current = true;
      setFlash(true);
      window.clearTimeout(flashRef.current);
      flashRef.current = window.setTimeout(() => {
        setFlash(false);
        flashingRef.current = false;
      }, FLASH_MS);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("click", onClick, true);
    };
  }, [on]);

  if (!on) return null;

  return (
    <>
      <div ref={rootRef} className="blitz-pointer" aria-hidden="true" data-mode="zen" data-hide="1">
        <span className="blitz-pointer-zen" />
        <svg className="blitz-pointer-bolt" viewBox="0 0 14 22" fill="none" aria-hidden="true">
          <polyline
            points="8,1 4,11 9,11 5,21"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        </svg>
      </div>
      {flash ? <div className="blitz-flash" aria-hidden="true" /> : null}
    </>
  );
}
