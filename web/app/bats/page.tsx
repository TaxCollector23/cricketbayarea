import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/inventory";
import { CategoryView, type SortKey } from "@/components/CategoryView";

export const metadata: Metadata = { title: "Cricket Bats" };

export default async function BatsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const products = await getProductsByCategory("Bats");
  return (
    <CategoryView
      title="Cricket Bats"
      description="Browse the cricket bats currently listed in our inventory."
      products={products}
      sort={(sort as SortKey) ?? "default"}
    />
  );
}
