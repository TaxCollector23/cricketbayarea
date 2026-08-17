import Link from "next/link";
import { SHOP_NAME } from "@/lib/config";
import { assetUrl } from "@/lib/assets";

const NAV = [
  { href: "/bats", label: "Bats" },
  { href: "/balls", label: "Balls" },
  { href: "/kitbags", label: "Kitbags" },
  { href: "/pickup", label: "Pickup" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-6xl px-5 h-24 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 whitespace-nowrap"
          aria-label={SHOP_NAME}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetUrl("/logo-v3.png")}
            alt=""
            width={80}
            height={80}
            className="h-20 w-20 object-contain"
          />
          <span className="text-base sm:text-lg font-semibold tracking-tight">
            {SHOP_NAME}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:text-[color:var(--accent)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <form
          action="/search"
          method="get"
          className="hidden lg:block"
          role="search"
        >
          <input
            type="search"
            name="q"
            placeholder="Search bats, balls, kitbags..."
            aria-label="Search products"
            className="h-9 w-56 rounded-md border border-[color:var(--border)] px-3 text-sm placeholder:text-neutral-400"
          />
        </form>
        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer text-sm px-3 py-1.5 border border-[color:var(--border)] rounded-md">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-56 bg-white border border-[color:var(--border)] rounded-md shadow-sm py-2 z-10">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block px-4 py-2 text-sm hover:bg-neutral-50"
              >
                {n.label}
              </Link>
            ))}
            <form
              action="/search"
              method="get"
              className="px-4 pt-2"
              role="search"
            >
              <input
                type="search"
                name="q"
                placeholder="Search"
                aria-label="Search products"
                className="h-9 w-full rounded-md border border-[color:var(--border)] px-3 text-sm"
              />
            </form>
          </div>
        </details>
      </div>
    </header>
  );
}
