import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "QR Check-in App",
        short_name: "QR Check-in",
        description: "QR Code scanning app for event check-ins",
        theme_color: "#ffffff",
        icons: [
          {
            src: "genta192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "genta512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "genta512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /^https:\/\/localhost:3001\/.*$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "local-api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
  ],
});
