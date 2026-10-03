import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { GamesMarquee } from "@/components/games-marquee";
import { RosterMarquee } from "@/components/roster-marquee";
import { SectionKicker } from "@/components/section-kicker";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { featuredPlayers, type Player } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t } = usePrefs();
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

      <section>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 lg:px-10">
          <div>
            <SectionKicker index="01" label={t.home.gamesKicker} />
            <h2 className="display mt-4 max-w-3xl text-5xl sm:text-6xl">{t.home.gamesH}</h2>
            <p className="mt-4 max-w-2xl text-mist">{t.home.gamesP}</p>
          </div>
          <Button asChild variant="ghost" className="self-start sm:self-auto">
            <Link to="/games">
              {t.home.gamesCta} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <GamesMarquee />
      </section>

      <section>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20 lg:px-10">
          <div>
            <SectionKicker index="02" label={t.home.rosterKicker} />
            <h2 className="display mt-4 max-w-xl text-5xl sm:text-7xl">{t.home.rosterH}</h2>
            <p className="mt-3 max-w-lg text-mist">{t.home.rosterP}</p>
          </div>
          <Button asChild variant="ghost" className="self-start sm:self-auto">
            <Link to="/roster">
              {t.home.rosterCta} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <RosterMarquee players={faces} />
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

const HERO_SESSION_KEY = "blizzen-hero-player";
const HERO_INDEX_KEY = "blizzen-hero-index";

const HERO_ACCENT: Record<string, string> = {
  thelars: "#7ec8ff",
  inus: "#c4b5a0",
  skill: "#f4f6fa",
  dead: "#b54545",
  dark: "#8b95a8",
  maxi: "#9bb7d4",
  crak: "#e8eef6",
  lab: "#e07040",
};

function pickHeroPlayer(pool: Player[]): Player | undefined {
  if (pool.length === 0) return undefined;
  try {
    const stored = sessionStorage.getItem(HERO_SESSION_KEY);
    const fromSession = stored ? pool.find((entry) => entry.id === stored) : undefined;
    if (fromSession) return fromSession;
    const raw = Number(localStorage.getItem(HERO_INDEX_KEY) ?? "0");
    const index = Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : 0;
    const player = pool[index % pool.length];
    sessionStorage.setItem(HERO_SESSION_KEY, player.id);
    localStorage.setItem(HERO_INDEX_KEY, String(index + 1));
    return player;
  } catch {
    return pool[0];
  }
}

function Hero() {
  const { t, locale } = usePrefs();
  const [player, setPlayer] = useState<Player | undefined>();
  const [ready, setReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const strikeWrapRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlayer(pickHeroPlayer(featuredPlayers()));
    setReady(true);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const hero = heroRef.current;
    const strikeWrap = strikeWrapRef.current;
    const type = typeRef.current;
    if (!hero) return;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const span = Math.max(rect.height, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      if (strikeWrap) strikeWrap.style.opacity = String(1 - progress);
      if (type) {
        type.style.opacity = String(1 - progress * 0.18);
        type.style.transform = `scale(${1 - progress * 0.04})`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const accent = player ? (HERO_ACCENT[player.id] ?? "var(--bz-live)") : "var(--bz-live)";
  const showZen = !ready || Boolean(player);

  return (
    <section
      ref={heroRef}
      className={
        showZen
          ? "stage-dark relative min-h-[calc(100dvh-4rem)] overflow-hidden lg:grid lg:grid-cols-[1.15fr_0.85fr]"
          : "stage-dark relative min-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    >
      <div className="relative overflow-hidden border-b border-edge px-4 py-12 sm:px-6 sm:py-16 lg:flex lg:min-h-[calc(100dvh-4rem)] lg:flex-col lg:justify-center lg:border-r lg:border-b-0 lg:px-10">
        <img
          src={asset("/media/hero-arena.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        <div
          ref={strikeWrapRef}
          className="pointer-events-none absolute inset-y-0 right-[12%] w-16 sm:w-20"
          aria-hidden="true"
        >
          <svg
            className="hero-strike h-full w-full text-ice"
            viewBox="0 0 64 800"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M38 8 16 310h22L14 792"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <div ref={typeRef} className="relative z-10 origin-left">
          <p className="kicker hero-enter stagger-1">{t.home.kicker}</p>
          <h1 className="display hero-enter stagger-2 mt-5 max-w-full text-6xl leading-[0.82] sm:text-7xl lg:text-8xl">
            {t.home.h1}
          </h1>
          <p className="hero-enter stagger-3 mt-8 max-w-xl text-lg text-fog sm:text-xl">{t.home.intent}</p>
          <p className="hero-enter stagger-3 mt-6 max-w-lg text-base text-mist sm:text-lg">{t.home.blitz}</p>
          <div className="hero-enter stagger-4 mt-10 flex flex-col items-start gap-4">
            {org.socials.discord ? (
              <Button asChild size="lg">
                <ExternalLink href={org.socials.discord}>{t.home.cta}</ExternalLink>
              </Button>
            ) : null}
            <SocialLinks />
          </div>
        </div>
      </div>

      {showZen ? (
        <div
          className="relative min-h-[70vh] overflow-hidden lg:min-h-[calc(100dvh-4rem)]"
          style={{
            boxShadow: `inset 0 0 0 1px ${accent}, 0 0 48px color-mix(in srgb, ${accent} 28%, transparent)`,
          }}
        >
          {player ? (
            <Link
              to="/roster/$playerId"
              params={{ playerId: player.id }}
              className="absolute inset-0 block"
            >
              {player.image ? (
                <img
                  src={asset(player.image)}
                  alt={player.ign}
                  className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
                />
              ) : (
                <div className="absolute inset-0 bg-panel-2" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                <p className="display text-4xl leading-[0.95] text-fog sm:text-5xl lg:text-6xl">
                  {tx(player.quote, locale)}
                </p>
                <p className="kicker mt-6 text-fog">{player.ign}</p>
                <p className="mt-2 text-sm text-mist">{tx(player.role, locale)}</p>
                <p className="mt-5 max-w-md text-base text-mist">{t.home.zen}</p>
              </div>
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
