/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./404.html", "./projects/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0D10",
        "bg-raised": "#12161C",
        line: "#242A32",
        "line-soft": "#1A1F26",
        ink: "#E8E6E0",
        "ink-dim": "#8B929B",
        "ink-faint": "#565C64",
        copper: "#C98A4B",
        "copper-hover": "#DEA169",
        cyan: "#6FA9B0",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};
