import { promises as fs } from "node:fs";
import path from "node:path";
import { CATEGORIES, type Category } from "./config";
import { slugify } from "./format";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  image?: string;
};

type LoadResult = {
  products: Product[];
  skipped: Array<{ row: number; reason: string }>;
};

// Small CSV parser sufficient for our sheet export. Handles quoted fields.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        cur.push(field);
        field = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        cur.push(field);
        field = "";
        rows.push(cur);
        cur = [];
      } else {
        field += ch;
      }
    }
  }
  if (field.length > 0 || cur.length > 0) {
    cur.push(field);
    rows.push(cur);
  }
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

function normalizeCategory(raw: string): Category | null {
  const cleaned = raw.trim().toLowerCase().replace(/\s+/g, " ");
  // Accept legacy names so an owner editing the sheet cannot break the site.
  if (cleaned === "kits & kitbags" || cleaned === "kits and kitbags") {
    return "Kitbags";
  }
  const match = CATEGORIES.find((c) => c.toLowerCase() === cleaned);
  return match ?? null;
}

function parsePrice(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function parseStock(raw: string): number | null {
  const cleaned = raw.trim();
  if (cleaned === "") return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
}

function normalizeProducts(rows: string[][]): LoadResult {
  if (rows.length < 2) return { products: [], skipped: [] };
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = {
    name: header.indexOf("product name"),
    category: header.indexOf("category"),
    price: header.indexOf("price"),
    stock: header.indexOf("stock"),
    image: header.indexOf("image"),
  };
  const products: Product[] = [];
  const skipped: LoadResult["skipped"] = [];
  const usedSlugs = new Map<string, number>();
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = (row[idx.name] ?? "").trim();
    const rawCategory = (row[idx.category] ?? "").trim();
    const category = normalizeCategory(rawCategory);
    const price = parsePrice(row[idx.price] ?? "");
    const stock = parseStock(row[idx.stock] ?? "");
    const image = idx.image >= 0 ? (row[idx.image] ?? "").trim() : "";
    if (!name) {
      skipped.push({ row: r + 1, reason: "missing name" });
      continue;
    }
    if (!category) {
      skipped.push({
        row: r + 1,
        reason: `unknown category "${rawCategory}"`,
      });
      continue;
    }
    if (price === null) {
      skipped.push({ row: r + 1, reason: "invalid price" });
      continue;
    }
    if (stock === null) {
      skipped.push({ row: r + 1, reason: "invalid stock" });
      continue;
    }
    const baseSlug = slugify(name) || `product-${r}`;
    const count = usedSlugs.get(baseSlug) ?? 0;
    const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
    usedSlugs.set(baseSlug, count + 1);
    products.push({
      slug,
      name,
      category,
      price,
      stock,
      image: image || undefined,
    });
  }
  return { products, skipped };
}

// ---- Caching ---------------------------------------------------------------
// Local file:  cache keyed by mtime  → picks up sheet edits within one request.
// Remote URL:  cache with short TTL  → picks up changes within REMOTE_TTL_MS.
type CacheEntry = { key: string; data: Product[] };
let cache: CacheEntry | null = null;
let lastFetchedAt = 0;
const REMOTE_TTL_MS = 30_000;

const LOCAL_CSV = path.join(process.cwd(), "data", "inventory.csv");
const REMOTE_URL = process.env.INVENTORY_CSV_URL?.trim() || "";

async function loadFromLocal(): Promise<Product[]> {
  const stat = await fs.stat(LOCAL_CSV);
  const key = `local:${stat.mtimeMs}`;
  if (cache?.key === key) return cache.data;
  const text = await fs.readFile(LOCAL_CSV, "utf8");
  const { products, skipped } = normalizeProducts(parseCSV(text));
  if (skipped.length > 0 && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn("[inventory] skipped rows:", skipped);
  }
  cache = { key, data: products };
  return products;
}

async function loadFromRemote(url: string): Promise<Product[]> {
  const now = Date.now();
  if (cache?.key.startsWith("remote:") && now - lastFetchedAt < REMOTE_TTL_MS) {
    return cache.data;
  }
  const res = await fetch(url, {
    // Next 16 fetch cache is off by default for dynamic data, but be explicit.
    cache: "no-store",
    headers: { "user-agent": "CricketBayArea/1.0" },
  });
  if (!res.ok) throw new Error(`sheet fetch failed: ${res.status}`);
  const text = await res.text();
  const { products, skipped } = normalizeProducts(parseCSV(text));
  if (skipped.length > 0 && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn("[inventory] skipped rows:", skipped);
  }
  lastFetchedAt = now;
  cache = { key: `remote:${now}`, data: products };
  return products;
}

export async function getProducts(): Promise<Product[]> {
  try {
    return REMOTE_URL
      ? await loadFromRemote(REMOTE_URL)
      : await loadFromLocal();
  } catch (err) {
    if (cache) {
      // eslint-disable-next-line no-console
      console.error("[inventory] load failed, serving stale cache:", err);
      return cache.data;
    }
    // eslint-disable-next-line no-console
    console.error("[inventory] load failed and no cache:", err);
    return [];
  }
}

export async function getProductsByCategory(
  category: Category,
): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === category);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await getProducts();
  return all.filter((p) => p.name.toLowerCase().includes(q));
}

export async function getCategoryMinPrice(
  category: Category,
): Promise<number | null> {
  const items = await getProductsByCategory(category);
  const available = items.filter((p) => p.stock > 0);
  if (available.length === 0) return null;
  return available.reduce(
    (m, p) => (p.price < m ? p.price : m),
    available[0].price,
  );
}
