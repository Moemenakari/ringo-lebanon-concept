# Pattern code (React + TypeScript)

## sequence
Scroll-scrubbed image sequence on canvas. Frames come from `ffmpeg` (see SKILL.md).

```tsx
import { useEffect, useRef } from 'react';

export function ScrollSequence({ count, src, height = '300vh' }: { count: number; src: (i: number) => string; height?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    const ctx = canvas.current!.getContext('2d')!;
    let current = -1;
    const draw = (i: number) => {
      const img = imgs[i];
      if (!img?.complete || i === current) return;
      current = i;
      const c = canvas.current!;
      c.width = c.clientWidth * devicePixelRatio; c.height = c.clientHeight * devicePixelRatio;
      const s = Math.max(c.width / img.width, c.height / img.height); // cover
      ctx.drawImage(img, (c.width - img.width * s) / 2, (c.height - img.height * s) / 2, img.width * s, img.height * s);
    };
    // first frames now, the rest when idle
    for (let i = 0; i < count; i++) {
      const load = () => { const im = new Image(); im.src = src(i); im.onload = () => i === 0 && draw(0); imgs[i] = im; };
      i < 10 ? load() : requestIdleCallback(load);
    }
    const onScroll = () => {
      const r = wrap.current!.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      requestAnimationFrame(() => draw(Math.round(p * (count - 1))));
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [count, src]);
  return (
    <div ref={wrap} style={{ height }}>
      <canvas ref={canvas} style={{ position: 'sticky', top: 0, width: '100%', height: '100vh' }} />
    </div>
  );
}
```

## orbit
Ingredients orbiting a product, with depth of field. `items` are real cut-outs.

```tsx
import { motion } from 'framer-motion';
const depth = { far: { scale: .7, blur: 3, z: 0 }, mid: { scale: 1, blur: 0, z: 2 }, near: { scale: 1.3, blur: 2, z: 4 } };
export function Orbit({ items }: { items: { src: string; x: number; y: number; layer: keyof typeof depth; rot: number }[] }) {
  return <>{items.map((it, i) => {
    const d = depth[it.layer];
    return <motion.img key={it.src + i} src={it.src} alt="" aria-hidden
      initial={{ opacity: 0, x: 0, y: 0, scale: .4, rotate: 0 }}
      animate={{ opacity: 1, x: it.x, y: [it.y, it.y - 12, it.y], scale: d.scale, rotate: it.rot }}
      transition={{ type: 'spring', stiffness: 90, damping: 14, delay: i * .05, y: { repeat: Infinity, duration: 4 + i % 3, ease: 'easeInOut' } }}
      style={{ position: 'absolute', left: '50%', top: '50%', width: 120, filter: `blur(${d.blur}px) drop-shadow(0 18px 18px rgba(0,0,0,.25))`, zIndex: d.z }} />;
  })}</>;
}
```
The product itself sits at `zIndex: 3`, so "near" items pass in front of it.

## exploded
Layers apart on scroll, then together again. Each layer is a separate cut-out.

```tsx
import { motion, useScroll, useTransform } from 'framer-motion';
export function Exploded({ layers }: { layers: string[] }) {
  const { scrollYProgress } = useScroll();
  return <div style={{ position: 'relative', height: 520 }}>{layers.map((src, i) => {
    const off = (i - (layers.length - 1) / 2) * 90;
    const y = useTransform(scrollYProgress, [0, .5, 1], [0, off, 0]); // eslint-disable-line react-hooks/rules-of-hooks
    return <motion.img key={src} src={src} alt="" style={{ y, position: 'absolute', inset: 0, margin: 'auto', zIndex: layers.length - i }} />;
  })}</div>;
}
```

## 3d-product
A rotating real product. You need a GLB: model it in Blender (a chip bag is a subdivided plane with cloth or sculpt crinkles), UV-map the **flattened label photo**, and export it with Draco compression, ideally under 1.5 MB.

```tsx
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, useGLTF } from '@react-three/drei';
function Bag() { const { scene } = useGLTF('/models/bag.glb'); return <primitive object={scene} />; }
export default function Product3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 35 }} dpr={[1, 2]}>
      <Environment preset="studio" />
      <Float speed={2} rotationIntensity={.4} floatIntensity={.6}><Bag /></Float>
      <ContactShadows position={[0, -1.2, 0]} opacity={.35} blur={2.5} />
    </Canvas>
  );
}
```
With no GLB, use the **2.5D fallback**: put the pack photo on a plane, tilt it with the pointer (rotateX/rotateY of 8° at most) and sweep a sheen across it. It still reads as real because the pixels are real.
