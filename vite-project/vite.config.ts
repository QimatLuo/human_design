import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

export default defineConfig({
  base: "/human_design/",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  plugins: [deno()],
});
