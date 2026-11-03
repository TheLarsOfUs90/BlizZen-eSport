import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { org } from "@/data/org";
import { matchesByGame, type ClubMatch, type MatchStatus } from "@/data/matches";
import { getGame } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matches")({ component: MatchesPage });

function MatchesPage() {
  const { t, locale } = usePrefs();
  const [tab, setTab] = useState<MatchStatus>("upcoming");
  const tabs: { id: MatchStatus; label: string }[] = [
    { id: "upcoming", label: t.matches.upcoming },
    { id: "past", label: t.matches.past },
  ];
  const groups = matchesByGame(tab);

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

          {groups.length === 0 ? (
            <div className="mt-10 grid min-h-64 place-items-center border border-edge bg-void p-10 text-center">
              <div>
                <p className="display text-4xl sm:text-5xl">{t.matches.empty}</p>
                <p className="mt-4 max-w-md text-sm text-mist">{t.matches.emptyP}</p>
              </div>
            </div>
          ) : (
            <div className="mt-10 space-y-16">
              {groups.map((group) => {
                const game = getGame(group.gameId);
                const image = group.rows.find((row) => row.image)?.image;
                const note = group.rows.find((row) => row.note)?.note;
                const info = group.rows.find((row) => row.info)?.info;
                const casters = group.rows.find((row) => row.casters?.length)?.casters;
                const moreRow = group.rows.find((row) => row.more && row.moreHref);
                return (
                  <section key={group.gameId}>
                    {image ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-panel">
                        <img
                          src={asset(image)}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                      </div>
                    ) : null}
                    <div className={cn(image ? "mt-8" : "")}>
                      <p className="kicker">{game?.short ?? group.gameId}</p>
                      <h2 className="display mt-3 text-4xl sm:text-5xl">
                        {game ? (
                          <Link to="/games/$gameId" params={{ gameId: game.id }} className="hover:underline">
                            {tx(game.name, locale)}
                          </Link>
                        ) : (
                          group.gameId
                        )}
                      </h2>
                      {note ? <p className="mt-4 max-w-2xl text-sm text-mist">{tx(note, locale)}</p> : null}
                      {casters?.length || info ? (
                        <p className="mt-3 max-w-2xl text-sm text-mist">
                          {casters?.map((caster, index) => (
                            <span key={caster.href}>
                              {index === 0 ? null : index === casters.length - 1 ? (locale === "de" ? " und " : " and ") : ", "}
                              <HostLink name={tx(caster.name, locale)} href={caster.href} />
                            </span>
                          ))}
                          {info ? ` ${tx(info, locale)}` : null}
                        </p>
                      ) : null}
                    </div>
                    <ol className="mt-8 divide-y divide-edge border-y border-edge">
                      {group.rows.map((match) => (
                        <MatchRow key={match.id} match={match} />
                      ))}
                    </ol>
                    {moreRow?.more && moreRow.moreHref ? (
                      <Button asChild className="mt-8">
                        <ExternalLink href={moreRow.moreHref}>{tx(moreRow.more, locale)}</ExternalLink>
                      </Button>
                    ) : null}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function twitchLabel(href: string) {
  try {
    const url = new URL(href);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return href;
  }
}

function HostLink({ name, href }: { name: string; href?: string }) {
  if (!href) return name;
  return (
    <>
      {name}{" "}
      <ExternalLink href={href} className="text-fog hover:underline">
        {twitchLabel(href)}
      </ExternalLink>
    </>
  );
}

function MatchRow({ match }: { match: ClubMatch }) {
  const { locale } = usePrefs();
  return (
    <li className="grid gap-3 py-6 sm:grid-cols-12 sm:items-center">
      <p className="kicker sm:col-span-3">{tx(match.when, locale)}</p>
      <p className="display text-2xl sm:col-span-5">
        {match.kind === "event" ? tx(match.event, locale) : `${org.short} vs ${tx(match.opponent, locale)}`}
      </p>
      <p className={cn("text-sm text-mist", match.kind === "match" ? "sm:col-span-3" : "sm:col-span-4")}>
        {match.kind === "event" ? tx(match.opponent, locale) : tx(match.event, locale)}
      </p>
      {match.kind === "match" ? (
        <p className="font-mono text-sm sm:col-span-1 sm:text-right">
          {match.score ? `${match.score.us}–${match.score.them}` : "—"}
        </p>
      ) : null}
    </li>
  );
}
