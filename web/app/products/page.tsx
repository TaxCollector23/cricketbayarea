import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { CATEGORIES, CATEGORY_PATHS } from "@/lib/config";
import { getProducts } from "@/lib/inventory";

export const metadata: Metadata = { title: "All products" };

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Browse products
          </h1>
          <p className="mt-2 text-neutral-600 max-w-xl">
            Browse all bats, balls, and kitbags currently listed in our inventory.
          </p>
        </div>
        <Link
          href="/search"
          className="text-sm text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
        >
          Search inventory
        </Link>
      </div>

      <div className="mt-8 space-y-12">
        {CATEGORIES.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.category === category,
          );

          return (
            <section key={category} aria-labelledby={`${category}-heading`}>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h2
                  id={`${category}-heading`}
                  className="text-lg font-semibold"
                >
                  {category}
                </h2>
                <Link
                  href={CATEGORY_PATHS[category]}
                  className="text-sm text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
                >
                  View {category.toLowerCase()}
                </Link>
              </div>
              <ProductGrid
                products={categoryProducts}
                empty="No products are currently listed in this category."
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
