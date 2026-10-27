import { Eye, EyeDefs, Shade, Sheen } from './kit';

const INK = '#16324A';

/**
 * The Barby shark, drawn whole (the pack only shows its head): friendly, a bit greedy.
 * The tail beats, the fins paddle, and the jaw snaps whenever it reaches a bite.
 */
export function Shark({ chomp }: { chomp: boolean }) {
  return (
    <svg className={`rig shark-rig${chomp ? ' chomp' : ''}`} viewBox="-30 -10 450 220" aria-hidden="true">
      <defs>
        <Shade id="sh-body" color="#4F8DC2" cx="40%" cy="20%" />
        <linearGradient id="sh-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#CFE3F2" />
        </linearGradient>
        <linearGradient id="sh-mouth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7A1630" />
          <stop offset="1" stopColor="#C8344A" />
        </linearGradient>
        <EyeDefs />
      </defs>

      {/* tail, beating from its root */}
      <g className="sh-tail">
        <path d="M62 116 C42 92 22 66 6 30 C34 46 58 72 78 102 L80 132 C58 152 36 172 8 196 C26 162 44 140 62 122 Z" fill="url(#sh-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>

      {/* back pectoral fin, behind the body */}
      <path d="M222 150 C214 172 200 186 182 194 C194 176 200 164 202 148 Z" fill={'#3C719E'} stroke={INK} strokeWidth={4} strokeLinejoin="round" />

      {/* dorsal fin */}
      <path d="M196 62 C210 30 232 12 254 4 C248 30 250 48 262 64 Z" fill="url(#sh-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />

      {/* body */}
      <path d="M68 118 C96 72 170 52 258 58 C326 62 372 86 400 116 C374 148 326 170 258 172 C170 176 98 160 68 118 Z" fill="url(#sh-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M86 128 C140 152 230 170 304 160 C342 154 372 140 396 120 C368 152 320 172 256 174 C172 178 112 160 86 128 Z" fill="url(#sh-belly)" />
      <Sheen d="M150 74 C200 62 262 62 312 76 C262 72 200 74 150 86 Z" opacity={0.5} />
      <path d="M262 96 C266 110 266 126 262 140 M276 94 C280 108 280 126 276 140 M290 94 C294 108 294 124 290 138" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" opacity={0.7} />

      {/* mouth: the inside shows when the jaw drops */}
      <path d="M312 126 L398 120 L398 134 C370 148 336 148 312 132 Z" fill="url(#sh-mouth)" />
      <g className="sh-jaw">
        <path d="M312 130 C340 150 372 150 398 132 L400 136 C376 170 332 172 306 140 Z" fill="url(#sh-belly)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        {[322, 338, 354, 370, 384].map((x) => <path key={x} d={`M${x} ${143 - (x - 312) * 0.04} l6 -11 l6 11 Z`} fill="#fff" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />)}
      </g>
      {[320, 336, 352, 368, 384].map((x) => <path key={x} d={`M${x} ${126 - (x - 312) * 0.07} l6 12 l6 -12 Z`} fill="#fff" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />)}
      <path d="M312 126 L398 120" stroke={INK} strokeWidth={4} strokeLinecap="round" />

      {/* face */}
      <Eye x={334} y={94} r={14} iris="#2C4A6B" look={[0.6, 0.1]} lid={0.18} lidColor="#4F8DC2" ink={INK} />
      <path d="M318 74 C328 66 344 66 352 72" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={386} cy={104} rx={3} ry={2} fill={INK} />

      {/* front pectoral fin, paddling */}
      <g className="sh-fin">
        <path d="M236 146 C230 176 214 196 190 206 C206 184 214 164 214 144 Z" fill="url(#sh-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>
    </svg>
  );
}
