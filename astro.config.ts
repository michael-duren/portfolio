import { defineConfig } from "astro/config";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [icon(), mdx()],
  adapter: netlify(),

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },

  vite: {
    // @ts-expect-error -- types are incorrect either astro or for tailwindcss vite plugin
    plugins: [tailwindcss()],
    server: {
      host: import.meta.env.DEV,
    },
  },
});

