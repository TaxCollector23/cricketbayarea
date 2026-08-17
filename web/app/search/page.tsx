import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/inventory";
import { ClientSearch } from "@/components/ClientSearch";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage() {
  const products = await getProducts();
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Search
      </h1>
      <Suspense>
        <ClientSearch products={products} />
      </Suspense>
    </div>
  );
}
