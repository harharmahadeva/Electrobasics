import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.svg", "icons.svg"],
      manifest: {
        name: "ElectroBasics",
        short_name: "ElectroBasics",
        description: "Beginner electronics learning with lesson progress, resume, and offline app shell support.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#070b13",
        theme_color: "#070b13",
        categories: ["education", "productivity"],
        lang: "en",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: "/index.html",
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/(api|auth|auth\/v1|rest\/v1)\/.*/i,
            handler: "NetworkOnly",
            method: "GET",
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https?:\/\/.*\/assets\/(lessons|auth)\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "electrobasics-learning-assets",
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https?:\/\/.*\/assets\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "electrobasics-static-assets",
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 14,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
})
