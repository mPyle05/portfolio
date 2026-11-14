import "./style.css";
import siteData from "./data.js";

// ============================================================================
//  RENDER ENGINE | Mason Pyle Portfolio
//  Editorial Design & High-End Frontend Architecture
// ============================================================================

// ---- inline SVG icons -------------------------------------------------------
const icons = {
  arrowUpRight: `<svg viewBox="0 0 16 16" width="13" height="13" class="inline-block shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M6 3h7v7M13 3 3 13" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 16 16" width="13" height="13" class="inline-block shrink-0"><path d="M10 3 4 8l6 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  github: `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" class="inline-block shrink-0"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15v3.19c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block shrink-0"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#50FA7B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block shrink-0"><polyline points="20 6 9 17 4 12"/></svg>`,
  download: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block shrink-0"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  external: `<svg viewBox="0 0 16 16" width="11" height="11" class="inline-block shrink-0 opacity-60"><path d="M6 3h7v7M13 3 3 13" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  close: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  chip: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#C98A4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="24"></line><line x1="15" y1="20" x2="15" y2="24"></line><line x1="20" y1="9" x2="24" y2="9"></line><line x1="20" y1="15" x2="24" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`,
};

const esc = (str = "") =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// One-click copy with visual confirmation and fallback
window.copyToClipboard = (text, btn) => {
  const onSuccess = () => {
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = `${icons.check}&ensp;<span class="text-[#50FA7B]">Copied</span>`;
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2000);
  };

  const execFallback = () => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      onSuccess();
    } catch (e) {
      if (btn) btn.innerHTML = `<span class="text-amber-400">Failed to copy</span>`;
    }
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(execFallback);
  } else {
    execFallback();
  }
};

// Resolves asset paths relative to public root in Vite
function resolveAssetPath(path = "", slug = "") {
  if (!path) return "";
  let clean = path.replace(/^public\//, "/");
  if (!clean.startsWith("/") && !clean.startsWith("http")) {
    clean = `/images/${slug}/${clean}`;
  }
  return clean;
}

// Lightweight zero-dependency code syntax highlighter
function highlightCode(code) {
  const keywords = new Set([
    "constexpr", "const", "static", "void", "return", "for", "if", "else", "switch", "case",
    "break", "default", "struct", "class", "public", "private", "protected", "new", "delete",
    "true", "false", "nullptr", "null", "using", "namespace", "include", "typedef", "override",
    "services", "image", "volumes", "ports", "environment", "restart", "network_mode", "cap_add", "devices", "set"
  ]);

  const types = new Set([
    "uint8_t", "uint16_t", "uint32_t", "uint64_t", "int8_t", "int16_t", "int32_t",
    "ushort", "short", "int", "float", "double", "bool", "char", "auto", "size_t",
    "Pose", "OdometryTracker", "CanTelemetryDispatcher", "PackTelemetry", "Stopwatch", "CanFrame"
  ]);

  const lines = code.split("\n");
  return lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
      return `<span class="tok-com">${esc(line)}</span>`;
    }

    return line.replace(
      /(\/\/[^\n]*|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?:f|u|in|deg|ticks)?\b)|(\b[a-zA-Z_]\w*\b)|([<>&])/g,
      (match, com, str, num, ident, punct) => {
        if (com) return `<span class="tok-com">${esc(com)}</span>`;
        if (str) return `<span class="tok-str">${esc(str)}</span>`;
        if (num) return `<span class="tok-num">${esc(num)}</span>`;
        if (ident) {
          if (keywords.has(ident)) return `<span class="tok-kw">${esc(ident)}</span>`;
          if (types.has(ident)) return `<span class="tok-type">${esc(ident)}</span>`;
          return esc(ident);
        }
        if (punct) return esc(punct);
        return esc(match);
      }
    );
  }).join("\n");
}

