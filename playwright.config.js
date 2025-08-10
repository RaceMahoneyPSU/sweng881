// playwright.config.js
module.exports = {
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results/ui-tests.xml' }]
  ],
  use: {
    headless: false,
    baseURL: 'https://libretranslate.com',
    screenshot: 'only-on-failure',   // <-- Add this
    video: 'retain-on-failure',       // Optional: keep a video if a test fails
    slowMo: 100,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  },
};
