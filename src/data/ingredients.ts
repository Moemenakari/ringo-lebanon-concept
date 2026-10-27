import type { Ingredient } from './products';

/** Real photo cut-outs for every ingredient (several angles each, so a cloud of them never repeats). */
export const INGREDIENTS: Record<Ingredient, string[]> = {
  peanut: ['/ingredients/peanut-1.webp', '/ingredients/peanut-2.webp'],
  'peanut-kernel': ['/ingredients/peanut-kernel-1.webp', '/ingredients/peanut-kernel-2.webp'],
  popcorn: ['/ingredients/popcorn-1.webp', '/ingredients/popcorn-2.webp', '/ingredients/popcorn-3.webp'],
  corn: ['/ingredients/corn-1.webp'],
  chilli: ['/ingredients/chilli-1.webp', '/ingredients/chilli-2.webp'],
  tomato: ['/ingredients/tomato-1.webp', '/ingredients/tomato-2.webp'],
  cheese: ['/ingredients/cheese-1.webp', '/ingredients/cheese-2.webp'],
  salt: ['/ingredients/salt-1.webp'],
  chip: ['/ingredients/chip-1.webp', '/ingredients/chip-2.webp', '/ingredients/chip-3.webp'],
  splash: ['/ingredients/splash-1.webp'],
  bubble: ['/ingredients/bubble-1.webp'],
  flame: ['/ingredients/flame-1.webp'],
  paprika: ['/ingredients/paprika-1.webp'],
  basil: ['/ingredients/basil-1.webp'],
  pizza: ['/ingredients/pizza-1.webp'],
};

/** Small deterministic PRNG so every pack's cloud of ingredients is the same on every visit. */
export function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export type Depth = 'far' | 'mid' | 'near';

export interface Float {
  src: string;
  depth: Depth;
  x: number; // % of the hero width
  y: number; // % of the hero height
  size: number; // px at desktop
  rotate: number;
  delay: number;
  duration: number;
}

/** Lay out a cloud of real ingredients in three depth layers, kept clear of the copy on the left. */
export function layoutFloats(id: string, kinds: Ingredient[], count: number): Float[] {
  const rnd = seeded(id);
  const out: Float[] = [];
  for (let i = 0; i < count; i++) {
    const depth: Depth = i % 5 === 0 ? 'near' : i % 2 ? 'mid' : 'far';
    const list = INGREDIENTS[kinds[i % kinds.length]];
    out.push({
      src: list[Math.floor(rnd() * list.length)],
      depth,
      x: 30 + rnd() * 68,
      y: 6 + rnd() * 86,
      size: depth === 'near' ? 120 + rnd() * 60 : depth === 'mid' ? 70 + rnd() * 40 : 44 + rnd() * 26,
      rotate: rnd() * 360,
      delay: rnd() * -12,
      duration: 9 + rnd() * 9,
    });
  }
  return out;
}
