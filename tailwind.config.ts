import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flowuz: {
          black: "#0A0A0E",
          accent: "var(--flowuz-accent)",
          page: "var(--flowuz-page)",
          text: "var(--flowuz-text)",
          muted: "var(--flowuz-muted)",
          faint: "var(--flowuz-faint)",
          surface: "var(--flowuz-surface)",
          border: "var(--flowuz-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-space-grotesk)", "Space Grotesk", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 72px var(--flowuz-accent-glow)",
        "glow-lg": "0 0 120px var(--flowuz-accent-glow)",
        "pro-card": "0 0 0 1px var(--flowuz-accent), 0 0 80px var(--flowuz-accent-glow), 0 24px 64px rgba(0,0,0,0.12)",
        iphone: "0 50px 100px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.12)",
      },
      animation: {
        "float-phone": "float-phone 7s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "mesh-drift": "mesh-drift 28s ease-in-out infinite",
        "mesh-drift-reverse": "mesh-drift-reverse 34s ease-in-out infinite",
      },
      keyframes: {
        "float-phone": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "mesh-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(3%, -2%) scale(1.04)" },
          "66%": { transform: "translate(-2%, 3%) scale(0.98)" },
        },
        "mesh-drift-reverse": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-4%, 2%) scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
