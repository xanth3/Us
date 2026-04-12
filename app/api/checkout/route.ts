import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  try {
    const body = (await req.json()) as {
      productName?: string;
      priceAmount?: number;
      currency?: string;
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await createCheckoutSession({
      productName: body.productName ?? "Us Product",
      priceAmount: body.priceAmount ?? 59500, // $595.00 in cents
      currency: body.currency ?? "usd",
      successUrl: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${siteUrl}/`,
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
