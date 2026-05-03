import type { Product } from "@/types/product";

const HERITAGE_IMAGES = {
  fullGhorm: "/assets/heritage/fames-full-ghorm-clear.png",
  lavender: "/assets/heritage/fames-lavender.png",
  blue: "/assets/heritage/fames-blue.png",
  rose: "/assets/heritage/fames-rose.png",
  badBloodHero: "/assets/heritage/fames-bad-blood-hero.png",
  gold: "/assets/heritage/fames-product-gold.png",
  goldAlt: "/assets/heritage/fames-product-gold-alt.png",
  silver: "/assets/heritage/fames-silver.png",
} as const;

export const CATALOG_SLUGS = [
  "fantasmagory",
  "symphony",
  "stellar-times",
  "us-rouge-lipstick",
  "us-ombres-palette",
  // Azur collection
  "azur-coast",
  "ciel-d-azur",
  "azur-night",
  "azur-bloom",
  // Bags — New Bags for Her
  "hobo-mm",
  "all-in-bb",
  "neverfull-gm",
  "express-mm",
] as const;

export type CatalogSlug = (typeof CATALOG_SLUGS)[number];

export const CATALOG: Record<CatalogSlug, Product> = {
  fantasmagory: {
    slug: "fantasmagory",
    ref: "LP0429",
    kicker: "Personalizable & Refillable",
    name: "Fantasmagory",
    price: 595.0,
    currency: "USD",
    collection: "Les Parfums",
    images: [
      { src: HERITAGE_IMAGES.badBloodHero, alt: "Fantasmagory perfume bottle" },
      { src: HERITAGE_IMAGES.fullGhorm, alt: "Fantasmagory perfume detail" },
      { src: HERITAGE_IMAGES.gold, alt: "Fantasmagory lifestyle shot" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: HERITAGE_IMAGES.fullGhorm,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Complimentary Standard Delivery on all orders. Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available at checkout.", indicator: "›" },
    ],
  },

  symphony: {
    slug: "symphony",
    ref: "LP0301",
    kicker: "Icon — Personalizable & Refillable",
    name: "Symphony",
    price: 595.0,
    currency: "USD",
    collection: "Les Parfums",
    badge: "ICON",
    images: [
      { src: HERITAGE_IMAGES.lavender, alt: "Symphony perfume bottle" },
      { src: HERITAGE_IMAGES.goldAlt, alt: "Symphony lifestyle" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: HERITAGE_IMAGES.lavender,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "stellar-times": {
    slug: "stellar-times",
    ref: "LP0408",
    kicker: "New — Personalizable & Refillable",
    name: "Stellar Times",
    price: 595.0,
    currency: "USD",
    collection: "Les Parfums",
    badge: "NEW",
    images: [
      { src: HERITAGE_IMAGES.blue, alt: "Stellar Times perfume bottle" },
      { src: HERITAGE_IMAGES.badBloodHero, alt: "Stellar Times detail" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: HERITAGE_IMAGES.blue,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "us-rouge-lipstick": {
    slug: "us-rouge-lipstick",
    ref: "LP0312",
    kicker: "Bestseller",
    name: "Us Rouge — Satin Lipstick",
    price: 160.0,
    currency: "USD",
    collection: "Les Parfums",
    images: [
      { src: HERITAGE_IMAGES.rose, alt: "Us Rouge Satin fragrance bottle" },
      { src: HERITAGE_IMAGES.gold, alt: "Us Rouge lifestyle" },
    ],
    serviceOffer: {
      title: "Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: HERITAGE_IMAGES.rose,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "us-ombres-palette": {
    slug: "us-ombres-palette",
    ref: "LP0517",
    kicker: "Collector's Edition",
    name: "Us Ombres — Eyeshadow Palette",
    price: 250.0,
    currency: "USD",
    collection: "Les Parfums",
    images: [
      { src: HERITAGE_IMAGES.silver, alt: "Us Ombres fragrance bottle" },
      { src: HERITAGE_IMAGES.goldAlt, alt: "Us Ombres lifestyle" },
    ],
    serviceOffer: {
      title: "Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: HERITAGE_IMAGES.silver,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  // ─── Azur Collection ────────────────────────────────────────────────────────

  "azur-coast": {
    slug: "azur-coast",
    ref: "LP0601",
    kicker: "New — Personalizable & Refillable",
    name: "Azur Coast",
    price: 440.0,
    currency: "USD",
    collection: "Azur",
    badge: "NEW",
    images: [
      { src: HERITAGE_IMAGES.fullGhorm, alt: "Azur Coast perfume bottle" },
      { src: HERITAGE_IMAGES.gold, alt: "Azur Coast lifestyle" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: HERITAGE_IMAGES.fullGhorm,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "ciel-d-azur": {
    slug: "ciel-d-azur",
    ref: "LP0602",
    kicker: "Icon — Personalizable & Refillable",
    name: "Ciel d'Azur",
    price: 440.0,
    currency: "USD",
    collection: "Azur",
    badge: "ICON",
    images: [
      { src: HERITAGE_IMAGES.lavender, alt: "Ciel d'Azur perfume bottle" },
      { src: HERITAGE_IMAGES.goldAlt, alt: "Ciel d'Azur lifestyle" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: HERITAGE_IMAGES.lavender,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "azur-night": {
    slug: "azur-night",
    ref: "LP0603",
    kicker: "Personalizable & Refillable",
    name: "Azur Night",
    price: 440.0,
    currency: "USD",
    collection: "Azur",
    images: [
      { src: HERITAGE_IMAGES.blue, alt: "Azur Night perfume bottle" },
      { src: HERITAGE_IMAGES.badBloodHero, alt: "Azur Night lifestyle" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: HERITAGE_IMAGES.blue,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "azur-bloom": {
    slug: "azur-bloom",
    ref: "LP0604",
    kicker: "Personalizable & Refillable",
    name: "Azur Bloom",
    price: 440.0,
    currency: "USD",
    collection: "Azur",
    images: [
      { src: HERITAGE_IMAGES.rose, alt: "Azur Bloom perfume bottle" },
      { src: HERITAGE_IMAGES.gold, alt: "Azur Bloom lifestyle" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: HERITAGE_IMAGES.rose,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  // ─── Bags — New Bags for Her ────────────────────────────────────────────────

  "hobo-mm": {
    slug: "hobo-mm",
    ref: "BG0101",
    kicker: "New",
    name: "Hobo MM",
    price: 3950.0,
    currency: "USD",
    collection: "Bags",
    badge: "NEW",
    images: [
      { src: HERITAGE_IMAGES.gold, alt: "Hobo MM bag" },
      { src: HERITAGE_IMAGES.fullGhorm, alt: "Hobo MM detail" },
    ],
    serviceOffer: {
      title: "Complimentary Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: HERITAGE_IMAGES.fullGhorm,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "all-in-bb": {
    slug: "all-in-bb",
    ref: "BG0102",
    kicker: "New",
    name: "All In BB",
    price: 3250.0,
    currency: "USD",
    collection: "Bags",
    badge: "NEW",
    images: [
      { src: HERITAGE_IMAGES.fullGhorm, alt: "All In BB bag" },
      { src: HERITAGE_IMAGES.badBloodHero, alt: "All In BB lifestyle" },
    ],
    serviceOffer: {
      title: "Complimentary Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: HERITAGE_IMAGES.fullGhorm,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "neverfull-gm": {
    slug: "neverfull-gm",
    ref: "BG0103",
    kicker: "Icon",
    name: "Neverfull GM",
    price: 2450.0,
    currency: "USD",
    collection: "Bags",
    badge: "ICON",
    images: [
      { src: HERITAGE_IMAGES.badBloodHero, alt: "Neverfull GM bag" },
      { src: HERITAGE_IMAGES.gold, alt: "Neverfull GM lifestyle" },
    ],
    serviceOffer: {
      title: "Complimentary Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: HERITAGE_IMAGES.badBloodHero,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "express-mm": {
    slug: "express-mm",
    ref: "BG0104",
    kicker: "New",
    name: "Express MM",
    price: 4500.0,
    currency: "USD",
    collection: "Bags",
    badge: "NEW",
    images: [
      { src: HERITAGE_IMAGES.lavender, alt: "Express MM bag" },
      { src: HERITAGE_IMAGES.goldAlt, alt: "Express MM lifestyle" },
    ],
    serviceOffer: {
      title: "Complimentary Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: HERITAGE_IMAGES.lavender,
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Use our store locator to find the nearest Us boutique.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },
};

export const ALL_PRODUCTS = Object.values(CATALOG);

/** Recommendation slugs shown on the Fantasmagory PDP */
export const FANTASMAGORY_RECS: CatalogSlug[] = [
  "symphony",
  "stellar-times",
  "us-rouge-lipstick",
  "us-ombres-palette",
];

/** Featured slugs for homepage */
export const FEATURED_SLUGS: CatalogSlug[] = [
  "fantasmagory",
  "symphony",
  "stellar-times",
  "us-rouge-lipstick",
];

/** Slugs for "Les Parfums" collection */
export const LES_PARFUMS_SLUGS: CatalogSlug[] = [
  "fantasmagory",
  "symphony",
  "stellar-times",
  "us-rouge-lipstick",
  "us-ombres-palette",
];

/** Slugs for "Azur" collection */
export const AZUR_SLUGS: CatalogSlug[] = [
  "azur-coast",
  "ciel-d-azur",
  "azur-night",
  "azur-bloom",
];

/** Slugs for "New Bags for Her" homepage section */
export const NEW_BAGS_FOR_HER_SLUGS: CatalogSlug[] = [
  "hobo-mm",
  "all-in-bb",
  "neverfull-gm",
  "express-mm",
];
