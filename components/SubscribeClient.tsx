"use client";

import { useState, useMemo } from "react";
import { useCart } from "./CartProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SubscriptionTier } from "@/types/subscription";
import type { SubscriptionTierConfig } from "@/lib/subscription-plans";

interface FragranceOption {
  slug: string;
  name: string;
  collection: string;
  image: string;
}

interface Props {
  fragrances: FragranceOption[];
  tiers: SubscriptionTierConfig[];
}

function formatUSD(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function SubscribeClient({ fragrances, tiers }: Props) {
  const [tier, setTier] = useState<SubscriptionTier>("silver");
  const [scentSlug, setScentSlug] = useState<string>(fragrances[0]?.slug ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAccountDrawerOpen } = useCart();

  const selectedTier = useMemo(() => tiers.find((t) => t.tier === tier)!, [tiers, tier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Auth check before kicking off Stripe
    const supabase = createSupabaseBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAccountDrawerOpen(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, targetScentSlug: scentSlug }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start subscription");
      }
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header className="mb-14 text-center">
        <p className="mb-3 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
          The Us Subscription
        </p>
        <h1 className="text-3xl font-light tracking-tight sm:text-5xl">
          A finite journey, ending in an heirloom.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] font-light leading-relaxed text-muted-foreground">
          Every month a 10ml of the scent you&rsquo;ve chosen arrives. Your journey climbs toward
          a full bottle that is yours to keep. The subscription concludes itself the moment your
          bottle is earned — no auto-renewal, no quiet billing, only a finished promise.
        </p>
      </header>

      {/* ── Tier selector ─────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="mb-5 text-sm uppercase tracking-[0.14em] text-muted-foreground">
          Choose your journey
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tiers.map((t) => {
            const isActive = t.tier === tier;
            return (
              <button
                key={t.tier}
                type="button"
                onClick={() => setTier(t.tier)}
                className={`flex flex-col rounded-sm border p-6 text-left transition-all ${
                  isActive
                    ? "border-foreground bg-foreground/[0.02] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                    : "border-border hover:border-foreground/40"
                }`}
                aria-pressed={isActive}
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-xl font-light tracking-wide">{t.label}</span>
                  <span className="text-sm font-light text-muted-foreground">
                    {formatUSD(t.monthlyPriceCents)}/mo
                  </span>
                </div>
                <p className="mb-4 text-[0.85rem] font-light leading-relaxed text-muted-foreground">
                  {t.rewardDescription}
                </p>
                <p className="mt-auto text-[0.78rem] uppercase tracking-[0.12em] text-foreground/60">
                  Bottle earned at {formatUSD(t.thresholdCents)}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Scent selector ────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="mb-5 text-sm uppercase tracking-[0.14em] text-muted-foreground">
          Choose your scent
        </h2>
        <p className="mb-5 text-[0.85rem] font-light text-muted-foreground">
          Your monthly 10ml &mdash; and the full bottle that completes the journey &mdash; will be in
          this scent. You can begin a new subscription with a different scent later.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {fragrances.map((f) => {
            const isActive = f.slug === scentSlug;
            return (
              <button
                key={f.slug}
                type="button"
                onClick={() => setScentSlug(f.slug)}
                className={`group flex flex-col overflow-hidden rounded-sm border text-left transition-all ${
                  isActive ? "border-foreground" : "border-border hover:border-foreground/40"
                }`}
                aria-pressed={isActive}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  {f.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={f.image}
                      alt={f.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="px-3 py-3">
                  <p className="text-[0.8rem] font-light tracking-wide">{f.name}</p>
                  <p className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {f.collection}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Submit ────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="border-t border-border pt-8">
        <div className="mb-6 flex flex-col gap-1 text-center sm:flex-row sm:items-baseline sm:justify-between sm:text-left">
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
              {selectedTier.label} subscription
            </p>
            <p className="mt-1 text-2xl font-light">
              {formatUSD(selectedTier.monthlyPriceCents)}
              <span className="text-sm text-muted-foreground"> per month</span>
            </p>
          </div>
          <p className="text-[0.78rem] font-light text-muted-foreground">
            Your bottle ships at {formatUSD(selectedTier.thresholdCents)}. Cancel any time without
            losing your progress.
          </p>
        </div>

        {error && (
          <p className="mb-4 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !scentSlug}
          className="block w-full bg-foreground py-4 text-center text-sm uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Preparing checkout\u2026" : "Begin the journey"}
        </button>

        <p className="mt-4 text-center text-[0.72rem] font-light text-muted-foreground">
          Sign in is required. Billed monthly via Stripe; the subscription concludes itself when your
          bottle is earned.
        </p>
      </form>
    </div>
  );
}
