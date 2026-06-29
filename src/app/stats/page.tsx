import Link from "next/link";
import { getStats, getSourceCategories, getItems } from "@/lib/items";

function formatCatName(name: string): string {
  return name
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function StatsPage() {
  const stats = getStats();
  const categories = getSourceCategories();
  const allCategories = (() => {
    const items = getItems();
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.category, (map.get(item.category) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([slug, count]) => ({ slug, count }))
      .sort((a, b) => b.count - a.count);
  })();

  const maxCat = Math.max(...allCategories.map((c) => c.count));

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white hover:text-[#c4b5fd] transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-xs">
              D
            </div>
            <span className="text-xs font-semibold tracking-tight hidden sm:inline">
              design maxxing
            </span>
          </Link>
          <div className="h-5 w-px bg-white/10" />
          <span className="text-sm text-zinc-400">Stats</span>
          <div className="flex-1" />
          <Link
            href="/browse"
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            ← Back to browse
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Collection Stats
        </h1>
        <p className="text-sm text-zinc-500 mb-10">
          A breakdown of all {stats.total} projects in the collection.
        </p>

        {/* Overview cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { n: stats.total, label: "Total Projects", color: "text-white" },
            { n: stats.sources, label: "Source Code", color: "text-[#a78bfa]" },
            { n: stats.templates, label: "Templates", color: "text-[#34d399]" },
            { n: stats.categories, label: "Categories", color: "text-zinc-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
            >
              <div className={`text-3xl font-bold tabular-nums ${s.color}`}>
                {s.n.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Source vs Template visual bar */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Source vs Template
          </h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
            <div className="flex h-8 rounded-lg overflow-hidden mb-4">
              <div
                className="bg-[#8b5cf6] flex items-center justify-center text-[10px] font-medium text-white transition-all"
                style={{
                  width: `${(stats.sources / stats.total) * 100}%`,
                }}
              >
                {stats.sources > 10 && `${stats.sources} Source`}
              </div>
              <div
                className="bg-[#10b981] flex items-center justify-center text-[10px] font-medium text-white transition-all"
                style={{
                  width: `${(stats.templates / stats.total) * 100}%`,
                }}
              >
                {stats.templates > 5 && `${stats.templates} Templates`}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#8b5cf6]" />
                <span className="text-xs text-zinc-400">
                  Source Code ({stats.sources} ·{" "}
                  {((stats.sources / stats.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#10b981]" />
                <span className="text-xs text-zinc-400">
                  Templates ({stats.templates} ·{" "}
                  {((stats.templates / stats.total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Top 5 categories */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Top 5 Categories
          </h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
            {allCategories.slice(0, 5).map((cat, i) => (
              <div key={cat.slug}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-600 font-mono w-4">
                      {i + 1}.
                    </span>
                    <span className="text-sm text-white">
                      {formatCatName(cat.slug)}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 tabular-nums">
                    {cat.count}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden ml-6">
                  <div
                    className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full transition-all"
                    style={{
                      width: `${(cat.count / maxCat) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All categories */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            All Categories
          </h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 space-y-3">
            {allCategories.map((cat) => (
              <div key={cat.slug}>
                <div className="flex items-center justify-between mb-1">
                  <Link
                    href={`/browse?cat=${cat.slug}`}
                    className="text-sm text-zinc-400 hover:text-[#c4b5fd] transition-colors"
                  >
                    {formatCatName(cat.slug)}
                  </Link>
                  <span className="text-xs text-zinc-600 tabular-nums">
                    {cat.count}
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/10 rounded-full"
                    style={{
                      width: `${(cat.count / maxCat) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-sm font-medium hover:bg-[#8b5cf6]/20 transition-colors"
          >
            Browse All Projects →
          </Link>
        </div>
      </main>
    </div>
  );
}
