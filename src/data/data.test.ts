import { layoutFloats, INGREDIENTS } from './ingredients';
import { PRODUCTS } from './products';

describe('catalogue', () => {
  it('has unique ids and road-sign names', () => {
    expect(new Set(PRODUCTS.map((p) => p.id)).size).toBe(PRODUCTS.length);
    expect(new Set(PRODUCTS.map((p) => p.sign)).size).toBe(PRODUCTS.length);
  });

  it('crowns exactly one king', () => {
    expect(PRODUCTS.filter((p) => p.crown).map((p) => p.id)).toEqual(['peanut']);
  });

  it('only floats ingredients that have photos', () => {
    for (const p of PRODUCTS) for (const f of p.floats) expect(INGREDIENTS[f].length).toBeGreaterThan(0);
  });
});

describe('layoutFloats', () => {
  it('is stable for the same pack', () => {
    expect(layoutFloats('peanut', ['peanut'], 12)).toEqual(layoutFloats('peanut', ['peanut'], 12));
  });

  it('uses all three depth layers and stays off the copy column', () => {
    const f = layoutFloats('barby', ['pack'], 20);
    expect(new Set(f.map((x) => x.depth))).toEqual(new Set(['far', 'mid', 'near']));
    expect(Math.min(...f.map((x) => x.x))).toBeGreaterThanOrEqual(30);
  });
});