// ---- header with responsive mobile navigation -------------------------------
function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const isProjectsPath = typeof window !== "undefined" && window.location.pathname.startsWith("/projects");

  el.className = "fixed top-0 left-0 right-0 z-50 glass-header";
  el.innerHTML = `
    <div class="container-site flex items-center justify-between py-4">
      <a href="/" class="font-display font-bold text-sm no-underline text-ink border border-line-soft bg-bg-raised/60 w-9 h-9 rounded-lg flex items-center justify-center hover:border-copper transition-colors duration-200">
        ${esc(siteData.person.initials)}
      </a>
      
      <!-- Desktop Navigation -->
      <nav class="site-nav hidden sm:flex items-center gap-7">
        ${siteData.nav.map((l) => {
          const isProj = isProjectsPath && l.href.startsWith("/projects");
          return `<a href="${esc(l.href)}"${isProj ? ' class="is-active"' : ''}>${esc(l.label)}</a>`;
        }).join("")}
      </nav>

      <div class="hidden sm:inline-flex items-center gap-3">
        <a href="mailto:${esc(siteData.person.email)}" class="btn btn-ghost text-xs py-2 px-4">
          Get in touch
        </a>
      </div>

      <!-- Mobile Hamburger Toggle -->
      <button id="mobile-menu-btn" class="sm:hidden flex items-center justify-center w-9 h-9 border border-line-soft bg-bg-raised/60 rounded-lg text-ink-dim hover:text-ink hover:border-copper transition-colors" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav">
        <span id="menu-icon-open">${icons.menu}</span>
        <span id="menu-icon-close" class="hidden">${icons.close}</span>
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobile-nav" class="sm:hidden hidden border-t border-line-soft bg-bg/95 backdrop-blur-lg px-6 py-5 flex flex-col gap-4">
      ${siteData.nav.map((l) => {
        const isProj = isProjectsPath && l.href.startsWith("/projects");
        return `<a href="${esc(l.href)}" class="mobile-nav-link ${isProj ? 'text-copper font-semibold' : 'text-ink-dim hover:text-copper'} text-sm font-medium py-1 no-underline transition-colors">${esc(l.label)}</a>`;
      }).join("")}
      <div class="pt-3 border-t border-line-soft flex items-center justify-between">
        <a href="mailto:${esc(siteData.person.email)}" class="btn btn-primary text-xs py-2 px-4 w-full justify-center">
          Get in touch &rarr;
        </a>
      </div>
    </div>
  `;

  // Mobile menu toggle interactions
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");

  if (menuBtn && mobileNav) {
    menuBtn.onclick = () => {
      const isClosed = mobileNav.classList.contains("hidden");
      if (isClosed) {
        mobileNav.classList.remove("hidden");
        iconOpen.classList.add("hidden");
        iconClose.classList.remove("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
      } else {
        mobileNav.classList.add("hidden");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    };

    // Close on any link click
    mobileNav.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.add("hidden");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
}

// ---- footer -----------------------------------------------------------------
function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
    <div class="container-site py-12 pb-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-line-soft text-xs font-mono text-ink-faint">
      <div>
        <p class="text-ink-dim font-medium">${esc(siteData.person.name)} · ${esc(siteData.person.role)}</p>
        <p class="text-[11px] text-ink-faint/80 mt-0.5">${esc(siteData.person.location)} · Accelerated M.Eng. &amp; B.S. VLSI Focus</p>
      </div>
      <div class="flex items-center gap-4">
        <a href="${esc(siteData.person.resumeUrl)}" target="_blank" rel="noopener" class="hover:text-copper transition-colors">Résumé PDF</a>
        <span>·</span>
        <a href="https://github.com/mPyle05" target="_blank" rel="noopener" class="hover:text-copper transition-colors">GitHub</a>
        <span>·</span>
        <a href="https://linkedin.com/in/mason-pyle" target="_blank" rel="noopener" class="hover:text-copper transition-colors">LinkedIn</a>
      </div>
    </div>
  `;
}

// ---- hero with 2-column layout & interactive developer terminal ------------
function renderHero() {
  const el = document.getElementById("hero-root");
  if (!el) return;
  const { hero, person } = siteData;
  const resumeHref = hero.primaryCta.href || person.resumeUrl;

  el.innerHTML = `
    <div class="relative">

      <!-- Ambient Radial Glow Backdrop (Linear/Vercel aesthetic) -->
      <div class="absolute -top-32 -left-20 w-[420px] sm:w-[680px] h-[420px] sm:h-[680px] bg-gradient-to-br from-copper/15 via-cyan/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" aria-hidden="true"></div>

      <!-- 2-Column Hero Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14 items-center">

        <!-- Left Column: Editorial & Bio -->
        <div class="relative">
          <div class="inline-flex items-center gap-2 font-mono text-xs text-copper bg-copper/10 border border-copper/20 px-3 py-1 rounded-full mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
            ${esc(person.tagline)}
          </div>
          
          <h1 class="font-display font-semibold text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] tracking-tight mb-7 text-ink">${esc(hero.heading)}</h1>
          <p class="text-xl sm:text-2xl font-medium text-ink leading-snug max-w-[34ch] mb-6">${esc(hero.subheading)}</p>
          <p class="text-base text-ink-dim leading-relaxed max-w-[54ch] mb-8">${esc(hero.paragraph)}</p>
          
          <div class="flex flex-wrap gap-3 items-center">
            <a class="btn btn-primary gap-2" href="${esc(resumeHref)}" target="_blank" rel="noopener">
              ${icons.download} ${esc(hero.primaryCta.label)}
            </a>
            <button class="btn btn-ghost gap-2" onclick="copyToClipboard('${esc(person.email)}', this)">
              ${icons.copy} Copy email
            </button>
          </div>
        </div>

        <!-- Right Column: Interactive Multi-Line Developer Terminal -->
        <div class="relative w-full max-w-lg mx-auto lg:max-w-none">
          <div class="term-window term-scanlines bg-[#05070A] border border-line/80 rounded-xl overflow-hidden font-mono text-xs">
            
            <!-- Minimalist Linux / Alacritty Window Header -->
            <div class="flex items-center justify-between px-4 py-2.5 bg-[#0C1015] border-b border-line select-none border-t border-white/[0.04]">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse"></span>
                <span class="text-[11px] text-ink font-medium tracking-wide">mason@dev-box: ~ (zsh)</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button type="button" class="w-2.5 h-2.5 rounded-full bg-[#363E4A] hover:bg-[#E06C75] transition-colors cursor-pointer border-0 p-0 focus:outline-none" title="Clear buffer" aria-label="Clear terminal buffer" id="term-btn-close"></button>
                <button type="button" class="w-2.5 h-2.5 rounded-full bg-[#363E4A] hover:bg-[#E5C07B] transition-colors cursor-pointer border-0 p-0 focus:outline-none" title="Reset height" aria-label="Reset terminal height" id="term-btn-min"></button>
                <button type="button" class="w-2.5 h-2.5 rounded-full bg-[#363E4A] hover:bg-[#98C379] transition-colors cursor-pointer border-0 p-0 focus:outline-none" title="Toggle expand" aria-label="Toggle terminal expand" id="term-btn-max"></button>
              </div>
            </div>

            <!-- Quick Run Command Chips -->
            <div class="flex items-center gap-1.5 px-3.5 py-2 bg-[#090C10] border-b border-line-soft text-[10px] overflow-x-auto flex-nowrap term-scrollbar select-none">
              <span class="text-ink-faint mr-1 font-medium shrink-0">Quick:</span>
              <button type="button" class="term-chip term-chip-cyan shrink-0" data-cmd="cat skills.md">cat skills.md</button>
              <button type="button" class="term-chip term-chip-copper shrink-0" data-cmd="ls -la /projects">ls -la /projects</button>
              <button type="button" class="term-chip term-chip-emerald shrink-0" data-cmd="whoami">whoami</button>
              <button type="button" class="term-chip term-chip-cyan shrink-0" data-cmd="pinout">pinout</button>
              <button type="button" class="term-chip term-chip-copper shrink-0" data-cmd="dmesg">dmesg</button>
              <button type="button" class="term-chip hover:border-line-hover text-ink-faint hover:text-ink shrink-0" data-cmd="clear">clear</button>
            </div>

            <!-- Terminal Scroll Body -->
            <div id="hero-term-body" class="term-scrollbar p-4 h-64 sm:h-72 lg:h-[320px] overflow-y-auto space-y-2.5 text-[11px] sm:text-[12px] leading-relaxed text-ink-dim select-text transition-[height] duration-200">
              <div class="text-ink-faint text-[10px] select-none">Mason Pyle Developer Environment | Type 'help' or click quick chips</div>
              <div id="hero-term-history" class="space-y-2.5"></div>
              
              <!-- Active Input Prompt Line -->
              <div class="flex items-center gap-1.5 pt-1" id="hero-term-prompt-line">
                <span class="text-emerald-400 font-semibold shrink-0">mason@dev-box</span><span class="text-cyan shrink-0">:~</span><span class="text-ink shrink-0">$</span>
                <input id="hero-term-input" type="text" placeholder="type 'help', 'cat skills.md'..." aria-label="Interactive terminal command input" class="bg-transparent border-none outline-none text-ink flex-1 font-mono text-[11px] sm:text-[12px] p-0 focus:ring-0 caret-cyan" autocomplete="off" spellcheck="false" />
              </div>
            </div>

            <!-- Terminal Status Footer -->
            <div class="px-4 py-1.5 bg-[#0C1015] border-t border-line flex items-center justify-between text-[10px] text-ink-faint">
              <span class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]"></span> Session: Active
              </span>
              <span>UTF-8 | tty1</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  `;

  initHeroTerminal();
}

// ---- interactive multi-line hero developer terminal -----------------------
function initHeroTerminal() {
  const historyEl = document.getElementById("hero-term-history");
  const inputEl = document.getElementById("hero-term-input");
  const bodyEl = document.getElementById("hero-term-body");
  if (!historyEl || !inputEl || !bodyEl) return;

  // Embedded project specifications
  const PROJECT_SPECS = {
    keyboard: `================================================================================
PROJECT: RP2040 Custom Mechanical Keyboard
CONTEXT: Hardware & Firmware | Dec 2024 - Jan 2026
STACK:   CircuitPython | KMK Firmware | RP2040 | KiCad PCB | NeoPixel RGB | CAD
================================================================================

OVERVIEW:
Custom 91-key mechanical keyboard engineered from bare PCB schematic to firmware:
* 10-row x 9-column diode matrix with 1N4148 diodes (COL2ROW) for 100% anti-ghosting.
* 82-pixel addressable NeoPixel chain driven at 60 Hz over RP2040 GPIO SDA.
* Custom MovingGradient procedural animation class extending KMK AnimationModes.
* Multi-layer KMK firmware keymaps: momentary navigation layer, RGB controls, function keys.
* Two-piece precision enclosure and switch plate modeled in CAD with acoustic dampening.

HARDWARE & FIRMWARE SPECS:
* Microcontroller: Raspberry Pi RP2040 Dual ARM Cortex-M0+ (CircuitPython runtime)
* Matrix Layout:   10 Rows x 9 Columns (91 key positions across 19 dedicated GPIOs)
* Diode Logic:     COL2ROW 1N4148 surface-mount diodes
* RGB Backlight:   82 addressable NeoPixels @ 60 Hz refresh rate
* Firmware Stack:  KMK Keyboard Framework + Custom procedural RGB extensions
* Enclosure:       Two-piece custom CAD enclosure toleranced for switch retention

SOURCE EXCERPT (firmware/code.py):
  rgb = RGB(pixel_pin=b.SDA, num_pixels=82, val_default=100, refresh_rate=60)
  keyboard.col_pins = (b.D9, b.A3, b.A2, b.A1, b.A0, b.SCK, b.MISO, b.MOSI, b.D10)
  keyboard.row_pins = (b.D0, b.D1, b.D2, b.D3, b.D4, b.D5, b.D6, b.D7, b.D8, b.SCL)
  keyboard.diode_orientation = DiodeOrientation.COL2ROW`,

    "solar-car": `================================================================================
PROJECT: Bearcat Solar Car | Low-Voltage Systems
CONTEXT: American Solar Challenge | UC Racing | Aug 2024 - Present
STACK:   CAN 2.0B | Embedded C# | KiCad | Safety-Critical | Telemetry | ARM
================================================================================

OVERVIEW:
Lead embedded software development for all low-voltage electronics on UC solar racer:
* Architected CAN 2.0B network operating at 500 kbps over 1,500+ miles of highway racing.
* CAN frame deserializer with timeout heartbeats, CRC parity validation, and thermal checks.
* Watchdog timer (250 ms timeout) triggering hardware fail-safe HV discharge if BMS packets stall.
* Low-voltage power distribution and lighting controller PCBs designed with Infineon PROFET switches.
* Real-time hardware-in-the-loop telemetry logging on Linux gateways for trackside race strategy.

HARDWARE & FIRMWARE SPECS:
* Bus Protocol:    CAN 2.0B @ 500 kbps (120-ohm terminated differential twisted pair)
* Telemetry Rate:  50 Hz critical BMS broadcast | 10 Hz auxiliary sensor broadcast
* Safety Systems:  Heartbeat watchdog timer with hardware fail-safe HV discharge interlock
* Driver Cockpit:  SPI-driven high-contrast driver HUD instrument cluster
* Isolation:       Galvanically isolated logic-to-inverter barrier protecting LV electronics

SOURCE EXCERPT (telemetry/CanDispatcher.cs):
  public void OnCanFrame(uint id, byte[] data, byte dlc) {
      if (id == ID_BMS_VOLTS) {
          _latest.TotalVoltage = ((data[0] << 8) | data[1]) * 0.1f;
          _watchdog.Restart();
      }
  }`,

    homelab: `================================================================================
PROJECT: Self-Hosted Home Lab Infrastructure
CONTEXT: Production Proxmox VE & Docker Fleet | 2024 - Present
STACK:   Proxmox VE | Docker Compose | WireGuard | Cloudflare Tunnel | Linux
================================================================================

OVERVIEW:
Modular, production-grade self-hosted infrastructure running on Proxmox VE:
* 10 decoupled Docker Compose directory stacks for independent lifecycle and update management.
* Cloudflare Zero Trust Tunnel routing encrypted ingress with zero open router ports.
* Strict WireGuard VPN kill-switch pod (Gluetun) isolating media downloaders from host network.
* TRaSH Guides atomic hardlink architecture: instant zero-copy file movement across ZFS datasets.
* Passed through host GPU acceleration (/dev/dri) to Jellyfin for real-time 4K/HDR transcoding.
* Home Assistant deployed on host networking with Python Matter controller for Thread and Wi-Fi IoT.

SYSTEM & ARCHITECTURE SPECS:
* Hypervisor:      Proxmox VE bare-metal on Lenovo desktop (x86_64)
* Storage Subsys:  ZFS storage pool managed via LXC bind-mount (TRaSH atomic hardlinks)
* Container Fleet: 10 decoupled stacks (cloudflare, homarr, home-assistant, immich,
                   jellyfin, kavita, obsidian, servarr, vaultwarden, webdav)
* Network Sec:     Zero open inbound router ports | Cloudflare Zero Trust tunnel ingress
* VPN Isolation:   WireGuard namespace killswitch container binding qBittorrent & Prowlarr
* Hardware Accel:  Direct GPU pass-through (/dev/dri) for hardware video transcode`,

    vexu: `================================================================================
PROJECT: UC VEX U Robotics | Autonomous Odometry (C1NCY)
CONTEXT: UC Collegiate Robotics | Co-Founder & Programming Lead | Apr 2025 - Present
STACK:   C++ | Odometry | Sensor Fusion | PID Control | State Machines | Autonomy
================================================================================

OVERVIEW:
Co-founded UC's first collegiate VEX U team and engineered technical chassis autonomy:
* 3-wheel tracking odometry (2 forward, 1 lateral) achieving <2 mm positional accuracy.
* Sensor fusion: 360 ticks/rev quadrature encoders fused with 3-axis IMU gyro via complementary filter.
* Cascading PID controllers with slew-rate limiting for heading stabilization and trajectory following.
* Asynchronous 100 Hz RTOS odometry loop managing chassis kinematics, intake, and pneumatics.
* Served as co-founder, programming lead, and treasurer managing team budget and university compliance.

TECHNICAL SPECS:
* Resolution:      360 ticks/rev quadrature (0.28 mm per tick tracking precision)
* Odometry Rate:   100 Hz dedicated background thread (10 ms period)
* Heading Hold:    +/-0.5 deg accuracy over 45-second autonomous run via IMU gyro fusion
* Motion Control:  Dual closed-loop PID (translation displacement + angular heading correction)
* Role:            Co-Founder, Programming Lead & Club Treasurer

SOURCE EXCERPT (odometry/odometry_tracker.cpp):
  double dTheta = (dL - dR) / TRACK;
  double avg = pose.theta + dTheta * 0.5;
  pose.x += dy_local * std::sin(avg) + dx_local * std::cos(avg);
  pose.y += dy_local * std::cos(avg) - dx_local * std::sin(avg);
  pose.theta = imu_rad; // fuse with IMU gyro`,

    fpv: `================================================================================
PROJECT: FPV Drone Engineering & Tuning
CONTEXT: FPV Drone Systems & High-Thrust Avionics | 2023 - Present
STACK:   Betaflight | PID Tuning | ESC / BLHeli_32 | DJI O4 Lite | Soldering | RF
================================================================================

OVERVIEW:
Assembling, soldering, configuring, and flight-tuning freestyle quadcopters from bare frames:
* Custom airframes: 75mm 1S brushless miniwhoop, 3-inch deadcat, and 5-inch freestyle quad.
* Configured Betaflight 4.5: bidirectional DSHOT600, RPM notch filtering, and dynamic harmonics.
* Iterative PID loop tuning and flight performance verification via Blackbox flight log analysis.
* Integrated DJI O4 Lite digital HD video transmission over UART MSP for low-latency OSD telemetry.
* Holds FAA Part 107 Remote Pilot Certificate; operates within all authorized airspace limits.

AVIONICS & RADIO SPECS:
* Flight Stack:    Mateksys 3-in-1 FC / ESC stack (ARM Cortex-M7 / STM32F722 target)
* Motor Protocol:  Bidirectional DSHOT600 with RPM telemetry feedback to flight controller
* Digital Video:   DJI O4 Lite (1080p @ 120 fps or 4K @ 60 fps, ~35 ms latency)
* Radio Link:      ExpressLRS (ELRS) 2.4 GHz packet rate @ 500 Hz
* Data Analysis:   Betaflight Blackbox Explorer FFT noise filtering and step response analysis

CONFIG EXCERPT (betaflight_cli_diff.txt):
  set dshot_bidir = ON
  set rpm_filter_harmonics = 3
  set dyn_notch_count = 3
  set motor_pwm_protocol = DSHOT600`,
  };

  const SKILLS_OUTPUT = `<div class="space-y-1.5 font-mono text-[11px] leading-relaxed select-text">
<div class="text-ink font-semibold">ENGINEERING SKILLS MATRIX | MASON PYLE</div>
<div class="text-ink-dim text-[10.5px]">Embedded Systems &amp; Firmware Engineer | UC Accelerated M.Eng. &amp; B.S. (VLSI)</div>
<div class="border-t border-line-soft my-1"></div>
<div><span class="text-copper font-semibold">[FIRMWARE]</span>   Bare-Metal C/C++, FreeRTOS, RP2040, ARM Cortex-M, CircuitPython/KMK</div>
<div><span class="text-cyan font-semibold">[PROTOCOLS]</span>  CAN 2.0B, SPI, I2C, UART, USB HID, Zero-Copy Atomic Hardlinks</div>
<div><span class="text-emerald-400 font-semibold">[HARDWARE]</span>   KiCad Multi-Layer PCB Routing, Anti-Ghosting Diode Logic, Oscilloscopes</div>
<div><span class="text-ink font-semibold">[INFRA]</span>      Proxmox VE, Docker Compose, WireGuard VPN Killswitch, Cloudflare Tunnel</div>
</div>`;

  const LS_PROJECTS_OUTPUT = `<div class="flex flex-wrap gap-4 font-mono text-[11px] select-text">
  <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/solar-car">solar-car/</button>
  <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/keyboard">keyboard/</button>
  <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/homelab">homelab/</button>
  <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/vexu">vexu/</button>
  <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/fpv">fpv/</button>
</div>`;

  const LS_LA_PROJECTS_OUTPUT = `<div class="space-y-1 font-mono text-[11px] leading-snug select-text">
<div class="text-ink-faint">total 20</div>
<div>drwxr-xr-x 7 mason staff 224 Nov 14 00:00 .</div>
<div>drwxr-xr-x 3 mason staff  96 Nov 14 00:00 ..</div>
<div>drwxr-xr-x 2 mason staff  64 Nov 14 00:00 <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/keyboard">keyboard/</button>    | RP2040 10x9 Matrix + 82 NeoPixels (CircuitPython/KMK)</div>
<div>drwxr-xr-x 2 mason staff  64 Nov 14 00:00 <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/solar-car">solar-car/</button>   | Bearcat Solar Car | Low-Voltage CAN 2.0B Bus</div>
<div>drwxr-xr-x 2 mason staff  64 Nov 14 00:00 <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/homelab">homelab/</button>     | Proxmox VE + 10 Decoupled Docker Compose Stacks</div>
<div>drwxr-xr-x 2 mason staff  64 Nov 14 00:00 <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/vexu">vexu/</button>        | UC VEX U Robotics | 3-Wheel Tracking Odometry (100 Hz)</div>
<div>drwxr-xr-x 2 mason staff  64 Nov 14 00:00 <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/fpv">fpv/</button>         | Freestyle Quadcopters | Betaflight PID Tuning</div>
<div class="pt-1.5 text-[10px] text-ink-faint select-none">Tip: Click any directory name or run 'cat projects/&lt;name&gt;' to view spec.</div>
</div>`;

  const LS_ROOT_OUTPUT = `<div class="flex flex-wrap gap-4 font-mono text-[11px] select-text">
  <button type="button" class="term-link font-semibold text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="ls -la /projects">projects/</button>
  <button type="button" class="term-link font-semibold text-ink hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat skills.md">skills.md</button>
  <a href="/resume.pdf" target="_blank" rel="noopener" class="term-link font-semibold text-copper hover:underline">resume.pdf</a>
  <button type="button" class="term-link font-semibold text-emerald-400 hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="pinout">pinout.txt</button>
</div>`;

  const WHOAMI_OUTPUT = `<div class="space-y-1 font-mono text-[11px] leading-relaxed select-text">
<div><span class="text-ink font-semibold">User:</span>        mason (UID: 1000, GID: 1000)</div>
<div><span class="text-ink font-semibold">Host:</span>        dev-box (Debian GNU/Linux 12)</div>
<div><span class="text-ink font-semibold">Full Name:</span>   Mason Pyle</div>
<div><span class="text-ink font-semibold">Role:</span>        Embedded Systems &amp; Firmware Engineer</div>
<div><span class="text-ink font-semibold">Location:</span>    Cincinnati, OH</div>
<div><span class="text-ink font-semibold">University:</span>  University of Cincinnati | Accelerated M.Eng. &amp; B.S. in Computer Engineering</div>
<div><span class="text-ink font-semibold">Focus:</span>       VLSI Design &amp; Hardware-Software Co-Design (3.93 GPA | Expected May 2029)</div>
<div><span class="text-ink font-semibold">Credentials:</span> FAA Part 107 Remote Pilot | Six Sigma Black Belt (PMI)</div>
<div><span class="text-ink font-semibold">Email:</span>       <a href="mailto:hello@masonpyle.com" class="text-cyan hover:text-copper underline">hello@masonpyle.com</a></div>
<div><span class="text-ink font-semibold">GitHub:</span>      <a href="https://github.com/mPyle05" target="_blank" rel="noopener" class="text-cyan hover:text-copper underline">https://github.com/mPyle05</a></div>
<div><span class="text-ink font-semibold">LinkedIn:</span>    <a href="https://linkedin.com/in/mason-pyle" target="_blank" rel="noopener" class="text-cyan hover:text-copper underline">https://linkedin.com/in/mason-pyle</a></div>
<div><span class="text-ink font-semibold">Status:</span>      Open to Embedded Systems / Firmware Co-ops &amp; Engineering Roles</div>
</div>`;

  const DMESG_OUTPUT = `<div class="space-y-0.5 font-mono text-[11px] leading-snug select-text">
<div><span class="text-emerald-400">[    0.000000]</span> Linux version 6.8.0-45-embedded (gcc 13.2.0) #45-Ubuntu SMP PREEMPT_DYNAMIC</div>
<div><span class="text-emerald-400">[    0.000001]</span> Command line: BOOT_IMAGE=/vmlinuz-6.8.0 root=UUID=mpyle-dev ro quiet console=tty0</div>
<div><span class="text-emerald-400">[    0.000004]</span> x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'</div>
<div><span class="text-emerald-400">[    0.312048]</span> clocksource: tsc-early: mask: 0xffffffffffffffff max_cycles: 0x3344556677</div>
<div><span class="text-emerald-400">[    0.684210]</span> pci 0000:00:14.0: xHCI Host Controller (USB 3.0) registered</div>
<div><span class="text-emerald-400">[    1.120455]</span> usb 1-1.2: New USB device found, idVendor=2e8a, idProduct=0003, bcdDevice= 1.00</div>
<div><span class="text-emerald-400">[    1.120462]</span> usb 1-1.2: Product: Raspberry Pi RP2040 Bootloader / CDC-ACM</div>
<div><span class="text-emerald-400">[    1.121890]</span> cdc_acm 1-1.2:1.0: ttyACM0: USB ACM device (RP2040 Dual Cortex-M0+ Debug Console)</div>
<div><span class="text-emerald-400">[    1.450112]</span> can: controller area network core</div>
<div><span class="text-emerald-400">[    1.450150]</span> can: raw protocol</div>
<div><span class="text-emerald-400">[    1.482090]</span> mcp251xfd spi0.0 can0: MCP2518FD rev 0x01 initialized (CAN 2.0B @ 500 kbps)</div>
<div><span class="text-emerald-400">[    1.482105]</span> can0: bit-timing: prop_seg=4, phase_seg1=5, phase_seg2=6, sjw=1, brp=2</div>
<div><span class="text-emerald-400">[    1.520440]</span> i2c_designware 0000:00:15.0: Synopsys DesignWare I2C adapter initialized</div>
<div><span class="text-emerald-400">[    1.789120]</span> spi_master spi0: registered master spi0 (max speed: 50000000 Hz)</div>
<div><span class="text-emerald-400">[    2.045100]</span> eth0: Link is Up - 1000Mbps/Full - flow control rx/tx</div>
<div><span class="text-emerald-400">[    2.105420]</span> systemd[1]: Reached target Embedded Engineering Workstation Ready.</div>
<div class="pt-1 text-[10px] text-ink-faint select-none">Tip: Run <button type="button" class="term-link text-copper hover:text-cyan cursor-pointer underline bg-transparent border-0 p-0" data-cmd="pinout">pinout</button> or <button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0" data-cmd="cat projects/solar-car">cat projects/solar-car</button></div>
</div>`;

  const RP2040_ASCII = `          Raspberry Pi RP2040 (Pico DIP-40 Pinout)
                   +------------------+
   (UART0 TX)  GP0 | [01]        [40] | VBUS (5V USB)
   (UART0 RX)  GP1 | [02]        [39] | VSYS (1.8V - 5.5V)
               GND | [03]        [38] | GND
   (I2C1 SDA)  GP2 | [04]        [37] | 3V3_EN
   (I2C1 SCL)  GP3 | [05]        [36] | 3V3_OUT (3.3V)
   (SPI0 RX)   GP4 | [06]        [35] | ADC_VREF
   (SPI0 CSn)  GP5 | [07]        [34] | GP28 (ADC2)
               GND | [08]        [33] | GND
   (SPI0 SCK)  GP6 | [09]        [32] | GP27 (ADC1)
   (SPI0 TX)   GP7 | [10]  [RP2040]  [31] | GP26 (ADC0)
   (I2C0 SDA)  GP8 | [11] Dual ARM   [30] | RUN (Reset)
   (I2C0 SCL)  GP9 | [12] Cortex-M0+ [29] | GP22
               GND | [13] @ 133 MHz  [28] | GND
   (UART1 TX) GP10 | [14]            [27] | GP21 (I2C0 SCL)
   (UART1 RX) GP11 | [15]            [26] | GP20 (I2C0 SDA)
   (SPI1 RX)  GP12 | [16]            [25] | GP19 (SPI0 TX)
   (SPI1 CSn) GP13 | [17]            [24] | GP18 (SPI0 SCK)
               GND | [18]            [23] | GND
   (SPI1 SCK) GP14 | [19]            [22] | GP17 (SPI0 CSn)
   (SPI1 TX)  GP15 | [20]        [21] | GP16 (SPI0 RX)
                   +------------------+
               SWD: [SWCLK] [GND] [SWDIO]`;

  const STM32_ASCII = `          STM32F401 / STM32F411 (Black Pill Pinout)
                   +------------------+
               B12 | [01]        [40] | B10 (I2C2 SCL)
               B13 | [02]        [39] | B2 (BOOT1)
               B14 | [03]        [38] | B1
               B15 | [04]        [37] | B0
               A8  | [05]        [36] | A7 (SPI1 MOSI)
   (USART1 TX) A9  | [06]        [35] | A6 (SPI1 MISO)
   (USART1 RX) A10 | [07]  [STM32]   [34] | A5 (SPI1 SCK)
   (USB D-)    A11 | [08] Cortex-M4F [33] | A4 (SPI1 NSS)
   (USB D+)    A12 | [09] @ 100 MHz  [32] | A3
   (SWDIO)     A13 | [10]            [31] | A2
   (SWCLK)     A14 | [11]            [30] | A1
               A15 | [12]            [29] | A0 (WKUP)
               B3  | [13]            [28] | NRST (Reset)
               B4  | [14]            [27] | 3V3
               B5  | [15]            [26] | GND
   (I2C1 SCL)  B6  | [16]            [25] | GND
   (I2C1 SDA)  B7  | [17]            [24] | VBAT
               B8  | [18]            [23] | PC13 (LED)
               B9  | [19]            [22] | PC14 (OSC32_IN)
               5V  | [20]        [21] | PC15 (OSC32_OUT)
                   +------------------+
               SWD: [SWCLK] [GND] [SWDIO]`;

  const PINOUT_RP2040_HTML = `<div class="space-y-1 font-mono text-[10px] sm:text-[10.5px] leading-tight select-text">
<div class="text-copper font-semibold">Raspberry Pi RP2040 (Pico DIP-40 Pinout)</div>
<pre class="text-ink-dim whitespace-pre overflow-x-auto leading-tight">${esc(RP2040_ASCII)}</pre>
<div class="text-[10px] text-ink-dim">Core Peripherals: 2x UART | 2x SPI | 2x I2C | 8x PIO State Machines | 16x PWM</div>
<div class="text-[10px] text-ink-faint select-none">Tip: Run <button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="pinout stm32">pinout stm32</button> to view STM32 Cortex-M4 pinout.</div>
</div>`;

  const PINOUT_STM32_HTML = `<div class="space-y-1 font-mono text-[10px] sm:text-[10.5px] leading-tight select-text">
<div class="text-copper font-semibold">STM32F401 / STM32F411 (Black Pill Pinout)</div>
<pre class="text-ink-dim whitespace-pre overflow-x-auto leading-tight">${esc(STM32_ASCII)}</pre>
<div class="text-[10px] text-ink-dim">Core Peripherals: Cortex-M4F with FPU | USB OTG | 3x USART | 3x SPI | 3x I2C</div>
<div class="text-[10px] text-ink-faint select-none">Tip: Run <button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="pinout rp2040">pinout rp2040</button> to view RP2040 pinout.</div>
</div>`;

  const CONTACT_OUTPUT = `<div class="space-y-1 font-mono text-[11px] leading-relaxed select-text">
<div class="text-ink font-semibold">Direct Inquiries &amp; Professional Profiles | Mason Pyle:</div>
<div>Email:    <a href="mailto:hello@masonpyle.com" class="text-cyan hover:text-copper underline">hello@masonpyle.com</a></div>
<div>GitHub:   <a href="https://github.com/mPyle05" target="_blank" rel="noopener" class="text-cyan hover:text-copper underline">https://github.com/mPyle05</a></div>
<div>LinkedIn: <a href="https://linkedin.com/in/mason-pyle" target="_blank" rel="noopener" class="text-cyan hover:text-copper underline">https://linkedin.com/in/mason-pyle</a></div>
<div>Resume:   <a href="/resume.pdf" target="_blank" rel="noopener" class="text-copper hover:underline">https://masonpyle.com/resume.pdf</a></div>
<div>Location: Cincinnati, OH</div>
<div class="pt-1 text-[10px] text-ink-dim">Open to embedded systems, firmware, and hardware engineering co-ops and roles.</div>
</div>`;

  const HELP_OUTPUT = `<div class="space-y-2 font-mono text-[11px] leading-relaxed select-text">
<div class="text-ink font-semibold">Available Commands (click any command to execute):</div>

<div class="space-y-1">
  <div class="text-copper font-semibold text-[10.5px] uppercase tracking-wider">[Core Filesystem &amp; Navigation]</div>
  <div class="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-2 gap-y-0.5 pl-2">
    <div><button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="cat skills.md">cat skills.md</button></div>
    <div class="text-ink-dim">Inspect firmware, protocols, and hardware skills</div>
    <div><button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="ls /projects">ls /projects</button></div>
    <div class="text-ink-dim">List engineering project directory names</div>
    <div><button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="ls -la /projects">ls -la /projects</button></div>
    <div class="text-ink-dim">Detailed project listing with architectural summaries</div>
    <div><button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="cat projects/solar-car">cat projects/&lt;name&gt;</button></div>
    <div class="text-ink-dim">Read technical specs (solar-car, keyboard, homelab, vexu, fpv)</div>
  </div>
</div>

<div class="space-y-1">
  <div class="text-emerald-400 font-semibold text-[10.5px] uppercase tracking-wider">[System &amp; Diagnostics]</div>
  <div class="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-2 gap-y-0.5 pl-2">
    <div><button type="button" class="term-link text-emerald-400 hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="whoami">whoami</button></div>
    <div class="text-ink-dim">Display engineer identity, education, and credentials</div>
    <div><button type="button" class="term-link text-emerald-400 hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="dmesg">dmesg</button></div>
    <div class="text-ink-dim">Inspect simulated hardware boot log &amp; peripheral probe</div>
    <div><button type="button" class="term-link text-emerald-400 hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="uname -a">uname -a</button></div>
    <div class="text-ink-dim">Print kernel, OS, and architecture specifications</div>
    <div><button type="button" class="term-link text-emerald-400 hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="pinout">pinout [mcu]</button></div>
    <div class="text-ink-dim">ASCII pinout diagram ('pinout' for RP2040, 'pinout stm32')</div>
  </div>
</div>

<div class="space-y-1">
  <div class="text-cyan font-semibold text-[10.5px] uppercase tracking-wider">[Portfolio Utilities]</div>
  <div class="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-2 gap-y-0.5 pl-2">
    <div><button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="contact">contact</button></div>
    <div class="text-ink-dim">Display direct email and social profiles</div>
    <div><button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="clear">clear</button></div>
    <div class="text-ink-dim">Clear terminal scroll buffer</div>
    <div><button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="sudo">sudo [cmd]</button></div>
    <div class="text-ink-dim">Test hardware privilege interlock</div>
    <div><button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="reboot">reboot</button></div>
    <div class="text-ink-dim">Restart developer terminal session</div>
  </div>
</div>

<div class="pt-1 text-[10px] text-ink-faint select-none">Tip: Click quick chips above or press Tab for auto-completion.</div>
</div>`;

  const SUDO_OUTPUT = `<div class="space-y-0.5 font-mono text-[11px] leading-snug select-text">
<div>[sudo] password for mason: *******</div>
<div class="text-amber-400">Permission denied: Hardware interlock engaged. Privileged execution is disabled on production target.</div>
</div>`;

  function resolveCommand(raw) {
    const trimmed = raw.trim();
    const tokens = trimmed.split(/\s+/);
    const lowerTokens = tokens.map((t) => t.toLowerCase());
    const cmd = lowerTokens[0] || "";
    const arg1 = lowerTokens[1] || "";

    // 1. cat dispatcher
    if (cmd === "cat") {
      if (!arg1) {
        return {
          type: "html",
          content: `<span class="text-amber-400">cat: missing file operand. Try 'cat skills.md' or 'cat projects/&lt;name&gt;'.</span>`,
        };
      }
      if (arg1 === "skills.md" || arg1 === "skills" || arg1 === "/skills.md") {
        return { type: "html", content: SKILLS_OUTPUT };
      }
      if (arg1 === "/projects" || arg1 === "projects" || arg1 === "/projects/" || arg1 === "projects/") {
        return {
          type: "html",
          content: `<span class="text-amber-400">cat: ${esc(tokens[1])}: Is a directory. Use <button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="ls /projects">ls /projects</button></span>`,
        };
      }
      if (arg1.startsWith("projects/") || arg1.startsWith("/projects/")) {
        const slug = arg1.replace(/^\/?projects\//, "").replace(/\/$/, "");
        if (PROJECT_SPECS[slug]) {
          const specText = esc(PROJECT_SPECS[slug]);
          const footerHtml = `<div class="pt-2 flex flex-wrap items-center gap-3 font-mono text-[11px]">
  <a href="/projects/${esc(slug)}/" class="text-copper hover:underline inline-flex items-center gap-1 font-medium">Open technical spec &rarr;</a>
  <span class="text-line">|</span>
  <button type="button" class="term-link cursor-pointer underline text-cyan hover:text-copper bg-transparent border-0 p-0 font-mono" data-cmd="ls -la /projects">Back to projects list</button>
</div>`;
          return {
            type: "html",
            content: `${specText}\n${footerHtml}`,
          };
        }
        return {
          type: "html",
          content: `<span class="text-amber-400">cat: projects/${esc(slug)}: No such project file. Available: solar-car, keyboard, homelab, vexu, fpv</span>`,
        };
      }
      if (PROJECT_SPECS[arg1]) {
        const specText = esc(PROJECT_SPECS[arg1]);
        const footerHtml = `<div class="pt-2 flex flex-wrap items-center gap-3 font-mono text-[11px]">
  <a href="/projects/${esc(arg1)}/" class="text-copper hover:underline inline-flex items-center gap-1 font-medium">Open technical spec &rarr;</a>
  <span class="text-line">|</span>
  <button type="button" class="term-link cursor-pointer underline text-cyan hover:text-copper bg-transparent border-0 p-0 font-mono" data-cmd="ls -la /projects">Back to projects list</button>
</div>`;
        return {
          type: "html",
          content: `${specText}\n${footerHtml}`,
        };
      }
      if (arg1 === "readme.txt" || arg1 === "readme.md") {
        return {
          type: "html",
          content: `Mason Pyle Portfolio | Embedded Systems &amp; Firmware Engineer. Type '<button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="help">help</button>' for commands.`,
        };
      }
      return {
        type: "html",
        content: `<span class="text-amber-400">cat: ${esc(tokens[1])}: No such file or directory</span>`,
      };
    }

    // 2. ls dispatcher
    if (cmd === "ls") {
      const isLong = lowerTokens.includes("-la") || lowerTokens.includes("-l") || lowerTokens.includes("-al");
      const hasProjectsArg = lowerTokens.some((t) => t.includes("project"));

      if (isLong) {
        return { type: "html", content: LS_LA_PROJECTS_OUTPUT };
      }
      if (hasProjectsArg) {
        return { type: "html", content: LS_PROJECTS_OUTPUT };
      }
      if (!arg1 || arg1 === "~" || arg1 === ".") {
        return { type: "html", content: LS_ROOT_OUTPUT };
      }
      return { type: "html", content: LS_PROJECTS_OUTPUT };
    }

    // 3. whoami / id
    if (cmd === "whoami" || cmd === "id") {
      return { type: "html", content: WHOAMI_OUTPUT };
    }

    // 4. dmesg
    if (cmd === "dmesg") {
      return { type: "html", content: DMESG_OUTPUT };
    }

    // 5. uname
    if (cmd === "uname") {
      if (lowerTokens.includes("-a")) {
        return {
          type: "text",
          content: "Linux dev-box 6.8.0-45-embedded #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 x86_64 x86_64 GNU/Linux",
        };
      }
      return { type: "text", content: "Linux" };
    }

    // 6. pinout
    if (cmd === "pinout") {
      if (arg1 === "stm32") {
        return { type: "html", content: PINOUT_STM32_HTML };
      }
      return { type: "html", content: PINOUT_RP2040_HTML };
    }

    // 7. contact / email
    if (cmd === "contact" || cmd === "email") {
      return { type: "html", content: CONTACT_OUTPUT };
    }

    // 8. help / ? / man
    if (cmd === "help" || cmd === "?" || cmd === "man") {
      return { type: "html", content: HELP_OUTPUT };
    }

    // 9. sudo
    if (cmd === "sudo") {
      return { type: "html", content: SUDO_OUTPUT };
    }

    // Unrecognized
    return {
      type: "html",
      content: `<div>zsh: command not found: <span class="text-amber-400">${esc(trimmed)}</span>. Type '<button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="help">help</button>' for available commands.</div>`,
    };
  }

  // Interactive state
  const cmdHistory = [];
  let historyIndex = 0;
  let tempDraft = "";
  const autoPlayTimers = [];
  let isAutoPlaying = true;

  function cancelAutoPlay() {
    if (!isAutoPlaying) return;
    isAutoPlaying = false;
    autoPlayTimers.forEach((t) => clearTimeout(t));
    autoPlayTimers.length = 0;
    inputEl.placeholder = "type 'help', 'cat skills.md'...";
  }

  function handleReboot() {
    historyEl.innerHTML = "";
    const rebootMsg = document.createElement("div");
    rebootMsg.className = "space-y-1 font-mono text-[11px] text-amber-400 select-text";
    rebootMsg.innerHTML = `<div>Broadcast message from mason@dev-box (tty1):</div>
<div>The system is going down for reboot NOW!</div>
<div class="pt-1 text-ink-dim">Restarting system...</div>
<div>[ <span class="text-emerald-400">OK</span> ] Stopped target Multi-User System.</div>
<div>[ <span class="text-emerald-400">OK</span> ] Unmounted /projects.</div>
<div>[ <span class="text-emerald-400">OK</span> ] Reached target System Reboot.</div>`;
    historyEl.appendChild(rebootMsg);
    bodyEl.scrollTop = bodyEl.scrollHeight;

    setTimeout(() => {
      historyEl.innerHTML = "";
      const welcome = document.createElement("div");
      welcome.className = "text-ink-faint text-[10px] select-none";
      welcome.textContent = "Mason Pyle Developer Environment | Type 'help' or click quick chips";
      historyEl.appendChild(welcome);
      bodyEl.scrollTop = 0;
    }, 1200);
  }

  function execute(cmdStr) {
    const raw = cmdStr.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    if (lower === "clear" || lower === "cls") {
      historyEl.innerHTML = "";
      bodyEl.scrollTop = 0;
      return;
    }

    if (lower === "reboot") {
      handleReboot();
      return;
    }

    const entry = document.createElement("div");
    entry.className = "space-y-1";

    const promptLine = document.createElement("div");
    promptLine.innerHTML = `<span class="text-emerald-400 font-semibold">mason@dev-box</span><span class="text-cyan">:~</span><span class="text-ink">$</span> <span class="text-ink font-semibold">${esc(raw)}</span>`;
    entry.appendChild(promptLine);

    const response = resolveCommand(raw);

    const outputContainer = document.createElement("div");
    outputContainer.className = "text-ink-dim text-[11px] sm:text-[12px] whitespace-pre-wrap break-words font-mono leading-relaxed select-text";

    if (response.type === "html") {
      outputContainer.innerHTML = response.content;
    } else {
      outputContainer.textContent = response.content;
    }
    entry.appendChild(outputContainer);

    historyEl.appendChild(entry);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function runCommand(cmdStr) {
    cancelAutoPlay();
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    if (lower !== "clear" && lower !== "cls") {
      if (cmdHistory.length === 0 || cmdHistory[cmdHistory.length - 1] !== trimmed) {
        cmdHistory.push(trimmed);
      }
    }
    historyIndex = cmdHistory.length;
    tempDraft = "";
    execute(trimmed);
    inputEl.value = "";
    inputEl.focus();
  }

  // Quick Chips click handler
  document.querySelectorAll(".term-chip").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const cmd = btn.dataset.cmd;
      if (cmd) {
        btn.classList.add("ring-1", "ring-cyan/60", "bg-cyan/15", "text-cyan");
        setTimeout(() => {
          btn.classList.remove("ring-1", "ring-cyan/60", "bg-cyan/15", "text-cyan");
        }, 350);
        runCommand(cmd);
      }
    });
  });

  // Window header controls
  const closeBtn = document.getElementById("term-btn-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => runCommand("clear"));
  }
  const minBtn = document.getElementById("term-btn-min");
  if (minBtn) {
    minBtn.addEventListener("click", () => {
      bodyEl.classList.remove("lg:h-[460px]");
      bodyEl.classList.add("lg:h-[320px]");
      bodyEl.scrollTop = bodyEl.scrollHeight;
    });
  }
  const maxBtn = document.getElementById("term-btn-max");
  if (maxBtn) {
    maxBtn.addEventListener("click", () => {
      bodyEl.classList.toggle("lg:h-[320px]");
      bodyEl.classList.toggle("lg:h-[460px]");
      bodyEl.scrollTop = bodyEl.scrollHeight;
    });
  }

  // Body event delegation for clickable links / chips and auto-focus
  bodyEl.addEventListener("click", (e) => {
    cancelAutoPlay();
    const trigger = e.target.closest("[data-cmd]");
    if (trigger) {
      const cmd = trigger.getAttribute("data-cmd");
      if (cmd) {
        runCommand(cmd);
        return;
      }
    }
    if (e.target.closest("a")) return;
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    inputEl.focus();
  });

  // Tab auto-completion catalog
  const completionCorpus = [
    "cat skills.md",
    "cat projects/solar-car",
    "cat projects/keyboard",
    "cat projects/homelab",
    "cat projects/vexu",
    "cat projects/fpv",
    "ls",
    "ls /projects",
    "ls -la /projects",
    "whoami",
    "dmesg",
    "uname -a",
    "pinout",
    "pinout stm32",
    "pinout rp2040",
    "contact",
    "help",
    "clear",
    "sudo",
    "reboot",
  ];

  function handleTabCompletion() {
    const current = inputEl.value;
    const trimmed = current.trimStart();
    if (!trimmed) return;

    const matches = completionCorpus.filter((c) => c.startsWith(trimmed.toLowerCase()));
    if (matches.length === 1) {
      inputEl.value = matches[0];
      inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
    } else if (matches.length > 1) {
      // Find longest common prefix
      let lcp = matches[0];
      for (let i = 1; i < matches.length; i++) {
        while (!matches[i].startsWith(lcp)) {
          lcp = lcp.slice(0, -1);
        }
      }
      if (lcp.length > trimmed.length) {
        inputEl.value = lcp;
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
      } else {
        // Output matching candidates to history buffer
        const hintEntry = document.createElement("div");
        hintEntry.className = "text-ink-faint text-[10.5px] py-1 flex flex-wrap gap-2 select-text";
        hintEntry.innerHTML = matches
          .map(
            (m) =>
              `<button type="button" class="term-link text-cyan hover:text-copper cursor-pointer underline bg-transparent border-0 p-0 font-mono" data-cmd="${esc(
                m
              )}">${esc(m)}</button>`
          )
          .join("  ");
        historyEl.appendChild(hintEntry);
        bodyEl.scrollTop = bodyEl.scrollHeight;
      }
    }
  }

  // Keyboard navigation & execution
  inputEl.addEventListener("keydown", (e) => {
    cancelAutoPlay();

    if (e.key === "Enter") {
      e.preventDefault();
      const val = inputEl.value;
      runCommand(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      if (historyIndex === cmdHistory.length) {
        tempDraft = inputEl.value;
      }
      if (historyIndex > 0) {
        historyIndex--;
        inputEl.value = cmdHistory[historyIndex];
        setTimeout(() => inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length), 0);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        historyIndex++;
        inputEl.value = cmdHistory[historyIndex];
        setTimeout(() => inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length), 0);
      } else if (historyIndex === cmdHistory.length - 1) {
        historyIndex = cmdHistory.length;
        inputEl.value = tempDraft;
        setTimeout(() => inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length), 0);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    }
  });

  inputEl.addEventListener("input", () => {
    cancelAutoPlay();
  });

  // Hybrid Auto-Play: initial realistic typing demo
  function autoType(cmdText, delay, cb) {
    const timeoutId = setTimeout(() => {
      if (!isAutoPlaying) return;
      let i = 0;
      inputEl.placeholder = "";
      const timer = setInterval(() => {
        if (!isAutoPlaying) {
          clearInterval(timer);
          return;
        }
        i++;
        inputEl.value = cmdText.slice(0, i);
        if (i >= cmdText.length) {
          clearInterval(timer);
          const subTimeout = setTimeout(() => {
            if (!isAutoPlaying) return;
            runCommand(cmdText);
            inputEl.placeholder = "type 'help', 'cat skills.md'...";
            if (cb) cb();
          }, 350);
          autoPlayTimers.push(subTimeout);
        }
      }, 35);
      autoPlayTimers.push(timer);
    }, delay);
    autoPlayTimers.push(timeoutId);
  }

  // Kick off automatic boot presentation on load
  autoType("cat skills.md", 700, () => {
    autoType("ls -la /projects", 1400);
  });
}

