import { AnimatePresence, motion, useAnimationFrame, useSpring, type MotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { INGREDIENTS } from '../../data/ingredients';
import type { Ingredient, Product } from '../../data/products';
import { Boxer } from './rigs/Boxer';
import { Cat } from './rigs/Cat';
import { ChilliGuy } from './rigs/Chilli';
import { Corn } from './rigs/Corn';
import { Croc } from './rigs/Croc';
import { KetchupKid } from './rigs/Kids';
import { Fish, Turtle } from './rigs/Sea';
import { Shark } from './rigs/Shark';
import { Tiger } from './rigs/Tiger';

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

/** Peanut: the boxer works the punch bag on every beat; tap him and he unloads, peanuts flying out of the bag. */
function Punch({ stage }: { stage: Stage }) {
  const [flurry, setFlurry] = useState(false);
  const bag = useRef<SVGGElement>(null);
  const { burst, layer } = useBurst();
  const punch = () => {
    setFlurry(true);
    window.setTimeout(() => setFlurry(false), 1700);
    const host = bag.current?.closest('.hero')?.getBoundingClientRect();
    const r = bag.current?.getBoundingClientRect();
    if (host && r) burst(r.left - host.left + r.width / 2, r.top - host.top + r.height * 0.4, ['peanut', 'peanut-kernel'], 9);
  };
  return (
    <div className="act act-punch">
      <Boxer ref={bag} flurry={flurry && !stage.calm} onPunch={punch} />
      {layer}
    </div>
  );
}

/** Barby: the shark hunts your cursor (or finger) and snaps up the Barby rings that drift in the water. */
function Chase({ stage }: { stage: Stage }) {
  const x = useSpring(stage.x, { stiffness: 40, damping: 12 });
  const y = useSpring(stage.y, { stiffness: 40, damping: 12 });
  const [face, setFace] = useState(1);
  const [chomp, setChomp] = useState(false);
  const [prey, setPrey] = useState<{ id: number; x: number; y: number; src: string; r: number }[]>([]);
  const [eaten, setEaten] = useState(0);
  const last = useRef(0);
  const wide = stage.w > 760;

  useEvery(1100, () => {
    setPrey((list) => (list.length >= 6 ? list : [...list, {
      id: nextId++, x: stage.w * (wide ? 0.46 + Math.random() * 0.5 : 0.1 + Math.random() * 0.8),
      y: wide ? stage.h * (0.2 + Math.random() * 0.65) : 90 + Math.random() * 380, src: photo('barby'), r: Math.random() * 360,
    }]));
  }, !stage.calm);

  useAnimationFrame(() => {
    const sx = x.get();
    const sy = y.get();
    const v = sx - last.current;
    last.current = sx;
    if (Math.abs(v) > 0.6) setFace(v > 0 ? 1 : -1);
    // The mouth is at the front of the shark, so test from there rather than its middle.
    const mx = sx + face * (wide ? 80 : 50);
    setPrey((list) => {
      const left = list.filter((r) => Math.hypot(r.x - mx, r.y - sy) > 60);
      if (left.length !== list.length) {
        setEaten((n) => n + list.length - left.length);
        setChomp(true);
        window.setTimeout(() => setChomp(false), 1000);
      }
      return left.length === list.length ? list : left;
    });
  });

  return (
    <div className="act act-chase">
      <AnimatePresence>
        {prey.map((r) => (
          <motion.img key={r.id} className="prey" src={r.src} alt="" style={{ left: r.x, top: r.y, rotate: r.r }}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.18 } }}
            transition={{ y: { repeat: Infinity, duration: 2.4 } }} />
        ))}
      </AnimatePresence>
      <motion.div className="m shark" style={{ x, y, scaleX: face }}><Shark chomp={chomp} /></motion.div>
      <span className="score" aria-live="polite">Barby rings eaten: <b>{eaten}</b></span>
    </div>
  );
}

/** Crinkles: the blue cat stretched out on the beach, palm trees swaying towards your hand. */
function Lounge({ stage }: { stage: Stage }) {
  const sway = useSpring(0, { stiffness: 30, damping: 8 });
  useAnimationFrame(() => sway.set(((stage.x.get() / Math.max(stage.w, 1)) - 0.5) * 10));
  return (
    <div className="act act-lounge">
      <motion.img className="palm palm-a" src="/drawn/palm.svg" alt="" style={{ rotate: sway }} />
      <motion.img className="palm palm-b" src="/drawn/palm.svg" alt="" style={{ rotate: sway }} />
      <motion.img className="palm palm-c" src="/drawn/palm.svg" alt="" style={{ rotate: sway }} />
      <div className="m lounger"><Cat /></div>
    </div>
  );
}

