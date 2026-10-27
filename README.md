# Ringo Lebanon: a homepage concept

Every Lebanese kid had a Ringo in their school bag. Mine was the purple one with the boxer on it. So for my second brand concept, after Indomie, I built the homepage I'd pitch to the snack that ran our recess.

> This is an unofficial concept, a personal project. It isn't affiliated with Ringo or Solino Limited Corporation S.A.R.L.

## The idea

Ringo has been made in Ghazieh, South Lebanon, since 1995, and every pack has its own character: a boxer, a shark, a tiger, a crocodile, a blue cat, a turtle, a kid who never stops dancing. On this page each pack gets its own world, and its mascot comes out of the bag and does its thing.

The rule I set myself after the Indomie concept: **everything you see is real.** Pack photos are the real packs, the mascots are cut from the real pack art, and every peanut, corn cob, salt crystal and piece of cheese floating in the background is a real photo, not a drawing.

| Pack | World | The mascot |
|---|---|---|
| Peanut (the king, with a crown) | Purple and green rings, from the pack | The boxer works the punch bag. Tap it and peanuts fly out. |
| Barby | The sea | The shark follows your mouse or finger and eats the rings that pop up. |
| Crinkles | A sunset beach | The blue cat lounges on a sea of chips while the palm sways towards you. |
| Salt & Vinegar | Jungle stripes | Point near a chip and the tiger pounces on it and cracks it in two. |
| Cheese Cocktail | A cheesy swamp | The crocodile runs the length of the screen eating everything in its path. |
| Popcorn | A sunburst | The corn keeps popping; tap it for a handful. |
| Chilli | Fire | Hover the bag and it heats up. |
| Ketchup Fingers | Red confetti | The kid dances; tap him and he spins. |
| Paprika Rings | Bubbles | A turtle and a fish cross the sea; click the water and bubbles rise. |

## What you can do on the page

- **Spin the wheel.** Packs sit on a circle. Swipe, tap a neighbour or use ← →, and the next pack rolls into the centre.
- **Follow the road sign.** A blue Lebanese direction sign, except every exit is a flavour. Tap one and the wheel drives there.
- **"Why are you so quiet? What's on your mind?"** Ringo posted this as a story. I turned it into a three-tap game: the head works out which Ringo you're thinking about.
- **Buy Lebanese.** Their own *اشتري لبناني* campaign, with the back-to-school girl and every pack orbiting her.
- **Since 1995.** One manual line in Ghazieh to a full factory by Babilia Bridge, with Solino's own photos.
- **Where to buy.** Real shops that list Ringo. There is no fake checkout.

## How it's built

- **React 18 + TypeScript (strict) + Vite**, with **Framer Motion** for the wheel springs and the mascot acts.
- **The carousel maths lives in one pure module** (`src/lib/ring.ts`), reused from the Indomie concept and unit tested.
- **Each mascot act is a small component** (`src/components/hero/Mascot.tsx`): a spring that chases the pointer, a hit test in an animation frame loop, real ingredient photos that burst out on an arc.
- **Real photos, collected by a GitHub Action.** `Find photos` pulls the pack photos from Lebanese grocery sites and solinogroup.com, and searches Wikimedia Commons and Openverse for licensed ingredient photos. `Cut out` removes the backgrounds with `rembg` and commits WebP files. Every ingredient photo is credited in the footer.
- **Mascots cut with GrabCut.** Background-removal models can't separate a cartoon from busy pack art, so each mascot has a rough outline in `scripts/mascots.json` and OpenCV's GrabCut snaps it to the real edges.
- **Ingredients float in three depth layers** (far is small and soft, near is big and blurred and passes in front), laid out by a seeded random so every pack looks the same on every visit.
- **The game is a pure scoring function** (`src/lib/mind.ts`) with a test that proves every pack can be the answer.
- **Accessibility.** The wheel, sign and game work with the keyboard, the mascots calm down with *reduce motion*, and focus rings are visible.

### Tests

```bash
npm test                         # Vitest: ring maths, catalogue, game scoring, every image exists
npm run build && npm run e2e     # Playwright smoke test at 400×860 and 1440×900
```

## Run it

```bash
npm install
npm run dev
```

To refresh the photos, run **Find photos** and then **Cut out** from the Actions tab. To re-cut the mascots: `pip install opencv-python-headless pillow numpy && python scripts/mascots.py`.

## Credits

- Pack photos: [Crescent Market](https://crescentmarket.shop/search?q=ringo), and screenshots of [@ringochips.lb](https://www.instagram.com/ringochips.lb/) and Top Trade listings.
- Logo, factory and production photos: [solinogroup.com](https://solinogroup.com/).
- Ingredient photos: Wikimedia Commons and Openverse contributors, each credited on the page with its licence.
- Ringo and its mascots are trademarks of Solino Limited Corporation S.A.R.L.

---

Designed and built by **Moemen Akkari**, a front-end and full-stack developer in Tripoli, Lebanon.
Open to work. Let's talk on [LinkedIn](https://www.linkedin.com/in/moemen-akari-1b94811b5/).
