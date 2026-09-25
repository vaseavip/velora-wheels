export interface BrandFeature {
  id: string;
  name: string;
  tagline: string;
  tag: string;
  image: string;
  imageAlt: string;
}

export const brands: BrandFeature[] = [
  {
    id: "bmw",
    name: "BMW",
    tagline: "Precision meets presence.",
    tag: "Precision / Performance",
    image: "/images/cars/bmw.webp",
    imageAlt: "White BMW M4 coupe, front 3/4 studio cutout, alloy wheel prominent",
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    tagline: "Luxury, uncompromised.",
    tag: "Luxury / Presence",
    image: "/images/cars/mercedes.webp",
    imageAlt: "White Mercedes-AMG GT convertible, front 3/4 studio cutout, alloy wheel prominent",
  },
  {
    id: "audi",
    name: "Audi",
    tagline: "Balance through design.",
    tag: "Balance / Design",
    image: "/images/cars/audi.webp",
    imageAlt: "Black Audi R8 coupe, front 3/4 studio cutout, alloy wheel prominent",
  },
];
