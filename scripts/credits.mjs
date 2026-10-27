// Writes src/data/credits.ts from the ingredient photos actually used (scripts/cutouts.json + scripts/picks.json).
import { readFileSync, writeFileSync } from 'node:fs';

const picks = JSON.parse(readFileSync('scripts/picks.json', 'utf8'));
const jobs = JSON.parse(readFileSync('scripts/cutouts.json', 'utf8'));
const used = new Set(jobs.map((j) => j.src));
const credits = picks
  .filter((p) => used.has(p.url))
  .map((p) => ({
    what: p.key.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()),
    title: p.title.replace(/^File:/, '').replace(/\.(jpe?g|png|webp)$/i, ''),
    page: p.page,
    author: p.author || undefined,
    license: p.license || 'see source',
  }));

writeFileSync('src/data/credits.ts', `/** Ingredient photo credits, written by scripts/credits.mjs from scripts/picks.json. */
export interface Credit {
  what: string;
  title: string;
  page: string;
  author?: string;
  license: string;
}

export const CREDITS: Credit[] = ${JSON.stringify(credits, null, 2)};
`);
console.log(`${credits.length} credits`);
