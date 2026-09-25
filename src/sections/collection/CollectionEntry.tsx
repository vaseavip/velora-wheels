import type { WheelModel } from "../../data/wheels";
import { WheelStage } from "../../components/WheelStage";
import { Reveal } from "../../components/Reveal";
import { TextReveal } from "../../components/TextReveal";
import { useEmergeReveal, type EmergeConfig } from "../../animations/useEmergeReveal";
import { useScrollLightSweep } from "../../animations/useScrollLightSweep";
import collectionStyles from "../Collection.module.css";
import styles from "./CollectionEntry.module.css";

type Variant = "forge" | "vector" | "arc" | "monarch";

interface CollectionEntryProps {
  wheel: WheelModel;
  variant: Variant;
}

const EMERGE_CONFIG: Record<Variant, EmergeConfig> = {
  // "Forge emerges from darkness": heavy blur + soft grow, glow fades in with it.
  forge: {
    from: { scale: 1.14, y: 26, filter: "blur(22px)" },
    to: { filter: "blur(0px)" },
    start: "top 92%",
    end: "top 42%",
  },
  // "Sculpted into the scene": clip-path opens outward alongside blur + a light scale settle.
  vector: {
    from: {
      scale: 1.08,
      filter: "blur(10px)",
      rotate: 2,
      clipPath: "inset(22% 22% 22% 22% round 18px)",
    },
    to: { clipPath: "inset(0% 0% 0% 0% round 18px)" },
    start: "top 90%",
    end: "top 40%",
  },
  // Rises into position with a slight 3D tilt, as if lifting off the floor.
  arc: {
    from: { yPercent: 55, scale: 0.94, filter: "blur(6px)", rotateX: 22 },
    start: "top 92%",
    end: "top 40%",
  },
  // Restrained luxury drift — barely moves, mostly resolves out of a soft blur.
  monarch: {
    from: { scale: 1.03, y: 10, filter: "blur(5px)" },
    start: "top 90%",
    end: "top 45%",
    scrubAmount: 0.9,
  },
};

/**
 * Shared renderer for the four Collection wheels that use a continuous,
 * non-pinned scroll-scrub reveal (Axis and Nova get their own pinned
 * scenes). Each variant only differs in its `from` state and the optional
 * extra visual layer (Forge's glow, Monarch's light sweep) — everything
 * else — layout, text, WheelStage — is shared.
 */
export function CollectionEntry({ wheel, variant }: CollectionEntryProps) {
  const emergeRef = useEmergeReveal<HTMLDivElement>(EMERGE_CONFIG[variant]);
  const sweepRef = useScrollLightSweep<HTMLDivElement>();

  const wheelVisual = (
    <div ref={emergeRef} className={styles.emergeLayer}>
      {variant === "forge" && <div className={styles.haze} aria-hidden="true" />}
      <WheelStage wheel={wheel} maxOffset={12} />
      {variant === "monarch" && <div ref={sweepRef} className={styles.sweep} aria-hidden="true" />}
    </div>
  );

  return (
    <article className={`${collectionStyles.entry} ${collectionStyles[variant]}`}>
      <div className={collectionStyles.wheelWrap}>
        {variant === "arc" ? <div className={styles.perspectiveWrap}>{wheelVisual}</div> : wheelVisual}
      </div>

      <Reveal as="div" className={collectionStyles.textBlock} delay={0.05}>
        <span className={collectionStyles.index}>{wheel.index}</span>
        {/* Split "VELORA <MODEL>" into two explicit lines — a single-string
            line that wraps on its own would slide as one block and clip
            the wrapped row mid-reveal, since the mask height is derived
            from the (now two-row) text's own bounding box. */}
        <TextReveal as="h3" lines={wheel.name.split(" ")} className={collectionStyles.name} start="top 85%" />
        <p className={collectionStyles.specs}>
          {wheel.size} &middot; {wheel.finish}
        </p>
        <p className={collectionStyles.desc}>{wheel.description}</p>
      </Reveal>
    </article>
  );
}
