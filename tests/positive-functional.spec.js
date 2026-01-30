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

async function verifySinhalaOutput(page) {
  await expect(page.locator('body')).toContainText(/[අ-෴]/, {
    timeout: 10000,
  });
}

test('Pos_Fun_0001 - Travel Plan Statement Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'api Kandy yanavaa');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0002 - Arrival Inquiry Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'oya kavadhdha enna hithan inne?');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0003 - Polite request', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'mata udhavvak karanna puLuvandha?');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0004 - Conditional Observation Statement Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'oya enavaanam mama balan innavaa');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0005 - Compound sentence', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'api kaeema kanna yanavaa saha passe chithrapatayak balanavaa');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0006 - Future tense', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'mama heta enavaa');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0007 - Negative form', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'mama ehema karanne naehae');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0008 - Imperative command', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'mata kiyanna');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0009 - Present tense', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'mama dhaen vaeda karanavaa');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0010 - Past tense', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'mama iyee gedhara giyaa');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0011 - Email / Telegram Request Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Machan, ara report eke final copy eka email ekak danna puluwanda? Heta udeta kalin dapan, mata meeting ekata kalin eka kiyawanna ona. Email karanna bari nam Telegram ekata hari dapan. Thanks!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0012 - Event Location Email / WhatsApp Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Macho, heta thiyena event eke location eka mata email ekakin ewannako. 10am wenna kalin ewanna, ethakota mata route eka balaganna puluwan. Email barinam WhatsApp location ekak dapan. Jaya!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0013 - Invoice Email', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Aiye, ara giya mase invoice eka poddak email karanawada? Thawa paya dekayi thiyenne office eka wahanna, eeta kalin danna. Email eka awul nam WhatsApp photo ekak hari dapan. Thx');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0014 - Presentation Slides Email', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Machan, ada presentation ekata hadapu slides tika email karapan puluwannam. Mata 1pm wenakota ona, poddak edit karanna thiyenawa. Email bari nam drive link ekak WhatsApp dapan. Elakiri!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0015 - Design Updates Email', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Macho, ara design eke updates tika email ekak vidihata ewanna puluwanda? Mata gedara yanna kalin eka finalize karanna ona. Email barinam screen shots thun hatharak WhatsApp dapan. Thanks machan!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0016 - Design Updates Email', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Machan, me mase schedule eka mata email karannako. Ada re 8 wenna kalin ewanna, mata plan karaganna ona. Email danna amarunam WhatsApp message ekak dapan. Thx!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0017 - Tutorial Link Email', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Ado, ara kiyapu tutorial eke link eka mata email karapan. Office yanna kalin download karanna ona. Email karanna bari nam Messenger ekata hari dapan. Jaya!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0018 - Meeting Attendees List Email', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Machan, meeting ekata ena aya ge list eka email ekakin ewanna puluwanda? 5pm wenna kalin dapan, mata print ekak ganna ona. Email barinam names tika WhatsApp karapan. Thanks a lot!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0019 - Send Meeting Attendee List By Email Or WhatsApp', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Machan, meeting ekata ena aya ge list eka email ekakin ewanna puluwanda? 5pm wenna kalin dapan, mata print ekak ganna ona. Email barinam names tika WhatsApp karapan. Thanks a lot!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0020 - Morning Meeting Zoom Link Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Ada 7.30 AM meeting eke Zoom link eka dapan. Email bari nam WhatsApp msg ekak dapan.');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0021 - Holiday Schedule Email Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Macho, 25/12/2025 schedule eka email ekakin ewannako. Thawa payakin wage ona. Thx!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0022 - Parcel Details Email Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Ara 5kg parcel eke details tika email karannako. Kalin kiyanna bari una, ethakota lesiyi. Jaya!');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0023 - Bill Email Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', 'Rs. 5343 bill eka email dapan.');
  await verifySinhalaOutput(page);
});

test('Pos_Fun_0024 - Morning Call Request Test', async ({ page }) => {
  await openTranslator(page);
  await page.fill('textarea', '7.30 AM ekata mata katha karapan');
  await verifySinhalaOutput(page);
});

