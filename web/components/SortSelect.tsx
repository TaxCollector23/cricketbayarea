"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor="sort" className="text-neutral-600">
        Sort
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(params?.toString() ?? "");
          if (e.target.value === "default") next.delete("sort");
          else next.set("sort", e.target.value);
          const qs = next.toString();
          router.push(qs ? `${pathname}?${qs}` : pathname);
        }}
        className="h-9 rounded-md border border-[color:var(--border)] bg-white px-2 text-sm"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="name">Name A to Z</option>
      </select>
    </div>
  );
}
