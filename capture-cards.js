const puppeteer = require('puppeteer');

async function capture() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });

  await page.goto('http://localhost:8080/eid-cards.html', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));

  const cards = [
    { id: 'card-ar',    file: 'assets/eid-card-arabic.png'  },
    { id: 'card-en',    file: 'assets/eid-card-english.png' },
    { id: 'card-mixed', file: 'assets/eid-card-mixed.png'   },
  ];

  for (const { id, file } of cards) {
    const el = await page.$(`#${id}`);
    const box = await el.boundingBox();
    await page.screenshot({
      path: file,
      clip: { x: box.x, y: box.y, width: box.width, height: box.height }
    });
    console.log(`✓ ${file}`);
  }

  await browser.close();
}

capture().catch(e => { console.error(e); process.exit(1); });
