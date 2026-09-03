import { Link } from "@tanstack/react-router";
import { org } from "@/data/org";
import { usePrefs } from "@/lib/prefs";
import { SocialLinks } from "@/components/social-links";
import { asset } from "@/lib/asset";

export function SiteFooter() {
  const { t } = usePrefs();
  return (
    <footer className="border-t border-edge bg-void">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <img
            src={asset("/brand/logo-mark.png")}
            alt="BliZzen"
            className="logo-mark h-16 w-auto"
            style={{ outline: "none" }}
          />
          <p className="display mt-6 text-5xl sm:text-6xl">{t.home.h1}</p>
          <p className="mt-4 max-w-md text-sm text-mist">{t.home.intent}</p>
          <p className="mt-2 max-w-md text-sm text-mist">{t.home.blitz}</p>
          <p className="mt-2 max-w-md text-sm text-mist">{t.home.zen}</p>
        </div>
        <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:items-end">
          <ul className="space-y-2 text-sm text-mist">
            <li>
              <Link to="/about" className="hover:text-fog">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link to="/roster" className="hover:text-fog">
                {t.nav.roster}
              </Link>
            </li>
            <li>
              <Link to="/legal" className="hover:text-fog">
                {t.nav.legal}
              </Link>
            </li>
          </ul>
          <SocialLinks className="lg:justify-end" />
        </div>
      </div>
      <div className="border-t border-edge">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-5 font-mono text-[11px] tracking-wider text-dim uppercase sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <span>
            © {new Date().getFullYear()} {org.name} · {org.hq}
          </span>
          <span>{t.footer.line}</span>
        </div>
      </div>
    </footer>
  );
}
