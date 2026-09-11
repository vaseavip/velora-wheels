import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DetailShot } from "../data/details";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./DetailReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

interface DetailRevealProps {
  shot: DetailShot;
  delay?: number;
}

/** A macro photo that unmasks itself open as it enters view, then settles with a slow release-zoom. */
export function DetailReveal({ shot, delay = 0 }: DetailRevealProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          delay,
          ease: "power4.inOut",
          scrollTrigger: { trigger: frame, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        img,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.6,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 85%", once: true },
        },
      );
    }, frameRef);

    return () => ctx.revert();
  }, [delay, reduced]);

  return (
    <figure className={styles.figure}>
      <div ref={frameRef} className={styles.frame}>
        <img
          ref={imgRef}
          src={shot.image}
          alt={shot.imageAlt}
          className={`${styles.image} photo`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className={styles.caption}>{shot.caption}</figcaption>
    </figure>
  );
}
