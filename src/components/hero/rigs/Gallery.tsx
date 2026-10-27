import { Boxer } from './Boxer';
import { Cat } from './Cat';
import { Croc } from './Croc';
import { Tiger } from './Tiger';
import { Fish, Turtle } from './Sea';
import { ChilliGuy } from './Chilli';
import { KetchupKid, SchoolGirl } from './Kids';
import { Shark } from './Shark';

/** ?rigs: every drawn mascot on its pack colour, for checking the drawings side by side. */
export function Gallery() {
  const tiles: [string, string, JSX.Element][] = [
    ['Peanut', '#B54FB6', <Boxer flurry={false} onPunch={() => {}} />],
    ['Barby', '#3A9FDB', <Shark chomp={false} />],
    ['Crinkles', '#F7962B', <Cat />],
    ['Salt & Vinegar', '#9CCB3B', <Tiger leaping={false} />],
    ['Cheese Cocktail', '#F8D23A', <Croc />],
    ['Chilli', '#5A1A12', <ChilliGuy />],
    ['Ketchup', '#F0453A', <KetchupKid />],
    ['Paprika turtle', '#33A6E6', <Turtle />],
    ['Paprika fish', '#33A6E6', <Fish />],
    ['Back to school', '#C8262B', <SchoolGirl left="/packs/peanut.webp" right="/packs/popcorn.webp" />],
  ];
  return (
    <main className="gallery">
      {tiles.map(([name, bg, rig]) => (
        <figure key={name} style={{ background: bg }}>
          {rig}
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </main>
  );
}
