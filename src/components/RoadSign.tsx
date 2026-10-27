import { PRODUCTS, type Product } from '../data/products';

/** Road-sign arrow: thick shaft with a wide head, as on Lebanese direction signs. */
const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg className="arrow" viewBox="0 0 40 24" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M2 9h22V2l14 10-14 10v-7H2Z" fill="currentColor" />
  </svg>
);

interface Props {
  current: Product;
  onPick: (id: string) => void;
  compact?: boolean;
}

/** A blue Lebanese direction sign, except every exit is a flavour. Tap one and the wheel drives there. */
export function RoadSign({ current, onPick, compact }: Props) {
  const half = Math.ceil(PRODUCTS.length / 2);
  const boards: [Product[], 'right' | 'left'][] = [[PRODUCTS.slice(0, half), 'right'], [PRODUCTS.slice(half), 'left']];
  return (
    <nav className={`roadsign${compact ? ' compact' : ''}`} aria-label="Flavour road sign">
      <div className="sign-boards">
        {boards.map(([list, dir]) => (
          <div key={dir} className="sign-board">
            {['tl', 'tr', 'bl', 'br'].map((b) => <i key={b} className={`bolt ${b}`} aria-hidden="true" />)}
            {list.map((p) => {
              const on = p.id === current.id;
              return (
                <button key={p.id} type="button" className={`sign-row ${dir}${on ? ' on' : ''}`} onClick={() => onPick(p.id)} aria-pressed={on}>
                  {dir === 'left' && <Arrow flip />}
                  <span className="name">{p.sign}</span>
                  {dir === 'right' && <Arrow />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <span className="sign-pole" aria-hidden="true"><i className="clamp c1" /><i className="clamp c2" /></span>
    </nav>
  );
}
