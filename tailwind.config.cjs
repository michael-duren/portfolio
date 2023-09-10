/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        rock: ['Rock Salt', 'cursive'],
      },
    },
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [require('daisyui')],
};
