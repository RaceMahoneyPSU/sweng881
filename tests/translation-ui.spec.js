const { test, expect } = require('@playwright/test');

test.describe('LibreTranslate UI', () => {
  test('translates "Hello world" from English to Spanish', async ({ page }) => {
    await page.goto('https://libretranslate.com');

    // Wait for source language dropdown
    await page.waitForSelector('#sourceLang', { timeout: 15000 });

    // Select source language (English)
    await page.locator('#sourceLang').selectOption('en');

    // Select target language (Spanish)
    await page.locator('#targetLang').selectOption('es');

    // Enter text
    await page.fill('#sourceText', 'Hello world');

    // Click translate
    await page.click('#translateButton');

    // Wait for result
    const resultLocator = page.locator('#translatedText');
    await expect(resultLocator).toHaveText(/Hola mundo/i, { timeout: 15000 });
  });
});
