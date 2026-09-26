import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { org } from "@/data/org";
import { usePrefs } from "@/lib/prefs";
import { aboutNav } from "@/lib/about-nav";
import { teamNav, teamNavActive } from "@/lib/team-nav";
import { NavDropdown } from "@/components/nav-dropdown";
import { cn } from "@/lib/utils";
import { LogoLockup } from "@/components/lightning-mark";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";

export function SiteHeader() {
  const { t, locale, setLocale, theme, toggleTheme } = usePrefs();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const aboutItems = aboutNav(t);
  const teamItems = teamNav(t);
  const aboutActive = pathname === "/about" || pathname.startsWith("/about/");
  const teamActive = teamNavActive(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-edge/80 bg-void/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="shrink-0" onClick={() => setMenu(false)}>
          <LogoLockup />
        </Link>

        <nav className="ml-4 hidden items-center gap-5 sm:flex">
          <NavDropdown
            label={t.nav.about}
            rootTo="/about"
            items={aboutItems}
            active={aboutActive}
            pathname={pathname}
          />
          <NavDropdown
            label={t.nav.roster}
            rootTo="/roster"
            items={teamItems}
            active={teamActive}
            pathname={pathname}
          />
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
          <button
            type="button"
            onClick={() => setTeamOpen((v) => !v)}
            className="flex h-12 w-full items-center justify-between border-b border-edge font-display text-lg tracking-[0.14em] uppercase"
          >
            {t.nav.roster}
            <ChevronDown className={cn("size-4 transition", teamOpen && "rotate-180")} />
          </button>
          {teamOpen
            ? teamItems.map((item) => (
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
