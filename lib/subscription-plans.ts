import type { SubscriptionTier } from "@/types/subscription";

export interface SubscriptionTierConfig {
  tier: SubscriptionTier;
  /** Display name shown to customers. */
  label: string;
  /** Fixed monthly price in cents. */
  monthlyPriceCents: number;
  /** Cumulative spend in cents required to unlock the tier reward. */
  thresholdCents: number;
  /** One-line summary of the reward. */
  rewardSummary: string;
  /** Longer description used on marketing copy. */
  rewardDescription: string;
  /** Env var name that holds the Stripe recurring Price ID for this tier. */
  stripePriceEnvKey: string;
}

export const SUBSCRIPTION_TIERS: Record<SubscriptionTier, SubscriptionTierConfig> = {
  silver: {
    tier: "silver",
    label: "Silver",
    monthlyPriceCents: 2900, // $29.00
    thresholdCents: 39900, // $399.00
    rewardSummary: "A 100ml bottle of your chosen scent, plus a 10ml discovery sample.",
    rewardDescription:
      "Every month receive a 10ml of the scent you've chosen. When your journey reaches $399, a full 100ml of that same scent ships to you alongside a 10ml discovery sample editorially selected by Us.",
    stripePriceEnvKey: "STRIPE_PRICE_SILVER",
  },
  platinum: {
    tier: "platinum",
    label: "Platinum",
    monthlyPriceCents: 5220, // $52.20 — 80% premium over Silver
    thresholdCents: 129900, // $1,299.00
    rewardSummary:
      "A 100ml bottle in a 925/999 sterling silver cap with premium packaging, plus a 10ml discovery sample.",
    rewardDescription:
      "Every month receive a 10ml of the scent you've chosen. When your journey reaches $1,299, a full 100ml of that same scent ships in an heirloom flacon — fitted with a 925 or 999 sterling silver cap and wrapped in our premium presentation packaging. A 10ml discovery sample accompanies the delivery.",
    stripePriceEnvKey: "STRIPE_PRICE_PLATINUM",
  },
};

/** Ordered list for UI rendering (lowest tier first). */
export const SUBSCRIPTION_TIER_ORDER: SubscriptionTier[] = ["silver", "platinum"];

/**
 * Months (rounded up) until a subscription at `monthlyPriceCents` reaches `thresholdCents`.
 * Used for internal projections; we deliberately do not surface this number to customers.
 */
export function monthsToTier(config: SubscriptionTierConfig): number {
  return Math.ceil(config.thresholdCents / config.monthlyPriceCents);
}

/**
 * Cents remaining on the next Stripe invoice so cumulative spend lands exactly on threshold.
 * Returns null when the next full monthly charge does not yet cross the threshold.
 */
export function proratedFinalCents(
  cumulativeCents: number,
  config: SubscriptionTierConfig,
): number | null {
  const afterNextFull = cumulativeCents + config.monthlyPriceCents;
  if (afterNextFull < config.thresholdCents) return null;
  return Math.max(0, config.thresholdCents - cumulativeCents);
}