// ---- elevated project card with full-surface clickability -------------------
function projectCardHtml(project) {
  const extLink = project.links.site
    ? `<a href="${esc(project.links.site)}" target="_blank" rel="noopener" class="relative z-20 text-ink-faint hover:text-copper transition-colors p-1" aria-label="External site">${icons.external}</a>`
    : project.links.repo
      ? `<a href="${esc(project.links.repo)}" target="_blank" rel="noopener" class="relative z-20 text-ink-faint hover:text-copper transition-colors p-1" aria-label="GitHub">${icons.github}</a>`
      : "";

  return `
    <article class="card-elevated p-7 flex flex-col justify-between relative group">
      <!-- Stretched anchor: entire card is clickable -->
      <a href="/projects/${esc(project.slug)}/" class="absolute inset-0 z-10 rounded-xl" aria-label="View project: ${esc(project.title)}"></a>

      <div class="flex-1 flex flex-col gap-4">
        <div class="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-2">
          <span class="font-mono text-[11px] text-ink-faint">${esc(project.dates)}</span>
          <span class="font-mono text-[11px] text-copper bg-copper/10 border border-copper/20 px-2 py-0.5 rounded-md leading-none">${esc(project.context)}</span>
        </div>
        
        <h3 class="font-display font-semibold text-lg leading-snug text-ink group-hover:text-copper transition-colors">${esc(project.title)}</h3>
        <p class="text-ink-dim text-sm leading-relaxed">${esc(project.summary)}</p>
        
        <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
          ${project.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
        </div>
      </div>

      <div class="flex items-center justify-between pt-5 mt-5 border-t border-line-soft">
        <span class="project-link text-sm font-medium">
          View technical specs ${icons.arrowUpRight}
        </span>
        ${extLink}
      </div>
    </article>
  `;
}

