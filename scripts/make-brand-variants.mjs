import sharp from "sharp";
import { copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(
  "C:/Users/keule/Documents/Projekte/blizzen-esport/extracted/public/brand/logo-full.jpg",
);
const dest = join(root, "public", "brand");

copyFileSync(src, join(dest, "logo-full.jpg"));
await sharp(src).png({ compressionLevel: 9 }).toFile(join(dest, "logo-square.png"));

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minC = Math.min(r, g, b);
    const maxC = Math.max(r, g, b);
    const nearWhite = maxC - minC < 55;
    let alpha = 0;
    if (nearWhite && minC >= 170) alpha = 255;
    else if (nearWhite && minC >= 110) alpha = Math.round(((minC - 110) / 60) * 255);
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = alpha;
    if (alpha > 20) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
}

if (maxX < minX) {
  throw new Error("logo-mark: no white mark found");
}

const pad = 24;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

await sharp(data, { raw: { width, height, channels } })
  .extract({
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  })
  .png({ compressionLevel: 9 })
  .toFile(join(dest, "logo-mark.png"));

const mark = await sharp(join(dest, "logo-mark.png")).metadata();
const square = await sharp(join(dest, "logo-square.png")).metadata();
console.log("logo-mark", mark.width, mark.height);
console.log("logo-square", square.width, square.height);
