const { test, expect } = require('@playwright/test');

function isEmoji(str) {
  // Basic check for emoji characters (Unicode ranges)
  // Adjust or expand this regex if needed
  return /[\u{1F600}-\u{1F64F}]/u.test(str);
}

test('LibreTranslate UI translates "Hello world" from English to Spanish', async ({ page }) => {

  await page.goto('https://libretranslate.com');

  // Select source language (English)
  await page.locator('select[aria-labelledby="sourceLangLabel"]').selectOption('en');

  // Select target language (Spanish)
  await page.locator('select[aria-labelledby="targetLangLabel"]').selectOption('es');

  await page.type('#textarea1', 'Hello world', { delay: 100 });
  await page.waitForTimeout(500);
  await page.click('button:has-text("Translate")');
  // Poll until we get a non-emoji value matching "Hola mundo"
  await page.waitForFunction(() => {
    const val = document.querySelector('#textarea2')?.value || '';
    // Use regex to check for emoji presence, negate it to wait for real text
    const isEmoji = /[\u{1F600}-\u{1F64F}]/u.test(val);
    return !isEmoji && /Hola mundo/i.test(val);
  }, null, { timeout: 15000 });

  // Assert final value
  const translatedText = await page.locator('#textarea2').inputValue();
  expect(translatedText).toMatch(/Hola mundo/i);
});