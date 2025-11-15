import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
  },
});