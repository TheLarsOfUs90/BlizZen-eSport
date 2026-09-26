import list from "../../content/achievements.json";
import type { L10n } from "@/lib/prefs";
import { clip } from "@/lib/safe";
import { games } from "@/data/roster";

export type ClubAchievement = {
  year: string;
  title: L10n;
  gameId?: string;
};

function asL10n(value: unknown): L10n | undefined {
  if (!value || typeof value !== "object") return undefined;
  const rec = value as { de?: unknown; en?: unknown };
  if (typeof rec.de !== "string" || typeof rec.en !== "string") return undefined;
  return { de: clip(rec.de, 160), en: clip(rec.en, 160) };
}

function asAchievement(raw: unknown): ClubAchievement | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const rec = raw as { year?: unknown; title?: unknown; game?: unknown };
  const year = typeof rec.year === "string" ? rec.year.trim() : "";
  const title = asL10n(rec.title);
  if (!year || !title) return undefined;
  const gameId = typeof rec.game === "string" ? rec.game.trim() : "";
  return { year: clip(year, 12), title, gameId: gameId || undefined };
}

export const clubAchievements: ClubAchievement[] = Array.isArray(list)
  ? list.flatMap((row) => {
      const item = asAchievement(row);
      return item ? [item] : [];
    })
  : [];

export function allAchievements(): (ClubAchievement & { gameShort?: string })[] {
  const fromGames = games.flatMap((game) =>
    game.achievements.map((item) => ({
      year: item.year,
      title: item.title,
      gameId: game.id,
      gameShort: game.short,
    })),
  );
  const fromClub = clubAchievements.map((item) => ({
    ...item,
    gameShort: games.find((game) => game.id === item.gameId)?.short,
  }));
  return [...fromClub, ...fromGames].sort((a, b) => b.year.localeCompare(a.year));
}
