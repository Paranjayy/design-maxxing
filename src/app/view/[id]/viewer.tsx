"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ShortcutsModal from "@/components/ShortcutsModal";
import { addToHistory } from "@/lib/history";

interface ViewerProps {
  src: string;
  title: string;
  id: string;
  category: string;
  categoryDisplay: string;
  kind: string;
  prevId: string | null;
  prevTitle: string | null;
  nextId: string | null;
  nextTitle: string | null;
}

type Mode = "desktop" | "tablet" | "mobile" | "full";

function getRandomItem(): { id: string; title: string } | null {
  try {
    const stored = window.sessionStorage.getItem("items-ids");
    if (!stored) return null;
    const ids: string[] = JSON.parse(stored);
    if (!ids.length) return null;
    return { id: ids[Math.floor(Math.random() * ids.length)], title: "" };
  } catch {
    return null;
  }
}

export default function Viewer({
  src,
  title,
  id,
  category,
  categoryDisplay,
  kind,
  prevId,
  prevTitle,
  nextId,
  nextTitle,
}: ViewerProps) {
  const [mode, setMode] = useState<Mode>("full");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showChrome, setShowChrome] = useState(true);
  const [bgDark, setBgDark] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [randomHref, setRandomHref] = useState<string | null>(null);
  const [swipeHint, setSwipeHint] = useState<"left" | "right" | null>(null);

  // Track this item in recently viewed history
  useEffect(() => {
    addToHistory(id);
  }, [id]);

  // Swipe gesture support
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    function onTouchStart(e: TouchEvent) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwiping = false;
    }

    function onTouchMove(e: TouchEvent) {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      // Only register horizontal swipes (dx > dy threshold)
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        isSwiping = true;
        setSwipeHint(dx < 0 ? "right" : "left");
      }
    }

    function onTouchEnd(e: TouchEvent) {
      if (!isSwiping) {
        setSwipeHint(null);
        return;
      }
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (dx < -60 && nextId) {
        window.location.href = `/view/${nextId}`;
      } else if (dx > 60 && prevId) {
        window.location.href = `/view/${prevId}`;
      }
      setSwipeHint(null);
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [prevId, nextId]);

  // Fetch a random item id on mount
  useEffect(() => {
    fetch("/api/random-item")
      .then((r) => r.json())
      .then((data) => {
        if (data?.id) setRandomHref(`/view/${data.id}`);
      })
      .catch(() => {});
  }, []);

  // Auto-hide chrome in full mode
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onMove = () => {
      setShowChrome(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (mode === "full") setShowChrome(false);
      }, 2500);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onMove);
    onMove();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onMove);
      clearTimeout(timer);
    };
  }, [mode, refreshKey]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "?") {
        e.preventDefault();
        setShowShortcuts((s) => !s);
        return;
      }

      if (showShortcuts) return;

      if (e.key === "1") setMode("desktop");
      if (e.key === "2") setMode("tablet");
      if (e.key === "3") setMode("mobile");
      if (e.key === "f" || e.key === "F") setMode("full");
      if (e.key === "Escape") window.history.back();
      if (e.key === "ArrowLeft" && prevId)
        window.location.href = `/view/${prevId}`;
      if (e.key === "ArrowRight" && nextId)
        window.location.href = `/view/${nextId}`;
      if (e.key === "r" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setRefreshKey((k) => k + 1);
        setIsLoading(true);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prevId, nextId, showShortcuts]);

  const iframeWidth =
    mode === "mobile" ? "375px" : mode === "tablet" ? "768px" : "100%";

  const bgColor = bgDark ? "#0c0c0c" : "#ffffff";
  const loadingBg = bgDark ? "#0c0c0c" : "#f5f5f5";

  return (
    <>
      <ShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      {/* Iframe */}
      <div
        className="flex-1 relative overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center z-0 transition-colors duration-300"
            style={{ backgroundColor: loadingBg }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin" />
              <div
                className={`text-xs ${bgDark ? "text-zinc-500" : "text-zinc-400"}`}
              >
                {title}
              </div>
            </div>
          </div>
        )}
        <iframe
          key={refreshKey}
          src={src}
          className="absolute inset-0 w-full h-full border-0 transition-all duration-300"
          style={{
            width: mode === "full" ? "100%" : iframeWidth,
            maxWidth: "100%",
            left: mode === "full" ? 0 : "50%",
            transform: mode === "full" ? "none" : "translateX(-50%)",
            backgroundColor: bgDark ? "#ffffff" : "#0c0c0c",
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setIsLoading(false)}
          title={title}
        />

        {/* Side nav arrows */}
        {prevId && (
          <Link
            href={`/view/${prevId}`}
            className="absolute left-0 top-0 bottom-0 w-12 z-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-black/40 to-transparent group/nav"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white text-sm group-hover/nav:bg-[#8b5cf6]/30 transition-colors">
              ←
            </div>
          </Link>
        )}
        {nextId && (
          <Link
            href={`/view/${nextId}`}
            className="absolute right-0 top-0 bottom-0 w-12 z-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-l from-black/40 to-transparent group/nav"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white text-sm group-hover/nav:bg-[#8b5cf6]/30 transition-colors">
              →
            </div>
          </Link>
        )}
      </div>

      {/* Swipe hint overlay */}
      {swipeHint && (
        <div
          className={`fixed inset-0 z-[60] flex items-center pointer-events-none transition-opacity duration-200 ${swipeHint === "left" ? "justify-start pl-4" : "justify-end pr-4"}`}
        >
          <div className="w-12 h-12 rounded-full bg-[#8b5cf6]/20 backdrop-blur flex items-center justify-center text-white text-lg">
            {swipeHint === "left" ? "←" : "→"}
          </div>
        </div>
      )}

      {/* Top bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showChrome ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
      >
        <div className="bg-[#080808]/90 backdrop-blur-xl border-b border-white/5">
          <div className="px-3 sm:px-4 h-9 sm:h-11 flex items-center gap-2 sm:gap-3">
            <Link
              href="/browse"
              className="flex items-center gap-2 text-white hover:text-[#c4b5fd] transition-colors shrink-0"
            >
              <div className="w-6 h-6 rounded-md bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-[10px]">
                D
              </div>
              <span className="text-[11px] font-semibold tracking-tight hidden sm:inline">
                design maxxing
              </span>
            </Link>
            <div className="h-4 w-px bg-white/10 shrink-0" />
            <Link
              href={`/browse?cat=${category}`}
              className="text-[11px] sm:text-xs text-zinc-400 hover:text-[#a78bfa] transition-colors truncate"
            >
              {categoryDisplay}
            </Link>
            <div className="h-4 w-px bg-white/10 shrink-0 hidden sm:block" />
            <div className="text-[11px] sm:text-xs text-zinc-500 truncate hidden sm:block max-w-[300px]">
              {title}
            </div>
            <div className="flex-1" />
            <button
              onClick={() => setBgDark((d) => !d)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-sm hover:bg-white/10 transition-colors"
              title={
                bgDark
                  ? "Switch to light background"
                  : "Switch to dark background"
              }
            >
              {bgDark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setShowShortcuts(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs font-medium text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
              title="Keyboard shortcuts (?)"
            >
              ?
            </button>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-medium ${kind === "template" ? "bg-[#10b981]/15 text-[#34d399]" : "bg-[#8b5cf6]/15 text-[#a78bfa]"}`}
            >
              {kind === "template" ? "Template" : "Source"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom toolbar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${showChrome ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
      >
        <div className="bg-[#080808]/90 backdrop-blur-xl border-t border-white/5">
          <div className="px-3 sm:px-4 h-10 sm:h-12 flex items-center gap-1.5 sm:gap-2 justify-center">
            <div className="flex items-center gap-0.5 sm:gap-1 bg-white/5 rounded-lg p-0.5 sm:p-1">
              {(
                [
                  ["desktop", "🖥", "Desktop"],
                  ["tablet", "📱", "Tablet"],
                  ["mobile", "📲", "Mobile"],
                  ["full", "⛶", "Full"],
                ] as const
              ).map(([key, icon, label]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium transition-all ${mode === key ? "bg-[#8b5cf6]/20 text-[#a78bfa]" : "text-zinc-500 hover:text-white hover:bg-white/5"}`}
                >
                  <span className="mr-0.5 sm:mr-1">{icon}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            <div className="w-px h-4 sm:h-5 bg-white/10 mx-0.5 sm:mx-1" />
            {prevId && (
              <Link
                href={`/view/${prevId}`}
                className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                title={prevTitle || ""}
              >
                ← Prev
              </Link>
            )}
            {nextId && (
              <Link
                href={`/view/${nextId}`}
                className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                title={nextTitle || ""}
              >
                Next →
              </Link>
            )}
            <div className="w-px h-4 sm:h-5 bg-white/10 mx-0.5 sm:mx-1 hidden sm:block" />
            {randomHref && (
              <Link
                href={randomHref}
                className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-all hidden sm:inline-flex"
                title="Random project"
              >
                🎲 Random
              </Link>
            )}
            <button
              onClick={() => {
                setRefreshKey((k) => k + 1);
                setIsLoading(true);
              }}
              className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
              title="Refresh (⌘R)"
            >
              ↻<span className="hidden sm:inline"> Refresh</span>
            </button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-all hidden sm:inline-flex"
            >
              ↗ Open Raw
            </a>
            <div className="w-px h-4 sm:h-5 bg-white/10 mx-0.5 sm:mx-1 hidden sm:block" />
            <div className="text-[10px] text-zinc-600 hidden md:block">
              <kbd className="px-1 py-0.5 rounded bg-white/5 text-zinc-400 font-mono">
                ←→
              </kbd>{" "}
              navigate ·{" "}
              <kbd className="px-1 py-0.5 rounded bg-white/5 text-zinc-400 font-mono">
                F
              </kbd>{" "}
              full ·{" "}
              <kbd className="px-1 py-0.5 rounded bg-white/5 text-zinc-400 font-mono">
                ?
              </kbd>{" "}
              help
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
