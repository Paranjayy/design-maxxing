import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <div className="w-14 h-14 rounded-xl bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-xl mb-6">
        D
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">404</h1>
      <p className="text-zinc-400 text-sm mb-8 text-center">
        This item doesn&apos;t exist or was removed.
      </p>
      <Link
        href="/browse"
        className="px-5 py-2.5 rounded-lg bg-[#8b5cf6] text-white text-sm font-medium hover:bg-[#7c3aed] transition-colors"
      >
        Browse All Projects
      </Link>
    </div>
  );
}
