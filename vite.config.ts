import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const base = process.env.GITHUB_PAGES_BASE || "/";

export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: { enabled: true, crawlLinks: true },
      },
    }),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
});
