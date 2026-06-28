import Link from "next/link";
import { getItem, getItems } from "@/lib/items";
import { notFound } from "next/navigation";
import Viewer from "./viewer";

function formatCategoryName(slug: string): string {
  return slug
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generateStaticParams() {
  return getItems().map((item) => ({ id: item.id }));
}

export default async function ViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getItem(id);
  if (!item) return notFound();

  const src = `/items/${item.folderName}/${item.indexFile}`;
  const title = item.title || item.zipName.replace(/\.zip$/, "");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="shrink-0 bg-[#080808] border-b border-white/5 z-30">
        <div className="max-w-[1600px] mx-auto px-5 h-12 flex items-center gap-3">
          <Link
            href="/"
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
            href={`/browse?cat=${item.category}`}
            className="text-xs text-zinc-400 hover:text-[#a78bfa] transition-colors truncate"
          >
            {formatCategoryName(item.category)}
          </Link>

          <div className="h-4 w-px bg-white/10 shrink-0 hidden sm:block" />

          <div className="text-xs text-zinc-500 truncate hidden sm:block">
            {title}
          </div>

          <div className="flex-1" />

          <span
            className={`px-2 py-0.5 rounded text-[10px] font-medium ${
              item.kind === "template"
                ? "bg-[#10b981]/15 text-[#34d399]"
                : "bg-[#8b5cf6]/15 text-[#a78bfa]"
            }`}
          >
            {item.kind === "template" ? "Template" : "Source"}
          </span>
        </div>
      </header>

      {/* Full-width viewer */}
      <Viewer src={src} title={title} />
    </div>
  );
}
