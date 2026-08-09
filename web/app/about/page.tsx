import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTS, SHOP_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cricket Bay Area is run by Karan and Abhi. Local pickup only, cash on collection.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--accent-strong)]">
        About
      </p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
        {SHOP_NAME}
      </h1>

      <dl className="mt-8 border border-[color:var(--border)] rounded-lg bg-white divide-y divide-[color:var(--border)]">
        <div className="p-4 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="text-sm font-medium text-slate-500">Who runs it</dt>
          <dd className="mt-1 sm:mt-0 text-sm text-slate-800">
            Karan and Abhi. Both live and play cricket in the Bay Area.
          </dd>
        </div>
        <div className="p-4 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="text-sm font-medium text-slate-500">What we stock</dt>
          <dd className="mt-1 sm:mt-0 text-sm text-slate-800">
            English and Kashmir willow bats, leather match balls, tennis balls,
            wheelie kitbags, and junior kits.
          </dd>
        </div>
        <div className="p-4 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="text-sm font-medium text-slate-500">How it works</dt>
          <dd className="mt-1 sm:mt-0 text-sm text-slate-800">
            Reserve a pickup time on the site. We text or call to confirm. Pay
            in person when you collect.
          </dd>
        </div>
        <div className="p-4 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="text-sm font-medium text-slate-500">Payment</dt>
          <dd className="mt-1 sm:mt-0 text-sm text-slate-800">
            Cash, Zelle, or Venmo at pickup. No online payment on the site.
          </dd>
        </div>
        <div className="p-4 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="text-sm font-medium text-slate-500">Not stocked</dt>
          <dd className="mt-1 sm:mt-0 text-sm text-slate-800">
            Whites, spikes, or wicketkeeping gear right now. Ask us if you
            need any, we can order it in.
          </dd>
        </div>
      </dl>

      <div className="mt-8 rounded-lg border border-[color:var(--accent-soft-2)] bg-[color:var(--accent-soft)] p-5">
        <div className="text-sm font-semibold text-[color:var(--accent-strong)]">
          Get in touch
        </div>
        <ul className="mt-2 text-sm space-y-1">
          {CONTACTS.map((c) => (
            <li key={c.tel}>
              <span className="text-slate-700">{c.name}: </span>
              <a
                href={`tel:${c.tel}`}
                className="text-[color:var(--accent)] underline underline-offset-2"
              >
                {c.phone}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/bats"
          className="h-10 inline-flex items-center px-4 rounded-md bg-[color:var(--accent)] text-white text-sm font-medium hover:bg-[color:var(--accent-strong)]"
        >
          Browse products
        </Link>
        <Link
          href="/pickup"
          className="h-10 inline-flex items-center px-4 rounded-md border border-[color:var(--border)] bg-white text-sm font-medium hover:border-[color:var(--accent)]"
        >
          Arrange pickup
        </Link>
      </div>
    </div>
  );
}
