import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeServer } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  const rawBody = await req.text();

  try {
    const stripe = getStripeServer();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook verification failed";
    console.error("[Stripe webhook] Signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Handle events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[Stripe webhook] checkout.session.completed", session.id);
      break;
    }
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log("[Stripe webhook] payment_intent.succeeded", pi.id);
      break;
    }
    default:
      console.log("[Stripe webhook] Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}
