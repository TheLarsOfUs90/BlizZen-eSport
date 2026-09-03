const SOCIAL_HOSTS = new Set([
  "discord.gg",
  "discord.com",
  "www.discord.com",
  "x.com",
  "www.x.com",
  "twitter.com",
  "www.twitter.com",
  "instagram.com",
  "www.instagram.com",
  "youtube.com",
  "www.youtube.com",
  "youtu.be",
  "twitch.tv",
  "www.twitch.tv",
  "tiktok.com",
  "www.tiktok.com",
]);

const GENERIC_SOCIAL = new Set([
  "https://x.com/",
  "https://x.com",
  "https://twitter.com/",
  "https://twitter.com",
  "https://instagram.com/",
  "https://instagram.com",
  "https://www.instagram.com/",
  "https://www.instagram.com",
  "https://discord.com/",
  "https://discord.com",
  "https://www.discord.com/",
  "https://www.discord.com",
]);

export function httpsUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const raw = value.trim();
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return undefined;
    if (url.username || url.password) return undefined;
    const host = url.hostname.toLowerCase();
    if (!SOCIAL_HOSTS.has(host)) return undefined;
    if (url.href.length > 300) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function publicSocialUrl(value: unknown): string | undefined {
  const url = httpsUrl(value);
  if (!url) return undefined;
  const normalized = url.replace(/\/$/, "");
  if (GENERIC_SOCIAL.has(url) || GENERIC_SOCIAL.has(normalized)) return undefined;
  return url;
}

export function mediaPath(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim().replace(/^\/+/, "");
  if (!cleaned || cleaned.includes("..") || cleaned.includes("\\") || cleaned.includes("//")) {
    return undefined;
  }
  if (!/^(media|brand)\/[A-Za-z0-9._/-]+$/.test(cleaned)) return undefined;
  if (!/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(cleaned)) return undefined;
  if (cleaned.length > 180) return undefined;
  return cleaned;
}

export function playerId(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const id = value.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,62}$/.test(id)) return undefined;
  return id;
}

export function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  const text = value.trim();
  return text.length > max ? text.slice(0, max) : text;
}

export function publicEmail(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const email = value.trim();
  if (!email || email.length > 120) return undefined;
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return undefined;
  if (email.includes("..") || email.includes("\\")) return undefined;
  return email;
}

export type SocialKind = "discord" | "x" | "instagram" | "twitch" | "youtube" | "tiktok";

export function playerSocials(raw: unknown): Partial<Record<SocialKind, string>> {
  if (!raw || typeof raw !== "object") return {};
  const rec = raw as Record<string, unknown>;
  const out: Partial<Record<SocialKind, string>> = {};
  for (const key of ["discord", "x", "instagram", "twitch", "youtube", "tiktok"] as const) {
    const url = publicSocialUrl(rec[key]);
    if (url) out[key] = url;
  }
  return out;
}