/** Salt & Vinegar: point near a peanut and the tiger pounces on it and cracks the shell in two. */
function Pounce({ stage }: { stage: Stage }) {
  const wide = stage.w > 760;
  const spot = () => ({ id: nextId++, x: stage.w * (wide ? 0.46 + Math.random() * 0.48 : 0.1 + Math.random() * 0.8), y: wide ? stage.h * (0.3 + Math.random() * 0.55) : 380 + Math.random() * 90, src: photo('peanut'), cracked: false });
  const [chips, setChips] = useState(() => Array.from({ length: 5 }, spot));
  const [target, setTarget] = useState({ x: stage.w * 0.55, y: wide ? stage.h * 0.8 : 430 });
  const [leaping, setLeaping] = useState(false);
  const busy = useRef(false);

  useAnimationFrame(() => {
    if (busy.current) return;
    const px = stage.x.get();
    const py = stage.y.get();
    const near = chips.find((c) => !c.cracked && Math.hypot(c.x - px, c.y - py) < 120);
    if (!near) return;
    busy.current = true;
    setLeaping(true);
    setTarget({ x: near.x, y: near.y });
    window.setTimeout(() => setChips((all) => all.map((c) => (c.id === near.id ? { ...c, cracked: true } : c))), 380);
    window.setTimeout(() => setLeaping(false), 520);
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
      <motion.div className="m tiger" animate={{ left: target.x, top: target.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
        <Tiger leaping={leaping} />
      </motion.div>
    </div>
  );
}

/** Cheese Cocktail: the crocodile sprints the length of the screen eating the cheese in its path. */
function Chomp({ stage }: { stage: Stage }) {
  const N = 8;
  const [gone, setGone] = useState<number[]>([]);
  const croc = useRef<HTMLDivElement>(null);
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
      <motion.div ref={croc} className="m croc"
        animate={stage.calm ? undefined : { left: ['-8%', '92%', '92%', '-8%', '-8%'], scaleX: [1, 1, -1, -1, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear', times: [0, 0.48, 0.5, 0.98, 1] }}>
        <Croc />
      </motion.div>
    </div>
  );
}

/** Popcorn: the corn keeps popping; tap it for a whole handful. */
function Pop({ stage }: { stage: Stage }) {
  const { burst, layer } = useBurst();
  const btn = useRef<HTMLButtonElement>(null);
  const origin = () => {
    const host = btn.current?.closest('.hero')?.getBoundingClientRect();
    const r = btn.current?.getBoundingClientRect();
    return host && r ? [r.left - host.left + r.width / 2, r.top - host.top + r.height * 0.2] : [stage.w * 0.5, stage.h * 0.7];
  };
  useEvery(650, () => { const [x, y] = origin(); burst(x, y, ['popcorn'], 1, 160, 300); }, !stage.calm);
  return (
    <div className="act act-pop">
      <motion.button ref={btn} type="button" className="m cob" aria-label="Pop the corn" onClick={() => { const [x, y] = origin(); burst(x, y, ['popcorn'], 10, 260, 340); }}
        animate={stage.calm ? undefined : { rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 0.6 }}>
        <Corn />
      </motion.button>
      {layer}
    </div>
  );
}

/** Chilli: the chip in the Ringo hat hops about fanning its mouth; chillies and flames rise around it. */
function Heat({ stage }: { stage: Stage }) {
  const { burst, layer } = useBurst();
  useEvery(420, () => burst(stage.w * (0.3 + Math.random() * 0.7), stage.h + 40, ['chilli', 'flame'], 1, 60, stage.h * 0.9), !stage.calm);
  return (
    <div className="act act-heat">
      <div className="m chilli-guy"><ChilliGuy /></div>
      {layer}
    </div>
  );
}

/** Ketchup: the kid never stops dancing. Tap him and he spins, tomatoes everywhere. */
function Dance() {
  const [spin, setSpin] = useState(0);
  const { burst, layer } = useBurst();
  const btn = useRef<HTMLButtonElement>(null);
  return (
    <div className="act act-dance">
      <motion.button ref={btn} type="button" className="m kid" aria-label="Make the kid spin"
        onClick={() => {
          setSpin((s) => s + 1);
          const host = btn.current?.closest('.hero')?.getBoundingClientRect();
          const r = btn.current?.getBoundingClientRect();
          if (host && r) burst(r.left - host.left + r.width / 2, r.top - host.top + r.height * 0.3, ['tomato'], 8);
        }}
        animate={{ rotateY: spin * 360 }} transition={{ duration: 0.7 }}>
        <KetchupKid />
      </motion.button>
      {layer}
    </div>
  );
}

/** Paprika rings: the turtle and the red fish cross the sea; tap the water and peppers float up. */
function Swim({ stage }: { stage: Stage }) {
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
      <motion.div className="m turtle"
        animate={stage.calm ? undefined : { left: ['92%', '46%', '92%'], scaleX: [-1, -1, 1], y: [0, -24, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut', times: [0, 0.5, 1] }}>
        <Turtle />
      </motion.div>
      <motion.div className="m fish"
        animate={stage.calm ? undefined : { left: ['48%', '90%', '48%'], scaleX: [1, 1, -1], y: [0, 18, 0] }}
        transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut' }}>
        <Fish />
      </motion.div>
      {layer}
    </div>
  );
}

/** Mounts the active pack's act, keyed by pack so each one starts fresh. */
export function Mascot({ product, stage }: { product: Product; stage: Stage }) {
  if (!stage.w) return null;
  const act = {
    punch: <Punch stage={stage} />,
    chase: <Chase stage={stage} />,
    lounge: <Lounge stage={stage} />,
    pounce: <Pounce stage={stage} />,
    chomp: <Chomp stage={stage} />,
    pop: <Pop stage={stage} />,
    heat: <Heat stage={stage} />,
    dance: <Dance />,
    swim: <Swim stage={stage} />,
  }[product.act];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={product.id} className="mascot-layer" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.4 }}>
        {act}
      </motion.div>
    </AnimatePresence>
  );
}
