import "./style.css";
import siteData from "./data.js";

// ============================================================================
//  RENDER ENGINE — Mason Pyle Portfolio
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

// One-click copy with visual confirmation
window.copyToClipboard = (text, btn) => {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = `${icons.check}&ensp;<span class="text-[#50FA7B]">Copied</span>`;
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2000);
  });
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
      /(\/\/[^\n]*|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?:f|u|in|deg|ticks)?\b)|(\b[a-zA-Z_]\w*\b)/g,
      (match, com, str, num, ident) => {
        if (com) return `<span class="tok-com">${esc(com)}</span>`;
        if (str) return `<span class="tok-str">${esc(str)}</span>`;
        if (num) return `<span class="tok-num">${esc(num)}</span>`;
        if (ident) {
          if (keywords.has(ident)) return `<span class="tok-kw">${esc(ident)}</span>`;
          if (types.has(ident)) return `<span class="tok-type">${esc(ident)}</span>`;
        }
        return esc(match);
      }
    );
  }).join("\n");
}

// ---- header with responsive mobile navigation -------------------------------
function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  el.className = "fixed top-0 left-0 right-0 z-50 glass-header";
  el.innerHTML = `
    <div class="container-site flex items-center justify-between py-4">
      <a href="/" class="font-display font-bold text-sm no-underline text-ink border border-line-soft bg-bg-raised/60 w-9 h-9 rounded-lg flex items-center justify-center hover:border-copper transition-colors duration-200">
        ${esc(siteData.person.initials)}
      </a>
      
      <!-- Desktop Navigation -->
      <nav class="site-nav hidden sm:flex items-center gap-7">
        ${siteData.nav.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("")}
      </nav>

      <div class="hidden sm:inline-flex items-center gap-3">
        <a href="mailto:${esc(siteData.person.email)}" class="btn btn-ghost text-xs py-2 px-4">
          Get in touch
        </a>
      </div>

      <!-- Mobile Hamburger Toggle -->
      <button id="mobile-menu-btn" class="sm:hidden flex items-center justify-center w-9 h-9 border border-line-soft bg-bg-raised/60 rounded-lg text-ink-dim hover:text-ink hover:border-copper transition-colors" aria-label="Toggle navigation menu">
        <span id="menu-icon-open">${icons.menu}</span>
        <span id="menu-icon-close" class="hidden">${icons.close}</span>
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobile-nav" class="sm:hidden hidden border-t border-line-soft bg-bg/95 backdrop-blur-lg px-6 py-5 flex flex-col gap-4">
      ${siteData.nav.map((l) => `<a href="${esc(l.href)}" class="mobile-nav-link text-ink-dim hover:text-copper text-sm font-medium py-1 no-underline transition-colors">${esc(l.label)}</a>`).join("")}
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
      } else {
        mobileNav.classList.add("hidden");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
      }
    };

    // Close on any link click
    mobileNav.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.add("hidden");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
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

// ---- hero with ambient radial glow & editorial layout -----------------------
function renderHero() {
  const el = document.getElementById("hero-root");
  if (!el) return;
  const { hero, person } = siteData;
  const resumeHref = hero.primaryCta.href || person.resumeUrl;

  el.innerHTML = `
    <div class="relative">

      <!-- Ambient Radial Glow Backdrop (Linear/Vercel aesthetic) -->
      <div class="absolute -top-32 -left-20 w-[420px] sm:w-[680px] h-[420px] sm:h-[680px] bg-gradient-to-br from-copper/15 via-cyan/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" aria-hidden="true"></div>

      <!-- Main editorial content -->
      <div class="relative max-w-3xl">
        <div class="inline-flex items-center gap-2 font-mono text-xs text-copper bg-copper/10 border border-copper/20 px-3 py-1 rounded-full mb-8">
          <span class="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
          ${esc(person.tagline)}
        </div>
        
        <h1 class="font-display font-semibold text-5xl sm:text-6xl lg:text-[76px] leading-[1.05] tracking-tight mb-7 text-ink">${esc(hero.heading)}</h1>
        <p class="text-xl sm:text-2xl font-medium text-ink leading-snug max-w-[34ch] mb-6">${esc(hero.subheading)}</p>
        <p class="text-base text-ink-dim leading-relaxed max-w-[54ch] mb-10">${esc(hero.paragraph)}</p>
        
        <div class="flex flex-wrap gap-3 items-center">
          <a class="btn btn-primary gap-2" href="${esc(resumeHref)}" target="_blank" rel="noopener">
            ${icons.download} ${esc(hero.primaryCta.label)}
          </a>
          <button class="btn btn-ghost gap-2" onclick="copyToClipboard('${esc(person.email)}', this)">
            ${icons.copy} Copy email
          </button>
        </div>
      </div>
    </div>
  `;
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
        <div class="flex items-start justify-between gap-2">
          <span class="font-mono text-[11px] text-ink-faint">${esc(project.dates)}</span>
          <span class="font-mono text-[11px] text-copper bg-copper/10 border border-copper/20 px-2 py-0.5 rounded-md leading-none whitespace-nowrap">${esc(project.context)}</span>
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
          
          <rect x="25" y="52" width="145" height="38" fill="#080B0E" stroke="#6FA9B0" rx="3"/>
          <text x="97" y="69" fill="#6FA9B0" text-anchor="middle">Parallel Encoders (×2)</text>
          <text x="97" y="83" fill="#8B929B" text-anchor="middle">360 ticks/rev quadrature</text>
          
          <rect x="25" y="98" width="145" height="38" fill="#080B0E" stroke="#6FA9B0" rx="3"/>
          <text x="97" y="115" fill="#6FA9B0" text-anchor="middle">Perpendicular Encoder</text>
          <text x="97" y="129" fill="#8B929B" text-anchor="middle">Lateral drift tracking</text>
          
          <rect x="25" y="144" width="145" height="38" fill="#080B0E" stroke="#C98A4B" rx="3"/>
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
          <text x="30" y="30" fill="#C98A4B" font-family="IBM Plex Mono" font-size="10">BARE METAL — Lenovo Desktop (x86_64) · Proxmox VE</text>
          
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
          <text x="45" y="199" fill="#8B929B">Downloaders bound to VPN namespace · Automatic killswitch protection</text>

          <!-- PVR Coordinators -->
          <rect x="32" y="218" width="476" height="66" fill="#12161C" stroke="#242A32" stroke-width="1" rx="4"/>
          <text x="45" y="237" fill="#C98A4B" font-weight="600">Automated Media Managers &amp; Indexers</text>
          <text x="45" y="255" fill="#E8E6E0">sonarr (TV) · radarr (Movies) · lidarr (Music) · bazarr (Subtitles)</text>
          <text x="45" y="271" fill="#8B929B">seerr (Interactive Requests) · chaptarr (Audiobook Processing)</text>

          <!-- Homarr integration -->
          <rect x="32" y="290" width="476" height="58" fill="#12161C" stroke="#242A32" stroke-width="1" rx="4"/>
          <text x="45" y="309" fill="#E8E6E0" font-weight="600">homarr/ · Centralized Homelab Dashboard</text>
          <text x="45" y="325" fill="#8B929B">Bridged to servarrnetwork for real-time telemetry, download stats &amp; health checks</text>

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
          <text x="556" y="325" fill="#8B929B">Local IoT automation &amp; sensor coordinator</text>

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
