import Link from "next/link";
import { getItem, getItems, getAdjacentItems } from "@/lib/items";
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
  const { prev, next } = getAdjacentItems(id);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Viewer
        src={src}
        title={title}
        id={id}
        category={item.category}
        categoryDisplay={formatCategoryName(item.category)}
        kind={item.kind}
        prevId={prev?.id || null}
        prevTitle={prev?.title || null}
        nextId={next?.id || null}
        nextTitle={next?.title || null}
      />
    </div>
  );
}
