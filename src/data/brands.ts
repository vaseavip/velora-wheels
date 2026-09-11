export interface BrandFeature {
  id: string;
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
}

export const brands: BrandFeature[] = [
  {
    id: "bmw",
    name: "BMW",
    tagline: "Precision meets presence.",
    image: "/images/cars/bmw.webp",
    imageAlt: "Dark BMW performance car photographed at night, alloy wheel visible",
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    tagline: "Elegance in every detail.",
    image: "/images/cars/mercedes.webp",
    imageAlt: "Mercedes-Benz photographed in low evening light, wheel and side profile visible",
  },
  {
    id: "audi",
    name: "Audi",
    tagline: "Progress through design.",
    image: "/images/cars/audi.webp",
    imageAlt: "Audi photographed from a low angle in an urban setting, wheel visible",
  },
];
