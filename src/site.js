import "./style.css";
import siteData from "./data.js";

// ============================================================================
//  RENDER ENGINE
//  Every page is a thin HTML shell with a few empty containers (#site-header,
//  #work, #project-root, etc). This file fills them in from src/data.js.
//  To change WHAT the site says, edit data.js. To change HOW it looks,
//  edit the templates below or the classes in src/style.css.
// ============================================================================

// ---- small inline icons, reused across templates --------------------------
const icons = {
  arrowUpRight: `<svg viewBox="0 0 16 16" width="13" height="13"><path d="M6 3h7v7M13 3 3 13" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUpRightBig: `<svg viewBox="0 0 16 16" width="14" height="14"><path d="M6 3h7v7M13 3 3 13" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 16 16" width="13" height="13"><path d="M10 3 4 8l6 5" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  github: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15v3.19c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"/></svg>`,
};

const esc = (str = "") =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---- header / footer (shared across every page) ---------------------------
function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const { initials } = siteData.person;
  el.innerHTML = `
    <div class="container-site flex items-center justify-between py-5">
      <a href="/" class="font-display font-bold text-[15px] no-underline text-ink border border-line w-[34px] h-[34px] flex items-center justify-center">${esc(initials)}</a>
      <nav class="site-nav flex gap-8">
        ${siteData.nav.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join("")}
      </nav>
    </div>
  `;
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
    <div class="container-site py-8 pb-16 flex flex-col sm:flex-row justify-between gap-1.5 text-ink-faint text-sm">
      <p>${esc(siteData.person.name)} — ${esc(siteData.person.location)}</p>
      <p>Built &amp; deployed from scratch.</p>
    </div>
  `;
}

