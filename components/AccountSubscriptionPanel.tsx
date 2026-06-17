"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Subscription } from "@/types/subscription";
import type { SubscriptionTierConfig } from "@/lib/subscription-plans";

interface Props {
  subscription: Subscription;
  tierConfig: SubscriptionTierConfig;
  scent?: { name: string; image: string };
}

function formatUSD(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function AccountSubscriptionPanel({ subscription, tierConfig, scent }: Props) {
  const [signingOut, setSigningOut] = useState(false);

  const remaining = Math.max(0, tierConfig.thresholdCents - subscription.cumulative_spend_cents);
  const pct = Math.min(
    100,
    Math.round((subscription.cumulative_spend_cents / tierConfig.thresholdCents) * 100),
  );
  const isPaused = subscription.status === "paused";

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="rounded-sm border border-border">
      {/* ── Top: scent + tier ─────────────────────────────────────────────── */}
      <div className="flex gap-5 border-b border-border p-6">
        {scent?.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={scent.image}
            alt={scent.name}
            className="h-24 w-20 shrink-0 object-cover"
          />
        )}
        <div className="flex flex-1 flex-col">
          <p className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
            {tierConfig.label} journey
            {isPaused && <span className="ml-2 text-foreground/60">&middot; paused</span>}
          </p>
          <p className="mt-1 text-lg font-light tracking-wide">{scent?.name ?? "—"}</p>
          <p className="mt-2 text-[0.8rem] font-light text-muted-foreground">
            {tierConfig.rewardSummary}
          </p>
        </div>
      </div>

      {/* ── Progress ───────────────────────────────────────────────────────── */}
      <div className="border-b border-border p-6">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="text-[0.78rem] uppercase tracking-[0.14em] text-muted-foreground">
            Progress towards your bottle
          </p>
          <p className="text-[0.78rem] font-light text-muted-foreground">
            {formatUSD(subscription.cumulative_spend_cents)} of {formatUSD(tierConfig.thresholdCents)}
          </p>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-[0.85rem] font-light">
          {remaining > 0
            ? `${formatUSD(remaining)} remaining until your bottle is earned.`
            : "Your bottle has been earned."}
        </p>
      </div>

      {/* ── Billing ───────────────────────────────────────────────────────── */}
      <div className="border-b border-border p-6">
        <p className="text-[0.78rem] uppercase tracking-[0.14em] text-muted-foreground">
          Billed monthly
        </p>
        <p className="mt-1 text-base font-light">
          {formatUSD(subscription.monthly_price_cents)} / month
        </p>
        {isPaused ? (
          <p className="mt-2 text-[0.8rem] font-light text-muted-foreground">
            Your subscription is paused. Your progress is preserved &mdash; resume any time by
            starting a new subscription with the same scent.
          </p>
        ) : (
          <p className="mt-2 text-[0.8rem] font-light text-muted-foreground">
            Manage payment method or cancel from the Stripe customer portal.
          </p>
        )}
      </div>

      {/* ── Actions ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="text-[0.8rem] tracking-wide underline underline-offset-2 transition-opacity hover:opacity-60 disabled:opacity-50"
        >
          {signingOut ? "Signing out\u2026" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
