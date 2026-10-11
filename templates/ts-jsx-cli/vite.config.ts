import { defineConfig } from "vite"
import hyperapp from "vite-plugin-hyperapp"
import { fileURLToPath } from "node:url"

export default defineConfig({
  plugins: [hyperapp()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
