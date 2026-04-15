import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CATALOG } from "@/lib/catalog";
import { SUBSCRIPTION_TIERS } from "@/lib/subscription-plans";
import type { Subscription } from "@/types/subscription";
import type { CatalogSlug } from "@/lib/catalog";
import { AccountSubscriptionPanel } from "@/components/AccountSubscriptionPanel";

export const metadata: Metadata = {
  title: "Your Account",
  description: "Manage your Us subscription and view your journey progress.",
};

export const dynamic = "force-dynamic";

export default async function AccountPage({
  searchParams,
}: {
  searchParams?: { subscribed?: string };
}) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?signin=required");
  }

  const { data: subs } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const subscriptions = (subs ?? []) as Subscription[];

  // Resolve scent product info for any subscriptions we display
  const scentInfo: Record<string, { name: string; image: string }> = {};
  for (const s of subscriptions) {
    if (s.target_scent_slug in CATALOG) {
      const product = CATALOG[s.target_scent_slug as CatalogSlug];
      scentInfo[s.target_scent_slug] = {
        name: product.name,
        image: product.images[0]?.src ?? "",
      };
    }
  }

  const activeOrPaused = subscriptions.find((s) => s.status === "active" || s.status === "paused");
  const completed = subscriptions.filter((s) => s.status === "completed");

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-10 sm:pt-16">
      <header className="mb-10">
        <p className="mb-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
          Your account
        </p>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">{user.email}</h1>
      </header>

      {searchParams?.subscribed === "1" && (
        <div className="mb-8 rounded-sm border border-foreground/20 bg-foreground/[0.02] px-5 py-4 text-sm">
          Welcome aboard. Your first 10ml will ship shortly &mdash; check your inbox for a
          confirmation from Stripe.
        </div>
      )}

      <section className="mb-10">
        <h2 className="mb-5 text-sm uppercase tracking-[0.14em] text-muted-foreground">
          Subscription
        </h2>

        {activeOrPaused ? (
          <AccountSubscriptionPanel
            subscription={activeOrPaused}
            tierConfig={SUBSCRIPTION_TIERS[activeOrPaused.tier]}
            scent={scentInfo[activeOrPaused.target_scent_slug]}
          />
        ) : (
          <div className="rounded-sm border border-border p-6">
            <p className="mb-4 text-[0.9rem] font-light leading-relaxed text-muted-foreground">
              You don&rsquo;t have an active subscription. Begin a journey toward an heirloom
              flacon &mdash; cancel any time, progress is preserved indefinitely.
            </p>
            <Link
              href="/subscribe"
              className="inline-block bg-foreground px-6 py-3 text-sm uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-90"
            >
              Explore the subscription
            </Link>
          </div>
        )}
      </section>

      {completed.length > 0 && (
        <section>
          <h2 className="mb-5 text-sm uppercase tracking-[0.14em] text-muted-foreground">
            Bottles earned
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {completed.map((s) => {
              const info = scentInfo[s.target_scent_slug];
              return (
                <li key={s.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-[0.9rem] font-light">
                      {info?.name ?? s.target_scent_slug}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">
                      {SUBSCRIPTION_TIERS[s.tier].label} &middot;{" "}
                      {s.completed_at
                        ? new Date(s.completed_at).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
