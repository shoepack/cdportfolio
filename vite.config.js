import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

const root = import.meta.dirname;

// Multi-page build: the index is a temporary chooser; each direction is its own page.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": resolve(root, "src") } },
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        pad: resolve(root, "pad/index.html"),
        spec: resolve(root, "spec/index.html"),
        standard: resolve(root, "standard/index.html"),
      },
    },
  },
});
