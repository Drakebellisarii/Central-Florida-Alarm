import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Landscape phones: wide enough to hit sm/md layouts but with
        // almost no vertical room. Lets sections relax full-height and
        // heavy vertical padding where it would squish.
        short: { raw: "(min-width: 480px) and (max-height: 540px)" },
      },
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
        // Light neutrals — white & cool blue-tinted whites (no warm cream)
        bone: {
          DEFAULT: "#FFFFFF",
          dim: "#AEBAD2",
        },
        paper: {
          DEFAULT: "#F4F7FC",
          dim: "#E7ECF6",
        },
        // Accent — brand blue (formerly warm bronze)
        bronze: {
          DEFAULT: "#1E3FA0",
          soft: "#2A4CB0",
          deep: "#122C82",
        },
        stone: "#5C6884",
      },
      fontFamily: {
        // Gloock — hero + page h1s only.
        hero: ["var(--font-gloock)", "Georgia", "serif"],
        // DM Serif Text — all other serif headings.
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
        // Plus Jakarta Sans — body and smaller UI text.
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        // M PLUS Rounded 1c — oversized numerals only.
        numeral: ["var(--font-numeral)", "system-ui", "sans-serif"],
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
