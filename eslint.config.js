import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      "dist/",
      ".astro/",
      ".netlify/",
      "node_modules/",
      "alpine-bundle/",
    ],
  },
  {
    files: ["src/**/*.{ts,astro}"],
    languageOptions: {
      globals: { ...globals.browser, astroHTML: "readonly" },
    },
  },
  {
    files: ["public/sw.js"],
    languageOptions: {
      globals: { ...globals.serviceworker, ...globals.browser },
    },
  },
  {
    files: ["scripts/**/*.js"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
