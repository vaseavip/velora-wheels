/**
 * Central motion tokens for the Collection's cinematic scroll system and the
 * site's text-reveal language. Keeping these here means tuning a wheel's
 * scrub feel or a heading's reveal timing never means hunting through JSX.
 */

export const ease = {
  precise: "power3.out",
  soft: "power2.out",
  settle: "back.out(1.4)",
  linear: "none",
} as const;

/** GSAP ScrollTrigger `scrub` values — how much the animation lags behind
 * the scrollbar. Lower = tighter/more direct, higher = heavier/more inertia. */
export const scrub = {
  /** Pinned physical scenes (Axis roll, Nova finale) — a little lag reads as weight. */
  pinned: 0.7,
  /** Non-pinned emerge reveals — closer to the scrollbar so entries don't feel laggy. */
  emerge: 0.5,
  /** Continuous ambient motion (Monarch's drift/light sweep) — slow and heavy. */
  ambient: 1.4,
} as const;

/** Roughly how tall a wheel's own pinned scroll "chapter" is, in viewport heights. */
export const pinnedChapterVh = {
  axis: 260,
  nova: 220,
} as const;

export const textStagger = {
  tight: 0.06,
  normal: 0.09,
} as const;
