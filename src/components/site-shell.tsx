import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-void text-fog">
      {import.meta.env.VITE_PREVIEW === "1" ? (
        <p className="border-b border-edge bg-panel px-4 py-2 text-center font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
          Preview — nicht die Live-Seite
        </p>
      ) : null}
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
