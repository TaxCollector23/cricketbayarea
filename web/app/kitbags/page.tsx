import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/inventory";
import { CategoryView } from "@/components/CategoryView";

export const metadata: Metadata = { title: "Cricket Kitbags" };

export default async function KitbagsPage() {
  const products = await getProductsByCategory("Kitbags");
  return (
    <Suspense>
      <CategoryView
        title="Cricket Kitbags"
        description="Browse the kitbags currently listed in our inventory."
        products={products}
      />
    </Suspense>
  );
}
