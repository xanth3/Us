/**
 * Brand identity — single source of truth.
 *
 * To change the brand name, set `NEXT_PUBLIC_BRAND_NAME` in `.env.local`
 * (takes effect at build time) OR edit the default value below.
 *
 * All user-facing copy, metadata, product names, and the logo read from here.
 */

export const BRAND_NAME: string = process.env.NEXT_PUBLIC_BRAND_NAME || "Fames";

/** UPPERCASE form for the wordmark logo. */
export const BRAND_NAME_UPPER: string = BRAND_NAME.toUpperCase();

/** Lowercase, stripped slug — used for the domain (e.g. "fames.com"). */
export const BRAND_SLUG: string = BRAND_NAME.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Marketing domain used in copy like "Available exclusively on fames.com". */
export const BRAND_DOMAIN: string = `${BRAND_SLUG}.com`;
