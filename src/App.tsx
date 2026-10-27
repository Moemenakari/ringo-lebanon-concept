import { useEffect, useState, type CSSProperties } from 'react';
import { ComingSoon, ConceptBadge, ConceptModal, Nav } from './components/Chrome';
import { Hero } from './components/hero/Hero';
import { PRODUCTS } from './data/products';
import { useCatalog } from './lib/useCatalog';
import { Gallery } from './components/hero/rigs/Gallery';
import { BuyLebanese, Footer, Lineup, MindGame, Since1995, WhereToBuy } from './sections/Sections';

const routeOf = () => (window.location.hash.startsWith('#/') ? window.location.hash.slice(2) : '');

export default function App() {
  const c = useCatalog();
  const [route, setRoute] = useState(routeOf);
  const demo = new URLSearchParams(window.location.search).has('demo');

  useEffect(() => {
    const on = () => { setRoute(routeOf()); if (window.location.hash.startsWith('#/')) window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // ?demo=1: hands-free run for screen recordings, one pack every 3 seconds.
  const { step } = c;
  useEffect(() => {
    if (!demo) return;
    const id = window.setInterval(() => step(1), 3000);
    return () => window.clearInterval(id);
  }, [demo, step]);

  // Warm the cache with every pack once the page is idle, so the wheel never waits on one.
  useEffect(() => {
    const id = window.setTimeout(() => PRODUCTS.forEach((p) => { new Image().src = p.pack; new Image().src = p.mascot.src; }), 2500);
    return () => window.clearTimeout(id);
  }, []);

  if (new URLSearchParams(window.location.search).has('rigs')) return <Gallery />;

  const [l, m, d] = c.product.tones;
  const vars = { '--t0': l, '--t1': m, '--t2': d, '--accent': c.product.accent, '--ink': c.product.ink } as CSSProperties;
  const show = (id: string) => { c.jumpTo(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="app" style={vars}>
      <Nav />
      {route ? (
        <ComingSoon page={route.charAt(0).toUpperCase() + route.slice(1)} />
      ) : (
        <main>
          <Hero items={c.items} pos={c.pos} product={c.product} onStep={c.step} onJump={c.jumpTo} />
          <MindGame onShow={show} />
          <BuyLebanese onPick={show} />
          <Lineup onPick={show} />
          <Since1995 />
          <WhereToBuy />
        </main>
      )}
      <Footer />
      <ConceptBadge />
      {!demo && <ConceptModal />}
    </div>
  );
}
