import path from "path";
import { defineConfig, mergeConfig } from "vite";
import base from "../../build/vite.base";

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib"),
      name: "Json2RenderCanvas",
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
  },
});

export default mergeConfig(base, config);
