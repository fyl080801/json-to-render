import { defineConfig } from "vite";
// import { plugins } from "./vite.plugin";

const config = defineConfig({
  build: {
    minify: true,
  },
  // plugins,

  // rollupOptions: {
  //   // 确保外部化处理那些你不想打包进库的依赖
  //   // external: ["vue"],
  //   // output: {
  //   //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
  //   //   globals: {
  //   //     vue: "Vue",
  //   //   },
  //   // },
  // },
  // rollupOptions: {
  //   input: path.resolve(__dirname, "./lib"),
  // },
  //   server: {
  //     port: 8080,
  //   },
});

export default config;
