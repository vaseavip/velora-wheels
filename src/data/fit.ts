export interface BrandFit {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
}

export const brandFits: BrandFit[] = [
  {
    id: "bmw",
    name: "BMW",
    image: "/images/fit/bmw.webp",
    imageAlt: "Close-up of a black wheel with red brake caliper fitted to a BMW",
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    image: "/images/fit/mercedes.webp",
    imageAlt: "Close-up of a black wheel with bronze AMG carbon-ceramic caliper fitted to a Mercedes-Benz",
  },
  {
    id: "audi",
    name: "Audi",
    image: "/images/fit/audi.webp",
    imageAlt: "Close-up of a gloss black wheel with red brake caliper fitted to an Audi",
  },
];
