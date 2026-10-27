import { Eye, EyeDefs, Shade, Sheen } from './kit';

const INK = '#123A12';
const GREEN = '#4DB848';

/** The Cheese Cocktail crocodile, redrawn whole: up on its back legs, sprinting, jaws snapping. */
export function Croc() {
  return (
    <svg className="rig croc-rig" viewBox="0 0 440 300" aria-hidden="true">
      <defs>
        <Shade id="cr-body" color={GREEN} cx="40%" cy="18%" />
        <Shade id="cr-dark" color="#3A9A38" />
        <linearGradient id="cr-belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7F59A" />
          <stop offset="1" stopColor="#B9DB55" />
        </linearGradient>
        <linearGradient id="cr-mouth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8E1424" />
          <stop offset="1" stopColor="#D23A4A" />
        </linearGradient>
        <EyeDefs />
      </defs>

      <ellipse cx={210} cy={284} rx={150} ry={11} fill="rgba(0,0,0,.2)" />

      {/* tail, waving */}
      <g className="cr-tail">
        <path d="M150 176 C108 184 58 206 8 246 C58 232 112 220 162 210 Z" fill="url(#cr-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M118 190 l-6 -10 l14 2 Z M86 204 l-6 -10 l14 2 Z M56 220 l-6 -9 l13 2 Z" fill="#3A9A38" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      </g>

      {/* far leg */}
      <g className="cr-leg cr-leg-b">
        <path d="M168 200 C162 226 150 246 140 262 L176 270 C182 250 192 230 196 206 Z" fill="url(#cr-dark)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M134 262 C130 274 150 280 182 276 C190 270 186 262 176 262 Z" fill="url(#cr-dark)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>

      <g className="cr-body">
        {/* body leaning forward */}
        <path d="M144 196 C134 150 166 112 214 110 C252 110 268 140 262 176 C256 210 226 228 192 226 C166 224 148 214 144 196 Z" fill="url(#cr-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M200 116 C236 124 252 156 244 186 C236 212 212 222 190 220 C214 210 230 186 226 160 C224 140 214 124 200 116 Z" fill="url(#cr-belly)" />
        <path d="M206 140 l26 6 M206 160 l30 4 M202 180 l30 0 M196 200 l26 -4" stroke="#9DBF3E" strokeWidth={3} strokeLinecap="round" />
        <Sheen d="M160 140 C170 122 192 112 214 112 C194 120 176 132 166 152 Z" />
        <path d="M170 120 l-4 -14 l12 6 Z M154 140 l-10 -10 l14 0 Z" fill="#3A9A38" stroke={INK} strokeWidth={2} strokeLinejoin="round" />

        {/* arms pumping */}
        <g className="cr-arm">
          <path d="M236 150 C252 156 262 166 268 180" fill="none" stroke={INK} strokeWidth={16} strokeLinecap="round" />
          <path d="M236 150 C252 156 262 166 268 180" fill="none" stroke={GREEN} strokeWidth={10} strokeLinecap="round" />
          <path d="M262 182 l10 8 M268 178 l12 4 M266 186 l6 10" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        </g>

        {/* head with the long snout: the lower jaw snaps */}
        <g className="cr-head">
          <path d="M226 92 L376 104 C390 108 392 120 380 126 L230 134 Z" fill="url(#cr-mouth)" />
          <g className="cr-jaw">
            <path d="M226 126 L372 122 C384 126 384 140 370 144 C320 152 262 150 230 146 Z" fill="url(#cr-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            {[250, 274, 298, 322, 346].map((x) => <path key={x} d={`M${x} ${126 - (x - 250) * 0.02} l7 -12 l7 12 Z`} fill="#fff" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />)}
          </g>
          <path d="M210 104 C206 72 232 54 262 58 C300 62 352 78 384 96 C396 104 392 116 380 118 L226 120 C216 118 210 112 210 104 Z" fill="url(#cr-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          {[256, 280, 304, 328, 352].map((x) => <path key={x} d={`M${x} ${119 - (x - 256) * 0.01} l7 12 l7 -12 Z`} fill="#fff" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />)}
          <Sheen d="M232 72 C262 60 312 68 352 84 C312 76 266 72 238 84 Z" opacity={0.5} />
          <ellipse cx={372} cy={96} rx={4} ry={3} fill={INK} />
          <ellipse cx={360} cy={92} rx={4} ry={3} fill={INK} />
          {/* eye on a bump on top of the head */}
          <path d="M226 74 C222 44 262 36 270 64 Z" fill="url(#cr-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <g className="cr-eye"><Eye x={246} y={56} r={16} iris="#F2B705" look={[0.6, 0.1]} lid={0.3} lidColor={GREEN} ink={INK} /></g>
        </g>
      </g>

      {/* near leg */}
      <g className="cr-leg cr-leg-a">
        <path d="M184 206 C188 232 196 252 206 266 L240 256 C226 244 218 226 214 202 Z" fill="url(#cr-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M200 266 C204 280 228 282 254 274 C258 266 252 258 240 258 Z" fill="url(#cr-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M246 268 l12 2 M248 276 l12 4" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      </g>
    </svg>
  );
}
