const { defineConfig } = require("cypress");
const codeCoverage = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // require("@cypress/code-coverage/task")(on, config); // Aktifkan code coverage
      codeCoverage(on, config);
      return config;
    },
    baseUrl: getBaseUrlByEnv(process.env.CYPRESS_ENV || "local"), // Ambil dari environment variable atau default
    env: {
      environment: process.env.CYPRESS_ENV || "local", // Default ke 'local' jika tidak ditentukan
    },
  },
});

function getBaseUrlByEnv(environment) {
  const envUrls = {
    local: "http://localhost:5173",
    dev: "cashflow.assist.id",
    prod: "cashflow.assist.id",
  };

  return envUrls[environment] || envUrls.local;
}
