import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { org } from "@/data/org";
import { matchesByStatus, type MatchStatus } from "@/data/matches";
import { titles } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matches")({ component: MatchesPage });

function MatchesPage() {
  const { t, locale } = usePrefs();
  const [tab, setTab] = useState<MatchStatus>("upcoming");
  const tabs: { id: MatchStatus; label: string }[] = [
    { id: "live", label: t.matches.live },
    { id: "upcoming", label: t.matches.upcoming },
    { id: "past", label: t.matches.past },
  ];
  const rows = matchesByStatus(tab);

  return (
    <SiteShell>
      <PageHero kicker={t.matches.kicker} title={t.matches.title} dek={t.matches.dek} />
      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="flex flex-wrap gap-1" role="tablist" aria-label={t.matches.title}>
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "grid h-11 px-4 font-display text-[13px] tracking-[0.16em] uppercase",
                  tab === item.id ? "bg-ice text-ink" : "text-mist hover:text-fog",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {rows.length === 0 ? (
            <div className="mt-10 grid min-h-64 place-items-center border border-edge bg-void p-10 text-center">
              <div>
                <p className="display text-4xl sm:text-5xl">{t.matches.empty}</p>
                <p className="mt-4 max-w-md text-sm text-mist">{t.matches.emptyP}</p>
              </div>
            </div>
          ) : (
            <ol className="mt-10 divide-y divide-edge border-y border-edge">
              {rows.map((match) => {
                const game = titles.find((entry) => entry.id === match.gameId);
                return (
                  <li key={match.id} className="grid gap-3 py-6 sm:grid-cols-12 sm:items-center">
                    <p className="kicker sm:col-span-2">{match.when}</p>
                    <p className="sm:col-span-2">
                      {game ? (
                        <Link to="/games/$gameId" params={{ gameId: game.id }} className="kicker text-fog hover:underline">
                          {game.short}
                        </Link>
                      ) : null}
                    </p>
                    <p className="display text-2xl sm:col-span-5">
                      {org.short} vs {tx(match.opponent, locale)}
                    </p>
                    <p className="text-sm text-mist sm:col-span-2">{tx(match.event, locale)}</p>
                    <p className="font-mono text-sm sm:col-span-1 sm:text-right">
                      {match.score ? `${match.score.us}–${match.score.them}` : "—"}
                    </p>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
