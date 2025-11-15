import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [],
  adapter: netlify(),

  vite: {
    // @ts-expect-error -- types are incorrect either astro or for tailwindcss vite plugin
    plugins: [tailwindcss()],
    server: {
      host: import.meta.env.DEV,
    },
  },
});

