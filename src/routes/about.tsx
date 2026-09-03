import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { titles } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";

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
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
          {org.socials.discord ? (
            <Button asChild className="mt-8">
              <ExternalLink href={org.socials.discord}>{t.about.join}</ExternalLink>
            </Button>
          ) : null}
          <SocialLinks className="mt-4" />
        </div>
        <aside className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-px bg-edge">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-void p-5">
                <dt className="kicker">{k}</dt>
                <dd className="display mt-2 text-3xl">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 grid gap-px bg-edge sm:grid-cols-2">
            {titles.map((g) => (
              <li key={g.id} className="bg-void p-5">
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
