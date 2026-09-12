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
    id: "machining",
    image: "/images/details/machining.webp",
    imageAlt: "Close-up of precision-machined brushed metal surface",
    caption: "Machined to a mirror line.",
  },
  {
    id: "bolts",
    image: "/images/details/bolts.webp",
    imageAlt: "Macro close-up of wheel lug bolts and hub",
    caption: "Held by exacting tolerance.",
  },
  {
    id: "tread",
    image: "/images/details/tread.webp",
    imageAlt: "Macro close-up of tire tread against the wheel edge",
    caption: "Where design meets the road.",
  },
];
