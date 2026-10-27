import { PRODUCTS } from '../data/products';
import { QUESTIONS, readMind } from './mind';

const order = PRODUCTS.map((p) => p.id);

describe('readMind', () => {
  it('only scores packs that exist', () => {
    for (const q of QUESTIONS) for (const c of q.choices) for (const id of Object.keys(c.points)) expect(order).toContain(id);
  });

  it('lets the sidekick decide when everything else is neutral', () => {
    expect(readMind({ sidekick: 'shark' }, order)).toBe('barby');
    expect(readMind({ sidekick: 'tiger' }, order)).toBe('salt-vinegar');
  });

  it('adds up all three answers', () => {
    expect(readMind({ where: 'gaming', sidekick: 'croc', taste: 'cheesy' }, order)).toBe('cheese-cocktail');
    expect(readMind({ where: 'recess', sidekick: 'boxer', taste: 'sweet' }, order)).toBe('peanut');
  });

  it('falls back to the king when nothing is picked', () => {
    expect(readMind({}, order)).toBe('peanut');
  });

  it('can land on every pack', () => {
    const reachable = new Set<string>();
    for (const a of QUESTIONS[0].choices) for (const b of QUESTIONS[1].choices) for (const c of QUESTIONS[2].choices)
      reachable.add(readMind({ where: a.id, sidekick: b.id, taste: c.id }, order));
    expect(reachable).toEqual(new Set(order));
  });
});
