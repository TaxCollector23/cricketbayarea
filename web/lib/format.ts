export function formatPrice(price: number): string {
  if (!Number.isFinite(price)) return "";
  const hasCents = Math.round(price * 100) % 100 !== 0;
  return hasCents
    ? `$${price.toFixed(2)}`
    : `$${Math.round(price).toLocaleString("en-US")}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