// ---- home page: hero -------------------------------------------------------
function renderHero() {
  const el = document.getElementById("hero-root");
  if (!el) return;
  const { hero, person } = siteData;
  const primaryHref = hero.primaryCta.href || person.resumeUrl;
  const secondaryHref = hero.secondaryCta.href || `mailto:${person.email}`;
  el.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
      <div>
        <p class="font-mono text-sm text-ink-dim mb-5">${esc(person.tagline)}</p>
        <h1 class="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 tracking-tight">${esc(hero.heading)}</h1>
        <p class="text-xl sm:text-2xl font-medium max-w-[36ch] mb-6">${esc(hero.subheading)}</p>
        <p class="text-ink-dim max-w-[58ch] text-base leading-relaxed mb-10">${esc(hero.paragraph)}</p>
        <div class="flex gap-4 flex-wrap">
          <a class="btn btn-primary" href="${esc(primaryHref)}">${esc(hero.primaryCta.label)}</a>
          <a class="btn btn-ghost" href="${esc(secondaryHref)}">${esc(hero.secondaryCta.label)}</a>
        </div>
      </div>

      <div class="relative border border-line bg-bg-raised p-8 h-full min-h-[280px] flex items-center justify-center overflow-hidden">
        <svg class="w-full h-auto" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          <path class="trace-path" d="M0,240 L60,240 L80,210 L80,120 L120,120 L140,90 L260,90 L280,120 L340,120 L360,90 L400,90" />
          <path class="trace-path trace-path-b" d="M0,160 L40,160 L60,140 L160,140 L180,160 L300,160 L320,190 L400,190" />
          <circle class="trace-node" cx="80" cy="120" r="5" />
          <circle class="trace-node" cx="280" cy="120" r="5" />
          <circle class="trace-node" cx="360" cy="90" r="5" />
          <circle class="trace-node trace-node-b" cx="180" cy="160" r="5" />
          <circle class="trace-node trace-node-b" cx="320" cy="190" r="5" />
        </svg>
      </div>
    </div>
  `;
}

// ---- project card (used on home "Selected work" + /projects/) -------------
function projectCardHtml(project) {
  const secondaryLink = project.links.site
    ? `<a href="${esc(project.links.site)}" target="_blank" rel="noopener" class="text-ink-faint hover:text-ink transition-colors" aria-label="Project site">${icons.arrowUpRight}</a>`
    : project.links.repo
    ? `<a href="${esc(project.links.repo)}" target="_blank" rel="noopener" class="text-ink-faint hover:text-ink transition-colors" aria-label="Repository">${icons.github}</a>`
    : "";
  return `
    <article class="bg-bg p-7 flex flex-col">
      <div class="flex-1">
        <span class="font-mono text-xs text-ink-faint">${esc(project.dates)}</span>
        <h3 class="font-display font-semibold text-xl mt-2 mb-3">${esc(project.title)}</h3>
        <p class="text-ink-dim text-sm leading-relaxed mb-5">${esc(project.summary)}</p>
        <div class="flex flex-wrap gap-2 mb-6">
          ${project.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
        </div>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-line-soft">
        <a class="project-link" href="/projects/${esc(project.slug)}/">
          View project
          ${icons.arrowUpRight}
        </a>
        ${secondaryLink}
      </div>
    </article>
  `;
}

// ---- home page: "Selected work" (featured projects only) ------------------
function renderFeaturedWork() {
  const el = document.getElementById("work");
  if (!el) return;
  const featured = siteData.projects
    .filter((p) => p.featured)
    .slice(0, siteData.site.featuredProjectsOnHome);

  el.innerHTML = `
    <div class="flex items-baseline justify-between gap-4 mb-12 flex-wrap">
      <div class="flex items-baseline gap-3.5">
        <span class="ref-tag">U1</span>
        <h2 class="font-display font-semibold text-3xl">Selected work</h2>
      </div>
      <a href="/projects/" class="project-link">
        View all projects
        ${icons.arrowUpRight}
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
      ${featured.map(projectCardHtml).join("")}
    </div>
  `;
}

// ---- /projects/ index page: full grid --------------------------------------
function renderProjectsGrid() {
  const el = document.getElementById("projects-grid-root");
  if (!el) return;
  el.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
      ${siteData.projects.map(projectCardHtml).join("")}
    </div>
  `;
}

// ---- experience -------------------------------------------------------------
function renderExperience() {
  const el = document.getElementById("experience");
  if (!el) return;
  const rows = siteData.experience
    .map(
      (job, i) => `
      <div class="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-3 sm:gap-8 py-7 border-t ${i === siteData.experience.length - 1 ? "border-b" : ""} border-line">
        <div class="flex flex-col gap-1 font-mono text-xs text-ink-faint pt-1">
          ${job.dateLines.map((d) => `<span>${esc(d)}</span>`).join("")}
        </div>
        <div>
          <h3 class="font-display font-semibold text-lg mb-1">${esc(job.title)}</h3>
          <p class="text-copper text-sm mb-4">${esc(job.org)}</p>
          <ul class="flex flex-col gap-2.5">
            ${job.bullets.map((b) => `<li class="bullet bullet-cyan text-sm text-ink-dim leading-relaxed">${esc(b)}</li>`).join("")}
          </ul>
        </div>
      </div>
    `
    )
    .join("");

  el.innerHTML = `
    <div class="flex items-baseline gap-3.5 mb-12">
      <span class="ref-tag">U2</span>
      <h2 class="font-display font-semibold text-3xl">Experience</h2>
    </div>
    <div class="max-w-4xl flex flex-col">
      ${rows}
    </div>
  `;
}

// ---- about --------------------------------------------------------------
function renderAbout() {
  const el = document.getElementById("about");
  if (!el) return;
  const { about } = siteData;

  el.innerHTML = `
    <div class="flex items-baseline gap-3.5 mb-12">
      <span class="ref-tag">U3</span>
      <h2 class="font-display font-semibold text-3xl">About</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-16 mb-16">
      <div class="max-w-2xl">
        ${about.paragraphs.map((p) => `<p class="text-ink-dim mb-5 text-base leading-relaxed">${esc(p)}</p>`).join("")}
      </div>

      <div class="flex flex-col gap-8">
        <div>
          <h3 class="font-mono text-xs font-normal text-ink-faint mb-4 uppercase tracking-wide">Education</h3>
          ${about.education
            .map(
              (e) => `
            <div class="mb-4">
              <p class="text-sm font-medium mb-1">${esc(e.degree)}</p>
              <p class="text-sm text-ink-dim mb-1">${esc(e.school)}</p>
              <p class="font-mono text-xs text-ink-faint">${esc(e.detail)}</p>
            </div>
          `
            )
            .join("")}
        </div>

        <div>
          <h3 class="font-mono text-xs font-normal text-ink-faint mb-4 uppercase tracking-wide">Certifications</h3>
          ${about.certifications.map((c) => `<p class="text-sm text-ink-dim py-2 border-t border-line-soft">${esc(c)}</p>`).join("")}
        </div>
      </div>
    </div>

    <div>
      <h3 class="font-mono text-xs font-normal text-ink-faint mb-6 uppercase tracking-wide">Skills</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        ${about.skills
          .map(
            (group) => `
          <div>
            <p class="text-sm text-ink-dim mb-3">${esc(group.category)}</p>
            <div class="flex flex-wrap gap-2">
              ${group.items.map((i) => `<span class="tag">${esc(i)}</span>`).join("")}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// ---- contact --------------------------------------------------------------
function renderContact() {
  const el = document.getElementById("contact");
  if (!el) return;
  const { person, social, contact } = siteData;

  const links = [
    { label: "Email", value: person.email, href: `mailto:${person.email}`, external: false },
    ...social.map((s) => ({ label: s.label, value: s.url.replace(/^https?:\/\//, ""), href: s.url, external: true })),
  ];

  el.innerHTML = `
    <div class="flex items-baseline gap-3.5 mb-12">
      <span class="ref-tag">U4</span>
      <h2 class="font-display font-semibold text-3xl">Contact</h2>
    </div>
    <p class="text-ink-dim max-w-[50ch] mb-8 text-base leading-relaxed">${esc(contact.intro)}</p>
    <div class="max-w-xl flex flex-col">
      ${links
        .map(
          (l, i) => `
        <a href="${esc(l.href)}" ${l.external ? 'target="_blank" rel="noopener"' : ""} class="contact-link ${i === links.length - 1 ? "border-b border-line" : ""}">
          <span class="font-mono text-xs text-ink-faint">${esc(l.label)}</span>
          <span class="contact-value text-sm">${esc(l.value)}</span>
        </a>
      `
        )
        .join("")}
    </div>
  `;
}

// ---- project detail page ----------------------------------------------------
function mediaGridHtml(items, cols) {
  return `
    <div class="grid grid-cols-1 ${cols} gap-px bg-line border border-line">
      ${items
        .map(
          (item) => `
        <div class="media-placeholder bg-bg">
          <span>${esc(item.label)}</span>
          <span class="text-ink-faint/70">${esc(item.path)}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

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
    ? { href: project.links.site, label: "Team site" }
    : { href: project.links.repo, label: "View repository" };

  el.innerHTML = `
    <section class="container-site pt-36 pb-16 sm:pt-44 sm:pb-20">
      <a href="/projects/" class="breadcrumb-link mb-8">
        ${icons.arrowLeft}
        All projects
      </a>
      <span class="font-mono text-xs text-ink-faint">${esc(project.dates)} · ${esc(project.context)}</span>
      <h1 class="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-3 mb-6 tracking-tight max-w-[18ch]">${esc(project.title)}</h1>
      <p class="text-ink-dim max-w-[62ch] text-base sm:text-lg leading-relaxed mb-8">${esc(project.overview.intro)}</p>
      <div class="flex flex-wrap gap-2 mb-8">
        ${project.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
      </div>
      <div class="flex gap-4 flex-wrap">
        <a class="btn btn-primary" href="${esc(primaryLink.href)}" target="_blank" rel="noopener">
          ${esc(primaryLink.label)}
          ${icons.arrowUpRightBig}
        </a>
        ${
          project.links.site && project.links.repo
            ? `<a class="btn btn-ghost" href="${esc(project.links.repo)}" target="_blank" rel="noopener">Repository</a>`
            : ""
        }
      </div>
    </section>

    <section class="container-site section pt-0">
      <div class="flex items-baseline gap-3.5 mb-8">
        <span class="ref-tag">01</span>
        <h2 class="font-display font-semibold text-2xl">Overview</h2>
      </div>
      <div class="max-w-3xl">
        <ul class="flex flex-col gap-3">
          ${project.overview.bullets.map((b) => `<li class="bullet text-sm leading-relaxed">${esc(b)}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="container-site section pt-0">
      <div class="flex items-baseline gap-3.5 mb-8">
        <span class="ref-tag">02</span>
        <h2 class="font-display font-semibold text-2xl">Diagrams</h2>
      </div>
      ${mediaGridHtml(project.diagrams, "sm:grid-cols-3")}
    </section>

    <section class="container-site section pt-0">
      <div class="flex items-baseline gap-3.5 mb-8">
        <span class="ref-tag">03</span>
        <h2 class="font-display font-semibold text-2xl">${esc(project.code.heading)}</h2>
      </div>
      <div class="max-w-3xl">
        <p class="text-ink-dim text-base leading-relaxed mb-6">${esc(project.code.intro)}</p>
        <div class="code-panel mb-6">
          <pre><code>${esc(project.code.snippet)}</code></pre>
        </div>
        ${
          project.links.repo
            ? `<a class="project-link" href="${esc(project.links.repo)}" target="_blank" rel="noopener">
          Browse the full source on GitHub
          ${icons.arrowUpRight}
        </a>`
            : ""
        }
      </div>
    </section>

    <section class="container-site section pt-0">
      <div class="flex items-baseline gap-3.5 mb-8">
        <span class="ref-tag">04</span>
        <h2 class="font-display font-semibold text-2xl">Models</h2>
      </div>
      ${mediaGridHtml(project.models, "sm:grid-cols-2")}
    </section>

    <section class="container-site section pt-0">
      <div class="flex items-baseline gap-3.5 mb-8">
        <span class="ref-tag">05</span>
        <h2 class="font-display font-semibold text-2xl">Photos</h2>
      </div>
      ${mediaGridHtml(project.photos, "sm:grid-cols-4")}
    </section>
  `;
}

// ---- projects index page: hero text ----------------------------------------
function renderProjectsPageHeader() {
  const el = document.getElementById("projects-header-root");
  if (!el) return;
  const { projectsPage } = siteData;
  el.innerHTML = `
    <a href="/" class="breadcrumb-link mb-8">
      ${icons.arrowLeft}
      Home
    </a>
    <div class="flex items-baseline gap-3.5 mb-5">
      <span class="ref-tag">${esc(projectsPage.eyebrow)}</span>
    </div>
    <h1 class="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight">${esc(projectsPage.heading)}</h1>
    <p class="text-ink-dim max-w-[60ch] text-base sm:text-lg leading-relaxed">${esc(projectsPage.intro)}</p>
  `;
}

// ---- analytics --------------------------------------------------------------
function injectAnalytics() {
  const { provider, goatcounterCode, cloudflareToken, plausibleDomain } = siteData.analytics;
  if (provider === "none" || !provider) return;

  const script = document.createElement("script");

  if (provider === "goatcounter" && goatcounterCode) {
    script.async = true;
    script.src = "//gc.zgo.at/count.js";
    script.dataset.goatcounter = `https://${goatcounterCode}.goatcounter.com/count`;
  } else if (provider === "cloudflare" && cloudflareToken) {
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = JSON.stringify({ token: cloudflareToken });
  } else if (provider === "plausible" && plausibleDomain) {
    script.defer = true;
    script.dataset.domain = plausibleDomain;
    script.src = "https://plausible.io/js/script.js";
  } else {
    return; // provider set but missing its id — skip rather than send a broken request
  }

  document.head.appendChild(script);
}

// ---- run everything relevant to the current page ---------------------------
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

// --- Active nav link on scroll (home page sections only) ---
const sections = document.querySelectorAll("main [id]");
const navLinks = () => document.querySelectorAll(".site-nav a");

const setActive = (id) => {
  navLinks().forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `/#${id}`);
  });
};

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
