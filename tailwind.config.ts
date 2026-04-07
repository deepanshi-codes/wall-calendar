import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },
      colors: {
        brand: {
          50: "#e8f2fc",
          100: "#b5d4f4",
          400: "#378ADD",
          600: "#1a6fc4",
          800: "#0c447c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
