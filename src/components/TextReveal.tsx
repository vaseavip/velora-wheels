import { useLayoutEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ease, textStagger } from "../animations/motionConfig";
import styles from "./TextReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  /** One entry per visual line — each gets its own masked reveal, staggered. */
  lines: string[];
  as?: ElementType;
  /** "mask": clip-path + blur line reveal, for headings. "eyebrow": letter-spacing + fade. */
  variant?: "mask" | "eyebrow";
  className?: string;
  /** "scroll" (default) fires once the element nears the viewport; "mount" fires immediately. */
  trigger?: "scroll" | "mount";
  start?: string;
  stagger?: number;
  delay?: number;
  id?: string;
}

/**
 * The site's heading motion language: text is masked behind clip-path,
 * offset, and a touch of blur, then unmasked line by line. Used once per
 * heading — this is a deliberate one-shot entrance, not a continuous
 * scroll-scrub (that's reserved for the Collection's wheel scenes).
 */
export function TextReveal({
  lines,
  as: Tag = "div",
  variant = "mask",
  className,
  trigger = "scroll",
  start = "top 88%",
  stagger = textStagger.normal,
  delay = 0,
  id,
}: TextRevealProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const targets = lineRefs.current.filter(Boolean);
    if (!root || targets.length === 0 || reduced) return;

    const ctx = gsap.context(() => {
      const from =
        variant === "eyebrow"
          ? { autoAlpha: 0, letterSpacing: "0.5em" }
          : { autoAlpha: 0, yPercent: 115, filter: "blur(8px)" };
      const to =
        variant === "eyebrow"
          ? { autoAlpha: 1, letterSpacing: "0.28em", duration: 0.9, ease: ease.soft }
          : { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 1.05, ease: ease.precise };

      const tween = gsap.fromTo(targets, from, {
        ...to,
        stagger,
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: root, start, once: true }
            : undefined,
      });

      if (trigger === "mount") tween.play(0);
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, variant, trigger, start, stagger, delay, lines.join("|")]);

  return (
    <Tag ref={rootRef} className={className} id={id}>
      {lines.map((line, i) => (
        <span className={styles.lineMask} key={i}>
          <span
            className={styles.lineInner}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            style={reduced ? undefined : { visibility: "hidden" }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
