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
  // Try multiple possible selectors for output area
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

test('Neg_Fun_0026 - Missing vowels', async ({ page }) => {
  await openTranslator(page);
  
  await page.fill('textarea', 'mama ghra ynva');
  await page.waitForTimeout(1500);
  
  const output = await getOutputText(page);
  console.log('Neg_Fun_0026 Output:', output);
  
  expect(output).toBeTruthy();
  
  if (output.includes('ගධර') || output.includes('ghra') || output.includes('ynva')) {
    console.log('Test shows expected failure behavior');
  }
});

test('Neg_Fun_0027 - Unsupported slang', async ({ page }) => {
  await openTranslator(page);
  
  await page.fill('textarea', 'ado bn ela');
  await page.waitForTimeout(1500);
  
  const output = await getOutputText(page);
  console.log('Neg_Fun_0027 Output:', output);
  
  expect(output).toBeTruthy();
  

  if (output.includes('bn') || !output.match(/[අ-෴]{2,}/)) {
    console.log('Test shows expected failure behavior - unsupported slang not converted');
  }
});

test('Neg_Fun_0028 - Mixed errors + joined words', async ({ page }) => {
  await openTranslator(page);
  
  await page.fill('textarea', 'mamagedharayanavaa api heta office ynna hadanne traffic hndaa nisa');
  await page.waitForTimeout(1500);
  
  const output = await getOutputText(page);
  console.log('Neg_Fun_0028 Output:', output);
  
  expect(output).toBeTruthy();
  
  if (output.includes('මමගෙදරයනවා') || output.includes('හ්න්ඩා') || output.includes('හඩන්නෙ')) {
    console.log('Test shows expected failure behavior - joined words not properly segmented');
  }
});

test('Neg_Fun_0029 - Broken grammar order', async ({ page }) => {
  await openTranslator(page);
  
  await page.fill('textarea', 'mama yanavaa api passe kathaa karamu office eka langa');
  await page.waitForTimeout(1500);
  
  const output = await getOutputText(page);
  console.log('Neg_Fun_0029 Output:', output);
  
  expect(output).toBeTruthy();
  
  if (!output.includes('.') && output.length > 20) {
    console.log('Test shows expected failure behavior - no proper sentence boundaries');
  }
});

test('Neg_Fun_0030 - Excessive repetition', async ({ page }) => {
  await openTranslator(page);
  
  await page.fill('textarea', 'hari hari hari hari hari hari hari hari hari');
  await page.waitForTimeout(1500);
  
  const output = await getOutputText(page);
  console.log('Neg_Fun_0030 Output:', output);
  
  expect(output).toBeTruthy();
  
  const hariCount = (output.match(/හරි/g) || []).length;
  if (hariCount > 3) {
    console.log(`Test shows expected failure behavior - excessive repetition (${hariCount} times)`);
  }
});

test('Neg_Fun_0031 - Formatting issues', async ({ page }) => {
  await openTranslator(page);
  
  await page.fill('textarea', 'mama     gedhara\nyanavaa     api\nheta');
  await page.waitForTimeout(1500);
  
  const output = await getOutputText(page);
  console.log('Neg_Fun_0031 Output:', output);
  
  
  expect(output).toBeTruthy();
  
  // Check if output contains multiple spaces or line breaks
  if (output.includes('    ') || output.includes('\n')) {
    console.log('Test shows expected failure behavior - formatting issues not normalized');
  }
});

