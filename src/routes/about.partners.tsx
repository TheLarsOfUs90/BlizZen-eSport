import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/about/partners")({ component: PartnersPage });

function PartnersPage() {
  const { t } = usePrefs();

  return (
    <SiteShell>
      <PageHero kicker={t.partners.kicker} title={t.partners.title} dek={t.partners.dek} />
      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <p className="max-w-2xl text-mist">{t.partners.body}</p>
          <div className="mt-12 grid min-h-64 place-items-center border border-edge bg-void p-10 text-center">
            <div>
              <p className="display text-4xl sm:text-5xl">{t.partners.empty}</p>
              <p className="mt-4 max-w-md text-sm text-mist">{t.partners.emptyP}</p>
            </div>
          </div>
          <div className="mt-12 max-w-xl">
            <p className="kicker">{t.partners.ctaKicker}</p>
            <h2 className="display mt-3 text-4xl">{t.partners.ctaH}</h2>
            <p className="mt-3 text-mist">{t.partners.ctaP}</p>
            <Button asChild className="mt-6">
              <Link to="/about/contact">{t.partners.cta}</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
