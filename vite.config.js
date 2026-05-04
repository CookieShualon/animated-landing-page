import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        work: resolve(__dirname, "work.html"),
        pricing: resolve(__dirname, "pricing.html"),
        template: resolve(__dirname, "use-template.html"),
        contact: resolve(__dirname, "contact.html")
      }
    }
  }
});
