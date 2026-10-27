import { AnimatePresence, m, useMotionValue } from 'framer-motion';
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Product } from '../../data/products';
import { useIdle } from '../../lib/useIdle';
import { useMedia } from '../../lib/useMedia';
import { RoadSign } from '../RoadSign';
import type { Stage } from './Mascot';
import { RingCarousel } from './RingCarousel';
import { World } from './World';

// The drawn mascots are their own chunk: the packs and copy paint first, the characters walk in after.
const Mascot = lazy(() => import('./Mascot').then((m) => ({ default: m.Mascot })));

interface Props {
  items: Product[];
  pos: number;
  product: Product;
  onStep: (d: number) => void;
  onJump: (id: string) => void;
}

export function Hero({ items, pos, product, onStep, onJump }: Props) {
  const ref = useRef<HTMLElement>(null);
  const phone = useMedia('(max-width: 760px)');
  const calm = useMedia('(prefers-reduced-motion: reduce)');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hot, setHot] = useState(false);
  const idle = useIdle();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setSize({ w: e.contentRect.width, h: e.contentRect.height });
      x.set(e.contentRect.width * 0.7);
      y.set(e.contentRect.width > 760 ? e.contentRect.height * 0.6 : 400);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [x, y]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input, textarea')) return;
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStep]);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - r.left);
    // On phones the mascots stay in the stage above the copy, so text is never covered.
    y.set(r.width > 760 ? e.clientY - r.top : Math.min(e.clientY - r.top, 480));
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const stage: Stage = { x, y, w: size.w, h: size.h, calm };

  return (
    <section
      id="flavours"
      ref={ref}
      className={`hero${hot && product.act === 'heat' ? ' hot' : ''}`}
      onPointerMove={onMove}
      onPointerDown={onMove}
      aria-label="Ringo flavours"
    >
      <World product={product} count={phone ? 10 : 22} />
      {idle && <Suspense fallback={null}><Mascot product={product} stage={stage} /></Suspense>}

      <div className="hero-inner">
        <div className="hero-copy" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={product.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <p className="eyebrow"><span className="pin" aria-hidden="true">●</span> Since 1995 · made in South Lebanon</p>
              {product.crown && <span className="sticker">King of childhood · ملك الطفولة</span>}
              <h1>{product.name}</h1>
              <p className="flavour">{product.flavour}</p>
              <p className="blurb">{product.blurb}</p>
              <p className="hint"><span aria-hidden="true">✦</span> {product.hint}</p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#buy">Where to buy <span aria-hidden="true">↓</span></a>
                {product.weight && <span className="meta">Kids' pack · {product.weight}</span>}
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="hero-stage" onPointerEnter={() => setHot(true)} onPointerLeave={() => setHot(false)}>
          <div className="wheel">
            <RingCarousel items={items} pos={pos} radius={phone ? 250 : 430} onStep={onStep} />
            <AnimatePresence>
              {product.crown && (
                <m.img
                  key="crown"
                  className="crown"
                  src="/brand/crown.webp"
                  alt=""
                  initial={{ y: -80, opacity: 0, rotate: -12 }}
                  animate={{ y: 0, opacity: 1, rotate: -6 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.25 }}
                />
              )}
            </AnimatePresence>
          </div>
          <button type="button" className="nav-arrow prev" onClick={() => onStep(-1)} aria-label="Previous pack">‹</button>
          <button type="button" className="nav-arrow next" onClick={() => onStep(1)} aria-label="Next pack">›</button>
        </div>
      </div>

      <div className="hero-sign"><RoadSign current={product} onPick={onJump} compact /></div>
      <a className="scroll-cue" href="#mind" aria-label="Scroll to the game"><span /></a>
    </section>
  );
}
