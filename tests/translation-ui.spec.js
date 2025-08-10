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

// Wait until the textarea's value matches "Hola mundo" (with timeout)
  await page.waitForFunction(() => {
    const el = document.querySelector('#textarea2[readonly]');
    if (!el) return false;
    const val = el.value.trim();
    console.log('Current translation:', val);
    return /Hola mundo/i.test(val);
  }, null, { timeout: 15000 });

  // Finally assert
  await expect(result).toHaveValue(/Hola mundo/i);
});
