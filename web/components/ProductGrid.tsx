import type { Product } from "@/lib/inventory";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  empty,
}: {
  products: Product[];
  empty?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-[color:var(--border)] p-8 text-center text-neutral-600">
        {empty ?? "No products found."}
      </div>
    );
  }
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
