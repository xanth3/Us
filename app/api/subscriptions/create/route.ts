import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSubscriptionCheckoutSession } from "@/lib/stripe";
import { CATALOG_SLUGS } from "@/lib/catalog";

export const runtime = "nodejs";

const BodySchema = z.object({
  tier: z.enum(["silver", "platinum"]),
  targetScentSlug: z.enum(CATALOG_SLUGS),
});

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return NextResponse.json({ error: "Sign in to start a subscription" }, { status: 401 });
  }

  // Reuse a Stripe customer ID if we already have one from a prior subscription
  const { data: existing } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .not("stripe_customer_id", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const session = await createSubscriptionCheckoutSession({
      tier: parsed.data.tier,
      targetScentSlug: parsed.data.targetScentSlug,
      userId: user.id,
      customerEmail: user.email,
      stripeCustomerId: existing?.stripe_customer_id ?? null,
      successUrl: `${siteUrl}/account?subscribed=1`,
      cancelUrl: `${siteUrl}/subscribe?cancelled=1`,
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[subscriptions/create]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
