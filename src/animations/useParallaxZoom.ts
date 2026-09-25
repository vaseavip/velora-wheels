import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { scrub as scrubTokens } from "./motionConfig";

gsap.registerPlugin(ScrollTrigger);

/**
 * A slow, continuous scale (1 -> `to`) tied to how far an image has
 * scrolled through the viewport — the classic editorial/hero "camera
 * push-in" parallax. Kept off any element that already has its own
 * CSS-driven hover transform, to avoid two transform sources fighting.
 */
export function useParallaxZoom<T extends HTMLElement>(to = 1.09) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: to,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: scrubTokens.ambient,
          },
        },
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, to]);

  return ref;
}
