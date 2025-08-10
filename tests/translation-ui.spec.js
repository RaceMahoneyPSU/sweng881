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

  // Wait for translation output
  const result = page.locator('#textarea2[readonly]');
  await expect(result).toHaveValue (/Hola mundo/i, { timeout: 15000 });
});
