const { test, expect } = require('@playwright/test');

test.describe('LibreTranslate UI', () => {
  test('translates "Hello world" from English to Spanish', async ({ page }) => {
    await page.goto('https://libretranslate.com/');

    // Select source language (English)
    await page.locator('#sourceLanguage').selectOption('en');

    // Select target language (Spanish)
    await page.locator('#targetLanguage').selectOption('es');

    // Type text
    await page.locator('#sourceText').fill('Hello world');

    // Click translate button
    await page.locator('button:has-text("Translate")').click();

    // Wait for translation output to appear
    const translated = page.locator('#targetText');
    await expect(translated).toHaveValue(/Hola mundo/i);
  });
});
