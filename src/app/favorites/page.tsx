import Link from "next/link";
import { getItems } from "@/lib/items";
import FavoritesContent from "./FavoritesContent";

export const metadata = {
  title: "Favorites",
  description: "Your saved favorite web dev projects.",
};

export default function FavoritesPage() {
  const items = getItems().map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    folderName: item.folderName,
    indexFile: item.indexFile,
    kind: item.kind,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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
          <Link
            href="/browse"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Browse
          </Link>
          <span className="text-xs text-[#a78bfa] font-medium">Favorites</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-5 py-8 flex-1 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Favorites
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          Projects you&apos;ve bookmarked for quick access.
        </p>
        <FavoritesContent items={items} />
      </main>
    </div>
  );
}
