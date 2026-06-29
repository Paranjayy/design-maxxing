"use client";

import { useEffect } from "react";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { keys: ["1"], desc: "Desktop view" },
  { keys: ["2"], desc: "Tablet view" },
  { keys: ["3"], desc: "Mobile view" },
  { keys: ["F"], desc: "Full view" },
  { keys: ["←"], desc: "Previous project" },
  { keys: ["→"], desc: "Next project" },
  { keys: ["Esc"], desc: "Back to browse" },
  { keys: ["?"], desc: "Toggle this help" },
  { keys: ["⌘", "R"], desc: "Refresh iframe" },
];

export default function ShortcutsModal({
  isOpen,
  onClose,
}: ShortcutsModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "?" || e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md mx-4 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-colors text-xs"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4 space-y-1">
          {shortcuts.map((s) => (
            <div
              key={s.desc}
              className="flex items-center justify-between py-2"
            >
              <span className="text-sm text-zinc-400">{s.desc}</span>
              <div className="flex items-center gap-1">
                {s.keys.map((k, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-zinc-600 text-xs">+</span>}
                    <kbd className="min-w-[28px] h-7 inline-flex items-center justify-center px-2 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono font-medium text-zinc-300">
                      {k}
                    </kbd>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-white/5 bg-white/[0.02]">
          <p className="text-[11px] text-zinc-600 text-center">
            Press{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 font-mono text-[10px]">
              ?
            </kbd>{" "}
            or{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 font-mono text-[10px]">
              Esc
            </kbd>{" "}
            to close
          </p>
        </div>
      </div>
    </div>
  );
}
