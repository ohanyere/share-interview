/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // <-- THIS fixes "document is not defined"
    globals: true,        // allows using test(), expect() without importing
    setupFiles: "./src/setupTests.js", // optional (see below)
  },
})
