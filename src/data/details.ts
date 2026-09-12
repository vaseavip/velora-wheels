export interface DetailShot {
  id: string;
  image: string;
  imageAlt: string;
  caption: string;
}

export const detailShots: DetailShot[] = [
  {
    id: "gallery",
    image: "/images/details/wheel-gallery.webp",
    imageAlt: "A forged wheel resting on a textured studio surface, dramatic side lighting",
    caption: "Every spoke, intentional.",
  },
  {
    id: "bmw-detail",
    image: "/images/cars/bmw-detail.webp",
    imageAlt: "Close-up of a chrome multi-spoke wheel on a BMW, autumn leaves in the foreground",
    caption: "Where design meets the road.",
  },
];
