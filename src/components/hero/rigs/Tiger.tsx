import { Eye, EyeDefs, Shade, Sheen } from './kit';

const INK = '#2A1305';
const ORANGE = '#F28A22';

/** The Salt & Vinegar tiger, redrawn whole: crouched, grinning, tail flicking, ready to pounce. */
export function Tiger({ leaping }: { leaping: boolean }) {
  return (
    <svg className={`rig tiger-rig${leaping ? ' leap' : ''}`} viewBox="0 0 430 300" aria-hidden="true">
      <defs>
        <Shade id="tg-body" color={ORANGE} cx="40%" cy="20%" />
        <radialGradient id="tg-white" cx="45%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F4E2C8" />
        </radialGradient>
        <EyeDefs />
      </defs>

      <ellipse cx={220} cy={282} rx={180} ry={13} fill="rgba(0,0,0,.2)" />

      {/* tail up behind, flicking */}
      <g className="tg-tail">
        <path d="M96 214 C58 200 50 150 66 110 C76 84 70 62 54 50" fill="none" stroke={INK} strokeWidth={26} strokeLinecap="round" />
        <path d="M96 214 C58 200 50 150 66 110 C76 84 70 62 54 50" fill="none" stroke="url(#tg-body)" strokeWidth={18} strokeLinecap="round" />
        <path d="M60 182 l18 -6 M58 154 l18 2 M64 126 l16 6 M68 100 l14 8 M58 66 l14 -4" stroke={INK} strokeWidth={6} strokeLinecap="round" />
      </g>

      <g className="tg-body">
        {/* back paw */}
        <ellipse cx={168} cy={270} rx={40} ry={13} fill="url(#tg-white)" stroke={INK} strokeWidth={4} />

        {/* crouched body */}
        <path d="M92 226 C82 172 134 142 214 144 C284 146 316 178 316 220 C316 248 276 262 206 262 C134 262 98 254 92 226 Z" fill="url(#tg-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M120 248 C160 258 240 260 300 240 C290 256 250 264 200 264 C160 264 130 260 120 248 Z" fill="url(#tg-white)" />
        <ellipse cx={128} cy={222} rx={44} ry={40} fill="url(#tg-body)" stroke={INK} strokeWidth={4} />
        <Sheen d="M130 160 C170 148 220 148 262 158 C220 156 172 160 136 174 Z" />
        {/* stripes */}
        <g fill={INK}>
          <path d="M160 148 C170 170 166 188 156 200 C164 186 162 168 152 152 Z" />
          <path d="M192 146 C204 170 200 192 188 206 C196 190 194 170 184 150 Z" />
          <path d="M226 148 C238 172 234 194 222 208 C230 192 228 172 218 152 Z" />
          <path d="M258 154 C268 174 266 192 256 204 C262 190 260 174 250 158 Z" />
          <path d="M100 196 C112 204 118 216 116 230 C112 218 104 210 94 206 Z" />
          <path d="M108 236 C122 238 132 246 136 258 C126 250 116 246 104 246 Z" />
        </g>

        {/* front legs stretched forward, ready */}
        <g className="tg-paws">
          <path d="M276 228 C290 246 300 258 314 264 L340 262 C326 250 312 236 300 220 Z" fill="url(#tg-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <ellipse cx={326} cy={266} rx={30} ry={13} fill="url(#tg-white)" stroke={INK} strokeWidth={4} />
          <ellipse cx={368} cy={268} rx={30} ry={13} fill="url(#tg-white)" stroke={INK} strokeWidth={4} />
          <path d="M346 272 l3 -10 M360 274 l2 -11 M374 274 l1 -11 M312 270 l3 -10 M326 272 l2 -10" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        </g>

        {/* head */}
        <g className="tg-head">
          <circle cx={292} cy={92} r={22} fill="url(#tg-body)" stroke={INK} strokeWidth={4} />
          <circle cx={292} cy={94} r={11} fill={INK} opacity={0.8} />
          <circle cx={384} cy={98} r={22} fill="url(#tg-body)" stroke={INK} strokeWidth={4} />
          <circle cx={384} cy={100} r={11} fill={INK} opacity={0.8} />
          <ellipse cx={338} cy={150} rx={72} ry={64} fill="url(#tg-body)" stroke={INK} strokeWidth={4} />
          <Sheen d="M284 116 C306 98 350 94 380 106 C350 104 312 108 290 126 Z" opacity={0.45} />
          <g fill={INK}>
            <path d="M324 88 C328 100 328 110 324 118 C334 108 336 98 332 88 Z" />
            <path d="M340 87 C344 98 344 108 340 116 C350 106 352 96 348 87 Z" />
            <path d="M268 140 C280 142 288 148 292 156 C282 152 274 150 266 150 Z" />
            <path d="M408 136 C396 138 388 144 384 152 C394 148 402 146 410 146 Z" />
          </g>
          {/* white muzzle, big happy grin */}
          <path d="M290 172 C296 150 322 146 338 160 C354 146 380 150 386 172 C388 196 366 212 338 212 C310 212 288 196 290 172 Z" fill="url(#tg-white)" stroke={INK} strokeWidth={3} />
          <path d="M306 182 C318 206 358 206 370 182 C352 192 324 192 306 182 Z" fill="#8E1B23" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          <ellipse cx={338} cy={196} rx={14} ry={6} fill="#E8434F" />
          <path d="M314 186 l5 12 l5 -10 Z M352 188 l5 10 l5 -12 Z" fill="#fff" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
          <path d="M328 160 C328 152 348 152 348 160 C348 166 338 170 338 170 C338 170 328 166 328 160 Z" fill="#D9475E" stroke={INK} strokeWidth={2.5} />
          <path d="M298 176 L262 170 M298 184 L262 188 M378 176 L414 170 M378 184 L414 188" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
          <g className="tg-eyes">
            <Eye x={312} y={128} r={15} iris="#9BCB2E" look={[0.5, 0.15]} lid={0.22} lidColor={ORANGE} ink={INK} />
            <Eye x={362} y={128} r={15} iris="#9BCB2E" look={[0.5, 0.15]} lid={0.22} lidColor={ORANGE} ink={INK} />
          </g>
          <path d="M294 110 C304 102 318 102 326 108 M350 106 C358 100 372 100 382 108" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
