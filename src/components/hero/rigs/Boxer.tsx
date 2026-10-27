import { forwardRef } from 'react';

/**
 * The Ringo Peanut boxer, redrawn as vector art from the pack so he can actually move: every part
 * (ears, eyes, arms, gloves, legs) is its own group, animated in CSS around its real joint.
 * The punch bag lives in the same drawing so the glove and the swing stay in sync.
 */

const INK = '#2B160B';
const FUR = '#9A5B2E';
const FUR_DARK = '#6E3B18';
const FUR_LIGHT = '#F2D6B0';
const GLOVE = '#E3262E';
const GLOVE_HI = '#FF8E7E';
const STRIPES = ['#FFD43B', '#F7941D', '#E53B2C'];

/** A boxing glove drawn facing +x, centred on 0,0. */
function Glove() {
  return (
    <g>
      <rect x={-40} y={-15} width={16} height={30} rx={5} fill="#fff" stroke={INK} strokeWidth={4} />
      <path d="M-26 -24 C6 -36 36 -22 34 4 C32 28 6 36 -20 27 C-32 21 -34 -15 -26 -24 Z" fill={GLOVE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M-8 -27 C2 -40 22 -36 20 -20" fill={GLOVE} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d="M8 -6 C14 -2 16 6 12 12 M18 -12 C24 -6 25 4 22 10" fill="none" stroke="#9E1219" strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={-4} cy={-14} rx={12} ry={6} fill={GLOVE_HI} opacity={0.8} transform="rotate(-18)" />
    </g>
  );
}

/** A striped sleeve from the shoulder (0,0) out along +x. */
function Sleeve({ length }: { length: number }) {
  const bands = Math.ceil(length / 13);
  return (
    <g>
      <clipPath id={`sleeve-${length}`}>
        <rect x={-4} y={-14} width={length + 8} height={28} rx={14} />
      </clipPath>
      <g clipPath={`url(#sleeve-${length})`}>
        {Array.from({ length: bands }, (_, i) => (
          <rect key={i} x={-4 + i * 13} y={-14} width={13} height={28} fill={STRIPES[i % 3]} />
        ))}
      </g>
      <rect x={-4} y={-14} width={length + 8} height={28} rx={14} fill="none" stroke={INK} strokeWidth={4} />
    </g>
  );
}

interface Props {
  flurry: boolean;
  onPunch: () => void;
}

export const Boxer = forwardRef<SVGGElement, Props>(function Boxer({ flurry, onPunch }, bagRef) {
  return (
    <svg
      className={`rig boxer-rig${flurry ? ' flurry' : ''}`}
      viewBox="0 0 520 440"
      role="button"
      tabIndex={0}
      aria-label="Make the boxer punch the bag"
      onClick={onPunch}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPunch()}
    >
      {/* Ground shadow */}
      <ellipse cx={170} cy={418} rx={130} ry={12} fill="rgba(0,0,0,.22)" />
      <ellipse cx={376} cy={418} rx={48} ry={8} fill="rgba(0,0,0,.16)" className="bag-shadow" />

      {/* ---- the punch bag, swinging from its hook ---- */}
      <g transform="translate(-22 0)"><g className="bag" ref={bagRef}>
        <line x1={398} y1={0} x2={398} y2={44} stroke="#8C949C" strokeWidth={5} />
        <circle cx={398} cy={44} r={8} fill="none" stroke="#8C949C" strokeWidth={4} />
        <rect x={348} y={52} width={100} height={300} rx={26} fill="#9C5524" stroke={INK} strokeWidth={5} />
        <rect x={420} y={66} width={16} height={270} rx={8} fill="#C9814A" opacity={0.7} />
        <ellipse cx={398} cy={60} rx={48} ry={11} fill="#5E2C10" stroke={INK} strokeWidth={4} />
        <path d="M362 120 C372 140 366 170 374 196 M366 230 C376 250 370 280 378 300" fill="none" stroke="#5E2C10" strokeWidth={3} strokeLinecap="round" />
        <text x={0} y={0} transform="translate(410 96) rotate(90)" className="bag-word">PEANUTS FLAVOURS</text>
        <path d="M374 348 L380 372 L392 352 L400 378 L410 352 L420 370 L424 348 Z" fill="#7A3D15" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g></g>

      {/* ---- the boxer ---- */}
      <g className="boxer-body">
        {/* back ear, flopped */}
        <g className="ear-back">
          <path d="M112 74 C86 58 54 60 44 76 C56 88 86 92 116 92 Z" fill={FUR} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d="M104 78 C86 70 66 70 58 77 C70 84 88 86 106 86 Z" fill={FUR_LIGHT} />
        </g>

        {/* back leg and foot */}
        <path d="M128 300 C112 332 100 360 92 386 L136 390 C142 362 150 334 158 306 Z" fill={FUR_DARK} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <ellipse cx={100} cy={396} rx={48} ry={16} fill={FUR_DARK} stroke={INK} strokeWidth={4} />

        {/* hips with the cream belly */}
        <path d="M112 252 C100 300 130 324 168 324 C208 324 228 300 218 252 Z" fill={FUR} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <ellipse cx={168} cy={294} rx={32} ry={22} fill={FUR_LIGHT} stroke={INK} strokeWidth={3} />

        {/* front leg and foot */}
        <path d="M180 302 C192 332 206 356 212 382 L256 386 C248 356 232 326 218 298 Z" fill={FUR} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <ellipse cx={238} cy={396} rx={46} ry={15} fill={FUR} stroke={INK} strokeWidth={4} />
        <path d="M212 392 l6 -10 M226 394 l5 -11 M240 395 l4 -11" stroke={INK} strokeWidth={3} strokeLinecap="round" />

        {/* striped shirt */}
        <clipPath id="shirt">
          <path d="M120 186 C108 218 108 250 114 268 C142 280 192 280 216 266 C222 244 220 214 206 186 C182 176 142 176 120 186 Z" />
        </clipPath>
        <g clipPath="url(#shirt)">
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={100} y={176 + i * 14} width={130} height={14} fill={STRIPES[i % 3]} />
          ))}
        </g>
        <path d="M120 186 C108 218 108 250 114 268 C142 280 192 280 216 266 C222 244 220 214 206 186 C182 176 142 176 120 186 Z" fill="none" stroke={INK} strokeWidth={4} />

        {/* head */}
        <g className="head">
          <path d="M96 112 C92 74 122 54 156 56 C192 58 210 84 204 114 C200 138 186 152 170 158 L122 160 C104 152 98 132 96 112 Z" fill={FUR} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d="M104 124 l-12 6 M106 136 l-10 10 M114 146 l-6 12" stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={176} cy={126} rx={36} ry={25} fill={FUR_LIGHT} stroke={INK} strokeWidth={3} />
          {/* open mouth and tongue */}
          <path d="M150 134 Q178 182 210 136 Q180 152 150 134 Z" fill="#7A1420" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <ellipse cx={180} cy={152} rx={13} ry={7} fill="#E8434F" />
          {/* nose */}
          <ellipse cx={200} cy={112} rx={15} ry={11} fill="#1B0E08" />
          <ellipse cx={195} cy={107} rx={5} ry={3} fill="#fff" opacity={0.75} />
          {/* eyes, sly and half-lidded, and they blink */}
          <g className="eyes">
            <ellipse cx={150} cy={96} rx={13} ry={15} fill="#fff" stroke={INK} strokeWidth={3} />
            <ellipse cx={177} cy={93} rx={11} ry={14} fill="#fff" stroke={INK} strokeWidth={3} />
            <circle cx={155} cy={100} r={6} fill="#4E9BD1" />
            <circle cx={181} cy={97} r={5} fill="#4E9BD1" />
            <circle cx={156} cy={101} r={3} fill="#111" />
            <circle cx={182} cy={98} r={2.5} fill="#111" />
            <path d="M136 92 C140 78 162 76 164 92 Z M165 88 C168 74 188 74 189 88 Z" fill={FUR} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          </g>
          <path d="M138 76 C146 68 158 68 164 74 M168 71 C175 65 184 66 189 72" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          {/* front ear, standing up */}
          <g className="ear-front">
            <path d="M132 64 C126 34 140 8 156 4 C166 22 160 50 152 66 Z" fill={FUR} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <path d="M140 58 C136 38 144 20 154 14 C158 30 154 48 148 60 Z" fill={FUR_LIGHT} />
          </g>
        </g>

        {/* guard arm: glove up by the chin */}
        <g transform="translate(132 206) rotate(-24)">
          <g className="guard">
            <Sleeve length={30} />
            <g transform="translate(58 0) rotate(24)"><Glove /></g>
          </g>
        </g>

        {/* punching arm: the sleeve stretches and the glove flies out to the bag */}
        <g transform="translate(204 206) rotate(-14)">
          <g className="sleeve"><Sleeve length={60} /></g>
          <g className="glove"><g transform="translate(88 0)"><Glove /></g></g>
        </g>
      </g>
    </svg>
  );
});
