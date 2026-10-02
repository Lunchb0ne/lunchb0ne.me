import { cloudflare } from "@cloudflare/vite-plugin";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    // The site is fully static, so render it to HTML at build time instead of on every request
    tanstackStart({ prerender: { enabled: true, crawlLinks: false, failOnError: true } }),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
