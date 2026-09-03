import { org } from "@/data/org";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/external-link";
import type { SocialKind } from "@/lib/safe";

const ORDER: SocialKind[] = ["discord", "x", "instagram", "twitch", "youtube", "tiktok"];

export function SocialLinks({
  className,
  links,
}: {
  className?: string;
  links?: Partial<Record<SocialKind, string>>;
}) {
  const { t } = usePrefs();
  const source: Partial<Record<SocialKind, string>> = links ?? org.socials;
  const items = ORDER.flatMap((kind) => {
    const href = source[kind];
    if (!href) return [];
    return [{ href, label: t.social[kind], icon: iconFor(kind) }];
  });

  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {items.map((item) => (
        <li key={item.label}>
          <ExternalLink
            href={item.href}
            aria-label={item.label}
            className="inline-flex h-11 items-center gap-2 px-3 font-display text-[13px] tracking-[0.16em] text-mist uppercase transition-colors duration-150 hover:text-fog"
          >
            {item.icon}
            <span>{item.label}</span>
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

function iconFor(kind: SocialKind) {
  switch (kind) {
    case "x":
      return <XMark />;
    case "instagram":
      return <InstagramMark />;
    case "twitch":
      return <TwitchMark />;
    case "youtube":
      return <YouTubeMark />;
    case "tiktok":
      return <TikTokMark />;
    default:
      return <DiscordMark />;
  }
}

function XMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.67l-4.71-6.23-5.4 6.23H2.74l7.73-8.83L1.25 2.25h6.83l4.25 5.62 5.91-5.62Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

function DiscordMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M19.27 5.33A16.8 16.8 0 0 0 14.89 4c-.2.37-.44.85-.6 1.24a15.2 15.2 0 0 0-4.58 0A10 10 0 0 0 9.1 4a16.9 16.9 0 0 0-4.39 1.34C1.85 9.05 1.2 12.67 1.53 16.23A17 17 0 0 0 6.7 18.3c.37-.5.7-1.03.98-1.58a10.9 10.9 0 0 1-1.55-.74c.13-.1.26-.2.38-.3 3.04 1.44 6.34 1.44 9.35 0 .13.11.26.21.38.3-.5.3-1.02.55-1.55.75.28.55.61 1.08.98 1.58a16.9 16.9 0 0 0 5.18-2.07c.4-4.15-.67-7.73-2.63-10.91ZM8.68 14.18c-.91 0-1.66-.85-1.66-1.89s.73-1.9 1.66-1.9 1.68.86 1.66 1.9c0 1.04-.74 1.89-1.66 1.89Zm6.64 0c-.91 0-1.66-.85-1.66-1.89s.73-1.9 1.66-1.9 1.67.86 1.66 1.9c0 1.04-.73 1.89-1.66 1.89Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitchMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M4.3 2 3 6.2v13.1h4.5V22h2.4l2.3-2.7h3.5L21 15.4V2H4.3Zm15 12.3-2.6 2.6h-4.1l-2.3 2.7v-2.7H6.6V3.7h12.7v10.6Z" />
      <path d="M16.4 7.2h-1.6v4.8h1.6V7.2Zm-4.3 0H10.5v4.8h1.6V7.2Z" />
    </svg>
  );
}

function YouTubeMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M23 12.2s0-3.3-.4-4.8c-.2-.9-.9-1.6-1.8-1.8C19.2 5.2 12 5.2 12 5.2s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 8.9 1 12.2 1 12.2s0 3.3.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.8.4-4.8ZM9.8 15.6V8.8l6.2 3.4-6.2 3.4Z" />
    </svg>
  );
}

function TikTokMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      <path d="M14.7 3c.4 2.6 1.9 4.6 4.3 5v3c-1.5 0-2.9-.5-4.1-1.3v6.4A6.2 6.2 0 1 1 8.3 10v3.2a3.1 3.1 0 1 0 2.2 3V3h4.2Z" />
    </svg>
  );
}
