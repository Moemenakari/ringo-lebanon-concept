import { Eye, EyeDefs, Shade, Sheen } from './kit';

const INK = '#3A1A04';

/**
 * The Chilli pack's mascot, redrawn whole: a ridged potato chip in a Ringo top hat, holding a red
 * chilli like a torch. It hops on the spot, fans its mouth, and its hat lets off steam.
 */
export function ChilliGuy() {
  return (
    <svg className="rig chilli-rig" viewBox="0 0 280 340" aria-hidden="true">
      <defs>
        <Shade id="ch-chip" color="#F5B83A" cx="38%" cy="25%" />
        <Shade id="ch-pepper" color="#E0251B" />
        <Shade id="ch-hat" color="#26211E" />
        <EyeDefs />
      </defs>
      <ellipse cx={140} cy={326} rx={84} ry={10} fill="rgba(0,0,0,.25)" />
      <g className="ch-steam">
        <circle cx={128} cy={34} r={10} /><circle cx={146} cy={22} r={13} /><circle cx={160} cy={40} r={9} />
      </g>
      <g className="ch-hop">
        {/* legs */}
        <path d="M110 270 L102 312 M170 270 L178 312" stroke={INK} strokeWidth={8} strokeLinecap="round" />
        <ellipse cx={96} cy={316} rx={22} ry={10} fill="#26211E" />
        <ellipse cx={186} cy={316} rx={22} ry={10} fill="#26211E" />
        {/* ridged chip body */}
        <path d="M60 190 C52 132 92 92 144 94 C200 96 232 140 224 196 C218 246 186 282 140 282 C94 282 66 246 60 190 Z" fill="url(#ch-chip)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <g fill="none" stroke="#D08A1C" strokeWidth={3} strokeLinecap="round" opacity={0.8}>
          <path d="M76 140 C86 180 86 230 102 268" /><path d="M100 110 C108 160 108 230 120 280" /><path d="M128 96 C134 150 134 230 142 282" /><path d="M156 96 C162 150 164 230 166 280" /><path d="M184 104 C190 150 194 220 190 270" /><path d="M208 126 C214 160 216 210 210 250" />
        </g>
        <Sheen d="M84 128 C100 106 130 98 160 102 C130 108 106 120 94 142 Z" opacity={0.55} />
        <g fill="#C0461C" opacity={0.6}><circle cx={96} cy={210} r={3} /><circle cx={186} cy={176} r={3} /><circle cx={150} cy={246} r={2.5} /><circle cx={118} cy={162} r={2.5} /></g>
        {/* face */}
        <g className="ch-face">
          <Eye x={120} y={160} r={16} iris="#3A7C2A" look={[0.2, 0.2]} ink={INK} />
          <Eye x={164} y={158} r={16} iris="#3A7C2A" look={[0.2, 0.2]} ink={INK} />
          <path d="M104 136 C112 128 126 128 132 134 M152 132 C160 126 174 126 180 134" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <path className="ch-mouth" d="M118 196 C126 222 156 222 166 196 C152 204 132 204 118 196 Z" fill="#8E1B23" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
          <ellipse cx={142} cy={212} rx={10} ry={5} fill="#E8434F" />
          <ellipse cx={100} cy={188} rx={9} ry={5} fill="#F2735E" opacity={0.7} />
          <ellipse cx={186} cy={186} rx={9} ry={5} fill="#F2735E" opacity={0.7} />
        </g>
        {/* Ringo top hat */}
        <g className="ch-hat">
          <ellipse cx={142} cy={96} rx={58} ry={12} fill="url(#ch-hat)" stroke={INK} strokeWidth={4} />
          <path d="M106 94 L112 46 C130 40 156 40 174 46 L180 94 Z" fill="url(#ch-hat)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <rect x={108} y={72} width={70} height={14} fill="#D7262E" stroke={INK} strokeWidth={3} />
          <text x={143} y={84} className="ch-band" textAnchor="middle">RINGO</text>
        </g>
        {/* arm holding the chilli up like a torch */}
        <g className="ch-arm">
          <path d="M214 196 C238 184 248 164 250 140" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />
          <circle cx={250} cy={136} r={10} fill="#F5D7A8" stroke={INK} strokeWidth={3} />
          <path d="M244 132 C238 102 244 70 262 50 C270 76 266 108 256 134 Z" fill="url(#ch-pepper)" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
          <path d="M262 50 C258 40 264 32 272 30" fill="none" stroke="#2E7D2A" strokeWidth={5} strokeLinecap="round" />
          <path d="M250 104 C250 88 254 74 260 64" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.6} />
        </g>
        {/* other arm fanning the mouth */}
        <g className="ch-fan">
          <path d="M66 200 C48 196 40 184 44 170" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />
          <ellipse cx={46} cy={162} rx={12} ry={16} fill="#F5D7A8" stroke={INK} strokeWidth={3} />
        </g>
      </g>
    </svg>
  );
}
