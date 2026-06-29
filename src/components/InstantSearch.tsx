"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface InstantSearchProps {
  items: Array<{
    id: string;
    title: string;
    category: string;
    kind: string;
    folderName: string;
    indexFile: string;
  }>;
}

export default function InstantSearch({ items }: InstantSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? items
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 50)
    : [];

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "/") {
        e.preventDefault();
        handleOpen();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleOpen]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered.length > 0) {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) {
          window.location.href = `/view/${item.id}`;
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, handleClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative z-10 w-full max-w-xl mx-4 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 border-b border-white/5">
          <span className="text-zinc-500 text-sm">⌕</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="flex-1 py-4 bg-transparent text-white text-base placeholder-zinc-600 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-zinc-600 hover:text-white text-xs transition-colors"
            >
              Clear
            </button>
          )}
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-500 font-mono text-[10px]">
            Esc
          </kbd>
        </div>

        {query.trim() && (
          <div className="max-h-[50vh] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-zinc-600">
                No projects found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="py-2">
                <div className="px-5 py-1.5 text-[10px] font-medium text-zinc-600 uppercase tracking-wider">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </div>
                {filtered.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`/view/${item.id}`}
                    className={`flex items-center gap-3 px-5 py-2.5 transition-colors ${
                      i === selectedIndex
                        ? "bg-[#8b5cf6]/10 text-[#c4b5fd]"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-medium ${
                        item.kind === "template"
                          ? "bg-[#10b981]/15 text-[#34d399]"
                          : "bg-[#8b5cf6]/15 text-[#a78bfa]"
                      }`}
                    >
                      {item.kind === "template" ? "T" : "S"}
                    </span>
                    <span className="text-sm truncate">{item.title}</span>
                    <span className="text-[10px] text-zinc-600 ml-auto shrink-0 hidden sm:inline">
                      {item.category.replace(/^\d+-/, "").replace(/-/g, " ")}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {!query.trim() && (
          <div className="px-5 py-6 text-center">
            <p className="text-sm text-zinc-600">
              Start typing to search across all projects
            </p>
            <p className="text-[11px] text-zinc-700 mt-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-500 font-mono text-[10px]">
                ↑↓
              </kbd>{" "}
              navigate ·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-500 font-mono text-[10px]">
                Enter
              </kbd>{" "}
              open ·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-500 font-mono text-[10px]">
                Esc
              </kbd>{" "}
              close
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
