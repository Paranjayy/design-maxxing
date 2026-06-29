import Link from "next/link";
import { getStats, getSourceCategories, getItems } from "@/lib/items";
import RecentlyViewed from "@/components/RecentlyViewed";

function formatCatName(name: string): string {
  return name
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Home() {
  const stats = getStats();
  const categories = getSourceCategories();
  const items = getItems();

  // Pick a random item for the "Surprise Me" button
  const randomItem = items[Math.floor(Math.random() * items.length)];

  // All items data for RecentlyViewed component
  const allItemsData = items.map((item) => ({
    id: item.id,
    title: item.title || item.zipName.replace(/\.zip$/, ""),
    category: item.category,
    folderName: item.folderName,
    indexFile: item.indexFile,
  }));

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/8 via-transparent to-[#06b6d4]/5" />
        <div className="max-w-7xl mx-auto px-5 py-20 sm:py-28 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">
              design maxxing
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-3xl">
            <span className="text-[#8b5cf6]">{stats.total}+</span> web dev
            projects
            <br />
            <span className="text-zinc-500 text-3xl sm:text-4xl lg:text-5xl">
              all browsable, right here
            </span>
          </h1>

          <p className="mt-5 text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Animations, landing pages, 3D scenes, UI components, full website
            templates — every single one viewable in its full glory without
            downloading a thing.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8b5cf6] text-white text-sm font-medium hover:bg-[#7c3aed] transition-colors"
            >
              Browse Everything <span className="text-lg">→</span>
            </Link>
            {randomItem && (
              <Link
                href={`/view/${randomItem.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              >
                🎲 Surprise Me
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-8 mt-12">
            {[
              { n: stats.total, label: "total items" },
              { n: stats.sources, label: "source code" },
              { n: stats.templates, label: "templates" },
              { n: stats.categories, label: "categories" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white tabular-nums">
                  {s.n.toLocaleString()}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
              </div>
            ))}
            <Link href="/stats" className="flex items-center">
              <div className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] transition-colors border border-[#8b5cf6]/20 rounded-lg px-3 py-1.5">
                View Stats →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="max-w-7xl mx-auto px-5 pt-14">
        <RecentlyViewed items={allItemsData} />
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-5 py-14">
        <h2 className="text-lg font-semibold text-white mb-6">
          Source Code Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/browse?cat=${cat.slug}`}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/5 transition-all duration-200"
            >
              <div className="text-2xl mb-3 opacity-40 group-hover:opacity-100 transition-opacity">
                {cat.icon}
              </div>
              <div className="text-sm font-medium text-white group-hover:text-[#c4b5fd] transition-colors leading-tight">
                {formatCatName(cat.slug)}
              </div>
              <div className="text-xs text-zinc-600 mt-2">
                {cat.count} item{cat.count !== 1 ? "s" : ""}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Templates Link */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <Link
          href="/browse?kind=template"
          className="block rounded-xl border border-white/5 bg-gradient-to-r from-[#8b5cf6]/5 to-[#06b6d4]/5 p-8 hover:border-[#8b5cf6]/20 transition-all"
        >
          <div className="text-lg font-semibold text-white mb-1">
            31 Full Website Templates →
          </div>
          <div className="text-sm text-zinc-500">
            Portfolios, SaaS sites, creative agencies, studios — complete
            monthly builds from 2023-2026.
          </div>
        </Link>
      </section>
    </main>
  );
}
