import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/inventory";
import { CategoryView, type SortKey } from "@/components/CategoryView";

export const metadata: Metadata = { title: "Cricket Balls" };

export default async function BallsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const products = await getProductsByCategory("Balls");
  return (
    <CategoryView
      title="Cricket Balls"
      description="Browse the cricket balls currently listed in our inventory."
      products={products}
      sort={(sort as SortKey) ?? "default"}
    />
  );
}
