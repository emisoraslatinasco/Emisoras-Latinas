import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00FFFF',
          green: '#39FF14',
          pink: '#FF009D',
          purple: '#B026FF',
          yellow: '#F5FF00',
          orange: '#FF6B00',
          turquoise: '#00F6FF',
          red: '#FF073A',
        },
        background: {
          dark: '#0A0A0A',
          carbon: '#121212',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
