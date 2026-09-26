import type { Copy } from "@/lib/copy";

export function teamNav(t: Copy) {
  return [
    { to: "/roster" as const, label: t.nav.members },
    { to: "/games" as const, label: t.nav.allTeams },
    { to: "/matches" as const, label: t.nav.matches },
    { to: "/achievements" as const, label: t.nav.achievements },
  ];
}

export function teamNavActive(pathname: string) {
  return (
    pathname === "/roster" ||
    pathname.startsWith("/roster/") ||
    pathname === "/games" ||
    pathname.startsWith("/games/") ||
    pathname === "/matches" ||
    pathname === "/achievements"
  );
}
