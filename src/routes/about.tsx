import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { titles } from "@/data/roster";
import { fillCols, fillSpan } from "@/lib/fill-grid";
import { usePrefs, tx } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const { t, locale } = usePrefs();
  const facts: [string, string][] = [
    [t.about.hq, org.hq],
    [t.about.founded, String(org.founded)],
    [t.about.age, org.age],
    [t.about.tag, org.short],
  ];

  return (
    <SiteShell>
      <PageHero kicker={t.about.kicker} title={t.about.title} dek={t.about.dek} />
      <section className="mx-auto grid max-w-[1440px] gap-12 border-t border-edge px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <p className="kicker">{t.about.orgKicker}</p>
          <h2 className="display mt-3 text-5xl">{t.about.orgH}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-mist">
            {[t.about.p1, t.about.p2, t.about.p3].flatMap((block, i) =>
              block.split("\n\n").map((para, j) => (
                <p key={`${i}-${j}`}>{para}</p>
              )),
            )}
          </div>
          {org.socials.discord ? (
            <Button asChild className="mt-8">
              <ExternalLink href={org.socials.discord}>{t.about.join}</ExternalLink>
            </Button>
          ) : null}
          <SocialLinks className="mt-4" />
        </div>
        <aside className="lg:col-span-5">
          <dl className={cn("grid gap-px bg-edge", fillCols(facts.length, "always"))}>
            {facts.map(([k, v], index) => (
              <div key={k} className={cn("bg-void p-5", fillSpan(index, facts.length, "always"))}>
                <dt className="kicker">{k}</dt>
                <dd className="display mt-2 text-3xl">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className={cn("mt-6 grid gap-px bg-edge", fillCols(titles.length))}>
            {titles.map((g, index) => (
              <li key={g.id} className={cn("bg-void p-5", fillSpan(index, titles.length))}>
                <p className="kicker">{g.soon ? t.home.gamesSoon : g.short}</p>
                <p className="display mt-2 text-2xl">{tx(g.name, locale)}</p>
              </li>
            ))}
          </ul>
          <blockquote className="mt-6 border-l-2 border-ice pl-5 text-lg text-fog">{t.about.quote}</blockquote>
        </aside>
      </section>
    </SiteShell>
  );
}
