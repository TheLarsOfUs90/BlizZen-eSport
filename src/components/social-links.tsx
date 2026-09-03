import { org } from "@/data/org";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/external-link";

export function SocialLinks({ className }: { className?: string }) {
  const { t } = usePrefs();
  const links = [
    { href: org.socials.discord, label: t.social.discord, icon: <DiscordMark /> },
    { href: org.socials.x, label: t.social.x, icon: <XMark /> },
    { href: org.socials.instagram, label: t.social.instagram, icon: <InstagramMark /> },
  ].filter((item) => item.href);

  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {links.map((item) => (
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
