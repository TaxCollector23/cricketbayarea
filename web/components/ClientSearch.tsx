"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Product } from "@/lib/inventory";
import { ProductGrid } from "./ProductGrid";

export function ClientSearch({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = searchParams.get("q") ?? "";

  const results = q
    ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    : [];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = (e.currentTarget.elements.namedItem("q") as HTMLInputElement)?.value ?? "";
    const next = new URLSearchParams();
    if (val) next.set("q", val);
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 max-w-md">
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
              <button
                onClick={() => router.push(pathname)}
                className="underline underline-offset-2"
              >
                Clear
              </button>
            </div>
            <ProductGrid products={results} empty="No products found." />
          </>
        ) : (
          <p className="text-sm text-neutral-600">
            Type a product name to search.
          </p>
        )}
      </div>
    </>
  );
}
