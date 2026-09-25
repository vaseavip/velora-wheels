export interface WheelModel {
  id: string;
  index: string;
  name: string;
  size: string;
  finish: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /**
   * Hero-only override for Axis. The Hero section must keep showing its
   * original wheel image even after the Collection's Axis asset was
   * replaced — see IMAGE_CREDITS.md / the asset-swap commit for why these
   * two are intentionally different files now. Every other wheel has no
   * Hero presence, so this stays undefined for them.
   */
  heroImage?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
}

export const wheels: WheelModel[] = [
  {
    id: "axis",
    index: "01",
    name: "VELORA AXIS",
    size: '20"',
    finish: "Gloss Black / Polished Lip",
    description: "Designed around precision and proportion.",
    image: "/images/wheels/axis.webp",
    imageAlt: "VELORA AXIS alloy wheel in gloss black with a polished lip, multi-spoke mesh design",
    imageWidth: 1024,
    imageHeight: 1024,
    heroImage: "/images/wheels/axis-hero.webp",
    heroImageWidth: 500,
    heroImageHeight: 500,
  },
  {
    id: "forge",
    index: "02",
    name: "VELORA FORGE",
    size: '22"',
    finish: "Black / Gold Accent",
    description: "Forged for strength, sculpted for speed.",
    image: "/images/wheels/forge.webp",
    imageAlt: "VELORA FORGE alloy wheel in black with gold accent spokes, deep-dish two-tone design",
    imageWidth: 768,
    imageHeight: 768,
  },
  {
    id: "vector",
    index: "03",
    name: "VELORA VECTOR",
    size: '20"',
    finish: "Hyper Silver",
    description: "Directional design, engineered for flow.",
    image: "/images/wheels/vector.webp",
    imageAlt: "VELORA VECTOR alloy wheel in hyper silver, directional multi-spoke design",
    imageWidth: 1000,
    imageHeight: 1000,
  },
  {
    id: "arc",
    index: "04",
    name: "VELORA ARC",
    size: '19"',
    finish: "Satin Black",
    description: "Curved lines that hold their shape at speed.",
    image: "/images/wheels/arc.webp",
    imageAlt: "VELORA ARC alloy wheel in satin black, curved multi-spoke pattern",
    imageWidth: 1000,
    imageHeight: 1000,
  },
  {
    id: "monarch",
    index: "05",
    name: "VELORA MONARCH",
    size: '21"',
    finish: "Gunmetal Grey",
    description: "A commanding presence, refined in every spoke.",
    image: "/images/wheels/monarch.webp",
    imageAlt: "VELORA MONARCH alloy wheel in gunmetal grey, elegant multi-spoke design",
    imageWidth: 767,
    imageHeight: 700,
  },
  {
    id: "nova",
    index: "06",
    name: "VELORA NOVA",
    size: '24"',
    finish: "Chrome",
    description: "A bold closing statement, deep-dish and unmistakable.",
    image: "/images/wheels/nova.webp",
    imageAlt: "VELORA NOVA alloy wheel in polished chrome, deep-dish multi-spoke design",
    imageWidth: 1000,
    imageHeight: 1000,
  },
];
