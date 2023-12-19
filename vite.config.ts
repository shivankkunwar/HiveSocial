import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint';
import istanbul from "vite-plugin-istanbul";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylelint({
    configFile: './.stylelintrc',
    fix: true,
    formatter: 'string',
    cache: true,
  }),
  istanbul({
    cypress: true,
    requireEnv: false,
}),],
  
  
})
