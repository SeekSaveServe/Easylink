const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
    SUPABASE_ANON: process.env.REACT_APP_SUPABASE_ANON_KEY,
    rand: 2,
  },
  e2e: {
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
