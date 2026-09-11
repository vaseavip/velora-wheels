import { useRef } from "react";
import type { WheelModel } from "../data/wheels";
import { usePointerParallax } from "../hooks/usePointerParallax";
import styles from "./WheelStage.module.css";

interface WheelStageProps {
  wheel: WheelModel;
  maxOffset?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Presents a single wheel as a floating product shot: no card, no frame,
 * just the wheel against the dark canvas with a cursor-follow sheen and a
 * gentle, clamped parallax drift.
 */
export function WheelStage({ wheel, maxOffset = 14, priority = false, className }: WheelStageProps) {
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const { hostRef, targetRef } = usePointerParallax<HTMLDivElement>({ maxOffset, maxRotate: 2.5 });

  const handleMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    sheenRef.current?.style.setProperty("--mx", `${x}%`);
    sheenRef.current?.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      ref={hostRef}
      className={`${styles.stage} ${className ?? ""}`}
      onPointerMove={handleMove}
    >
      <div ref={sheenRef} className={styles.sheen} aria-hidden="true" />
      <div ref={targetRef} className={styles.imageWrap}>
        <div className={styles.imageInner}>
          <img
            src={wheel.image}
            alt={wheel.imageAlt}
            className={`${styles.image} photo`}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            width={1200}
            height={1200}
          />
        </div>
      </div>
    </div>
  );
}
