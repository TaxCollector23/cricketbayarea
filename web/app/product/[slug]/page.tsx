import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/inventory";
import { formatPrice } from "@/lib/format";
import { StockBadge } from "@/components/StockBadge";
import { PickupSelector } from "@/components/PickupSelector";
import { CATEGORY_PATHS, CONTACTS, whatsappHref } from "@/lib/config";
import { getStockStatus, isAvailable } from "@/lib/stock";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const status = getStockStatus(product.stock);
  const available = isAvailable(status);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <nav className="text-sm text-neutral-500 mb-6">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={CATEGORY_PATHS[product.category]} className="hover:text-black">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-700">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-[4/5] w-full bg-neutral-50 rounded-md flex items-center justify-center overflow-hidden border border-[color:var(--border)]">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-neutral-400 text-xs uppercase tracking-wide">
              No image
            </span>
          )}
        </div>

        <div>
          <div className="text-xs text-neutral-500">{product.category}</div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="text-2xl font-semibold">
              {formatPrice(product.price)}
            </div>
            <StockBadge stock={product.stock} />
          </div>

          <div className="mt-8">
            {available ? (
              <PickupSelector productName={product.name} />
            ) : (
              <div className="rounded-lg border border-[color:var(--border)] p-5 bg-white">
                <div className="font-medium">Out of stock</div>
                <p className="mt-1 text-sm text-slate-600">
                  This product is not available for pickup right now. Ask us
                  when the next batch is expected.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {CONTACTS.map((c) => (
                    <a
                      key={"wa-" + c.wa}
                      href={whatsappHref(
                        c.wa,
                        `Hi ${c.name}, is "${product.name}" going to be back in stock at Cricket Bay Area?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-[#25D366] text-white text-sm font-medium hover:brightness-95"
                    >
                      WhatsApp {c.name}
                    </a>
                  ))}
                  {CONTACTS.map((c) => (
                    <a
                      key={"call-" + c.tel}
                      href={`tel:${c.tel}`}
                      className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-[color:var(--border)] bg-white text-sm font-medium hover:border-[color:var(--accent)]"
                    >
                      Call {c.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