// ---- home: featured work ---------------------------------------------------
function renderFeaturedWork() {
  const el = document.getElementById("work");
  if (!el) return;
  const featured = siteData.projects
    .filter((p) => p.featured)
    .slice(0, siteData.site.featuredProjectsOnHome);

  el.innerHTML = `
    <div class="flex items-baseline justify-between gap-4 mb-10 flex-wrap">
      <div class="flex items-baseline gap-3">
        <span class="ref-tag">01</span>
        <h2 class="font-display font-semibold text-2xl sm:text-3xl">Selected work</h2>
      </div>
      <a href="/projects/" class="project-link text-sm">All projects ${icons.arrowUpRight}</a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${featured.map(projectCardHtml).join("")}
    </div>
  `;
}

// ---- /projects/ full grid --------------------------------------------------
function renderProjectsGrid() {
  const el = document.getElementById("projects-grid-root");
  if (!el) return;
  el.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${siteData.projects.map(projectCardHtml).join("")}
    </div>
  `;
}

// ---- experience -------------------------------------------------------------
function renderExperience() {
  const el = document.getElementById("experience");
  if (!el) return;
  const rows = siteData.experience.map((job, i) => `
    <div class="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-2 gap-x-10 py-7 border-t ${i === siteData.experience.length - 1 ? "border-b" : ""} border-line">
      <div class="font-mono text-xs text-ink-faint pt-0.5 flex flex-col gap-0.5">
        ${job.dateLines.map((d) => `<span>${esc(d)}</span>`).join("")}
      </div>
      <div>
        <h3 class="font-display font-semibold text-lg leading-snug mb-0.5">${esc(job.title)}</h3>
        <p class="font-mono text-xs text-copper mb-4">${esc(job.org)}</p>
        <ul class="flex flex-col gap-2">
          ${job.bullets.map((b) => `<li class="bullet bullet-cyan text-sm text-ink-dim leading-relaxed">${esc(b)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");

  el.innerHTML = `
    <div class="flex items-baseline gap-3 mb-10">
      <span class="ref-tag">02</span>
      <h2 class="font-display font-semibold text-2xl sm:text-3xl">Experience</h2>
    </div>
    <div class="max-w-3xl">${rows}</div>
  `;
}

// ---- about ------------------------------------------------------------------
function renderAbout() {
  const el = document.getElementById("about");
  if (!el) return;
  const { about } = siteData;

  el.innerHTML = `
    <div class="flex items-baseline gap-3 mb-10">
      <span class="ref-tag">03</span>
      <h2 class="font-display font-semibold text-2xl sm:text-3xl">About</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 mb-14">

      <!-- Bio -->
      <div>
        ${about.paragraphs.map((p) => `<p class="text-ink-dim mb-5 text-base leading-relaxed">${esc(p)}</p>`).join("")}

        <!-- Hobby chips with rounded-full geometry -->
        <div class="mt-8">
          <p class="font-mono text-xs text-ink-faint uppercase tracking-widest mb-3">Outside the lab</p>
          <div class="flex flex-wrap gap-2">
            ${about.hobbies.map((h) => `<span class="hobby-chip">${esc(h)}</span>`).join("")}
          </div>
        </div>
      </div>

      <!-- Sidebar: education & certs -->
      <div class="flex flex-col gap-8">
        <div>
          <p class="font-mono text-xs text-ink-faint uppercase tracking-widest mb-4">Education</p>
          ${about.education.map((e) => `
            <div class="mb-4 pb-4 border-b border-line-soft last:border-0 last:pb-0 last:mb-0">
              <p class="text-sm font-semibold text-ink mb-0.5">${esc(e.degree)}</p>
              <p class="text-sm text-copper mb-0.5">${esc(e.school)}</p>
              <p class="font-mono text-xs text-ink-faint">${esc(e.detail)}</p>
            </div>
          `).join("")}
        </div>
        <div>
          <p class="font-mono text-xs text-ink-faint uppercase tracking-widest mb-4">Certifications</p>
          ${about.certifications.map((c) => `
            <p class="font-mono text-xs text-ink-dim py-2.5 border-t border-line-soft first:border-t-0">${esc(c)}</p>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- Skills grid with elevated card islands -->
    <div>
      <p class="font-mono text-xs text-ink-faint uppercase tracking-widest mb-6">Technical skills</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        ${about.skills.map((group) => `
          <div class="bg-bg-raised/40 border border-line-soft p-4 rounded-xl">
            <p class="font-mono text-[11px] text-copper mb-2.5 uppercase tracking-wider font-medium">${esc(group.category)}</p>
            <div class="flex flex-wrap gap-1.5">
              ${group.items.map((i) => `<span class="tag">${esc(i)}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// ---- contact with refined non-shifting layout -------------------------------
function renderContact() {
  const el = document.getElementById("contact");
  if (!el) return;
  const { person, social, contact } = siteData;

  el.innerHTML = `
    <div class="flex items-baseline gap-3 mb-10">
      <span class="ref-tag">04</span>
      <h2 class="font-display font-semibold text-2xl sm:text-3xl">Get in touch</h2>
    </div>
    <p class="text-ink-dim max-w-[48ch] mb-8 text-base leading-relaxed">${esc(contact.intro)}</p>

    <div class="max-w-xl flex flex-col gap-3">
      <!-- Email card with copy button -->
      <div class="contact-item">
        <span class="font-mono text-xs text-ink-faint">Direct Email</span>
        <div class="flex items-center gap-3">
          <a href="mailto:${esc(person.email)}" class="text-sm text-ink hover:text-copper transition-colors no-underline font-medium">${esc(person.email)}</a>
          <button class="inline-flex items-center gap-1.5 font-mono text-xs text-ink-faint hover:text-copper transition-colors border border-line-soft bg-bg/80 px-2.5 py-1 rounded-md"
                  onclick="copyToClipboard('${esc(person.email)}', this)">
            ${icons.copy} Copy
          </button>
        </div>
      </div>

      ${social.map((s) => `
        <a href="${esc(s.url)}" target="_blank" rel="noopener" class="contact-item group">
          <span class="font-mono text-xs text-ink-faint">${esc(s.label)}</span>
          <span class="text-sm text-ink group-hover:text-copper transition-colors flex items-center gap-1.5">
            ${esc(s.url.replace(/^https?:\/\//, ""))} ${icons.external}
          </span>
        </a>
      `).join("")}

      <a href="${esc(person.resumeUrl)}" target="_blank" rel="noopener" class="contact-item group">
        <span class="font-mono text-xs text-ink-faint">Current Résumé</span>
        <span class="text-sm text-ink group-hover:text-copper transition-colors flex items-center gap-1.5">
          Download PDF ${icons.download}
        </span>
      </a>
    </div>
  `;
}

// ---- project architecture vector diagrams -----------------------------------
function getArchitectureSvg(slug) {
  if (slug === "keyboard") {
    return `
      <div class="bg-[#070A0D] border border-line rounded-xl p-5 sm:p-6 overflow-x-auto shadow-inner">
        <p class="font-mono text-[11px] text-ink-faint mb-4 uppercase tracking-wider">Subsystem Architecture · RP2040 + KMK Firmware (CircuitPython)</p>
        <svg viewBox="0 0 820 220" class="w-full min-w-[640px] h-auto font-mono text-[10px]">
          <rect x="10" y="20" width="160" height="180" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="6"/>
          <text x="90" y="42" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">Switch Matrix</text>
          <text x="90" y="62" fill="#6FA9B0" text-anchor="middle">10 Rows × 9 Cols</text>
          <text x="90" y="82" fill="#E8E6E0" text-anchor="middle">91 Key Positions</text>
          <text x="90" y="115" fill="#C98A4B" text-anchor="middle">COL2ROW Orientation</text>
          <text x="90" y="135" fill="#8B929B" text-anchor="middle">1N4148 diodes</text>
          <text x="90" y="158" fill="#8B929B" text-anchor="middle">19 GPIO lines</text>
          
          <line x1="170" y1="110" x2="220" y2="110" stroke="#C98A4B" stroke-width="1.5" marker-end="url(#arr)"/>
          
          <rect x="220" y="10" width="380" height="200" fill="#0E1217" stroke="#C98A4B" stroke-width="1.5" rx="8"/>
          <text x="410" y="32" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="13">RP2040 · CircuitPython Runtime</text>
          
          <rect x="240" y="48" width="160" height="145" fill="#080B0E" stroke="#6FA9B0" stroke-width="1" rx="4"/>
          <text x="320" y="68" fill="#6FA9B0" text-anchor="middle" font-weight="600">KMK Firmware Core</text>
          <text x="320" y="92" fill="#E8E6E0" text-anchor="middle">Matrix Scanner</text>
          <text x="320" y="114" fill="#C98A4B" text-anchor="middle">Layers (Base/Nav/Media)</text>
          <text x="320" y="136" fill="#8B929B" text-anchor="middle">HoldTap &amp; ModTap</text>
          <text x="320" y="160" fill="#50FA7B" text-anchor="middle">USB HID Keycodes</text>
          
          <rect x="420" y="48" width="160" height="145" fill="#080B0E" stroke="#8BE9FD" stroke-width="1" rx="4"/>
          <text x="500" y="68" fill="#8BE9FD" text-anchor="middle" font-weight="600">Lighting Subsystem</text>
          <text x="500" y="92" fill="#E8E6E0" text-anchor="middle">82× NeoPixel Driver</text>
          <text x="500" y="114" fill="#C98A4B" text-anchor="middle">MovingGradient Class</text>
          <text x="500" y="136" fill="#8B929B" text-anchor="middle">Modulo color math</text>
          <text x="500" y="160" fill="#50FA7B" text-anchor="middle">60 Hz animation loop</text>
          
          <line x1="600" y1="80" x2="640" y2="80" stroke="#6FA9B0" stroke-width="1.5"/>
          <line x1="600" y1="170" x2="640" y2="170" stroke="#8BE9FD" stroke-width="1.5"/>
          
          <rect x="640" y="40" width="170" height="80" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="6"/>
          <text x="725" y="62" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">USB-C Interface</text>
          <text x="725" y="82" fill="#C98A4B" text-anchor="middle">CircuitPython HID</text>
          <text x="725" y="102" fill="#50FA7B" text-anchor="middle">Bootloader / Serial REPL</text>
          
          <rect x="640" y="140" width="170" height="60" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="6"/>
          <text x="725" y="163" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">82× NeoPixel Chain</text>
          <text x="725" y="181" fill="#8BE9FD" text-anchor="middle">GPIO Pin b.SDA (DIN)</text>
          
          <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#C98A4B"/></marker></defs>
        </svg>
      </div>`;
  }

  if (slug === "solar-car") {
    return `
      <div class="bg-[#070A0D] border border-line rounded-xl p-5 sm:p-6 overflow-x-auto shadow-inner">
        <p class="font-mono text-[11px] text-ink-faint mb-4 uppercase tracking-wider">Isolated CAN 2.0B Vehicle Bus · 500 kbps · 120Ω Terminated</p>
        <svg viewBox="0 0 820 240" class="w-full min-w-[640px] h-auto font-mono text-[10px]">
          <line x1="40" y1="120" x2="780" y2="120" stroke="#C98A4B" stroke-width="2.5"/>
          <line x1="40" y1="128" x2="780" y2="128" stroke="#6FA9B0" stroke-width="2.5"/>
          <text x="410" y="113" fill="#C98A4B" text-anchor="middle">CAN_H · 3.5V dominant</text>
          <text x="410" y="145" fill="#6FA9B0" text-anchor="middle">CAN_L · 1.5V dominant</text>
          
          <rect x="20" y="107" width="20" height="34" fill="#0E1217" stroke="#C98A4B" rx="2"/>
          <text x="30" y="128" fill="#C98A4B" text-anchor="middle">120Ω</text>
          <rect x="780" y="107" width="20" height="34" fill="#0E1217" stroke="#C98A4B" rx="2"/>
          <text x="790" y="128" fill="#C98A4B" text-anchor="middle">120Ω</text>
          
          <line x1="120" y1="120" x2="120" y2="55" stroke="#C98A4B" stroke-width="1.2"/>
          <rect x="55" y="10" width="140" height="62" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="6"/>
          <text x="125" y="30" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">HV Battery BMS</text>
          <text x="125" y="48" fill="#C98A4B" text-anchor="middle">ID 0x3A0 · V / I</text>
          <text x="125" y="64" fill="#50FA7B" text-anchor="middle">Watchdog heartbeat</text>
          
          <line x1="320" y1="128" x2="320" y2="175" stroke="#6FA9B0" stroke-width="1.5"/>
          <rect x="225" y="165" width="195" height="65" fill="#0E1217" stroke="#C98A4B" stroke-width="1.5" rx="6"/>
          <text x="322" y="186" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">LV Master Controller</text>
          <text x="322" y="204" fill="#C98A4B" text-anchor="middle">Telemetry dispatcher (C#)</text>
          <text x="322" y="220" fill="#6FA9B0" text-anchor="middle">PROFET solid-state switches</text>
          
          <line x1="530" y1="120" x2="530" y2="55" stroke="#C98A4B" stroke-width="1.2"/>
          <rect x="460" y="10" width="145" height="62" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="6"/>
          <text x="532" y="30" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">Driver HUD</text>
          <text x="532" y="48" fill="#8BE9FD" text-anchor="middle">SPI TFT display</text>
          <text x="532" y="64" fill="#8B929B" text-anchor="middle">Speed · SoC · Alarms</text>
          
          <line x1="690" y1="128" x2="690" y2="175" stroke="#6FA9B0" stroke-width="1.2"/>
          <rect x="625" y="165" width="140" height="65" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="6"/>
          <text x="695" y="186" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">MPPT Solar Array</text>
          <text x="695" y="204" fill="#C98A4B" text-anchor="middle">ID 0x4B2 · Yield</text>
          <text x="695" y="220" fill="#8B929B" text-anchor="middle">Power point tracking</text>
        </svg>
      </div>`;
  }

  if (slug === "vexu") {
    return `
      <div class="bg-[#070A0D] border border-line rounded-xl p-5 sm:p-6 overflow-x-auto shadow-inner">
        <p class="font-mono text-[11px] text-ink-faint mb-4 uppercase tracking-wider">3-Wheel Odometry &amp; Motion Control · 100 Hz RTOS Thread</p>
        <svg viewBox="0 0 820 230" class="w-full min-w-[640px] h-auto font-mono text-[10px]">
          <rect x="10" y="20" width="175" height="190" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="6"/>
          <text x="97" y="42" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">Sensors</text>
          
          <rect x="22" y="52" width="150" height="38" fill="#080B0E" stroke="#6FA9B0" rx="3"/>
          <text x="97" y="69" fill="#6FA9B0" text-anchor="middle">Parallel Encoders (2×)</text>
          <text x="97" y="83" fill="#8B929B" text-anchor="middle">360 ticks/rev quad</text>
          
          <rect x="22" y="98" width="150" height="38" fill="#080B0E" stroke="#6FA9B0" rx="3"/>
          <text x="97" y="115" fill="#6FA9B0" text-anchor="middle">Perpendicular Encoder</text>
          <text x="97" y="129" fill="#8B929B" text-anchor="middle">Lateral drift tracking</text>
          
          <rect x="22" y="144" width="150" height="38" fill="#080B0E" stroke="#C98A4B" rx="3"/>
          <text x="97" y="161" fill="#C98A4B" text-anchor="middle">3-Axis IMU Gyro</text>
          <text x="97" y="175" fill="#8B929B" text-anchor="middle">Heading fusion</text>
          
          <line x1="185" y1="115" x2="225" y2="115" stroke="#C98A4B" stroke-width="1.5"/>
          
          <rect x="225" y="20" width="210" height="190" fill="#0E1217" stroke="#C98A4B" stroke-width="1.5" rx="8"/>
          <text x="330" y="42" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">Odometry Thread (100 Hz)</text>
          
          <rect x="242" y="55" width="176" height="135" fill="#080B0E" stroke="#242A32" rx="4"/>
          <text x="330" y="78" fill="#C98A4B" text-anchor="middle" font-weight="600">Δ Encoder ticks</text>
          <text x="330" y="98" fill="#8B929B" text-anchor="middle">Arc-chord approximation</text>
          <text x="330" y="128" fill="#6FA9B0" text-anchor="middle" font-weight="600">Coordinate rotation</text>
          <text x="330" y="148" fill="#8B929B" text-anchor="middle">Local Δx,Δy → field X,Y</text>
          <text x="330" y="175" fill="#50FA7B" text-anchor="middle" font-weight="600">Pose [X, Y, θ]</text>
          
          <line x1="435" y1="115" x2="475" y2="115" stroke="#6FA9B0" stroke-width="1.5"/>
          
          <rect x="475" y="20" width="330" height="190" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="6"/>
          <text x="640" y="42" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="12">Motion Control</text>
          
          <rect x="492" y="55" width="296" height="58" fill="#080B0E" stroke="#242A32" rx="4"/>
          <text x="640" y="78" fill="#E8E6E0" text-anchor="middle">Cascading PID Controllers</text>
          <text x="640" y="98" fill="#C98A4B" text-anchor="middle">Linear distance + Angular heading</text>
          
          <rect x="492" y="125" width="296" height="65" fill="#080B0E" stroke="#50FA7B" rx="4"/>
          <text x="640" y="148" fill="#50FA7B" text-anchor="middle" font-weight="600">Motor Output Stage</text>
          <text x="640" y="168" fill="#8B929B" text-anchor="middle">Slew-rate power limiter</text>
          <text x="640" y="183" fill="#8BE9FD" text-anchor="middle">&lt;2 mm target precision</text>
        </svg>
      </div>`;
  }

  if (slug === "homelab") {
    return `
      <div class="bg-[#070A0D] border border-line rounded-xl p-5 sm:p-6 overflow-x-auto shadow-inner">
        <p class="font-mono text-[11px] text-ink-faint mb-4 uppercase tracking-wider">Proxmox Infrastructure · LXC Storage + Docker VM Architecture</p>
        <svg viewBox="0 0 820 220" class="w-full min-w-[640px] h-auto font-mono text-[10px]">
          <rect x="10" y="10" width="800" height="200" fill="#080B0E" stroke="#C98A4B" stroke-width="1.5" rx="8"/>
          <text x="30" y="30" fill="#C98A4B" font-family="IBM Plex Mono" font-size="10">BARE METAL | Lenovo Desktop (x86_64) · Proxmox VE</text>
          
          <rect x="25" y="42" width="175" height="150" fill="#0E1217" stroke="#6FA9B0" stroke-width="1.2" rx="4"/>
          <text x="112" y="62" fill="#6FA9B0" text-anchor="middle" font-weight="600" font-family="Space Grotesk" font-size="11">LXC Container</text>
          <text x="112" y="80" fill="#8B929B" text-anchor="middle">Storage Manager</text>
          <text x="112" y="105" fill="#E8E6E0" text-anchor="middle">ZFS pool / volumes</text>
          <text x="112" y="123" fill="#8B929B" text-anchor="middle">Bind-mount to VM</text>
          <text x="112" y="150" fill="#C98A4B" text-anchor="middle">ZFS Datasets →</text>
          
          <line x1="200" y1="117" x2="240" y2="117" stroke="#6FA9B0" stroke-width="1.5"/>
          
          <rect x="240" y="42" width="400" height="150" fill="#0E1217" stroke="#E8E6E0" stroke-width="1" rx="4"/>
          <text x="440" y="62" fill="#E8E6E0" text-anchor="middle" font-weight="600" font-family="Space Grotesk" font-size="11">Debian VM · 10 Docker Compose Stacks</text>
          
          <rect x="252" y="74" width="105" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="304" y="89" fill="#6FA9B0" text-anchor="middle">cloudflare</text>
          <rect x="363" y="74" width="80" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="403" y="89" fill="#6FA9B0" text-anchor="middle">homarr</text>
          <rect x="449" y="74" width="85" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="491" y="89" fill="#6FA9B0" text-anchor="middle">jellyfin</text>
          <rect x="540" y="74" width="90" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="585" y="89" fill="#6FA9B0" text-anchor="middle">immich</text>

          <rect x="252" y="104" width="72" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="288" y="119" fill="#8B929B" text-anchor="middle">kavita</text>
          <rect x="330" y="104" width="82" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="371" y="119" fill="#8B929B" text-anchor="middle">obsidian</text>
          <rect x="418" y="104" width="76" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="456" y="119" fill="#8B929B" text-anchor="middle">servarr</text>
          <rect x="500" y="104" width="75" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="537" y="119" fill="#8B929B" text-anchor="middle">webdav</text>
          <rect x="581" y="104" width="49" height="22" fill="#12161C" stroke="#242A32" rx="3"/>
          <text x="605" y="119" fill="#50FA7B" text-anchor="middle">VPN</text>

          <rect x="252" y="134" width="105" height="22" fill="#12161C" stroke="#C98A4B" rx="3"/>
          <text x="304" y="149" fill="#C98A4B" text-anchor="middle">vaultwarden</text>
          <rect x="363" y="134" width="125" height="22" fill="#12161C" stroke="#8BE9FD" rx="3"/>
          <text x="425" y="149" fill="#8BE9FD" text-anchor="middle">home-assistant</text>
          <rect x="494" y="134" width="136" height="22" fill="#12161C" stroke="#50FA7B" rx="3"/>
          <text x="562" y="149" fill="#50FA7B" text-anchor="middle">Isolated Namespaces</text>
          
          <line x1="640" y1="117" x2="680" y2="117" stroke="#C98A4B" stroke-width="1.5"/>
          
          <rect x="680" y="60" width="120" height="115" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="4"/>
          <text x="740" y="80" fill="#E8E6E0" text-anchor="middle" font-weight="600" font-family="Space Grotesk" font-size="11">Cloudflare</text>
          <text x="740" y="100" fill="#C98A4B" text-anchor="middle">Tunnel</text>
          <text x="740" y="120" fill="#8B929B" text-anchor="middle">Zero-trust</text>
          <text x="740" y="138" fill="#8B929B" text-anchor="middle">No open ports</text>
          <text x="740" y="162" fill="#50FA7B" text-anchor="middle">→ Internet</text>
        </svg>
      </div>`;
  }

  return "";
}

// ---- homelab docker compose fleet & services graphic ------------------------
function getHomelabServicesGraphic() {
  const stacks = [
    {
      name: "cloudflare",
      tag: "Edge Ingress",
      accent: "text-copper bg-copper/10 border-copper/20",
      dot: "bg-copper",
      role: "Cloudflare Zero Trust tunnel routing encrypted traffic through the cloudflare_tunnelnet bridge with 0 open router ports.",
      spec: "Zero-Trust Tunnel · cloudflare_tunnelnet",
    },
    {
      name: "homarr",
      tag: "Dashboard",
      accent: "text-cyan bg-cyan/10 border-cyan/20",
      dot: "bg-cyan",
      role: "Centralized dashboard connected to the servarr network for live health telemetry, download progress, and service navigation.",
      spec: "Web Portal · servarrnetwork",
    },
    {
      name: "home-assistant",
      tag: "Smart Home",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      dot: "bg-emerald-400",
      role: "Smart home automation engine running on host networking with integrated Python Matter controller for Thread and Wi-Fi IoT devices.",
      spec: "Host Network Mode · Python Matter Server",
    },
    {
      name: "immich",
      tag: "Private Cloud",
      accent: "text-cyan bg-cyan/10 border-cyan/20",
      dot: "bg-cyan",
      role: "High-performance photo and video backup stack powered by PostgreSQL/pgvector and machine learning facial recognition microservices.",
      spec: "Postgres + pgvector · ML Microservices",
    },
    {
      name: "jellyfin",
      tag: "Media Server",
      accent: "text-copper bg-copper/10 border-copper/20",
      dot: "bg-copper",
      role: "Hardware-accelerated media server with direct /dev/dri GPU pass-through for seamless 4K/HDR video transcoding and streaming.",
      spec: "/dev/dri GPU Pass · Hardware Transcode",
    },
    {
      name: "kavita",
      tag: "E-Reader",
      accent: "text-ink bg-line-soft border-line",
      dot: "bg-ink-dim",
      role: "Self-hosted digital reading server organizing ebooks, manga, comics, and technical PDFs with full OPDS reader protocol support.",
      spec: "OPDS Protocol · Digital Reading Library",
    },
    {
      name: "obsidian",
      tag: "Knowledge Base",
      accent: "text-copper bg-copper/10 border-copper/20",
      dot: "bg-copper",
      role: "Self-hosted Obsidian LiveSync backend with CouchDB database for real-time, end-to-end encrypted markdown notes synchronization.",
      spec: "LiveSync Protocol · E2EE CouchDB",
    },
    {
      name: "servarr",
      tag: "Media Fleet",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      dot: "bg-emerald-400",
      role: "Decoupled PVR fleet (Sonarr, Radarr, Lidarr, Bazarr, Seerr, Chaptarr) with qBittorrent and Prowlarr isolated behind a Gluetun WireGuard killswitch.",
      spec: "WireGuard Killswitch · Atomic Hardlinks",
    },
    {
      name: "vaultwarden",
      tag: "Security",
      accent: "text-copper bg-copper/10 border-copper/20",
      dot: "bg-copper",
      role: "Lightweight Bitwarden-compatible password manager written in Rust, providing zero-knowledge credential storage and sync.",
      spec: "Rust Core · Zero-Knowledge Encryption",
    },
    {
      name: "webdav",
      tag: "File Sync",
      accent: "text-cyan bg-cyan/10 border-cyan/20",
      dot: "bg-cyan",
      role: "Digest-authenticated WebDAV storage server enabling native OS file manager integration and remote document sync.",
      spec: "Digest Auth · WebDAV Protocol",
    },
  ];

  return `
    <div class="space-y-6 mb-8">
      <!-- High-Fidelity Service Topology Vector Diagram -->
      <div class="bg-[#070A0D] border border-line rounded-xl p-5 sm:p-6 overflow-x-auto shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <p class="font-mono text-[11px] text-ink-faint uppercase tracking-wider">Homelab Architecture · 10 Modular Docker Compose Stacks</p>
          <span class="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> 10 Stacks Running
          </span>
        </div>
        
        <svg viewBox="0 0 840 460" class="w-full min-w-[740px] h-auto font-mono text-[10px]">
          <defs>
            <marker id="arr-c" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#C98A4B"/></marker>
            <marker id="arr-b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#6FA9B0"/></marker>
            <marker id="arr-g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#50FA7B"/></marker>
          </defs>

          <!-- TOP: EDGE INGRESS & TUNNEL -->
          <rect x="20" y="15" width="165" height="46" fill="#0E1217" stroke="#242A32" stroke-width="1.2" rx="5"/>
          <text x="102" y="34" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="11">Cloudflare Edge</text>
          <text x="102" y="48" fill="#8B929B" text-anchor="middle">Public DNS · SSL Offload</text>
          
          <line x1="185" y1="38" x2="225" y2="38" stroke="#C98A4B" stroke-width="1.8" marker-end="url(#arr-c)"/>
          
          <rect x="230" y="15" width="225" height="46" fill="#0E1217" stroke="#C98A4B" stroke-width="1.5" rx="5"/>
          <text x="342" y="34" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" text-anchor="middle" font-size="11">cloudflare/ (Tunnel)</text>
          <text x="342" y="48" fill="#C98A4B" text-anchor="middle">Zero-Trust Outbound · 0 Open Ports</text>

          <!-- cloudflare_tunnelnet Bridge -->
          <line x1="342" y1="61" x2="342" y2="72" stroke="#6FA9B0" stroke-width="1.5"/>
          <line x1="20" y1="72" x2="820" y2="72" stroke="#6FA9B0" stroke-width="1.5"/>
          <text x="635" y="67" fill="#6FA9B0" font-size="9">cloudflare_tunnelnet Bridge Network</text>

          <!-- 5 Exposed Services on Tunnel -->
          <rect x="20" y="78" width="150" height="26" fill="#12161C" stroke="#242A32" rx="4"/>
          <text x="95" y="94" fill="#E8E6E0" text-anchor="middle">vaultwarden</text>

          <rect x="182" y="78" width="150" height="26" fill="#12161C" stroke="#242A32" rx="4"/>
          <text x="257" y="94" fill="#E8E6E0" text-anchor="middle">immich</text>

          <rect x="345" y="78" width="150" height="26" fill="#12161C" stroke="#242A32" rx="4"/>
          <text x="420" y="94" fill="#E8E6E0" text-anchor="middle">kavita</text>

          <rect x="507" y="78" width="150" height="26" fill="#12161C" stroke="#242A32" rx="4"/>
          <text x="582" y="94" fill="#E8E6E0" text-anchor="middle">obsidian (LiveSync)</text>

          <rect x="670" y="78" width="150" height="26" fill="#12161C" stroke="#242A32" rx="4"/>
          <text x="745" y="94" fill="#E8E6E0" text-anchor="middle">webdav</text>

          <!-- MIDDLE SECTION: SERVARR STACK & LOCAL SERVICES -->
          <!-- Left: servarr stack -->
          <rect x="20" y="118" width="500" height="242" fill="#080B0E" stroke="#C98A4B" stroke-width="1.2" rx="6"/>
          <text x="35" y="136" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" font-size="11">servarr/ · Media Acquisition Fleet (servarrnetwork)</text>

          <!-- Gluetun VPN Pod -->
          <rect x="32" y="146" width="476" height="66" fill="#12161C" stroke="#6FA9B0" stroke-width="1" rx="4"/>
          <text x="45" y="165" fill="#6FA9B0" font-weight="600">Gluetun VPN Pod (WireGuard Killswitch Gateway)</text>
          <text x="45" y="183" fill="#E8E6E0">gluetun · qbittorrent · nzbget · prowlarr · flaresolverr</text>
          <text x="45" y="199" fill="#8B929B">Downloaders bound to VPN namespace · Killswitch protection</text>

          <!-- PVR Coordinators -->
          <rect x="32" y="218" width="476" height="66" fill="#12161C" stroke="#242A32" stroke-width="1" rx="4"/>
          <text x="45" y="237" fill="#C98A4B" font-weight="600">Automated Media Managers &amp; Indexers</text>
          <text x="45" y="255" fill="#E8E6E0">sonarr (TV) · radarr (Movies) · lidarr (Music) · bazarr (Subtitles)</text>
          <text x="45" y="271" fill="#8B929B">seerr (Interactive Requests) · chaptarr (Audiobook Processing)</text>

          <!-- Homarr integration -->
          <rect x="32" y="290" width="476" height="58" fill="#12161C" stroke="#242A32" stroke-width="1" rx="4"/>
          <text x="45" y="309" fill="#E8E6E0" font-weight="600">homarr/ · Centralized Homelab Dashboard</text>
          <text x="45" y="325" fill="#8B929B">servarrnetwork bridge · Real-time telemetry, stats &amp; health</text>

          <!-- Right: Local Services -->
          <rect x="532" y="118" width="288" height="242" fill="#080B0E" stroke="#6FA9B0" stroke-width="1.2" rx="6"/>
          <text x="547" y="136" fill="#E8E6E0" font-family="Space Grotesk" font-weight="600" font-size="11">Local Host &amp; Streaming</text>

          <!-- Jellyfin -->
          <rect x="544" y="146" width="264" height="96" fill="#12161C" stroke="#C98A4B" stroke-width="1" rx="4"/>
          <text x="556" y="167" fill="#E8E6E0" font-weight="600">jellyfin/ · Media Streaming</text>
          <text x="556" y="185" fill="#C98A4B">Direct GPU Pass-Through (/dev/dri)</text>
          <text x="556" y="203" fill="#8B929B">Hardware 4K / HDR Transcoding</text>
          <text x="556" y="221" fill="#50FA7B">Direct play across TV, mobile &amp; web</text>

          <!-- Home Assistant -->
          <rect x="544" y="250" width="264" height="98" fill="#12161C" stroke="#50FA7B" stroke-width="1" rx="4"/>
          <text x="556" y="271" fill="#E8E6E0" font-weight="600">home-assistant/ · Smart Home</text>
          <text x="556" y="289" fill="#50FA7B">Host Network Mode (mDNS Discovery)</text>
          <text x="556" y="307" fill="#8B929B">Python Matter Server (Thread/Wi-Fi)</text>
          <text x="556" y="325" fill="#8B929B">Local IoT automation &amp; sensor hub</text>

          <!-- BOTTOM: STORAGE ARCHITECTURE (TRaSH Guides Atomic Hardlinks) -->
          <rect x="20" y="372" width="800" height="72" fill="#0E1217" stroke="#C98A4B" stroke-width="1.2" rx="6"/>
          <text x="35" y="392" fill="#C98A4B" font-family="Space Grotesk" font-weight="600" font-size="11">Unified Storage Architecture (TRaSH Guides Atomic Hardlink Standard)</text>
          <text x="35" y="410" fill="#8B929B">Unified mount structure: <tspan fill="#E8E6E0">Downloads &amp; Seeding</tspan> <tspan fill="#50FA7B">← Zero-Copy Inode Atomic Hardlinks →</tspan> <tspan fill="#E8E6E0">Organized Media (Movies, TV, Music, Books)</tspan></text>
          <text x="35" y="428" fill="#8B929B">Zero disk duplication · Instant file imports without cross-volume copying overhead</text>
        </svg>
      </div>

      <!-- 10-Stack Compose Directory Grid -->
      <div>
        <div class="flex items-center justify-between mb-3.5">
          <h3 class="font-display font-semibold text-base text-ink flex items-center gap-2">
            ${icons.chip} Docker Compose Stacks
          </h3>
          <span class="font-mono text-xs text-ink-faint">10 directory stacks</span>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${stacks.map((s) => `
            <div class="bg-bg-raised/40 border border-line rounded-xl p-4 flex flex-col justify-between hover:border-line-hover transition-colors group">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="font-mono text-[12px] font-semibold text-ink group-hover:text-copper transition-colors flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full ${s.dot}"></span>
                    ${esc(s.name)}/
                  </span>
                  <span class="font-mono text-[10px] px-2 py-0.5 rounded-md border ${s.accent} leading-none whitespace-nowrap">
                    ${esc(s.tag)}
                  </span>
                </div>
                <p class="text-ink-dim text-[12px] leading-relaxed mb-3">${esc(s.role)}</p>
              </div>
              <div class="pt-2 border-t border-line-soft flex items-center justify-between font-mono text-[10px] text-ink-faint">
                <span>${esc(s.spec)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// ---- project detail page ----------------------------------------------------
function renderProjectDetail() {
  const el = document.getElementById("project-root");
  if (!el) return;
  const slug = el.dataset.slug;
  const project = siteData.projects.find((p) => p.slug === slug);
  if (!project) {
    el.innerHTML = `<div class="container-site section"><p class="text-ink-dim">Project not found.</p></div>`;
    return;
  }

  const primaryLink = project.links.site
    ? { href: project.links.site, label: "Live System Site" }
    : project.links.repo
      ? { href: project.links.repo, label: "View Source on GitHub" }
      : null;

  const highlightedSnippet = highlightCode(project.code.snippet);

  el.innerHTML = `
    <!-- Header -->
    <section class="container-site pt-36 pb-12 sm:pt-44 sm:pb-16 relative">
      <div class="absolute -top-32 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-copper/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" aria-hidden="true"></div>

      <a href="/projects/" class="breadcrumb-link mb-8">${icons.arrowLeft} All projects</a>
      
      <div class="flex flex-wrap items-center gap-2 mt-8 mb-4">
        <span class="font-mono text-xs text-copper bg-copper/10 border border-copper/20 px-2.5 py-0.5 rounded-full">${esc(project.context)}</span>
        <span class="font-mono text-xs text-ink-faint">·</span>
        <span class="font-mono text-xs text-ink-faint">${esc(project.dates)}</span>
      </div>

      <h1 class="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6 max-w-[22ch] text-ink">${esc(project.title)}</h1>
      <p class="text-ink-dim max-w-[62ch] text-base sm:text-lg leading-relaxed mb-8">${esc(project.overview.intro)}</p>
      
      <div class="flex flex-wrap gap-1.5 mb-8">
        ${project.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
      </div>

      ${primaryLink ? `
        <div class="flex gap-3 flex-wrap">
          <a class="btn btn-primary" href="${esc(primaryLink.href)}" target="_blank" rel="noopener">
            ${esc(primaryLink.label)} ${icons.external}
          </a>
          ${project.links.site && project.links.repo ? `
            <a class="btn btn-ghost" href="${esc(project.links.repo)}" target="_blank" rel="noopener">
              ${icons.github} Repository
            </a>` : ""}
        </div>` : ""}
    </section>

    <!-- Section 01: Overview & Specs -->
    <section class="container-site section pt-0">
      <div class="flex items-baseline gap-3 mb-8">
        <span class="ref-tag">01</span>
        <h2 class="font-display font-semibold text-2xl">Overview &amp; Architecture Highlights</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
        <ul class="flex flex-col gap-3">
          ${project.overview.bullets.map((b) => `<li class="bullet bullet-cyan text-sm text-ink-dim leading-relaxed">${esc(b)}</li>`).join("")}
        </ul>

        ${project.specs ? `
          <div class="bg-bg-raised/70 border border-line p-6 rounded-xl">
            <p class="font-mono text-[11px] text-copper uppercase tracking-wider mb-4 font-medium">Specs &amp; Metrics</p>
            <div class="flex flex-col">
              ${project.specs.map((s) => `
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-2.5 border-b border-line-soft last:border-0">
                  <span class="font-mono text-[11px] text-ink-faint">${esc(s.label)}</span>
                  <span class="font-mono text-xs text-ink text-right font-medium">${esc(s.value)}</span>
                </div>
              `).join("")}
            </div>
          </div>` : ""}
      </div>
    </section>

    <!-- Section 02: Architecture Diagram -->
    ${getArchitectureSvg(project.slug) ? `
      <section class="container-site section pt-0">
        <div class="flex items-baseline gap-3 mb-6">
          <span class="ref-tag">02</span>
          <h2 class="font-display font-semibold text-2xl">Subsystem Architecture</h2>
        </div>
        ${getArchitectureSvg(project.slug)}
      </section>` : ""}

    <!-- Section 03: Production Code Snippet with Syntax Highlighting -->
    <section class="container-site section pt-0">
      <div class="flex items-baseline gap-3 mb-6">
        <span class="ref-tag">${getArchitectureSvg(project.slug) ? "03" : "02"}</span>
        <h2 class="font-display font-semibold text-2xl">${esc(project.code.heading)}</h2>
      </div>
      <div class="max-w-4xl">
        <p class="text-ink-dim text-sm leading-relaxed mb-5">${esc(project.code.intro)}</p>
        
        ${project.slug === "homelab" ? getHomelabServicesGraphic() : `
        <div class="bg-[#070A0D] border border-line rounded-xl overflow-hidden mb-5 shadow-2xl">
          <div class="flex items-center justify-between px-4 py-2.5 bg-bg-raised/90 border-b border-line">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-line-hover"></span>
              <span class="font-mono text-[11px] text-ink-faint">${project.slug === "keyboard" ? "firmware/code.py" : project.slug === "solar-car" ? "telemetry/CanDispatcher.cs" : project.slug === "fpv" ? "betaflight_cli_diff.txt" : "odometry/odometry_tracker.cpp"}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-mono text-[11px] text-copper uppercase font-semibold">${project.code.language}</span>
              <button class="code-copy-btn inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-dim hover:text-copper transition-colors px-2.5 py-1 rounded-md border border-line-soft bg-bg">
                ${icons.copy} Copy
              </button>
            </div>
          </div>
          <pre class="p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-ink-dim overflow-x-auto whitespace-pre"><code>${highlightedSnippet}</code></pre>
        </div>`}

        ${project.links.repo ? `
          <a class="project-link text-sm" href="${esc(project.links.repo)}" target="_blank" rel="noopener">
            Browse full source repository on GitHub ${icons.arrowUpRight}
          </a>` : ""}
      </div>
    </section>

    <!-- Section 04: Hardware Bench & CAD Artifacts -->
    <section class="container-site section pt-0">
      <div class="flex items-baseline gap-3 mb-8">
        <span class="ref-tag">${getArchitectureSvg(project.slug) ? "04" : "03"}</span>
        <h2 class="font-display font-semibold text-2xl">Hardware &amp; Bring-Up Assets</h2>
      </div>

      <!-- Hardware & CAD Visual Assets -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${[...project.models, ...project.photos].map((item, idx) => {
    const assetSrc = resolveAssetPath(item.path, project.slug);
    return `
          <div class="bg-bg-raised/40 border border-line rounded-xl overflow-hidden flex flex-col justify-between hover:border-line-hover transition-colors group">
            <div class="relative aspect-[4/3] bg-bg/90 flex items-center justify-center overflow-hidden border-b border-line-soft">
              <img src="${esc(assetSrc)}" alt="${esc(item.label)}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" />
              <div class="hidden flex flex-col items-center justify-center p-4 text-center">
                <span class="inline-flex items-center gap-1.5 text-[10px] font-mono text-cyan mb-1.5">
                  ${icons.chip} ASSET [0${idx + 1}]
                </span>
                <span class="font-mono text-[10px] text-ink-faint">Drop file into:</span>
                <p class="font-mono text-[10px] text-copper mt-0.5 truncate max-w-[20ch]" title="public${esc(assetSrc)}">public${esc(assetSrc)}</p>
              </div>
            </div>
            <div class="p-4">
              <h4 class="font-display font-semibold text-sm text-ink mb-1">${esc(item.label)}</h4>
              <p class="font-mono text-[10px] text-ink-faint truncate" title="${esc(assetSrc)}">${esc(assetSrc)}</p>
            </div>
          </div>
        `;
  }).join("")}
      </div>
    </section>
  `;

  // Attach clipboard copy handler directly to the rendered button
  const copyBtn = el.querySelector(".code-copy-btn");
  if (copyBtn) {
    copyBtn.onclick = () => window.copyToClipboard(project.code.snippet, copyBtn);
  }
}

// ---- projects page header --------------------------------------------------
function renderProjectsPageHeader() {
  const el = document.getElementById("projects-header-root");
  if (!el) return;
  const { projectsPage } = siteData;
  el.innerHTML = `
    <a href="/" class="breadcrumb-link mb-10">${icons.arrowLeft} Home</a>
    <div class="flex items-baseline gap-3 mt-8 mb-5">
      <span class="ref-tag">${esc(projectsPage.eyebrow)}</span>
    </div>
    <h1 class="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-5 text-ink">${esc(projectsPage.heading)}</h1>
    <p class="text-ink-dim max-w-[55ch] text-base sm:text-lg leading-relaxed">${esc(projectsPage.intro)}</p>
  `;
}

// ---- analytics -------------------------------------------------------------
function injectAnalytics() {
  const { provider, goatcounterCode, cloudflareToken, plausibleDomain } = siteData.analytics;
  if (!provider || provider === "none") return;
  const s = document.createElement("script");
  if (provider === "goatcounter" && goatcounterCode) {
    s.async = true; s.src = "//gc.zgo.at/count.js";
    s.dataset.goatcounter = `https://${goatcounterCode}.goatcounter.com/count`;
  } else if (provider === "cloudflare" && cloudflareToken) {
    s.defer = true; s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.dataset.cfBeacon = JSON.stringify({ token: cloudflareToken });
  } else if (provider === "plausible" && plausibleDomain) {
    s.defer = true; s.dataset.domain = plausibleDomain;
    s.src = "https://plausible.io/js/script.js";
  } else return;
  document.head.appendChild(s);
}

// ---- run -------------------------------------------------------------------
renderHeader();
renderFooter();
renderHero();
renderFeaturedWork();
renderExperience();
renderAbout();
renderContact();
renderProjectsPageHeader();
renderProjectsGrid();
renderProjectDetail();
injectAnalytics();

// Active nav on scroll (home page only)
const isProjectsRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/projects");
if (!isProjectsRoute) {
  const sections = document.querySelectorAll("main [id]");
  if ("IntersectionObserver" in window && sections.length) {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && e.target.id) {
          document.querySelectorAll(".site-nav a").forEach((a) => {
            a.classList.toggle("is-active", a.getAttribute("href") === `/#${e.target.id}`);
          });
        }
      }),
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
  }
}
