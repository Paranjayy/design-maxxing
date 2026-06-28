"use client";

import { useState, useEffect } from "react";

interface ViewerProps {
  src: string;
  title: string;
}

type Mode = "desktop" | "tablet" | "mobile" | "full";

const MODES: { key: Mode; label: string; width: string }[] = [
  { key: "desktop", label: "Desktop", width: "100%" },
  { key: "tablet", label: "Tablet", width: "768px" },
  { key: "mobile", label: "Mobile", width: "375px" },
  { key: "full", label: "Full", width: "100%" },
];

export default function Viewer({ src, title }: ViewerProps) {
  const [mode, setMode] = useState<Mode>("full");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Don't fire when typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "1") setMode("desktop");
      if (e.key === "2") setMode("tablet");
      if (e.key === "3") setMode("mobile");
      if (e.key === "f") setMode("full");
      if (e.key === "r" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setRefreshKey((k) => k + 1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const iframeWidth = MODES.find((m) => m.key === mode)?.width || "100%";

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="shrink-0 bg-[#0a0a0a] border-b border-white/5 px-5 h-11 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          {MODES.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setMode(opt.key)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                mode === opt.key
                  ? "bg-[#8b5cf6]/15 text-[#a78bfa]"
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="mr-1">
                {opt.key === "desktop"
                  ? "🖥"
                  : opt.key === "tablet"
                    ? "📱"
                    : opt.key === "mobile"
                      ? "📲"
                      : "⛶"}
              </span>
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
          title="Refresh (⌘R)"
        >
          ↻ Refresh
        </button>

        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
        >
          ↗ Open
        </a>
      </div>

      {/* Iframe area */}
      <div className="flex-1 bg-[#0c0c0c] relative overflow-hidden flex justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex items-center gap-3 text-zinc-500 text-sm">
              <div className="w-4 h-4 border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin" />
              Loading...
            </div>
          </div>
        )}
        <iframe
          key={refreshKey}
          src={src}
          className="h-full border-0 bg-white transition-all duration-300"
          style={{
            width: iframeWidth,
            maxWidth: "100%",
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setIsLoading(false)}
          title={title}
        />
      </div>
    </div>
  );
}
