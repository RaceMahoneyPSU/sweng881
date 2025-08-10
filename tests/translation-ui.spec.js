const { test, expect } = require('@playwright/test');

test('LibreTranslate UI translates "Hello world" from English to Spanish', async ({ page }) => {
  await page.goto('https://libretranslate.com');

  // Select source language (English)
  await page.locator('select[aria-labelledby="sourceLangLabel"]').selectOption('en');

  // Select target language (Spanish)
  await page.locator('select[aria-labelledby="targetLangLabel"]').selectOption('es');

// Enter text to translate
  await page.fill('#textarea1', 'Hello world');

  // Click Translate
  await page.click('button:has-text("Translate")');

  // Wait for the textarea value to contain "Hola mundo"
  await page.waitForFunction(() => {
    const val = document.querySelector('#textarea2')?.value || '';
    return /Hola mundo/i.test(val);
  }, null, { timeout: 15000 });

  // Now assert the value contains the expected text
  const translatedText = await page.locator('#textarea2').inputValue();
  expect(translatedText).toMatch(/Hola mundo/i);
});
