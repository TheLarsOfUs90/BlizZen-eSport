import type { ReactNode } from "react";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export function LangSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = usePrefs();
  return (
    <PrefRail
      className={className}
      label={t.nav.lang}
      on={locale === "en"}
      left="DE"
      right="EN"
      onToggle={() => setLocale(locale === "de" ? "en" : "de")}
    />
  );
}

export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme, t } = usePrefs();
  const light = theme === "light";

  return (
    <PrefRail
      className={className}
      label={light ? t.nav.themeDark : t.nav.themeLight}
      on={light}
      left={<BoltIcon />}
      right={<IceIcon />}
      onToggle={() => {
        const next = light ? "dark" : "light";
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
        if (!reduce && typeof doc.startViewTransition === "function") {
          doc.startViewTransition(() => setTheme(next));
        } else {
          setTheme(next);
        }
      }}
    />
  );
}

function PrefRail({
  label,
  on,
  left,
  right,
  onToggle,
  className,
}: {
  label: string;
  on: boolean;
  left: ReactNode;
  right: ReactNode;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={cn("pref-rail", on && "is-on", className)}
    >
      <span className="pref-thumb" aria-hidden="true" />
      <span className={cn("pref-face", !on && "is-active")}>{left}</span>
      <span className={cn("pref-face", on && "is-active")}>{right}</span>
    </button>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 16 20" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M9.2.6 2 10.2h4.4L4.6 19.4 14 9.2H9.4L9.2.6Z" />
    </svg>
  );
}

function IceIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
      <path
        d="M8 1.2 14.8 8 8 14.8 1.2 8 8 1.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
