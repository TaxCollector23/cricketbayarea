import type { Metadata } from "next";
import { CONTACTS, SHOP_ADDRESS, whatsappHref } from "@/lib/config";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--accent-strong)]">
        Contact
      </p>
      <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
        Reach Karan or Abhi
      </h1>
      <p className="mt-2 text-slate-600 max-w-xl">
        Call, text, or message on WhatsApp for questions about products,
        availability, or pickup. We try to reply within a few hours during
        the day.
      </p>

      <ul className="mt-6 divide-y divide-[color:var(--border)] border border-[color:var(--border)] rounded-lg bg-white">
        {CONTACTS.map((c) => (
          <li
            key={c.tel}
            className="p-4 flex flex-wrap items-center gap-3"
          >
            <div className="min-w-24">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-slate-500">{c.phone}</div>
            </div>
            <div className="flex flex-1 justify-end gap-2 flex-wrap">
              <a
                href={`tel:${c.tel}`}
                className="inline-flex items-center h-9 px-3 rounded-md border border-[color:var(--border)] bg-white text-sm hover:border-[color:var(--accent)]"
              >
                Call
              </a>
              <a
                href={`sms:${c.tel}`}
                className="inline-flex items-center h-9 px-3 rounded-md border border-[color:var(--accent-soft-2)] bg-[color:var(--accent-soft)] text-sm text-[color:var(--accent-strong)] hover:border-[color:var(--accent)]"
              >
                Text
              </a>
              <a
                href={whatsappHref(
                  c.wa,
                  `Hi ${c.name}, question about Cricket Bay Area:`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-9 px-3 rounded-md bg-[#25D366] text-white text-sm hover:brightness-95"
              >
                WhatsApp
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-[color:var(--border)] p-4 bg-white">
          <div className="text-sm font-semibold">Shop location</div>
          <p className="mt-1 text-sm text-slate-700">
            {SHOP_ADDRESS ? (
              SHOP_ADDRESS
            ) : (
              <span className="text-slate-500">
                Address is not published online. Call for pickup directions.
              </span>
            )}
          </p>
        </div>
        <div className="rounded-lg border border-[color:var(--border)] p-4 bg-white">
          <div className="text-sm font-semibold">Pickup hours</div>
          <p className="mt-1 text-sm text-slate-700">
            Most days between 10 AM and 6 PM. Confirm your time with us before
            you head over.
          </p>
        </div>
      </div>
    </div>
  );
}
