import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo's site from /DEPLOYMENT-OF-WEB-APPLICATIONS/,
  // so every asset URL needs that prefix. Update it if the repo is renamed.
  base: '/DEPLOYMENT-OF-WEB-APPLICATIONS/',
})
