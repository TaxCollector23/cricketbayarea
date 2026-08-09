"use client";

import { useMemo, useState } from "react";
import { CONTACTS, SHOP_ADDRESS, whatsappHref } from "@/lib/config";

const TIMES = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

function nextDays(count: number) {
  const out: { value: string; label: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const value = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    out.push({ value, label });
  }
  return out;
}

function smsHref(tel: string, body: string) {
  // iOS wants `&`, Android `?`. Both accept `?body=`.
  return `sms:${tel}?body=${encodeURIComponent(body)}`;
}

export function PickupSelector({ productName }: { productName?: string }) {
  const days = useMemo(() => nextDays(7), []);
  const [date, setDate] = useState(days[0]?.value ?? "");
  const [time, setTime] = useState(TIMES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [delivered, setDelivered] = useState<"email" | "sms" | "none" | null>(
    null,
  );

  const dayLabel = days.find((d) => d.value === date)?.label ?? date;
  const smsBody = `Hi, I'd like to pick up ${productName ?? "cricket gear"} on ${dayLabel} at ${time}. My name is ${name || "..."}${phone ? `, phone ${phone}` : ""}.${note ? " Note: " + note : ""}`;

  const digitsOnly = phone.replace(/\D/g, "");
  const phoneValid = digitsOnly.length >= 10;
  const canSubmit = name.trim().length > 0 && phoneValid;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!canSubmit) {
      setError(
        !name.trim()
          ? "Please enter your name."
          : "Please enter a valid phone number (at least 10 digits).",
      );
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          date,
          time,
          customerName: name,
          customerPhone: phone,
          note,
        }),
      });
      const data = await res.json().catch(() => ({ delivered: "none" }));
      setDelivered(data.delivered ?? "none");
      setSubmitted(true);
    } catch {
      setDelivered("none");
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-[color:var(--accent-soft-2)] bg-[color:var(--accent-soft)] p-5">
        <div className="text-base font-semibold text-[color:var(--accent-strong)]">
          Pickup requested
        </div>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          {productName && (
            <>
              <dt className="text-slate-600">Product</dt>
              <dd>{productName}</dd>
            </>
          )}
          <dt className="text-slate-600">Date</dt>
          <dd>{dayLabel}</dd>
          <dt className="text-slate-600">Time</dt>
          <dd>{time}</dd>
          <dt className="text-slate-600">Name</dt>
          <dd>{name}</dd>
          <dt className="text-slate-600">Phone</dt>
          <dd>{phone}</dd>
          <dt className="text-slate-600">Location</dt>
          <dd>
            {SHOP_ADDRESS || (
              <span className="text-slate-500">
                Address will be shared on the confirmation call.
              </span>
            )}
          </dd>
        </dl>

        <p className="mt-4 text-sm text-slate-700">
          {delivered === "email" || delivered === "sms"
            ? "We received your request. Karan or Abhi will confirm shortly."
            : "Send the details straight to Karan or Abhi to lock it in:"}
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <a
              key={"wa-" + c.wa}
              href={whatsappHref(c.wa, smsBody)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-[#25D366] text-white text-sm font-medium hover:brightness-95"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M19.11 17.24c-.28-.14-1.64-.81-1.9-.9-.26-.09-.44-.14-.63.14-.19.28-.72.9-.89 1.09-.16.19-.33.21-.6.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.38-1.63-1.54-1.9-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.63-1.52-.86-2.09-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.4 0 1.41 1.02 2.78 1.17 2.97.14.19 2.01 3.07 4.86 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.64-.67 1.87-1.31.23-.65.23-1.2.16-1.31-.06-.11-.24-.19-.52-.33zM16.03 5.33c-5.9 0-10.7 4.8-10.7 10.7 0 1.89.5 3.73 1.44 5.35L5.33 26.67l5.42-1.42a10.66 10.66 0 0 0 5.28 1.4h.01c5.9 0 10.7-4.8 10.7-10.7-.01-2.86-1.12-5.55-3.14-7.57a10.61 10.61 0 0 0-7.57-3.13zm0 19.61h-.01c-1.57 0-3.11-.42-4.45-1.22l-.32-.19-3.31.87.88-3.22-.21-.33a8.86 8.86 0 0 1-1.36-4.72c0-4.9 3.99-8.89 8.89-8.89 2.37 0 4.6.93 6.28 2.6a8.83 8.83 0 0 1 2.6 6.29c0 4.9-3.99 8.88-8.9 8.88z" />
              </svg>
              WhatsApp {c.name}
            </a>
          ))}
          {CONTACTS.map((c) => (
            <a
              key={"sms-" + c.tel}
              href={smsHref(c.tel, smsBody)}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-[color:var(--accent)] text-white text-sm font-medium hover:bg-[color:var(--accent-strong)]"
            >
              Text {c.name}
            </a>
          ))}
          {CONTACTS.map((c) => (
            <a
              key={"call-" + c.tel}
              href={`tel:${c.tel}`}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-[color:var(--accent-soft-2)] bg-white text-sm font-medium hover:border-[color:var(--accent)]"
            >
              Call {c.name}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-slate-600 hover:text-black underline underline-offset-2"
        >
          Change details
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-[color:var(--border)] p-5 bg-white space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pickup-date" className="block text-sm font-medium">
            Pickup date
          </label>
          <select
            id="pickup-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-[color:var(--border)] px-3 text-sm bg-white"
          >
            {days.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pickup-time" className="block text-sm font-medium">
            Pickup time
          </label>
          <select
            id="pickup-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-[color:var(--border)] px-3 text-sm bg-white"
          >
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cust-name" className="block text-sm font-medium">
            Your name <span className="text-[color:var(--accent)]">*</span>
          </label>
          <input
            id="cust-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-[color:var(--border)] px-3 text-sm"
          />
        </div>
        <div>
          <label htmlFor="cust-phone" className="block text-sm font-medium">
            Your phone <span className="text-[color:var(--accent)]">*</span>
          </label>
          <input
            id="cust-phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9()+\-\s]{10,}"
            title="At least 10 digits"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={phone.length > 0 && !phoneValid}
            className="mt-1 h-10 w-full rounded-md border border-[color:var(--border)] px-3 text-sm invalid:border-[color:var(--accent)] invalid:ring-0"
          />
          <p className="mt-1 text-xs text-slate-500">
            Required so we can confirm your pickup.
          </p>
        </div>
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-md border border-[color:var(--accent-soft-2)] bg-[color:var(--accent-soft)] px-3 py-2 text-sm text-[color:var(--accent-strong)]"
        >
          {error}
        </div>
      )}
      <div>
        <label htmlFor="cust-note" className="block text-sm font-medium">
          Note (optional)
        </label>
        <textarea
          id="cust-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-md border border-[color:var(--border)] px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={submitting || !canSubmit}
        className="h-10 px-4 rounded-md bg-[color:var(--accent)] text-white text-sm font-medium hover:bg-[color:var(--accent-strong)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Request pickup"}
      </button>
      <p className="text-xs text-slate-500">
        Requesting a time does not guarantee the slot. Karan or Abhi will
        confirm by phone.
      </p>
    </form>
  );
}
