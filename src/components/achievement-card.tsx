import { Link } from "@tanstack/react-router";
import type { ListedAchievement } from "@/data/achievements";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";

export function AchievementCard({ item }: { item: ListedAchievement }) {
  const { t, locale } = usePrefs();
  return (
    <article className="overflow-hidden border border-edge bg-panel">
      {item.image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-panel-2">
          <img src={asset(item.image)} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>
      ) : null}
      <div className="px-4 py-6 sm:px-6">
        <p className="kicker">
          {item.year}
          {" · "}
          {item.gameId ? (
            <Link to="/games/$gameId" params={{ gameId: item.gameId }} className="hover:underline">
              {item.gameShort}
            </Link>
          ) : (
            t.achievementsPage.club
          )}
        </p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">{tx(item.title, locale)}</h2>
        {item.body ? <p className="mt-4 max-w-2xl text-sm text-mist">{tx(item.body, locale)}</p> : null}
        {item.tags && item.tags.length > 0 ? (
          <p className="mt-4 font-mono text-[12px] tracking-wider text-dim">
            {item.tags.map((tag) => `#${tag}`).join(" ")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
