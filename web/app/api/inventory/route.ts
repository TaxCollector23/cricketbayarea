import { NextResponse } from "next/server";
import { getProducts } from "@/lib/inventory";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({
    count: products.length,
    source: process.env.INVENTORY_CSV_URL ? "remote" : "local",
    products,
  });
}
