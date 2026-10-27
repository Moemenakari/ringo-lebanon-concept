import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RINGO, SITE } from '../config/site';
import { byId, PRODUCTS, small } from '../data/products';
import { QUESTIONS, readMind } from '../lib/mind';
import { SchoolGirl } from '../components/hero/rigs/Kids';

/* ---------- What's on your mind? ---------- */

/** Ringo's "Why are you so quiet? What's on your mind?" story as a three-tap game. */
export function MindGame({ onShow }: { onShow: (id: string) => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [thinking, setThinking] = useState(false);
  const [spin, setSpin] = useState(0);
  const step = QUESTIONS.findIndex((q) => !answers[q.id]);
  const done = step === -1;
  const result = done ? byId(readMind(answers, PRODUCTS.map((p) => p.id)))! : null;

  // The head "thinks": packs flick past for a second before the answer lands.
  useEffect(() => {
    if (!done) return;
    setThinking(true);
    const tick = window.setInterval(() => setSpin((s) => s + 1), 110);
    const stop = window.setTimeout(() => { window.clearInterval(tick); setThinking(false); }, 1300);
    return () => { window.clearInterval(tick); window.clearTimeout(stop); };
  }, [done]);

  const shown = thinking ? PRODUCTS[spin % PRODUCTS.length] : result;
  const q = QUESTIONS[step];

  return (
    <section id="mind" className="section mind" style={result && !thinking ? ({ '--m0': result.tones[0], '--m1': result.tones[1] } as React.CSSProperties) : undefined}>
      <div className="wrap mind-grid">
        <div className="mind-copy">
          <p className="kicker">A game from Ringo's own story</p>
          <h2>Why are you so quiet? <br />What's on your mind?</h2>
          {!done && q && (
            <div className="quiz" role="group" aria-labelledby={`q-${q.id}`}>
              <p className="q-count">{step + 1} / {QUESTIONS.length}</p>
              <h3 id={`q-${q.id}`}>{q.ask}</h3>
              <div className="choices">
                {q.choices.map((c) => (
                  <button key={c.id} type="button" className="choice" onClick={() => setAnswers((a) => ({ ...a, [q.id]: c.id }))}>{c.label}</button>
                ))}
              </div>
            </div>
          )}
          {done && result && (
            <div className="verdict" aria-live="polite">
              {thinking ? <h3>Thinking…</h3> : (
                <>
                  <h3>It's <span>Ringo {result.name}</span>. It's always been.</h3>
                  <p>{result.blurb}</p>
                  <div className="modal-actions">
                    <button type="button" className="btn btn-primary" onClick={() => onShow(result.id)}>Show me the bag</button>
                    <button type="button" className="btn btn-ghost" onClick={() => setAnswers({})}>Ask me again</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="head" aria-hidden="true">
          <svg viewBox="0 0 400 420" className="head-line">
            <path d="M118 400 L122 318 C70 300 40 262 38 230 L10 214 L48 160 C40 70 120 14 214 14 C318 14 386 92 386 188 C386 262 340 300 318 320 L322 400 Z" />
          </svg>
          <div className="thought">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown ? (
                <motion.img key={`${shown.id}-${thinking ? spin : 'final'}`} src={small(shown.pack)} alt="" width={240} height={300}
                  initial={{ y: -60, opacity: 0, rotate: -20 }} animate={{ y: 0, opacity: 1, rotate: thinking ? 0 : -8 }} exit={{ y: 60, opacity: 0 }}
                  transition={thinking ? { duration: 0.1 } : { type: 'spring', stiffness: 200, damping: 12 }} />
              ) : (
                <motion.span key="q" className="dots" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>?</motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Buy Lebanese ---------- */

export function BuyLebanese({ onPick }: { onPick: (id: string) => void }) {
  // Every 8 s loop she reaches for a different pair of packs, still can't decide.
  const [round, setRound] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setRound((r) => r + 1), 8000);
    return () => window.clearInterval(id);
  }, []);
  const n = PRODUCTS.length;
  return (
    <section id="lebanese" className="section lebanese">
      <div className="wrap lebanese-grid">
        <div className="lebanese-copy">
          <img className="flag" src="/brand/flag.webp" alt="Lebanese flag" width="560" height="330" loading="lazy" />
          <h2 lang="ar" dir="rtl">اشتري لبناني</h2>
          <p className="kicker">Buy Lebanese</p>
          <p>
            Ringo has been made in Ghazieh, South Lebanon, since 1995: Lebanese potatoes, Lebanese hands, a Lebanese factory near
            Babilia Bridge. Every bag a kid opens at recess keeps a Lebanese line running.
          </p>
          <img className="stamp" src="/brand/made-in-lebanon.webp" alt="Made in Lebanon" width="200" height="140" loading="lazy" />
        </div>
        <div className="orbit-stage">
          <div className="girl" role="img" aria-label="The Ringo back-to-school girl, trying to choose a bag">
            <SchoolGirl left={small(PRODUCTS[(round * 2) % n].pack)} right={small(PRODUCTS[(round * 2 + 4) % n].pack)} />
          </div>
          <div className="orbit">
            {PRODUCTS.map((p, i) => (
              <button key={p.id} type="button" className="orbit-pack" style={{ ['--i' as string]: i, ['--n' as string]: PRODUCTS.length }} onClick={() => onPick(p.id)} aria-label={`Show Ringo ${p.name}`}>
                <img src={small(p.pack)} alt="" loading="lazy" width={240} height={300} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Since 1995 ---------- */

const TIMELINE = [
  { year: '1995', title: 'One manual line in Ghazieh', text: 'Solino starts as a small potato chips maker in Ghazieh, South Lebanon, with a single, hand-operated line.', img: '/photos/line-1.webp' },
  { year: 'The 2000s', title: 'Ringo in every school bag', text: 'Peanut, Barby, Crinkles, Cheese Cocktail and friends become the soundtrack of recess across Lebanon.', img: '/photos/line-2.webp' },
  { year: 'Today', title: 'A full factory by Babilia Bridge', text: 'On the Saida–Tyr highway, Solino makes Ringo, Van Marcke, Lora and Snacks, and ships them across Lebanon.', img: '/photos/factory.webp' },
];

export function Since1995() {
  return (
    <section id="since-1995" className="section since">
      <div className="wrap">
        <p className="kicker">Made in South Lebanon</p>
        <h2>Since 1995</h2>
        <p className="lede">"The most successful potato chips trademark in the history of Lebanon", as Solino puts it, started with one line and a lot of salt.</p>
        <ol className="timeline">
          {TIMELINE.map((t) => (
            <li key={t.year}>
              <img src={t.img} alt="" loading="lazy" width={720} height={450} />
              <div>
                <span className="year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Pick your mascot ---------- */

export function Lineup({ onPick }: { onPick: (id: string) => void }) {
  return (
    <section id="lineup" className="section lineup">
      <div className="wrap">
        <p className="kicker">The whole gang</p>
        <h2>Pick your bag</h2>
        <div className="lineup-grid">
          {PRODUCTS.map((p) => (
            <button key={p.id} type="button" className="card" style={{ ['--c0' as string]: p.tones[0], ['--c1' as string]: p.tones[1], ['--c2' as string]: p.tones[2] }} onClick={() => onPick(p.id)}>
              <img src={small(p.pack)} alt="" loading="lazy" width={240} height={300} />
              <span className="card-name">{p.name}</span>
              <span className="card-flavour">{p.flavour}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Find Ringo ---------- */

export function WhereToBuy() {
  const cards = [
    { title: RINGO.instagram, note: 'Ringo on Instagram: new flavours, offers and DMs', href: RINGO.instagramUrl, cta: 'Open Instagram' },
    { title: 'Ringo on Google Maps', note: RINGO.address, href: RINGO.mapsUrl, cta: 'Get directions' },
  ];
  return (
    <section id="buy" className="section buy">
      <div className="wrap">
        <p className="kicker">Straight from Ringo</p>
        <h2>Find Ringo</h2>
        <p className="lede">This is a concept, so nothing is sold on this page. To order, or to find the nearest shop that stocks Ringo, talk to Ringo directly.</p>
        <div className="shops">
          {cards.map((c) => (
            <a key={c.title} className="shop" href={c.href} target="_blank" rel="noreferrer">
              <strong>{c.title}</strong><span>{c.note}</span><em>{c.cta} ↗</em>
            </a>
          ))}
        </div>
        <p className="contact-line">{RINGO.company} · {RINGO.address} · <a href={RINGO.website} target="_blank" rel="noreferrer">solinogroup.com</a></p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <img src="/brand/ringo-logo.webp" alt="Ringo" width="132" height="56" loading="lazy" />
        <p><strong>Unofficial concept.</strong> Not affiliated with Ringo or Solino Limited Corporation S.A.R.L. Trademarks, mascots and pack photos belong to their owners.</p>
        <details>
          <summary>Credits</summary>
          <ul>
            <li>Pack photos: Ringo's packs as published online and on <a href={SITE.instagramUrl} target="_blank" rel="noreferrer">@ringochips.lb</a>.</li>
            <li>Factory photos and logo: <a href={SITE.solinoUrl} target="_blank" rel="noreferrer">solinogroup.com</a>.</li>
            <li>Mascots, food and snacks: redrawn by hand for this concept, after the characters on Ringo's packs.</li>
          </ul>
        </details>
        <p className="by">Designed &amp; built by <a href={SITE.linkedinUrl} target="_blank" rel="noreferrer">{SITE.author}</a> · <a href={SITE.githubUrl} target="_blank" rel="noreferrer">Source</a></p>
      </div>
    </footer>
  );
}
