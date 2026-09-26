import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { brandLogos } from "@/data/brand";
import { titles } from "@/data/roster";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/about/media")({ component: MediaPage });

const wallpapers = [
  { file: "media/hero-arena.jpg", label: { de: "Arena", en: "Arena" } },
  { file: "og.jpg", label: { de: "Open Graph", en: "Open Graph" } },
  { file: "x-banner.jpg", label: { de: "Banner", en: "Banner" } },
];

function MediaPage() {
  const { t, locale } = usePrefs();

  return (
    <SiteShell>
      <PageHero kicker={t.media.kicker} title={t.media.title} dek={t.media.dek} />

      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <p className="kicker">{t.media.logoKicker}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{t.media.logoH}</h2>
          <p className="mt-4 max-w-2xl text-mist">
            {t.media.logoP}{" "}
            <Link to="/about/brand" className="text-fog underline-offset-4 hover:underline">
              {t.nav.brand}
            </Link>
            .
          </p>
          <ul className="mt-10 grid gap-px bg-edge sm:grid-cols-3">
            {brandLogos.map((logo) => (
              <li key={logo.id} className="bg-void p-6">
                <div className="grid h-36 place-items-center bg-panel">
                  <img src={asset(logo.file)} alt="" className="logo-mark max-h-20 w-auto" style={{ outline: "none" }} />
                </div>
                <p className="kicker mt-4">{tx(logo.label, locale)}</p>
                <a
                  href={asset(logo.file)}
                  download
                  className="mt-3 inline-block font-mono text-[11px] tracking-[0.18em] text-mist uppercase hover:text-fog"
                >
                  {t.brand.download}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <p className="kicker">{t.media.wallKicker}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{t.media.wallH}</h2>
          <p className="mt-4 max-w-2xl text-mist">{t.media.wallP}</p>
          <ul className="mt-10 grid gap-px bg-edge sm:grid-cols-3">
            {wallpapers.map((item) => (
              <li key={item.file} className="bg-void">
                <img src={asset(item.file)} alt="" className="aspect-video w-full object-cover" />
                <div className="p-5">
                  <p className="kicker">{tx(item.label, locale)}</p>
                  <a
                    href={asset(item.file)}
                    download
                    className="mt-3 inline-block font-mono text-[11px] tracking-[0.18em] text-mist uppercase hover:text-fog"
                  >
                    {t.brand.download}
                  </a>
                </div>
              </li>
            ))}
            {titles
              .filter((game) => game.cover)
              .map((game) => (
                <li key={game.id} className="bg-void">
                  <img src={asset(game.cover!)} alt="" className="aspect-video w-full object-cover" />
                  <div className="p-5">
                    <p className="kicker">{game.short}</p>
                    <p className="display mt-1 text-2xl">{tx(game.name, locale)}</p>
                    <a
                      href={asset(game.cover!)}
                      download
                      className="mt-3 inline-block font-mono text-[11px] tracking-[0.18em] text-mist uppercase hover:text-fog"
                    >
                      {t.brand.download}
                    </a>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
