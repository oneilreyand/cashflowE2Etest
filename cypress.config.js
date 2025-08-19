const { defineConfig } = require("cypress");
const addAccessibilityTasks = require('wick-a11y/accessibility-tasks');
const codeCoverage = require('@cypress/code-coverage/task');
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin')
const env = 'dev'

module.exports = defineConfig({
  pageLoadTimeout: 60000,       // 60 detik untuk load halaman
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
    baseUrl: getBaseUrlByEnv(env || "dev"), // Ambil dari environment variable atau default
    env: {
      environment: env || "dev", // Default ke 'local' jika tidak ditentukan
      enableAccessibilityVoice: true,
      // companyId: '65800b00-79e4-11f0-af51-11d9de5623a9'
      companyId: '4d8ecbc2-66d0-11f0-a509-2d118ddad98e'

      // companyId: 'c9b9b760-306f-11f0-ac00-4581423404ed'
    },
    pageLoadTimeout: 120000, // tingkatkan menjadi 2 menit atau lebih
    defaultCommandTimeout: 5000, // tingkatkan menjadi 5 detik
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
