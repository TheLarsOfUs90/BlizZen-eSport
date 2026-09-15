/** Card grids with gap-px + bg-edge paint empty tracks as a full extra cell.
 *  Use 3 columns only when the count fills them; otherwise 2. A leftover
 *  last card spans the row and stays one-cell wide, centered. */
export function fillCols(count: number, from: "sm" | "always" = "sm") {
  if (count <= 1) return "";
  if (from === "always") {
    return count % 3 === 0 ? "grid-cols-3" : "grid-cols-2";
  }
  return count % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2";
}

export function fillSpan(index: number, count: number, from: "sm" | "always" = "sm") {
  if (count <= 1) return undefined;
  const cols = count % 3 === 0 ? 3 : 2;
  if (count % cols !== 1 || index !== count - 1) return undefined;
  if (from === "always") {
    return cols === 2
      ? "col-span-2 w-full max-w-[50%] justify-self-center"
      : "col-span-3 w-full max-w-[33.333%] justify-self-center";
  }
  return cols === 2
    ? "sm:col-span-2 sm:w-full sm:max-w-[50%] sm:justify-self-center"
    : "sm:col-span-3 sm:w-full sm:max-w-[33.333%] sm:justify-self-center";
}
