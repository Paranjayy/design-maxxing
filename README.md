<div align="center">

# design maxxing

**436 web dev projects, animations, and templates — all browsable in one place.**

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Paranjayy/design-maxxing)
[![DeepWiki](https://deepwiki.com/badge/Paranjayy/design-maxxing)](https://deepwiki.com/Paranjayy/design-maxxing)
[Live Demo](https://viewer-app-iota.vercel.app)

---

</div>

## How It Works

This project is a **static viewer** that takes 436 zip files — 405 source code projects and 31 website templates — extracts them into individual folders, and generates a fully static Next.js site where every item can be previewed live in the browser without downloading anything.

### The Pipeline

```
zips_organized/ (436 .zip files)
    ↓ extract
public/items/ (436 folders with HTML/CSS/JS)
    ↓ catalog
data/items-manifest.json (id, title, category, path)
    ↓ generate
Next.js SSG → 441 static pages → deploy to Vercel
```

**Step 1 — Zip extraction.** 436 zip files live under `zips_organized/`, organized by category (scroll animations, hover effects, landing pages, 3D, etc.). Each zip is extracted into its own folder under `public/items/`. These folders contain the **complete source** — HTML, CSS, JavaScript, React/Next.js builds, images, fonts, everything the original project needs to render.

**Step 2 — Manifest generation.** A script reads every extracted folder and builds a static manifest at `data/items-manifest.json`. Each entry records the item's `id`, `title`, `category`, `kind` (source or template), `zipName`, `folderName`, and `indexFile` — everything the viewer needs to render and link to it.

**Step 3 — Static page generation.** Next.js uses SSG (Static Site Generation) to produce **441 static pages** at build time:
- 1 homepage (`/`)
- 1 browse page (`/browse`) with category filtering, search, and sort
- 439 item pages (`/view/[id]`) — one for every cataloged item, plus the browse page with query params

Because everything is pre-rendered, the deployed site has **zero server processing** — Vercel just serves static files.

### Browse Page

The browse page loads the manifest on the server and renders a responsive grid of cards. Each card contains a **live iframe thumbnail**: the actual extracted project renders inside a `<iframe>` at `200%` scale, then gets CSS-scaled back down to `50%` with `transform: scale(0.5)`. This gives you crisp, retina-quality previews at half the visual size. The iframes are `pointer-events-none` and use `loading="lazy"` so they don't impact initial page load.

### Viewer Page

Clicking any card opens the viewer page, which fills the entire viewport with a **sandboxed iframe** (`allow-scripts allow-same-origin allow-forms allow-popups`). This lets you interact with the project exactly as the author intended.

**Device modes** change the iframe width to simulate different screen sizes:

| Mode | Width |
|------|-------|
| Desktop | 100% |
| Tablet | 768px |
| Mobile | 375px |

In **Full mode**, the chrome (header + toolbar) auto-hides after a period of inactivity. Move the mouse to bring it back.

**Navigation** between items uses arrow keys (`←` / `→`) or hover zones on the left/right edges of the viewport.

### Trimmed vs Full Deploy

The Vercel deployment uses a **trimmed** version of the extracted folders — large binary assets (videos, 3D models, large images) are removed to stay under Vercel's **100MB free tier deploy limit**. The original zips in the repository contain everything. Running locally with `npm run dev` gives you the full untrimmed experience.

---

## Categories

| # | Category | Items |
|---|----------|------:|
| 1 | Scroll Animations | 128 |
| 2 | Sliders & Carousels | 39 |
| 3 | Miscellaneous | 39 |
| 4 | Hover Effects | 31 |
| 5 | Website Templates | 31 |
| 6 | Menus & Navigation | 29 |
| 7 | Landing Pages | 26 |
| 8 | Cards & Sticky | 22 |
| 9 | Galleries | 20 |
| 10 | 3D & Three.js | 17 |
| 11 | UI Sections | 14 |
| 12 | Page Transitions | 12 |
| 13 | Text Animations | 11 |
| 14 | Clip & Mask | 6 |
| 15 | Canvas | 5 |
| 16 | Preloaders | 3 |
| 17 | Minimap | 2 |
| 18 | Draggable | 1 |

---

## Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| **Next.js** | 15 | App Router, static site generation, routing |
| **React** | 19 | Component framework |
| **Tailwind CSS** | v4 | Utility-first styling |
| **TypeScript** | 5 | Type safety |

---

## Getting Started

```bash
git clone https://github.com/Paranjayy/design-maxxing.git
cd design-maxxing/viewer-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Running locally gives you the **full untrimmed** experience — all 436 items with their original assets intact (videos, 3D models, large images).

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Desktop view (100%) |
| `2` | Tablet view (768px) |
| `3` | Mobile view (375px) |
| `F` | Full screen (auto-hiding chrome) |
| `⌘R` | Refresh the iframe |
| `Esc` | Go back to browse |
| `←` | Previous item |
| `→` | Next item |

---

## Deployment

### Vercel (Recommended)

This project is fully static — `npm run build` produces a self-contained `out/` directory with zero server dependencies.

```bash
npm run build
```

Push to GitHub, connect the repo to Vercel, and it deploys automatically. The free tier handles everything since there's no server-side logic.

> **Note:** The Vercel deployment trims large binary assets to stay under the **100MB deploy limit**. This keeps videos, 3D models, and oversized images out of the build while preserving all HTML/CSS/JS that makes each project render correctly.

### Local Development

```bash
npm run dev
```

This runs the full untrimmed version with all original assets — no size limits, no trimming.

---

## Project Structure

```
design-maxxing/
├── zips_organized/              # 436 original .zip files by category
├── viewer-app/                  # Next.js viewer application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── globals.css      # Global styles
│   │   │   ├── not-found.tsx    # 404 page
│   │   │   ├── browse/
│   │   │   │   └── page.tsx     # Browse grid with filtering/sort
│   │   │   └── view/
│   │   │       └── [id]/
│   │   │           └── page.tsx # Per-item viewer page
│   │   └── lib/
│   │       └── items.ts         # Manifest reader, filters, categories
│   ├── data/
│   │   └── items-manifest.json  # Static catalog of all 436 items
│   ├── public/
│   │   └── items/               # 436 extracted project folders
│   │       ├── scroll-animations/
│   │       ├── hover-effects/
│   │       ├── landing-pages/
│   │       ├── 3d-threejs/
│   │       ├── templates/
│   │       └── ...              # (one folder per zip)
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## License

MIT
