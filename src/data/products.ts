/**
 * Ringo's kids' range. Every pack gets its own world: colours sampled from the pack, real
 * ingredients floating in three depth layers, and its own mascot (cut from the real pack art)
 * doing the thing it would do if it could leave the bag.
 */

/** What the mascot does in the hero. Each one is a small, self-contained interaction. */
export type Act = 'punch' | 'chase' | 'lounge' | 'pounce' | 'chomp' | 'pop' | 'heat' | 'dance' | 'swim';

/** Wallpaper motif, taken from the pack's own artwork. */
export type Motif = 'rings' | 'waves' | 'sunset' | 'jungle' | 'swamp' | 'flames' | 'sunburst' | 'confetti' | 'bubbles';

export type Ingredient =
  | 'peanut' | 'peanut-kernel' | 'popcorn' | 'corn' | 'chilli' | 'tomato' | 'cheese' | 'salt' | 'pack' | 'flame' | 'paprika';

export interface Product {
  id: string;
  name: string;
  /** Short flavour label under the name. */
  flavour: string;
  /** English line for the hero, in Ringo's own voice. */
  blurb: string;
  /** Where on the flavour road sign this pack points. */
  sign: string;
  weight?: string;
  pack: string;
  /** light → mid → deep, sampled from the pack. Never one flat colour. */
  tones: [string, string, string];
  accent: string;
  ink: string;
  motif: Motif;
  act: Act;
  mascot: { src: string; name: string; extra?: string[] };
  /** Hint shown under the stage so people know the mascot is alive. */
  hint: string;
  floats: Ingredient[];
  crown?: boolean;
}

const P = (id: string) => `/packs/${id}.webp`;
const M = (id: string) => `/mascots/${id}.webp`;

export const PRODUCTS: Product[] = [
  {
    id: 'peanut', name: 'Peanut', flavour: 'Peanuts flavour · نكهة الفستق', sign: 'Peanut', weight: '22 g',
    blurb: 'The undisputed king of childhood. One bag, one punch, and the whole class wants a handful.',
    pack: P('peanut'), tones: ['#F4D7F2', '#B54FB6', '#7A1F7E'], accent: '#3FA535', ink: '#3B0A3E',
    motif: 'rings', act: 'punch', crown: true,
    mascot: { src: M('boxer'), name: 'the boxer' },
    hint: 'Tap the boxer. He goes for a flurry.', floats: ['peanut', 'peanut-kernel'],
  },
  {
    id: 'barby', name: 'Barby', flavour: 'From the deep blue', sign: 'Barby',
    blurb: 'Something in the water loves Ringo as much as you do. Move your hand and watch it hunt the bags.',
    pack: P('barby'), tones: ['#D4EEFB', '#3A9FDB', '#0B4F8A'], accent: '#F2B33D', ink: '#06294A',
    motif: 'waves', act: 'chase',
    mascot: { src: M('shark'), name: 'the shark' },
    hint: 'Move your mouse or finger. The shark follows.', floats: ['pack', 'salt'],
  },
  {
    id: 'crinkles', name: 'Crinkles', flavour: 'Curly and crunchy', sign: 'Crinkles',
    blurb: 'Lying on the beach under a palm tree, with nowhere to be. Recess, basically.',
    pack: P('crinkles'), tones: ['#FFE3B8', '#F7962B', '#D2461A'], accent: '#2F7DE1', ink: '#4A1600',
    motif: 'sunset', act: 'lounge',
    mascot: { src: M('crinkles-cat'), name: 'the blue cat', extra: [M('palm')] },
    hint: 'Move across the beach. The palm follows you.', floats: ['tomato', 'cheese'],
  },
  {
    id: 'salt-vinegar', name: 'Salt & Vinegar', flavour: 'بالخل والملح', sign: 'Salt & Vinegar',
    blurb: 'The sharpest bag in Lebanon, guarded by a tiger who cracks anything you point at.',
    pack: P('salt-vinegar'), tones: ['#EAF5C4', '#9CCB3B', '#3F7D1E'], accent: '#E8742A', ink: '#1E3A0B',
    motif: 'jungle', act: 'pounce',
    mascot: { src: M('tiger'), name: 'the tiger' },
    hint: 'Point at a peanut. The tiger pounces.', floats: ['salt', 'peanut'],
  },
  {
    id: 'cheese-cocktail', name: 'Cheese Cocktail', flavour: 'Cheese · جبنة', sign: 'Cheese Cocktail',
    blurb: 'Rings, nets, wheels and squares, and one very hungry crocodile chasing all of them.',
    pack: P('cheese-cocktail'), tones: ['#FFF4B8', '#F8D23A', '#E39A12'], accent: '#3BAA3A', ink: '#4D3300',
    motif: 'swamp', act: 'chomp',
    mascot: { src: M('croc'), name: 'the crocodile' },
    hint: 'Watch him run. Every cheese in his way is gone.', floats: ['cheese'],
  },
  {
    id: 'popcorn', name: 'Popcorn', flavour: 'Popcorn flavour', sign: 'Popcorn', weight: '25 g',
    blurb: 'The cinema snack that never needed a cinema. Corn in, pop out, all of it gone by the break.',
    pack: P('popcorn'), tones: ['#FFF6CC', '#FFD23F', '#F2A007'], accent: '#24307A', ink: '#3D2A00',
    motif: 'sunburst', act: 'pop',
    mascot: { src: M('corn-cob'), name: 'the corn' },
    hint: 'Tap the corn. Pop.', floats: ['popcorn', 'corn'],
  },
  {
    id: 'chilli', name: 'Chilli', flavour: 'حار · Hot', sign: 'Chilli',
    blurb: 'Black bag, red heat. The one you dared your friend to finish.',
    pack: P('chilli'), tones: ['#FFD9C9', '#E2402A', '#2A0D0A'], accent: '#FFC21A', ink: '#1A0503',
    motif: 'flames', act: 'heat',
    mascot: { src: P('chilli'), name: 'the hot bag' },
    hint: 'Hover the bag. It heats up.', floats: ['chilli', 'flame'],
  },
  {
    id: 'ketchup', name: 'Ketchup Fingers', flavour: 'Ketchup flavour · Corn fingers', sign: 'Ketchup', weight: '22 g',
    blurb: 'The kid on the bag never stopped dancing, and honestly, neither did we.',
    pack: P('ketchup'), tones: ['#FFD6CF', '#F0453A', '#A3120F'], accent: '#3FB44A', ink: '#4A0605',
    motif: 'confetti', act: 'dance',
    mascot: { src: M('ketchup-boy'), name: 'the ketchup kid' },
    hint: 'Tap him. He dances.', floats: ['tomato'],
  },
  {
    id: 'paprika-rings', name: 'Paprika Rings', flavour: 'Paprika · rings', sign: 'Paprika',
    blurb: 'Rings floating like bubbles, a turtle who thinks it owns the sea, and a crunch you can hear underwater.',
    pack: P('paprika-rings'), tones: ['#D6F1FF', '#33A6E6', '#0D5BA6'], accent: '#E8452E', ink: '#062A4D',
    motif: 'bubbles', act: 'swim',
    mascot: { src: M('turtle'), name: 'the turtle', extra: [M('fish'), M('paprika-bug')] },
    hint: 'Tap the water. Peppers float up.', floats: ['paprika', 'chilli'],
  },
];

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id);
