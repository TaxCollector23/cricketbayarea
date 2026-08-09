export type StockStatus = "out-of-stock" | "limited" | "low" | "in-stock";

export function getStockStatus(stock: number): StockStatus {
  if (!Number.isFinite(stock) || stock <= 0) return "out-of-stock";
  if (stock <= 4) return "limited";
  if (stock <= 7) return "low";
  return "in-stock";
}

export function stockLabel(status: StockStatus): string {
  switch (status) {
    case "out-of-stock":
      return "Out of stock";
    case "limited":
      return "Limited stock";
    case "low":
      return "Low stock";
    case "in-stock":
      return "In stock";
  }
}

export function isAvailable(status: StockStatus): boolean {
  return status !== "out-of-stock";
}
