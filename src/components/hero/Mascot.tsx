import { AnimatePresence, motion, useAnimationFrame, useSpring, type MotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { INGREDIENTS } from '../../data/ingredients';
import type { Ingredient, Product } from '../../data/products';

/** Pointer position inside the hero, in px, plus the hero's size. Shared by every act. */
export interface Stage {
  x: MotionValue<number>;
  y: MotionValue<number>;
  w: number;
  h: number;
  calm: boolean;
}

interface Bit {
  id: number;
  src: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  size: number;
}

let nextId = 1;
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];
const photo = (k: Ingredient) => pick(INGREDIENTS[k]);

/** Real ingredients that burst out of a point, fly on an arc and fade. */
function useBurst() {
  const [bits, setBits] = useState<Bit[]>([]);
  const burst = useCallback((x: number, y: number, kinds: Ingredient[], n: number, spread = 220, lift = 260) => {
    const fresh = Array.from({ length: n }, () => ({
      id: nextId++,
      src: photo(pick(kinds)),
      x,
      y,
      dx: (Math.random() - 0.5) * spread * 2,
      dy: -lift * (0.5 + Math.random()),
      rot: (Math.random() - 0.5) * 540,
      size: 34 + Math.random() * 34,
    }));
    setBits((b) => [...b.slice(-40), ...fresh]);
  }, []);
  const layer = (
    <AnimatePresence>
      {bits.map((b) => (
        <motion.img
          key={b.id}
          className="bit"
          src={b.src}
          alt=""
          style={{ left: b.x, top: b.y, width: b.size }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: [`-50%`, `calc(-50% + ${b.dx * 0.6}px)`, `calc(-50% + ${b.dx}px)`], y: ['-50%', `calc(-50% + ${b.dy}px)`, `calc(-50% + ${b.dy * 0.2 + 220}px)`], opacity: [1, 1, 0], scale: [0.4, 1, 0.9], rotate: b.rot }}
          transition={{ duration: 1.5, ease: 'easeOut', times: [0, 0.45, 1] }}
          onAnimationComplete={() => setBits((all) => all.filter((x) => x.id !== b.id))}
        />
      ))}
    </AnimatePresence>
  );
  return { burst, layer };
}

/** Repeats `fn` every `ms` while the act is on screen and motion is allowed. */
function useEvery(ms: number, fn: () => void, on = true) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => ref.current(), ms);
    return () => window.clearInterval(id);
  }, [ms, on]);
}

/* ---------------- the acts ---------------- */

/** Peanut: the boxer works the punch bag; tap it and he unloads, peanuts flying out of the bag. */
function Punch({ p, stage }: { p: Product; stage: Stage }) {
  const [hit, setHit] = useState(0);
  const { burst, layer } = useBurst();
  const phone = stage.w <= 760;
  const floor = Math.min(stage.h * 0.3, 270);
  const bagX = phone ? stage.w * 0.5 + 10 : stage.w * 0.5 + floor * 0.84;
  const bagY = phone ? 430 : stage.h * 0.95 - floor * 0.4;
  useEvery(1700, () => setHit((h) => h + 1), !stage.calm);
  const flurry = () => {
    setHit((h) => h + 1);
    burst(bagX, bagY, ['peanut', 'peanut-kernel'], 9);
  };
  return (
    <div className="act act-punch">
      <motion.img
        key={`bag-${hit}`}
        className="m punchbag"
        src={p.mascot.extra?.[0]}
        alt=""
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 16, -7, 3, 0] }}
        transition={{ duration: 1.1, delay: 0.16, ease: 'easeOut' }}
        onClick={flurry}
      />
      <motion.button
        type="button"
        className="m boxer"
        aria-label="Make the boxer punch"
        onClick={flurry}
        key={`boxer-${hit}`}
        initial={{ x: 0 }}
        animate={{ x: [0, 34, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
      >
        <img src={p.mascot.src} alt="" />
      </motion.button>
      {layer}
    </div>
  );
}

/** Barby: the shark hunts your cursor (or finger) and eats the rings that pop up in the water. */
function Chase({ p, stage }: { p: Product; stage: Stage }) {
  const x = useSpring(stage.x, { stiffness: 40, damping: 12 });
  const y = useSpring(stage.y, { stiffness: 40, damping: 12 });
  const [face, setFace] = useState(1);
  const [prey, setPrey] = useState<{ id: number; x: number; y: number; src: string }[]>([]);
  const [eaten, setEaten] = useState(0);
  const last = useRef(0);

  useEvery(1100, () => {
    setPrey((list) => (list.length >= 6 ? list : [...list, { id: nextId++, x: stage.w * (stage.w > 760 ? 0.46 + Math.random() * 0.5 : 0.1 + Math.random() * 0.8), y: stage.w > 760 ? stage.h * (0.2 + Math.random() * 0.65) : 90 + Math.random() * 380, src: photo('pack') }]));
  }, !stage.calm);

  useAnimationFrame(() => {
    const sx = x.get();
    const sy = y.get();
    const v = sx - last.current;
    last.current = sx;
    if (Math.abs(v) > 0.6) setFace(v > 0 ? -1 : 1);
    setPrey((list) => {
      const left = list.filter((r) => Math.hypot(r.x - sx, r.y - sy) > 70);
      if (left.length !== list.length) setEaten((n) => n + list.length - left.length);
      return left.length === list.length ? list : left;
    });
  });

  return (
    <div className="act act-chase">
      <AnimatePresence>
        {prey.map((r) => (
          <motion.img key={r.id} className="prey" src={r.src} alt="" style={{ left: r.x, top: r.y }}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.18 } }}
            transition={{ y: { repeat: Infinity, duration: 2.4 } }} />
        ))}
      </AnimatePresence>
      <motion.img className="m shark" src={p.mascot.src} alt="" style={{ x, y, scaleX: face }} />
      <span className="score" aria-live="polite">Bags eaten: <b>{eaten}</b></span>
    </div>
  );
}

