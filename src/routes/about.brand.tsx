import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { brandColors, brandLogos } from "@/data/brand";
import { usePrefs, tx } from "@/lib/prefs";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/about/brand")({ component: BrandPage });

function BrandPage() {
  const { t, locale } = usePrefs();

  return (
    <SiteShell>
      <PageHero kicker={t.brand.kicker} title={t.brand.title} dek={t.brand.dek} />

      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <p className="kicker">{t.brand.logoKicker}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{t.brand.logoH}</h2>
          <p className="mt-4 max-w-2xl text-mist">{t.brand.logoP}</p>
          <ul className="mt-10 grid gap-px bg-edge sm:grid-cols-3">
            {brandLogos.map((logo) => (
              <li key={logo.id} className="bg-void p-8">
                <div className="grid h-40 place-items-center bg-panel">
                  <img
                    src={asset(logo.file)}
                    alt=""
                    className="logo-mark max-h-24 w-auto"
                    style={{ outline: "none" }}
                  />
                </div>
                <p className="kicker mt-5">{tx(logo.label, locale)}</p>
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
          <ul className="mt-8 max-w-2xl space-y-2 text-sm text-mist">
            {t.brand.logoRules.map((rule) => (
              <li key={rule}>— {rule}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <p className="kicker">{t.brand.colorKicker}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{t.brand.colorH}</h2>
          <p className="mt-4 max-w-2xl text-mist">{t.brand.colorP}</p>
          <ul className="mt-10 grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-4">
            {brandColors.map((color) => (
              <li key={color.hex} className="bg-void">
                <div className="h-28 border-b border-edge" style={{ background: color.hex }} />
                <div className="p-5">
                  <p className="kicker">{color.name}</p>
                  <p className="display mt-2 text-2xl">{color.hex}</p>
                  <p className="mt-2 text-sm text-mist">{tx(color.note, locale)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-edge">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <p className="kicker">{t.brand.typeKicker}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">{t.brand.typeH}</h2>
          <p className="mt-4 max-w-2xl text-mist">{t.brand.typeP}</p>
          <dl className="mt-10 grid gap-px bg-edge sm:grid-cols-3">
            <div className="bg-void p-6">
              <dt className="kicker">{t.brand.typeDisplay}</dt>
              <dd className="display mt-4 text-5xl">BlizZen</dd>
              <dd className="mt-3 text-sm text-mist">Barlow Condensed</dd>
            </div>
            <div className="bg-void p-6">
              <dt className="kicker">{t.brand.typeBody}</dt>
              <dd className="mt-4 text-2xl">Locker daddeln.</dd>
              <dd className="mt-3 text-sm text-mist">Manrope</dd>
            </div>
            <div className="bg-void p-6">
              <dt className="kicker">{t.brand.typeMono}</dt>
              <dd className="mt-4 font-mono text-lg tracking-wider uppercase">BLZ · 18+</dd>
              <dd className="mt-3 text-sm text-mist">IBM Plex Mono</dd>
            </div>
          </dl>
          <p className="mt-8 max-w-2xl text-sm text-mist">{t.brand.nameP}</p>
        </div>
      </section>
    </SiteShell>
  );
}
