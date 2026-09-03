import site from "../../content/site.json";
import team from "../../content/team.json";
import type { L10n } from "@/lib/prefs";
import { clip, mediaPath, playerId } from "@/lib/safe";

export type Player = {
  id: string;
  ign: string;
  name?: string;
  role: L10n;
  country: L10n;
  countryCode: string;
  image?: string;
  quote: L10n;
  bio: L10n;
  featured?: boolean;
  stats: { label: L10n; value: string }[];
};

function asL10n(value: unknown): L10n | undefined {
  if (!value || typeof value !== "object") return undefined;
  const rec = value as { de?: unknown; en?: unknown };
  if (typeof rec.de !== "string" || typeof rec.en !== "string") return undefined;
  return { de: clip(rec.de, 800), en: clip(rec.en, 800) };
}

function asPlayer(raw: (typeof team)[number]): Player | undefined {
  const id = playerId(raw.id);
  const ign = clip(raw.ign, 40);
  const role = asL10n(raw.role);
  const country = asL10n(raw.country);
  const quote = asL10n(raw.quote);
  const bio = asL10n(raw.bio);
  if (!id || !ign || !role || !country || !quote || !bio) return undefined;

  const stats = Array.isArray(raw.stats)
    ? raw.stats.flatMap((row) => {
        const label = asL10n(row.label);
        const value = clip(row.value, 40);
        return label && value ? [{ label, value }] : [];
      })
    : [];

  const name = clip(raw.name, 60);
  return {
    id,
    ign,
    name: name || undefined,
    role,
    country,
    countryCode: clip(raw.countryCode, 4).toUpperCase() || "DE",
    image: mediaPath(raw.image),
    quote,
    bio,
    featured: Boolean(raw.featured),
    stats: stats.slice(0, 6),
  };
}

export const titles = site.games.map((game) => ({
  id: game.id,
  name: game.name,
  short: game.short,
  blurb: game.blurb,
  soon: "soon" in game ? Boolean(game.soon) : false,
}));

export const players: Player[] = team.flatMap((row) => {
  const player = asPlayer(row);
  return player ? [player] : [];
});

export function getPlayer(id: string) {
  const safe = playerId(id);
  if (!safe) return undefined;
  return players.find((p) => p.id === safe);
}

export function featuredPlayers() {
  const featured = players.filter((p) => p.featured);
  return featured.length > 0 ? featured : players.slice(0, 1);
}
