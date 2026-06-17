-- Subscriptions feature: tiered fragrance journeys (Silver / Platinum)
--
-- Apply this migration in the Supabase SQL editor or via `supabase db push`.
-- The webhook handler at app/api/webhooks/stripe/route.ts requires both tables.

-- ─── Enums ──────────────────────────────────────────────────────────────────

create type subscription_tier as enum ('silver', 'platinum');

create type subscription_status as enum ('active', 'paused', 'completed');

create type subscription_fulfillment_kind as enum (
  'monthly_10ml',
  'silver_unlock',
  'platinum_unlock'
);

-- ─── subscriptions ──────────────────────────────────────────────────────────

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tier subscription_tier not null,
  target_scent_slug text not null,
  monthly_price_cents integer not null check (monthly_price_cents > 0),
  cumulative_spend_cents integer not null default 0 check (cumulative_spend_cents >= 0),
  status subscription_status not null default 'active',
  stripe_subscription_id text unique,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create index subscriptions_user_id_idx on subscriptions (user_id);
create index subscriptions_status_idx on subscriptions (status);

alter table subscriptions enable row level security;

-- Customers can read their own subscriptions; writes go through the service role
-- (which bypasses RLS) inside the Stripe webhook handler.
create policy "subscriptions_select_own"
  on subscriptions
  for select
  using (auth.uid() = user_id);

-- ─── subscription_fulfillments ──────────────────────────────────────────────

create table subscription_fulfillments (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references subscriptions (id) on delete cascade,
  kind subscription_fulfillment_kind not null,
  scent_slug text not null,
  discovery_sample_slug text,
  shipped_at timestamptz not null default now()
);

create index subscription_fulfillments_subscription_id_idx
  on subscription_fulfillments (subscription_id);

alter table subscription_fulfillments enable row level security;

-- Customers can read fulfillment records for their own subscriptions.
create policy "subscription_fulfillments_select_own"
  on subscription_fulfillments
  for select
  using (
    exists (
      select 1
      from subscriptions
      where subscriptions.id = subscription_fulfillments.subscription_id
        and subscriptions.user_id = auth.uid()
    )
  );
