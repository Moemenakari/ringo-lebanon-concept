import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { INGREDIENTS } from './ingredients';
import { PRODUCTS } from './products';

// vite preview answers 200 for missing files, so the smoke test can't catch a broken image. This can.
const has = (src: string) => existsSync(resolve(process.cwd(), 'public', src.replace(/^\//, '')));

describe('every image the page asks for exists in public/', () => {
  it('packs', () => {
    for (const p of PRODUCTS) expect(has(p.pack), p.pack).toBe(true);
  });

  it('ingredient photos', () => {
    for (const list of Object.values(INGREDIENTS)) for (const src of list) expect(has(src), src).toBe(true);
  });

  it('brand and story assets', () => {
    for (const src of ['/brand/ringo-logo.webp', '/brand/crown.webp', '/brand/flag.webp', '/brand/made-in-lebanon.webp', '/photos/factory.webp', '/photos/line-1.webp', '/photos/line-2.webp'])
      expect(has(src), src).toBe(true);
  });
});
