import type { ReactNode } from "react";
import { httpsUrl } from "@/lib/safe";

export function ExternalLink({
  href,
  children,
  className,
  onClick,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  const safe = httpsUrl(href);
  if (!safe) return null;
  return (
    <a
      href={safe}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
