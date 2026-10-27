import { act, renderHook } from '@testing-library/react';
import { PRODUCTS } from '../data/products';
import { useCatalog } from './useCatalog';

describe('useCatalog', () => {
  it('opens on the king of childhood', () => {
    const { result } = renderHook(() => useCatalog());
    expect(result.current.product.id).toBe('peanut');
  });

  it('wraps round the wheel both ways', () => {
    const { result } = renderHook(() => useCatalog());
    act(() => result.current.step(-1));
    expect(result.current.product.id).toBe(PRODUCTS[PRODUCTS.length - 1].id);
    act(() => result.current.step(2));
    expect(result.current.product.id).toBe(PRODUCTS[1].id);
  });

  it('jumps the short way round', () => {
    const { result } = renderHook(() => useCatalog());
    act(() => result.current.jumpTo(PRODUCTS[PRODUCTS.length - 1].id));
    expect(result.current.pos).toBe(-1);
  });
});
