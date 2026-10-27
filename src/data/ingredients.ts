import type { Ingredient } from './products';

/** Every ingredient drawn in the same style as the mascots (public/drawn), a few variants each so a cloud never repeats. */
export const INGREDIENTS: Record<Ingredient, string[]> = {
  peanut: ['/drawn/peanut-1.svg', '/drawn/peanut-2.svg'],
  'peanut-kernel': ['/drawn/peanut-kernel-1.svg', '/drawn/peanut-kernel-2.svg'],
  popcorn: ['/drawn/popcorn-1.svg', '/drawn/popcorn-2.svg', '/drawn/popcorn-3.svg'],
  corn: ['/drawn/corn-1.svg'],
  chilli: ['/drawn/chilli-1.svg', '/drawn/chilli-2.svg'],
  tomato: ['/drawn/tomato-1.svg', '/drawn/tomato-2.svg'],
  cheese: ['/drawn/cheese-1.svg', '/drawn/cheese-2.svg'],
  salt: ['/drawn/salt-1.svg'],
  barby: ['/drawn/barby-1.svg', '/drawn/barby-2.svg'],
  flame: ['/drawn/flame-1.svg', '/drawn/flame-2.svg'],
  paprika: ['/drawn/paprika-1.svg', '/drawn/paprika-2.svg'],
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
