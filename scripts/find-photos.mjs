// Collects every Ringo pack photo the Lebanese retailers and Open Food Facts publish, plus real
// ingredient photos from Wikimedia Commons, into assets/source/ with a manifest of where each came from.
// The best ones get picked and cut out later (scripts/cutout.py); nothing here is hotlinked by the site.
// Usage: node scripts/find-photos.mjs   (needs open network, so it runs in the Find photos workflow)
import { mkdir, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';

const OUT = 'assets/source';
const UA = { 'User-Agent': 'Mozilla/5.0 (ringo-lebanon-concept photo finder; portfolio project)' };
const manifest = [];
const seen = new Set();

const slug = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

async function json(url) {
  try {
    const res = await fetch(url, { headers: { ...UA, Accept: 'application/json' } });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`skip ${url}: ${e.message}`);
    return null;
  }
}

async function text(url) {
  try {
    const res = await fetch(url, { headers: UA });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.text();
  } catch (e) {
    console.warn(`skip ${url}: ${e.message}`);
    return '';
  }
}

async function save(source, name, url, meta = {}) {
  if (!url || seen.has(url)) return;
  seen.add(url);
  try {
    const res = await fetch(url, { headers: UA });
    if (!res.ok) throw new Error(`${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8_000) return; // icons and placeholders
    const type = res.headers.get('content-type') || '';
    const ext = type.includes('png') ? '.png' : type.includes('webp') ? '.webp' : extname(new URL(url).pathname).toLowerCase() || '.jpg';
    await mkdir(`${OUT}/${source}`, { recursive: true });
    const file = `${OUT}/${source}/${slug(name)}-${manifest.length}${ext}`;
    await writeFile(file, buf);
    manifest.push({ file, source, name, url, ...meta });
    console.log(`ok ${file}`);
  } catch (e) {
    console.warn(`fail ${url}: ${e.message}`);
  }
}

const isRingo = (s = '') => /ringo/i.test(s) && !/ringos|golden wonder|petra|hala/i.test(s);

// Shopify stores (public products.json / search suggest).
async function shopify(host) {
  const lists = [
    await json(`https://${host}/collections/ringo/products.json?limit=250`),
    await json(`https://${host}/search/suggest.json?q=ringo&resources[type]=product&resources[limit]=10`),
  ];
  const products = [...(lists[0]?.products ?? []), ...(lists[1]?.resources?.results?.products ?? [])];
  for (const p of products) {
    if (!isRingo(p.title)) continue;
    const full = p.images ? p : await json(`https://${host}/products/${p.handle}.json`).then((r) => r?.product);
    for (const img of full?.images ?? []) await save(host, p.title, img.src ?? img, { page: `https://${host}/products/${p.handle}` });
    if (!full?.images && p.image) await save(host, p.title, p.image, { page: p.url });
  }
}

// WooCommerce stores (public Store API).
async function woo(host) {
  for (let page = 1; page <= 3; page++) {
    const list = await json(`https://${host}/wp-json/wc/store/v1/products?search=ringo&per_page=100&page=${page}`);
    if (!list?.length) break;
    for (const p of list) {
      if (!isRingo(p.name)) continue;
      for (const img of p.images ?? []) await save(host, p.name, img.src, { page: p.permalink, price: p.prices?.price, currency: p.prices?.currency_code });
    }
  }
}

// Open Food Facts (CC BY-SA).
async function off() {
  for (const q of ['ringo', 'ringo chips', 'solino']) {
    const r = await json(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&json=1&page_size=100&fields=code,product_name,brands,countries,image_front_url`);
    for (const p of r?.products ?? []) {
      const label = `${p.brands ?? ''} ${p.product_name ?? ''}`;
      if (!/ringo|solino/i.test(label) || /ringos|golden wonder/i.test(label)) continue;
      await save('openfoodfacts', label, p.image_front_url, { page: `https://world.openfoodfacts.org/product/${p.code}`, license: 'CC BY-SA 3.0', countries: p.countries });
    }
  }
}

// The official site: every image on the home and products pages.
async function solino() {
  for (const path of ['', 'products', 'ringo', 'our-brands', 'brands']) {
    const html = await text(`https://solinogroup.com/${path}`);
    const srcs = [...html.matchAll(/(?:src|data-src|href)=["']([^"']+\.(?:png|jpe?g|webp))["']/gi)].map((m) => new URL(m[1], 'https://solinogroup.com/').href);
    for (const s of srcs) await save('solinogroup', s.split('/').pop(), s, { page: `https://solinogroup.com/${path}` });
  }
  const media = await json('https://solinogroup.com/wp-json/wp/v2/media?per_page=100');
  for (const m of media ?? []) await save('solinogroup', m.slug, m.source_url, { page: m.link });
}

// Real ingredients from Wikimedia Commons, with licence and author for the credits.
const INGREDIENTS = {
  peanut: 'peanuts in shell isolated white background',
  'peanut-kernel': 'roasted peanuts kernels white background',
  popcorn: 'popcorn isolated white background',
  corn: 'corn cob isolated white background',
  'sweet-corn': 'sweet corn kernels white background',
  chilli: 'red chili pepper isolated white background',
  tomato: 'tomato isolated white background',
  ketchup: 'ketchup splash',
  cheese: 'cheddar cheese isolated white background',
  'cheese-cube': 'cheese cubes white background',
  salt: 'coarse sea salt crystals',
  vinegar: 'vinegar bottle white background',
  potato: 'potato isolated white background',
  'potato-chip': 'potato chips isolated white background',
  pizza: 'pizza slice isolated white background',
  oregano: 'oregano leaves white background',
  paprika: 'paprika powder',
  'palm-tree': 'coconut palm tree isolated',
  wave: 'sea wave splash',
  crown: 'crown isolated white background',
};

async function commons() {
  for (const [key, q] of Object.entries(INGREDIENTS)) {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=8&gsrsearch=${encodeURIComponent(`${q} filetype:bitmap`)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1400`;
    const r = await json(api);
    for (const page of Object.values(r?.query?.pages ?? {})) {
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const md = info.extmetadata ?? {};
      await save(`commons/${key}`, page.title.replace(/^File:/, ''), info.thumburl ?? info.url, {
        page: info.descriptionurl,
        license: md.LicenseShortName?.value,
        author: md.Artist?.value?.replace(/<[^>]+>/g, '').trim(),
      });
    }
  }
}

await Promise.all([
  shopify('papayaexpress.com'),
  shopify('quickmartlb.com'),
  shopify('crescentmarket.shop'),
  woo('tripolimarket.com'),
  woo('chtouraroyal.com'),
  off(),
  solino(),
]);
await commons();

await mkdir(OUT, { recursive: true });
await writeFile(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(`${manifest.length} photos saved`);
