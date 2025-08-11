const { defineConfig } = require("cypress");
const addAccessibilityTasks = require('wick-a11y/accessibility-tasks');
const codeCoverage = require('@cypress/code-coverage/task');
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin')

module.exports = defineConfig({
  projectId: '8dmse1',
  reporter: 'cypress-mochawesome-reporter',
  accessibilityFolder: 'cypress/your-accessibility-reports-folder',
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
      addAccessibilityTasks(on)
      mochawesomeReporter(on)
      codeCoverage(on, config);
      return config;
    },
    baseUrl: getBaseUrlByEnv(process.env.CYPRESS_ENV || "dev"), // Ambil dari environment variable atau default
    env: {
      environment: process.env.CYPRESS_ENV || "dev", // Default ke 'local' jika tidak ditentukan
      enableAccessibilityVoice: true,
    },
    pageLoadTimeout: 120000, // tingkatkan menjadi 2 menit atau lebih
    viewportHeight: 960,
    viewportWidth: 1436,
    experimentalStudio: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 5,
  },
});

function getBaseUrlByEnv(environment) {
  const envUrls = {
    // local: "http://localhost:5173",
    local: "http://localhost:5173",
    dev: "https://uat-cashbook.assist.id/",
    prod: "https://uat-cashbook.assist.id/",
  };

  return envUrls[environment] || envUrls.local;
}
