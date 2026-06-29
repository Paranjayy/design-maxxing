import Link from "next/link";
import { getSourceCategories, getItemsByFilter } from "@/lib/items";
import InstantSearch from "@/components/InstantSearch";
import { getItems } from "@/lib/items";

function formatCatName(name: string): string {
  return name
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{
    cat?: string;
    kind?: string;
    q?: string;
    sort?: string;
  }>;
}) {
  const { cat, kind, q, sort } = await searchParams;
  const categories = getSourceCategories();
  const items = getItemsByFilter({ category: cat, kind, q, sort });
  const allItems = getItems();

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    if (overrides.cat ?? cat) params.set("cat", overrides.cat ?? cat!);
    if (overrides.kind ?? kind) params.set("kind", overrides.kind ?? kind!);
    if (overrides.q ?? q) params.set("q", overrides.q ?? q!);
    if (overrides.sort ?? sort) params.set("sort", overrides.sort ?? sort!);
    return `/browse?${params.toString()}`;
  };

  const searchItems = allItems.map((item) => ({
    id: item.id,
    title: item.title || item.zipName.replace(/\.zip$/, ""),
    category: item.category,
    kind: item.kind,
    folderName: item.folderName,
    indexFile: item.indexFile,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <InstantSearch items={searchItems} />

      {/* Sticky header */}
      <header className="sticky top-0 z-30 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white hover:text-[#c4b5fd] transition-colors shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-xs">
              D
            </div>
            <span className="text-xs font-semibold tracking-tight hidden sm:inline">
              design maxxing
            </span>
          </Link>

          <div className="h-5 w-px bg-white/10 shrink-0" />

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0">
            <Link
              href="/browse"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${!cat && !kind ? "bg-[#8b5cf6]/15 text-[#a78bfa]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
            >
              All
            </Link>
            <Link
              href="/browse?kind=source"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${kind === "source" ? "bg-[#8b5cf6]/15 text-[#a78bfa]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
            >
              Source Code
            </Link>
            <Link
              href="/browse?kind=template"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${kind === "template" ? "bg-[#10b981]/15 text-[#34d399]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
            >
              Templates
            </Link>
            <div className="h-4 w-px bg-white/10 mx-1 shrink-0" />
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/browse?cat=${c.slug}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${cat === c.slug ? "bg-[#8b5cf6]/15 text-[#a78bfa]" : "text-zinc-500 hover:text-white hover:bg-white/5"}`}
              >
                {formatCatName(c.slug)}
              </Link>
            ))}
          </div>

          <form
            className="shrink-0 hidden sm:block"
            action="/browse"
            method="get"
          >
            {cat && <input type="hidden" name="cat" value={cat} />}
            {kind && <input type="hidden" name="kind" value={kind} />}
            {sort && <input type="hidden" name="sort" value={sort} />}
            <input
              name="q"
              defaultValue={q || ""}
              placeholder="Search..."
              className="w-40 lg:w-56 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/40 transition-colors"
            />
          </form>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-5 py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {q
                ? `Search: "${q}"`
                : cat
                  ? formatCatName(cat)
                  : kind === "template"
                    ? "Templates"
                    : kind === "source"
                      ? "Source Code"
                      : "All Projects"}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {items.length} item{items.length !== 1 ? "s" : ""}
              <span className="text-zinc-700 ml-2">
                Press{" "}
                <kbd className="px-1 py-0.5 rounded bg-white/5 text-zinc-500 font-mono text-[10px]">
                  /
                </kbd>{" "}
                to quick search
              </span>
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {[
              { key: "default", label: "Recent" },
              { key: "az", label: "A→Z" },
              { key: "cat", label: "Category" },
            ].map((opt) => (
              <Link
                key={opt.key}
                href={buildHref({
                  sort: opt.key === "default" ? undefined : opt.key,
                })}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${(sort || "default") === opt.key ? "bg-[#8b5cf6]/20 text-[#a78bfa]" : "text-zinc-500 hover:text-white hover:bg-white/5"}`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 text-zinc-600 text-sm">
            No items found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/view/${item.id}`}
                className="group rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/5 transition-all duration-200"
              >
                <div className="aspect-video bg-[#0c0c0c] relative overflow-hidden border-b border-white/5">
                  <iframe
                    src={`/items/${item.folderName}/${item.indexFile}`}
                    className="absolute top-0 left-0 border-0 pointer-events-none"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    style={{
                      width: "200%",
                      height: "200%",
                      transform: "scale(0.5)",
                      transformOrigin: "top left",
                    }}
                    title=""
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-[#8b5cf6]/5 transition-colors" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${item.kind === "template" ? "bg-[#10b981]/15 text-[#34d399]" : "bg-[#8b5cf6]/15 text-[#a78bfa]"}`}
                    >
                      {item.kind === "template" ? "Template" : "Source"}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-white group-hover:text-[#c4b5fd] transition-colors line-clamp-2 leading-snug">
                    {item.title || item.zipName.replace(/\.zip$/, "")}
                  </div>
                  <div className="text-xs text-zinc-600 mt-2 truncate">
                    {item.displayName || formatCatName(item.category)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
