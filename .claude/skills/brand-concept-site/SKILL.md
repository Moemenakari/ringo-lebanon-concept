---
name: brand-concept-site
description: Use when building an unofficial homepage concept for a real brand (portfolio or LinkedIn piece), e.g. a Lebanese snack, food or drink brand. Covers research, real assets, the legal disclaimer, repo and git hygiene, deploying to Vercel, Lighthouse, the README and the LinkedIn launch. Lessons from the Indomie Lebanon concept.
---

# Brand concept site playbook

The owner is Moemen Akkari, a front-end and full-stack developer in Tripoli, Lebanon. He talks in Lebanese Arabic, so reply in short Lebanese Arabic. Code and site copy are in English.

## 0. Before any code (one message, then wait)
- Research the brand: official site, retailer pages with product photos and prices, and Instagram. Instagram can't be fetched, so ask Moemen for screenshots. Verify facts before using them. *Example: Indomie is not a Lebanese company. "Made in Lebanon" and "Lebanese company" claims must be checked on the pack or an official source.*
- Write `SPEC.md`: products (real names, sizes, prices, source URLs), the colour world per flavour, sections and asset sources. Ask all open questions **in one batch** with a recommended answer for each.

## 1. Assets: real only
- Product photos come from the brand or retailer. If this sandbox can't reach the host, **add a GitHub Action** (`workflow_dispatch`) that downloads the photos, cuts them out and commits WebP files. That worked for SFS.
- Ingredients and food come from real photos or video (see the `photoreal-food-motion` skill). Never draw food.
- Logo: crop it from the official logo or avatar, remove the background and check it on dark and coloured backgrounds. Use the brand's real colours, sampled from the logo and packs.
- Maps come from real data (Natural Earth through `world-atlas` + `d3-geo`, generated once into a TS file). Never trace a map by hand.

## 2. Legal shield (always ship)
- A **disclaimer modal on every visit**. It comes back 60 s after it's closed, and it also shows in demo mode. Copy: not the official website · UI/UX demo for the Lebanese market · trademarks and photos belong to their owners · **no ordering or payment here**, to buy contact the brand or the retailer (with links) · "Thank you for your understanding" · Designed & built by Moemen Akkari (link to LinkedIn).
- A persistent small badge, "Unofficial concept · Moemen Akkari", linking to LinkedIn.
- Footer credits for every source (retailer, Instagram, map data), and "not affiliated".
- No fake checkout or forms. "Order" opens the real retailer page.
- Don't tag the brand's official page on LinkedIn.

## 3. Repo and git hygiene (Moemen cares a lot)
- First command in a new repo: `git config user.name "Moemen Akkari" && git config user.email "mouemenakkarie3@gmail.com"`.
- **One branch: `main`.** No feature branches or PRs unless he asks. **No `Co-Authored-By` or session trailers** in commits.
- Vercel production branch = `main`, so every push deploys. Set project protection to **standard** (`ssoProtection.deploymentType = "prod_deployment_urls_and_all_previews"`), otherwise the public can't open the `.vercel.app` URL.
- Never `pkill -f <pattern>` where the pattern also appears in your own command line, because it kills your shell. Kill by PID instead.

## 4. Build quality bar
- Vite + React + TS strict. Keep pure logic (carousel maths, theme mapping) in tested modules. Vitest for logic, plus a Playwright smoke test at 400×860 and 1440×900: loads, main interactions, no console errors, badge visible.
- Hash routes: every non-home page shows "We focused on the homepage, coming soon".
- `?demo=1` auto-plays the hero for screen recordings. Keep a recording under 60 s, because the disclaimer comes back after that.
- Performance: self-host fonts (Fontsource, Latin subset), preload the hero image, lazy-load three.js (after idle on desktop, after the first touch on phones), render only the visible carousel slots, and size images at 2× their slot. Targets: mobile ≥ 85, desktop ≥ 95, and 100 for a11y, best practices and SEO. Add `robots.txt`.

## 5. README and launch
- The README is in Moemen's first-person voice: the idea, what you can do, how it's built (real engineering decisions), tests, how to run it, credits, "Open to work" with a LinkedIn link. Don't claim he hand-wrote every line.
- LinkedIn: **one video per post**, so merge the laptop and phone recordings into one. Open with a personal or nostalgic hook, 3–4 feature bullets, the disclaimer line, a call to action (feedback; "Lebanese brands, DM me"), the link in the **first comment**, and hashtags. Post Tue–Thu, 9–11 am Beirut time.
