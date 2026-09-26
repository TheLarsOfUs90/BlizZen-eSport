import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { allAchievements } from "@/data/achievements";
import { usePrefs, tx } from "@/lib/prefs";

export const Route = createFileRoute("/achievements")({ component: AchievementsPage });

function AchievementsPage() {
  const { t, locale } = usePrefs();
  const items = allAchievements();

  return (
    <SiteShell>
      <PageHero kicker={t.achievementsPage.kicker} title={t.achievementsPage.title} dek={t.achievementsPage.dek} />
      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          {items.length === 0 ? (
            <div className="grid min-h-64 place-items-center border border-edge bg-void p-10 text-center">
              <div>
                <p className="display text-4xl sm:text-5xl">{t.achievementsPage.empty}</p>
                <p className="mt-4 max-w-md text-sm text-mist">{t.achievementsPage.emptyP}</p>
              </div>
            </div>
          ) : (
            <ol className="divide-y divide-edge border-y border-edge">
              {items.map((item) => (
                <li
                  key={`${item.year}-${item.title.de}-${item.gameId ?? "club"}`}
                  className="grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline"
                >
                  <span className="font-mono text-sm tracking-wider text-dim sm:col-span-2">{item.year}</span>
                  <span className="sm:col-span-2">
                    {item.gameId ? (
                      <Link
                        to="/games/$gameId"
                        params={{ gameId: item.gameId }}
                        className="kicker text-fog hover:underline"
                      >
                        {item.gameShort}
                      </Link>
                    ) : (
                      <span className="kicker">{t.achievementsPage.club}</span>
                    )}
                  </span>
                  <span className="display text-2xl sm:col-span-8 sm:text-3xl">{tx(item.title, locale)}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
