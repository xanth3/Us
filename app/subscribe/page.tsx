import type { Metadata } from "next";
import { CATALOG, LES_PARFUMS_SLUGS, AZUR_SLUGS } from "@/lib/catalog";
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_TIER_ORDER } from "@/lib/subscription-plans";
import { SubscribeClient } from "@/components/SubscribeClient";

export const metadata: Metadata = {
  title: "The Us Subscription",
  description:
    "A finite journey toward an heirloom flacon. Each month a 10ml of your chosen scent — and at the end, the bottle is yours.",
};

export default function SubscribePage() {
  // Only fragrances are eligible target scents for the subscription
  const fragranceSlugs = [...LES_PARFUMS_SLUGS, ...AZUR_SLUGS].filter((slug) => {
    const product = CATALOG[slug];
    return product.collection === "Les Parfums" || product.collection === "Azur";
  });

  // Strip down to what the client needs — the full Product is overkill
  const fragrances = fragranceSlugs.map((slug) => {
    const p = CATALOG[slug];
    return {
      slug: p.slug,
      name: p.name,
      collection: p.collection ?? "",
      image: p.images[0]?.src ?? "",
    };
  });

  const tiers = SUBSCRIPTION_TIER_ORDER.map((t) => SUBSCRIPTION_TIERS[t]);

  return <SubscribeClient fragrances={fragrances} tiers={tiers} />;
}
