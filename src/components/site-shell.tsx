import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-void text-fog">
      <ScrollProgress />
      <SiteHeader />
      <main className={import.meta.env.VITE_PREVIEW === "1" ? "flex-1 pt-[6.25rem]" : "flex-1 pt-16"}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
