# Ringo Lebanon: homepage concept spec

Unofficial concept by Moemen Akkari. Same engine as the Indomie Lebanon concept (wheel of packs,
a per-product colour world, a real-photo pipeline, a disclaimer, "Order" links to real retailers),
rebuilt around one idea: **Ringo is the snack of every Lebanese childhood.**

## Theme
"ملك الطفولة" / *The taste of every recess since 1995.* Kids' range only: the classic 20–25 g packs
with the mascots. No potato chips range, no Van Marcke.

## The kids' range (from Moemen's screenshots; final count TBD, maybe 10–15)
Each pack is its own world: wallpaper from the pack colours, real ingredients floating on 3 depth
layers, and the mascot (cut out from the real pack art) doing one interactive thing.

| Pack | World | Real things floating | Mascot moment |
|---|---|---|---|
| **Peanut** (purple, the king) | Purple + green rings, a crown | real peanuts, shells | Crowned "ملك الطفولة". The boxer punches the peanut bag when you click. |
| **Barby** (blue rings) | Sea, waves, bubbles | real ring puffs | The shark follows your cursor or finger and snaps up rings that pop in and fade. |
| **Crinkles** (orange) | Beach, palm, sunset | real crinkle puffs | The blue creature lounges; the palm sways with the mouse. |
| **Salt & Vinegar** (green) | Jungle | salt crystals, vinegar drops | The tiger's eyes follow you and it pounces when you hover. |
| **Cheese Cocktail** (yellow) | Swamp, cheese | cheese, mixed shapes | The crocodile's jaws snap as you scroll. |
| **Chilli** (black + red) | Fire, embers | real chillies, flames | The pack heats up and embers rise. |
| **Popcorn** (yellow + navy) | Corn field, sun | real corn, popcorn | Kernels pop on click. |
| **Cheese Balls** (orange + blue cat) | Orange | real cheese balls | The cat bats the balls around. |
| **Ketchup** (red, the boy) | Red, tomatoes | real tomatoes, ketchup | TBD |
| **Sweet Corn** (green stripes) | Green + yellow | real corn | TBD |

Mascots and packs come only from the real pack photos (never redrawn). Food is real photos only.

## Real lines from Ringo's own posts (for copy)
- "ملك الطفولة بلا منازع… رينغو فستق" (story, 29 May 2025)
- "السناك المفضل!" · "اشتري لبناني" · "Made in Lebanon" · "We deliver the taste"
- "Back to school" · "Study time better with Ringo" · "Only gamers will understand" · "Recess calls"
- Solino Limited Corporation S.A.R.L., Saida–Tyr new highway, near Babilia Bridge. Customer care 07/420655.

## Sections
1. **Hero:** the pack wheel (as in Indomie), with the per-pack world and its mascot interaction.
2. **The King:** the Peanut pack under a crown, with real peanuts raining down on scroll.
3. **Recess:** a school-bag scene that opens on scroll and spills out real packs (the scroll moment).
4. **Since 1995:** one manual line in Ghazieh, then today. Made in South Lebanon.
5. **Pick your mascot:** a grid of every pack. Hover and the mascot does its move.
6. **Where to buy:** real retailers. No checkout.
7. **Footer:** credits, the disclaimer modal and the "Unofficial concept · Moemen Akkari" badge.

## Assets
- The sandbox can't reach solinogroup.com or the retailers. A GitHub Action (`workflow_dispatch`)
  downloads the pack photos, cuts them out and commits WebP files.
- Moemen's screenshots fill the gaps: logo, campaign look, and packs no retailer has.
- Careful: "Ringo" is also a Jordanian brand (Petra Food) and a UK brand (Golden Wonder Ringos). Use only Solino's.

## Stack and repo
Vite + React + TS strict, Framer Motion, Vitest, a Playwright smoke test, Fontsource and Vercel.
One branch, `main`. Commits as Moemen Akkari. No AI tooling files in the repo.
