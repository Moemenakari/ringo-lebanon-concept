// Cut a product out of a white/near-white studio background with a soft edge.
// Usage: node cutout.mjs <input> <output.webp> [maxWidth=720] [tolerance=26]
// Needs: npm i sharp
import sharp from 'sharp';

const [, , input, output, maxW = '720', tol = '26'] = process.argv;
if (!input || !output) {
  console.error('Usage: node cutout.mjs <input> <output.webp> [maxWidth] [tolerance]');
  process.exit(1);
}
const TOL = +tol;
const FEATHER = 18;

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const dist = (i) => 765 - (data[i] + data[i + 1] + data[i + 2]); // 0 = pure white
const seen = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
while (stack.length) {
  const p = stack.pop();
  if (seen[p]) continue;
  const d = dist(p * 4);
  if (d > TOL + FEATHER) continue;
  seen[p] = 1;
  data[p * 4 + 3] = d <= TOL ? 0 : Math.round(((d - TOL) / FEATHER) * 255);
  if (d > TOL) continue;
  const x = p % w;
  if (x > 0) stack.push(p - 1);
  if (x < w - 1) stack.push(p + 1);
  if (p >= w) stack.push(p - w);
  if (p < w * (h - 1)) stack.push(p + w);
}
await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .trim({ threshold: 1 })
  .resize({ width: +maxW, height: +maxW, fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 82, alphaQuality: 88, effort: 6 })
  .toFile(output);
console.log(`✓ ${output}`);
