import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTS, SHOP_NAME, whatsappHref } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cricket Bay Area is run by Karan and Abhi. Local pickup only, cash on collection.",
};

const PRIMARY = CONTACTS[0];

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

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a
          href={whatsappHref(PRIMARY.wa, `Hi ${PRIMARY.name}, I have a question about Cricket Bay Area.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-[#25D366] text-white text-sm font-medium hover:brightness-95 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
            <path d="M19.11 17.24c-.28-.14-1.64-.81-1.9-.9-.26-.09-.44-.14-.63.14-.19.28-.72.9-.89 1.09-.16.19-.33.21-.6.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.38-1.63-1.54-1.9-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.63-1.52-.86-2.09-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.4 0 1.41 1.02 2.78 1.17 2.97.14.19 2.01 3.07 4.86 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.64-.67 1.87-1.31.23-.65.23-1.2.16-1.31-.06-.11-.24-.19-.52-.33zM16.03 5.33c-5.9 0-10.7 4.8-10.7 10.7 0 1.89.5 3.73 1.44 5.35L5.33 26.67l5.42-1.42a10.66 10.66 0 0 0 5.28 1.4h.01c5.9 0 10.7-4.8 10.7-10.7-.01-2.86-1.12-5.55-3.14-7.57a10.61 10.61 0 0 0-7.57-3.13zm0 19.61h-.01c-1.57 0-3.11-.42-4.45-1.22l-.32-.19-3.31.87.88-3.22-.21-.33a8.86 8.86 0 0 1-1.36-4.72c0-4.9 3.99-8.89 8.89-8.89 2.37 0 4.6.93 6.28 2.6a8.83 8.83 0 0 1 2.6 6.29c0 4.9-3.99 8.88-8.9 8.88z" />
          </svg>
          WhatsApp {PRIMARY.name}
        </a>
        <Link
          href="/bats"
          className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-[color:var(--border)] bg-white text-sm font-medium hover:border-[color:var(--accent)] transition-all"
        >
          Browse products
        </Link>
      </div>
    </div>
  );
}
