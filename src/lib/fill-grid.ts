/** Card grids with gap-px + bg-edge paint empty tracks as a full extra cell.
 *  Use 3 columns only when the count fills them; otherwise 2. A leftover
 *  last item spans the row so no empty track stays visible. */
export function fillCols(count: number, from: "sm" | "always" = "sm") {
  if (count <= 1) return "";
  if (from === "always") {
    return count % 3 === 0 ? "grid-cols-3" : "grid-cols-2";
  }
  return count % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2";
}

export function fillColsCount(count: number) {
  if (count <= 1) return 1;
  return count % 3 === 0 ? 3 : 2;
}

export function isOrphan(index: number, count: number) {
  if (count <= 1) return false;
  const cols = fillColsCount(count);
  return count % cols === 1 && index === count - 1;
}

/** Stretch the leftover cell across the row so bg-edge never shows as an empty slot. */
export function fillSpan(index: number, count: number, from: "sm" | "always" = "sm") {
  if (!isOrphan(index, count)) return undefined;
  const cols = fillColsCount(count);
  if (from === "always") return cols === 2 ? "col-span-2" : "col-span-3";
  return cols === 2 ? "sm:col-span-2" : "sm:col-span-3";
}

export function orphanSlot(from: "sm" | "always" = "sm") {
  return from === "always"
    ? "col-span-2 flex justify-center bg-void"
    : "sm:col-span-2 sm:flex sm:justify-center sm:bg-void";
}

export function orphanCard(from: "sm" | "always" = "sm") {
  return from === "always" ? "w-full max-w-[50%]" : "w-full sm:max-w-[50%]";
}
