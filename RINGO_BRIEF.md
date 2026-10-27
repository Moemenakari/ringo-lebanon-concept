# Ringo Lebanon: homepage concept brief

The owner is Moemen Akkari. This is an unofficial concept for LinkedIn and the portfolio, following the Indomie Lebanon concept. Read the skills in `.claude/skills/` first, especially `lean-session`, `brand-concept-site`, `photoreal-food-motion` and `frontend-design`. **Confirm the plan with Moemen before coding.**

## Why this one is different from Indomie
Feedback on Indomie: the packs were real, but the background food was drawn, and that looked fake. **Here everything visible must be real:** pack photos, puffs, chips, ketchup, peanuts, cheese and paprika, as photos, video frames or 3D renders. Moemen's reference reels show the bar:
1. A coffee site with floating beans and pours (photoreal cut-outs, scroll transitions).
2. A spinning croissant slider: each flavour on its own colour with real ingredients flying around.
3. A coffee pour that becomes a cup (scroll-scrubbed video frames).
4. A burger exploding into layers, and a rotating 3D can.

## Verified facts (with sources)
- Ringo is made by **SOLINO** (Solino Limited Corporation SARL). It was founded in **1995** as a small potato chips maker in **Ghazieh, South Lebanon**, starting with one manually operated line. Solino calls Ringo "the most successful potato chips trademark in the history of Lebanon". Source: solinogroup.com, via search results.
- Solino brands: **RINGO** (pellet and buffet potato chips), **VAN MARCKE** (fresh potato chips), **LORA** (croissants and cakes), **SNACKS** (pellets). Source: solinogroup.com.
- The Instagram account **@ringochips.lb** (about 6.3k followers, 573 posts) says: "Since 1995 · Crafting Lebanon's crunchiest chips · Distributed across Lebanon". Location: near Babilia Bridge, Saida. Its link is solinogroup.com. Source: Moemen's screenshot.
- Unlike Indomie, Ringo **is genuinely Lebanese-made**, so "Lebanese industry" and "made in South Lebanon since 1995" are true. Still say "unofficial concept".

## Products seen so far (confirm the full range on solinogroup.com or retailers)
From Moemen's Instagram screenshot and search results:
- **Snacky Puffs** (Ringo): Ketchup Fingers, Peanut Fingers, Pizza Rings, Paprika Rings
- **Ringo Cheese Balls**
- **Ringo Potato Chips** ("World of Potato Chips"): Chilli, Salt & Vinegar, Cheese, Popcorn flavour, Peanut flavour
- **Ringo Sticks**
- Sister brand **Van Marcke**: French Cheese, Ketchup, Salt & Vinegar

Not verified: exact pack sizes and prices. Get them from retailers.

## Where to get real images

| Source | What | How |
|---|---|---|
| **solinogroup.com** (official) | Logos, product shots | This sandbox can't reach it, so add a GitHub Action (`workflow_dispatch`) that downloads, cuts out and commits WebP files, as the Indomie repo did for SFS |
| **@ringochips.lb** on Instagram | Campaign look, lifestyle shots, highlights (Ringo Sticks, New, Vanmarcke) | Moemen saves screenshots or images and uploads them |
| Facebook **SolinoGroup**, X **@solinogroup** | Older pack shots | Moemen screenshots them |
| Retailers: **tripolimarket.com**, **chtouraroyal.com**, **amazon.com** ("Lebanese Ringo Chips…"), **etsy.com** (Ringo cocktail chips) | Product photos, names, sizes, prices | Fetch them in the same GitHub Action |
| **Open Food Facts** (Van Marcke French Cheese 5283010008999) | Pack photos, CC BY-SA licence | Credit them in the footer |
| Pexels / Unsplash | Real ingredients: tomatoes, ketchup splash, peanuts, cheese, paprika, chilli | Check each licence and cut them out with `cutout.mjs` |
| AI video (Veo, Kling or Runway) | A bag tearing open and puffs bursting out, a ketchup splash | Ingredients and motion only, **never the pack or logo**. Turn it into frames with `video-to-frames.sh` |

## Concept starting point (for Moemen to approve)
- **Theme:** "The crunch we grew up with, made in South Lebanon since 1995." Nostalgia: school break, recess, gaming nights (their own posts use these).
- **Hero:** a flavour wheel in the style of the croissant reel. The real pack sits in the centre on a full-bleed colour taken from the pack: red (Ketchup Fingers), green and yellow (Peanut), purple (Pizza Rings), blue (Paprika), orange (Cheese Balls). Real ingredients orbit the pack in 3 depth layers, and the colour cross-fades on switch.
- **Format switch** (like Indomie's pill): Puffs / Chips / Sticks.
- **Scroll moment:** a bag tears open and puffs burst toward the camera (an AI video turned into frames), or an exploded bag.
- **Sections:** Since 1995 timeline (one manual line in Ghazieh, then today) · Flavours grid · Moments (study, gaming, road trip, from their posts) · Where to buy · Footer credits.
- Brand: the real Ringo logo, Ringo red and pink (from the Instagram avatar), and a bold condensed display typeface. Use the `frontend-design` skill for a distinctive direction.

## Questions to ask Moemen in the first message (recommended answers)
1. Which range is the hero? *Snacky Puffs, since they're the most nostalgic and colourful.*
2. Include Van Marcke as a "family" section? *Yes, small.*
3. Can he upload 10–20 screenshots from @ringochips.lb today? *Needed for the logo and campaign look.*
4. AI video for the bag-burst moment: who generates it? *Moemen, with the tool he has. Claude writes the prompt.*
5. Repo name: *`ringo-lebanon-concept`, `main` only, Vercel from `main`.*

Sources: [solinogroup.com](https://solinogroup.com/) · [Instagram @ringochips.lb](https://www.instagram.com/ringochips.lb/) · [X @solinogroup](https://twitter.com/solinogroup) · [Facebook SolinoGroup](https://www.facebook.com/SolinoGroup/photos/a.410129882351010/2037027429661239/?type=3) · [Amazon: Ringo Popcorn 5×22g](https://www.amazon.com/Lebanese-Ringo-Chips-Popcorn-Flavor/dp/B0DYK73XYM) · [Amazon: Ringo Peanut 5×22g](https://www.amazon.com/Lebanese-Ringo-Chips-Peanut-Flavor/dp/B0DYK37P97) · [Etsy: Ringo chips](https://etsy.com/listing/929913940/lebanese-ringo-cocktail-potato-chips) · [Chtoura Royal: Ringo Salt & Vinegar](https://chtouraroyal.com/product/ringo-chips-salt-and-vinegar-lebanon-4020g/) · [Tripoli Market: Ringo Cheese 14g](https://tripolimarket.com/product/ringo14g-7/) · [Open Food Facts: Van Marcke French Cheese](https://world.openfoodfacts.org/product/5283010008999/van-marcke-chips-french-cheese) · [Ringo Chips Factory (Megaprefab)](https://megaprefab.com/projects/ringo-chips-factory/)
