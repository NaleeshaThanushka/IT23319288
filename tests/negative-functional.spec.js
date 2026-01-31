const { test, expect } = require('@playwright/test');

// Run tests more safely for WebKit
test.describe.configure({ mode: 'serial' });

async function openTranslator(page) {
  await page.goto('https://www.swifttranslator.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await page.waitForSelector('textarea', { timeout: 15000 });
}

// Function to find output element
async function getOutputText(page) {
  const selectors = [
    'textarea[readonly]',
    'textarea:not([placeholder*="Singlish"])',
    '.output',
    '.output-area',
    '.result',
    '.translation-result',
    '#output',
    '[data-testid="output"]',
    'div.output',
    'pre.output'
  ];
  
  for (const selector of selectors) {
    const element = page.locator(selector);
    if (await element.count() > 0) {
      const value = await element.inputValue();
      const text = await element.textContent();
      return value || text || '';
    }
  }
  
  const inputTextarea = page.locator('textarea[placeholder*="Singlish"]');
  if (await inputTextarea.count() > 0) {
    return await inputTextarea.inputValue();
  }
  
  return '';
}



test('Neg_Fun_0028 - Mixed errors + joined words should FAIL', async ({ page }) => {
  await openTranslator(page);
  
  // Bad input - should fail
  await page.fill('textarea', 'mamagedharayanavaa api heta office ynna hadanne traffic hndaa nisa');
  await page.waitForTimeout(2000);
  
  const output = await getOutputText(page);
  console.log('Neg_Fun_0028 Output:', output);
  
  // NEGATIVE TEST: We expect errors in output
  const hasErrors = output.includes('හ්න්ඩා') || // Wrong for 'hndaa'
                   output.includes('හඩන්නෙ') || // Wrong for 'hadanne'
                   output.includes('මමගෙදරයනවා') || // Joined wrong
                   output.includes('ය්න්න'); // Wrong for 'ynna'
  
  // We WANT this to be true (meaning conversion has errors)
  expect(hasErrors).toBeTruthy();
});
