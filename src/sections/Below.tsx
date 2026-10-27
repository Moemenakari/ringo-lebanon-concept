import { BuyLebanese, Footer, Lineup, MindGame, Since1995, WhereToBuy } from './Sections';

/** Everything under the hero, split into its own chunk. */
export default function Below({ onShow }: { onShow: (id: string) => void }) {
  return (
    <>
      <MindGame onShow={onShow} />
      <BuyLebanese onPick={onShow} />
      <Lineup onPick={onShow} />
      <Since1995 />
      <WhereToBuy />
      <Footer />
    </>
  );
}
