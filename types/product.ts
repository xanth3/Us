export interface ProductImage {
  src: string;
  alt: string;
}

export interface ServiceOffer {
  title: string;
  subtitle: string;
  description: string;
  /** path to small icon image */
  icon: string;
}

export interface FaqSection {
  title: string;
  content: string;
  /** "+" for expandable, "›" for navigate */
  indicator: "+" | "›";
}

export interface Product {
  slug: string;
  ref: string;
  kicker: string;
  name: string;
  price: number;
  currency: string;
  images: ProductImage[];
  serviceOffer: ServiceOffer;
  deliveryCopy: string[];
  faqs: FaqSection[];
}
