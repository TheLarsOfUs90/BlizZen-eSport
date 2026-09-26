import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { org } from "@/data/org";
import { usePrefs } from "@/lib/prefs";
import { aboutNav } from "@/lib/about-nav";
import { cn } from "@/lib/utils";
import { LogoLockup } from "@/components/lightning-mark";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";

export function SiteHeader() {
  const { t, locale, setLocale, theme, toggleTheme } = usePrefs();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutItems = aboutNav(t);
  const aboutActive = pathname === "/about" || pathname.startsWith("/about/");

  const nav = [
    { to: "/roster" as const, label: t.nav.roster },
    { to: "/games" as const, label: t.nav.games },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-edge/80 bg-void/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="shrink-0" onClick={() => setMenu(false)}>
          <LogoLockup />
        </Link>

        <nav className="ml-4 hidden items-center gap-5 sm:flex">
          <div className="group relative">
            <Link
              to="/about"
              className={cn(
                "inline-flex h-16 items-center gap-1 font-display text-[13px] tracking-[0.16em] uppercase transition-colors duration-150",
                aboutActive ? "text-fog" : "text-mist hover:text-fog",
              )}
            >
              {t.nav.about}
              <ChevronDown className="size-3.5" />
            </Link>
            <div className="invisible absolute left-0 top-full z-50 min-w-56 border border-edge bg-void opacity-0 shadow-border transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {aboutItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-12 items-center px-4 font-display text-[13px] tracking-[0.16em] uppercase hover:bg-panel hover:text-fog",
                    pathname === item.to ? "text-fog" : "text-mist",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "font-display text-[13px] tracking-[0.16em] uppercase transition-colors duration-150",
                pathname === item.to || pathname.startsWith(item.to + "/")
                  ? "text-fog"
                  : "text-mist hover:text-fog",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLocale(locale === "de" ? "en" : "de")}
            className="grid size-11 place-items-center font-mono text-[11px] tracking-widest uppercase text-mist sm:hidden"
            aria-label={t.nav.lang}
          >
            {locale === "de" ? "EN" : "DE"}
          </button>
          <div className="hidden items-center sm:flex" role="group" aria-label={t.nav.lang}>
            {(["de", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                className={cn(
                  "grid h-11 min-w-11 place-items-center font-mono text-[11px] tracking-widest uppercase",
                  locale === l ? "bg-ice text-ink" : "text-mist hover:text-fog",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-11 place-items-center text-fog"
            aria-label={theme === "dark" ? t.nav.themeLight : t.nav.themeDark}
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          {org.socials.discord ? (
            <Button asChild size="sm" className="hidden md:inline-flex">
              <ExternalLink href={org.socials.discord}>{t.nav.join}</ExternalLink>
            </Button>
          ) : null}
          <button
            type="button"
            className="grid size-11 place-items-center text-fog sm:hidden"
            onClick={() => setMenu((v) => !v)}
            aria-label={menu ? t.nav.close : t.nav.menu}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menu ? (
        <nav className="border-t border-edge bg-void px-4 py-4 sm:hidden">
          <button
            type="button"
            onClick={() => setAboutOpen((v) => !v)}
            className="flex h-12 w-full items-center justify-between border-b border-edge font-display text-lg tracking-[0.14em] uppercase"
          >
            {t.nav.about}
            <ChevronDown className={cn("size-4 transition", aboutOpen && "rotate-180")} />
          </button>
          {aboutOpen
            ? aboutItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenu(false)}
                  className="flex h-11 items-center border-b border-edge pl-4 font-display text-base tracking-[0.14em] uppercase text-mist"
                >
                  {item.label}
                </Link>
              ))
            : null}
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenu(false)}
              className="flex h-12 items-center border-b border-edge font-display text-lg tracking-[0.14em] uppercase"
            >
              {item.label}
            </Link>
          ))}
          {org.socials.discord ? (
            <ExternalLink
              href={org.socials.discord}
              onClick={() => setMenu(false)}
              className="flex h-12 items-center font-display text-lg tracking-[0.14em] uppercase"
            >
              {t.nav.join}
            </ExternalLink>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
