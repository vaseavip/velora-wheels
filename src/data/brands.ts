export interface BrandFeature {
  id: string;
  name: string;
  tagline: string;
  tag: string;
  image: string;
  imageAlt: string;
  detailImage?: string;
  detailAlt?: string;
}

export const brands: BrandFeature[] = [
  {
    id: "bmw",
    name: "BMW",
    tagline: "Precision meets presence.",
    tag: "Precision / Performance",
    image: "/images/cars/bmw.webp",
    imageAlt: "Black BMW M4 photographed front 3/4, low angle, alloy wheel prominent",
    detailImage: "/images/cars/bmw-detail.webp",
    detailAlt: "Close-up of a chrome multi-spoke wheel on a BMW, autumn leaves in the foreground",
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    tagline: "Luxury, uncompromised.",
    tag: "Luxury / Presence",
    image: "/images/cars/mercedes.webp",
    imageAlt: "Dark Mercedes-Benz photographed at a low angle against concrete architecture",
  },
  {
    id: "audi",
    name: "Audi",
    tagline: "Balance through design.",
    tag: "Balance / Design",
    image: "/images/cars/audi.webp",
    imageAlt: "Black Audi RS photographed front 3/4 in golden-hour light, alloy wheel prominent",
  },
];
