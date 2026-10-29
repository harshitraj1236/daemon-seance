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
        crt: {
          bg: "#08080C",
          surface: "#0F111A",
          border: "#1C1F2E",
        },
        phosphor: {
          amber: "#FFB000",
          "amber-dim": "#A06B00",
          emerald: "#33FF33",
          "emerald-dim": "#1C8C1C",
          ghost: "#7DF9FF",
          "ghost-dim": "#3B8A8E",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
