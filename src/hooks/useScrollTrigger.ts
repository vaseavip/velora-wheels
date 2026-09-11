import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Runs a GSAP setup function inside a scoped context, skipped entirely when
 * the visitor prefers reduced motion. `deps` controls re-creation.
 */
export function useScrollAnimation(
  scope: React.RefObject<HTMLElement | null>,
  setup: (context: { gsap: typeof gsap }) => void,
  deps: React.DependencyList = [],
) {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!scope.current || reduced) return;
    const ctx = gsap.context(() => setup({ gsap }), scope.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
}

export { gsap, ScrollTrigger };
