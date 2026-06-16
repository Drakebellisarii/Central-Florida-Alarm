import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas (dark-theme pages: contact, service, areas)
        ink: {
          DEFAULT: "#0C1016",
          deep: "#080B11",
          raised: "#121823",
          line: "#1B2330",
        },
        // Brand navy — primary company color from logo (#011689)
        navy: {
          DEFAULT: "#122C82",
          deep: "#0A1A52",
          logo: "#011689",
          light: "#1E3FA0",
        },
        // Warm neutrals
        bone: {
          DEFAULT: "#ECE7DB",
          dim: "#C9C3B4",
        },
        paper: {
          DEFAULT: "#F1EDE3",
          dim: "#E4DDCC",
        },
        // Accent
        bronze: {
          DEFAULT: "#B08C53",
          soft: "#A78A5E",
          deep: "#8A6B3C",
        },
        stone: "#7C7666",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
        wide2: "0.16em",
      },
      maxWidth: {
        prose2: "68ch",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        plate: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
