import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/inventory";
import { CategoryView, type SortKey } from "@/components/CategoryView";

export const metadata: Metadata = { title: "Cricket Kitbags" };

export default async function KitbagsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const products = await getProductsByCategory("Kitbags");
  return (
    <CategoryView
      title="Cricket Kitbags"
      description="Browse the kitbags currently listed in our inventory."
      products={products}
      sort={(sort as SortKey) ?? "default"}
    />
  );
}
