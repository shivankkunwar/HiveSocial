import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint';
import istanbul from 'vite-plugin-istanbul';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylelint({
    configFile: './.stylelintrc',
    fix: true,
    formatter: 'string',
    cache: true,
  }),istanbul({
    include: 'src/**/*.{js,ts,jsx,tsx}', // Instrument your source files
    exclude: ['node_modules', 'test/'], // Exclude files you don't want to instrument
    extension: ['.js', '.ts', '.jsx', '.tsx'], // Specify the file extensions to instrument
    requireEnv: true, // Only instrument the code if the VITE_COVERAGE environment variable is set to true
  }),],
  
})
