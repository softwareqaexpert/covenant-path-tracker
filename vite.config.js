import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/covenant-path-tracker/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon.svg'],
      manifest: {
        name: 'My Covenant Path',
        short_name: 'Covenant Path',
        description: 'Track your progress along the covenant path toward the temple.',
        theme_color: '#1F3864',
        background_color: '#faf9f5',
        display: 'standalone',
        scope: '/covenant-path-tracker/',
        start_url: '/covenant-path-tracker/',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      }
    })
  ]
})
