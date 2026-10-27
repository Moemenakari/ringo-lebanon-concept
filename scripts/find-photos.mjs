// Collects every Ringo pack photo the Lebanese retailers and Open Food Facts publish, plus real
// ingredient photos from Wikimedia Commons, into assets/source/ with a manifest of where each came from.
// The best ones get picked and cut out later (scripts/cutout.py); nothing here is hotlinked by the site.
// Usage: node scripts/find-photos.mjs   (needs open network, so it runs in the Find photos workflow)
import { createHash } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';

const OUT = 'assets/source';
const UA = { 'User-Agent': 'RingoConceptPhotoFinder/1.0 (https://github.com/Moemenakari/ringo-lebanon-concept; mouemenakkarie3@gmail.com)' };
const BROWSER = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', 'Accept-Language': 'en' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
    const res = await fetch(url, { headers: BROWSER });
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
    const file = `${OUT}/${source}/${slug(name)}-${createHash('sha1').update(url).digest('hex').slice(0, 6)}${ext}`;
    await writeFile(file, buf);
    manifest.push({ file, source, name, url, ...meta });
    console.log(`ok ${file}`);
  } catch (e) {
    console.warn(`fail ${url}: ${e.message}`);
  }
}

const isRingo = (s = '') => /ringo/i.test(s) && !/ringos|golden wonder|petra|hala|ringolos/i.test(s);

// Any product page: its og:image plus product gallery images.
async function page(source, url, name) {
  const html = await text(url);
  const og = [...html.matchAll(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)/gi)].map((m) => m[1]);
  const gallery = [...html.matchAll(/data-(?:large_image|zoom-image|old-hires|src)=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)/gi)].map((m) => m[1]);
  for (const src of [...og, ...gallery]) await save(source, name, new URL(src.replace(/&amp;/g, '&'), url).href, { page: url });
}

