import { chromium } from 'playwright';
const b = await chromium.launch();

const desk = await b.newPage();
await desk.setViewportSize({ width: 1440, height: 900 });
await desk.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 20000 });
await desk.evaluate(() => document.getElementById('history')?.scrollIntoView());
await desk.waitForTimeout(800);
await desk.screenshot({ path: 'final-desk.png' });

const mob = await b.newPage();
await mob.setViewportSize({ width: 390, height: 844 });
await mob.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 20000 });
const top = await mob.evaluate(() => {
  const el = document.getElementById('history');
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
});
await mob.evaluate((y) => window.scrollTo(0, y), top);
await mob.waitForTimeout(700);
await mob.screenshot({ path: 'final-mob.png' });
await mob.evaluate((y) => window.scrollTo(0, y + 600), top);
await mob.waitForTimeout(400);
await mob.screenshot({ path: 'final-mob2.png' });

console.log('Done');
await b.close();
