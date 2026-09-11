export interface WheelModel {
  id: string;
  index: string;
  name: string;
  size: string;
  finish: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const wheels: WheelModel[] = [
  {
    id: "axis",
    index: "01",
    name: "VELORA AXIS",
    size: '21"',
    finish: "Satin Graphite",
    description: "Designed around precision and proportion.",
    image: "/images/wheels/axis.webp",
    imageAlt: "VELORA AXIS satin graphite alloy wheel, multi-spoke design",
  },
  {
    id: "forge",
    index: "02",
    name: "VELORA FORGE",
    size: '20"',
    finish: "Gloss Black",
    description: "Forged for strength, sculpted for speed.",
    image: "/images/wheels/forge.webp",
    imageAlt: "VELORA FORGE gloss black alloy wheel, deep-dish profile",
  },
  {
    id: "vector",
    index: "03",
    name: "VELORA VECTOR",
    size: '22"',
    finish: "Brushed Titanium",
    description: "Directional design, engineered for flow.",
    image: "/images/wheels/vector.webp",
    imageAlt: "VELORA VECTOR brushed titanium alloy wheel, directional spokes",
  },
  {
    id: "arc",
    index: "04",
    name: "VELORA ARC",
    size: '19"',
    finish: "Dark Bronze",
    description: "Curved lines that hold their shape at speed.",
    image: "/images/wheels/arc.webp",
    imageAlt: "VELORA ARC dark bronze alloy wheel, curved spoke pattern",
  },
  {
    id: "monarch",
    index: "05",
    name: "VELORA MONARCH",
    size: '21"',
    finish: "Brushed Silver",
    description: "A commanding presence, refined in every spoke.",
    image: "/images/wheels/monarch.webp",
    imageAlt: "VELORA MONARCH brushed silver alloy wheel, wide-spoke design",
  },
  {
    id: "nova",
    index: "06",
    name: "VELORA NOVA",
    size: '20"',
    finish: "Gloss Black / Machined",
    description: "Sharp geometry, quiet confidence.",
    image: "/images/wheels/nova.webp",
    imageAlt: "VELORA NOVA gloss black alloy wheel with machined face",
  },
];
