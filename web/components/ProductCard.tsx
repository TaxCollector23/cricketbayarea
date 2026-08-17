import Link from "next/link";
import type { Product } from "@/lib/inventory";
import { formatPrice } from "@/lib/format";
import { StockBadge } from "./StockBadge";
import { assetUrl } from "@/lib/assets";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block border border-[color:var(--border)] rounded-lg overflow-hidden bg-white hover:border-[color:var(--accent)] hover:shadow-sm transition-all"
    >
      <div className="aspect-[4/5] bg-[color:var(--surface)] relative flex items-center justify-center overflow-hidden">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={assetUrl(product.image)}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <span className="text-slate-400 text-xs uppercase tracking-wide">
            No image
          </span>
        )}
      </div>
      <div className="p-3.5 flex flex-col gap-1.5">
        <div className="text-[11px] uppercase tracking-wide text-slate-500">
          {product.category}
        </div>
        <div className="text-[15px] font-medium leading-snug line-clamp-2 text-slate-900">
          {product.name}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="text-[15px] font-semibold text-slate-900">
            {formatPrice(product.price)}
          </div>
          <StockBadge stock={product.stock} />
        </div>
      </div>
    </Link>
  );
}
