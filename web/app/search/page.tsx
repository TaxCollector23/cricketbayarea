import type { Metadata } from "next";
import Link from "next/link";
import { searchProducts } from "@/lib/inventory";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? await searchProducts(q) : [];
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Search
      </h1>
      <form action="/search" method="get" className="mt-4 flex gap-2 max-w-md">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search bats, balls, kits..."
          aria-label="Search products"
          className="h-10 flex-1 rounded-md border border-[color:var(--border)] px-3 text-sm"
        />
        <button
          type="submit"
          className="h-10 px-4 rounded-md bg-[color:var(--accent)] text-white text-sm font-medium"
        >
          Search
        </button>
      </form>

      <div className="mt-8">
        {q ? (
          <>
            <div className="text-sm text-neutral-600 mb-4">
              {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;.{" "}
              <Link href="/search" className="underline underline-offset-2">
                Clear
              </Link>
            </div>
            <ProductGrid products={results} empty="No products found." />
          </>
        ) : (
          <p className="text-sm text-neutral-600">
            Type a product name to search.
          </p>
        )}
      </div>
    </div>
  );
}
