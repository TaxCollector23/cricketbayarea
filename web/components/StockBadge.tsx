import { getStockStatus, stockLabel, type StockStatus } from "@/lib/stock";

const STYLES: Record<StockStatus, string> = {
  "in-stock": "text-emerald-700 bg-emerald-50 border-emerald-200",
  low: "text-amber-800 bg-amber-50 border-amber-200",
  limited: "text-orange-800 bg-orange-50 border-orange-200",
  "out-of-stock": "text-neutral-600 bg-neutral-100 border-neutral-200",
};

export function StockBadge({ stock }: { stock: number }) {
  const status = getStockStatus(stock);
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {stockLabel(status)}
    </span>
  );
}
