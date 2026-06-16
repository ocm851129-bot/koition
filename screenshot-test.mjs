import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: 1440, height: 900 });
await p.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 20000 });
await p.screenshot({ path: 'logo-size.png', clip: { x: 0, y: 0, width: 360, height: 80 } });
await b.close();
