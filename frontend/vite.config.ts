import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    port: 3005,
    open: true
  }
});
