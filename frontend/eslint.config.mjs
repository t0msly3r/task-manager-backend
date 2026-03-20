import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  {
    ignores: ["node_modules", ".next", "dist", "build"],
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      prettier: prettier,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off", // importante para TS
      "@next/next/no-img-element": "warn",
      "prettier/prettier": "warn",
    },
  },
  prettierConfig,
]);
