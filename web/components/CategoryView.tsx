"use client";

import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/inventory";
import { ProductGrid } from "./ProductGrid";
import { SortSelect } from "./SortSelect";

export type SortKey = "default" | "price-asc" | "price-desc" | "name";

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

export function CategoryView({
  title,
  description,
  products,
}: {
  title: string;
  description: string;
  products: Product[];
}) {
  const searchParams = useSearchParams();
  const sort = (searchParams.get("sort") as SortKey) ?? "default";
  const sorted = sortProducts(products, sort);
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-neutral-600 max-w-xl">{description}</p>
        </div>
        <SortSelect value={sort} />
      </div>
      <div className="mt-8">
        <ProductGrid
          products={sorted}
          empty="No products are currently listed in this category."
        />
      </div>
    </div>
  );
}
