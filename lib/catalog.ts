import type { Product } from "@/types/product";

export const CATALOG_SLUGS = [
  "fantasmagory",
  "symphony",
  "us-rouge-lipstick",
  "stellar-times",
  "us-ombres-palette",
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
    images: [
      { src: "/assets/perfume-hero.jpg", alt: "Fantasmagory perfume bottle" },
      { src: "/assets/perfume-detail.jpg", alt: "Fantasmagory perfume detail" },
      { src: "/assets/perfume-lifestyle.jpg", alt: "Fantasmagory lifestyle shot" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: "/assets/perfume-thumb.png",
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
    kicker: "Personalizable & Refillable",
    name: "Symphony",
    price: 595.0,
    currency: "USD",
    images: [
      { src: "/assets/product-symphony.jpg", alt: "Symphony perfume bottle" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: "/assets/product-symphony.jpg",
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
    name: "Us Rouge - Satin Lipstick",
    price: 160.0,
    currency: "USD",
    images: [
      { src: "/assets/product-lipstick.jpg", alt: "Us Rouge Satin Lipstick" },
    ],
    serviceOffer: {
      title: "Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: "/assets/product-lipstick.jpg",
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
    kicker: "New Arrival",
    name: "Stellar Times",
    price: 595.0,
    currency: "USD",
    images: [
      { src: "/assets/product-stellar.jpg", alt: "Stellar Times perfume bottle" },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: "/assets/product-stellar.jpg",
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
    name: "Us Ombres - Eyeshadow Palette",
    price: 250.0,
    currency: "USD",
    images: [
      { src: "/assets/product-palette.jpg", alt: "Us Ombres Eyeshadow Palette" },
    ],
    serviceOffer: {
      title: "Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: "/assets/product-palette.jpg",
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
  "us-rouge-lipstick",
  "stellar-times",
  "us-ombres-palette",
];

/** Featured slugs for homepage */
export const FEATURED_SLUGS: CatalogSlug[] = [
  "fantasmagory",
  "symphony",
  "us-rouge-lipstick",
  "stellar-times",
];
