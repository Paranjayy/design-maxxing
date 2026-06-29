"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FavoritesButton from "@/components/FavoritesButton";
import EmptyState from "@/components/EmptyState";

const FAV_KEY = "dm-favorites";

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function formatCatName(name: string): string {
  return name
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface FavoriteItem {
  id: string;
  title: string;
  category: string;
  folderName: string;
  indexFile: string;
  kind: string;
}

export default function FavoritesContent({ items }: { items: FavoriteItem[] }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavoriteIds(readFavorites());

    function sync() {
      setFavoriteIds(readFavorites());
    }
    window.addEventListener("dm-favorites-changed", sync);
    return () => window.removeEventListener("dm-favorites-changed", sync);
  }, []);

  const favItems = mounted
    ? items.filter((item) => favoriteIds.includes(item.id))
    : [];

  if (!mounted) {
    return (
      <div className="text-center py-20 text-zinc-600 text-sm">Loading...</div>
    );
  }

  if (favItems.length === 0) {
    return (
      <EmptyState
        icon="☆"
        title="No favorites yet"
        description="Browse projects and click the star icon to add them here."
        ctaLabel="Browse Projects →"
        ctaHref="/browse"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {favItems.map((item) => (
        <div key={item.id} className="relative group">
          <Link
            href={`/view/${item.id}`}
            className="block rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/5 transition-all duration-200"
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
                {item.title || item.id}
              </div>
              <div className="text-xs text-zinc-600 mt-2 truncate">
                {formatCatName(item.category)}
              </div>
            </div>
          </Link>
          <div className="absolute top-3 right-3 z-10">
            <FavoritesButton
              itemId={item.id}
              className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
