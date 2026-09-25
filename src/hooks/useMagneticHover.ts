import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * A very small, clamped magnetic pull toward the cursor — desktop/fine
 * pointers only, and off entirely for touch or reduced motion. Used on
 * primary CTAs; kept subtle enough to read as "premium," not "gamey."
 */
export function useMagneticHover<T extends HTMLElement>(strength = 10) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || strength <= 0) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.25, ease: "power2.out" });

    const handleMove = (event: PointerEvent) => {
      const bounds = el.getBoundingClientRect();
      const relX = event.clientX - (bounds.left + bounds.width / 2);
      const relY = event.clientY - (bounds.top + bounds.height / 2);
      xTo(gsap.utils.clamp(-strength, strength, relX * 0.35));
      yTo(gsap.utils.clamp(-strength, strength, relY * 0.35));
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
    };

    const handleDown = () => scaleTo(0.96);
    const handleUp = () => scaleTo(1);

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    el.addEventListener("pointerdown", handleDown);
    el.addEventListener("pointerup", handleUp);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      el.removeEventListener("pointerdown", handleDown);
      el.removeEventListener("pointerup", handleUp);
    };
  }, [reduced, strength]);

  return ref;
}
