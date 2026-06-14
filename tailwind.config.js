/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Logo-inspired palette
        "bg-primary": "#071B1C",
        "bg-secondary": "#0C2526",
        "bg-tertiary": "#122D2E",
        "bg-hover": "#183738",
        border: "#1A3A3B",
        "border-light": "#244748",
        // Gold accent (from logo lightning bolt)
        gold: "#FED008",
        "gold-hover": "#E5BB00",
        "gold-muted": "rgba(254, 208, 8, 0.10)",
        // Green accent (from logo shield)
        green: "#35AA35",
        "green-hover": "#2D952D",
        "green-muted": "rgba(53, 170, 53, 0.10)",
        // Text hierarchy
        "text-primary": "#F0F2F1",
        "text-secondary": "#8A9B9C",
        "text-muted": "#5A6B6C",
        // Semantic
        success: "#35AA35",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
