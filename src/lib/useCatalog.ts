import { useCallback, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { nearestPos, wrapIndex } from './ring';

/** Hero state: where the wheel is parked. `pos` is unbounded so the wheel always turns the short way. */
export function useCatalog() {
  const [pos, setPos] = useState(0);
  const product = PRODUCTS[wrapIndex(pos, PRODUCTS.length)];

  const step = useCallback((d: number) => setPos((p) => p + d), []);

  const jumpTo = useCallback((id: string) => {
    const i = PRODUCTS.findIndex((p) => p.id === id);
    if (i >= 0) setPos((p) => nearestPos(p, i, PRODUCTS.length));
  }, []);

  return { items: PRODUCTS, pos, product, step, jumpTo };
}
