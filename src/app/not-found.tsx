import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <div className="w-12 h-12 rounded-xl bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-xl mb-6">
        D
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">404</h1>
      <p className="text-zinc-500 text-sm mb-8">Page not found</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-[#8b5cf6] text-white text-sm font-medium hover:bg-[#7c3aed] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
