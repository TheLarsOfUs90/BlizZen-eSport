import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/legal")({ component: LegalPage });

function LegalPage() {
  const { t } = usePrefs();
  return (
    <SiteShell>
      <PageHero kicker={t.legal.kicker} title={t.legal.title} dek={t.legal.dek} />
      <section className="mx-auto max-w-[1440px] space-y-4 border-t border-edge px-4 py-16 text-base leading-relaxed text-mist sm:px-6 lg:px-10">
        <p>{t.legal.p1}</p>
        <p>{t.legal.p2}</p>
        <p>{t.legal.p3}</p>
        <p>{t.legal.p4}</p>

        <h2 className="display pt-8 text-3xl text-fog">{t.legal.impressum}</h2>
        <dl className="max-w-xl space-y-3">
          <div>
            <dt className="kicker">{t.legal.operator}</dt>
            <dd className="mt-1 text-fog">
              {org.name}
              <br />
              {org.hq}, {org.country}
            </dd>
          </div>
          {org.email ? (
            <div>
              <dt className="kicker">{t.legal.email}</dt>
              <dd className="mt-1">
                <a href={`mailto:${org.email}`} className="text-fog hover:underline">
                  {org.email}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>

        <h2 className="display pt-6 text-3xl text-fog">{t.legal.contact}</h2>
        <p>{t.legal.contactP}</p>
        {org.socials.discord ? (
          <Button asChild className="mt-4">
            <ExternalLink href={org.socials.discord}>{t.about.join}</ExternalLink>
          </Button>
        ) : null}
        <SocialLinks className="mt-4" />
      </section>
    </SiteShell>
  );
}
