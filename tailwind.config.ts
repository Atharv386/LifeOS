import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "#ff5d22", // Warm amber accent
          green: "#52b788", // Soft recovery green
        },
        brand: {
          bg: "#0B0B0D",
          card: "#121215",
          cardBorder: "#1c1c21",
          border: "#26262b",
          textMuted: "#8e8e93",
        }
      },
    },
  },
  plugins: [],
};
export default config;
