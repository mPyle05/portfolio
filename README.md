# Mason Pyle — Portfolio

Vite + Tailwind CSS, multi-page static site. Dark, PCB/schematic-inspired design (copper and cyan accents, hairline rectangular panels).

Every page is a thin HTML shell — all of the actual content (your name, bio, projects, experience, skills, contact links) lives in **one file, `src/data.js`**. Edit that file to customize the site; you shouldn't need to touch HTML or Tailwind classes for normal updates.

## Quick start

```bash
npm install
npm run dev       # local dev server with hot reload, http://localhost:5173
npm run build     # production build → dist/ (builds every page)
npm run preview   # preview the production build locally
```

---

## Customizing the site — `src/data.js`

Open `src/data.js`. It's one big object, grouped into sections, each with comments. Here's what lives where:

| Section | Controls |
|---|---|
| `site` | Your domain, and how many projects show on the home page |
| `analytics` | Visitor tracking — see [Visitor analytics](#visitor-analytics) below |
| `person` | Name, initials (used as the logo mark), role, location, email, résumé link |
| `social` | GitHub/LinkedIn/etc links shown in Contact |
| `nav` | Header navigation links |
| `hero` | The big heading and intro paragraph on the home page |
| `projects` | Every project — see [Projects](#projects--featured-vs-all) below |
| `experience` | Work history entries |
| `about` | Bio paragraphs, education, certifications, skills |
| `contact` | The intro line above your contact links |
| `projectsPage` | The heading/intro text on the `/projects/` page |

Change a value, save, and if `npm run dev` is running you'll see it update instantly. Nothing else needs to change — no HTML, no CSS, no Tailwind classes.

### A couple of things that stay outside `data.js`

A few things need to stay as real, static HTML because search engines and link-preview bots (Slack, iMessage, Twitter/X) read them directly from the page source, before any JavaScript runs:

- **Page `<title>` and `<meta name="description">`** — one line each, at the top of `index.html`, `projects/index.html`, and each `projects/<slug>/index.html`.
- **Open Graph tags** (`og:title`, `og:description`, `og:url`) in those same files — what shows up when the link is shared.

These are short and don't change often, so it's simpler to keep them as plain HTML than to route them through JavaScript. If you change your name or a project title in `data.js`, do a quick find-and-replace for the old text in these `<head>` blocks too.

---

## Projects — featured vs. all

Every project lives in the `projects` array in `data.js`. Two things control where it shows up:

- **`featured: true`** — shows the project in "Selected work" on the home page. `site.featuredProjectsOnHome` (also in `data.js`, default `3`) controls how many featured projects appear there, in array order.
- **Every project**, featured or not, automatically appears on the full **`/projects/`** page.

So: mark your best 3–4 projects `featured: true` to headline the home page, and everything else quietly lives on `/projects/` for anyone who clicks through.

### Editing an existing project

Find its object in the `projects` array and edit the fields — `title`, `summary`, `tags`, `overview`, `code` snippet, etc. Each project also has `diagrams`, `models`, and `photos` arrays that currently point at placeholder image paths (see [Adding images](#adding-images)).

### Adding a new project

1. **Add an entry to `src/data.js`** — copy an existing project object in the `projects` array and edit it. Give it a unique `slug` (lowercase, hyphens, no spaces — this becomes its URL).
2. **Copy the template page** — duplicate the `projects/_template/` folder, rename it to your new slug (e.g. `projects/my-new-thing/`), and update the `<title>`, `<meta name="description">`, canonical URL, and `og:*` tags inside it, plus the `data-slug` attribute so it matches step 1.
3. **Register the page in `vite.config.js`** — add one line to the `input` object, following the existing pattern (e.g. `myNewThing: resolve(root, "projects/my-new-thing/index.html")`).
4. **Add it to `public/sitemap.xml`** — one more `<url><loc>...</loc></url>` line (optional, but helps search engines find it).

That's it — the page itself needs no further edits; it just renders whatever's in `data.js` for that slug.

### Removing a project

Delete its object from `data.js`, delete its `projects/<slug>/` folder, and remove its line from `vite.config.js` and `sitemap.xml`.

---

## Adding images

Diagrams, CAD renders, and photos currently show as dashed placeholder boxes labeled with a suggested file path (e.g. `public/images/keyboard/schematic.png`) — that path comes straight from the `diagrams`/`models`/`photos` arrays in `data.js`.

To add a real image:

1. Drop the file into `public/images/<project>/` (e.g. `public/images/keyboard/schematic.png`).
2. In `src/site.js`, find `mediaGridHtml()` and swap the placeholder `<div class="media-placeholder">` markup for a real `<img>` tag, e.g.:
   ```html
   <img src="${esc(item.path)}" alt="${esc(item.label)}" class="aspect-[4/3] object-cover w-full" loading="lazy">
   ```
   (This is one function, shared by every project page, so you only need to make this swap once.)
3. Update the `path` values in `data.js` to match your real filenames.

Keep images reasonably compressed (well under 500KB each) so the site stays fast — JPEG or WebP for photos, PNG or SVG for diagrams and schematics.

---

## Visitor analytics

Off by default. To turn it on, pick **one** option below, then set `analytics.provider` (and the matching id field) in `data.js`. No cookie banner is required for any of these — they're all designed to be privacy-friendly and cookie-free.

| Provider | Why you might pick it | Setup |
|---|---|---|
| **GoatCounter** | Simplest signup, generous free tier, open source, public or private stats dashboard | Create a free account at [goatcounter.com](https://www.goatcounter.com/) and pick a site code (e.g. `masonpyle`). Set `provider: "goatcounter"` and `goatcounterCode: "masonpyle"`. |
| **Cloudflare Web Analytics** | Free, no account needed beyond Cloudflare, works on any host (doesn't require proxying traffic through Cloudflare) | Add your site at the [Cloudflare dashboard → Web Analytics](https://dash.cloudflare.com/?to=/:account/analytics/rum), copy the "token" it gives you. Set `provider: "cloudflare"` and `cloudflareToken: "<that token>"`. |
| **Plausible** | Nicer dashboard, but paid (or self-hosted) | Sign up at [plausible.io](https://plausible.io/) and add your domain. Set `provider: "plausible"` and `plausibleDomain: "masonpyle.com"`. |

Once set, `src/site.js` injects the right tracking script on every page automatically — you don't need to touch any HTML. To turn tracking off again, set `provider: "none"`.

All three show you visit counts, top pages, referrers, and rough device/location info without tracking individuals across sites — good enough to see "did anyone look at this after I sent my résumé" without needing a cookie consent banner.

---

## What's new in this version

- **`/projects/` page.** All projects now live on their own page; the home page shows only your featured picks (`featured: true` in `data.js`), with a "View all projects" link.
- **One file to edit.** All content — bio, projects, experience, skills, contact info — now lives in `src/data.js` instead of being spread across HTML files. `src/site.js` renders every page from it.
- **New-project template.** `projects/_template/` gives you a ready-to-copy shell for adding future projects (see [Adding a new project](#adding-a-new-project)).
- **Visitor analytics**, off by default, one field away from on — see above.
- **SEO & professional polish:**
  - Open Graph / Twitter preview tags and a generated `public/og-image.png` so links look good when shared on LinkedIn, Slack, iMessage, etc.
  - A branded favicon (`public/favicon.svg`) using your initials.
  - `robots.txt` and `sitemap.xml` so search engines can find and index every page.
  - A `Person` JSON-LD block on the home page (helps search engines associate your name with the site).
  - A branded 404 page instead of a blank error.
  - A skip-to-content link for keyboard/screen-reader users.
- **Standardized design system** (carried over): styling runs through reusable classes (`.container-site`, `.section`, `.btn`, `.tag`, `.media-placeholder`, etc.) defined once in `src/style.css`.

## Before you deploy — replace these placeholders

| Placeholder | Where |
|---|---|
| `https://github.com/masonpyle/resume/raw/main/Pyle_Mason_Resume.pdf` | `person.resumeUrl` in `src/data.js` |
| Project repo/team-site links | `links` on each project in `src/data.js` |
| `https://github.com/masonpyle` / `https://linkedin.com/in/masonpyle` | `social` in `src/data.js` |
| `masonpyle.com` | `public/CNAME`, plus `site.domain` in `src/data.js`, plus the canonical/og URLs in each HTML `<head>` |
| Every `media-placeholder` box on project pages | Swap for real `<img>` tags once you have photos/diagrams/CAD renders — see [Adding images](#adding-images) |
| The `code-panel` snippet on each project page | Clearly marked as a placeholder — swap for a real excerpt from that project's actual source, or remove the section if you'd rather just link to the repo |
| `public/og-image.png` | Regenerate or replace if you change your name/role — it's a static 1200×630 image, not generated from `data.js` |

## Deploying to GitHub Pages with a custom domain

`.github/workflows/deploy.yml` builds and deploys automatically on every push to `main` — no manual build step.

1. Edit `public/CNAME` to your real domain.
2. Push to GitHub, set **Settings → Pages → Source** to **"GitHub Actions."**
3. Point your domain's DNS at GitHub Pages (four A records to `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`, plus a TXT record if GitHub asks you to verify the domain).

## Self-hosting

`deploy/` also has an nginx config, a Proxmox LXC setup guide, and a Cloudflare Tunnel config if you'd rather run this on your own server instead of (or alongside) GitHub Pages.
