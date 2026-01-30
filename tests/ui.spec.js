const { test, expect } = require('@playwright/test');

async function openTranslator(page) {
  await page.goto('https://www.swifttranslator.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await page.waitForSelector('textarea', { timeout: 15000 });
}

async function verifySinhalaOutput(page) {
  await expect(page.locator('body')).toContainText(/[අ-෴]/, {
    timeout: 10000,
  });
}

test('Pos_UI_0025 - Sinhala output updates automatically in real-time', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'man gedhara yanavaa');
  await verifySinhalaOutput(page);
});