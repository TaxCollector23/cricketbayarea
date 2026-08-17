import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/inventory";
import { CategoryView } from "@/components/CategoryView";

export const metadata: Metadata = { title: "Cricket Bats" };

export default async function BatsPage() {
  const products = await getProductsByCategory("Bats");
  return (
    <Suspense>
      <CategoryView
        title="Cricket Bats"
        description="Browse the cricket bats currently listed in our inventory."
        products={products}
      />
    </Suspense>
  );
}
