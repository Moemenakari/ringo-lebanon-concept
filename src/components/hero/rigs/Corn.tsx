import { Eye, EyeDefs, Shade } from './kit';

const INK = '#6A4206';

/** The Popcorn pack's corn, drawn as a character: it squishes and shoots popcorn out of its top. */
export function Corn() {
  return (
    <svg className="rig corn-rig" viewBox="0 0 200 330" aria-hidden="true">
      <defs>
        <Shade id="cn-cob" color="#F7C21E" cx="35%" cy="25%" />
        <Shade id="cn-husk" color="#4DB848" />
        <pattern id="cn-kernels" width="16" height="14" patternUnits="userSpaceOnUse">
          <rect width="16" height="14" fill="#F2B415" />
          <rect x="1.5" y="1" width="13" height="12" rx="5" fill="#FFD84A" stroke="#D49A14" strokeWidth="1.2" />
          <ellipse cx="6" cy="4.5" rx="3" ry="2" fill="#FFF6C2" />
        </pattern>
        <EyeDefs />
      </defs>
      <ellipse cx={100} cy={318} rx={70} ry={9} fill="rgba(0,0,0,.22)" />
      <g className="cn-squish">
        <path d="M100 18 C140 18 158 70 158 150 C158 230 136 286 100 290 C64 286 42 230 42 150 C42 70 60 18 100 18 Z" fill="url(#cn-kernels)" stroke={INK} strokeWidth={4} />
        <path d="M100 18 C140 18 158 70 158 150 C158 230 136 286 100 290 C64 286 42 230 42 150 C42 70 60 18 100 18 Z" fill="url(#cn-cob)" opacity={0.35} />
        <path d="M70 50 C80 34 96 28 110 30" fill="none" stroke="#FFF6C2" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
        <g className="cn-husk-l"><path d="M60 170 C30 200 24 260 40 310 C60 290 84 270 98 300 C90 250 82 210 60 170 Z" fill="url(#cn-husk)" stroke="#1E5A20" strokeWidth={4} strokeLinejoin="round" /></g>
        <g className="cn-husk-r"><path d="M140 170 C170 200 176 260 160 310 C140 290 116 270 102 300 C110 250 118 210 140 170 Z" fill="url(#cn-husk)" stroke="#1E5A20" strokeWidth={4} strokeLinejoin="round" /></g>
        <rect x={66} y={92} width={68} height={70} rx={30} fill="#FFE680" opacity={0.85} />
        <g className="cn-eyes">
          <Eye x={84} y={116} r={13} iris="#3A7C2A" look={[0, 0.2]} ink={INK} />
          <Eye x={116} y={116} r={13} iris="#3A7C2A" look={[0, 0.2]} ink={INK} />
        </g>
        <path d="M82 142 C90 158 112 158 120 142 C110 148 92 148 82 142 Z" fill="#8E1B23" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <ellipse cx={72} cy={140} rx={7} ry={4} fill="#F2735E" opacity={0.6} />
        <ellipse cx={128} cy={140} rx={7} ry={4} fill="#F2735E" opacity={0.6} />
      </g>
    </svg>
  );
}
