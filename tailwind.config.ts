
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0F172A",
        "background-secondary": "#1E293B",
        foreground: "#F1F5F9",
        primary: {
          DEFAULT: "#38BDF8",
          foreground: "#FAFAF8",
        },
        secondary: {
          DEFAULT: "#334155",
          foreground: "#F1F5F9",
        },
        card: {
          DEFAULT: "#1E293B",
          foreground: "#F1F5F9",
        },
        success: {
          DEFAULT: "#4ADE80",
          foreground: "#FAFAF8",
        },
        warning: {
          DEFAULT: "#FB923C",
          foreground: "#FAFAF8",
        },
        muted: {
          DEFAULT: "#64748B",
          foreground: "#E2E8F0",
        },
        accent: {
          DEFAULT: "#38BDF8",
          foreground: "#FAFAF8",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
