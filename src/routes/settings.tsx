import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { LangSwitch, ThemeSwitch } from "@/components/pref-switch";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const { t } = usePrefs();

  return (
    <SiteShell>
      <PageHero kicker={t.settings.kicker} title={t.settings.title} dek={t.settings.dek} />
      <section className="border-t border-edge">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-edge sm:grid-cols-2">
          <div className="bg-void p-8 sm:p-12">
            <p className="kicker">{t.settings.language}</p>
            <h2 className="display mt-3 text-4xl">{t.nav.lang}</h2>
            <p className="mt-3 text-sm text-mist">{t.settings.languageP}</p>
            <LangSwitch className="mt-8 h-12 w-40" />
          </div>
          <div className="bg-void p-8 sm:p-12">
            <p className="kicker">{t.settings.mode}</p>
            <h2 className="display mt-3 text-4xl">{t.settings.mode}</h2>
            <p className="mt-3 text-sm text-mist">{t.settings.modeP}</p>
            <ThemeSwitch className="mt-8 h-12 w-40" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
