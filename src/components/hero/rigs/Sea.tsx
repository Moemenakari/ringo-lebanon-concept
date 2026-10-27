import { Eye, EyeDefs, Shade, Sheen } from './kit';

/** The Paprika Rings turtle, redrawn whole: blue tuft like on the pack, flippers paddling. */
export function Turtle() {
  const INK = '#163A1C';
  return (
    <svg className="rig turtle-rig" viewBox="0 0 370 230" aria-hidden="true">
      <defs>
        <Shade id="tt-skin" color="#6CC04A" />
        <Shade id="tt-shell" color="#2B8BD6" cx="40%" cy="15%" />
        <linearGradient id="tt-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBEFB0" />
          <stop offset="1" stopColor="#E5C96A" />
        </linearGradient>
        <EyeDefs />
      </defs>
      <g className="tt-back"><path d="M96 150 C70 168 50 190 40 214 C70 204 100 186 120 160 Z" fill="url(#tt-skin)" stroke={INK} strokeWidth={4} strokeLinejoin="round" /></g>
      <g className="tt-neck">
        <path d="M262 122 C282 108 292 92 298 76 L326 92 C318 112 302 130 280 142 Z" fill="url(#tt-skin)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <g className="tt-head">
          <path d="M300 34 C306 14 328 8 338 22 C346 6 366 14 360 34 Z" fill="#2B8BD6" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <ellipse cx={326} cy={68} rx={40} ry={36} fill="url(#tt-skin)" stroke={INK} strokeWidth={4} />
          <Sheen d="M298 50 C312 36 340 34 356 44 C338 42 316 46 304 58 Z" opacity={0.5} />
          <Eye x={316} y={58} r={13} iris="#2A6BB8" look={[0.5, 0.2]} ink={INK} />
          <Eye x={344} y={56} r={13} iris="#2A6BB8" look={[0.5, 0.2]} ink={INK} />
          <path d="M318 86 C328 98 346 98 356 84" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <ellipse cx={302} cy={84} rx={7} ry={4} fill="#F28C9A" opacity={0.8} />
        </g>
      </g>
      <path d="M56 136 C56 76 116 44 186 46 C252 48 292 90 292 136 Z" fill="url(#tt-shell)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <g fill="none" stroke="#1C5E9E" strokeWidth={3.5} strokeLinejoin="round">
        <path d="M140 66 L176 58 L212 66 L222 98 L176 110 L132 98 Z" />
        <path d="M132 98 L96 108 M222 98 L262 108 M176 110 L176 136 M140 66 L118 74 M212 66 L238 76" />
      </g>
      <Sheen d="M96 86 C122 60 168 52 214 58 C172 60 132 70 104 98 Z" opacity={0.5} />
      <path d="M50 136 L298 136 C290 156 248 166 176 166 C104 166 62 156 50 136 Z" fill="url(#tt-belly)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <g className="tt-front"><path d="M236 150 C252 176 272 198 300 212 C292 184 276 164 256 146 Z" fill="url(#tt-skin)" stroke={INK} strokeWidth={4} strokeLinejoin="round" /></g>
    </svg>
  );
}

/** The red spotted fish from the Paprika pack, tail wagging as it swims. */
export function Fish() {
  const INK = '#4A0E14';
  return (
    <svg className="rig fish-rig" viewBox="0 0 270 200" aria-hidden="true">
      <defs>
        <Shade id="fs-body" color="#E8352E" />
        <Shade id="fs-fin" color="#8E4BC9" />
        <EyeDefs />
      </defs>
      <g className="fs-tail"><path d="M62 100 C40 70 22 52 4 46 C14 76 14 124 4 154 C22 148 40 130 62 100 Z" fill="url(#fs-fin)" stroke={INK} strokeWidth={4} strokeLinejoin="round" /></g>
      <path d="M110 40 C124 14 160 8 182 20 C166 26 154 34 150 46 Z" fill="url(#fs-fin)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <ellipse cx={146} cy={102} rx={92} ry={66} fill="url(#fs-body)" stroke={INK} strokeWidth={4} />
      <g fill="#2E6FD6" stroke="#1A3F8A" strokeWidth={2}>
        <circle cx={96} cy={82} r={10} /><circle cx={124} cy={122} r={12} /><circle cx={92} cy={124} r={7} /><circle cx={148} cy={66} r={8} /><circle cx={160} cy={140} r={9} /><circle cx={118} cy={58} r={6} />
      </g>
      <Sheen d="M82 64 C110 42 160 38 196 52 C160 50 118 54 92 76 Z" opacity={0.45} />
      <g className="fs-side"><path d="M150 116 C164 140 184 150 204 150 C196 134 182 122 164 112 Z" fill="url(#fs-fin)" stroke={INK} strokeWidth={4} strokeLinejoin="round" /></g>
      <Eye x={198} y={84} r={17} iris="#3B2A8C" look={[0.5, 0.1]} ink={INK} />
      <Eye x={226} y={88} r={13} iris="#3B2A8C" look={[0.5, 0.1]} ink={INK} />
      <path d="M210 122 C220 132 234 130 240 120" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}
