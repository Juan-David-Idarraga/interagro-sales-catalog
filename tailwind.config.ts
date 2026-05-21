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
        interagro: {
          red: "#E90729",
          redDark: "#C90022",
          green: "#019847",
          greenDark: "#007A3A",
          bg: "#F8FAF9",
          text: "#1F2933",
          muted: "#4B5563",
          border: "#E5E7EB",
        },
      },
      boxShadow: {
        soft: "0 14px 35px rgba(31, 41, 51, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
