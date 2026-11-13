# Mason Pyle — Engineering Portfolio

[![Vite](https://img.shields.io/badge/Vite-8.2+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESModules](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-222222?logo=github&logoColor=white)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A high-performance, dark-mode engineering portfolio showcasing hardware-software co-design, bare-metal and RTOS firmware, high-speed PCB layouts, vehicular communication buses, robotics odometry, and production self-hosted infrastructure.

Live site: [masonpyle.com](https://masonpyle.com)

---

## 🧭 About the Site

This portfolio is built as a fast, accessible, static web application designed with an editorial engineering aesthetic inspired by PCB layout schematics and aerospace avionics:

- **PCB & Schematic Visual Identity:** High-contrast deep slate background (`#0B0E14`), copper trace accents (`#C98A4B`), cyan bus lines (`#6FA9B0`), and crisp monospaced typography ([Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)).
- **Native Vector Architecture Diagrams:** Every major project includes hand-crafted, responsive SVG topology diagrams illustrating hardware state machines, signal routing, network namespaces, and subsystem boundaries.
- **Zero Heavy Framework Runtime:** Built using pure semantic HTML, vanilla JavaScript (ES Modules), Vite, and Tailwind CSS. Delivers sub-second initial loads, zero client-side framework overhead, and 100/100 Lighthouse performance metrics.
- **Single Source of Truth:** Core project specifications, career milestones, firmware snippets, and hardware bring-up assets are declaratively driven by a centralized data layer (`src/data.js`), ensuring complete synchronization across the home page, project indices, and detail pages.

---

## 🛠️ Featured Technical Deep Dives

The portfolio provides detailed engineering breakdowns for five core technical projects:

| Project | Domain | Architecture & Technical Highlights |
|---|---|---|
| **[RP2040 Custom Keyboard](/projects/keyboard/)** | Embedded Firmware · PCB Design | Custom 91-key PCB with 10×9 switch matrix, COL2ROW 1N4148 diodes, 82 addressable NeoPixels on GPIO `SDA`, and KMK firmware on CircuitPython featuring custom procedural RGB animation modes. |
| **[Bearcat Solar Car LV](/projects/solar-car/)** | Automotive · Safety-Critical Systems | Lead low-voltage developer for UC's American Solar Challenge racer. Architected isolated 500 kbps CAN 2.0B telemetry network linking HV BMS, MPPT solar controllers, and driver instrument HUD. |
| **[Self-Hosted Home Lab](/projects/homelab/)** | Systems Infrastructure · DevOps | 10 modular Docker Compose stacks running on Proxmox VE. Features Cloudflare Zero Trust ingress, WireGuard kill-switch pod for media acquisition, hardware-accelerated GPU transcoding, Immich, and Home Assistant with Matter. |
| **[VEX U Autonomous Robotics](/projects/vexu/)** | Robotics · Real-Time Control | 3-wheel omnidirectional tracking odometry running on 100 Hz RTOS thread with arc-chord positional fusion and cascading PID control for sub-2mm repeatable autonomous path execution. |
| **[Custom FPV Freestyle Drones](/projects/fpv/)** | Avionics · Power Electronics | Ground-up 3", 5", and whoop quadcopter builds. Betaflight flight controller configuration, RPM filtering, and digital video integration (DJI O4 Lite). |

---

## 📁 Repository Structure

```text
portfolio/
├── index.html                   # Home page shell (Hero, Featured Work, About, Experience, Contact)
├── 404.html                     # Branded 404 error page
├── projects/
│   ├── index.html               # Full project archive directory
│   ├── keyboard/index.html      # RP2040 Keyboard technical deep dive
│   ├── solar-car/index.html     # Solar Car LV systems deep dive
│   ├── homelab/index.html       # Self-hosted infrastructure deep dive
│   ├── vexu/index.html          # Autonomous robotics odometry deep dive
│   └── fpv/index.html           # FPV drone engineering deep dive
├── public/
│   ├── favicon.svg              # Custom monogram favicon
│   ├── og-image.png             # Open Graph preview card (1200×630)
│   ├── robots.txt               # Search engine crawler policies
│   ├── sitemap.xml              # Structured XML sitemap
│   └── images/                  # Project photos, schematics, and CAD renders
├── src/
│   ├── data.js                  # Centralized data model (bio, specs, code, projects)
│   ├── site.js                  # Dynamic rendering engine, SVG generators, and interactions
│   └── style.css                # Tailwind directives and custom component utilities
├── tailwind.config.js           # Design system tokens (colors, fonts, animations)
└── vite.config.js               # Multi-page build configuration
```

---

## ⚡ Technical Architecture

### 1. Declarative Content Architecture
All site content is defined in `src/data.js` as structured data objects. `src/site.js` parses this model and dynamically populates:
- The Home page hero, credentials summary, and featured work cards.
- Technical project specifications, hardware matrices, and overview bullet points.
- Syntax-highlighted code snippets and interactive copy-to-clipboard buttons.
- Responsive vector diagrams illustrating bus topologies and firmware states.

### 2. SEO & Link Previews
Each project page maintains static HTML metadata tags (`<title>`, `<meta name="description">`, Open Graph, and Twitter Cards) in its respective `<head>` block, ensuring social share previews render correctly across platforms like LinkedIn, Slack, and Discord without requiring client-side JS evaluation.

### 3. Operational Security (OpSec) Sanitization
Infrastructure documentation and network diagrams are specifically structured to showcase advanced systems design (zero-trust ingress, network namespaces, WireGuard killswitch routing, and TRaSH Guides atomic hardlink architecture) while omitting sensitive internal port numbers and local host filesystem paths.

---

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm`

### Commands

```bash
# Install dependencies
npm install

# Start local development server with hot-module replacement
npm run dev

# Run production build (compiles all pages into dist/)
npm run build

# Preview the production build locally
npm run preview
```

---

## 🌐 Deployment

The site is configured for automatic deployment via **GitHub Actions** (`.github/workflows/deploy.yml`). On every push to the `main` branch, the workflow:
1. Installs project dependencies.
2. Runs `vite build` to generate an optimized, minified production bundle in `dist/`.
3. Deploys the static assets directly to **GitHub Pages** using a custom apex domain (`masonpyle.com`) managed with Cloudflare DNS.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
