import type { Config } from "tailwindcss";

/** Reference only — tokens live in globals.css @theme for Tailwind v4. */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
};

export default config;
