const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  chromeWebSecurity: false,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },
    blockHosts: [
      "*google-analytics.com",
      "*doubleclick.net",
      "*ad.plus",
      "*openx.net",
      "*criteo.com",
      "*rubiconproject.com",
      "*pubcid.org",
      "*id5-sync.com"
    ]
  },
});