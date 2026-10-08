import type { Metadata } from "next";
import { PickupSelector } from "@/components/PickupSelector";
import { CONTACTS, SHOP_ADDRESS } from "@/lib/config";

export const metadata: Metadata = { title: "Pickup" };

export default function PickupPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Pickup
      </h1>
      <p className="mt-2 text-neutral-600">
        Choose a date and time, then send the details by text or WhatsApp so we
        can confirm your pickup.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <PickupSelector />
        <div>
          <div className="text-sm font-semibold">Pickup location</div>
          <p className="mt-1 text-sm text-neutral-700">
            {SHOP_ADDRESS ? (
              SHOP_ADDRESS
            ) : (
              <span className="text-neutral-500">
                The shop address will be shared when you confirm your pickup
                by phone.
              </span>
            )}
          </p>
          <div className="mt-6 text-sm font-semibold">Contact</div>
          <ul className="mt-1 text-sm space-y-1">
            {CONTACTS.map((c) => (
              <li key={c.tel}>
                {c.name}:{" "}
                <a href={`tel:${c.tel}`} className="underline underline-offset-2">
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
