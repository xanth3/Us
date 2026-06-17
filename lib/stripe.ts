import Stripe from "stripe";
import type { SubscriptionTier } from "@/types/subscription";
import { SUBSCRIPTION_TIERS } from "@/lib/subscription-plans";

let _stripe: Stripe | null = null;

export function getStripeServer(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }
  return _stripe;
}

export async function createCheckoutSession(params: {
  productName: string;
  priceAmount: number; // in cents
  currency: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeServer();

  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: params.currency,
          product_data: { name: params.productName },
          unit_amount: params.priceAmount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });
}

/**
 * Resolves the Stripe recurring Price ID configured for a given subscription tier.
 * Throws if the env var is missing so we fail fast rather than silently skip billing.
 */
export function getStripePriceIdForTier(tier: SubscriptionTier): string {
  const envKey = SUBSCRIPTION_TIERS[tier].stripePriceEnvKey;
  const priceId = process.env[envKey];
  if (!priceId) {
    throw new Error(`${envKey} is not set — Stripe recurring price ID missing for ${tier} tier`);
  }
  return priceId;
}

/**
 * Creates a Stripe Checkout Session for a subscription. Metadata travels to the
 * webhook so we can attribute the subscription back to the user and chosen scent.
 */
export async function createSubscriptionCheckoutSession(params: {
  tier: SubscriptionTier;
  targetScentSlug: string;
  userId: string;
  customerEmail: string;
  stripeCustomerId: string | null;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeServer();
  const priceId = getStripePriceIdForTier(params.tier);

  const metadata: Record<string, string> = {
    us_subscription: "true",
    tier: params.tier,
    target_scent_slug: params.targetScentSlug,
    user_id: params.userId,
  };

  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    ...(params.stripeCustomerId
      ? { customer: params.stripeCustomerId }
      : { customer_email: params.customerEmail }),
    metadata,
    subscription_data: { metadata },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });
}
