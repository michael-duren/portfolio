import { defineConfig } from "astro/config";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [icon()],
  adapter: netlify(),

  vite: {
    // @ts-expect-error -- types are incorrect either astro or for tailwindcss vite plugin
    plugins: [tailwindcss()],
    server: {
      host: import.meta.env.DEV,
    },
  },
});

