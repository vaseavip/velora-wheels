import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ease, scrub as scrubTokens } from "./motionConfig";

gsap.registerPlugin(ScrollTrigger);

export interface EmergeConfig {
  /** Starting state, tweened toward `to` as the element scrolls through the trigger range. */
  from: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  end?: string;
  scrubAmount?: number;
  easing?: string;
}

const DEFAULT_TO: gsap.TweenVars = {
  autoAlpha: 1,
  scale: 1,
  xPercent: 0,
  yPercent: 0,
  rotate: 0,
  rotateX: 0,
  filter: "blur(0px)",
};

/**
 * Continuous, scroll-position-driven reveal (scrub, not "once"): scrolling
 * down plays the entry forward, scrolling back up plays it in reverse. Used
 * for every Collection wheel except Axis and Nova, which get their own
 * pinned scenes — each wheel just passes a different `from` state, which is
 * what gives Forge/Vector/Arc/Monarch their distinct character.
 */
export function useEmergeReveal<T extends HTMLElement>(config: EmergeConfig) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, ...config.from },
        {
          ...DEFAULT_TO,
          ...config.to,
          ease: config.easing ?? ease.soft,
          scrollTrigger: {
            trigger: el,
            start: config.start ?? "top 90%",
            end: config.end ?? "top 38%",
            scrub: config.scrubAmount ?? scrubTokens.emerge,
          },
        },
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return ref;
}
