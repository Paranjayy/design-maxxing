import fs from "fs";
import path from "path";

export interface Item {
  id: string;
  zipName: string;
  folderName: string;
  indexFile: string;
  category: string;
  kind: "source" | "template";
  title: string;
  displayName: string;
}

let _cache: Item[] | null = null;

export function getItems(): Item[] {
  if (_cache) return _cache;
  const p = path.join(process.cwd(), "data", "items-manifest.json");
  if (!fs.existsSync(p)) {
    _cache = [];
    return _cache;
  }
  _cache = JSON.parse(fs.readFileSync(p, "utf-8")) as Item[];
  return _cache;
}

export function getStats() {
  const items = getItems();
  return {
    total: items.length,
    sources: items.filter((i) => i.kind === "source").length,
    templates: items.filter((i) => i.kind === "template").length,
    categories: [...new Set(items.map((i) => i.category))].length,
  };
}

export interface CatInfo {
  slug: string;
  name: string;
  count: number;
  icon: string;
}

const ICONS: Record<string, string> = {
  "01-scroll-animations": "↗",
  "02-landing-page-reveals": "▶",
  "03-menus-navigation": "☰",
  "04-sliders-carousels": "⟲",
  "05-hover-effects": "◉",
  "06-text-animations": "Aa",
  "07-cards-sticky": "▦",
  "08-galleries": "⊞",
  "09-page-transitions": "⟳",
  "10-3d-threejs": "◆",
  "11-miscellaneous": "⋯",
  "12-preloaders": "◌",
  "13-ui-sections": "▭",
  "14-minimap": "◳",
  "15-draggable": "✥",
  "16-canvas": "◎",
  "17-clip-mask": "◐",
  templates: "⬡",
};

export function getCategories(): CatInfo[] {
  const items = getItems();
  const map = new Map<string, number>();
  for (const item of items)
    map.set(item.category, (map.get(item.category) || 0) + 1);
  return Array.from(map.entries())
    .map(([slug, count]) => ({
      slug,
      name: items.find((i) => i.category === slug)?.displayName || slug,
      count,
      icon: ICONS[slug] || "•",
    }))
    .sort((a, b) => b.count - a.count);
}

export function getSourceCategories(): CatInfo[] {
  return getCategories().filter((c) => c.slug !== "templates");
}

export function getItemsByFilter(opts: {
  category?: string;
  kind?: string;
  q?: string;
  sort?: string;
}): Item[] {
  let items = getItems();
  if (opts.category && opts.category !== "all")
    items = items.filter((i) => i.category === opts.category);
  if (opts.kind) items = items.filter((i) => i.kind === opts.kind);
  if (opts.q) {
    const q = opts.q.toLowerCase();
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q),
    );
  }
  if (opts.sort === "az")
    items = [...items].sort((a, b) => a.title.localeCompare(b.title));
  else if (opts.sort === "za")
    items = [...items].sort((a, b) => b.title.localeCompare(a.title));
  else if (opts.sort === "cat")
    items = [...items].sort((a, b) => a.category.localeCompare(b.category));
  return items;
}

export function getItem(id: string): Item | undefined {
  return getItems().find((i) => i.id === id);
}

export function getAdjacentItems(id: string): {
  prev: Item | null;
  next: Item | null;
} {
  const items = getItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? items[idx - 1] : null,
    next: idx < items.length - 1 ? items[idx + 1] : null,
  };
}
