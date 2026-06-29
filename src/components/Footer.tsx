import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-xs">
                D
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">
                design maxxing
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-xs">
              436 web dev projects, animations, and templates — all browsable in their full glory.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/browse"
              className="text-xs text-zinc-500 hover:text-[#a78bfa] transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/stats"
              className="text-xs text-zinc-500 hover:text-[#a78bfa] transition-colors"
            >
              Stats
            </Link>
            <Link
              href="/favorites"
              className="text-xs text-zinc-500 hover:text-[#a78bfa] transition-colors"
            >
              Favorites
            </Link>
            <a
              href="https://github.com/Paranjayy/design-maxxing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-[#a78bfa] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="text-[11px] text-zinc-700">
            Made with ♥
          </div>
          <div className="text-[11px] text-zinc-700">
            design maxxing viewer
          </div>
        </div>
      </div>
    </footer>
  );
}
