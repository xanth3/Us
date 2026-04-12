import type { Product } from "@/types/product";

/** Slugs of all products — used for generateStaticParams */
export const CATALOG_SLUGS = [
  "fantasmagory",
  "lavender-selle",
  "nude-lipstick",
  "painer-carumme",
  "golden-palette",
] as const;

export type CatalogSlug = (typeof CATALOG_SLUGS)[number];

export const CATALOG: Record<CatalogSlug, Product> = {
  fantasmagory: {
    slug: "fantasmagory",
    ref: "LP0429",
    kicker: "PERSONALIZABLE & REFILLABLE",
    name: "Fantasmagory",
    price: 595.0,
    currency: "USD",
    images: [
      {
        src: "/assets/fantasmagory.jpg",
        alt: "Fantasmagory perfume bottle with silver rose cap on pink floral background",
      },
      {
        src: "/assets/fantasmagory-2.jpg",
        alt: "Fantasmagory perfume bottle detail — golden liquid dripping on marble",
      },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: "/assets/fantasmagory-thumb.jpg",
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      {
        title: "Find in Store",
        content:
          "Use our store locator to find the nearest Us boutique carrying this fragrance.",
        indicator: "+",
      },
      {
        title: "Delivery & Returns",
        content:
          "Complimentary Standard Delivery on all orders. Free returns within 30 days of receipt.",
        indicator: "›",
      },
      {
        title: "Gifting",
        content:
          "Complimentary gift wrapping is available at checkout. Add a personalised message to make it extra special.",
        indicator: "›",
      },
    ],
  },

  "lavender-selle": {
    slug: "lavender-selle",
    ref: "LP0201",
    kicker: "LIMITED EDITION",
    name: "Lavender Selle ou Fritch",
    price: 395.0,
    currency: "USD",
    images: [
      {
        src: "/assets/rec-lavender.jpg",
        alt: "Lavender Selle ou Fritch perfume — purple glass bottle with silver rose cap",
      },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: "/assets/rec-lavender.jpg",
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Find us in select boutiques.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "nude-lipstick": {
    slug: "nude-lipstick",
    ref: "LP0312",
    kicker: "BESTSELLER",
    name: "Nude Lipstick",
    price: 65.0,
    currency: "USD",
    images: [
      {
        src: "/assets/rec-lipstick.jpg",
        alt: "Nude lipstick with gold tube",
      },
    ],
    serviceOffer: {
      title: "Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: "/assets/rec-lipstick.jpg",
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Find us in select boutiques.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "painer-carumme": {
    slug: "painer-carumme",
    ref: "LP0408",
    kicker: "NEW ARRIVAL",
    name: "Painer Carumme Lique",
    price: 450.0,
    currency: "USD",
    images: [
      {
        src: "/assets/rec-painer.jpg",
        alt: "Painer Carumme Lique — pink perfume bottle with silver rose cap",
      },
    ],
    serviceOffer: {
      title: "Bottle Engraving",
      subtitle: "Complimentary",
      description: "With your initials or numbers",
      icon: "/assets/rec-painer.jpg",
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Find us in select boutiques.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },

  "golden-palette": {
    slug: "golden-palette",
    ref: "LP0517",
    kicker: "COLLECTOR'S EDITION",
    name: "Golden Eye Palette",
    price: 125.0,
    currency: "USD",
    images: [
      {
        src: "/assets/rec-palette.jpg",
        alt: "Golden eye shadow palette with four metallic shades",
      },
    ],
    serviceOffer: {
      title: "Gift Wrapping",
      subtitle: "Complimentary",
      description: "Add a personal message",
      icon: "/assets/rec-palette.jpg",
    },
    deliveryCopy: [
      "Complimentary Standard Delivery or Collect-in-Store.",
      "Available exclusively on us.com and in selected Us stores.",
    ],
    faqs: [
      { title: "Find in Store", content: "Find us in select boutiques.", indicator: "+" },
      { title: "Delivery & Returns", content: "Free returns within 30 days.", indicator: "›" },
      { title: "Gifting", content: "Complimentary gift wrapping available.", indicator: "›" },
    ],
  },
};

/** All products as an array (for grids/carousels) */
export const ALL_PRODUCTS = Object.values(CATALOG);

/** Featured products for the homepage grid */
export const FEATURED_SLUGS: CatalogSlug[] = [
  "fantasmagory",
  "lavender-selle",
  "nude-lipstick",
  "painer-carumme",
];

/** Recommendations shown on the Fantasmagory PDP */
export const FANTASMAGORY_REC_SLUGS: CatalogSlug[] = [
  "lavender-selle",
  "nude-lipstick",
  "painer-carumme",
  "golden-palette",
];
