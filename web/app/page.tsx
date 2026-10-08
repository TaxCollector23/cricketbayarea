import Link from "next/link";
import {
  getCategoryMinPrice,
  getProducts,
} from "@/lib/inventory";
import { ProductGrid } from "@/components/ProductGrid";
import {
  CATEGORIES,
  CATEGORY_ACCENTS,
  CATEGORY_BLURB,
  CATEGORY_PATHS,
  CONTACTS,
  SHOP_NAME,
  SHOP_TAGLINE,
} from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { assetUrl } from "@/lib/assets";

export default async function Home() {
  const products = await getProducts();
  const preview = products.slice(0, 8);
  const minPrices = Object.fromEntries(
    await Promise.all(
      CATEGORIES.map(async (c) => [c, await getCategoryMinPrice(c)] as const),
    ),
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-10 sm:pt-16 sm:pb-14 relative">
          <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--accent-strong)]">
            Bay Area, California
          </p>
          <h1 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            {SHOP_NAME}
          </h1>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-slate-700">
            {SHOP_TAGLINE}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/bats"
              className="h-11 inline-flex items-center px-5 rounded-md bg-[color:var(--accent)] text-white text-sm font-medium hover:bg-[color:var(--accent-strong)] transition-colors"
            >
              Browse products
            </Link>
            <Link
              href="/pickup"
              className="h-11 inline-flex items-center px-5 rounded-md border border-[color:var(--accent-soft-2)] bg-white text-sm font-medium hover:border-[color:var(--accent)] transition-colors"
            >
              Arrange pickup
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        {/* Category cards with hero image + starting-from price */}
        <section className="py-12">
          <h2 className="text-lg font-semibold">Shop by category</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {CATEGORIES.map((c) => {
              const accent = CATEGORY_ACCENTS[c];
              const cover = products.find(
                (p) => p.category === c && p.image,
              )?.image;
              const min = minPrices[c];
              return (
                <Link
                  key={c}
                  href={CATEGORY_PATHS[c]}
                  className={`group block rounded-lg border overflow-hidden bg-white hover:shadow-md transition-shadow ${accent.tile}`}
                >
                  <div className="relative aspect-[4/3] bg-white overflow-hidden">
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={assetUrl(cover)}
                        alt={c}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs uppercase tracking-wide text-slate-400">
                        No image
                      </div>
                    )}
                    {min !== null && (
                      <div className="absolute left-3 top-3 bg-white/95 backdrop-blur rounded-md px-2.5 py-1 text-xs font-medium text-slate-800 border border-[color:var(--border)] shadow-sm">
                        Starting from {formatPrice(min)}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className={`text-lg font-semibold ${accent.label}`}>
                      {c}
                    </div>
                    <div className="mt-1 text-sm text-slate-700">
                      {CATEGORY_BLURB[c]}
                    </div>
                    <div className="mt-3 text-sm font-medium text-[color:var(--accent)] group-hover:text-[color:var(--accent-strong)]">
                      View {c.toLowerCase()} &rarr;
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Inventory preview */}
        <section className="py-8">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-semibold">Current inventory</h2>
            <Link
              href="/search"
              className="text-sm text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
            >
              Search inventory
            </Link>
          </div>
          <ProductGrid
            products={preview}
            empty="No products are currently listed."
          />
        </section>
      </div>

      {/* Pickup + contact band */}
      <section className="relative overflow-hidden mt-8 border-y border-[color:var(--border)] bg-[color:var(--accent-soft)]">
        <div className="mx-auto max-w-6xl px-5 py-12 grid gap-8 md:grid-cols-2 relative">
          <div>
            <h2 className="text-lg font-semibold">Local pickup</h2>
            <p className="mt-2 text-sm text-slate-700 max-w-md">
              Choose a pickup time, then text or WhatsApp us with the details.
              We confirm the slot before you come. No shipping. No online
              payment.
            </p>
            <Link
              href="/pickup"
              className="mt-4 inline-flex h-10 items-center px-4 rounded-md bg-[color:var(--accent)] text-white text-sm font-medium hover:bg-[color:var(--accent-strong)]"
            >
              Choose a pickup time
            </Link>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Talk to us</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {CONTACTS.map((c) => (
                <li key={c.tel}>
                  <span className="text-slate-600">{c.name}: </span>
                  <a
                    href={`tel:${c.tel}`}
                    className="text-[color:var(--accent)] hover:text-[color:var(--accent-strong)] underline underline-offset-2"
                  >
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-600 max-w-md">
              Text or call for questions about a specific bat, ball, or kitbag.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
