import { NextResponse } from "next/server";
import { CONTACTS } from "@/lib/config";

type PickupRequest = {
  productName?: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  note?: string;
};

function isValid(body: unknown): body is PickupRequest {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.date === "string" &&
    typeof b.time === "string" &&
    typeof b.customerName === "string" &&
    b.customerName.trim().length > 0 &&
    typeof b.customerPhone === "string" &&
    b.customerPhone.replace(/\D/g, "").length >= 10
  );
}

async function notifyEmail(req: PickupRequest): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.PICKUP_NOTIFY_EMAIL;
  const from = process.env.PICKUP_FROM_EMAIL;
  if (!key || !to || !from) return false;
  const subject = `Pickup request: ${req.productName ?? "general"} on ${req.date} at ${req.time}`;
  const text = [
    `Product: ${req.productName ?? "(not specified)"}`,
    `Date: ${req.date}`,
    `Time: ${req.time}`,
    `Customer: ${req.customerName}`,
    `Phone: ${req.customerPhone}`,
    req.note ? `Note: ${req.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: to.split(","), subject, text }),
  });
  return res.ok;
}

async function notifyTwilio(req: PickupRequest): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) return false;
  const to = (process.env.PICKUP_NOTIFY_SMS ?? CONTACTS.map((c) => c.tel).join(","))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const body = `Cricket Bay Area pickup request. ${req.customerName} (${req.customerPhone}) wants ${req.productName ?? "gear"} on ${req.date} at ${req.time}.${req.note ? " Note: " + req.note : ""}`;
  let allOk = true;
  for (const number of to) {
    const params = new URLSearchParams({ From: from, To: number, Body: body });
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );
    if (!res.ok) allOk = false;
  }
  return allOk;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isValid(body)) {
    return NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 400 },
    );
  }

  // Always log server-side so requests are recoverable in dev even without providers.
  // eslint-disable-next-line no-console
  console.log("[pickup]", JSON.stringify(body));

  let delivered: "email" | "sms" | "none" = "none";
  try {
    if (await notifyEmail(body)) delivered = "email";
    else if (await notifyTwilio(body)) delivered = "sms";
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[pickup] notify failed:", err);
  }

  return NextResponse.json({ ok: true, delivered });
}
