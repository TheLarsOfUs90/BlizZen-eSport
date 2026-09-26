import matchesJson from "../../content/matches.json";
import type { L10n } from "@/lib/prefs";
import { clip, playerId } from "@/lib/safe";
import { titles } from "@/data/roster";

export type MatchStatus = "live" | "upcoming" | "past";

export type ClubMatch = {
  id: string;
  gameId: string;
  status: MatchStatus;
  when: string;
  opponent: L10n;
  event: L10n;
  score?: { us: number; them: number };
};

function asL10n(value: unknown): L10n | undefined {
  if (!value || typeof value !== "object") return undefined;
  const rec = value as { de?: unknown; en?: unknown };
  if (typeof rec.de !== "string" || typeof rec.en !== "string") return undefined;
  return { de: clip(rec.de, 120), en: clip(rec.en, 120) };
}

function asMatch(raw: unknown): ClubMatch | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const rec = raw as Record<string, unknown>;
  const id = playerId(rec.id);
  const gameId = playerId(rec.game);
  const status = rec.status;
  if (!id || !gameId) return undefined;
  if (status !== "live" && status !== "upcoming" && status !== "past") return undefined;
  if (!titles.some((game) => game.id === gameId)) return undefined;
  const opponent = asL10n(rec.opponent);
  const event = asL10n(rec.event);
  const when = typeof rec.when === "string" ? rec.when.trim() : "";
  if (!opponent || !event || !when) return undefined;
  const scoreRaw = rec.score;
  let score: ClubMatch["score"];
  if (scoreRaw && typeof scoreRaw === "object") {
    const pair = scoreRaw as { us?: unknown; them?: unknown };
    if (typeof pair.us === "number" && typeof pair.them === "number") {
      score = { us: pair.us, them: pair.them };
    }
  }
  return { id, gameId, status, when, opponent, event, score };
}

export const matches: ClubMatch[] = Array.isArray(matchesJson)
  ? matchesJson.flatMap((row) => {
      const match = asMatch(row);
      return match ? [match] : [];
    })
  : [];

export function matchesByStatus(status: MatchStatus) {
  return matches.filter((match) => match.status === status);
}
