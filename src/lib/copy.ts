import raw from "../../content/copy.json";

export type Locale = "de" | "en";
export type Copy = (typeof raw)["de"];

export const copy: Record<Locale, Copy> = raw;
