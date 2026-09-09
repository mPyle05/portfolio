import { defineConfig } from "vite";
import { resolve } from "path";

const root = import.meta.dirname;

// Every page that should be part of the production build needs an entry
// here. When you add a new project page (see README.md → "Adding a new
// project"), add one more line following the same pattern.
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        notFound: resolve(root, "404.html"),
        projectsIndex: resolve(root, "projects/index.html"),
        keyboard: resolve(root, "projects/keyboard/index.html"),
        solarCar: resolve(root, "projects/solar-car/index.html"),
        vexu: resolve(root, "projects/vexu/index.html"),
      },
    },
  },
});
