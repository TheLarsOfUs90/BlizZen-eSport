import type { Copy } from "@/lib/copy";

export function aboutNav(t: Copy) {
  return [
    { to: "/about" as const, label: t.nav.aboutBlizzen },
    { to: "/about/brand" as const, label: t.nav.brand },
    { to: "/about/partners" as const, label: t.nav.partners },
    { to: "/about/media" as const, label: t.nav.media },
    { to: "/about/contact" as const, label: t.nav.contact },
  ];
}
