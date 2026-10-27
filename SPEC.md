# Ringo Lebanon: concept spec (draft, waiting for Moemen's OK)

Unofficial homepage concept. Facts and sources are in `RINGO_BRIEF.md`.

## Products (hero = Snacky Puffs)
| Product | Colour world (to be sampled from the real pack) | Orbiting ingredients (real cut-outs) |
|---|---|---|
| Ketchup Fingers | red | tomatoes, ketchup splash, puffs |
| Peanut Fingers | green + yellow | peanuts, shells, puffs |
| Pizza Rings | purple | cheese, oregano, tomato, rings |
| Paprika Rings | blue | paprika powder, red pepper, rings |
| Cheese Balls | orange | cheese cubes, cheese balls |

Format pill: Puffs / Chips / Sticks. Chips: Chilli, Salt & Vinegar, Cheese, Popcorn, Peanut.
Sizes and prices: TBD from retailers (Tripoli Market, Chtoura Royal, Amazon). Never invented.

## Sections
1. Hero: flavour wheel, real pack in the centre, ingredients on 3 depth layers, page colour cross-fades.
2. Scroll moment: bag tears open and puffs burst toward the camera (AI video → WebP frames on canvas).
3. Since 1995: one manual line in Ghazieh → today's factory.
4. Flavours grid (all ranges).
5. Moments: school break, gaming night, road trip (from @ringochips.lb posts).
6. Van Marcke "family" strip (small).
7. Where to buy: links to real retailers. No checkout.
8. Footer credits + disclaimer modal + "Unofficial concept · Moemen Akkari" badge.

## Assets
- Sandbox can't reach solinogroup.com, retailers, Open Food Facts, Pexels or Unsplash (all time out).
  → GitHub Action (`workflow_dispatch`) `fetch-assets.yml`: download → cut out → WebP → commit.
- Logo + campaign look: Moemen's Instagram screenshots.
- AI video: ingredients and motion only, never the pack or logo.

## Stack
Vite + React + TS strict, Vitest + Playwright smoke (400×860, 1440×900), Fontsource, Vercel from `main`.
