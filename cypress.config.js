const { defineConfig } = require("cypress");
const codeCoverage = require('@cypress/code-coverage/task');
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin')
module.exports = defineConfig({
  projectId: '8dmse1',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // require("@cypress/code-coverage/task")(on, config); // Aktifkan code coverage
      mochawesomeReporter(on)
      codeCoverage(on, config);
      return config;
    },
    baseUrl: getBaseUrlByEnv(process.env.CYPRESS_ENV || "local"), // Ambil dari environment variable atau default
    env: {
      environment: process.env.CYPRESS_ENV || "local", // Default ke 'local' jika tidak ditentukan
    },
    pageLoadTimeout: 120000, // tingkatkan menjadi 2 menit atau lebih
    viewportHeight: 960,
    viewportWidth: 1436,
  },
});

function getBaseUrlByEnv(environment) {
  const envUrls = {
    local: "http://localhost:5173",
    dev: "https://cashflow.assist.id",
    prod: "https:/cashflow.assist.id",
  };

  return envUrls[environment] || envUrls.local;
}
