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
    video: 'retain-on-failure'       // Optional: keep a video if a test fails
    slowMo: 100
  },
};
