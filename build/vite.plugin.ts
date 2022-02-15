import { createVuePlugin } from "vite-plugin-vue2";
import ScriptSetup from "unplugin-vue2-script-setup/vite";
import legacy from "@vitejs/plugin-legacy";

export const viteVue = createVuePlugin();

export const scriptSetup = ScriptSetup({});

export const viteLegacy = legacy({
  targets: ["defaults", "IE >= 11"],
});

export const plugins = [viteVue, scriptSetup];
