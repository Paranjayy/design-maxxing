"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FAV_KEY = "dm-favorites";

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function FavoritesCount() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCount(readFavorites().length);

    function sync() {
      setCount(readFavorites().length);
    }
    window.addEventListener("dm-favorites-changed", sync);
    return () => window.removeEventListener("dm-favorites-changed", sync);
  }, []);

  return (
    <Link
      href="/favorites"
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${mounted && count > 0 ? "bg-[#8b5cf6]/15 text-[#a78bfa]" : "text-zinc-500 hover:text-white hover:bg-white/5"}`}
    >
      <span>♥</span>
      <span className="hidden sm:inline">Favorites</span>
      {mounted && count > 0 && (
        <span className="bg-[#8b5cf6]/20 text-[#a78bfa] px-1.5 py-0.5 rounded text-[10px] font-semibold">
          {count}
        </span>
      )}
    </Link>
  );
}
