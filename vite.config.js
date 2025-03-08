
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {

    host: '0.0.0.0',
    port: 3000,
    allowedHosts: "35f886ec-f179-4201-8424-23275e541300-00-7slxum07tw9b.pike.replit.dev"
  }
})
