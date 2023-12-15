import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylelint({
    configFile: './.stylelintrc',
    fix: true,
    formatter: 'string',
    cache: true,
  })],
  
})