async function tripoli() {
  const links = new Set();
  for (let n = 1; n <= 4; n++) {
    const html = await text(`https://tripolimarket.com/product-tag/ringo/${n > 1 ? `page/${n}/` : ''}`);
    for (const m of html.matchAll(/href=["'](https:\/\/tripolimarket\.com\/product\/[^"'#?]+)/g)) links.add(m[1]);
  }
  console.log(`tripolimarket: ${links.size} product pages`);
  for (const l of links) await page('tripolimarket.com', l, l.split('/').filter(Boolean).pop());
}

// Shopify stores (public products.json / search suggest).
async function shopify(host) {
  const products = [];
  for (let page = 1; page <= 20; page++) {
    const r = await json(`https://${host}/products.json?limit=250&page=${page}`);
    if (!r?.products?.length) break;
    products.push(...r.products);
  }
  console.log(`${host}: ${products.length} products, ${products.filter((p) => isRingo(p.title)).length} Ringo`);
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
    const r = await json(`https://world.openfoodfacts.org/api/v2/search?${q === 'solino' ? 'brands_tags=solino' : `brands_tags=${encodeURIComponent(q.replace(' ', '-'))}`}&page_size=100&fields=code,product_name,brands,countries,image_front_url`);
    await sleep(1500);
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

// Real ingredient candidates from Wikimedia Commons: small previews go to candidates/ (uploaded as a
// workflow artifact, never committed) with the full-size URL, licence and author in candidates.json.
const CANDIDATES = 'candidates';
const candidates = [];
const INGREDIENTS = {
  peanut: ['intitle:peanuts intitle:white', 'intitle:peanut intitle:isolated', 'intitle:"Arachis hypogaea" intitle:white', 'intitle:peanuts intitle:shell'],
  popcorn: ['intitle:popcorn intitle:white', 'intitle:popcorn intitle:isolated', 'intitle:popcorn intitle:kernel'],
  corn: ['intitle:"corn cob" intitle:white', 'intitle:maize intitle:white', 'intitle:"corn on the cob"', 'intitle:"sweet corn" intitle:white'],
  chilli: ['intitle:chili intitle:white', 'intitle:chilli intitle:isolated', 'intitle:"red chili" intitle:white', 'intitle:"hot pepper" intitle:white'],
  tomato: ['intitle:tomato intitle:white', 'intitle:tomato intitle:isolated', 'intitle:"cherry tomato" intitle:white'],
  ketchup: ['intitle:ketchup', 'intitle:"tomato sauce" intitle:splash'],
  cheese: ['intitle:cheddar intitle:white', 'intitle:cheese intitle:isolated', 'intitle:"cheese cubes"', 'intitle:emmental intitle:white'],
  salt: ['intitle:"salt crystals"', 'intitle:"sea salt" intitle:white', 'intitle:"coarse salt"'],
  vinegar: ['intitle:vinegar intitle:bottle', 'intitle:vinegar intitle:white'],
  potato: ['intitle:potato intitle:white', 'intitle:potatoes intitle:isolated'],
  chips: ['intitle:"potato chips" intitle:white', 'intitle:crisps intitle:white', 'intitle:"potato chip" intitle:isolated', 'intitle:"potato chips"'],
  pizza: ['intitle:pizza intitle:white', 'intitle:"pizza slice"'],
  paprika: ['intitle:"bell pepper" intitle:white', 'intitle:"red pepper" intitle:white', 'intitle:paprika intitle:white'],
  palm: ['intitle:"palm leaf" intitle:white', 'intitle:"palm frond"', 'intitle:"coconut palm" intitle:isolated'],
  splash: ['intitle:"water splash" intitle:white', 'intitle:"water splash" intitle:black', 'intitle:splash intitle:isolated'],
  bubbles: ['intitle:"soap bubbles" intitle:black', 'intitle:bubbles intitle:water intitle:black'],
  flame: ['intitle:fire intitle:"black background"', 'intitle:flame intitle:black'],
  basil: ['intitle:basil intitle:white', 'intitle:oregano intitle:white'],
};

async function commons() {
  await mkdir(CANDIDATES, { recursive: true });
  for (const [key, queries] of Object.entries(INGREDIENTS)) {
    for (const q of queries) {
      const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch=${encodeURIComponent(`${q} filetype:bitmap`)}&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=420`;
      const r = await json(api);
      await sleep(700);
      for (const page of Object.values(r?.query?.pages ?? {})) {
        const info = page.imageinfo?.[0];
        if (!info?.thumburl || seen.has(info.url)) continue;
        seen.add(info.url);
        const res = await fetch(info.thumburl, { headers: UA }).catch(() => null);
        if (!res?.ok) continue;
        const id = `${key}-${candidates.length}`;
        await writeFile(`${CANDIDATES}/${id}.jpg`, Buffer.from(await res.arrayBuffer()));
        const md = info.extmetadata ?? {};
        candidates.push({
          id, key, title: page.title, url: info.url, width: info.width, height: info.height, page: info.descriptionurl,
          license: md.LicenseShortName?.value, author: md.Artist?.value?.replace(/<[^>]+>/g, '').trim(),
        });
      }
    }
    console.log(`commons ${key}: ${candidates.filter((c) => c.key === key).length}`);
  }
  await writeFile(`${CANDIDATES}/candidates.json`, JSON.stringify(candidates, null, 2) + '\n');
}

await rm(OUT, { recursive: true, force: true });
await Promise.all([
  shopify('papayaexpress.com'),
  shopify('quickmartlb.com'),
  shopify('crescentmarket.shop'),
  woo('tripolimarket.com'),
  woo('chtouraroyal.com'),
  off(),
  solino(),
  tripoli(),
  page('ebay', 'https://www.ebay.com/itm/373379975902', 'ringo 10 flavors'),
  page('amazon', 'https://www.amazon.com/Lebanese-Ringo-Chips-Popcorn-Flavor/dp/B0DYK73XYM', 'ringo popcorn 5x22g'),
  page('amazon', 'https://www.amazon.com/Lebanese-Ringo-Chips-Peanut-Flavor/dp/B0DYK37P97', 'ringo peanut 5x22g'),
  page('ubuy', 'https://www.ubuy.com.lb/en/product/54PMBDCUU-lebanese-ringo-chips-ten-flavors-lebanese-snacks-22g-bags-wholesale-deal-popcorn-49-bags', 'ringo ten flavors'),
  page('chtouraroyal.com', 'https://chtouraroyal.com/product/ringo-chips-cheese-balls-lebanon-40-20g/', 'ringo cheese balls 20g'),
  page('chtouraroyal.com', 'https://chtouraroyal.com/product/ringo-chips-salt-and-vinegar-lebanon-4020g/', 'ringo salt and vinegar 20g'),
  page('quickmartlb.com', 'https://quickmartlb.com/products/ringo-sweet-corn-chips-25g', 'ringo sweet corn 25g'),
  commons(),
]);

await mkdir(OUT, { recursive: true });
await writeFile(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(`${manifest.length} photos saved`);
