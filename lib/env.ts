import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

// We parse lazily so missing vars are warnings, not startup crashes.
// Stripe/Supabase routes guard themselves before using these values.
const _env = envSchema.safeParse(process.env);

export const env = _env.success ? _env.data : ({} as z.infer<typeof envSchema>);
