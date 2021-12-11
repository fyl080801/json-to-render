import path from "path";
import { defineConfig, mergeConfig } from "vite";
import base from "../../build/vite.base";

const config = defineConfig({
  // plugins,
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib"),
      name: "Json2RenderVueNext",
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

export default mergeConfig(base, config);
