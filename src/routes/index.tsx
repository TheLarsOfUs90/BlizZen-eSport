import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { PlayerCard, playerCardTracks } from "@/components/player-card";
import { SectionKicker } from "@/components/section-kicker";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { featuredPlayers, titles } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t, locale } = usePrefs();
  const faces = featuredPlayers();

  return (
    <SiteShell>
      <Hero />

      <section className="border-y border-edge">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 sm:grid-cols-3">
          <Stat value={org.members} label={t.home.statMembers} />
          <Stat value={org.founded} label={t.home.statFounded} />
          <Stat text={org.hq} label={t.home.statHq} />
        </div>
      </section>

      <section className="border-b border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <SectionKicker index="01" label={t.home.gamesKicker} />
          <h2 className="display mt-4 max-w-3xl text-5xl sm:text-6xl">{t.home.gamesH}</h2>
          <p className="mt-4 max-w-2xl text-mist">{t.home.gamesP}</p>
          <ul className="mt-10 grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-3">
            {titles.map((g) => (
              <li key={g.id} className="bg-void p-6">
                <p className="kicker">{g.soon ? t.home.gamesSoon : g.short}</p>
                <h3 className="display mt-2 text-3xl">{tx(g.name, locale)}</h3>
                <p className="mt-2 text-sm text-mist">{tx(g.blurb, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionKicker index="02" label={t.home.rosterKicker} />
            <h2 className="display mt-4 max-w-xl text-5xl sm:text-7xl">{t.home.rosterH}</h2>
            <p className="mt-3 max-w-lg text-mist">{t.home.rosterP}</p>
            <Button asChild variant="ghost" className="mt-8">
              <Link to="/roster">
                {t.home.rosterCta} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div
            className={
              faces.length > 1
                ? `${playerCardTracks} items-stretch gap-px bg-edge sm:grid-cols-2 lg:col-span-7`
                : `${playerCardTracks} lg:col-span-7`
            }
          >
            {faces.map((player) => (
              <PlayerCard key={player.id} player={player} large={faces.length === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-edge">
        <div className="stage-dark relative">
          <img
            src={asset("/media/hero-arena.jpg")}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/50" />
          <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-10">
            <p className="kicker">{t.home.endKicker}</p>
            <h2 className="display mt-4 max-w-2xl text-5xl sm:text-6xl">{t.home.endH}</h2>
            <p className="mt-4 max-w-md text-mist">{t.home.endP}</p>
            {org.socials.discord ? (
              <Button asChild size="lg" className="mt-8">
                <ExternalLink href={org.socials.discord}>{t.home.cta}</ExternalLink>
              </Button>
            ) : null}
            <SocialLinks className="mt-6 justify-center" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Stat({
  value,
  text,
  suffix = "",
  label,
}: {
  value?: number;
  text?: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="border-edge px-5 py-8 sm:px-8 sm:py-10 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r">
      <p className="display text-5xl text-fog sm:text-6xl">
        {typeof value === "number" ? <CountUp value={value} suffix={suffix} /> : text}
      </p>
      <p className="kicker mt-3">{label}</p>
    </div>
  );
}

function Hero() {
  const { t } = usePrefs();
  return (
    <section className="stage-dark relative min-h-[calc(100dvh-4rem)] overflow-hidden">
      <img
        src={asset("/media/hero-arena.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
      <img
        src={asset("/brand/logo-mark.png")}
        alt=""
        className="logo-mark pointer-events-none absolute top-1/2 left-1/2 w-[min(70vw,520px)] -translate-x-1/2 -translate-y-[58%] opacity-[0.18]"
        style={{ outline: "none" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1440px] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-10">
        <p className="kicker hero-enter stagger-1">{t.home.kicker}</p>
        <h1 className="display hero-enter stagger-2 mt-5 max-w-full text-7xl leading-[0.82] sm:text-[12vw] lg:text-[9rem]">
          {t.home.h1}
        </h1>
        <p className="hero-enter stagger-3 mt-8 max-w-xl text-lg text-fog sm:text-xl">{t.home.intent}</p>
        <p className="hero-enter stagger-3 mt-6 max-w-lg text-base text-mist sm:text-lg">{t.home.blitz}</p>
        <p className="hero-enter stagger-3 mt-3 max-w-lg text-base text-mist sm:text-lg">{t.home.zen}</p>
        <div className="hero-enter stagger-4 mt-10 flex flex-col items-center gap-4">
          {org.socials.discord ? (
            <Button asChild size="lg">
              <ExternalLink href={org.socials.discord}>{t.home.cta}</ExternalLink>
            </Button>
          ) : null}
          <SocialLinks className="justify-center" />
        </div>
      </div>
    </section>
  );
}
