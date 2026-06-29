"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getHistory, clearHistory } from "@/lib/history";

interface HistoryItem {
  id: string;
  title: string;
  category: string;
  folderName: string;
  indexFile: string;
}

export default function RecentlyViewed({ items }: { items: HistoryItem[] }) {
  const [historyIds, setHistoryIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistoryIds(getHistory());

    function sync() {
      setHistoryIds(getHistory());
    }
    window.addEventListener("dm-history-changed", sync);
    return () => window.removeEventListener("dm-history-changed", sync);
  }, []);

  if (!mounted || historyIds.length === 0) return null;

  // Map history IDs to item data, only show items we have data for
  const historyItems = historyIds
    .slice(0, 6)
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean) as HistoryItem[];

  if (historyItems.length === 0) return null;

  function formatCategoryName(slug: string): string {
    return slug
      .replace(/^\d+-/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Recently Viewed</h2>
        <button
          onClick={() => {
            clearHistory();
            setHistoryIds([]);
          }}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {historyItems.map((item) => (
          <Link
            key={item.id}
            href={`/view/${item.id}`}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/5 transition-all duration-200"
          >
            <div className="w-12 h-9 rounded bg-[#0c0c0c] border border-white/5 overflow-hidden shrink-0">
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
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-white truncate">
                {item.title || item.id}
              </div>
              <div className="text-xs text-zinc-500 truncate">
                {formatCategoryName(item.category)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
