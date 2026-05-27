import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A1A2E",
          50: "#2A2A4E",
          100: "#1A1A2E",
          200: "#16162A",
          300: "#121224",
          400: "#0E0E1E",
          500: "#0D0D14",
          600: "#0A0A12",
          700: "#080810",
          800: "#05050E",
          900: "#03030A",
        },
        secondary: {
          DEFAULT: "#C9A96E",
          50: "#E8D5B5",
          100: "#DCC79D",
          200: "#D0B985",
          300: "#C9A96E",
          400: "#B89258",
          500: "#A67B42",
          600: "#8F6835",
          700: "#785528",
          800: "#61421B",
          900: "#4A2F0E",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          50: "#C4B5FD",
          100: "#B494F8",
          200: "#A374F3",
          300: "#9354EE",
          400: "#8B5CF6",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#581C87",
          800: "#430D6B",
          900: "#2E004A",
        },
        surface: "#16162A",
        background: "#0D0D14",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(20px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        glow: { "0%": { boxShadow: "0 0 5px rgba(139, 92, 246, 0.5)" }, "100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)" } },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(to bottom, rgba(13, 13, 20, 0.3), rgba(13, 13, 20, 0.9)), url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
