import { Eye, EyeDefs, Shade, Sheen } from './kit';

const INK = '#13295C';
const BLUE = '#3C7FE6';

/** The Crinkles cat, redrawn whole: stretched out on the sand, breathing slow, tail lazily swaying. */
export function Cat() {
  return (
    <svg className="rig cat-rig" viewBox="0 0 440 280" aria-hidden="true">
      <defs>
        <Shade id="ct-body" color={BLUE} cx="40%" cy="22%" />
        <Shade id="ct-dark" color="#2C63C2" />
        <linearGradient id="ct-tail" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2C63C2" />
          <stop offset="1" stopColor="#6FA4F2" />
        </linearGradient>
        <radialGradient id="ct-muzzle" cx="45%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D7E6FB" />
        </radialGradient>
        <EyeDefs />
      </defs>

      <ellipse cx={210} cy={254} rx={190} ry={16} fill="rgba(0,0,0,.2)" />

      {/* tail curling up behind, swaying from its root */}
      <g className="ct-tail">
        <path d="M86 200 C40 196 26 150 44 112 C58 84 92 82 98 104" fill="none" stroke={INK} strokeWidth={30} strokeLinecap="round" />
        <path d="M86 200 C40 196 26 150 44 112 C58 84 92 82 98 104" fill="none" stroke="url(#ct-tail)" strokeWidth={22} strokeLinecap="round" />
        <path d="M44 150 l14 -4 M40 128 l14 2 M52 104 l10 8" stroke={INK} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
      </g>

      <g className="ct-breath">
        {/* back leg tucked, foot stretched out */}
        <ellipse cx={176} cy={244} rx={44} ry={15} fill="url(#ct-dark)" stroke={INK} strokeWidth={4} />
        <path d="M150 248 l4 -10 M164 250 l3 -11 M178 250 l2 -11" stroke={INK} strokeWidth={3} strokeLinecap="round" />

        {/* body lying on its belly */}
        <path d="M76 206 C66 156 126 126 206 130 C276 134 306 166 306 206 C306 232 266 246 194 246 C114 246 82 236 76 206 Z" fill="url(#ct-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <ellipse cx={128} cy={204} rx={46} ry={38} fill="url(#ct-body)" stroke={INK} strokeWidth={4} />
        <Sheen d="M120 150 C160 136 210 136 250 146 C210 144 160 148 124 162 Z" />
        <path d="M150 140 c4 14 2 24 -4 32 M184 136 c4 14 2 24 -4 32 M216 138 c4 14 2 24 -4 32" fill="none" stroke="#2A5DB8" strokeWidth={5} strokeLinecap="round" opacity={0.55} />

        {/* front paws crossed under the chin */}
        <ellipse cx={312} cy={240} rx={36} ry={15} fill="url(#ct-body)" stroke={INK} strokeWidth={4} />
        <ellipse cx={352} cy={246} rx={34} ry={14} fill="url(#ct-body)" stroke={INK} strokeWidth={4} />
        <path d="M330 246 l3 -10 M344 251 l2 -11 M358 252 l1 -11 M296 240 l3 -10 M310 243 l2 -10" stroke={INK} strokeWidth={3} strokeLinecap="round" />

        {/* head */}
        <g className="ct-head">
          <g className="ct-ear-l">
            <path d="M262 98 C258 70 266 46 278 34 C292 50 304 70 308 88 Z" fill="url(#ct-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <path d="M272 90 C270 72 274 58 280 50 C288 62 294 74 296 86 Z" fill="#F7A3C0" />
          </g>
          <g className="ct-ear-r">
            <path d="M336 86 C346 66 362 48 380 40 C384 60 382 84 374 104 Z" fill="url(#ct-body)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <path d="M346 88 C354 74 364 62 374 56 C376 70 374 86 370 98 Z" fill="#F7A3C0" />
          </g>
          <ellipse cx={322} cy={142} rx={76} ry={64} fill="url(#ct-body)" stroke={INK} strokeWidth={4} />
          <path d="M262 112 c10 -4 20 -4 28 0 M354 106 c10 -2 18 0 24 6" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
          <Sheen d="M268 106 C292 88 336 84 368 96 C338 94 300 98 276 116 Z" opacity={0.5} />
          {/* cheeks and muzzle */}
          <ellipse cx={306} cy={168} rx={30} ry={22} fill="url(#ct-muzzle)" stroke={INK} strokeWidth={3} />
          <ellipse cx={344} cy={168} rx={30} ry={22} fill="url(#ct-muzzle)" stroke={INK} strokeWidth={3} />
          <path d="M318 152 C318 144 334 144 334 152 C334 158 326 162 326 162 C326 162 318 158 318 152 Z" fill="#E2557A" stroke={INK} strokeWidth={2.5} />
          <path d="M326 162 L326 172 M326 172 C320 180 310 180 304 174 M326 172 C332 180 342 180 348 174" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <path d="M330 176 C330 190 344 194 348 184 C346 178 338 176 330 176 Z" fill="#E8434F" stroke={INK} strokeWidth={2.5} />
          {/* whiskers */}
          <path d="M278 164 L238 156 M278 172 L236 174 M372 162 L412 152 M372 170 L414 172" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
          {/* sleepy, happy eyes */}
          <g className="ct-eyes">
            <Eye x={296} y={128} r={17} iris="#A8D93A" look={[0.4, 0.2]} lid={0.5} lidColor="#3672D6" ink={INK} />
            <Eye x={346} y={126} r={17} iris="#A8D93A" look={[0.4, 0.2]} lid={0.5} lidColor="#3672D6" ink={INK} />
          </g>
        </g>
      </g>
    </svg>
  );
}
