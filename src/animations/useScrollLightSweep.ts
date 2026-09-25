import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { scrub as scrubTokens } from "./motionConfig";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives a `--sweep` CSS custom property (0→1) across the entire time an
 * element is in view, for a slow light/highlight that travels over a
 * surface as the user scrolls — ambient, not pointer-driven. Used for
 * Monarch's restrained "luxury" treatment.
 */
export function useScrollLightSweep<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      const state = { sweep: -0.2 };
      gsap.to(state, {
        sweep: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: scrubTokens.ambient,
        },
        onUpdate: () => el.style.setProperty("--sweep", String(state.sweep)),
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return ref;
}
