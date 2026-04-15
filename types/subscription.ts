export type SubscriptionTier = "silver" | "platinum";
export type SubscriptionStatus = "active" | "paused" | "completed";

/** Row shape of `subscriptions` table in Supabase. */
export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  /** Target perfume slug — the scent shipped monthly and received full-size at unlock. */
  target_scent_slug: string;
  monthly_price_cents: number;
  cumulative_spend_cents: number;
  status: SubscriptionStatus;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export type SubscriptionFulfillmentKind =
  | "monthly_10ml"
  | "silver_unlock"
  | "platinum_unlock";

/** Row shape of `subscription_fulfillments` — ops log of what shipped and when. */
export interface SubscriptionFulfillment {
  id: string;
  subscription_id: string;
  kind: SubscriptionFulfillmentKind;
  scent_slug: string;
  discovery_sample_slug: string | null;
  shipped_at: string;
}
