import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./useReducedMotion";

interface ParallaxOptions {
  /** Maximum translation in px, applied after clamping the pointer offset. */
  maxOffset?: number;
  /** Maximum rotation in degrees. Set 0 to disable rotation entirely. */
  maxRotate?: number;
  /** How gently the element eases toward the target position. */
  duration?: number;
}

/**
 * Subtle, clamped cursor-follow motion for a single element. Pointer offset
 * is normalized to the hosting bounds and capped so the element never drifts
 * more than `maxOffset`px — this keeps the motion premium rather than showy,
 * and prevents runaway movement near viewport edges.
 */
export function usePointerParallax<T extends HTMLElement>({
  maxOffset = 12,
  maxRotate = 3,
  duration = 1.1,
}: ParallaxOptions = {}) {
  const hostRef = useRef<T | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    const target = targetRef.current ?? host;
    if (!host || !target || reduced) return;

    const xTo = gsap.quickTo(target, "x", { duration, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration, ease: "power3.out" });
    const rTo = gsap.quickTo(target, "rotate", { duration: duration * 1.1, ease: "power3.out" });

    const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

    const handleMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (event.clientY - bounds.top) / bounds.height - 0.5;

      xTo(clamp(relX * maxOffset * 2, maxOffset));
      yTo(clamp(relY * maxOffset * 2, maxOffset));
      if (maxRotate) rTo(clamp(relX * maxRotate * 2, maxRotate));
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
      rTo(0);
    };

    host.addEventListener("pointermove", handleMove);
    host.addEventListener("pointerleave", handleLeave);

    return () => {
      host.removeEventListener("pointermove", handleMove);
      host.removeEventListener("pointerleave", handleLeave);
    };
  }, [maxOffset, maxRotate, duration, reduced]);

  return { hostRef, targetRef };
}
