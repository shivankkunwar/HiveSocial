import { defineConfig } from "cypress";

import task from '@cypress/code-coverage/task'


export default defineConfig({
  env: {
    codeCoverage: {
        exclude: "cypress/**/*.*",
    },
  },
  e2e: {
    baseUrl: 'https://hive-social.vercel.app/',
    setupNodeEvents(on, config) {
      task(on, config);
      
      return config;
  },
  
  
  },
});