import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/about/contact")({ component: ContactPage });

function ContactPage() {
  const { t } = usePrefs();

  return (
    <SiteShell>
      <PageHero kicker={t.contact.kicker} title={t.contact.title} dek={t.contact.dek} />
      <section className="border-t border-edge">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-6">
            <p className="kicker">{t.contact.orgKicker}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{org.name}</h2>
            <p className="mt-4 text-mist">
              {org.hq}, {org.country}
            </p>
            <p className="mt-2 text-sm text-dim">{org.age}</p>
            <dl className="mt-10 space-y-6">
              {org.email ? (
                <div>
                  <dt className="kicker">{t.legal.email}</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${org.email}`} className="display text-3xl hover:text-ice">
                      {org.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {org.socials.discord ? (
                <div>
                  <dt className="kicker">{t.social.discord}</dt>
                  <dd className="mt-3">
                    <Button asChild>
                      <ExternalLink href={org.socials.discord}>{t.about.join}</ExternalLink>
                    </Button>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
          <div className="lg:col-span-6">
            <p className="kicker">{t.contact.socialKicker}</p>
            <h2 className="display mt-3 text-4xl">{t.contact.socialH}</h2>
            <p className="mt-4 max-w-md text-mist">{t.contact.socialP}</p>
            <SocialLinks className="mt-8" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
