import { Eye, EyeDefs, Shade, Sheen } from './kit';

const INK = '#2B1A10';
const SKIN = '#F9C99B';

/** The Ketchup Fingers kid, redrawn whole: spiky blond hair, the green "1" shirt, and he dances. */
export function KetchupKid() {
  return (
    <svg className="rig kid-rig" viewBox="0 0 280 380" aria-hidden="true">
      <defs>
        <Shade id="kd-skin" color={SKIN} />
        <Shade id="kd-hair" color="#FFD23A" cx="40%" cy="20%" />
        <Shade id="kd-shirt" color="#4DB848" />
        <Shade id="kd-shorts" color="#2F6FD6" />
        <Shade id="kd-shoe" color="#F7C31E" />
        <EyeDefs />
      </defs>
      <ellipse cx={140} cy={368} rx={80} ry={9} fill="rgba(0,0,0,.25)" />
      <g className="kd-body">
        <g className="kd-leg-l">
          <path d="M118 270 L104 336" stroke={INK} strokeWidth={26} strokeLinecap="round" />
          <path d="M118 270 L104 336" stroke="url(#kd-skin)" strokeWidth={18} strokeLinecap="round" />
          <path d="M78 336 C78 322 120 318 128 334 C132 348 82 352 78 336 Z" fill="url(#kd-shoe)" stroke={INK} strokeWidth={4} />
        </g>
        <g className="kd-leg-r">
          <path d="M162 270 L176 336" stroke={INK} strokeWidth={26} strokeLinecap="round" />
          <path d="M162 270 L176 336" stroke="url(#kd-skin)" strokeWidth={18} strokeLinecap="round" />
          <path d="M154 334 C160 318 202 322 202 336 C198 352 150 348 154 334 Z" fill="url(#kd-shoe)" stroke={INK} strokeWidth={4} />
        </g>
        <path d="M96 236 L184 236 L194 284 L148 288 L140 270 L132 288 L86 284 Z" fill="url(#kd-shorts)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <g className="kd-arm-l">
          <path d="M100 168 C74 160 58 140 52 112" fill="none" stroke={INK} strokeWidth={24} strokeLinecap="round" />
          <path d="M100 168 C74 160 58 140 52 112" fill="none" stroke="url(#kd-skin)" strokeWidth={16} strokeLinecap="round" />
          <circle cx={50} cy={104} r={15} fill="url(#kd-skin)" stroke={INK} strokeWidth={4} />
        </g>
        <path d="M96 156 C112 146 168 146 184 156 L192 240 L88 240 Z" fill="url(#kd-shirt)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <text x={140} y={222} className="kd-num" textAnchor="middle">1</text>
        <Sheen d="M104 162 C124 154 152 154 170 160 C150 160 126 164 110 176 Z" opacity={0.4} />
        <g className="kd-arm-r">
          <path d="M180 168 C206 176 222 196 226 222" fill="none" stroke={INK} strokeWidth={24} strokeLinecap="round" />
          <path d="M180 168 C206 176 222 196 226 222" fill="none" stroke="url(#kd-skin)" strokeWidth={16} strokeLinecap="round" />
          <circle cx={228} cy={230} r={15} fill="url(#kd-skin)" stroke={INK} strokeWidth={4} />
        </g>
        <g className="kd-head">
          <path d="M80 70 L66 30 L100 48 L104 6 L128 40 L146 0 L160 40 L188 10 L188 50 L222 34 L204 72 Z" fill="url(#kd-hair)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <ellipse cx={142} cy={98} rx={60} ry={58} fill="url(#kd-skin)" stroke={INK} strokeWidth={4} />
          <ellipse cx={84} cy={102} rx={11} ry={15} fill="url(#kd-skin)" stroke={INK} strokeWidth={4} />
          <path d="M84 72 C100 50 150 44 196 66 C178 60 162 62 150 68 L140 56 L128 70 L114 58 L106 74 Z" fill="url(#kd-hair)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <Eye x={126} y={96} r={14} iris="#3D8BD9" look={[0.3, 0.1]} ink={INK} />
          {/* the wink */}
          <path d="M152 98 C160 90 172 90 178 98" fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
          <path d="M120 128 C132 146 160 146 170 126 C154 134 136 134 120 128 Z" fill="#8E1B23" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
          <ellipse cx={108} cy={122} rx={9} ry={5} fill="#F2735E" opacity={0.6} />
          <ellipse cx={180} cy={120} rx={9} ry={5} fill="#F2735E" opacity={0.6} />
          <path d="M138 108 C142 114 146 114 148 110" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/**
 * The back-to-school girl, redrawn whole and standing. She can't decide: reaches for one pack,
 * looks at it, puts it back, reaches for another. The packs she holds are the real pack photos.
 */
export function SchoolGirl({ left, right }: { left: string; right: string }) {
  const G = '#2E2010';
  return (
    <svg className="rig girl-rig" viewBox="0 0 320 470" aria-hidden="true">
      <defs>
        <Shade id="gl-skin" color="#FAD0AA" />
        <Shade id="gl-hair" color="#A45E2E" cx="40%" cy="18%" />
        <Shade id="gl-dress" color="#3DB3A4" />
        <Shade id="gl-bag" color="#7B4FC9" />
        <EyeDefs />
      </defs>
      <ellipse cx={160} cy={458} rx={90} ry={10} fill="rgba(0,0,0,.25)" />
      <g className="gl-body">
        {/* legs, socks and shoes */}
        <path d="M134 360 L130 432 M186 360 L190 432" stroke={G} strokeWidth={24} strokeLinecap="round" />
        <path d="M134 360 L130 432 M186 360 L190 432" stroke="url(#gl-skin)" strokeWidth={16} strokeLinecap="round" />
        <path d="M122 404 h18 v28 h-18 Z M182 404 h18 v28 h-18 Z" fill="#fff" stroke={G} strokeWidth={3} />
        <path d="M106 440 C106 426 142 424 146 436 C148 448 108 452 106 440 Z M174 436 C178 424 214 426 214 440 C212 452 172 448 174 436 Z" fill="#2E3440" stroke={G} strokeWidth={4} />
        {/* backpack behind */}
        <path d="M100 210 C92 250 94 300 108 320 L212 320 C226 300 228 250 220 210 Z" fill="url(#gl-bag)" stroke={G} strokeWidth={4} strokeLinejoin="round" />
        {/* dress */}
        <path d="M118 214 C110 270 96 330 90 372 C130 386 190 386 230 372 C224 330 210 270 202 214 Z" fill="url(#gl-dress)" stroke={G} strokeWidth={4} strokeLinejoin="round" />
        <path d="M118 214 L202 214 L198 236 L122 236 Z" fill="#fff" stroke={G} strokeWidth={3} />
        <path d="M134 212 L160 236 L186 212" fill="#FFD23A" stroke={G} strokeWidth={3} strokeLinejoin="round" />
        <path d="M122 236 L128 330 M198 236 L192 330" stroke="#6E46B8" strokeWidth={10} strokeLinecap="round" />
        <rect x={140} y={268} width={40} height={14} rx={3} fill="#fff" stroke={G} strokeWidth={2} />
        <text x={160} y={279} className="gl-tag" textAnchor="middle">RINGO</text>
        <Sheen d="M132 250 C150 240 176 240 192 248 C172 248 150 252 138 262 Z" opacity={0.35} />

        {/* left arm: reaches out to the left, takes a pack, brings it up to look */}
        <g className="gl-arm gl-arm-l">
          <path d="M122 222 C100 236 88 254 84 276" fill="none" stroke={G} strokeWidth={22} strokeLinecap="round" />
          <path d="M122 222 C100 236 88 254 84 276" fill="none" stroke="url(#gl-skin)" strokeWidth={14} strokeLinecap="round" />
          <g className="gl-hand">
            <image className="gl-pack" href={left} x={36} y={198} width={96} height={124} preserveAspectRatio="xMidYMid meet" />
            <circle cx={84} cy={282} r={13} fill="url(#gl-skin)" stroke={G} strokeWidth={3.5} />
          </g>
        </g>
        <g className="gl-arm gl-arm-r">
          <path d="M198 222 C220 236 232 254 236 276" fill="none" stroke={G} strokeWidth={22} strokeLinecap="round" />
          <path d="M198 222 C220 236 232 254 236 276" fill="none" stroke="url(#gl-skin)" strokeWidth={14} strokeLinecap="round" />
          <g className="gl-hand">
            <image className="gl-pack" href={right} x={188} y={198} width={96} height={124} preserveAspectRatio="xMidYMid meet" />
            <circle cx={236} cy={282} r={13} fill="url(#gl-skin)" stroke={G} strokeWidth={3.5} />
          </g>
        </g>

        {/* head: looks from one pack to the other */}
        <g className="gl-head">
          <path d="M76 120 C70 60 110 26 160 26 C214 26 252 62 244 124 C242 160 236 196 220 214 L100 214 C84 196 78 160 76 120 Z" fill="url(#gl-hair)" stroke={G} strokeWidth={4} strokeLinejoin="round" />
          <ellipse cx={160} cy={136} rx={66} ry={64} fill="url(#gl-skin)" stroke={G} strokeWidth={4} />
          <path d="M94 116 C98 70 140 52 170 56 C210 60 232 86 228 118 C214 104 204 92 198 80 C186 98 160 110 130 112 C118 114 104 116 94 116 Z" fill="url(#gl-hair)" stroke={G} strokeWidth={4} strokeLinejoin="round" />
          <Sheen d="M120 56 C150 42 196 46 220 66 C192 56 154 54 128 66 Z" opacity={0.35} />
          {/* teal bow */}
          <path d="M196 40 C202 18 236 14 240 34 C232 44 214 48 204 46 Z M196 44 C188 24 158 22 156 42 C164 50 182 52 194 50 Z" fill="#3DB3A4" stroke={G} strokeWidth={3.5} strokeLinejoin="round" />
          <circle cx={197} cy={45} r={7} fill="#2E8C80" stroke={G} strokeWidth={3} />
          <g className="gl-eyes">
            <Eye x={136} y={140} r={17} iris="#3A6FD0" look={[0, 0.1]} ink={G} />
            <Eye x={186} y={140} r={17} iris="#3A6FD0" look={[0, 0.1]} ink={G} />
          </g>
          <path d="M120 116 C128 110 140 110 148 114 M174 114 C182 110 194 110 202 116" fill="none" stroke={G} strokeWidth={3.5} strokeLinecap="round" />
          <ellipse cx={118} cy={166} rx={11} ry={6} fill="#F79AA0" opacity={0.7} />
          <ellipse cx={204} cy={166} rx={11} ry={6} fill="#F79AA0" opacity={0.7} />
          <path className="gl-mouth" d="M146 172 C150 190 172 190 176 172 C166 178 156 178 146 172 Z" fill="#B3243A" stroke={G} strokeWidth={3} strokeLinejoin="round" />
        </g>
        <g className="gl-think">
          <circle cx={258} cy={70} r={6} fill="#fff" />
          <circle cx={272} cy={50} r={9} fill="#fff" />
          <ellipse cx={290} cy={22} rx={24} ry={20} fill="#fff" />
          <text x={290} y={32} className="gl-q" textAnchor="middle">?</text>
        </g>
      </g>
    </svg>
  );
}
