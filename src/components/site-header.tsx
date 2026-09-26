import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { org } from "@/data/org";
import { usePrefs } from "@/lib/prefs";
import { aboutNav } from "@/lib/about-nav";
import { teamNav, teamNavActive } from "@/lib/team-nav";
import { NavDropdown } from "@/components/nav-dropdown";
import { cn } from "@/lib/utils";
import { LogoLockup } from "@/components/lightning-mark";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { LangSwitch, ThemeSwitch } from "@/components/pref-switch";

export function SiteHeader() {
  const { t } = usePrefs();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const aboutItems = aboutNav(t);
  const teamItems = teamNav(t);
  const aboutActive = pathname === "/about" || pathname.startsWith("/about/");
  const teamActive = teamNavActive(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-edge/80 bg-void/90 backdrop-blur-md">
      {import.meta.env.VITE_PREVIEW === "1" ? (
        <p className="border-b border-edge bg-panel px-4 py-2 text-center font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
          Preview — nicht die Live-Seite
        </p>
      ) : null}
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center text-fog sm:hidden"
          onClick={() => setMenu((v) => !v)}
          aria-label={menu ? t.nav.close : t.nav.menu}
        >
          {menu ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link
          to="/"
          className="absolute left-1/2 shrink-0 -translate-x-1/2 sm:static sm:translate-x-0"
          onClick={() => setMenu(false)}
        >
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

        <div className="ml-auto flex items-center gap-2">
          <LangSwitch />
          <ThemeSwitch />
          {org.socials.discord ? (
            <Button asChild size="sm" className="hidden md:inline-flex">
              <ExternalLink href={org.socials.discord}>{t.nav.join}</ExternalLink>
            </Button>
          ) : null}
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
