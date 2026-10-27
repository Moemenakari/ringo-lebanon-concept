import { AnimatePresence, m } from 'framer-motion';
import { memo, useMemo } from 'react';
import { layoutFloats } from '../../data/ingredients';
import type { Product } from '../../data/products';

/**
 * The pack's world behind the wheel: its colours, a motif lifted from its own artwork, and a cloud
 * of real ingredient photos in three depth layers (far is soft and small, near is big, blurred and
 * in front), all drifting a little with the mouse.
 */
export const World = memo(function World({ product, count }: { product: Product; count: number }) {
  const floats = useMemo(() => layoutFloats(product.id, product.floats, count), [product, count]);
  return (
    <div className="world" aria-hidden="true">
      <AnimatePresence initial={false}>
        <m.div
          key={product.id}
          className={`wall motif-${product.motif}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="wall-word">{product.name}</span>
        </m.div>
      </AnimatePresence>
      <AnimatePresence initial={false}>
        <m.div
          key={product.id}
          className="floats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {floats.map((f, i) => (
            <span
              key={i}
              className={`float ${f.depth}`}
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: f.size,
                ['--r' as string]: `${f.rotate}deg`,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.duration}s`,
              }}
            >
              <img src={f.src} alt="" loading="lazy" decoding="async" draggable={false} width={100} height={100} />
            </span>
          ))}
        </m.div>
      </AnimatePresence>
    </div>
  );
});
