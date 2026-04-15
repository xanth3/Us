import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeServer } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { SUBSCRIPTION_TIERS } from "@/lib/subscription-plans";
import type { SubscriptionTier } from "@/types/subscription";

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

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.metadata?.us_subscription === "true") {
          await handleSubscriptionCheckoutCompleted(session);
        } else {
          console.log("[Stripe webhook] checkout.session.completed (non-subscription)", session.id);
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await handleSubscriptionInvoicePaid(invoice);
        }
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook handler error";
    console.error("[Stripe webhook] Handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ─── Subscription handlers ───────────────────────────────────────────────────

async function handleSubscriptionCheckoutCompleted(session: Stripe.Checkout.Session) {
  const tier = session.metadata?.tier as SubscriptionTier | undefined;
  const targetScentSlug = session.metadata?.target_scent_slug;
  const userId = session.metadata?.user_id;
  const stripeSubscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  const stripeCustomerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;

  if (!tier || !targetScentSlug || !userId || !stripeSubscriptionId) {
    console.error("[Stripe webhook] Subscription checkout missing metadata", session.id);
    return;
  }

  const config = SUBSCRIPTION_TIERS[tier];
  const supabase = getSupabaseAdmin();

  // Idempotent insert — Stripe may retry; ignore conflict on stripe_subscription_id
  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      tier,
      target_scent_slug: targetScentSlug,
      monthly_price_cents: config.monthlyPriceCents,
      cumulative_spend_cents: 0,
      status: "active",
      stripe_subscription_id: stripeSubscriptionId,
      stripe_customer_id: stripeCustomerId ?? null,
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (error) {
    console.error("[Stripe webhook] Failed to insert subscription:", error.message);
    throw error;
  }
}

async function handleSubscriptionInvoicePaid(invoice: Stripe.Invoice) {
  const stripeSubscriptionId =
    typeof invoice.subscription === "string"
      ? invoice.subscription
      : invoice.subscription?.id ?? null;
  if (!stripeSubscriptionId) return;

  const supabase = getSupabaseAdmin();

  const { data: subscription, error: fetchErr } = await supabase
    .from("subscriptions")
    .select("id, tier, target_scent_slug, cumulative_spend_cents, status")
    .eq("stripe_subscription_id", stripeSubscriptionId)
    .maybeSingle();

  if (fetchErr) throw fetchErr;
  if (!subscription) {
    // Invoice for a subscription we don't track (e.g., one created before this feature shipped)
    return;
  }
  if (subscription.status === "completed") {
    // Already finished — ignore stray late events
    return;
  }

  const config = SUBSCRIPTION_TIERS[subscription.tier as SubscriptionTier];
  const amountPaid = invoice.amount_paid;
  const newCumulative = subscription.cumulative_spend_cents + amountPaid;
  const reachedThreshold = newCumulative >= config.thresholdCents;

  if (reachedThreshold) {
    const overage = newCumulative - config.thresholdCents;
    const cappedCumulative = config.thresholdCents;

    // 1) Cancel the Stripe subscription immediately — clean finish line
    try {
      await getStripeServer().subscriptions.cancel(stripeSubscriptionId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Stripe cancel failed";
      console.error("[Stripe webhook] Subscription cancel failed:", message);
    }

    // 2) Refund the overage so the customer pays exactly the threshold amount
    if (overage > 0 && invoice.payment_intent) {
      const piId =
        typeof invoice.payment_intent === "string"
          ? invoice.payment_intent
          : invoice.payment_intent.id;
      try {
        await getStripeServer().refunds.create({
          payment_intent: piId,
          amount: overage,
          reason: "requested_by_customer",
          metadata: { reason: "us_subscription_threshold_overage" },
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Refund failed";
        console.error("[Stripe webhook] Overage refund failed:", message);
      }
    }

    // 3) Mark subscription completed
    const { error: updateErr } = await supabase
      .from("subscriptions")
      .update({
        cumulative_spend_cents: cappedCumulative,
        status: "completed",
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", subscription.id);
    if (updateErr) throw updateErr;

    // 4) Log the tier-unlock fulfillment
    const kind = subscription.tier === "platinum" ? "platinum_unlock" : "silver_unlock";
    await supabase.from("subscription_fulfillments").insert({
      subscription_id: subscription.id,
      kind,
      scent_slug: subscription.target_scent_slug,
      // Discovery sample is editorially picked downstream by ops; null at log time.
      discovery_sample_slug: null,
    });
  } else {
    // Regular monthly — bump cumulative and log a 10ml fulfillment
    const { error: updateErr } = await supabase
      .from("subscriptions")
      .update({
        cumulative_spend_cents: newCumulative,
        updated_at: new Date().toISOString(),
      })
      .eq("id", subscription.id);
    if (updateErr) throw updateErr;

    await supabase.from("subscription_fulfillments").insert({
      subscription_id: subscription.id,
      kind: "monthly_10ml",
      scent_slug: subscription.target_scent_slug,
      discovery_sample_slug: null,
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const supabase = getSupabaseAdmin();

  // If we set status='completed' ourselves a moment ago, do not overwrite it.
  const { data: existing } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("stripe_subscription_id", subscription.id)
    .maybeSingle();

  if (!existing || existing.status === "completed") return;

  const { error } = await supabase
    .from("subscriptions")
    .update({ status: "paused", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscription.id);
  if (error) throw error;
}
