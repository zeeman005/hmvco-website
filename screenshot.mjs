import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto('http://127.0.0.1:8080', { waitUntil: 'networkidle2', timeout: 15000 });

// Wait for preloader to finish
await new Promise(r => setTimeout(r, 2500));

// Hero screenshot
await page.screenshot({ path: 'screenshot_hero.png', fullPage: false });

// Scroll to products
await page.evaluate(() => window.scrollTo(0, document.querySelector('#products').offsetTop - 80));
await new Promise(r => setTimeout(r, 900));
await page.screenshot({ path: 'screenshot_products.png', fullPage: false });

// Scroll to culture
await page.evaluate(() => window.scrollTo(0, document.querySelector('#culture').offsetTop));
await new Promise(r => setTimeout(r, 900));
await page.screenshot({ path: 'screenshot_culture.png', fullPage: false });

// Full page
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: 'screenshot_full.png', fullPage: true });

await browser.close();
console.log('Screenshots saved.');
