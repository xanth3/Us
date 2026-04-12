# Us — Luxury Beauty & Fragrance

Next.js 14 App Router e-commerce scaffold for the Us (Xanthe) brand.

## Prerequisites

- Node.js 20+
- npm 9+
- Supabase project (free tier works)
- Stripe account (test keys for dev)

## Setup

```bash
cp .env.example .env.local
# Fill in your Supabase + Stripe keys
npm install
npm run dev
```

## Drop your assets

The Loveable source images live at `src/assets/` in the original project.
Copy the **contents** of that folder into `public/assets/` before first run:

```
public/assets/
├── fantasmagory.jpg        # PDP hero — full-bleed image left pane
├── fantasmagory-2.jpg      # PDP secondary image (shown as thumbnail)
├── fantasmagory-thumb.jpg  # 48×48 icon in the Bottle Engraving card
├── hero.jpg                # Homepage hero background
├── rec-lavender.jpg        # Lavender Selle ou Fritch carousel card
├── rec-lipstick.jpg        # Nude Lipstick carousel card
├── rec-painer.jpg          # Painer Carumme Lique carousel card
└── rec-palette.jpg         # Golden Eye Palette carousel card
```

Missing files render as broken tiles — the build still succeeds.

## Routes

| Route | Description |
|---|---|
| `/` | Homepage — hero + featured 4-card grid |
| `/products/[slug]` | Product detail page (PDP) |
| `/products/fantasmagory` | Main PDP deliverable |
| `/api/checkout` | POST — creates Stripe Checkout Session |
| `/api/webhooks/stripe` | POST — verifies Stripe webhook signature |

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run dev
```

Then open `http://localhost:3000`.

### API smoke tests

```bash
# Webhook route — expect 400 (bad signature)
curl -X POST -H 'stripe-signature: x' http://localhost:3000/api/webhooks/stripe

# Checkout — expect 503 if STRIPE_SECRET_KEY is unset
curl -X POST http://localhost:3000/api/checkout
```

## Webhook local testing

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` printed by the CLI into `STRIPE_WEBHOOK_SECRET` in `.env.local`.

## Apple Pay domain verification

`public/.well-known/apple-developer-merchantid-domain-association` is an empty placeholder.
Replace it with the real file from your Stripe Apple Pay domain registration once on a public domain.

## Stack

| Area | Choice |
|---|---|
| Framework | Next.js 14 App Router, TypeScript strict |
| Styling | Tailwind CSS + CSS vars |
| Fonts | Playfair Display (display) + Inter (UI) via next/font |
| Auth/DB | @supabase/ssr |
| Payments | Stripe server + @stripe/stripe-js |
| Cart | localStorage-backed CartProvider |
| Images | next/image pointing at /assets/* |
