"use client";

import { useState, useEffect } from "react";

const FAV_KEY = "dm-favorites";

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("dm-favorites-changed"));
}

export default function FavoritesButton({
  itemId,
  className = "",
}: {
  itemId: string;
  className?: string;
}) {
  const [isFav, setIsFav] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsFav(readFavorites().includes(itemId));

    function sync() {
      setIsFav(readFavorites().includes(itemId));
    }
    window.addEventListener("dm-favorites-changed", sync);
    return () => window.removeEventListener("dm-favorites-changed", sync);
  }, [itemId]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const current = readFavorites();
    let next: string[];
    if (current.includes(itemId)) {
      next = current.filter((id) => id !== itemId);
    } else {
      next = [...current, itemId];
    }
    writeFavorites(next);
    setIsFav(next.includes(itemId));
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center justify-center transition-colors ${className}`}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {mounted ? (
        <span
          className={`text-lg leading-none ${isFav ? "text-[#8b5cf6]" : "text-zinc-600 hover:text-zinc-400"}`}
        >
          {isFav ? "★" : "☆"}
        </span>
      ) : (
        <span className="text-lg leading-none text-zinc-700">☆</span>
      )}
    </button>
  );
}
