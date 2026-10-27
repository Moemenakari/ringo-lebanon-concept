import { useId } from 'react';

/**
 * Shared drawing kit for the mascots: one shading recipe so every character reads as the same
 * soft, "3D cartoon" family (light from the top left, a darker underside, a glossy highlight),
 * and one eye that looks alive.
 */

/** Mix a hex colour towards white (amount > 0) or black (amount < 0). */
export function tint(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount)),
  );
  return `#${ch.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/** Radial body shading: lit top left, base colour in the middle, shadowed underside. */
export function Shade({ id, color, cx = '35%', cy = '28%' }: { id: string; color: string; cx?: string; cy?: string }) {
  return (
    <radialGradient id={id} cx={cx} cy={cy} r="80%">
      <stop offset="0" stopColor={tint(color, 0.45)} />
      <stop offset="0.45" stopColor={color} />
      <stop offset="1" stopColor={tint(color, -0.38)} />
    </radialGradient>
  );
}

/** A soft white sheen laid over a shape to make it glossy. */
export function Sheen({ d, opacity = 0.45 }: { d: string; opacity?: number }) {
  return <path d={d} fill="#fff" opacity={opacity} />;
}

/** Big glossy cartoon eye. `look` shifts the iris (-1..1) and `lid` closes it from the top (0..1). */
export function Eye({ x, y, r, iris = '#3D8BD9', look = [0, 0], lid = 0, lidColor, ink }: {
  x: number; y: number; r: number; iris?: string; look?: [number, number]; lid?: number; lidColor?: string; ink: string;
}) {
  const clip = `eye-${useId().replace(/:/g, '')}`;
  const ix = x + look[0] * r * 0.3;
  const iy = y + look[1] * r * 0.25;
  return (
    <g className="eye">
      <clipPath id={clip}><ellipse cx={x} cy={y} rx={r} ry={r * 1.12} /></clipPath>
      <ellipse cx={x} cy={y} rx={r} ry={r * 1.12} fill="#fff" />
      <circle cx={ix} cy={iy} r={r * 0.58} fill={iris} />
      <circle cx={ix} cy={iy} r={r * 0.58} fill="url(#eye-depth)" />
      <circle cx={ix} cy={iy} r={r * 0.3} fill="#120a06" />
      <circle cx={ix - r * 0.2} cy={iy - r * 0.22} r={r * 0.17} fill="#fff" />
      <circle cx={ix + r * 0.18} cy={iy + r * 0.2} r={r * 0.08} fill="#fff" opacity={0.85} />
      {lid > 0 && (
        <path clipPath={`url(#${clip})`}
          d={`M${x - r * 1.08} ${y - r * 1.2} L${x + r * 1.08} ${y - r * 1.2} L${x + r * 1.08} ${y - r * 1.12 + lid * r * 2} Q${x} ${y - r * 0.9 + lid * r * 2.3} ${x - r * 1.08} ${y - r * 1.12 + lid * r * 2} Z`}
          fill={lidColor}
          stroke={ink}
          strokeWidth={r * 0.12}
          strokeLinejoin="round"
        />
      )}
      <ellipse cx={x} cy={y} rx={r} ry={r * 1.12} fill="none" stroke={ink} strokeWidth={r * 0.14} />
    </g>
  );
}

/** Gradients the Eye uses; put once inside every rig's <defs>. */
export function EyeDefs() {
  return (
    <radialGradient id="eye-depth" cx="50%" cy="70%" r="60%">
      <stop offset="0" stopColor="#fff" stopOpacity={0.35} />
      <stop offset="1" stopColor="#000" stopOpacity={0.35} />
    </radialGradient>
  );
}
