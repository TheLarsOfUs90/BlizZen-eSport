import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { usePrefs } from "@/lib/prefs";

export function AppNotFound() {
  const { t } = usePrefs();
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-10">
        <p className="kicker">404</p>
        <h1 className="display mt-4 text-7xl sm:text-8xl">{t.notFound.title}</h1>
        <p className="mt-4 max-w-md text-mist">{t.notFound.dek}</p>
        <Button asChild className="mt-8">
          <Link to="/">{t.notFound.cta}</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
