const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "i6v6hv",

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
