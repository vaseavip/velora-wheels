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
}

export const wheels: WheelModel[] = [
  {
    id: "axis",
    index: "01",
    name: "VELORA AXIS",
    size: '21"',
    finish: "Brushed Titanium",
    description: "Designed around precision and proportion.",
    image: "/images/wheels/axis.webp",
    imageAlt: "VELORA AXIS alloy wheel in brushed titanium, fine cross-mesh spoke pattern",
    imageWidth: 1400,
    imageHeight: 1424,
  },
  {
    id: "forge",
    index: "02",
    name: "VELORA FORGE",
    size: '20"',
    finish: "Gloss Black",
    description: "Forged for strength, sculpted for speed.",
    image: "/images/wheels/forge.webp",
    imageAlt: "VELORA FORGE alloy wheel in gloss black, deep-dish multi-spoke design",
    imageWidth: 883,
    imageHeight: 966,
  },
  {
    id: "vector",
    index: "03",
    name: "VELORA VECTOR",
    size: '22"',
    finish: "Satin Graphite",
    description: "Directional design, engineered for flow.",
    image: "/images/wheels/vector.webp",
    imageAlt: "VELORA VECTOR alloy wheel in satin graphite, Y-spoke directional design",
    imageWidth: 1400,
    imageHeight: 1048,
  },
  {
    id: "arc",
    index: "04",
    name: "VELORA ARC",
    size: '19"',
    finish: "Polished Chrome",
    description: "Curved lines that hold their shape at speed.",
    image: "/images/wheels/arc.webp",
    imageAlt: "VELORA ARC alloy wheel in polished chrome, ornate cross-lattice spoke pattern",
    imageWidth: 1108,
    imageHeight: 1638,
  },
  {
    id: "monarch",
    index: "05",
    name: "VELORA MONARCH",
    size: '21"',
    finish: "Brushed Silver",
    description: "A commanding presence, refined in every spoke.",
    image: "/images/wheels/monarch.webp",
    imageAlt: "VELORA MONARCH alloy wheel in brushed silver, wide-spoke turbine design",
    imageWidth: 1400,
    imageHeight: 1147,
  },
];
