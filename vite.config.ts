import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint';
import istanbul from 'vite-plugin-istanbul';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [react(), stylelint({
    configFile: './.stylelintrc',
    fix: true,
    formatter: 'string',
    cache: true,
  }),istanbul({
    cypress: true,
    requireEnv: false,
    nycrcPath: './.nycrc.json',
    forceBuildInstrument: true //Instrument the source code for cypress runs
  }),],
server: {
  host: true,
  port: 3000,
},
})
