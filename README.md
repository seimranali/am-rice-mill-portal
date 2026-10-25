# AM Rice Mill — Company Website

Website for **AM Rice Mill** (rice milling, Kamoke, Gujranwala, Pakistan) — live at **https://amricemill.com**.

Built with [Astro](https://astro.build) (static HTML/CSS, very little JavaScript) and hosted on **Cloudflare Pages**. The contact form and admin panel run on **Cloudflare Pages Functions** with a **D1** (SQLite) database.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Site only, with hot reload, at `localhost:4321` |
| `npm run dev:full` | Build, then run the full Cloudflare stack locally (site + `/api` + local D1) at `localhost:8788` |
| `npm run build` | Build the production site into `dist/` |
| `npm run hash-password -- "<password>"` | Create a value for the `ADMIN_PASSWORD_HASH` secret |
| `npm run db:migrate` | Apply `migrations/` to the production D1 database |

For `npm run dev:full`, create `.dev.vars` (git-ignored) containing `ADMIN_PASSWORD_HASH=<hash>`, and run `npx wrangler d1 migrations apply am-rice-mill --local` once.

## Deployment (Cloudflare Pages)

Every push to `main` on GitHub is built and deployed automatically by Cloudflare Pages.

**Build settings** (Cloudflare dashboard → Workers & Pages → am-rice-mill → Settings → Build):

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |

**One-time setup**

1. `npx wrangler login`
2. `npx wrangler d1 create am-rice-mill` → copy the `database_id` into `wrangler.toml`
3. `npm run db:migrate`
4. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick this repository, use the build settings above.
5. Settings → **Variables and Secrets** → add secret `ADMIN_PASSWORD_HASH` (from `npm run hash-password -- "<password>"`). `ADMIN_USER` comes from `wrangler.toml`.
6. Settings → **Bindings** → confirm D1 binding `DB` → `am-rice-mill` (picked up from `wrangler.toml`).
7. **Custom domains** → add `amricemill.com` (and `www.amricemill.com`).

## Contact form & admin panel

- `POST /api/contact` saves inquiries to D1 (`functions/api/contact.ts`), with validation, a honeypot field and per-IP rate limiting.
- **/admin** lists inquiries (search, unread/read filter, CSV export, WhatsApp/email links, delete). Login uses `ADMIN_USER` + `ADMIN_PASSWORD_HASH` (PBKDF2-SHA256); sessions are HttpOnly, Secure cookies stored in D1 and expire after 8 hours.
- To change the admin password: `npm run hash-password -- "<new password>"`, then replace the `ADMIN_PASSWORD_HASH` secret in Cloudflare.
- Back up inquiries: `npx wrangler d1 export am-rice-mill --remote --output backup.sql`

## Updating company information

**Nearly all content lives in [`src/data/site.ts`](src/data/site.ts).** Search that file for `TODO` to find everything that still needs real data:

- **Contact details**: phone, WhatsApp number (digits only, international format), email, address, map link, business hours
- **Domain**: `company.url` (also set `site` in `astro.config.mjs`)
- **Statistics**: replace the sample figures in `stats`, then set `statsArePlaceholder = false` to remove the notice under them
- **Products**: descriptions and the spec rows shown in each product's "View Details" dialog (varieties, grades, pack sizes)
- **By-products**, **process steps**, **quality indicators** and **why-choose-us** features
- **Professional team**: names, roles and short bios in `team`. Save portrait photos (4:5, about 800×1000px) in `public/images/team/` and set each member's `photo` path. Optional `email`, `phone` and `linkedin` add contact icons to the photo.
- **Certifications**: add entries to `certifications` and they appear in the Quality section automatically
- **Social media**: fill in the `url` for each network; icons appear in the footer only when a URL is set

### Images

Images are in `public/images/`. Each one comes in two sizes, `<name>-800.webp` and `<name>-1600.webp`, and the browser picks the right one. The hero also has a `hero-2400.webp`.

To use your own photos (recommended: real photos of the mill, machinery, warehouse and products), export each one at 800px and 1600px wide as WebP (quality around 70) and save them with the same file names. For gallery images, update the `h` value in `site.ts` to the height of the 800px version.

**Logo:** the master artwork is in `src/assets/` (`logo-original.png` as supplied, and `logo-master.png` with the shield interior filled white so the "AM" stays readable on dark backgrounds). The site uses `public/images/logo.png` (160px tall), `public/images/logo-512.png` (search engines), `public/favicon.png` and `public/apple-touch-icon.png`, all exported from the master.

The current photos are placeholder stock images from [Unsplash](https://unsplash.com) (free to use under the Unsplash License). Replace them with AM Rice Mill's own photography before launch.

## Project structure

```
functions/                ← Cloudflare Pages Functions (/api)
migrations/               ← D1 database schema
src/
  data/site.ts            ← all editable content
  pages/admin.astro       ← admin panel (inquiries)
  layouts/Base.astro      ← <head>, SEO meta, structured data
  pages/index.astro       ← assembles the page from sections
  components/
    sections/             ← Header, Hero, About, Business, Process, Products,
                            ByProducts, Quality, WhyUs, Stats, Gallery,
                            SupplyChain, Contact, Footer, WhatsAppFab
    ui/                   ← Icon, Picture, SectionHeading, Logo
  scripts/main.ts         ← header, menu, scroll animations, counters,
                            dialogs, lightbox, form handling
  styles/global.css       ← design tokens and all styles (mobile-first)
```

## Design tokens

Colours, fonts, spacing, radii and shadows are CSS variables at the top of `src/styles/global.css`. Change them there and the whole site updates.

## Accessibility and performance

- Semantic landmarks, one `h1`, logical heading order, and a skip link
- Keyboard-accessible menu, dialogs and lightbox (Esc closes; arrow keys move between gallery images)
- Visible focus states and 44px+ touch targets
- Respects `prefers-reduced-motion`
- Content stays visible if JavaScript is disabled
- Responsive WebP images, lazy loading below the fold, and a preloaded hero image

