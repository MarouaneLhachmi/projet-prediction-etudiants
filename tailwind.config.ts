import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:   { DEFAULT: "#1F3864", light: "#2E75B6", dark: "#152644" },
        amber:  { DEFAULT: "#F4B942", light: "#FAD382", dark: "#D4890A" },
        green:  { DEFAULT: "#3B6D11", light: "#5A9E1A", dark: "#274A0B" },
        red:    { DEFAULT: "#C0392B", light: "#E05A4B", dark: "#922B21" },
        teal:   { DEFAULT: "#1D9E75", light: "#27C992", dark: "#116850" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up":    "fadeUp 0.5s ease-out forwards",
        "count-up":   "countUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
