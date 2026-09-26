export const brandColors = [
  { name: "Void", hex: "#0A0E1A", token: "void", note: { de: "Hintergrund", en: "Background" } },
  { name: "Panel", hex: "#111827", token: "panel", note: { de: "Karten, Flächen", en: "Cards, surfaces" } },
  { name: "Fog", hex: "#F4F6FA", token: "fog", note: { de: "Text hell", en: "Primary text" } },
  { name: "Mist", hex: "#8B95A8", token: "mist", note: { de: "Fließtext", en: "Body copy" } },
  { name: "Edge", hex: "#243049", token: "edge", note: { de: "Linien, Raster", en: "Lines, grid" } },
  { name: "Ice", hex: "#E8EEF6", token: "ice", note: { de: "Akzent, Blitz", en: "Accent, lightning" } },
  { name: "Live", hex: "#7EC8FF", token: "live", note: { de: "Signal, aktiv", en: "Signal, active" } },
] as const;

export const brandLogos = [
  { id: "mark", file: "brand/logo-mark.png", invert: true, label: { de: "Zeichen", en: "Mark" } },
  { id: "full", file: "brand/logo-full.jpg", invert: false, label: { de: "Wortmarke", en: "Wordmark" } },
  { id: "square", file: "brand/logo-square.png", invert: false, label: { de: "Quadrat", en: "Square" } },
] as const;
