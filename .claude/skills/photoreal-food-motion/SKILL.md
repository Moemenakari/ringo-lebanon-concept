---
name: photoreal-food-motion
description: Use when building a food, snack or drink product hero or landing page that must look real. Covers photoreal cut-outs, floating ingredients, scroll-scrubbed image sequences (pours, explosions, assembling layers), 3D product models and a per-flavour colour world. Use it instead of drawing food with SVG, CSS shapes, emoji or primitive 3D meshes.
---

# Photoreal food motion

The rule that matters most: **the product and its ingredients must be real photographs, real video frames, or real 3D renders.** Never draw food with SVG, CSS shapes, emoji or low-poly primitives. On the Indomie concept the packs were real photos, but the background food was drawn, and people called it fake. The motion can be clever; the pixels must be real.

## 1. Asset ladder (take the highest rung available)

1. **Brand-owned photos.** Use the official site, retailer product pages and the brand's Instagram. These are what the user expects to see. Credit them in the footer.
2. **Licensed stock photos** (Unsplash, Pexels or Pixabay; check each licence) for loose ingredients: chillies, cheese, tomatoes, salt, splashes, crumbs. Search "isolated on white", "top view" and "macro".
3. **AI image or video** only for ingredients, splashes, pours and environments. **Never generate the pack or logo.** Products must stay exactly real. AI video (Veo, Kling, Runway and similar) suits pours, crunch bursts and chips flying out of a bag. Export MP4, then turn it into frames (section 3).
4. **3D renders** are for when the product must rotate. Use a GLB with real label textures; see `references/patterns.md#3d-product`.

Ask the user for photos you can't reach. Instagram can't be scraped, so ask them for screenshots or saved images.

## 2. Cut-outs that don't look pasted

- Remove the background: `node scripts/cutout.mjs <in> <out.webp>` handles white studio shots with a flood fill and a soft edge. For busy backgrounds, use `rembg` (`pip install rembg`, then `python -I -m rembg i in.jpg out.png`).
- Check every cut-out against a **dark and a coloured** background. A white halo means you raise the tolerance or erode one pixel.
- Export WebP with alpha at **2× display size**: about 600 px wide for a 300 px slot, and about 200 KB at most for the hero image.
- To ground a product: add a soft contact shadow (a blurred ellipse at 25 % opacity), one light direction across the whole scene, and a slight rim light (`drop-shadow(0 0 30px rgba(255,255,255,.5))`).
- Floating ingredients sit on 3 depth layers. **Far** gets `blur(3px)` at 70 % scale. **Mid** is sharp. **Near** gets `blur(2px)` at 130 % scale and passes in front of the product. This depth of field is what sells "real".

## 3. Hero patterns (from the user's reference reels)

| Pattern | When | How |
|---|---|---|
| **Flavour wheel + ingredient orbit** (the spinning croissant reel) | Several flavours of one product | Each flavour is a cut-out plus 4–6 ingredient cut-outs on a full-bleed solid colour. Rotate the wheel; ingredients fly in and out with spring physics. |
| **Scroll-scrubbed sequence** (the coffee reels) | A pour, an explosion, a pack opening | Turn a video into 90–150 WebP frames and draw them on `<canvas>` by scroll progress. Code in `references/patterns.md#sequence`. |
| **Exploded layers** (the burger reel) | Anything with parts: a bag, chips, seasoning | Use separate cut-outs per layer; on scroll, translate Y with a stagger, then reassemble. |
| **3D product** (the Oreo can reel) | Cans, tubs, bags that rotate | R3F with `useGLTF`, `Environment`, `ContactShadows` and `Float`, and scroll-driven rotation. |
| **Liquid / video with alpha** | Pours, sauce, smoke | WebM VP9 with alpha, plus HEVC with alpha for Safari, or the sequence approach. |

Make video frames with:
`ffmpeg -i pour.mp4 -vf "fps=30,scale=1280:-2" -c:v libwebp -quality 78 frames/f_%03d.webp`
On phones, use every second frame at 720 px wide.

## 4. Colour world per flavour

Each flavour gets a **dominant colour sampled from its own pack**, plus a darker and a lighter tone. Never use one flat colour. Cross-fade the whole page (CSS variables) when the flavour changes. Type stays neutral (cream or near-black) so the product colour wins.

## 5. Budgets and checks

- Preload the hero image (`<link rel="preload" as="image" fetchpriority="high">`). Lazy-load sequences after `load`/idle. Phones load 3D only after the first touch or scroll.
- With `prefers-reduced-motion`, show a static poster frame.
- Lighthouse targets: mobile performance ≥ 85, everything else 100.
- Add `?demo=1` auto-play so the user can screen-record smoothly.
- Before showing the user: one 400 px and one 1440 px screenshot of the hero, checked for halos, mismatched lighting and anything that looks drawn.
