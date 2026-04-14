import type { Metadata } from "next";
import { CATALOG, LES_PARFUMS_SLUGS, AZUR_SLUGS } from "@/lib/catalog";
import { AllPerfumesClient } from "@/components/AllPerfumesClient";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "All Perfumes",
  description: `Explore the full ${BRAND_NAME} perfume collection — personalizable, refillable luxury fragrances.`,
};

export default function AllPerfumesPage() {
  const lesPerfums = LES_PARFUMS_SLUGS.map((s) => CATALOG[s]);
  const azur = AZUR_SLUGS.map((s) => CATALOG[s]);

  const sections = [
    {
      name: "Les Parfums",
      description: `The signature ${BRAND_NAME} fragrance collection.`,
      heroImage: "/assets/perfume-hero.jpg",
      heroTitle: "Fantasmagory, the Art of Illusion",
      heroSubtitle:
        "Ethereal and captivating, Fantasmagory conjures the mystery of light dancing on water. A luminous floral-woody fragrance that transcends the ordinary.",
      products: lesPerfums,
    },
    {
      name: "Azur",
      description: "Inspired by the endless blue of the Mediterranean.",
      heroImage: "/assets/perfume-lifestyle.jpg",
      heroTitle: "Azur, the Spirit of the Sea",
      heroSubtitle:
        "Fresh and boundless, the Azur collection captures the brilliance of sun-drenched coastlines and the salt-kissed breeze of the Mediterranean.",
      products: azur,
    },
  ];

  return <AllPerfumesClient sections={sections} />;
}
