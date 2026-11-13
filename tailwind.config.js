/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./404.html", "./projects/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0D10",
        "bg-raised": "#12161C",
        "bg-card": "#0E1217",
        line: "#242A32",
        "line-soft": "#1A1F26",
        "line-hover": "#363E4A",
        ink: "#E8E6E0",
        "ink-dim": "#8B929B",
        "ink-faint": "#7E8691", // Enhanced contrast (4.8:1 WCAG AA compliant on #0B0D10)
        copper: "#C98A4B",
        "copper-hover": "#DEA169",
        "copper-glow": "rgba(201, 138, 75, 0.15)",
        cyan: "#6FA9B0",
        "cyan-glow": "rgba(111, 169, 176, 0.15)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      maxWidth: {
        site: "1280px",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
