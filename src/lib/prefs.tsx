import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { copy, type Copy, type Locale } from "@/lib/copy";

export type Theme = "dark" | "light";

type Prefs = {
  locale: Locale;
  theme: Theme;
  setLocale: (l: Locale) => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  t: Copy;
};

const PrefsContext = createContext<Prefs | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f3f4f7" : "#0A0E1A");
}

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de");
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const l = localStorage.getItem("blizzen-lang");
      const th = localStorage.getItem("blizzen-theme");
      if (l === "en" || l === "de") {
        setLocaleState(l);
        applyLocale(l);
      }
      if (th === "light" || th === "dark") {
        setThemeState(th);
        applyTheme(th);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    applyLocale(l);
    try {
      localStorage.setItem("blizzen-lang", l);
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((th: Theme) => {
    setThemeState(th);
    applyTheme(th);
    try {
      localStorage.setItem("blizzen-theme", th);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo<Prefs>(
    () => ({
      locale,
      theme,
      setLocale,
      setTheme,
      toggleTheme,
      t: copy[locale],
    }),
    [locale, setLocale, setTheme, theme, toggleTheme],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs needs PrefsProvider");
  return ctx;
}

export type L10n = { de: string; en: string };

export function tx(s: L10n, locale: Locale) {
  return s[locale];
}
