const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
module.exports = defineConfig({
  setupNodeEvents,
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 6000,
  env: {
    url: "",
  },
  retries: {
    runMode: 1,
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/*.feature",
    watchForFileChanges: false,
  },
  browsers: [
    {
      name: "electron",
      channel: "stable",
      family: "chromium",
      displayName: "Electron",
      version: "114.0.5735.289",
      path: "",
      majorVersion: 114,
    },
    {
      name: "chrome",
      channel: "stable",
      family: "chromium",
      displayName: "chrome",
      version: "121.0.6167.139",
      path: "/Applications/Chrome.app/Contents/MacOS/Google Chrome",
      majorVersion: 121,
    },
  ],
});