/** Crinkles: the blue cat lounges on the beach while the palm sways towards your hand. */
function Lounge({ p, stage }: { p: Product; stage: Stage }) {
  const sway = useSpring(0, { stiffness: 30, damping: 8 });
  useAnimationFrame(() => sway.set(((stage.x.get() / Math.max(stage.w, 1)) - 0.5) * 16));
  return (
    <div className="act act-lounge">
      <motion.img className="m palm" src={p.mascot.extra?.[0]} alt="" style={{ rotate: sway }} />
      <motion.img className="m lounger" src={p.mascot.src} alt=""
        animate={stage.calm ? undefined : { y: [0, -14, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }} />
    </div>
  );
}

/** Salt & Vinegar: point near a peanut and the tiger pounces on it and cracks the shell in two. */
function Pounce({ p, stage }: { p: Product; stage: Stage }) {
  const spot = () => ({ id: nextId++, x: stage.w * (stage.w > 760 ? 0.46 + Math.random() * 0.48 : 0.1 + Math.random() * 0.8), y: stage.w > 760 ? stage.h * (0.3 + Math.random() * 0.55) : 380 + Math.random() * 90, src: photo('peanut'), cracked: false });
  const [chips, setChips] = useState(() => Array.from({ length: 5 }, spot));
  const [target, setTarget] = useState({ x: stage.w * 0.55, y: stage.w > 760 ? stage.h * 0.8 : 430 });
  const busy = useRef(false);

  useAnimationFrame(() => {
    if (busy.current) return;
    const px = stage.x.get();
    const py = stage.y.get();
    const near = chips.find((c) => !c.cracked && Math.hypot(c.x - px, c.y - py) < 120);
    if (!near) return;
    busy.current = true;
    setTarget({ x: near.x, y: near.y });
    window.setTimeout(() => setChips((all) => all.map((c) => (c.id === near.id ? { ...c, cracked: true } : c))), 380);
    window.setTimeout(() => { setChips((all) => all.map((c) => (c.id === near.id ? spot() : c))); busy.current = false; }, 1500);
  });

  return (
    <div className="act act-pounce">
      {chips.map((c) => (
        <span key={c.id} className={`crackable${c.cracked ? ' cracked' : ''}`} style={{ left: c.x, top: c.y }}>
          <img src={c.src} alt="" className="half a" />
          <img src={c.src} alt="" className="half b" />
        </span>
      ))}
      <motion.img className="m tiger" src={p.mascot.src} alt=""
        animate={{ left: target.x, top: target.y, scaleY: [1, 0.85, 1.05, 1] }}
        transition={{ left: { type: 'spring', stiffness: 120, damping: 14 }, top: { type: 'spring', stiffness: 120, damping: 14 }, scaleY: { duration: 0.5 } }} />
    </div>
  );
}

/** Cheese Cocktail: the crocodile runs the length of the screen eating the cheese in its path. */
function Chomp({ p, stage }: { p: Product; stage: Stage }) {
  const N = 8;
  const [gone, setGone] = useState<number[]>([]);
  const croc = useRef<HTMLImageElement>(null);
  useAnimationFrame(() => {
    const el = croc.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const parent = el.parentElement!.getBoundingClientRect();
    const mouth = r.left - parent.left + r.width / 2;
    const hit = Array.from({ length: N }, (_, i) => i).filter((i) => Math.abs(stage.w * (0.08 + (i * 0.86) / (N - 1)) - mouth) < 40);
    if (hit.some((i) => !gone.includes(i))) setGone((g) => [...new Set([...g, ...hit])].slice(-N));
  });
  useEvery(2600, () => setGone((g) => g.slice(Math.ceil(g.length / 2))), !stage.calm);
  return (
    <div className="act act-chomp">
      <div className="chip-row">
        {Array.from({ length: N }, (_, i) => (
          <motion.img key={i} src={INGREDIENTS.cheese[i % INGREDIENTS.cheese.length]} alt="" style={{ left: `${8 + (i * 86) / (N - 1)}%` }}
            animate={{ scale: gone.includes(i) ? 0 : 1, opacity: gone.includes(i) ? 0 : 1 }} transition={{ duration: 0.2 }} />
        ))}
      </div>
      <motion.img ref={croc} className="m croc" src={p.mascot.src} alt=""
        animate={stage.calm ? undefined : { left: ['-8%', '92%', '92%', '-8%', '-8%'], scaleX: [-1, -1, 1, 1, -1], rotate: [0, -4, 4, -4, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear', times: [0, 0.48, 0.5, 0.98, 1] }} />
    </div>
  );
}

/** Popcorn: the corn keeps popping; tap it for a whole handful. */
function Pop({ p, stage }: { p: Product; stage: Stage }) {
  const { burst, layer } = useBurst();
  const ox = stage.w * 0.3;
  const oy = stage.h * 0.6;
  useEvery(650, () => burst(ox, oy, ['popcorn'], 1, 160, 300), !stage.calm);
  return (
    <div className="act act-pop">
      <motion.button type="button" className="m cob" aria-label="Pop the corn" onClick={() => burst(ox, oy, ['popcorn'], 10, 260, 340)}
        animate={stage.calm ? undefined : { rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 0.6 }}>
        <img src={p.mascot.src} alt="" />
      </motion.button>
      {layer}
    </div>
  );
}

/** Chilli: chillies and flames rise from below; hovering the wheel heats the bag up. */
function Heat({ stage }: { stage: Stage }) {
  const { burst, layer } = useBurst();
  useEvery(420, () => burst(stage.w * (0.3 + Math.random() * 0.7), stage.h + 40, ['chilli', 'flame'], 1, 60, stage.h * 0.9), !stage.calm);
  return <div className="act act-heat">{layer}</div>;
}

/** Ketchup: the kid never stops dancing. Tap him and he spins, tomatoes everywhere. */
function Dance({ p, stage }: { p: Product; stage: Stage }) {
  const [spin, setSpin] = useState(0);
  const { burst, layer } = useBurst();
  return (
    <div className="act act-dance">
      <motion.button type="button" className="m kid" aria-label="Make the kid dance"
        onClick={() => { setSpin((s) => s + 1); burst(stage.w * 0.28, stage.h * 0.55, ['tomato'], 8); }}
        animate={stage.calm ? { rotate: spin * 360 } : { y: [0, -24, 0, -10, 0], rotate: [spin * 360 - 6, spin * 360 + 6, spin * 360 - 6] }}
        transition={{ y: { repeat: Infinity, duration: 1.1 }, rotate: { repeat: Infinity, duration: 1.1 } }}>
        <img src={p.mascot.src} alt="" />
      </motion.button>
      {layer}
    </div>
  );
}

/** Paprika rings: a turtle and a fish cross the sea; click the water and bubbles rise from it. */
function Swim({ p, stage }: { p: Product; stage: Stage }) {
  const { burst, layer } = useBurst();
  useEffect(() => {
    const host = document.querySelector('.hero');
    if (!host) return;
    const on = (e: Event) => {
      const ev = e as PointerEvent;
      if ((ev.target as HTMLElement).closest('button, a')) return;
      burst(stage.x.get(), stage.y.get(), ['paprika', 'chilli'], 6, 80, 300);
    };
    host.addEventListener('pointerdown', on);
    return () => host.removeEventListener('pointerdown', on);
  }, [burst, stage.x, stage.y]);
  return (
    <div className="act act-swim">
      <motion.img className="m turtle" src={p.mascot.src} alt=""
        animate={stage.calm ? undefined : { left: ['96%', '30%', '96%'], scaleX: [1, 1, -1], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut', times: [0, 0.5, 1] }} />
      <motion.img className="m fish" src={p.mascot.extra?.[0]} alt=""
        animate={stage.calm ? undefined : { left: ['32%', '92%', '32%'], scaleX: [-1, -1, 1], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut' }} />
      <motion.img className="m bug" src={p.mascot.extra?.[1]} alt=""
        animate={stage.calm ? undefined : { y: [0, -16, 0], rotate: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 2.6 }} />
      {layer}
    </div>
  );
}

/** Mounts the active pack's act, keyed by pack so each one starts fresh. */
export function Mascot({ product, stage }: { product: Product; stage: Stage }) {
  if (!stage.w) return null;
  const props = { p: product, stage };
  const act = {
    punch: <Punch {...props} />,
    chase: <Chase {...props} />,
    lounge: <Lounge {...props} />,
    pounce: <Pounce {...props} />,
    chomp: <Chomp {...props} />,
    pop: <Pop {...props} />,
    heat: <Heat stage={stage} />,
    dance: <Dance {...props} />,
    swim: <Swim {...props} />,
  }[product.act];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={product.id} className="mascot-layer" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.4 }}>
        {act}
      </motion.div>
    </AnimatePresence>
  );
}
