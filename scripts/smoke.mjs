// Smoke test + screenshots at phone and desktop sizes. Usage: npm run build && npm run e2e
import { createRequire } from 'node:module';
// Uses the machine's Playwright (globally installed) so the repo stays light.
const { chromium } = createRequire(import.meta.url)('playwright');
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const PORT = 4181;
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));
mkdirSync('shots', { recursive: true });

const browser = await chromium.launch();
let failed = 0;
const check = (ok, msg) => { console.log(`${ok ? '✓' : '✗'} ${msg}`); if (!ok) failed++; };
const title = (page) => page.locator('h1').innerText();

for (const [name, viewport] of [['phone', { width: 400, height: 860 }], ['desktop', { width: 1440, height: 900 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: name === 'phone' ? 2 : 1 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('response', (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
  await page.goto(`http://localhost:${PORT}/`);
  await page.waitForTimeout(800);
  check(await page.getByRole('dialog').isVisible(), `${name}: concept modal on first visit`);
  await page.screenshot({ path: `shots/${name}-0-modal.png` });
  await page.getByRole('button', { name: 'I understand, explore the demo' }).click();
  await page.waitForTimeout(1500);
  check(await page.locator('.concept-badge').isVisible(), `${name}: badge visible`);
  check((await title(page)) === 'Peanut', `${name}: opens on the king, Peanut`);
  check(await page.locator('.crown').isVisible(), `${name}: the crown sits on the Peanut pack`);
  await page.screenshot({ path: `shots/${name}-1-peanut.png` });

  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1400);
  check((await title(page)) === 'Barby', `${name}: arrow key rotates the wheel`);
  await page.mouse.move(viewport.width * 0.7, viewport.height * 0.5);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `shots/${name}-2-barby.png` });

  await page.locator('#ring-crinkles').click();
  await page.waitForTimeout(1500);
  check((await title(page)) === 'Crinkles', `${name}: tapping a neighbour rotates to it`);
  await page.screenshot({ path: `shots/${name}-3-crinkles.png` });

  if (name === 'desktop') {
    await page.locator('.roadsign').getByRole('button', { name: 'Popcorn' }).click();
    await page.waitForTimeout(1500);
    check((await title(page)) === 'Popcorn', `${name}: the road sign drives the wheel`);
    await page.screenshot({ path: `shots/${name}-4-popcorn.png` });
  }

  // What's on your mind? Three taps and the head answers.
  await page.locator('#mind').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Gaming night' }).click();
  await page.getByRole('button', { name: 'The crocodile' }).click();
  await page.getByRole('button', { name: 'Cheesy' }).click();
  await page.waitForTimeout(1800);
  check(await page.getByText('Ringo Cheese Cocktail').isVisible(), `${name}: the mind game reads Cheese Cocktail`);
  await page.locator('#mind').screenshot({ path: `shots/${name}-5-mind.png` });

  await page.screenshot({ path: `shots/${name}-6-full.png`, fullPage: true });
  await page.goto(`http://localhost:${PORT}/#/about`);
  await page.waitForTimeout(500);
  check(await page.getByText('We focused on the homepage.').isVisible(), `${name}: other pages show coming soon`);
  check(errors.length === 0, `${name}: no console errors or broken files ${errors.join(' | ')}`);
  await page.close();
}
await browser.close();
server.kill();
process.exit(failed ? 1 : 0);
