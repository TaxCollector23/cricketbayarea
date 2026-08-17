import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/inventory";
import { CategoryView } from "@/components/CategoryView";

export const metadata: Metadata = { title: "Cricket Balls" };

export default async function BallsPage() {
  const products = await getProductsByCategory("Balls");
  return (
    <Suspense>
      <CategoryView
        title="Cricket Balls"
        description="Browse the cricket balls currently listed in our inventory."
        products={products}
      />
    </Suspense>
  );
}
