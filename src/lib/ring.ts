/** Pure maths for the circular carousel: items sit on a wheel, the active one at 12 o'clock. */

export const wrapIndex = (i: number, n: number) => ((i % n) + n) % n;

/** Shortest signed distance from `active` to `i` around a ring of n, in (-n/2, n/2]. */
export function signedOffset(i: number, active: number, n: number): number {
  let d = wrapIndex(i - active, n);
  if (d > n / 2) d -= n;
  return d;
}

export interface RingOptions {
  radius: number;
  /** angle between neighbours, radians */
  step?: number;
  /** how many neighbours stay visible on each side */
  visible?: number;
}

export interface RingPose {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  z: number;
}

export function ringPose(offset: number, { radius, step = 0.62, visible = 2 }: RingOptions): RingPose {
  const a = offset * step;
  const d = Math.abs(offset);
  return {
    x: radius * Math.sin(a),
    // further round the wheel = lower on screen
    y: radius * (1 - Math.cos(a)),
    scale: d === 0 ? 1 : Math.max(0.34, 1 - 0.3 * d),
    rotate: (a * 180) / Math.PI * 0.55,
    opacity: d === 0 ? 1 : d <= 1 ? 0.95 : d <= visible ? 0.5 : 0,
    z: 100 - Math.round(d * 10),
  };
}

/** Next unbounded position that lands on `target`, travelling the short way round. */
export function nearestPos(pos: number, target: number, n: number): number {
  return pos + signedOffset(target, wrapIndex(pos, n), n);
}
