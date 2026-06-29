import { NextResponse } from "next/server";
import { getItems } from "@/lib/items";

export const dynamic = "force-dynamic";

export function GET() {
  const items = getItems();
  if (items.length === 0) {
    return NextResponse.json({ id: null });
  }
  const random = items[Math.floor(Math.random() * items.length)];
  return NextResponse.json({ id: random.id });
}
