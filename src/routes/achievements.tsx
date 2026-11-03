import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { AchievementCard } from "@/components/achievement-card";
import { allAchievements } from "@/data/achievements";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/achievements")({ component: AchievementsPage });

function AchievementsPage() {
  const { t } = usePrefs();
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
            <div className="space-y-10">
              {items.map((item) => (
                <AchievementCard key={`${item.year}-${item.title.de}-${item.gameId ?? "club"}`} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
