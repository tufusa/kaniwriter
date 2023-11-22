import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      css: path.resolve(__dirname, "src/css"),
      pages: path.resolve(__dirname, "src/pages"),
      routes: path.resolve(__dirname, "src/routes"),
      libs: path.resolve(__dirname, "src/libs"),
    },
  },
});
