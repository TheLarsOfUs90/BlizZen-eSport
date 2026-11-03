import list from "../../content/achievements.json";
import type { L10n } from "@/lib/prefs";
import { clip, mediaPath, playerId } from "@/lib/safe";
import { games } from "@/data/roster";

export type ClubAchievement = {
  year: string;
  title: L10n;
  gameId?: string;
  image?: string;
  body?: L10n;
  tags?: string[];
};

function asL10n(value: unknown, max = 160): L10n | undefined {
  if (!value || typeof value !== "object") return undefined;
  const rec = value as { de?: unknown; en?: unknown };
  if (typeof rec.de !== "string" || typeof rec.en !== "string") return undefined;
  const de = clip(rec.de, max);
  const en = clip(rec.en, max);
  if (!de || !en) return undefined;
  return { de, en };
}

function asTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const tags: string[] = [];
  const seen = new Set<string>();
  for (const row of value) {
    if (typeof row !== "string") continue;
    const tag = row.trim().replace(/^#+/, "");
    if (!/^[A-Za-z0-9_]{1,32}$/.test(tag)) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    tags.push(tag);
    if (tags.length >= 8) break;
  }
  return tags;
}

function asAchievement(raw: unknown): ClubAchievement | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const rec = raw as Record<string, unknown>;
  const year = typeof rec.year === "string" ? rec.year.trim() : "";
  const title = asL10n(rec.title, 160);
  if (!year || !title) return undefined;
  const gameKey = playerId(rec.game);
  const gameId = gameKey && games.some((game) => game.id === gameKey) ? gameKey : undefined;
  const tags = asTags(rec.tags);
  return {
    year: clip(year, 12),
    title,
    gameId,
    image: mediaPath(rec.image),
    body: asL10n(rec.body, 240),
    tags: tags.length > 0 ? tags : undefined,
  };
}

export const clubAchievements: ClubAchievement[] = Array.isArray(list)
  ? list.flatMap((row) => {
      const item = asAchievement(row);
      return item ? [item] : [];
    })
  : [];

export type ListedAchievement = ClubAchievement & { gameShort?: string };

export function allAchievements(): ListedAchievement[] {
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
  const seen = new Set<string>();
  const merged: ListedAchievement[] = [];
  for (const item of [...fromClub, ...fromGames]) {
    const key = `${item.year}|${item.title.de}|${item.gameId ?? "club"}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }
  return merged.sort((a, b) => b.year.localeCompare(a.year));
}

export function achievementsForGame(gameId: string) {
  return allAchievements().filter((item) => item.gameId === gameId);
}
