import Link from "next/link";
import { CONTACTS, SHOP_NAME } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[color:var(--border)] bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold">{SHOP_NAME}</div>
          <p className="mt-2 text-neutral-600">
            Cricket equipment for pickup in the Bay Area.
          </p>
        </div>
        <div>
          <div className="font-medium mb-2">Shop</div>
          <ul className="space-y-1 text-neutral-700">
            <li>
              <Link href="/products">All products</Link>
            </li>
            <li>
              <Link href="/bats">Bats</Link>
            </li>
            <li>
              <Link href="/balls">Balls</Link>
            </li>
            <li>
              <Link href="/kitbags">Kitbags</Link>
            </li>
            <li>
              <Link href="/pickup">Pickup</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Contact</div>
          <ul className="space-y-1 text-neutral-700">
            {CONTACTS.map((c) => (
              <li key={c.tel}>
                {c.name}:{" "}
                <a href={`tel:${c.tel}`} className="underline-offset-2 hover:underline">
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-neutral-500">
          &copy; {year} {SHOP_NAME}.
        </div>
      </div>
    </footer>
  );
}
