import site from "../../content/site.json";
import { players } from "@/data/roster";
import { publicSocialUrl, httpsUrl } from "@/lib/safe";

const discord =
  httpsUrl(site.socials.discord) ?? "https://discord.gg/F2EyDybxCf";

export const org = {
  name: site.name,
  short: site.short,
  founded: site.founded,
  members: players.length,
  hq: site.hq,
  country: site.country,
  age: site.age,
  socials: {
    discord,
    x: publicSocialUrl(site.socials.x) ?? "",
    instagram: publicSocialUrl(site.socials.instagram) ?? "",
  },
} as const;
