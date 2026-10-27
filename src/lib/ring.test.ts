import { nearestPos, ringPose, signedOffset, wrapIndex } from './ring';

describe('ring maths', () => {
  it('wraps negative and large indexes', () => {
    expect(wrapIndex(-1, 8)).toBe(7);
    expect(wrapIndex(17, 8)).toBe(1);
  });

  it('takes the short way round', () => {
    expect(signedOffset(7, 0, 8)).toBe(-1);
    expect(signedOffset(1, 0, 8)).toBe(1);
    expect(signedOffset(4, 0, 8)).toBe(4);
    expect(signedOffset(2, 5, 6)).toBe(3);
    expect(signedOffset(0, 5, 6)).toBe(1);
  });

  it('puts the active item at the top, centred and full size', () => {
    const p = ringPose(0, { radius: 300 });
    expect(p).toMatchObject({ x: 0, y: 0, scale: 1, opacity: 1 });
  });

  it('places neighbours symmetrically, lower and smaller', () => {
    const l = ringPose(-1, { radius: 300 });
    const r = ringPose(1, { radius: 300 });
    expect(l.x).toBeCloseTo(-r.x);
    expect(l.y).toBeCloseTo(r.y);
    expect(r.y).toBeGreaterThan(0);
    expect(r.scale).toBeLessThan(1);
    expect(r.z).toBeLessThan(ringPose(0, { radius: 300 }).z);
  });

  it('hides items beyond the visible window', () => {
    expect(ringPose(3, { radius: 300 }).opacity).toBe(0);
    expect(ringPose(2, { radius: 300 }).opacity).toBeGreaterThan(0);
  });

  it('finds the nearest unbounded position for a target', () => {
    expect(nearestPos(0, 7, 8)).toBe(-1);
    expect(nearestPos(9, 3, 8)).toBe(11);
  });
});
