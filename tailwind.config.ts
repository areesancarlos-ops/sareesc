import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institucional: {
          DEFAULT: "#14315C",
          claro: "#2C548C",
          oscuro: "#0C233F",
        },
        dorado: {
          DEFAULT: "#C9A227",
          oscuro: "#8A6A16",
        },
        marfil: "#F4F2EC",
        textos: {
          principal: "#1C1C1A",
          secundario: "#6B6B63",
        },
        borde: "#D9D6CC",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
