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
  /** The Collection's two pinned scene systems (roll + zoom) — a little lag reads as weight. */
  pinned: 0.7,
  /** Continuous ambient motion (e.g. the About CTA's parallax push-in) — slow and heavy. */
  ambient: 1.4,
} as const;

/** Roughly how tall each Collection scene system's pinned scroll "chapter"
 * is, in viewport heights — shared by every wheel using that system. */
export const pinnedChapterVh = {
  /** Animation 1 (roll in/settle/roll out) — used by Axis, Vector, Monarch. */
  roll: 260,
  /** Animation 2 (cinematic zoom + halo) — used by Forge, Arc, Nova. */
  zoom: 220,
} as const;

export const textStagger = {
  tight: 0.06,
  normal: 0.09,
} as const;
